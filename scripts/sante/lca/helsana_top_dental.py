#!/usr/bin/env python3
"""
Helsana TOP + DENTAplus — scraper de tarifs
============================================
Produits ciblés :
  - TOP (Krankenpflege-Zusatzversicherung) — ambulatoire entrée de gamme
  - DENTAplus Light (Zahnversicherung)     — dentaire, non disponible 55+

Profils :
  - jeune-adulte : 15.01.2000, H, NPA 1000 (Lausanne)
  - famille      : 15.06.1991, F, NPA 1201 (Genève)
  - senior       : 15.01.1971, H, NPA 1000 (55 ans — pas de DENTAplus)

Résultats confirmés (2026-05-17) :
  TOP        : 18.15 / 17.75 / 24.45 CHF/mois
  DENTAplus  : 11.10 / 14.00 / N/A

Usage :
  python3 scripts/helsana_top_dental.py

Sortie :
  /tmp/v9_results.json  — tarifs JSON
  /tmp/v9_*.png         — screenshots de débogage

Architecture clé du portail Helsana (portal.helsana.ch/offer/) :
  - Angular SPA, inputs = input.mat-input-element
  - "Weiter" = <a role="button"> dans <hls-btn-primary class="next-step">
  - "Produkte ansehen" = NAVIGATION vers /products/comparison/<id>, PAS un expand inline
  - Cliquer tous les boutons à la fois = seule GRUNDVERSICHERUNG s'ouvre
  - Solution : clic séquentiel par index, retour via lien "Zurück" entre chaque catégorie
"""
import json, re
from playwright.sync_api import sync_playwright

PROFILS = [
    {'id': 'jeune-adulte', 'dob': '15.01.2000', 'npa': '1000', 'sexe': 'M', 'prenom': 'Alex'},
    {'id': 'famille',      'dob': '15.06.1991', 'npa': '1201', 'sexe': 'F', 'prenom': 'Marie'},
    {'id': 'senior',       'dob': '15.01.1971', 'npa': '1000', 'sexe': 'M', 'prenom': 'Marc'},
]


def accept_cookies(page):
    for sel in ['button:has-text("Akzeptieren")', 'button:has-text("Alle zulassen")']:
        try:
            if page.locator(sel).count() > 0:
                page.locator(sel).first.click()
                page.wait_for_timeout(800)
                return
        except Exception:
            pass


def click_next(page):
    for sel in ['hls-btn-primary.next-step', '.next-step']:
        try:
            el = page.locator(sel)
            if el.count() > 0:
                el.first.click(force=True, timeout=8000)
                page.wait_for_timeout(3000)
                return
        except Exception:
            pass
    page.evaluate('''() => {
        const el = document.querySelector("hls-btn-primary.next-step a, .next-step a");
        if (el) el.click();
    }''')
    page.wait_for_timeout(3000)


def price_near(text, keyword):
    idx = text.find(keyword)
    if idx < 0:
        return None
    ctx = text[idx:idx + 1000]
    for p in re.findall(r"\b(\d{1,4}['.,]\d{2})\b", ctx):
        v = float(p.replace("'", '').replace(',', '.'))
        if 1.0 < v < 2000.0:
            return v
    return None


