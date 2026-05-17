#!/usr/bin/env python3
"""
SWICA Tarifs Scraper
For each profile, creates a fresh browser context and fills the SWICA calculator form.
Captures the productgroup API call to extract VVG (complementary) product prices.
"""
import json
import time
from playwright.sync_api import sync_playwright
from datetime import date

TODAY = date.today().isoformat()
BASE = 'https://calculate.swica.ch/backend/offer/v1'

PROFILS = [
    {'id': 'jeune-adulte', 'dob': '15.01.2000', 'dob_api': '2000-01-15', 'female': False, 'npa': '1000', 'sex': 'M'},
    {'id': 'famille',      'dob': '15.01.1991', 'dob_api': '1991-01-15', 'female': True,  'npa': '1201', 'sex': 'F'},
    {'id': 'senior',       'dob': '15.01.1971', 'dob_api': '1971-01-15', 'female': False, 'npa': '1000', 'sex': 'M'},
]

PRODUCT_MAPPING = {
    ('prod.hospita.private.world.age', 'COD_UZ_AUS', 'COD_SB_HO1'): 'swica-bestmed',
    ('prod.hospita.private.age',       'COD_UZ_AUS', 'COD_SB_HO1'): 'swica-hospita-privee',
    ('prod.hospita.private.age',       'COD_UZ_AUS', 'COD_SB_HO2'): 'swica-hospita-flex-privee',
    ('prod.hospita.semiprivate.age',   'COD_UZ_AUS', 'COD_SB_HO1'): 'swica-hospita-demi-privee',
    ('prod.hospita.semiprivate.age',   'COD_UZ_AUS', 'COD_SB_HO2'): 'swica-hospita-flex-demi-privee',
    ('prod.hospita.general.age',       'COD_UZ_AUS', 'COD_PO_HO1'): 'swica-hospita-commune',
    ('prod.completa.forte',            'COD_UZ_AUS', 'COD_JF_G01'): 'swica-completa-forte',
    ('prod.praevita',                  None,          None):          'swica-praevita',
    ('prod.optima',                    'COD_UZ_AUS', 'COD_JF_B01'): 'swica-optima',
    ('prod.denta',                     'COD_UZ_EIN', 'COD_VS_DE1'): 'swica-denta',
}


def get_price(product, acc_code, second_code):
    if acc_code is None and second_code is None:
        # No-criteria product (praevita)
        for v in product.get('cartesianProduct', []):
            return v['price']['amount']
        return None

    for v in product.get('cartesianProduct', []):
        vals = [c['value'] for c in v.get('criteria', [])]
        if acc_code in vals and second_code in vals:
            return v['price']['amount']

    # Fallback: find cheapest variant containing only acc_code (ignores second_code)
    # Used for commune `.contract_age` which uses DEDUCTIBLE instead of PLUS_OPTION
    best = None
    for v in product.get('cartesianProduct', []):
        vals = [c['value'] for c in v.get('criteria', [])]
        if acc_code in vals:
            price = v['price']['amount']
            if best is None or price < best:
                best = price
    return best


def extract_prices(groups):
    all_products = {prod['id']: prod for g in groups for prod in g.get('products', [])}
    prices = {}
    for (prod_id, acc_code, second_code), swica_id in PRODUCT_MAPPING.items():
        # Try standard .age name, then .contract_age variant (for seniors)
        prod = all_products.get(prod_id)
        if not prod:
            alt_id = prod_id.replace('.age', '.contract_age')
            prod = all_products.get(alt_id)
        prices[swica_id] = get_price(prod, acc_code, second_code) if prod else None
    return prices


def wait_idle(page, timeout=8000):
    try:
        page.wait_for_load_state('networkidle', timeout=timeout)
    except Exception:
        pass


