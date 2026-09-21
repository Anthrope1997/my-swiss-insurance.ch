"""
Vérifie indépendamment le calcul de l'économie moyenne à profil identique
(lib/sante/formules.ts, economieMoyenneCaisseIdentique()), à partir de
data/sante/primes.json et data/sante/regions.json.

Méthodologie :
  1. Profil = région de prime × tranche d'âge × franchise × modèle × accident
     (42 régions × 3 tranches d'âge × 48 combinaisons franchise/modèle/accident
     = 6 048 profils). On ne compare jamais deux profils différents entre eux.
  2. Dans chaque profil, on garde la prime la moins chère de chaque assureur.
  3. Écart du profil = moyenne des primes des assureurs - prime la moins chère.
  4. Écart d'une région pour une tranche d'âge = moyenne simple des écarts de
     ses 48 profils.
  5. Écart national = moyenne des écarts région-âge pondérée par la population
     de la tranche d'âge dans la région, sur toutes les régions et tranches.
  6. Économie annuelle = écart national (CHF/mois) x 12, arrondi une seule
     fois à la fin.

Usage : python3 scripts/verifier_economie_moyenne.py
"""

import json
import os
from collections import defaultdict

ROOT = os.path.join(os.path.dirname(__file__), '..')

AGE_TO_POPFIELD = {1990: 'age_25_plus', 2005: 'age_19_25', 2015: 'age_0_18'}
AGE_LABEL = {1990: 'Adulte', 2005: 'Jeune adulte', 2015: 'Enfant'}

with open(os.path.join(ROOT, 'data/sante/primes.json'), encoding='utf-8') as f:
    primes = json.load(f)
with open(os.path.join(ROOT, 'data/sante/regions.json'), encoding='utf-8') as f:
    regions = json.load(f)

# Population par région et par tranche d'âge
region_pop = defaultdict(lambda: defaultdict(int))
for rid, r in regions.items():
    for c in r['communes']:
        pop = c['population']
        for naissance, field in AGE_TO_POPFIELD.items():
            region_pop[rid][naissance] += pop.get(field, 0)

# Étapes 1-2 : profil = (région, âge, franchise, modèle, accident) -> assureur -> prime min
profils = defaultdict(dict)
for p in primes:
    key = (p['region_id'], p['annee_naissance'], p['franchise'], p['modele_categorie'], p['avec_accident'])
    d = profils[key]
    a = p['assureur']
    if a not in d or p['prime_nette'] < d[a]:
        d[a] = p['prime_nette']

print(f"Profils calculés : {len(profils)} (attendu : 42 régions x 3 âges x 48 combinaisons = 6 048)")

# Étape 3 : écart par profil
ecart_profil = {}
for key, assureurs in profils.items():
    vals = list(assureurs.values())
    mean = sum(vals) / len(vals)
    ecart_profil[key] = mean - min(vals)

# Étape 4 : écart région-âge = moyenne simple des écarts de profil
region_age_ecarts = defaultdict(list)
for (rid, naissance, franchise, modele, accident), eco in ecart_profil.items():
    region_age_ecarts[(rid, naissance)].append(eco)

region_age_mean = {k: sum(v) / len(v) for k, v in region_age_ecarts.items()}

# Étape 5 : écart national pondéré par population (par âge, ou toutes tranches)
def ecart_national_mensuel(naissance=None):
    num = 0.0
    den = 0.0
    for (rid, n), eco in region_age_mean.items():
        if naissance is not None and n != naissance:
            continue
        pop = region_pop[rid][n]
        num += pop * eco
        den += pop
    return num / den if den else 0.0

print()
print("Exemple à la main — région GE0, adulte, franchise 300, BASE, sans accident :")
ge0 = profils[('GE0', 1990, 300, 'BASE', False)]
vals = list(ge0.values())
mean = sum(vals) / len(vals)
mn = min(vals)
print(f"  {len(vals)} assureurs, moyenne {mean:.2f}, minimum {mn:.2f}, écart {mean - mn:.2f} CHF/mois")

print()
print("Résultats (Étape 6 : mensuel x 12, arrondi une seule fois) :")
for naissance in [1990, 2005, 2015]:
    mensuel = ecart_national_mensuel(naissance)
    annuel = round(mensuel * 12)
    print(f"  {AGE_LABEL[naissance]:15s} {mensuel:6.2f} CHF/mois -> {mensuel * 12:7.1f} CHF/an (arrondi CHF {annuel})")

mensuel_total = ecart_national_mensuel(None)
annuel_total = round(mensuel_total * 12)
print(f"  {'Tous âges':15s} {mensuel_total:6.2f} CHF/mois -> {mensuel_total * 12:7.1f} CHF/an (arrondi CHF {annuel_total})")
