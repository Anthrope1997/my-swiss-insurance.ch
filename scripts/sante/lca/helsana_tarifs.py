#!/usr/bin/env python3
"""
Helsana Tarifs Scraper — Production v6

Architecture confirmed:
  - Direct navigation to benefits URL works ONLY on the first visit (Angular SPA)
  - After navigating to products/selection, the session is "consumed" — going back fails
  - Solution: fresh browser context per hospital division pass

Benefits page toggles:
  [0-3] Assurance de base (radio group) → select [3] Libre choix du médecin
  [4]   Division commune  → helsana-hospital-eco
  [5]   Sélection en souplesse → helsana-hospital-flex
  [6]   Division demi-privée   → helsana-hospital-demi-privee
  [7]   Division privée        → helsana-hospital-privee

Ambulatoire tiles: [role="button"] elements containing known benefit keywords
  Promotion de la santé | Médecine complémentaire | Prévention | Maternité |
  Protection à l'étranger | Lunettes | Médicaments | Transport | Traitements dentaires

Strategy per profile (4 fresh contexts):
  Pass 1 (ECO + all ambulatoire tiles): ECO price + TOP/COMPLETA + DENTAplus
  Pass 2 (FLEX only):                   FLEX price
  Pass 3 (DEMI-PRIVÉE only):            DEMI-PRIVÉE price
  Pass 4 (PRIVÉE only):                 PRIVÉE price
  Pass 5 (ambulatoire only, if needed): TOP/COMPLETA/DENTAplus prices if missing
"""
import json
import re
import time
from playwright.sync_api import sync_playwright
from datetime import date

TODAY = date.today().isoformat()

PROFILS = [
    {'id': 'jeune-adulte', 'dob': '15.01.2000', 'female': False, 'npa': '1000'},
    {'id': 'famille',      'dob': '15.01.1991', 'female': True,  'npa': '1201'},
    {'id': 'senior',       'dob': '15.01.1971', 'female': False, 'npa': '1000'},
]

HOSPITAL_DIVISIONS = [
    ('helsana-hospital-eco',         4),  # Division commune
    ('helsana-hospital-flex',        5),  # Sélection en souplesse
    ('helsana-hospital-demi-privee', 6),  # Division demi-privée
    ('helsana-hospital-privee',      7),  # Division privée
]

BASIC_MODEL_IDX = 3    # Libre choix du médecin
HOSPITAL_ECO_IDX = 4   # Anchor for radio-group reset

BENEFIT_TILE_KEYWORDS = [
    'promotion de la santé',
    'médecine complémentaire',
    'prévention',
    'maternité',
    "protection à l'étranger",
    'lunettes',
    'médicaments',
    'transport',
    'traitements dentaires',
]


def wait_idle(page, timeout=8000):
    try:
        page.wait_for_load_state('networkidle', timeout=timeout)
    except Exception:
        pass


def click_footer_btn(page):
    return page.evaluate('''() => {
        const all = Array.from(document.querySelectorAll(
            "a.hls-btn-primary, [role='button'].hls-btn-primary, button.hls-btn-primary"));
        if (!all.length) return null;
        const btn = all[all.length - 1];
        btn.click();
        return btn.textContent.trim().slice(0, 60);
    }''')


def click_toggle(page, idx):
    return page.evaluate(f'''() => {{
        const t = document.querySelectorAll("mat-button-toggle")[{idx}];
        if (!t) return null;
        const btn = t.querySelector("button");
        if (btn) {{ btn.click(); return t.textContent.trim().replace(/\\s+/g, " ").slice(0, 50); }}
        return null;
    }}''')


def click_ambulatoire_tiles(page):
    """
    Click ambulatoire benefit tiles using text-content matching.
    Looks for elements whose text contains known benefit keywords.
    """
    keywords = BENEFIT_TILE_KEYWORDS
    return page.evaluate('''(keywords) => {
        const clicked = [];
        const seen = new Set();
        // Walk all elements, find ones containing benefit keywords
        for (const el of document.querySelectorAll("*")) {
            // Skip if inside mat-button-toggle, header, nav, footer
            if (el.closest("mat-button-toggle, header, nav, footer, [role='navigation']")) continue;
            const txt = el.textContent.trim().toLowerCase().replace(/\\s+/g, " ");
            if (!keywords.some(k => txt.includes(k))) continue;
            // Only click leaf-ish elements (not huge containers)
            if (el.children.length > 5) continue;
            if (el.offsetHeight < 20 || el.offsetHeight > 300) continue;
            if (seen.has(txt.slice(0, 30))) continue;
            seen.add(txt.slice(0, 30));
            el.click();
            clicked.push(txt.slice(0, 40));
        }
        return clicked;
    }''', keywords)


