#!/usr/bin/env python3
"""
Sanitas Tarifs Scraper — Production
Endpoint: GET /api3.sanitas.com/ovpv3/public/baskets/{apiBasketId}
  → data.persons[0].products.products → individual product prices

Product mapping (Sanitas API code → our .ts ID):
  SAMB06SProdukt → sanitas-vital-basic     (ambulatoire, entry)
  SAMB06MProdukt → sanitas-vital-smart     (ambulatoire, medium, amValue=5000 variant)
  SAMB06LProdukt → sanitas-vital-premium   (ambulatoire, full)
  H3SL04Produkt  → sanitas-hospital-standard (commune, Liberty)
  SSHB01Produkt  → sanitas-hospital-extra  (semi-privée, Liberty, value=0 no deductible)
  SSPB01Produkt  → sanitas-hospital-top    (privée, Liberty, value=0 no deductible)
  SDZA02Produkt  → sanitas-dental-basic    (dental 80%/2k)
  Z04Produkt     → sanitas-dental          (dental 80%/5k + ortho)
  SAMK02Produkt  → sanitas-desir-enfant    (fertility)
"""
import json
import time
from playwright.sync_api import sync_playwright
from datetime import date

TODAY = date.today().isoformat()

PROFILS = [
    {'id': 'jeune-adulte', 'dob': '15.01.2000', 'female': False, 'npa': '1000'},
    {'id': 'famille',      'dob': '15.01.1991', 'female': True,  'npa': '1201'},
    {'id': 'senior',       'dob': '15.01.1971', 'female': False, 'npa': '1000'},
]

SKIP_DOMAINS = ['sslsc.sanitas', 'cookielaw', 'onetrust', 'geolocation.onetrust',
                'contentsquare', 'demdex', 'omtrdc', 'google', 'facebook']

PRODUCT_MAPPING = {
    'SAMB06SProdukt': 'sanitas-vital-basic',
    'SAMB06MProdukt': 'sanitas-vital-smart',
    'SAMB06LProdukt': 'sanitas-vital-premium',
    'H3SL04Produkt':  'sanitas-hospital-standard',
    'SSHB01Produkt':  'sanitas-hospital-extra',
    'SSPB01Produkt':  'sanitas-hospital-top',
    'SDZA02Produkt':  'sanitas-dental-basic',
    'Z04Produkt':     'sanitas-dental',
    'SAMK02Produkt':  'sanitas-desir-enfant',
}


def get_selected_price(prod_data):
    """
    Extract the price for the selected/default variant.
    Rules:
    - For products with value=0 option (no deductible), use value=0 price
    - For simple products, use the first variant with a price and selected=true
    - Fallback: first variant with a price
    """
    prices = prod_data.get('prices', [])
    if not prices:
        return None

    # Try selected=true first
    for v in prices:
        if v.get('selected') and 'price' in v:
            return v['price']

    # For hospital products: prefer value=0 (no deductible)
    for v in prices:
        if v.get('value') == 0 and 'price' in v:
            return v['price']

    # For ambulatory (SAMB06M): prefer amValue=5000 variant
    for v in prices:
        if v.get('amValue') == 5000 and 'price' in v:
            return v['price']

    # Fallback: first variant with a price
    for v in prices:
        if 'price' in v:
            return v['price']

    return None


def extract_prices(basket_body):
    """Extract per-product prices from basket GET response."""
    try:
        persons = basket_body['data']['persons']
        if not persons:
            return {}
        products = persons[0]['products']['products']
        prices = {}
        for api_code, ts_id in PRODUCT_MAPPING.items():
            prod = products.get(api_code)
            if prod:
                price = get_selected_price(prod)
                prices[ts_id] = price
                valid = prod.get('valid', True)
                if not valid:
                    prices[ts_id] = None  # product not available for this profile
            else:
                prices[ts_id] = None
        return prices
    except Exception as e:
        print(f'  extract_prices error: {e}')
        return {}


def wait_idle(page, timeout=8000):
    try:
        page.wait_for_load_state('networkidle', timeout=timeout)
    except Exception:
        pass


def click_continue(page):
    for sel in ['[data-testid="button-next"]',
                'button:has-text("Reprendre")',
                'button:has-text("Continuer")',
                'button:has-text("Suivant")',
                'button:has-text("Weiter")',
                'button.v-btn--elevated']:
        try:
            btn = page.locator(sel).last
            if btn.is_visible(timeout=1000):
                page.evaluate('(el) => el.click()', btn.element_handle())
                return True
        except Exception:
            pass
    return False


