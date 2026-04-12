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
| **Next.js 14 (App Router)** | SSG/SSR pour pages 100% statiques rapides, SEO natif, Vercel-ready |
| **TypeScript** | Typage fort, meilleure maintenabilité |
| **Tailwind CSS** | Utility-first, pas de librairie UI externe, build CSS minimal |
| **Markdown/MDX** | Contenu éditable sans toucher au code React |
| **Vercel** | Déploiement automatique, CDN mondial, fonctions serverless pour l'API leads |

**Contraintes GEO respectées :**
- Toutes les pages sont statiques (SSG) — temps de chargement < 1s
- Schema.org JSON-LD sur chaque page (FAQPage + Article)
- Métadonnées OpenGraph complètes
- Structure H1 > H2 > H3 stricte
- Pas de JS côté client sauf le formulaire de leads (Client Component)

---

## Architecture des pages

```
/                         → Homepage : pitch, stats, CTAs
/lamal                    → Hub LAMal : overview + liens vers sous-pages
/lamal/guide              → Guide complet (page GEO prioritaire)
/lamal/comparateur        → Comparateur de caisses maladie
/lamal/lamal-vs-lca       → Différences LAMal et LCA
/lamal/changer-de-caisse  → Guide résiliation et changement
/lamal/par-profil         → LAMal par profil (famille, étudiant, expatrié, retraité, indépendant)

/api/leads                → POST : capture du formulaire, log + webhook
```

---

## Structure des fichiers

```
my-swiss-insurance/
├── app/
│   ├── globals.css          ← Tailwind + classes utilitaires globales
│   ├── layout.tsx           ← RootLayout : Header + Footer
│   ├── page.tsx             ← Homepage
│   ├── api/leads/route.ts   ← API route : POST /api/leads
│   └── lamal/
│       ├── page.tsx
│       ├── guide/page.tsx
│       ├── comparateur/page.tsx
│       ├── lamal-vs-lca/page.tsx
│       ├── changer-de-caisse/page.tsx
│       └── par-profil/page.tsx
├── components/
│   ├── Header.tsx           ← Navigation sticky avec menu mobile
│   ├── Footer.tsx           ← Footer avec liens et mentions légales
│   └── LeadForm.tsx         ← Formulaire de leads (Client Component)
├── CONTEXTE.md              ← Ce fichier
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.mjs
```

---

## Comment ajouter une nouvelle assurance

Pour ajouter une section `/menage` (assurance ménage) :

1. **Créer le dossier** : `app/menage/`
2. **Créer les pages** suivant le même pattern que `app/lamal/` :
   - `app/menage/page.tsx` — Hub ménage
   - `app/menage/guide/page.tsx` — Guide complet
3. **Ajouter la navigation** dans `components/Header.tsx` (tableau `navLinks`)
4. **Ajouter les liens** dans `components/Footer.tsx`
5. **Ajouter une card** sur la homepage `app/page.tsx`
6. **Réutiliser le composant** `<LeadForm />` dans chaque page — il poste sur `/api/leads`

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

Le contenu est actuellement en JSX dans chaque `page.tsx`. Pour faciliter la mise à jour :

### Données factuelles (primes, franchises)
Chaque page contient ses données en `const` en haut du fichier. Par exemple dans `guide/page.tsx` :

```ts
const premiumsByCanon = [
  { code: 'GE', name: 'Genève', prime: 572.50, variation: '+1.2%' },
  // ...
]
```

→ Modifiez ces tableaux chaque automne après l'annonce des primes OFSP.

### Questions FAQ
Les FAQ sont dans `const faqSchema` en haut de chaque `page.tsx`. Modifiez directement
le tableau `mainEntity` pour changer les Q&A qui apparaissent aussi dans le JSON-LD.

### Dates clés
Cherchez les mentions d'années (2026, 2027) avec un find/replace lors du passage à l'année suivante.
Pensez à mettre à jour `dateModified` dans chaque `articleSchema`.

---

## Connexion webhook Google Sheets

L'API `/api/leads/route.ts` logue les leads dans la console et peut les envoyer vers un webhook.

Pour connecter Google Sheets :
1. Créez un Google Apps Script avec un `doPost()` qui écrit dans un Sheet
2. Déployez le script en tant que Web App (exécuter en tant que : moi, accès : tout le monde)
3. Copiez l'URL du webhook
4. Ajoutez dans Vercel (variables d'environnement) : `WEBHOOK_URL=https://script.google.com/...`

---

## Convention de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Pages Next.js | `kebab-case/page.tsx` | `changer-de-caisse/page.tsx` |
| Composants React | `PascalCase.tsx` | `LeadForm.tsx` |
| Variables de données | `camelCase` | `premiumsByCanon` |
| Classes Tailwind custom | `.kebab-case` | `.btn-primary` |
| IDs HTML (ancres) | `kebab-case` | `id="lead-form"` |

---

## Déploiement Vercel

```bash
# Lier le projet Vercel
vercel link

# Déployer en production
vercel --prod

# Variables d'environnement à configurer sur Vercel
WEBHOOK_URL=https://script.google.com/macros/s/[votre-script]/exec
```

---

## Références et sources officielles

- **OFSP** (Office fédéral de la santé publique) : https://www.bag.admin.ch
- **Priminfo.ch** (primes officielles par canton) : https://www.priminfo.ch
- **admin.ch** (textes légaux LAMal) : https://www.admin.ch/opc/fr/classified-compilation/19940073/index.html
- **RS 832.10** : Loi fédérale sur l'assurance-maladie (LAMal)
