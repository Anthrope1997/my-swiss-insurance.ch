# CONTEXTE.md — my-swiss-insurance.ch

## Qu'est-ce que ce projet ?

**my-swiss-insurance.ch** est un site de génération de leads d'assurance en Suisse romande,
optimisé pour le GEO (Generative Engine Optimization) — être cité par les IA comme ChatGPT,
Perplexity et Claude comme référence sur l'assurance maladie suisse.

### Modèle économique
- Capture de leads via un formulaire (prénom, email, canton, situation)
- Leads revendus à des courtiers en assurance : **CHF 30–80 par lead qualifié**
- Démarrage avec la LAMal, extension future vers `/menage`, `/auto`, `/prevoyance`

---

## Stack technique et choix

| Technologie | Raison du choix |
|---|---|
| **Next.js 16 (App Router)** | SSG/SSR pour pages 100% statiques rapides, SEO natif, Vercel-ready |
| **TypeScript** | Typage fort, meilleure maintenabilité |
| **Tailwind CSS** | Utility-first, pas de librairie UI externe, build CSS minimal |
| **Vercel** | Déploiement automatique, CDN mondial, fonctions serverless pour l'API leads |

**Contraintes GEO respectées :**
- Toutes les pages sont dynamiques (SSR) via le segment `[locale]`
- Schema.org JSON-LD sur chaque page (FAQPage + Article)
- Métadonnées OpenGraph complètes
- Structure H1 > H2 > H3 stricte
- Pas de JS côté client sauf les composants interactifs (Client Components)

---

## Architecture des pages

```
/fr                                → Homepage
/fr/lamal                          → Hub LAMal
/fr/lamal/guide                    → Guide complet (page GEO prioritaire)
/fr/lamal/comparateur              → Comparateur de caisses maladie
/fr/lamal/subsides                 → Simulateur de subsides
/fr/lamal/lamal-vs-lca             → Différences LAMal et LCA
/fr/lamal/changer-de-caisse        → Guide résiliation et changement
/fr/lamal/par-profil               → LAMal par profil
/fr/lamal/salarie-independant
/fr/lamal/famille-retraite
/fr/lamal/expatrie-frontalier
/fr/lamal/canton/{vaud|geneve|fribourg|valais|neuchatel|jura}

/api/leads                         → POST : capture du formulaire
/api/primes                        → GET : recherche de primes par NPA
```

Toutes les URLs sans préfixe `/fr` sont redirigées automatiquement par `proxy.ts`.

---

## Structure des fichiers