def fill_form_navigate_to_benefits(p, profil):
    """Fresh browser context: fill form (persons + NPA), navigate to benefits page."""
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        locale='fr-CH',
        viewport={'width': 1280, 'height': 900},
        extra_http_headers={'Accept-Language': 'fr-CH,fr;q=0.9'},
    )
    page = ctx.new_page()

    page.goto('https://portal.helsana.ch/offer/#/personal-details/persons?locale=fr',
              wait_until='networkidle', timeout=30000)
    time.sleep(3)

    # Accept cookies
    try:
        btn = page.locator('button:has-text("Accepter")').first
        if btn.is_visible(timeout=3000):
            btn.click()
            time.sleep(1.5)
    except Exception:
        pass

    page.wait_for_selector('.mat-button-toggle', timeout=10000)
    time.sleep(1)

    # Gender
    try:
        toggles = page.locator('.mat-button-toggle').all()
        idx = 1 if profil['female'] else 0
        if len(toggles) > idx:
            toggles[idx].click()
            time.sleep(0.5)
    except Exception as e:
        print(f'  Sex error: {e}')

    # Name
    try:
        page.locator('#mat-input-0').fill('Test')
        page.locator('#mat-input-0').press('Tab')
        time.sleep(0.2)
    except Exception:
        pass

    # DOB
    try:
        dob_inp = page.locator('#mat-input-1')
        dob_inp.click()
        time.sleep(0.2)
        for char in profil['dob']:
            page.keyboard.type(char)
            time.sleep(0.04)
        time.sleep(0.8)
        page.keyboard.press('Tab')
        time.sleep(0.8)
    except Exception as e:
        print(f'  DOB error: {e}')

    # Step 1 → location
    click_footer_btn(page)
    time.sleep(5)
    wait_idle(page, 15000)

    # NPA
    try:
        inputs = page.locator('input:visible').all()
        for inp in inputs[:8]:
            try:
                iid = inp.get_attribute('id') or ''
                ph = inp.get_attribute('placeholder') or ''
                lbl_el = page.locator(f'mat-form-field:has(#{iid}) mat-label').first
                lbl = (lbl_el.inner_text() if lbl_el.count() else '').lower()
                if any(k in (iid + ph + lbl).lower() for k in ['npa', 'plz', 'code', 'postal']):
                    inp.click()
                    for char in profil['npa']:
                        page.keyboard.type(char)
                        time.sleep(0.04)
                    time.sleep(2)
                    for sel in ['[role="option"]:visible', '.mat-option:visible']:
                        try:
                            opt = page.locator(sel).first
                            if opt.is_visible(timeout=2000):
                                opt.click()
                                time.sleep(0.5)
                                break
                        except Exception:
                            pass
                    else:
                        page.keyboard.press('Enter')
                    break
            except Exception:
                pass
    except Exception as e:
        print(f'  NPA error: {e}')

    # Step 2 → benefits
    click_footer_btn(page)
    time.sleep(5)
    wait_idle(page, 15000)

    return browser, page


def extract_prices_from_text(text):
    """
    Parse products/selection text.
    Returns dict: ts_id → price. Ignores BASIS (LAMal) price.
    """
    prices = {}

    PRODUCT_PATTERNS = {
        'helsana-hospital-eco':         r'\bHOSPITAL\s+ECO\b',
        'helsana-hospital-demi-privee':  r'\bHOSPITAL\s+DEMI\b',
        'helsana-hospital-privee':       r'\bHOSPITAL\s+PRIV[EÉée]+\b',
        'helsana-hospital-flex':         r'\bHOSPITAL\s+FLEX\b',
        'helsana-primeo':                r'\bPRIMEO\b',
        'helsana-top':                   r'\bTOP\b(?!\s*AL|\s*OT|\s*\+)',
        'helsana-completa':              r'\bCOMPLETA\b',
        'helsana-dentaplus':             r'\bDENTA(?:PLUS|\+)?\b',
    }

    for pm in re.finditer(
        r'Prime\s+nette\s+CHF\s*/\s*mois\s*\n\s*(\d+[.,]\d+)',
        text, re.IGNORECASE
    ):
        price_val = float(pm.group(1).replace(',', '.'))
        before = text[:pm.start()]

        # Is this a BASIS/base insurance price? (check last 300 chars before price)
        local = before[-300:]
        if re.search(r'\bBASIS\b|\bAssurance de base\b', local, re.IGNORECASE):
            vvg_nearby = any(re.search(p, local, re.IGNORECASE) for p in PRODUCT_PATTERNS.values())
            if not vvg_nearby:
                print(f'    Ignored {price_val} (BASIS/base insurance)')
                continue

        # Find nearest product name
        nearest_ts_id = None
        nearest_pos = -1
        for ts_id, pat in PRODUCT_PATTERNS.items():
            for m in re.finditer(pat, before, re.IGNORECASE):
                if m.start() > nearest_pos:
                    nearest_pos = m.start()
                    nearest_ts_id = ts_id

        if nearest_ts_id and nearest_ts_id not in prices:
            prices[nearest_ts_id] = price_val
            print(f'    {nearest_ts_id}: {price_val}')
        elif nearest_ts_id:
            # Print context to identify the true product
            ctx = text[max(0, pm.start()-200):pm.start()].replace('\n', '↵')[-120:]
            print(f'    (skipped {nearest_ts_id}: {price_val} | ctx: "…{ctx}")')
        else:
            ctx = text[max(0, pm.start()-200):pm.start()].replace('\n', '↵')[-120:]
            print(f'    Unmatched price: {price_val} | ctx: "…{ctx}")')

    return prices


