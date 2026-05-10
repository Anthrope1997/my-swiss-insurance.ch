// Couleurs de marque — alignées sur tailwind.config.ts et globals.css
// Ces constantes sont la source de vérité ; les tokens Tailwind en dérivent.

export const COLORS = {
  // Bleu principal
  brand:      '#1d4ed8',  // bg-brand / text-brand
  brandDark:  '#1e40af',  // bg-brand-dark / text-brand-dark  (hover)
  brandLight: '#3b82f6',  // bg-brand-light

  // Bleu pâle
  blueTint:   '#dbeafe',  // fond bleu très clair (badges, callouts)
  blueLight:  '#eff6ff',  // fond bleu encore plus clair (hover sélection)
  blueHint:   '#f8fafc',  // fond quasi-blanc avec teinte bleue

  // Marine
  navy:       '#0f2040',  // Header, Footer (bg)
  navyLight:  '#1a3a6e',

  // Neutrals
  ink:        '#1a1a1a',  // text-ink (corps principal)
  slate:      '#475569',  // text-slate (texte secondaire)
  muted:      '#94a3b8',  // texte très atténué (ex. bouton fermer)
  edge:       '#e2e8f0',  // border-edge
  cloud:      '#f1f5f9',  // bg-cloud (fonds gris pâle)

  // Icône callout (ampoule bleue)
  calloutIcon: '#378ADD',

  // État — succès dans StickyBar UNIQUEMENT
  // #4ade80 (vert) est banni du design system global ;
  // son usage reste localisé dans StickyBar jusqu'à refonte UX.
} as const

export type ColorToken = keyof typeof COLORS