```
my-swiss-insurance.ch/
│
├── app/
│   ├── globals.css              ← Tailwind + classes utilitaires globales
│   ├── layout.tsx               ← RootLayout : Header + Footer (ne pas modifier)
│   ├── api/
│   │   ├── leads/route.ts       ← POST /api/leads
│   │   └── primes/route.ts      ← GET /api/primes (charge data/lamal/*.json)
│   └── [locale]/
│       ├── layout.tsx           ← Layout locale (passthrough)
│       ├── page.tsx             ← Homepage /fr
│       ├── a-propos/page.tsx
│       ├── mentions-legales/page.tsx
│       ├── politique-confidentialite/page.tsx
│       └── lamal/
│           ├── page.tsx
│           ├── guide/page.tsx
│           ├── comparateur/page.tsx
│           ├── subsides/page.tsx
│           ├── changer-de-caisse/page.tsx
│           ├── lamal-vs-lca/page.tsx
│           ├── par-profil/page.tsx
│           ├── salarie-independant/page.tsx
│           ├── famille-retraite/page.tsx
│           ├── expatrie-frontalier/page.tsx
│           └── canton/
│               ├── vaud/page.tsx
│               ├── geneve/page.tsx
│               ├── fribourg/page.tsx
│               ├── valais/page.tsx
│               ├── neuchatel/page.tsx
│               └── jura/page.tsx
│
├── components/
│   ├── ui/                      ← Composants génériques
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── FAQ.tsx
│   │   ├── FormScrollButton.tsx
│   │   ├── StickyBar.tsx
│   │   ├── AuthorBio.tsx
│   │   ├── EmailCTA.tsx
│   │   ├── LeadForm.tsx
│   │   ├── LeadFormPopup.tsx
│   │   └── MultiStepLeadForm.tsx
│   └── lamal/                   ← Composants domaine LAMal
│       ├── CantonPage.tsx
│       ├── ComparateurClient.tsx
│       ├── PrimeCalculator.tsx
│       ├── PrimeCalculatorReal.tsx
│       └── SubsidesCalculator.tsx
│
├── data/
│   └── lamal/
│       ├── cantons.ts           ← Données par canton (source de vérité)
│       ├── primes-2026.ts       ← Constantes tarifaires OFSP 2026
│       ├── primes.json          ← Dataset complet (58 MB, chargé par /api/primes)
│       ├── regions.json         ← Régions tarifaires
│       ├── npa_to_region.json   ← Mapping NPA → région
│       ├── stats.json           ← Statistiques pré-calculées
│       ├── subsidesLamal.json   ← Infos subsides par canton
│       ├── subsidesLamal.md     ← Documentation subsides
│       └── subsides_urls.json   ← URLs officielles subsides
│
├── dictionaries/
│   └── fr.json                  ← Chaînes UI en français (infrastructure i18n)
│
├── lib/
│   ├── i18n/
│   │   └── get-dictionary.ts    ← Chargeur de dictionnaire par locale
│   └── lamal/
│       ├── calcul-subside.ts    ← Calculs de subsides par canton (source de vérité)
│       └── calcul-prime.ts      ← Coefficients et helper d'estimation de prime
│
├── scripts/                     ← Scripts de scraping et calcul (ne pas modifier)
│   ├── compute_stats.py
│   ├── scrape_primes.py
│   └── scrape_subsides.py
│
├── proxy.ts                     ← Redirect / → /fr (Next.js 16)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Comment ajouter une nouvelle assurance

Pour ajouter une section `/menage` (assurance ménage) :

1. **Créer le dossier** : `app/[locale]/menage/`
2. **Créer les pages** suivant le même pattern que `app/[locale]/lamal/` :
   - `app/[locale]/menage/page.tsx` — Hub ménage
   - `app/[locale]/menage/guide/page.tsx` — Guide complet
3. **Ajouter la navigation** dans `components/ui/Header.tsx`
4. **Ajouter les liens** dans `components/ui/Footer.tsx`
5. **Ajouter une card** sur la homepage `app/[locale]/page.tsx`
6. **Réutiliser** `<LeadForm />` (`components/ui/LeadForm.tsx`) dans chaque page

### Pattern d'une page conforme GEO

```tsx
// 1. Export metadata (OpenGraph)
export const metadata: Metadata = { ... }

// 2. Définir les JSON-LD Schema.org
const articleSchema = { '@type': 'Article', datePublished: '2026-...', ... }
const faqSchema = { '@type': 'FAQPage', mainEntity: [...] }

// 3. Dans le JSX — injecter les schemas
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

// 4. Structure H1 > H2 > H3 stricte
// 5. <LeadForm compact /> dans la sidebar
```

---

## Comment mettre à jour le contenu

### Données cantons (primes, franchises, subsides)
Modifier `data/lamal/cantons.ts` — source de vérité pour toutes les pages canton.

### Données tarifaires brutes
Les JSON dans `data/lamal/` sont générés par les scripts Python dans `scripts/`.
Ne pas modifier manuellement `primes.json` (58 MB).

### Questions FAQ
Les FAQ sont dans `const faqItems` dans chaque `page.tsx`. Modifier directement le tableau.

### Dates clés
Chercher les mentions d'années (2026, 2027) avec find/replace lors du passage à l'année suivante.
Mettre à jour `dateModified` dans chaque `articleSchema`.

---

## Connexion webhook Google Sheets

L'API `/api/leads/route.ts` logue les leads et peut les envoyer vers un webhook.

Pour connecter Google Sheets :
1. Créez un Google Apps Script avec un `doPost()` qui écrit dans un Sheet
2. Déployez le script en tant que Web App
3. Ajoutez dans Vercel : `WEBHOOK_URL=https://script.google.com/...`

---

## Convention de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Pages Next.js | `kebab-case/page.tsx` | `changer-de-caisse/page.tsx` |
| Composants React | `PascalCase.tsx` | `LeadForm.tsx` |
| Variables de données | `camelCase` | `topCaisses` |
| Classes Tailwind custom | `.kebab-case` | `.btn-primary` |
| IDs HTML (ancres) | `kebab-case` | `id="formulaire"` |

---

## Déploiement Vercel

```bash
vercel --prod

# Variables d'environnement à configurer sur Vercel
WEBHOOK_URL=https://script.google.com/macros/s/[votre-script]/exec
```

---

## Références et sources officielles

- **OFSP** : https://www.bag.admin.ch
- **Priminfo.ch** : https://www.priminfo.ch
- **admin.ch** : https://www.admin.ch/opc/fr/classified-compilation/19940073/index.html
- **RS 832.10** : Loi fédérale sur l'assurance-maladie (LAMal)