def run_profil(p, profil):
    """Run one fresh browser context for a single profile and capture productgroup data."""
    captured = {}

    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        locale='fr-CH',
        viewport={'width': 1280, 'height': 900},
        extra_http_headers={'Accept-Language': 'fr-CH,fr;q=0.9'},
    )
    page = ctx.new_page()

    def on_response(response):
        url = response.url
        if 'calculate.swica.ch/backend' not in url:
            return
        if 'productgroup' not in url:
            return
        try:
            body = response.json()
            captured['groups'] = body
            print(f'    Captured productgroup: {len(body)} groups')
        except Exception:
            pass

    page.on('response', on_response)

    url = (f'https://calculate.swica.ch?LANGUAGES=2&GEBTAG={profil["dob"]}'
           f'&PLZID={profil["npa"]}&GESCHLECHT={profil["sex"]}&KVC=&SWICAKDN=0&ID=prm-allg')
    print(f'  Loading {url[:80]}...')
    page.goto(url, wait_until='networkidle', timeout=30000)
    time.sleep(2)

    # Accept cookie dialog
    try:
        btn = page.locator('button:has-text("Accepter les cookies")').first
        if btn.is_visible(timeout=2000):
            btn.click()
            time.sleep(1)
            print('  Cookies accepted')
    except Exception:
        pass

    # Wait for i18n translations to load
    for _ in range(20):
        try:
            body_text = page.locator('body').inner_text()
            if 'app.person.card.person.label' not in body_text:
                print('  Translations loaded')
                break
        except Exception:
            pass
        time.sleep(0.5)

    page.screenshot(path=f'/tmp/swica_{profil["id"]}_form.png')

    # Show visible inputs
    inputs = page.locator('input:visible').all()
    print(f'  Visible inputs: {len(inputs)}')
    for inp in inputs[:5]:
        try:
            print(f'    #{inp.get_attribute("id")} = "{inp.input_value()}"')
        except Exception:
            pass

    # The SWICA form has consistent Vuetify IDs:
    # input-v-0-10 = name, input-v-0-12 = birthdate, input-v-0-17 = NPA

    # Fill name
    try:
        name_inp = page.locator('#input-v-0-10').first
        name_inp.click(timeout=3000)
        name_inp.fill('Test', timeout=3000)
        name_inp.press('Tab')
        print('  Name filled')
    except Exception as e:
        print(f'  Name error: {e}')

    # Fill birthdate using ID
    try:
        bdate = page.locator('#input-v-0-12').first
        bdate.click(timeout=3000)
        bdate.fill(profil['dob'], timeout=3000)
        bdate.press('Tab')
        time.sleep(0.5)
        print(f'  Birthdate: {profil["dob"]}')
    except Exception as e:
        print(f'  Birthdate error: {e}')

    # Gender: pre-selected by URL param, but verify
    # Radio buttons are not standard input type=radio in Vuetify — they're custom
    # The URL param GESCHLECHT=M/F should pre-select the gender

    # Fill NPA using ID
    try:
        zip_input = page.locator('#input-v-0-17').first
        zip_input.click(timeout=3000)
        zip_input.fill(profil['npa'], timeout=3000)
        time.sleep(2)  # wait longer for autocomplete

        # Try different selectors for autocomplete dropdown
        selected = False
        for sel in ['[role="option"]:visible', 'li.v-list-item:visible', '.v-autocomplete__content li:visible', 'li:visible']:
            try:
                opt = page.locator(sel).first
                if opt.is_visible(timeout=1000):
                    opt.click()
                    time.sleep(0.5)
                    print(f'  NPA {profil["npa"]} selected via {sel}')
                    selected = True
                    break
            except Exception:
                pass

        if not selected:
            zip_input.press('Enter')
            time.sleep(0.5)
            print(f'  NPA {profil["npa"]} confirmed via Enter (no dropdown)')
    except Exception as e:
        print(f'  NPA error: {e}')

    page.screenshot(path=f'/tmp/swica_{profil["id"]}_filled.png')

    # Click Continue / Next button — use JS click to bypass overlays
    before = len(captured)
    try:
        # Find the primary button (Continue/Weiter)
        btn = page.locator('[data-testid="button-next"]').first
        if not btn.is_visible(timeout=2000):
            btn = page.locator('button.v-btn--elevated.bg-primary').last
        if not btn.is_visible(timeout=2000):
            btn = page.locator('button').filter(has_text='app.button.label.continue').first

        # Use JS click to bypass overlay intercept
        page.evaluate('(el) => el.click()', btn.element_handle())
        print(f'  Clicked Continue (JS)')
        time.sleep(3)
        wait_idle(page, 10000)
    except Exception as e:
        print(f'  Continue click error: {e}')
        # Fallback: press Enter
        page.keyboard.press('Enter')
        time.sleep(3)
        wait_idle(page, 10000)

    page.screenshot(path=f'/tmp/swica_{profil["id"]}_after.png')
    print(f'  Captured after Continue: {list(captured.keys())}')

    # If not captured yet, try navigating to insurances step
    if 'groups' not in captured:
        try:
            ins_btn = page.locator('button:has-text("step.insurances"), [data-step="insurances"]').first
            if not ins_btn.is_visible(timeout=1000):
                # Try all buttons and look for insurance tab
                btns = page.locator('button:visible').all()
                for b in btns:
                    try:
                        txt = b.inner_text()
                        if 'insurance' in txt.lower() or 'assur' in txt.lower():
                            b.click()
                            time.sleep(2)
                            wait_idle(page)
                            break
                    except Exception:
                        pass
        except Exception:
            pass

        # Try more Continue clicks
        for _ in range(3):
            if 'groups' in captured:
                break
            try:
                btn = page.locator('[data-testid="button-next"]').first
                if btn.is_visible(timeout=1000):
                    page.evaluate('(el) => el.click()', btn.element_handle())
                    time.sleep(2)
                    wait_idle(page, 8000)
            except Exception:
                break

    browser.close()
    return captured.get('groups')


