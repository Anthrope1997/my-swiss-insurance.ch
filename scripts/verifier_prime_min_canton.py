"""
Verifie independamment la prime LAMal la moins chere de chaque canton et
l'ecart maximal entre caisses dans une meme region (meme profil), a partir de
data/sante/primes.json. Reproduit lib/sante/formules.ts : primeMinParCanton()
et economieMax({ franchise: 300, modele: 'BASE', avecAccident: false }).

Profil de reference : adulte (naissance 1990), franchise CHF 300, modele BASE,
sans couverture accident. Utilise prime_mensuelle (prime brute OFSP, colonne
"Prime" de priminfo.ch) — PAS prime_nette.

Attention a l'arrondi : Math.round en JS arrondit toujours 0.5 vers le haut
(365.5 -> 366). Le round() de Python utilise l'arrondi "au pair" (banker's
rounding : 478.5 -> 478, pas 479) — ne pas utiliser round() de Python tel
quel pour verifier les valeurs affichees sur le site.

Usage : python3 scripts/verifier_prime_min_canton.py
"""

import json
import math
import os
from collections import defaultdict

ROOT = os.path.join(os.path.dirname(__file__), '..')


def js_round(x):
    """Reproduit Math.round de JavaScript (arrondi 0.5 toujours vers le haut)."""
    return math.floor(x + 0.5)


with open(os.path.join(ROOT, 'data/sante/primes.json'), encoding='utf-8') as f:
    primes = json.load(f)

filtered = [
    p for p in primes
    if p['annee_naissance'] == 1990
    and p['franchise'] == 300
    and p['modele_categorie'] == 'BASE'
    and p['avec_accident'] is False
]
print(f"Lignes filtrees (adulte, franchise 300, BASE, sans accident) : {len(filtered)}")
print()

# Prime la moins chere par canton (min sur toutes regions et caisses du canton)
by_canton = defaultdict(list)
for p in filtered:
    by_canton[p['canton']].append(p['prime_mensuelle'])

results = {c: min(vals) for c, vals in by_canton.items()}

print(f"{'Canton':6s} {'Prime exacte':>14s} {'Arrondie':>10s}")
for c in sorted(results, key=lambda c: results[c]):
    mn = results[c]
    print(f"{c:6s} {mn:14.2f} {js_round(mn):10d}")

print()
print(f"Nombre de cantons : {len(results)} (attendu 26)")

# Ecart maximal entre caisses, meme region, meme profil
by_region = defaultdict(dict)
for p in filtered:
    d = by_region[p['region_id']]
    a = p['assureur']
    if a not in d or p['prime_mensuelle'] < d[a]:
        d[a] = p['prime_mensuelle']

best = None
for rid, m in by_region.items():
    vals = list(m.values())
    eco = max(vals) - min(vals)
    if best is None or eco > best[0]:
        best = (eco, rid, len(vals))

eco, rid, n = best
print()
print(f"Ecart maximal entre caisses (meme region, meme profil) : {eco:.2f} CHF/mois "
      f"-> arrondi CHF {js_round(eco)}  (region {rid}, {n} assureurs)")
