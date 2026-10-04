# Prototype et feuille de route d'extension

## Section 1 — Périmètre du prototype actuel

Les 8 routes éditoriales actives et les pages légales sont indexées et accessibles depuis la navigation et le sitemap.

| Chemin | Fichier source | Description |
|---|---|---|
| `/fr/sante` | `app/[locale]/sante/page.tsx` | Page d'accueil : hero, guides LAMal, outils comparateur/subsides, formulaire de contact |
| `/fr/sante/guide` | `app/[locale]/sante/guide/page.tsx` | Guide complet LAMal 2026 : primes par canton, franchises, modèles, changement de caisse |
| `/fr/sante/franchise` | `app/[locale]/sante/franchise/page.tsx` | Guide du choix de franchise : simulateur, seuils d'équilibre, tableau comparatif |
| `/fr/sante/modeles` | `app/[locale]/sante/modeles/page.tsx` | Les 4 modèles LAMal : standard, médecin de famille, centre médical, télémédecine |
| `/fr/sante/changer-de-caisse` | `app/[locale]/sante/changer-de-caisse/page.tsx` | Procédure de changement de caisse, délais, lettre type, cas particuliers |
| `/fr/sante/lamal-vs-lca` | `app/[locale]/sante/lamal-vs-lca/page.tsx` | Différences LAMal (obligatoire) et LCA (complémentaire), tableau comparatif, quand souscrire |
| `/fr/sante/comparateur` | `app/[locale]/sante/comparateur/page.tsx` | Outil interactif : comparateur de primes LAMal par code postal, profil, franchise et modèle |
| `/fr/sante/subsides` | `app/[locale]/sante/subsides/page.tsx` | Simulateur de subsides cantonaux : calcul d'éligibilité et montant estimé |
| `/fr/a-propos` | `app/[locale]/a-propos/page.tsx` | Présentation du service, sources et contact |
| `/fr/mentions-legales` | `app/[locale]/mentions-legales/page.tsx` | Mentions légales obligatoires |
| `/fr/politique-confidentialite` | `app/[locale]/politique-confidentialite/page.tsx` | Politique de confidentialité et RGPD |

Pages fonctionnelles (non éditoriales, noindex, hors navigation) :
- `/fr/devis` — Formulaire de demande de devis complet
- `/fr/merci` — Page de confirmation après soumission du formulaire

---

## Section 2 — Pages mises de côté pour extension future

### Pages par canton (26 cantons)

| Chemin | Fichier source | État | Éléments manquants | Contexte | Hypothèse de réactivation |
|---|---|---|---|---|---|
| `/fr/sante/cantons` | `app/[locale]/sante/cantons/page.tsx` | Complète mais désactivée | — | Hub listant les 26 cantons avec lien vers chaque page | À activer quand les pages cantons individuelles sont prêtes |
| `/fr/sante/canton/zurich` | `app/[locale]/sante/canton/zurich/page.tsx` | Complète mais désactivée | Données 2027 en attente | Page par canton avec primes, classement des caisses, subsides | À activer avec mise à jour données OFSP (décembre) |
| `/fr/sante/canton/berne` | `app/[locale]/sante/canton/berne/page.tsx` | Complète mais désactivée | — | Idem Zurich | Même cycle |
| `/fr/sante/canton/vaud` | `app/[locale]/sante/canton/vaud/page.tsx` | Complète mais désactivée | — | Idem | Même cycle |
| `/fr/sante/canton/geneve` | `app/[locale]/sante/canton/geneve/page.tsx` | Complète mais désactivée | — | Idem | Même cycle |
| `/fr/sante/canton/[23 autres]` | `app/[locale]/sante/canton/*/page.tsx` | Complètes mais désactivées | — | Idem pour chaque canton | Même cycle de données annuel |

> Note : toutes les pages cantons partagent le composant `components/sante/CantonPage.tsx` et les données `data/sante/cantons.ts`. La mise à jour annuelle des données suffit à les réactiver en bloc. Voir mémoire projet : "mise à jour annuelle data/sante/cantons.ts début décembre, avant le délai GL (31 jan)".

### Pages par situation de vie

| Chemin | Fichier source | État | Éléments manquants | Contexte | Hypothèse de réactivation |
|---|---|---|---|---|---|
| `/fr/sante/frontalier` | `app/[locale]/sante/frontalier/page.tsx` | Complète mais désactivée | — | Hub frontaliers avec choix par nationalité (France, Allemagne, Italie) | À activer quand les 3 sous-pages frontaliers sont vérifiées |
| `/fr/sante/frontalier-france` | `app/[locale]/sante/frontalier-france/page.tsx` | En cours | Simulateur droit d'option à finaliser | Guide et simulateur pour frontaliers franco-suisses | À activer avec `/fr/sante/frontalier` |
| `/fr/sante/frontalier-allemagne` | `app/[locale]/sante/frontalier-allemagne/page.tsx` | En cours | Données spécifiques Allemagne | Guide frontaliers germano-suisses | À activer avec `/fr/sante/frontalier` |
| `/fr/sante/frontalier-italie` | `app/[locale]/sante/frontalier-italie/page.tsx` | En cours | Données spécifiques Italie | Guide frontaliers italo-suisses | À activer avec `/fr/sante/frontalier` |
| `/fr/sante/ma-situation` | `app/[locale]/sante/ma-situation/page.tsx` | Complète mais désactivée | — | LAMal selon situation professionnelle : salarié, indépendant, chômeur, expatrié | À activer pour extension "par profil" du site |
| `/fr/sante/ma-famille` | `app/[locale]/sante/ma-famille/page.tsx` | Complète mais désactivée | — | LAMal famille : enfants, maternité, jeunes adultes, retraite | À activer avec ma-situation |
| `/fr/sante/par-profil` | `app/[locale]/sante/par-profil/page.tsx` | Complète mais désactivée | — | Hub "par situation de vie" reliant ma-situation, ma-famille, frontalier | À activer quand les 3 sous-pages sont prêtes |