def run():
    profile_prices = {}

    with sync_playwright() as p:
        for profil in PROFILS:
            print(f'\n{"="*60}')
            print(f'Profile: {profil["id"]}')

            groups = run_profil(p, profil)
            if groups:
                prices = extract_prices(groups)
                profile_prices[profil['id']] = prices
                print(f'  Prices extracted: {sum(1 for v in prices.values() if v is not None)}/{len(prices)} products')
            else:
                print(f'  No productgroup data captured for {profil["id"]}')

    return profile_prices


def generate_tarifs_ts(profile_prices):
    all_swica_ids = list(dict.fromkeys(PRODUCT_MAPPING.values()))

    print('\n\n=== TypeScript tarif snippets for swica.ts ===\n')
    for swica_id in all_swica_ids:
        entries = []
        for profil_id in ['jeune-adulte', 'famille', 'senior']:
            amount = profile_prices.get(profil_id, {}).get(swica_id)
            if amount is not None:
                entries.append({'profilId': profil_id, 'montantCHF': round(amount, 2), 'source': 'site-web', 'dateReleve': TODAY})

        if entries:
            print(f'// {swica_id}')
            print('tarifs: [')
            for e in entries:
                print(f"  {{ profilId: '{e['profilId']}', montantCHF: {e['montantCHF']}, source: 'site-web', dateReleve: '{e['dateReleve']}' }},")
            print('],\n')
        else:
            print(f'// {swica_id}: no data\n')


if __name__ == '__main__':
    profile_prices = run()

    with open('/tmp/swica_prices.json', 'w') as f:
        json.dump(profile_prices, f, indent=2, ensure_ascii=False)
    print(f'\nSaved to /tmp/swica_prices.json')

    if profile_prices:
        generate_tarifs_ts(profile_prices)
    else:
        print('\nNo prices captured.')
