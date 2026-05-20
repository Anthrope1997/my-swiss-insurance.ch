#!/usr/bin/env python3
"""
Rhenusana Prämienrechner — v5 (2026-05-20)
Fixes:
  1. PLZ: use type() + JS dispatchEvent to trigger getgemeindenjson API
  2. Wait up to 5s for Gemeinde select to appear and have options
  3. All JS clicks to bypass overlays
"""
import asyncio, json, re, sys
from datetime import date
from playwright.async_api import async_playwright

TODAY      = date.today().isoformat()
PORTAL_URL = 'https://rhenusana.bbtp.ch/portal/offerten/'

PROFILES = [
    {'label': 'jeune-adulte', 'year': '2000', 'sex': 'Mann', 'npa': '1000'},
    {'label': 'famille',      'year': '1991', 'sex': 'Frau', 'npa': '1201'},
    {'label': 'senior',       'year': '1971', 'sex': 'Mann', 'npa': '1000'},
]

PRODUCT_TIERS = {
    'rhenuplus':     ['rhenusana-rhenuplus-argent',  'rhenusana-rhenuplus-or',         'rhenusana-rhenuplus-platine'],
    'rhenuswiss':    ['rhenusana-rhenuswiss'],
    'rhenuhospital': ['rhenusana-hospital-generale', 'rhenusana-hospital-demi-privee', 'rhenusana-hospital-privee'],
    'rhenudenta':    ['rhenusana-denta-argent',      'rhenusana-denta-or',             'rhenusana-denta-platine'],
}

results = {}

def extract_price(text):
    m = re.search(r'(\d{1,4}[.,]\d{2})', text.replace("'", ''))
    if m:
        return float(m.group(1).replace(',', '.'))
    return None


async def js_set_select(page, name, value):
    await page.evaluate(f"""() => {{
        const s = document.querySelector('select[name="{name}"]');
        if (s) {{
            s.value = '{value}';
            s.dispatchEvent(new Event('change', {{bubbles: true}}));
        }}
    }}""")


async def js_click_id(page, id_):
    await page.evaluate(f"""() => {{
        const el = document.getElementById('{id_}');
        if (el) el.click();
    }}""")


async def fill_step1(page, profile, idx):
    npa = profile['npa']
    print(f"\n  -- fill_step1 --")

    # PLZ: focus via JS, then type character by character to trigger events
    await page.evaluate("""() => {
        const f = document.querySelector('input[name="Plz"]');
        if (f) { f.focus(); f.value = ''; }
    }""")
    await page.wait_for_timeout(300)
    await page.keyboard.type(npa, delay=120)
    # Also dispatch change event
    await page.evaluate(f"""() => {{
        const f = document.querySelector('input[name="Plz"]');
        if (f) {{
            f.value = '{npa}';
            f.dispatchEvent(new Event('input',  {{bubbles: true}}));
            f.dispatchEvent(new Event('change', {{bubbles: true}}));
            f.dispatchEvent(new Event('blur',   {{bubbles: true}}));
        }}
    }}""")
    print(f"  PLZ typed + dispatched: {npa}")
    await page.wait_for_timeout(2500)  # wait for API call + select population

    # Check if Gemeinde select appeared
    try:
        sel_count = await page.locator('select[name="IdBsvRegionDetail"] option').count()
        print(f"  IdBsvRegionDetail option count: {sel_count}")
        if sel_count > 1:
            # Get second option (first is blank "Bitte Ort auswählen")
            val = await page.locator('select[name="IdBsvRegionDetail"] option').nth(1).get_attribute('value')
            txt = await page.locator('select[name="IdBsvRegionDetail"] option').nth(1).inner_text()
            await js_set_select(page, 'IdBsvRegionDetail', val)
            print(f"  Gemeinde set: {txt} ({val})")
            await page.wait_for_timeout(600)
        else:
            print("  Single Gemeinde or not yet loaded")
    except Exception as e:
        print(f"  Gemeinde check error: {e}")

    # Birth year
    await page.evaluate(f"""() => {{
        const f = document.querySelector('input[name="Details[0].GeburtsdatumJahr"]');
        if (f) {{
            f.focus();
            f.value = '{profile['year']}';
            f.dispatchEvent(new Event('input',  {{bubbles: true}}));
            f.dispatchEvent(new Event('change', {{bubbles: true}}));
        }}
    }}""")
    print(f"  Birth year JS-set: {profile['year']}")
    await page.wait_for_timeout(300)

    # Gender via JS click
    gender_id = f"Details_0__Geschlecht_{profile['sex']}"
    await js_click_id(page, gender_id)
    print(f"  Gender JS-clicked: {gender_id}")
    await page.wait_for_timeout(400)

    await page.screenshot(path=f'/tmp/rh_{idx}_02_filled.png')

    # Submit
    await page.evaluate("""() => {
        const btn = document.querySelector('input[name="action:Weiter"]');
        if (btn) btn.click();
    }""")
    print("  Submitted step1")
    await page.wait_for_timeout(4000)
    await page.screenshot(path=f'/tmp/rh_{idx}_03_after_step1.png')

    url  = page.url
    text = await page.locator('body').inner_text()
    print(f"  After step1 → {url}")
    if 'Bitte Ort' in text:
        print("  !! Still 'Bitte Ort auswählen' — printing IdBsvRegionDetail options:")
        opts = await page.locator('select[name="IdBsvRegionDetail"] option').all()
        for o in opts:
            t = await o.inner_text()
            v = await o.get_attribute('value')
            print(f"    option: {t!r} = {v!r}")