### Pages expérimentales ou alternatives

| Chemin | Fichier source | État | Éléments manquants | Contexte | Hypothèse de réactivation |
|---|---|---|---|---|---|
| `/fr/sante/complementaires` | `app/[locale]/sante/complementaires/page.tsx` | En cours | Comparateur LCA non finalisé (`ComparateurComplementairesClient`) | Comparateur de complémentaires (hospitalisation, ambulatoire, dentaire) | À activer quand le comparateur LCA est opérationnel et les données disponibles |
| `/fr/sante/guide-v2` | `app/[locale]/sante/guide-v2/page.tsx` | Ébauche | Design alternatif non validé | Version expérimentale du guide principal avec design différent | À évaluer ou supprimer — fusionner avec guide principal si pertinent |
| `/fr/home-v2` | `app/[locale]/home-v2/page.tsx` | Ébauche | Design alternatif non validé | Version expérimentale de la home avec thème SF | À évaluer ou supprimer — remplacer home actuelle si validée |

---

## Section 3 — Procédure de réactivation step-by-step

Pour réactiver une page mise de côté :

1. **Retirer le noindex** : dans le fichier `page.tsx` de la page, supprimer la ligne
   ```ts
   robots: { index: false, follow: false },
   ```
   du bloc `export const metadata`.

2. **Ajouter au sitemap** : dans `app/sitemap.ts`, ajouter une entrée pour la route, par exemple :
   ```ts
   {
     url: `${BASE_URL}/sante/canton/zurich`,
     lastModified: new Date('2026-12-01'),
     changeFrequency: 'yearly',
     priority: 0.7,
   },
   ```

3. **Ajouter au menu principal** : dans `components/ui/Header.tsx`, ajouter le lien dans la section appropriée du tableau `menuSections`. Exemple pour une page canton :
   ```ts
   { href: '/sante/canton/zurich', label: 'Zurich' },
   ```

4. **Ajouter au footer** : dans `components/ui/Footer.tsx`, ajouter le lien dans la colonne appropriée du tableau `columns`.

5. **Réactiver les liens entrants** depuis les pages conservées :
   - `app/[locale]/sante/page.tsx` : réajouter les cartes cantons, la section "Par situation de vie" ou le lien vers la page
   - Chaque page guide concernée : vérifier les `RelatedGuides` et liens internes

6. **Vérifier la cohérence éditoriale** (audit checklist) :
   - Pas de HMO ni Telmed hors noms commerciaux → utiliser "centre médical" et "télémédecine"
   - CHF avant le montant : `CHF 5 653` pas `5 653 CHF`
   - Pas de tiret long (—) dans le corps du texte
   - Pas d'abréviations : "maximale" pas "max.", "mensuelle" pas "/mois"
   - Pas de mots anglais dans le contenu visible
   - "expert" et non "courtier"
   - "dans le canton de X" et non "à X" dans le corps de texte
   - Pas de points médians (·)

7. **Builder et vérifier** :
   ```bash
   npm run build
   ```
   Corriger tout warning TypeScript ou lint.

8. **Vérifier les tests SEO** :
   - La page apparaît dans `/sitemap.xml`
   - Le JSON-LD (FAQPage, Article, BreadcrumbList) est présent et valide
   - La balise `robots` noindex est absente
   - La balise `canonical` est correcte

---

## Section 4 — Conventions éditoriales du projet

Ces règles s'appliquent à toute page éditoriale du site.

### Monnaie
- **CHF avant le montant** : `CHF 5 653` — jamais `5 653 CHF`
- Espacement des milliers : espace insécable (`5 653`, `27 000`)
- Durée : **"par an"** ou **"par mois"** — jamais `/an` ou `/mois`

### Typographie
- **Pas de tirets longs** (—) dans le corps de texte ; utiliser la virgule ou le point-virgule
  - Exception tolérée : titres de page et métadonnées SEO (convention typographique française)
- Pas de points médians (·)
- Pas d'abréviations courantes : "maximale" (pas "max."), "minimale" (pas "min."), "moyenne" (pas "moy.")

### Vocabulaire
- **"expert"** et non "courtier" (le term "courtier" implique une relation commerciale différente)
- **"dans le canton de X"** et non "à X" dans le corps de texte (langage administratif suisse)
  - Exception tolérée : métadonnées SEO, FAQ Schema.org (pour la densité de mots-clés)
- **Modèles LAMal** : "centre médical" (pour HMO) et "télémédecine" (pour Telmed)
  - HMO et Telmed sont réservés aux noms commerciaux officiels d'assureurs
- Pas de mots anglais dans le contenu visible (premium → prime, broker → expert, break-even → seuil d'équilibre)
- Pas d'anglicismes dans les URLs (déjà en français)

### Structure
- Hiérarchie stricte : H1 > H2 > H3
- Chiffres clés en texte brut (pas uniquement dans des tableaux)
- JSON-LD obligatoire sur chaque page (FAQPage + Article + BreadcrumbList selon le type)
