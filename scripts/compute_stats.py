"""
Calcule les statistiques LAMal 2026 depuis primes.json + regions.json
Profil de référence : adulte (yob=1990), franchise 300, sans accident, modèle BASE

Outputs : lib/data/stats.json
"""

import json
import os
from collections import defaultdict

BASE_DIR = os.path.join(os.path.dirname(__file__), '..', 'lib', 'data')

print("Chargement des données…")
with open(os.path.join(BASE_DIR, 'primes.json')) as f:
    primes = json.load(f)
with open(os.path.join(BASE_DIR, 'regions.json')) as f:
    regions = json.load(f)

# ---------------------------------------------------------------------------
# Filtrer le profil de référence
# ---------------------------------------------------------------------------
ref = [p for p in primes
       if p['annee_naissance'] == 1990
       and p['franchise'] == 300
       and p['avec_accident'] == False
       and p['modele_categorie'] == 'BASE']

print(f"Profil de référence : {len(ref)} lignes")

# ---------------------------------------------------------------------------
# Population par region_id
# ---------------------------------------------------------------------------
pop_by_region = {rid: r['population']['total'] for rid, r in regions.items()}

# ---------------------------------------------------------------------------
# Regrouper par canton
# ---------------------------------------------------------------------------
# canton → region_id → assureur → prime_nette
by_canton: dict = defaultdict(lambda: defaultdict(dict))
for p in ref:
    canton = p['canton']
    region = p['region_id']
    assureur = p['assureur']
    # Garder la prime la plus basse par assureur/région (il ne devrait y en avoir qu'une)
    if assureur not in by_canton[canton][region]:
        by_canton[canton][region][assureur] = p['prime_nette']
    else:
        by_canton[canton][region][assureur] = min(
            by_canton[canton][region][assureur], p['prime_nette']
        )

# ---------------------------------------------------------------------------
# Stats par canton
# ---------------------------------------------------------------------------
CANTON_NAMES = {
    'AG': 'Argovie',       'AI': 'Appenzell Rh.-Int.', 'AR': 'Appenzell Rh.-Ext.',
    'BE': 'Berne',         'BL': 'Bâle-Campagne',       'BS': 'Bâle-Ville',
    'FR': 'Fribourg',      'GE': 'Genève',              'GL': 'Glaris',
    'GR': 'Grisons',       'JU': 'Jura',                'LU': 'Lucerne',
    'NE': 'Neuchâtel',     'NW': 'Nidwald',             'OW': 'Obwald',
    'SG': 'Saint-Gall',    'SH': 'Schaffhouse',         'SO': 'Soleure',
    'SZ': 'Schwyz',        'TG': 'Thurgovie',           'TI': 'Tessin',
    'UR': 'Uri',           'VD': 'Vaud',                'VS': 'Valais',
    'ZG': 'Zoug',          'ZH': 'Zurich',
}

canton_stats = {}

for canton, regions_data in by_canton.items():
    # Population totale du canton (somme des régions)
    total_pop = sum(pop_by_region.get(rid, 0) for rid in regions_data)

    # Moyenne pondérée par région
    weighted_sum = 0.0
    all_primes = []

    for region_id, assureurs in regions_data.items():
        pop = pop_by_region.get(region_id, 0)
        region_primes = list(assureurs.values())
        all_primes.extend(region_primes)
        region_mean = sum(region_primes) / len(region_primes)
        weighted_sum += region_mean * pop

    prime_moyenne = weighted_sum / total_pop if total_pop > 0 else 0

    # Min / max sur l'ensemble du canton
    prime_min = min(all_primes)
    prime_max = max(all_primes)
    economie_mensuel = prime_max - prime_min
    economie_annuel = economie_mensuel * 12

    # Nombre de caisses distinctes dans le canton
    all_assureurs = set()
    for assureurs in regions_data.values():
        all_assureurs.update(assureurs.keys())
    nb_caisses = len(all_assureurs)

    # Top 3 caisses les moins chères (prime min par assureur, toutes régions)
    best_by_assureur = {}
    for assureurs in regions_data.values():
        for assureur, prime in assureurs.items():
            if assureur not in best_by_assureur or prime < best_by_assureur[assureur]:
                best_by_assureur[assureur] = prime
    top3 = sorted(best_by_assureur.items(), key=lambda x: x[1])[:3]

    canton_stats[canton] = {
        'code': canton,
        'name': CANTON_NAMES.get(canton, canton),
        'prime_moyenne': round(prime_moyenne, 2),
        'prime_min': round(prime_min, 2),
        'prime_max': round(prime_max, 2),
        'economie_mensuel': round(economie_mensuel, 2),
        'economie_annuel': round(economie_annuel, 0),
        'nb_caisses': nb_caisses,
        'top3': [{'name': a, 'prime': round(p, 2)} for a, p in top3],
    }