def run_one_pass(p, profil, hospital_ts_id, hospital_toggle_idx,
                 with_ambulatoire_tiles=False, label=''):
    """
    One complete form fill → benefits → selection → price extraction.
    Returns dict of prices found.
    """
    print(f'\n  [{label or hospital_ts_id}] fresh browser')
    browser, page = fill_form_navigate_to_benefits(p, profil)

    try:
        url = page.url
        if '/benefits' not in url:
            print(f'  ERROR: Not on benefits page: {url[:60]}')
            return {}

        n_toggles = page.evaluate(
            '() => document.querySelectorAll("mat-button-toggle").length'
        )
        if n_toggles < 4:
            print(f'  ERROR: Only {n_toggles} toggles on benefits')
            return {}

        # Select basic model
        r = click_toggle(page, BASIC_MODEL_IDX)
        print(f'  Basic model selected: "{(r or "").strip()[:40]}"')
        time.sleep(0.5)

        # Ambulatoire tiles (optional)
        if with_ambulatoire_tiles:
            tiles = click_ambulatoire_tiles(page)
            print(f'  Ambulatoire tiles clicked: {len(tiles)}')
            if tiles:
                print(f'    {[t[:25] for t in tiles[:6]]}')

        # Select hospital division
        # Use ECO-anchor pattern for non-ECO divisions
        if hospital_toggle_idx != HOSPITAL_ECO_IDX:
            r_eco = click_toggle(page, HOSPITAL_ECO_IDX)
            time.sleep(0.4)

        r = click_toggle(page, hospital_toggle_idx)
        if r:
            print(f'  Hospital toggle [{hospital_toggle_idx}]: "{r.strip()[:50]}"')

        time.sleep(0.6)

        # Verify toggle state
        states = page.evaluate('''() => {
            return Array.from(document.querySelectorAll("mat-button-toggle")).slice(4,8).map((t,i)=>({
                i:i+4,
                checked: t.classList.contains("mat-button-toggle-checked"),
                text: t.textContent.trim().replace(/\\s+/g, " ").slice(0,20)
            }));
        }''')
        checked = [s for s in states if s['checked']]
        print(f'  Checked hospital toggles: {[(s["i"], s["text"][:15]) for s in checked]}')

        page.screenshot(path=f'/tmp/helsana_{hospital_ts_id.replace("-","_")}_before.png')

        # Click Afficher
        r = click_footer_btn(page)
        print(f'  Clicked: {r}')
        time.sleep(6)
        wait_idle(page, 20000)
        print(f'  → {page.url[:80]}')

        if '/products/selection' not in page.url:
            r2 = click_footer_btn(page)
            print(f'  Retry: {r2}')
            time.sleep(6)
            wait_idle(page, 15000)
            print(f'  → {page.url[:80]}')

        if '/products/selection' not in page.url:
            print(f'  ERROR: Did not reach products/selection')
            page.screenshot(path=f'/tmp/helsana_{hospital_ts_id.replace("-","_")}_stuck.png')
            return {}

        # Scroll through page to trigger Angular rendering
        page.evaluate('() => window.scrollTo(0, document.body.scrollHeight)')
        time.sleep(1.5)
        page.evaluate('() => window.scrollTo(0, document.body.scrollHeight / 2)')
        time.sleep(0.5)
        page.evaluate('() => window.scrollTo(0, 0)')
        time.sleep(0.5)

        page.screenshot(path=f'/tmp/helsana_{hospital_ts_id.replace("-","_")}_sel.png')

        text = page.inner_text('body')
        prices = extract_prices_from_text(text)


        return prices

    finally:
        browser.close()


