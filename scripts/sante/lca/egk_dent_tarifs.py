#!/usr/bin/env python3
"""
EGK Dental Tarifs Scraper
Calculateur : https://www.egk.ch/calculer
Cible : egk-dent-500 / egk-dent-1000 / egk-dent-1500
Profils : jeune-adulte (M 26 NPA 1000), famille (F 35 NPA 1201), senior (M 55 NPA 1000)
"""
import json
import time
from datetime import date
from playwright.sync_api import sync_playwright

TODAY = date.today().isoformat()

PROFILS = [
    {'id': 'jeune-adulte', 'dob': '15.01.2000', 'npa': '1000', 'sexe': 'M'},
    {'id': 'famille',      'dob': '15.06.1991', 'npa': '1201', 'sexe': 'F'},
    {'id': 'senior',       'dob': '15.01.1971', 'npa': '1000', 'sexe': 'M'},
]

CALC_URL = 'https://www.egk.ch/calculer'


def scrape_profil(p, browser):
    ctx = browser.new_context(locale='fr-CH', viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()

    print(f"\n[{p['id']}]", end='', flush=True)

    page.goto(CALC_URL, wait_until='domcontentloaded', timeout=30000)
    time.sleep(3)

    # Accept cookies
    try:
        page.click('.cky-btn-accept', timeout=8000)
        time.sleep(1)
        print(' → cookies', end='', flush=True)
    except Exception:
        pass

    page.screenshot(path=f'/tmp/egk_{p["id"]}_1_init.png')

    # Select sex — MUI toggle buttons
    sex_text = 'masculin' if p['sexe'] == 'M' else 'féminin'
    try:
        # Try MUI toggle button
        page.get_by_role('button', name=sex_text, exact=True).click(timeout=5000)
        print(f' → {sex_text}', end='', flush=True)
    except Exception:
        try:
            page.get_by_text(sex_text, exact=True).first.click(timeout=3000)
            print(f' → {sex_text}(text)', end='', flush=True)
        except Exception as e:
            print(f' WARN-sex:{e}', end='', flush=True)

    time.sleep(0.5)

    # Fill DOB (format dd.mm.yyyy)
    try:
        dob_input = page.locator('input[placeholder="dd.mm.yyyy"]').first
        dob_input.fill(p['dob'])
        page.keyboard.press('Tab')
        time.sleep(0.5)
        print(f' → dob', end='', flush=True)
    except Exception as e:
        print(f' WARN-dob:{e}', end='', flush=True)

    # Fill NPA
    try:
        # Find the NPA input (second text input or one near NPA label)
        npa_inputs = page.locator('input[type="text"]').all()
        # Filter for inputs visible on page
        npa_input = None
        for inp in npa_inputs:
            try:
                ph = inp.get_attribute('placeholder') or ''
                pid = inp.get_attribute('id') or ''
                val = inp.input_value()
                if p['dob'] in val:
                    continue  # skip DOB field
                if ph == 'dd.mm.yyyy':
                    continue
                npa_input = inp
                break
            except Exception:
                pass

        if npa_input is None:
            # fallback: second input
            npa_input = page.locator('input[type="text"]').nth(1)

        npa_input.click()
        npa_input.fill(p['npa'])
        time.sleep(2)

        # Dropdown should appear — click first suggestion
        try:
            page.locator('li[role="option"]').first.click(timeout=4000)
            print(f' → npa(option)', end='', flush=True)
        except Exception:
            try:
                page.locator('[class*="MuiAutocomplete"] li').first.click(timeout=3000)
                print(f' → npa(autocomplete)', end='', flush=True)
            except Exception:
                npa_input.press('Enter')
                print(f' → npa(enter)', end='', flush=True)

        time.sleep(0.5)
    except Exception as e:
        print(f' WARN-npa:{e}', end='', flush=True)

    page.screenshot(path=f'/tmp/egk_{p["id"]}_2_form.png')

    # Click "Calculer la prime maintenant"
    try:
        page.get_by_role('button', name='Calculer la prime maintenant').click(timeout=8000)
        print(' → calculer', end='', flush=True)
    except Exception:
        try:
            page.locator('button.MuiButton-contained').filter(has_text='Calculer').first.click(timeout=5000)
            print(' → calculer(css)', end='', flush=True)
        except Exception as e:
            print(f' WARN-calc:{e}', end='', flush=True)

    time.sleep(4)
    try:
        page.wait_for_load_state('networkidle', timeout=8000)
    except Exception:
        pass

    page.screenshot(path=f'/tmp/egk_{p["id"]}_3_results.png')

    # Analyze result page structure
    body_text = page.inner_text('body')
    print(f'\n  Body snippet: {body_text[:400]}')

    # Try to find insurance product cards / tabs
    # EGK might show different product categories
    # Look for dental-related text
    dental_kws = ['dent', 'dental', 'Dent', 'DENT', 'EGK-D']
    found_dental = any(kw in body_text for kw in dental_kws)
    print(f'  Dental text visible: {found_dental}')

    # Extract all card titles visible
    cards_dom = page.evaluate('''() => {
        const result = [];

        // Look for product cards, headings
        const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6,[class*="title"],[class*="heading"],[class*="product-name"],[class*="card-title"]');
        for (const h of headings) {
            const t = h.textContent.trim();
            if (t && t.length < 200) result.push({tag: h.tagName, cls: h.className.substr(0,50), text: t});
        }

        // Look for price-like patterns
        const allText = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        let node;
        while (node = walker.nextNode()) {
            const t = node.textContent.trim();
            if (t && /\\d+\\.\\d{2}/.test(t) && t.length < 100) {
                allText.push({text: t, parentTag: node.parentElement.tagName, parentCls: (node.parentElement.className||'').substr(0,50)});
            }
        }
        return {headings: result, prices: allText.slice(0, 30)};
    }''')

    print(f'  Headings: {json.dumps(cards_dom["headings"], ensure_ascii=False)[:500]}')
    print(f'  Prices: {json.dumps(cards_dom["prices"], ensure_ascii=False)[:500]}')

    # Look for category tabs/navigation to find dental
    tabs_dom = page.evaluate('''() => {
        const result = [];
        const tabs = document.querySelectorAll('[role="tab"], [class*="tab"], button, a[class*="nav"]');
        for (const t of tabs) {
            const text = t.textContent.trim();
            if (text && text.length < 100) result.push({text, role: t.getAttribute("role"), cls: (t.className||'').substr(0,50)});
        }
        return result.slice(0, 20);
    }''')
    print(f'  Tabs/buttons: {json.dumps(tabs_dom, ensure_ascii=False)[:600]}')

    ctx.close()
    return {}


def main():
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        scrape_profil(PROFILS[0], browser)
        browser.close()


if __name__ == '__main__':
    main()
