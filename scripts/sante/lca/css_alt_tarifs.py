#!/usr/bin/env python3
"""
CSS Médecines Alternatives — scraper final
Flux : Personnes → VOIR LE PRIX → clic Ambulatoire → clic Méthodes alternatives
Prix : base Economy (P.price) + increments pour Balance (+6.xx) et Premium (+13.xx)
Cible : css-alt-economy / css-alt-balance / css-alt-premium
"""
import json
import time
import re
from datetime import date
from playwright.sync_api import sync_playwright

TODAY = date.today().isoformat()

PROFILS = [
    {'id': 'jeune-adulte', 'jj': '15', 'mm': '01', 'aaaa': '2000', 'npa': '1000', 'sexe': 'M',
     'npa_option': '1000\nLausanne'},
    {'id': 'famille',      'jj': '15', 'mm': '06', 'aaaa': '1991', 'npa': '1201', 'sexe': 'F',
     'npa_option': '1201\nGenève'},
    {'id': 'senior',       'jj': '15', 'mm': '01', 'aaaa': '1971', 'npa': '1000', 'sexe': 'M',
     'npa_option': '1000\nLausanne'},
]

CALC_URL = 'https://calculator.css.ch/start?lang=fr&product=ALTERNATIVVERSICHERUNG_MYFLEX'