def run_profil(p, profil):
    """Run all passes for one profile and collect all prices."""
    print(f'\n{"="*60}')
    print(f'Profile: {profil["id"]}  DOB:{profil["dob"]}  NPA:{profil["npa"]}')

    all_prices = {}

    # Pass 1: ECO + ambulatoire tiles → ECO + TOP/COMPLETA + DENTAplus
    pass1 = run_one_pass(p, profil, 'helsana-hospital-eco', HOSPITAL_ECO_IDX,
                         with_ambulatoire_tiles=True, label='ECO+ambu')
    all_prices.update(pass1)

    # Pass 2: FLEX
    pass2 = run_one_pass(p, profil, 'helsana-hospital-flex', 5,
                         with_ambulatoire_tiles=False)
    if 'helsana-hospital-flex' in pass2:
        all_prices['helsana-hospital-flex'] = pass2['helsana-hospital-flex']

    # Pass 3: DEMI-PRIVÉE
    pass3 = run_one_pass(p, profil, 'helsana-hospital-demi-privee', 6,
                         with_ambulatoire_tiles=False)
    if 'helsana-hospital-demi-privee' in pass3:
        all_prices['helsana-hospital-demi-privee'] = pass3['helsana-hospital-demi-privee']

    # Pass 4: PRIVÉE
    pass4 = run_one_pass(p, profil, 'helsana-hospital-privee', 7,
                         with_ambulatoire_tiles=False)
    if 'helsana-hospital-privee' in pass4:
        all_prices['helsana-hospital-privee'] = pass4['helsana-hospital-privee']

    # If ambulatoire prices still missing after pass 1, try a dedicated ambulatoire-only pass
    ambul_missing = [k for k in ['helsana-top', 'helsana-completa', 'helsana-dentaplus']
                     if k not in all_prices]
    if ambul_missing:
        print(f'\n  Missing ambulatoire: {ambul_missing} — running ambulatoire-only pass')
        # Use ECO toggle + all tiles (most comprehensive to show TOP and COMPLETA)
        pass5 = run_one_pass(p, profil, 'helsana-hospital-eco', HOSPITAL_ECO_IDX,
                             with_ambulatoire_tiles=True, label='ambulatoire-only')
        for k in ambul_missing:
            if k in pass5:
                all_prices[k] = pass5[k]

    print(f'\n  === Summary for {profil["id"]} ({len(all_prices)}/7 prices) ===')
    for k, v in all_prices.items():
        print(f'    {k}: {v}')

    return all_prices


def generate_tarifs_ts(profile_prices):
    all_ids = (
        [ts_id for ts_id, _ in HOSPITAL_DIVISIONS] +
        ['helsana-primeo', 'helsana-top', 'helsana-completa', 'helsana-dentaplus']
    )
    print('\n\n=== TypeScript tarif snippets for helsana.ts ===\n')
    for ts_id in all_ids:
        entries = []
        for profil_id in ['jeune-adulte', 'famille', 'senior']:
            amount = profile_prices.get(profil_id, {}).get(ts_id)
            if amount is not None:
                entries.append({
                    'profilId': profil_id,
                    'montantCHF': round(amount, 2),
                    'source': 'site-web',
                    'dateReleve': TODAY,
                })
        if entries:
            print(f'// {ts_id}')
            print('tarifs: [')
            for e in entries:
                print(f"  {{ profilId: '{e['profilId']}', montantCHF: {e['montantCHF']}, "
                      f"source: 'site-web', dateReleve: '{e['dateReleve']}' }},")
            print('],\n')
        else:
            print(f'// {ts_id}: no data\n')


if __name__ == '__main__':
    profile_prices = {}

    with sync_playwright() as p:
        for profil in PROFILS:
            prices = run_profil(p, profil)
            profile_prices[profil['id']] = prices

            fname = f'/tmp/helsana_{profil["id"]}_prices.json'
            with open(fname, 'w', encoding='utf-8') as f:
                json.dump(prices, f, indent=2, ensure_ascii=False)
            print(f'  Saved: {fname}')

    with open('/tmp/helsana_prices.json', 'w', encoding='utf-8') as f:
        json.dump(profile_prices, f, indent=2, ensure_ascii=False)
    print(f'\nSaved to /tmp/helsana_prices.json')

    if any(v for v in profile_prices.values()):
        generate_tarifs_ts(profile_prices)
    else:
        print('\nNo prices captured.')