def run_profil(p, profil):
    """Fresh browser context. Return basket body with full pricing."""
    basket_body = None

    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        locale='fr-CH',
        viewport={'width': 1280, 'height': 900},
        extra_http_headers={'Accept-Language': 'fr-CH,fr;q=0.9'},
    )
    page = ctx.new_page()

    def on_response(response):
        nonlocal basket_body
        url = response.url
        if any(d in url for d in SKIP_DOMAINS):
            return
        ct = response.headers.get('content-type', '')
        if 'json' not in ct:
            return
        try:
            body = response.json()
            # Capture basket GET (has full pricing data)
            if ('/ovpv3/public/baskets/' in url
                    and response.request.method == 'GET'
                    and 'data' in body
                    and isinstance(body.get('data'), dict)
                    and 'persons' in body['data']):
                basket_body = body
                persons = body['data'].get('persons', [])
                if persons and persons[0].get('products', {}).get('products'):
                    n_products = len(persons[0]['products']['products'])
                    print(f'    Basket GET captured ({n_products} products)')
        except Exception:
            pass

    page.on('response', on_response)

    print(f'\n{"="*60}')
    print(f'Profile: {profil["id"]}  DOB:{profil["dob"]}  NPA:{profil["npa"]}')

    page.goto('https://calculator.sanitas.com/fr', wait_until='networkidle', timeout=30000)
    time.sleep(2)

    # Accept cookies
    try:
        btn = page.locator('button:has-text("Tout accepter"), button:has-text("Alle zulassen"), button:has-text("Accepter tout")').first
        if btn.is_visible(timeout=3000):
            btn.click()
            time.sleep(1)
            print('  Cookies accepted')
    except Exception:
        pass

    # Fill NPA
    try:
        npa_inp = page.locator('#v-0').first
        npa_inp.click(timeout=3000)
        npa_inp.fill(profil['npa'], timeout=3000)
        time.sleep(2)
        for sel in ['[role="option"]:visible', 'li[role="option"]:visible']:
            try:
                opt = page.locator(sel).first
                if opt.is_visible(timeout=1000):
                    opt.click()
                    time.sleep(0.5)
                    print(f'  NPA {profil["npa"]} selected')
                    break
            except Exception:
                pass
        else:
            npa_inp.press('Enter')
            print(f'  NPA via Enter')
    except Exception as e:
        print(f'  NPA error: {e}')

    # Fill DOB (if present on home page)
    try:
        dob_inp = page.locator('#v-1').first
        if dob_inp.is_visible(timeout=1000):
            dob_inp.click()
            dob_inp.fill(profil['dob'])
            dob_inp.press('Tab')
            time.sleep(0.3)
            print(f'  DOB on home: {profil["dob"]}')
    except Exception:
        pass

    # Fill sex
    try:
        sex_label = 'femme' if profil['female'] else 'homme'
        trigger = page.locator('[role="combobox"]').first
        if trigger.is_visible(timeout=1000):
            trigger.click()
            time.sleep(0.8)
            opt = page.locator(f'[role="option"]:has-text("{sex_label}"), [role="option"]:has-text("{sex_label.capitalize()}")').first
            if opt.is_visible(timeout=2000):
                opt.click()
                time.sleep(0.3)
                print(f'  Sex: {sex_label}')
            else:
                items = page.locator('[role="option"]:visible').all()
                idx = 1 if profil['female'] else 0
                if len(items) > idx:
                    items[idx].click()
                    print(f'  Sex via item #{idx}')
    except Exception as e:
        print(f'  Sex error: {e}')

    # Continue step 1
    click_continue(page)
    time.sleep(4)
    wait_idle(page, 12000)

    url1 = page.url
    print(f'  After step 1: {url1}')

    # If on /persons/, continue again
    if '/persons' in url1:
        print('  On /persons/ → continuing...')
        click_continue(page)
        time.sleep(5)
        wait_idle(page, 15000)
        print(f'  After step 2: {page.url}')

    # Navigate to ADDITIONAL tab to load basket data with person pricing
    current_url = page.url
    url_basket_id = None
    if '/products/' in current_url:
        parts = current_url.split('/products/')
        if len(parts) > 1:
            url_basket_id = parts[1].split('/')[0]

    if url_basket_id:
        base = f'https://calculator.sanitas.com/fr/products/{url_basket_id}'
        # Navigate through each tab to ensure basket data is loaded
        for category in ['ADDITIONAL', 'HOSP']:
            if basket_body:
                break
            try:
                page.goto(f'{base}/{category}', wait_until='networkidle', timeout=20000)
                time.sleep(3)
            except Exception as e:
                print(f'  Tab {category} error: {e}')

    if basket_body:
        prices = extract_prices(basket_body)
        print(f'  Prices extracted:')
        for ts_id, price in prices.items():
            print(f'    {ts_id}: {price}')
    else:
        prices = {}
        print('  No basket body captured')

    browser.close()
    return prices, basket_body


def generate_tarifs_ts(profile_prices):
    """Generate TypeScript tarif blocks for sanitas.ts."""
    all_ids = list(dict.fromkeys(PRODUCT_MAPPING.values()))

    print('\n\n=== TypeScript tarif snippets for sanitas.ts ===\n')
    for ts_id in all_ids:
        entries = []
        for profil_id in ['jeune-adulte', 'famille', 'senior']:
            amount = profile_prices.get(profil_id, {}).get(ts_id)
            if amount is not None:
                entries.append({'profilId': profil_id, 'montantCHF': round(amount, 2),
                                'source': 'site-web', 'dateReleve': TODAY})
        if entries:
            print(f'// {ts_id}')
            print('tarifs: [')
            for e in entries:
                print(f"  {{ profilId: '{e['profilId']}', montantCHF: {e['montantCHF']}, source: 'site-web', dateReleve: '{e['dateReleve']}' }},")
            print('],\n')
        else:
            print(f'// {ts_id}: no data\n')


if __name__ == '__main__':
    profile_prices = {}

    with sync_playwright() as p:
        for profil in PROFILS:
            prices, basket_body = run_profil(p, profil)
            profile_prices[profil['id']] = prices

            # Save raw basket for verification
            if basket_body:
                fname = f'/tmp/sanitas_{profil["id"]}_basket.json'
                with open(fname, 'w', encoding='utf-8') as f:
                    json.dump(basket_body, f, indent=2, ensure_ascii=False)
                print(f'  Saved: {fname}')

    with open('/tmp/sanitas_prices.json', 'w', encoding='utf-8') as f:
        json.dump(profile_prices, f, indent=2, ensure_ascii=False)
    print(f'\nSaved to /tmp/sanitas_prices.json')

    if any(profile_prices.values()):
        generate_tarifs_ts(profile_prices)
    else:
        print('\nNo prices captured.')