def scrape_profil(p, browser):
    ctx = browser.new_context(locale='fr-CH', viewport={'width': 1280, 'height': 900})
    page = ctx.new_page()

    print(f"\n[{p['id']}]", end='', flush=True)

    page.goto(CALC_URL, wait_until='domcontentloaded', timeout=30000)
    time.sleep(4)

    # Cookies
    page.click('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll', timeout=8000)
    page.wait_for_selector('#CybotCookiebotDialog', state='hidden', timeout=8000)
    time.sleep(1.5)

    # Sexe (labels)
    sex_label = 'masculin' if p['sexe'] == 'M' else 'féminin'
    page.click(f'label:has-text("{sex_label}")', timeout=5000)

    # DOB
    page.locator('input[placeholder="JJ"]').fill(p['jj'])
    page.locator('input[placeholder="MM"]').fill(p['mm'])
    page.locator('input[placeholder="AAAA"]').fill(p['aaaa'])
    page.keyboard.press('Tab')
    time.sleep(0.5)

    # NPA
    npa_input = page.locator('input[placeholder*="NPA"]').first
    npa_input.fill(p['npa'])
    time.sleep(2)
    try:
        page.get_by_text(p['npa_option']).first.click(timeout=4000)
    except Exception:
        # Fallback: premier résultat dropdown
        try:
            page.locator('[class~="item"]').first.click(timeout=3000)
        except Exception:
            npa_input.press('Enter')
    time.sleep(0.5)

    # ENREGISTRER
    page.locator('calc-button').filter(has_text="ENREGISTRER").first.click()
    time.sleep(2)
    try:
        page.wait_for_load_state('networkidle', timeout=6000)
    except Exception:
        pass

    # VOIR LE PRIX
    page.locator('calc-button').filter(has_text="VOIR LE PRIX").first.click()
    time.sleep(3)
    try:
        page.wait_for_load_state('networkidle', timeout=8000)
    except Exception:
        pass

    print(' → voir prix', end='', flush=True)

    # Cliquer Ambulatoire myFlex (pour activer alt-médecines)
    try:
        page.get_by_text("Assurance ambulatoire myFlex").first.click(timeout=5000)
        time.sleep(2)
        try:
            page.wait_for_load_state('networkidle', timeout=5000)
        except Exception:
            pass
        print(' → ambulatoire', end='', flush=True)
    except Exception as e:
        print(f' WARN-amb:{e}', end='', flush=True)

    # Cliquer Méthodes thérapeutiques alternatives
    try:
        page.get_by_text("Méthodes thérapeutiques alternatives").first.click(timeout=5000)
        time.sleep(2)
        try:
            page.wait_for_load_state('networkidle', timeout=5000)
        except Exception:
            pass
        print(' → alt-médecines', end='', flush=True)
    except Exception as e:
        print(f' WARN-alt:{e}', end='', flush=True)

    page.screenshot(path=f'/tmp/css_alt_{p["id"]}_final.png')

    # ─── Extraction des prix ──────────────────────────────────────────────────
    # Pattern DOM :
    #  H5.title = Economy / Balance / Premium (pour l'ambulatoire section aussi)
    #  P.price = base Economy
    #  CALC-BUTTON = "choisir (+X.XX)" pour Balance, "choisir (+Y.YY)" pour Premium
    # On veut les 3 sections → la 3ème est les alt-médecines

    dom_data = page.evaluate('''() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        const result = [];
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent.trim();
            if (!text || text.length > 200) continue;
            const parent = node.parentElement;
            const tag = parent.tagName;
            const cls = (parent.className || "").trim();
            if (tag === "H5" && cls === "title" && ["Economy","Balance","Premium"].includes(text)) {
                result.push({type: "echelon_header", text: text});
            } else if (tag === "P" && cls === "price" && /^\\d+\\.\\d{2}$/.test(text)) {
                result.push({type: "price_base", text: text});
            } else if (tag === "CALC-BUTTON" && text.match(/^choisir \\(\\+ [\\d.]+\\)$/i)) {
                const amount = parseFloat(text.replace(/.*\\+\\s*([\\d.]+).*/, "$1"));
                result.push({type: "price_increment", text: text, amount: amount});
            }
        }
        return result;
    }''')

    print(f'\n  DOM data: {dom_data}')

    # Parser les 3 sections Economy/Balance/Premium
    # Chaque section = [Economy header, Balance header, Premium header, P.price, choisir(+X), choisir(+Y)]
    sections = []
    current = {'headers': [], 'base': None, 'increments': []}

    for item in dom_data:
        if item['type'] == 'echelon_header':
            if item['text'] == 'Economy' and current['headers']:
                # Début d'une nouvelle section
                sections.append(current)
                current = {'headers': [], 'base': None, 'increments': []}
            current['headers'].append(item['text'])
        elif item['type'] == 'price_base':
            current['base'] = float(item['text'])
        elif item['type'] == 'price_increment':
            current['increments'].append(item['amount'])

    if current['headers']:
        sections.append(current)

    print(f'  Sections trouvées: {len(sections)}')
    for i, s in enumerate(sections):
        print(f'    Section {i}: base={s["base"]}, increments={s["increments"]}')

    # La 3ème section = alt-médecines
    prices = {}
    if len(sections) >= 3:
        alt_section = sections[2]
        base = alt_section['base']
        increments = alt_section['increments']

        if base is not None:
            prices['economy'] = round(base, 2)
        if len(increments) >= 1:
            prices['balance'] = round(base + increments[0], 2) if base is not None else None
        if len(increments) >= 2:
            prices['premium'] = round(base + increments[1], 2) if base is not None else None
    elif len(sections) == 1:
        # Cas où une seule section est trouvée (peut-être que seules les alt-médecines sont visibles)
        s = sections[0]
        base = s['base']
        increments = s['increments']
        if base is not None:
            prices['economy'] = round(base, 2)
        if len(increments) >= 1 and base is not None:
            prices['balance'] = round(base + increments[0], 2)
        if len(increments) >= 2 and base is not None:
            prices['premium'] = round(base + increments[1], 2)

    ctx.close()
    return prices


def main():
    final_prices = {}

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)

        for p in PROFILS:
            prices = scrape_profil(p, browser)
            final_prices[p['id']] = prices
            print(f'\n  → {prices}')

        browser.close()

    print("\n\n=== RÉSUMÉ CSS ALT-MÉDECINES ===")
    for profil_id, prices in final_prices.items():
        print(f"\n{profil_id}:")
        print(f"  Economy : CHF {prices.get('economy', 'N/A')}")
        print(f"  Balance : CHF {prices.get('balance', 'N/A')}")
        print(f"  Premium : CHF {prices.get('premium', 'N/A')}")

    with open('/tmp/css_alt_final.json', 'w') as f:
        json.dump(final_prices, f, ensure_ascii=False, indent=2)
    print(f"\n→ /tmp/css_alt_final.json")
    print(f"→ Screenshots: /tmp/css_alt_*.png")


if __name__ == '__main__':
    main()
