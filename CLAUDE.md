# CONTEXTE.md — my-swiss-insurance.ch

## Qu'est-ce que ce projet ?

**my-swiss-insurance.ch** est un site de génération de leads d'assurance en Suisse romande,
optimisé pour le GEO (Generative Engine Optimization) — être cité par les IA comme ChatGPT,
Perplexity et Claude comme référence sur l'assurance maladie suisse.

### Modèle économique
- Capture de leads via un formulaire (prénom, email, canton, situation)
- Leads revendus à des courtiers en assurance : **100 CHF par lead qualifié**
- Démarrage avec la LAMal, extension future vers `/menage`, `/auto`, `/prevoyance`

---

## Stack technique

| Technologie | Raison du choix |
|---|---|
| **Next.js 16 (App Router)** | SSG/SSR pour pages dynamiques, SEO natif, Vercel-ready |
| **TypeScript** | Typage fort, meilleure maintenabilité |
| **Tailwind CSS** | Utility-first, tokens design system, build CSS minimal |
| **Vercel** | Déploiement automatique, CDN mondial, fonctions serverless pour l'API leads |

**Contraintes GEO respectées :**
- Pages SSR via le segment `[locale]`
- Schema.org JSON-LD sur chaque page (FAQPage + Article + BreadcrumbList)
- Structure H1 > H2 > H3 stricte
- Chiffres clés en texte brut (pas uniquement dans les tableaux)
- URLs Schema.org : `/sante/` exclusivement

---

## Connexion webhook Google Sheets

L'API `/api/leads/route.ts` logue les leads et peut les envoyer vers un webhook.

Pour connecter Google Sheets :
1. Créez un Google Apps Script avec un `doPost()` qui écrit dans un Sheet
2. Déployez le script en tant que Web App
3. Ajoutez dans Vercel : `WEBHOOK_URL=https://script.google.com/...`

---

## Références et sources officielles

- **OFSP** : https://www.bag.admin.ch
- **Priminfo.ch** : https://www.priminfo.ch
- **admin.ch** : https://www.admin.ch/opc/fr/classified-compilation/19940073/index.html
- **RS 832.10** : Loi fédérale sur l'assurance-maladie (LAMal)

---

## Skills disponibles

| Skill | Fichier | Rôle |
|---|---|---|
| UI Designer | `skills/UI_designer.skill` | Design system, composants, templates, règles visuelles et éditoriales |
| Copywriter | `skills/Copywriter.skill` | Ton, style, règles d'écriture, vocabulaire |
| Critical User | `skills/Critical_user.skill` | Persona Michel — audit contenu et formatting avant mise en production |
| Architecture | `skills/architecture.skill` | Structure fichiers, URLs, composants, données, checklist d'audit |
