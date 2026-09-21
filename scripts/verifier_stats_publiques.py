"""
Verifie independamment les deux premieres tuiles de /sante (ecart maximal et
economie moyenne entre caisses, adultes des 19 ans), a partir de
data/sante/primes.json et data/sante/regions.json. Reproduit
lib/sante/formules.ts : ecartMaxProfil() et
economieMoyenneCaisseIdentiqueAdultes().

Perimetre : adulte (naissance 1990, 26 ans et +) et jeune adulte (naissance
2005, 19-25 ans). Les enfants (naissance 2015) sont exclus.

Methodologie :
  1. Profil = region de prime x tranche d'age x franchise x modele x accident
     (42 regions x 2 tranches x 48 combinaisons franchise/modele/accident
     = 4 032 profils). On ne compare jamais deux profils differents entre eux.
  2. Dans chaque profil, on garde la prime la moins chere de chaque assureur.
  3. Tuile 1 (ecart maximal) : le plus grand (prime max - prime min) trouve
     parmi tous les profils adulte + jeune adulte, x 12, arrondi une seule
     fois a la fin.
  4. Tuile 2 (economie moyenne) : ecart du profil = moyenne des primes des
     assureurs - prime la moins chere. Ecart d'une region pour un age =
     moyenne simple de ses 48 profils. Ecart national = somme(population
     region-age x ecart) / somme(population), sur les regions et les deux
     tranches d'age. x 12, arrondi une seule fois a la fin.

Le script calcule aussi les deux tuiles avec prime_nette ET prime_mensuelle,
pour verifier que le remboursement (constant, CHF 5.15) n'affecte pas les
ecarts (il s'annule dans toute soustraction).

Usage : python3 scripts/verifier_stats_publiques.py
"""

import json
import os
from collections import defaultdict

ROOT = os.path.join(os.path.dirname(__file__), '..')

AGE_TO_POPFIELD = {1990: 'age_25_plus', 2005: 'age_19_25'}
AGE_LABEL = {1990: 'Adulte', 2005: 'Jeune adulte'}

with open(os.path.join(ROOT, 'data/sante/primes.json'), encoding='utf-8') as f:
    primes = json.load(f)
with open(os.path.join(ROOT, 'data/sante/regions.json'), encoding='utf-8') as f:
    regions = json.load(f)

region_pop = defaultdict(lambda: defaultdict(int))
for rid, r in regions.items():
    for c in r['communes']:
        pop = c['population']
        for naissance, field in AGE_TO_POPFIELD.items():
            region_pop[rid][naissance] += pop.get(field, 0)


def build_profils(price_field):
    profils = defaultdict(dict)
    for p in primes:
        if p['annee_naissance'] not in AGE_TO_POPFIELD:
            continue
        key = (p['region_id'], p['annee_naissance'], p['franchise'], p['modele_categorie'], p['avec_accident'])
        d = profils[key]
        a = p['assureur']
        if a not in d or p[price_field] < d[a]:
            d[a] = p[price_field]
    return profils


def tuile1(profils):
    best = None
    for key, assureurs in profils.items():
        items = list(assureurs.items())
        mx_a, mx_v = max(items, key=lambda x: x[1])
        mn_a, mn_v = min(items, key=lambda x: x[1])
        eco = mx_v - mn_v
        if best is None or eco > best[0]:
            best = (eco, key, mn_a, mn_v, mx_a, mx_v, len(items))
    return best


def tuile2(profils):
    ecart_profil = {}
    for key, assureurs in profils.items():
        vals = list(assureurs.values())
        mean = sum(vals) / len(vals)
        ecart_profil[key] = mean - min(vals)

    region_age_ecarts = defaultdict(list)
    for (rid, naissance, franchise, modele, accident), eco in ecart_profil.items():
        region_age_ecarts[(rid, naissance)].append(eco)
    region_age_mean = {k: sum(v) / len(v) for k, v in region_age_ecarts.items()}

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

    return ecart_national_mensuel


def run(price_field):
    profils = build_profils(price_field)
    print(f"  Profils calcules : {len(profils)} (attendu 42 regions x 2 ages x 48 combinaisons = 4 032)")

    eco, key, mn_a, mn_v, mx_a, mx_v, n = tuile1(profils)
    rid, naissance, franchise, modele, accident = key
    annuel = round(eco * 12)
    print(f"  TUILE 1 - Ecart maximal : {eco:.2f} CHF/mois -> {eco * 12:.1f} CHF/an -> arrondi CHF {annuel}")
    print(f"    Profil : {AGE_LABEL[naissance]}, region {rid}, franchise {franchise}, {modele}, "
          f"avec_accident={accident}, {n} assureurs")
    print(f"    Min : {mn_a} a {mn_v:.2f} | Max : {mx_a} a {mx_v:.2f}")

    ecart_national_mensuel = tuile2(profils)
    print()
    print("  TUILE 2 - Economie moyenne (mensuel x 12, arrondi une seule fois) :")
    for naissance in [1990, 2005]:
        mensuel = ecart_national_mensuel(naissance)
        print(f"    {AGE_LABEL[naissance]:15s} {mensuel:6.4f} CHF/mois -> {mensuel * 12:8.2f} CHF/an "
              f"-> arrondi CHF {round(mensuel * 12)}")
    mensuel_total = ecart_national_mensuel(None)
    print(f"    {'Adulte+JA':15s} {mensuel_total:6.4f} CHF/mois -> {mensuel_total * 12:8.2f} CHF/an "
          f"-> arrondi CHF {round(mensuel_total * 12)}")

    print()
    print("  Exemple a la main - region GE0, adulte, franchise 300, BASE, sans accident :")
    ge0 = profils[('GE0', 1990, 300, 'BASE', False)]
    vals = list(ge0.values())
    mean = sum(vals) / len(vals)
    mn = min(vals)
    print(f"    {len(vals)} assureurs, moyenne {mean:.2f}, minimum {mn:.2f}, ecart {mean - mn:.2f} CHF/mois")


print("=== Calcul avec prime_nette (utilise par le site) ===")
run('prime_nette')
print()
print("=== Calcul avec prime_mensuelle (comparaison) ===")
run('prime_mensuelle')