# ---------------------------------------------------------------------------
# Moyenne nationale pondérée par population
# ---------------------------------------------------------------------------
total_pop_ch = sum(pop_by_region.values())
weighted_national = sum(
    canton_stats[c]['prime_moyenne'] * sum(
        pop_by_region.get(rid, 0) for rid in by_canton[c]
    )
    for c in canton_stats
)
prime_nationale = weighted_national / total_pop_ch

# Min / max national
all_primes_national = [p['prime_nette'] for p in ref]
prime_min_ch = min(all_primes_national)
prime_max_ch = max(all_primes_national)
nb_caisses_ch = len(set(p['assureur'] for p in primes))

# ---------------------------------------------------------------------------
# Table franchise (national, adulte, BASE, sans accident)
# Moyenne pondérée par population pour chaque niveau de franchise
# ---------------------------------------------------------------------------
franchise_stats = []
for franchise in [300, 500, 1000, 1500, 2000, 2500]:
    rows = [p for p in primes
            if p['annee_naissance'] == 1990
            and p['franchise'] == franchise
            and p['avec_accident'] == False
            and p['modele_categorie'] == 'BASE']
    if not rows:
        continue

    # Moyenne pondérée par région
    by_region: dict = defaultdict(list)
    for p in rows:
        by_region[p['region_id']].append(p['prime_nette'])

    weighted = sum(
        (sum(v) / len(v)) * pop_by_region.get(rid, 0)
        for rid, v in by_region.items()
    )
    mean = weighted / total_pop_ch
    franchise_stats.append({'montant': franchise, 'prime_moyenne': round(mean, 2)})

# Économie vs franchise 300
base_prime = next(f['prime_moyenne'] for f in franchise_stats if f['montant'] == 300)
for f in franchise_stats:
    f['economie_mensuel'] = round(base_prime - f['prime_moyenne'], 2)
    f['economie_annuel'] = round((base_prime - f['prime_moyenne']) * 12, 0)

# ---------------------------------------------------------------------------
# Trier les cantons du plus cher au moins cher
# ---------------------------------------------------------------------------
cantons_sorted = sorted(canton_stats.values(), key=lambda c: -c['prime_moyenne'])

# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------
stats = {
    'national': {
        'prime_moyenne': round(prime_nationale, 2),
        'prime_min': round(prime_min_ch, 2),
        'prime_max': round(prime_max_ch, 2),
        'nb_caisses': nb_caisses_ch,
        'economie_max_annuel': round((prime_max_ch - prime_min_ch) * 12, 0),
    },
    'cantons': {c['code']: c for c in canton_stats.values()},
    'cantons_sorted': cantons_sorted,
    'franchises': franchise_stats,
}

out_path = os.path.join(BASE_DIR, 'stats.json')
with open(out_path, 'w') as f:
    json.dump(stats, f, ensure_ascii=False, indent=2)

print(f"\n✓ stats.json écrit ({os.path.getsize(out_path) // 1024} KB)")
print(f"\n--- Nationale ---")
print(f"  Prime moyenne  : CHF {stats['national']['prime_moyenne']}")
print(f"  Prime min      : CHF {stats['national']['prime_min']}")
print(f"  Prime max      : CHF {stats['national']['prime_max']}")
print(f"  Nb caisses     : {stats['national']['nb_caisses']}")
print(f"  Économie max   : CHF {stats['national']['economie_max_annuel']:.0f}/an")
print(f"\n--- Cantons (du plus cher au moins cher) ---")
for c in cantons_sorted:
    print(f"  {c['code']:2}  {c['name']:25}  CHF {c['prime_moyenne']:6.2f}  "
          f"économie {c['economie_mensuel']:5.2f}/mois  {c['nb_caisses']} caisses")
print(f"\n--- Franchises (national, adulte, BASE) ---")
for f in franchise_stats:
    print(f"  CHF {f['montant']:4}  →  prime moy. {f['prime_moyenne']:6.2f}  "
          f"économie vs 300 : {f['economie_mensuel']:5.2f}/mois")
