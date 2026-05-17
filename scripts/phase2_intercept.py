#!/usr/bin/env python3
"""
Phase 2 — Intercepteur réseau Playwright
Capture tous les appels JSON des calculateurs de primes.
Usage: python3 scripts/phase2_intercept.py [concordia|css|swica|sympany]
"""
import sys
import json
import time
from playwright.sync_api import sync_playwright

CALCULATORS = {
    'concordia': 'https://www.calculateur-de-primes.concordia.ch/ipr/home?lang=fr',
    'css':       'https://calculator.css.ch/start',
    'swica':     'https://www.swica.ch/fr/prive/services/calculateur-de-primes',
    'sympany':   'https://www.sympany.ch/fr/offre/assurance-complementaire',
}

def intercept(insurer: str, headless: bool = False):
    url = CALCULATORS[insurer]
    captured = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=headless)
        ctx = browser.new_context(
            locale='fr-CH',
            viewport={'width': 1280, 'height': 900},
        )
        page = ctx.new_page()

        def on_response(response):
            ct = response.headers.get('content-type', '')
            if 'json' not in ct:
                return
            try:
                body = response.json()
                req_url = response.url
                method = response.request.method
                post_data = None
                try:
                    post_data = response.request.post_data
                except Exception:
                    pass

                entry = {
                    'url': req_url,
                    'method': method,
                    'status': response.status,
                    'post_data': post_data,
                    'response_preview': str(body)[:300],
                    'response': body,
                }
                captured.append(entry)
                print(f'  [{method}] {response.status} {req_url[:80]}')
                if post_data:
                    print(f'       POST: {str(post_data)[:120]}')
                print(f'       RESP: {str(body)[:150]}')
            except Exception:
                pass

        page.on('response', on_response)

        print(f'\n→ Opening {url}')
        page.goto(url, wait_until='networkidle', timeout=30000)
        print(f'  Page loaded. {len(captured)} JSON calls so far.')
        print('\n  Waiting 30s — interact with the calculator to trigger API calls...')
        print('  (fill in age, NPA, situation and click calculate)')
        time.sleep(30)

        print(f'\n  Captured {len(captured)} JSON responses total.')

        browser.close()

    # Save
    out = f'/tmp/{insurer}_intercept.json'
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(captured, f, indent=2, ensure_ascii=False, default=str)
    print(f'\n→ Saved to {out}')

    # Summary of interesting calls
    print('\n=== INTERESTING CALLS ===')
    for e in captured:
        url_lower = e['url'].lower()
        if any(kw in url_lower for kw in ['prem', 'price', 'preis', 'calc', 'tarif', 'product', 'offer', 'quote']):
            print(f"\n  URL: {e['url']}")
            print(f"  Method: {e['method']}  Status: {e['status']}")
            if e['post_data']:
                print(f"  Payload: {e['post_data'][:300]}")
            print(f"  Response: {e['response_preview']}")

    return captured


if __name__ == '__main__':
    insurer = sys.argv[1] if len(sys.argv) > 1 else 'concordia'
    if insurer not in CALCULATORS:
        print(f'Unknown insurer. Choose from: {list(CALCULATORS.keys())}')
        sys.exit(1)
    intercept(insurer, headless=False)