async def handle_step2(page, idx):
    url  = page.url
    text = await page.locator('body').inner_text()
    if 'step2' not in url and 'Grundversicherung' not in text:
        print(f"  Did not reach step2. URL={url}")
        return False

    print("  On step2 — selecting first radio, then Weiter")
    await page.evaluate("""() => {
        const r = document.querySelector('input[type="radio"]');
        if (r) r.click();
    }""")
    await page.wait_for_timeout(500)
    await page.evaluate("""() => {
        const btn = document.querySelector('input[name="action:Weiter"]');
        if (btn) btn.click();
    }""")
    await page.wait_for_timeout(4000)
    await page.screenshot(path=f'/tmp/rh_{idx}_04_after_step2.png')
    return True


async def read_step3(page, label, idx):
    url  = page.url
    text = await page.locator('body').inner_text()
    if 'step3' not in url and 'Zusatz' not in text:
        print(f"  NOT on step3. URL={url}\n  {text[:300]}")
        return {}

    print(f"  On step3!")
    await page.screenshot(path=f'/tmp/rh_{idx}_05_step3.png')

    prices_found = {}
    lines = [l.strip() for l in text.split('\n') if l.strip()]

    # rhenuSWISS: single product, read directly
    for i, line in enumerate(lines):
        if 'rhenuswiss' in line.lower():
            for j in range(i+1, min(i+5, len(lines))):
                p = extract_price(lines[j])
                if p and 0 < p < 200:
                    prices_found['rhenusana-rhenuswiss'] = p
                    print(f"  rhenuswiss direct: CHF {p}")
                    break
            break

    # Tier selects (Silber/Gold/Platin)
    all_selects = await page.locator('select').all()
    tier_selects = []
    for s in all_selects:
        sn = await s.get_attribute('name') or ''
        opts = await s.locator('option').all()
        opt_list = [(await o.inner_text(), await o.get_attribute('value') or '') for o in opts]
        if any(kw in t.lower() for t, v in opt_list for kw in ['silber', 'gold', 'platin']):
            tier_selects.append({'name': sn, 'opts': opt_list})
            print(f"  Tier select [{sn}]: {[(t, v) for t, v in opt_list]}")

    # Map tier selects → product (by order: rhenuplus, rhenuhospital, rhenudenta)
    tiered = [(k, v) for k, v in PRODUCT_TIERS.items() if len(v) > 1]
    for ts_idx, ts in enumerate(tier_selects):
        if ts_idx >= len(tiered):
            break
        prod_key, ts_ids = tiered[ts_idx]
        sel_name = ts['name']
        print(f"\n  Iterating {prod_key} ({sel_name})")
        tier_real_idx = 0
        for opt_text, opt_val in ts['opts']:
            if not opt_val:
                continue
            if tier_real_idx >= len(ts_ids):
                break
            ts_id = ts_ids[tier_real_idx]

            await js_set_select(page, sel_name, opt_val)
            await page.wait_for_timeout(2000)

            new_text = await page.locator('body').inner_text()
            new_lines = [l.strip() for l in new_text.split('\n') if l.strip()]
            for i, line in enumerate(new_lines):
                if prod_key in line.lower():
                    for j in range(i+1, min(i+5, len(new_lines))):
                        p = extract_price(new_lines[j])
                        if p and 1 < p < 2000:
                            prices_found[ts_id] = p
                            print(f"    {ts_id} ({opt_text}): CHF {p}")
                            break
                    break

            await page.screenshot(path=f'/tmp/rh_{idx}_{prod_key}_{tier_real_idx}.png')
            tier_real_idx += 1

    return prices_found


async def run_profile(p, profile, idx):
    label = profile['label']
    print(f"\n{'='*60}")
    print(f"Profile: {label}  year={profile['year']}  NPA={profile['npa']}")

    browser = await p.firefox.launch(headless=False, slow_mo=150)
    ctx = await browser.new_context(locale='de-CH')
    page = await ctx.new_page()

    await page.goto(PORTAL_URL, wait_until='domcontentloaded', timeout=30000)
    await page.wait_for_timeout(2000)

    try:
        await fill_step1(page, profile, idx)
    except Exception as e:
        print(f"  fill_step1 error: {e}")
        await page.screenshot(path=f'/tmp/rh_{idx}_error_step1.png')
        await browser.close()
        return

    await handle_step2(page, idx)

    prices = await read_step3(page, label, idx)
    for prod_id, price in prices.items():
        if prod_id not in results:
            results[prod_id] = {}
        results[prod_id][label] = price

    print(f"\n  Summary {label}: {prices}")
    await browser.close()


async def main():
    print("Rhenusana v5 — " + TODAY)
    import urllib.request
    try:
        r = urllib.request.urlopen(PORTAL_URL, timeout=10)
        print(f"✓ Portal OK: {r.status}")
    except Exception as e:
        print(f"✗ {e}"); sys.exit(1)

    async with async_playwright() as p:
        for idx, profile in enumerate(PROFILES):
            await run_profile(p, profile, idx)

    with open('/tmp/rhenusana_results.json', 'w') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nSaved results.json")
    print(json.dumps(results, indent=2, ensure_ascii=False))

    # TypeScript output
    print(f"\n{'='*60}")
    print("TypeScript snippets:")
    for ts_ids in PRODUCT_TIERS.values():
        for prod_id in ts_ids:
            entries = results.get(prod_id, {})
            if entries:
                print(f"\n// {prod_id}")
                print("tarifs: [")
                for prof in ['jeune-adulte', 'famille', 'senior']:
                    if prof in entries:
                        print(f"  {{ profilId: '{prof}', montantCHF: {entries[prof]:.2f}, source: 'site-web', dateReleve: '{TODAY}' }},")
                print("],")
            else:
                print(f"\n// {prod_id}: NO DATA")

asyncio.run(main())
