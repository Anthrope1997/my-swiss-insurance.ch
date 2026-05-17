#!/usr/bin/env python3
"""
KPT Tarifs Scraper — Phase 1
Querying the public KPT API to get complementary insurance prices
for the 3 standard comparison profiles defined in types.ts.

API base: https://assistant.kpt.ch/kpt-api/public
Discovered via appsettings.json (no auth required)
"""
import json
import urllib.request
from datetime import date

BASE_URL = 'https://assistant.kpt.ch/kpt-api/public'
TODAY = date.today()

# ─── Profils from types.ts ───────────────────────────────────────────────────
# ProfilType: 'jeune-adulte' (26H VD 1000), 'famille' (35F GE 1200), 'senior' (55H VD 1000)
# Note: callerDefiniedApplicantId must be numeric — mapped back via PROFIL_ID_MAP
PROFILS = [
    {'numId': '1', 'id': 'jeune-adulte', 'age': 26, 'sexe': 'male',   'npa': '1000'},
    {'numId': '2', 'id': 'famille',      'age': 35, 'sexe': 'female', 'npa': '1200'},
    {'numId': '3', 'id': 'senior',       'age': 55, 'sexe': 'male',   'npa': '1000'},
]
PROFIL_ID_MAP = {p['numId']: p['id'] for p in PROFILS}

# ─── Price key → kpt.ts product ID ───────────────────────────────────────────
# Keys decoded from the API response:
#   PUL-{optionId}     Pulse (ambulatoire): 191=Eco, 190=Top, 192=Premium
#   H-{franchise}_{chambre}  Hospital: franchise 11=0CHF; chambre 15=commune, 14=demi-privée, 16=privée CH, 17=privée Monde
#   FLEX-{optionId}    Hospital Flex: 189=Eco, 188=Top
#   Z-{optionId}       Dental: 83=Klasse1, 84=Klasse3, 85=Klasse4
PRODUCT_MAP = {
    'PUL-191':   'kpt-pulse-eco',
    'PUL-190':   'kpt-pulse-top',
    'PUL-192':   'kpt-pulse-premium',
    'H-11_15':   'kpt-hospital-commune',
    'H-11_14':   'kpt-hospital-demi-privee',
    'H-11_16':   'kpt-hospital-privee',
    'FLEX-189':  'kpt-hospital-flex',
    'Z-83':      'kpt-dentaire-klasse-1',
    'Z-84':      'kpt-dentaire-klasse-3',
    'Z-85':      'kpt-dentaire-klasse-4',
}


BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

# Session opener with cookie jar (required: API checks session cookie set on main page)
_opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor())


def init_session():
    req = urllib.request.Request(
        'https://assistant.kpt.ch/fr',
        headers={'User-Agent': BROWSER_UA, 'Accept-Language': 'fr-CH'},
    )
    _opener.open(req, timeout=15)


def fetch_json(url, payload=None):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'fr-CH',
        'Referer': 'https://assistant.kpt.ch/fr',
        'Origin': 'https://assistant.kpt.ch',
        'User-Agent': BROWSER_UA,
    }
    if payload is not None:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers=headers)
    else:
        req = urllib.request.Request(url, headers=headers)
    with _opener.open(req, timeout=20) as resp:
        raw = resp.read().decode('utf-8')
        return json.loads(raw)


def get_city(npa):
    cities = fetch_json(f'{BASE_URL}/premiumcities?postalCode={npa}')
    city = cities[0]
    print(f'  NPA {npa} → {city["cityName"]} ({city["cantonCode"]}) bfs={city["bfsNumber"]}')
    return city


def build_applicant(profil, city):
    birth_year = TODAY.year - profil['age']
    return {
        'callerDefiniedApplicantId': profil['numId'],
        'entryReason': 'New',
        'firstName': profil['id'],
        'birthDate': f'{birth_year}-01-15',
        'genderCode': profil['sexe'],
        'bfsNumber': city['bfsNumber'],
        'cantonCode': city['cantonCode'],
        'postalCodeExtended': city['postalCodeExtended'],
        'basicInsuranceStartDate': '2026-06-01',
        'supplementaryInsuranceStartDate': '2026-06-01',
    }


def extract_tarifs(api_results):
    tarifs = {}
    for result in api_results:
        profil_id = PROFIL_ID_MAP.get(result['applicantId'], result['applicantId'])
        for product in result.get('additionalProducts', []):
            for price_key, amount in product.get('prices', {}).items():
                our_id = PRODUCT_MAP.get(price_key)
                if our_id:
                    if our_id not in tarifs:
                        tarifs[our_id] = []
                    tarifs[our_id].append({
                        'profilId': profil_id,
                        'montantCHF': round(amount, 2),
                        'source': 'site-web',
                        'dateReleve': TODAY.isoformat(),
                    })
    return tarifs


def print_results(tarifs):
    for product_id in sorted(tarifs.keys()):
        print(f'\n  {product_id}')
        for t in sorted(tarifs[product_id], key=lambda x: ['jeune-adulte','famille','senior'].index(x['profilId'])):
            print(f'    {t["profilId"]:20}  CHF {t["montantCHF"]:6.2f}/mois')


def generate_ts(tarifs):
    lines = ['// ─── Tarifs KPT (scraping API publique kpt.ch) ─────────────────────────────']
    lines.append(f'// Source : assistant.kpt.ch/kpt-api/public/productprice/query — {TODAY.isoformat()}\n')
    for product_id, entries in sorted(tarifs.items()):
        lines.append(f'// {product_id}')
        lines.append('tarifs: [')
        for t in sorted(entries, key=lambda x: ['jeune-adulte','famille','senior'].index(x['profilId'])):
            lines.append(f"  {{ profilId: '{t['profilId']}', montantCHF: {t['montantCHF']}, source: 'site-web', dateReleve: '{t['dateReleve']}' }},")
        lines.append('],\n')
    return '\n'.join(lines)


def main():
    print('=== KPT Tarifs Scraper ===\n')

    print('Step 0: Initializing session (required for API cookie)...')
    init_session()
    print('  Session OK\n')

    print('Step 1: Fetching city data...')
    city_cache = {}
    for p in PROFILS:
        if p['npa'] not in city_cache:
            city_cache[p['npa']] = get_city(p['npa'])

    print('\nStep 2: Building applicant payloads...')
    applicants = [build_applicant(p, city_cache[p['npa']]) for p in PROFILS]
    for a in applicants:
        print(f"  {a['callerDefiniedApplicantId']:20} age={TODAY.year - int(a['birthDate'][:4])} "
              f"sexe={a['genderCode']:6} canton={a['cantonCode']}")

    print('\nStep 3: Querying productprice API...')
    results = fetch_json(f'{BASE_URL}/productprice/query', applicants)
    print(f'  Got results for {len(results)} applicant(s)')

    print('\nStep 4: Extracting prices...')
    tarifs = extract_tarifs(results)
    print(f'  Matched {len(tarifs)} products')
    print_results(tarifs)

    with open('/tmp/kpt_tarifs.json', 'w', encoding='utf-8') as f:
        json.dump(tarifs, f, indent=2, ensure_ascii=False)
    print('\n→ JSON saved: /tmp/kpt_tarifs.json')

    ts_snippet = generate_ts(tarifs)
    with open('/tmp/kpt_tarifs_ts.txt', 'w', encoding='utf-8') as f:
        f.write(ts_snippet)
    print('→ TS snippet saved: /tmp/kpt_tarifs_ts.txt')


if __name__ == '__main__':
    main()
