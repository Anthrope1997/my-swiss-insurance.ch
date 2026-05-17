#!/usr/bin/env python3
"""
Concordia Tarifs Scraper — Phase 2
Intercepts the Concordia pricing API by automating the premium calculator.
Endpoint: POST /ipr/rest/praemien  (405 on GET → POST exists)
"""
import json
import time
from datetime import date
from playwright.sync_api import sync_playwright, Page

TODAY = date.today()
URL = 'https://www.calculateur-de-primes.concordia.ch/ipr/home?lang=fr'

PROFILS = [
    {'id': 'jeune-adulte', 'age': 26, 'sexe': 'M', 'npa': '1000'},
    {'id': 'famille',      'age': 35, 'sexe': 'F', 'npa': '1201'},  # 1200 → empty, use 1201
    {'id': 'senior',       'age': 55, 'sexe': 'M', 'npa': '1000'},
]


def wait_idle(page: Page, timeout=8000):
    try:
        page.wait_for_load_state('networkidle', timeout=timeout)
    except Exception:
        pass


def fill_profil(page: Page, profil: dict, calls: list):
    birth_year = TODAY.year - profil['age']
    print(f"\n  Profil: {profil['id']} ({profil['age']}{'H' if profil['sexe']=='M' else 'F'} NPA {profil['npa']})")

    # First name
    name_input = page.locator('#input-vorname0')
    name_input.wait_for(state='visible', timeout=10000)
    name_input.fill('Test')

    # Birthdate — day/month/year fields (not placeholder-based)
    page.locator('#birthdate-input-day').fill('15')
    page.locator('#birthdate-input-month').fill('01')
    page.locator('#birthdate-input-year').fill(str(birth_year))
    page.keyboard.press('Tab')
    time.sleep(0.3)

    # Immigration: check "false" = not immigrating (born/resident in CH)
    page.locator('#true-false-0-false').check()

    # Gender
    if profil['sexe'] == 'M':
        page.locator('#gender-0-m').check()
    else:
        page.locator('#gender-0-w').check()

    # NPA — type="tel", data-cy="input-gemeinde"
    npa_input = page.locator('[data-cy="input-gemeinde"]')
    npa_input.fill(profil['npa'])
    time.sleep(0.8)

    # Wait for autocomplete dropdown and pick the first result
    try:
        # Concordia uses a lib-gemeinde component; wait for the suggestion list
        first_option = page.locator(
            'lib-gemeinde .suggestions-list li, '
            'lib-gemeinde [class*="option"], '
            'lib-gemeinde [class*="item"], '
            'lib-gemeinde [class*="result"]'
        ).first
        first_option.click(timeout=3000)
        print(f'    Gemeinde selected via dropdown')
        time.sleep(0.3)
    except Exception:
        # Fallback: press Enter or Tab to confirm NPA
        npa_input.press('Enter')
        time.sleep(0.3)
        print(f'    Gemeinde confirmed via Enter')

    page.screenshot(path=f'/tmp/concordia_{profil["id"]}_form.png')

    # Click "Suivant" / next button
    before = len(calls)
    next_btn = page.locator('#next, [data-cy="btn-next"]').last
    next_btn.click()
    print(f'    Clicked next (#next / data-cy=btn-next)')
    time.sleep(2)
    wait_idle(page, 10000)

    new_calls = calls[before:]
    print(f'    → {len(new_calls)} new JSON calls')
    for c in new_calls:
        print(f'      [{c["method"]}] {c["url"][:90]}')

    page.screenshot(path=f'/tmp/concordia_{profil["id"]}_after.png')
    return new_calls


def run():
    results = {}
    all_calls = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(locale='fr-CH', viewport={'width': 1280, 'height': 900})
        page = ctx.new_page()

        def on_response(response):
            ct = response.headers.get('content-type', '')
            if 'json' not in ct:
                return
            if any(x in response.url for x in ['demdex', 'omtrdc', 'analytics', 'tracking']):
                return
            try:
                body = response.json()
                all_calls.append({
                    'url': response.url,
                    'method': response.request.method,
                    'status': response.status,
                    'post_data': response.request.post_data,
                    'body': body,
                })
            except Exception:
                pass

        page.on('response', on_response)

        for profil in PROFILS:
            before_total = len(all_calls)
            print(f'\n{"="*50}')
            print(f'Loading calculator for {profil["id"]}...')
            page.goto(URL, wait_until='networkidle', timeout=30000)
            time.sleep(2)

            fill_profil(page, profil, all_calls)

            # Step through remaining form steps (product selection, etc.)
            for step in range(6):
                before_step = len(all_calls)
                try:
                    btn = page.locator('#next, [data-cy="btn-next"]').last
                    if btn.is_visible(timeout=2000):
                        btn.click()
                        time.sleep(2)
                        wait_idle(page, 8000)
                        step_calls = all_calls[before_step:]
                        if step_calls:
                            print(f'    Step {step+2}: {len(step_calls)} new calls')
                            for c in step_calls:
                                print(f'      [{c["method"]}] {c["url"][:90]}')
                        else:
                            print(f'    Step {step+2}: no new calls (maybe last step or validation error)')
                except Exception as e:
                    print(f'    Step {step+2}: {e}')
                    break

            page.screenshot(path=f'/tmp/concordia_{profil["id"]}_final.png')
            results[profil['id']] = all_calls[before_total:]

        browser.close()

    # Save everything
    with open('/tmp/concordia_all_calls.json', 'w', encoding='utf-8') as f:
        json.dump(all_calls, f, indent=2, ensure_ascii=False, default=str)

    print(f'\n\n{"="*50}')
    print(f'Total JSON calls captured: {len(all_calls)}')
    print('\nAll unique endpoints:')
    seen = set()
    for c in all_calls:
        key = f'[{c["method"]}] {c["url"].split("?")[0]}'
        if key not in seen:
            seen.add(key)
            print(f'  {key}')

    # Print pricing calls
    print('\n=== PRICING CALLS (praemien) ===')
    for c in all_calls:
        if 'praemien' in c['url'].lower() or 'praemien' in str(c.get('body', '')).lower():
            print(f'\n  URL: {c["url"]}')
            print(f'  POST payload: {str(c.get("post_data",""))[:400]}')
            body = c.get('body', {})
            if isinstance(body, dict):
                print(f'  Response keys: {list(body.keys())}')
                if 'personProduktPraemien' in body:
                    print(f'  personProduktPraemien: {json.dumps(body["personProduktPraemien"], indent=4)[:1000]}')
            elif isinstance(body, list):
                print(f'  Response list len: {len(body)}')
                print(f'  First item: {json.dumps(body[0] if body else {}, indent=2)[:400]}')

    print('\n→ Saved to /tmp/concordia_all_calls.json')
    return all_calls


if __name__ == '__main__':
    run()