def navigate_to_selection(page, profil):
    """Parcourt le flux Helsana : constellation → personnes → NPA → avantages → sélection."""
    page.goto('https://portal.helsana.ch/offer/personal-details/constellation?lang=fr',
              wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(2000)
    accept_cookies(page)
    page.locator('article.constellation-item').first.click(force=True)
    page.wait_for_timeout(3000)

    mat = page.locator('input.mat-input-element')
    mat.nth(0).click(); mat.nth(0).fill(profil['prenom'])
    mat.nth(1).click(); mat.nth(1).type(profil['dob'], delay=50)
    mat.nth(1).dispatch_event('blur')
    page.locator('button.mat-button-toggle-button').nth(1 if profil['sexe'] == 'M' else 0).click(force=True)
    click_next(page)

    page.locator('input.mat-input-element').first.click()
    page.locator('input.mat-input-element').first.type(profil['npa'], delay=50)
    page.wait_for_timeout(2000)
    try:
        page.locator('mat-option').first.click(force=True, timeout=2000)
    except Exception:
        pass
    click_next(page)
    page.wait_for_timeout(2000)
    click_next(page)  # Passer les avantages
    page.wait_for_timeout(5000)
    print(f'  Page sélection : {page.url}')


def get_category_info(page):
    """Retourne la liste des catégories et le nombre de boutons 'Produkte ansehen'."""
    page.wait_for_timeout(2000)
    return page.evaluate('''() => {
        const h2s = [...document.querySelectorAll('h2')];
        const cats = h2s.map(h => h.textContent.trim()).filter(t => t.length > 3);
        const btns = [...document.querySelectorAll("a[role='button']")]
            .filter(b => b.textContent.includes('Produkte ansehen'));
        return { categories: cats, btnCount: btns.length };
    }''')


def click_category_btn(page, index, label=''):
    """Clique le Nième bouton 'Produkte ansehen' et attend la navigation."""
    url_before = page.url
    result = page.evaluate(f'''(idx) => {{
        const btns = [...document.querySelectorAll("a[role='button']")]
            .filter(b => b.textContent.includes('Produkte ansehen'));
        if (idx >= btns.length) return 'hors limites : ' + btns.length;
        btns[idx].click();
        return 'cliqué index ' + idx;
    }}''', index)
    print(f'  Catégorie {index} ({label}) : {result}')
    try:
        page.wait_for_url(lambda url: url != url_before, timeout=8000)
    except Exception:
        pass
    page.wait_for_timeout(3000)
    print(f'  → {page.url}')


def go_back_to_selection(page):
    """Revient à la page /products/selection via le lien Zurück."""
    for txt in ['Zurück', 'Retour', '← Zurück']:
        try:
            el = page.get_by_text(txt, exact=False)
            if el.count() > 0:
                el.first.click(force=True)
                page.wait_for_timeout(3000)
                return
        except Exception:
            pass
    page.go_back()
    page.wait_for_timeout(3000)


def run_profil(profil, p):
    print(f'\n{"="*60}\n=== {profil["id"]} ===')
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        locale='fr-CH', viewport={'width': 1280, 'height': 900},
        user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    )
    page = ctx.new_page()
    results = {'top': None, 'dentaplus': None}

    try:
        navigate_to_selection(page, profil)

        info = get_category_info(page)
        print(f'  Catégories : {info["categories"]}')
        print(f'  Boutons : {info["btnCount"]}')

        # ── TOP — Krankenpflege-Zusatzversicherung (toujours index 1) ──
        click_category_btn(page, 1, 'Krankenpflege')
        top_price = price_near(page.inner_text('body'), 'TOP')
        print(f'  TOP : {top_price} CHF/mois')
        results['top'] = top_price

        # ── DENTAplus — Zahnversicherung (absent pour senior 55+) ──────
        go_back_to_selection(page)
        info2 = get_category_info(page)
        page_text = page.inner_text('body')
        has_dental = 'Zahnversicherung' in page_text

        if has_dental:
            real_cats = [c for c in info2['categories']
                         if not any(x in c for x in ['Datenschutz', 'Cookie', 'Privacy'])]
            dental_idx = next(
                (i for i, c in enumerate(real_cats) if 'zahnversicherung' in c.lower()),
                3  # fallback
            )
            print(f'  Index Zahnversicherung : {dental_idx}')
            click_category_btn(page, dental_idx, 'Zahnversicherung')
            denta_price = price_near(page.inner_text('body'), 'DENTAplus')
            print(f'  DENTAplus Light : {denta_price} CHF/mois')
            results['dentaplus'] = denta_price
        else:
            print('  DENTAplus : N/A (55+ non éligible)')

    except Exception as e:
        print(f'  ERREUR : {e}')
        import traceback; traceback.print_exc()
        try:
            page.screenshot(path=f'/tmp/v9_{profil["id"]}_error.png')
        except Exception:
            pass

    browser.close()
    return results


def run():
    all_results = {}
    with sync_playwright() as p:
        for profil in PROFILS:
            all_results[profil['id']] = run_profil(profil, p)

    print('\n\n=== RÉSULTATS ===')
    for pid, r in all_results.items():
        print(f'{pid}: TOP={r["top"]}  DENTAplus={r["dentaplus"]}')

    with open('/tmp/v9_results.json', 'w') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    print('Sauvegardé : /tmp/v9_results.json')


if __name__ == '__main__':
    run()
