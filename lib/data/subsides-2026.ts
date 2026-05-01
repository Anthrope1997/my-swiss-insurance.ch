// lib/data/subsides-2026.ts
// Source unique de données — subsides LAMal 2026 — 26 cantons suisses
//
// Sources officielles (scrapées avril 2026) :
//   GE : ge.ch/informations-generales-subside-assurance-maladie/baremes
//   VD : Notice explicative OVAM 2026 (PDF)
//   NE : ne.ch barèmes 2026 (RSN 821.102, classifications S1–S15)
//   VS : Echelle RIP 2026 (PDF officiel, Service AVS Valais)
//   FR : FR-memento_rpi_f_2026.pdf + FR-grille_lissage_des_taux_paliers_f.pdf (ECAS FR)
//   JU : communiqué SIC jura.ch 2025 + ecasjura.ch RPI 2026
//   Cantons alémaniques : sites cantonaux officiels (SVA, Ausgleichskasse, etc.)
//
// Consolidé depuis lib/data/subsides-cantons.ts (données brutes) +
//   métadonnées simulateur (subsides-simulator)
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types communs ────────────────────────────────────────────────────────────

export type Situation = 'seul' | 'couple'

export type CantonCode =
  | 'AG' | 'AI' | 'AR' | 'BE' | 'BL' | 'BS'
  | 'FR' | 'GE' | 'GL' | 'GR'
  | 'JU' | 'LU'
  | 'NE' | 'NW' | 'OW'
  | 'SG' | 'SH' | 'SO' | 'SZ'
  | 'TG' | 'TI' | 'UR'
  | 'VD' | 'VS'
  | 'ZG' | 'ZH'

export interface SubsideResult {
  adulte:   number   // CHF/mois par adulte
  enfant:   number   // CHF/mois par enfant
  total:    number   // CHF/mois ménage complet
  approx:   boolean  // true = interpolation / estimation
  label?:   string
  note?:    string
}

// ─── Barèmes précis — interfaces ─────────────────────────────────────────────

// GE : groupe d'imposition (groupes 1–9)
export interface GroupeGE {
  groupe:          number
  adulte:          number   // CHF/mois (0 pour groupe 9 sans enfant)
  jeune:           number   // CHF/mois — 19–25 ans
  enfant:          number   // CHF/mois
  revenuMaxSeul:   number   // seuil seul sans enfant (CHF/an) — Infinity pour groupe 9
  revenuMaxCouple: number   // seuil couple sans enfant (CHF/an) — Infinity pour groupe 9
}

// NE : bande de classification S1–S15 (5 groupes fusionnés)
export interface BandeNE {
  label:   string   // 'S1–S11' | 'S12' | ... | 'S15'
  adulte:  number   // CHF/mois ≥ 26 ans
  jeune:   number   // CHF/mois 19–25 ans
  enfant:  number   // CHF/mois
  maxSeul: number   // seuil revenu ajusté (seul sans enfant)
}

// VS : entrée du barème de taux par profil de ménage
export interface TauxVS {
  profil:      'seul_0e' | 'seul_1e+' | 'couple_0e' | 'couple_1e' | 'couple_2e' | 'couple_3e' | 'couple_4e+'
  taux:        number   // % de la prime de référence (10 | 20 | 30 | 40 | 50 | 70 | 100)
  revenuMaxAn: number   // borne supérieure de cette tranche (CHF/an)
}

// VD : segment du barème linéaire par morceaux
export interface SegmentVD {
  profil:     'adulte26_seul' | 'adulte1925' | 'adulte26_famille' | 'enfant'
  revenuMin:  number
  revenuMax:  number
  montantMin: number   // CHF/mois au niveau revenuMin
  montantMax: number   // CHF/mois au niveau revenuMax (= montantMin si palier plat)
}

// FR : palier de la grille lissage des taux (art. 6 ORP)
// pctEnDessous = (limite − revenuDéterminant) / limite × 100
// Dernier palier : pctMax = Infinity
export interface PalierFR {
  pctMin: number
  pctMax: number
  taux:   number   // % de la prime moyenne régionale (1.00 → 65.00)
}

// Seuil d'éligibilité générique (FR seuils de revenus, VS enfant max, JU seuils)
export interface SeuilEligibilite {
  statut:    'seul' | 'couple'
  nbEnfants: number
  revenuMax: number   // CHF/an — revenu max pour avoir droit
}

// ─── Interface canton consolidée ──────────────────────────────────────────────

export interface CantonSubside2026 {
  // ── Métadonnées affichage ─────────────────────────────────────────────────
  nom:           string
  seuilRevenu:   string    // ex. '≤ 37 000 CHF/an' (pour personne seule sans enfant)
  seuilNum?:     number    // valeur numérique du seuil seul/adulte/0e — absent = formule propriétaire
  montantMaxNum: number    // CHF/mois max pour un adulte seul
  montantMax:    string    // ex. '≤ 370 CHF/mois'
  auto:          boolean   // true = attribution automatique sans demande
  delai:         string    // date limite de dépôt
  lien:          string    // URL officielle
  primeMoyenne:  number    // prime de référence adulte (pour formule standard / affichage)

  // ── Barèmes précis — présents uniquement pour les cantons avec formule officielle publiée ──
  ge?: {
    groupes:          GroupeGE[]
    bonusEnfantSeul:  number   // CHF ajoutés aux seuils par enfant (seul) — GE: 13 000
    bonusEnfantCouple: number  // CHF ajoutés aux seuils par enfant (couple) — GE: 17 000
  }
  ne?: {
    bandes:        BandeNE[]
    facteurCouple: number   // NE: 0.60 — diviseur du revenu couple pour comparaison aux seuils seul
    facteurEnfant: number   // NE: 0.28 — coefficient additionnel par enfant dans le diviseur
  }
  vs?: {
    primeReference:  { adulte: number; jeune: number; enfant: number }
    taux:            TauxVS[]
    enfantMaxRevenu: SeuilEligibilite[]   // revenu max pour le subside enfant (80 % × prime enfant)
  }
  vd?: {
    segments: SegmentVD[]
  }
  fr?: {
    seuilsEligibilite:  SeuilEligibilite[]   // limites légales par situation/nbEnfants
    paliers:            PalierFR[]           // 60 paliers officiels (art. 6 ORP)
    primesMoyennes:     { region: string; adulte: number; jeune: number; enfant: number }[]
    pctMinEnfant:       number   // FR: 80 — subside enfant ≥ 80 % de la prime moyenne
    pctMinJAFormation:  number   // FR: 50 — subside JA formation ≥ 50 % de la prime moyenne
  }
  ju?: {
    seuilsEligibilite: SeuilEligibilite[]   // seuils RDU par situation/nbEnfants
    adulteMax:         number   // CHF/mois — maximum du barème gradué (15–225, non publié)
    enfant:            number   // CHF/mois — montant fixe 2026
    jeune:             number   // CHF/mois — montant fixe JA formation < 25 ans
  }
}

// ─── SUBSIDES_2026 : source unique pour les 26 cantons ────────────────────────

export const SUBSIDES_2026: Record<CantonCode, CantonSubside2026> = {

  // ══════════════════════════════════════════════════════════════════════════
  // CANTONS ALÉMANIQUES — formule standard
  // seuilNum = seuil personne seule adulte sans enfant (source : subsides-cantons.ts)
  // montantMaxNum = Richtprämie mensuelle ou maximum barème officiel
  // primeMoyenne = prime de référence adulte pour la formule linéaire
  // ══════════════════════════════════════════════════════════════════════════

  AG: {
    nom: 'Argovie',
    seuilRevenu: '≈ 42 000 CHF/an', seuilNum: 42000,
    montantMaxNum: 486, montantMax: '≤ 486 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-aargau.ch/private/ihre-private-situation/finanzielle-unterstuetzung/praemienverbilligung/allgemeine',
    primeMoyenne: 419,
  },

  AI: {
    nom: 'Appenzell Rh.-Int.',
    seuilRevenu: '≈ 55 000 CHF/an', seuilNum: 55000,
    montantMaxNum: 387, montantMax: '≤ 387 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.ai.ch/themen/gesundheit/krankenversicherung/praemienverbilligung',
    primeMoyenne: 382,
  },

  AR: {
    nom: 'Appenzell Rh.-Ext.',
    seuilRevenu: '≤ 35 000 CHF/an', seuilNum: 35000,
    montantMaxNum: 502, montantMax: '≤ 502 CHF/mois',
    auto: false, delai: '31 mars 2026',
    lien: 'https://www.sovar.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    primeMoyenne: 432,
  },

  BE: {
    nom: 'Berne',
    seuilRevenu: '≤ 35 000 CHF/an', seuilNum: 35000,
    montantMaxNum: 221, montantMax: '≤ 221 CHF/mois',
    auto: true, delai: '31 mars 2027',
    lien: 'https://www.gef.be.ch/gef/fr/index/gesundheit/gesundheit/krankenversicherung/praemienverbilligung.html',
    primeMoyenne: 397,
  },

  BL: {
    nom: 'Bâle-Campagne',
    seuilRevenu: '≤ 31 000 CHF/an', seuilNum: 31000,
    montantMaxNum: 383, montantMax: '≤ 383 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-bl.ch/de/ausgleichskasse/individuelle-praemienverbilligung-ipv',
    primeMoyenne: 466,
  },

  BS: {
    nom: 'Bâle-Ville',
    seuilRevenu: '≤ 49 375 CHF/an', seuilNum: 49375,
    montantMaxNum: 444, montantMax: '≤ 444 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.bs.ch/themen/finanzielle-hilfe/leistungen/praemienverbilligung',
    primeMoyenne: 500,
  },

  GL: {
    nom: 'Glaris',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 454, montantMax: '≤ 454 CHF/mois',
    auto: false, delai: '31 janv. 2026',
    lien: 'https://www.gl.ch/verwaltung/finanzen-und-gesundheit/steuern/individuelle-praemienverbilligung-ipv.html/502',
    primeMoyenne: 345,
  },

  GR: {
    nom: 'Grisons',
    seuilRevenu: '≈ 59 000 CHF/an', seuilNum: 59000,
    montantMaxNum: 493, montantMax: '≤ 493 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva.gr.ch/dienstleistungen/individuelle-praemienverbilligung.html',
    primeMoyenne: 390,
  },

  LU: {
    nom: 'Lucerne',
    seuilRevenu: '≈ 44 000 CHF/an', seuilNum: 44000,
    montantMaxNum: 469, montantMax: '≤ 469 CHF/mois',
    auto: false, delai: '31 oct. 2026',
    lien: 'https://www.was-luzern.ch/praemienverbilligung',
    primeMoyenne: 395,
  },

  NW: {
    nom: 'Nidwald',
    seuilRevenu: '≈ 54 000 CHF/an', seuilNum: 54000,
    montantMaxNum: 450, montantMax: '≤ 450 CHF/mois',
    auto: false, delai: '30 avr. 2026',
    lien: 'https://www.aknw.ch/dienstleistungen/praemienverbilligung-ipv',
    primeMoyenne: 288,
  },

  OW: {
    nom: 'Obwald',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 418, montantMax: '≤ 418 CHF/mois',
    auto: false, delai: '31 mai 2026',
    lien: 'https://www.akow.ch/dienstleistungen/praemienverbilligung',
    primeMoyenne: 303,
  },

  SG: {
    nom: 'Saint-Gall',
    seuilRevenu: '≤ 41 700 CHF/an', seuilNum: 41700,
    montantMaxNum: 524, montantMax: '≤ 524 CHF/mois',
    auto: false, delai: '31 mars 2026',
    lien: 'https://www.svasg.ch/produkte/ipv/',
    primeMoyenne: 430,
  },

  SH: {
    nom: 'Schaffhouse',
    seuilRevenu: '≈ 44 000 CHF/an', seuilNum: 44000,
    montantMaxNum: 322, montantMax: '≤ 322 CHF/mois',
    auto: false, delai: '30 avr. 2026',
    lien: 'https://www.svash.ch',
    primeMoyenne: 431,
  },

  SO: {
    nom: 'Soleure',
    seuilRevenu: '≤ 74 000 CHF/an', seuilNum: 74000,
    montantMaxNum: 422, montantMax: '≤ 422 CHF/mois',
    auto: false, delai: '31 juil. 2026',
    lien: 'https://www.akso.ch/dienstleistungen/praemienverbilligung-ipv',
    primeMoyenne: 387,
  },

  SZ: {
    nom: 'Schwytz',
    seuilRevenu: '≤ 43 554 CHF/an', seuilNum: 43554,
    montantMaxNum: 465, montantMax: '≤ 465 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-sz.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    primeMoyenne: 347,
  },

  TG: {
    nom: 'Thurgovie',
    seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000,
    montantMaxNum: 284, montantMax: '≤ 284 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://gesundheit.tg.ch/bevoelkerung/krankenversicherung/praemienverbilligung.html/5578',
    primeMoyenne: 360,
  },

  TI: {
    nom: 'Tessin',
    seuilRevenu: 'Formule RIPAM',
    // seuilNum absent — formule non linéaire (art. 32a–32b LCAMal)
    montantMaxNum: 668, montantMax: '≤ 668 CHF/mois',
    auto: false, delai: 'Dépôt possible — rétroactif',
    lien: 'https://www4.ti.ch/dss/ias/prestazioni-e-contributi/scheda/p/s/dettaglio/riduzione-dei-premi-dellassicurazione-malattia-ripam/richiesta-del-formulario-ripam/',
    primeMoyenne: 531,
  },

  UR: {
    nom: 'Uri',
    seuilRevenu: '≈ 51 000 CHF/an', seuilNum: 51000,
    montantMaxNum: 364, montantMax: '≤ 364 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.svsuri.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    primeMoyenne: 310,
  },

  ZG: {
    nom: 'Zoug',
    seuilRevenu: '≤ 89 900 CHF/an', seuilNum: 89900,
    montantMaxNum: 415, montantMax: '≤ 415 CHF/mois',
    auto: false, delai: '30 avr. 2026',
    lien: 'https://www.akzug.ch/dienstleistungen/praemienverbilligung',
    primeMoyenne: 360,
  },

  ZH: {
    nom: 'Zurich',
    seuilRevenu: 'Formule cantonale',
    // seuilNum absent — barème ZH complexe (48 seuils par profil/région)
    montantMaxNum: 442, montantMax: '≤ 442 CHF/mois',
    auto: false, delai: '31 mars 2027',
    lien: 'https://svazurich.ch/ihr-anliegen/privatpersonen/praemienverbilligung/praemienverbilligung_2026/einkommensgrenzen-2026.html',
    primeMoyenne: 442,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CANTONS ROMANDS — barèmes officiels précis publiés
  // ══════════════════════════════════════════════════════════════════════════

  // ── Genève (GE) ────────────────────────────────────────────────────────────
  // Source : ge.ch/informations-generales-subside-assurance-maladie/baremes
  // 9 groupes d'imposition — montants mensuels fixes 2026
  // Seuils ajustés par enfant : +13 000 CHF (seul) / +17 000 CHF (couple)
  // Groupe 9 : famille « rattrapage » (adulte=0 si seul sans enfant)
  GE: {
    nom: 'Genève',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 348, montantMax: '≤ 348 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.ge.ch/informations-generales-subside-assurance-maladie',
    primeMoyenne: 710,
    ge: {
      bonusEnfantSeul:   13_000,
      bonusEnfantCouple: 17_000,
      groupes: [
        { groupe: 1, adulte: 348, jeune: 231, enfant: 132, revenuMaxSeul:  30_000, revenuMaxCouple:  45_000 },
        { groupe: 2, adulte: 294, jeune: 231, enfant: 132, revenuMaxSeul:  32_917, revenuMaxCouple:  55_000 },
        { groupe: 3, adulte: 240, jeune: 231, enfant: 132, revenuMaxSeul:  35_833, revenuMaxCouple:  65_000 },
        { groupe: 4, adulte: 196, jeune: 231, enfant: 132, revenuMaxSeul:  38_750, revenuMaxCouple:  75_000 },
        { groupe: 5, adulte: 164, jeune: 231, enfant: 132, revenuMaxSeul:  41_667, revenuMaxCouple:  85_000 },
        { groupe: 6, adulte: 120, jeune: 231, enfant: 132, revenuMaxSeul:  44_583, revenuMaxCouple:  95_000 },
        { groupe: 7, adulte:  87, jeune: 231, enfant: 132, revenuMaxSeul:  47_500, revenuMaxCouple: 105_000 },
        { groupe: 8, adulte:  55, jeune: 231, enfant: 132, revenuMaxSeul:  50_000, revenuMaxCouple: 115_000 },
        // Groupe 9 : uniquement familles avec enfants (adulte=0 pour seul sans enfant)
        { groupe: 9, adulte:   0, jeune: 106, enfant:  67, revenuMaxSeul: Infinity, revenuMaxCouple: Infinity },
      ],
    },
  },

  // ── Vaud (VD) ──────────────────────────────────────────────────────────────
  // Source : Notice explicative OVAM 2026
  // Barème linéaire par morceaux — subside ordinaire mensuel
  // Un subside spécifique peut s'ajouter si primes > 10 % du RDU
  VD: {
    nom: 'Vaud',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 331, montantMax: '≤ 331 CHF/mois',
    auto: false, delai: 'Voir OVAM 2026',
    lien: 'https://www.vd.ch/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',
    primeMoyenne: 638,
    vd: {
      segments: [
        // adulte26_seul : adulte ≥ 26 ans seul sans enfant
        { profil: 'adulte26_seul', revenuMin:      0, revenuMax:  17_000, montantMin: 331, montantMax: 331 },
        { profil: 'adulte26_seul', revenuMin: 17_000, revenuMax:  40_000, montantMin: 331, montantMax:  30 },
        { profil: 'adulte26_seul', revenuMin: 40_000, revenuMax:  50_000, montantMin:  30, montantMax:  30 },
        { profil: 'adulte26_seul', revenuMin: 50_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
        // adulte1925 : 19–25 ans (seul, couple, avec ou sans enfants)
        { profil: 'adulte1925', revenuMin:      0, revenuMax:  16_000, montantMin: 255, montantMax: 255 },
        { profil: 'adulte1925', revenuMin: 16_000, revenuMax:  34_000, montantMin: 255, montantMax:  20 },
        { profil: 'adulte1925', revenuMin: 34_000, revenuMax:  39_000, montantMin:  20, montantMax:  20 },
        { profil: 'adulte1925', revenuMin: 39_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
        // adulte26_famille : adulte ≥ 26 ans en couple ou avec enfant(s)
        // Discontinuité à 24 200 CHF : palier 318 → début rampe à 300
        { profil: 'adulte26_famille', revenuMin:      0, revenuMax:  24_200, montantMin: 318, montantMax: 318 },
        { profil: 'adulte26_famille', revenuMin: 24_200, revenuMax:  55_000, montantMin: 300, montantMax:  20 },
        { profil: 'adulte26_famille', revenuMin: 55_000, revenuMax:  72_500, montantMin:  20, montantMax:  20 },
        { profil: 'adulte26_famille', revenuMin: 72_500, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
        // enfant : barème unique < 18 ans
        { profil: 'enfant', revenuMin:      0, revenuMax:  76_000, montantMin: 114, montantMax: 114 },
        { profil: 'enfant', revenuMin: 76_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
      ],
    },
  },

  // ── Neuchâtel (NE) ─────────────────────────────────────────────────────────
  // Source : ne.ch — barème 2026, RSN 821.102 (classifications S1–S15)
  // Ajustement revenu : revAdj = (revenu / facteurCouple) / (1 + nbEnfants × facteurEnfant)
  NE: {
    nom: 'Neuchâtel',
    seuilRevenu: '≈ 65 000 CHF/an', seuilNum: 65000,
    montantMaxNum: 643, montantMax: '≤ 643 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.ne.ch/themes/social/assurance-maladie/subsides-assurance-maladie-lamal',
    primeMoyenne: 663,
    ne: {
      facteurCouple: 0.60,
      facteurEnfant: 0.28,
      bandes: [
        { label: 'S1–S11', adulte: 643, jeune: 484, enfant: 160, maxSeul: 50_600 },
        { label: 'S12',    adulte: 515, jeune: 387, enfant: 160, maxSeul: 53_500 },
        { label: 'S13',    adulte: 390, jeune: 293, enfant: 160, maxSeul: 56_400 },
        { label: 'S14',    adulte: 272, jeune: 204, enfant: 160, maxSeul: 58_164 },
        { label: 'S15',    adulte: 166, jeune: 124, enfant: 160, maxSeul: 65_089 },
      ],
    },
  },

  // ── Fribourg (FR) ──────────────────────────────────────────────────────────
  // Sources : FR-memento_rpi_f_2026.pdf + FR-grille_lissage_des_taux_paliers_f.pdf (ECAS FR)
  //           Loi LALAMal art. 14–15 + Ordonnance ORP art. 3, 6
  //
  // Formule complète :
  //   1. Revenu déterminant (RD) = revenu net fiscal (code 4.910)
  //      + primes et cotisations assurance (codes 4.110–4.140)
  //      + intérêts passifs privés > CHF 30 000 (code 4.210)
  //      + frais entretien immeubles privés > CHF 15 000 (code 4.310)
  //      + 5 % de la fortune imposable (code 7.910)
  //   2. Exclusions absolues : revenu net > 150 000 CHF OU fortune > 250 000 CHF
  //   3. Source-taxés : RD = 80 % revenu brut + 5 % fortune
  //   4. Éligibilité : RD < limite(situation, nbEnfants) (tableau ci-dessous)
  //   5. pctEnDessous = (limite − RD) / limite × 100
  //   6. Taux = lookup dans grille 60 paliers (paliers[])
  //   7. Subside = taux/100 × prime_moyenne_régionale[profil][région]
  //      Enfants : taux = max(taux calculé, 80 %) ; JA formation : max(taux, 50 %)
  //   8. Plafond : subside ≤ prime nette réelle de l'assuré (100 %)
  FR: {
    nom: 'Fribourg',
    seuilRevenu: '≤ 37 000 CHF/an', seuilNum: 37000,
    montantMaxNum: 370, montantMax: '≤ 370 CHF/mois',   // 65 % × CHF 569 (région 1 adulte)
    auto: true, delai: '31 août 2026',
    lien: 'https://www.ecasfr.ch/fr/Assurances/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie.html',
    primeMoyenne: 569,   // prime adulte région 1 (Sarine) — base du calcul
    fr: {
      // Limites légales 2026 — mémento RPI 2026, art. 3 ORP
      // seul : 37 000 + 20 400 (1er enfant) + 14 000 par enfant supplémentaire
      // couple : 65 000 + 14 000 par enfant
      seuilsEligibilite: [
        { statut: 'seul',   nbEnfants: 0, revenuMax:  37_000 },
        { statut: 'seul',   nbEnfants: 1, revenuMax:  57_400 },
        { statut: 'seul',   nbEnfants: 2, revenuMax:  71_400 },
        { statut: 'seul',   nbEnfants: 3, revenuMax:  85_400 },
        { statut: 'seul',   nbEnfants: 4, revenuMax:  99_400 },
        { statut: 'seul',   nbEnfants: 5, revenuMax: 113_400 },
        { statut: 'seul',   nbEnfants: 6, revenuMax: 127_400 },
        { statut: 'couple', nbEnfants: 0, revenuMax:  65_000 },
        { statut: 'couple', nbEnfants: 1, revenuMax:  79_000 },
        { statut: 'couple', nbEnfants: 2, revenuMax:  93_000 },
        { statut: 'couple', nbEnfants: 3, revenuMax: 107_000 },
        { statut: 'couple', nbEnfants: 4, revenuMax: 121_000 },
        { statut: 'couple', nbEnfants: 5, revenuMax: 135_000 },
        { statut: 'couple', nbEnfants: 6, revenuMax: 149_000 },
      ],
      // Primes moyennes régionales 2026 (mémento §8.1)
      primesMoyennes: [
        { region: '1', adulte: 569, jeune: 415, enfant: 136 },   // Région 1 : district de la Sarine
        { region: '2', adulte: 524, jeune: 386, enfant: 124 },   // Région 2 : Broye, Glâne, Gruyère, Lac, Singine, Veveyse
      ],
      pctMinEnfant:      80,   // subside enfant ≥ 80 % prime moyenne enfant (art. 65 LAMal)
      pctMinJAFormation: 50,   // subside JA formation ≥ 50 % prime moyenne jeune (art. 65 LAMal)
      // Grille lissage des taux — 60 paliers officiels (art. 6 ORP / art. 15 LALAMal)
      // Source : FR-grille_lissage_des_taux_paliers_f.pdf (ECAS FR, 06.2023/ECAS)
      // Lecture : pctEnDessous = (limite − RD) / limite × 100
      //           → chercher palier tel que pctMin ≤ pctEnDessous ≤ pctMax
      paliers: [
        { pctMin:  0.01, pctMax:  1.02, taux:  1.00 },
        { pctMin:  1.03, pctMax:  2.03, taux:  2.08 },
        { pctMin:  2.04, pctMax:  3.05, taux:  3.17 },
        { pctMin:  3.06, pctMax:  4.07, taux:  4.25 },
        { pctMin:  4.08, pctMax:  5.08, taux:  5.34 },
        { pctMin:  5.09, pctMax:  6.10, taux:  6.42 },
        { pctMin:  6.11, pctMax:  7.12, taux:  7.51 },
        { pctMin:  7.13, pctMax:  8.14, taux:  8.59 },
        { pctMin:  8.15, pctMax:  9.15, taux:  9.68 },
        { pctMin:  9.16, pctMax: 10.17, taux: 10.76 },
        { pctMin: 10.18, pctMax: 11.19, taux: 11.85 },
        { pctMin: 11.20, pctMax: 12.20, taux: 12.93 },
        { pctMin: 12.21, pctMax: 13.22, taux: 14.02 },
        { pctMin: 13.23, pctMax: 14.24, taux: 15.10 },
        { pctMin: 14.25, pctMax: 15.25, taux: 16.19 },
        { pctMin: 15.26, pctMax: 16.27, taux: 17.27 },
        { pctMin: 16.28, pctMax: 17.29, taux: 18.36 },
        { pctMin: 17.30, pctMax: 18.31, taux: 19.44 },
        { pctMin: 18.32, pctMax: 19.32, taux: 20.53 },
        { pctMin: 19.33, pctMax: 20.34, taux: 21.61 },
        { pctMin: 20.35, pctMax: 21.36, taux: 22.69 },
        { pctMin: 21.37, pctMax: 22.37, taux: 23.78 },
        { pctMin: 22.38, pctMax: 23.39, taux: 24.86 },
        { pctMin: 23.40, pctMax: 24.41, taux: 25.95 },
        { pctMin: 24.42, pctMax: 25.42, taux: 27.03 },
        { pctMin: 25.43, pctMax: 26.44, taux: 28.12 },
        { pctMin: 26.45, pctMax: 27.46, taux: 29.20 },
        { pctMin: 27.47, pctMax: 28.47, taux: 30.29 },
        { pctMin: 28.48, pctMax: 29.49, taux: 31.37 },
        { pctMin: 29.50, pctMax: 30.51, taux: 32.46 },
        { pctMin: 30.52, pctMax: 31.53, taux: 33.54 },
        { pctMin: 31.54, pctMax: 32.54, taux: 34.63 },
        { pctMin: 32.55, pctMax: 33.56, taux: 35.71 },
        { pctMin: 33.57, pctMax: 34.58, taux: 36.80 },
        { pctMin: 34.59, pctMax: 35.59, taux: 37.88 },
        { pctMin: 35.60, pctMax: 36.61, taux: 38.97 },
        { pctMin: 36.62, pctMax: 37.63, taux: 40.05 },
        { pctMin: 37.64, pctMax: 38.64, taux: 41.14 },
        { pctMin: 38.65, pctMax: 39.66, taux: 42.22 },
        { pctMin: 39.67, pctMax: 40.68, taux: 43.31 },
        { pctMin: 40.69, pctMax: 41.69, taux: 44.39 },
        { pctMin: 41.70, pctMax: 42.71, taux: 45.47 },
        { pctMin: 42.72, pctMax: 43.73, taux: 46.56 },
        { pctMin: 43.74, pctMax: 44.75, taux: 47.64 },
        { pctMin: 44.76, pctMax: 45.76, taux: 48.73 },
        { pctMin: 45.77, pctMax: 46.78, taux: 49.81 },
        { pctMin: 46.79, pctMax: 47.80, taux: 50.90 },
        { pctMin: 47.81, pctMax: 48.81, taux: 51.98 },
        { pctMin: 48.82, pctMax: 49.83, taux: 53.07 },
        { pctMin: 49.84, pctMax: 50.85, taux: 54.15 },
        { pctMin: 50.86, pctMax: 51.86, taux: 55.24 },
        { pctMin: 51.87, pctMax: 52.88, taux: 56.32 },
        { pctMin: 52.89, pctMax: 53.90, taux: 57.41 },
        { pctMin: 53.91, pctMax: 54.92, taux: 58.49 },
        { pctMin: 54.93, pctMax: 55.93, taux: 59.58 },
        { pctMin: 55.94, pctMax: 56.95, taux: 60.66 },
        { pctMin: 56.96, pctMax: 57.97, taux: 61.75 },
        { pctMin: 57.98, pctMax: 58.98, taux: 62.83 },
        { pctMin: 58.99, pctMax: 60.00, taux: 63.92 },
        { pctMin: 60.01, pctMax: Infinity, taux: 65.00 },
      ],
    },
  },

  // ── Jura (JU) ──────────────────────────────────────────────────────────────
  // Sources : communiqué SIC jura.ch 2025 + ecasjura.ch RPI 2026
  // (A) Subside partiel ordinaire — barème gradué adulte 15–225 CHF/mois (non publié)
  // (B) Subside intégral PC AVS/AI : adulte 568.30 / JA 391.80 / enfant 125.00 (non simulé ici)
  JU: {
    nom: 'Jura',
    seuilRevenu: '≤ 27 000 CHF/an', seuilNum: 27000,
    montantMaxNum: 225, montantMax: '≤ 225 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.ecasjura.ch/fr/Assurances/Assurance-maladie',
    primeMoyenne: 633,
    ju: {
      adulteMax:  225,   // CHF/mois — maximum du barème gradué (barème complet non publié)
      enfant:     100,   // CHF/mois — montant fixe 2026
      jeune:      196,   // CHF/mois — JA formation < 25 ans, montant fixe 2026
      seuilsEligibilite: [
        { statut: 'seul',   nbEnfants: 0, revenuMax: 26_999 },
        { statut: 'seul',   nbEnfants: 1, revenuMax: 52_999 },
        { statut: 'seul',   nbEnfants: 2, revenuMax: 52_999 },
        { statut: 'seul',   nbEnfants: 3, revenuMax: 52_999 },
        { statut: 'couple', nbEnfants: 0, revenuMax: 40_000 },
        { statut: 'couple', nbEnfants: 1, revenuMax: 52_999 },
        { statut: 'couple', nbEnfants: 2, revenuMax: 52_999 },
        { statut: 'couple', nbEnfants: 3, revenuMax: 52_999 },
      ],
    },
  },

  // ── Valais (VS) ────────────────────────────────────────────────────────────
  // Source : Echelle RIP 2026 — Service AVS Valais
  // Modèle : taux × prime de référence, par profil de ménage et tranche de revenu
  // Prime de référence = moyenne régions I et II
  VS: {
    nom: 'Valais',
    seuilRevenu: '≈ 38 500 CHF/an', seuilNum: 38500,
    montantMaxNum: 521, montantMax: '≤ 521 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.avsvalais.ch/fr/Assurances/RIP-Reduction-individuelle-des-primes-d-assurance-maladie',
    primeMoyenne: 528,
    vs: {
      primeReference: { adulte: 521, jeune: 380, enfant: 122 },
      taux: [
        // Personne seule sans enfant
        { profil: 'seul_0e',   taux: 100, revenuMaxAn:  21_000 },
        { profil: 'seul_0e',   taux:  70, revenuMaxAn:  23_917 },
        { profil: 'seul_0e',   taux:  50, revenuMaxAn:  26_833 },
        { profil: 'seul_0e',   taux:  40, revenuMaxAn:  29_750 },
        { profil: 'seul_0e',   taux:  30, revenuMaxAn:  32_667 },
        { profil: 'seul_0e',   taux:  20, revenuMaxAn:  35_583 },
        { profil: 'seul_0e',   taux:  10, revenuMaxAn:  38_500 },
        // Personne seule avec 1+ enfant
        { profil: 'seul_1e+',  taux: 100, revenuMaxAn:  38_250 },
        { profil: 'seul_1e+',  taux:  70, revenuMaxAn:  41_896 },
        { profil: 'seul_1e+',  taux:  50, revenuMaxAn:  45_542 },
        { profil: 'seul_1e+',  taux:  40, revenuMaxAn:  49_188 },
        { profil: 'seul_1e+',  taux:  30, revenuMaxAn:  52_833 },
        { profil: 'seul_1e+',  taux:  20, revenuMaxAn:  56_479 },
        { profil: 'seul_1e+',  taux:  10, revenuMaxAn:  60_125 },
        // Couple sans enfant
        { profil: 'couple_0e', taux: 100, revenuMaxAn:  36_750 },
        { profil: 'couple_0e', taux:  70, revenuMaxAn:  41_854 },
        { profil: 'couple_0e', taux:  50, revenuMaxAn:  46_958 },
        { profil: 'couple_0e', taux:  40, revenuMaxAn:  52_063 },
        { profil: 'couple_0e', taux:  30, revenuMaxAn:  57_167 },
        { profil: 'couple_0e', taux:  20, revenuMaxAn:  62_271 },
        { profil: 'couple_0e', taux:  10, revenuMaxAn:  67_375 },
        // Couple avec 1 enfant
        { profil: 'couple_1e', taux: 100, revenuMaxAn:  48_750 },
        { profil: 'couple_1e', taux:  70, revenuMaxAn:  53_854 },
        { profil: 'couple_1e', taux:  50, revenuMaxAn:  58_958 },
        { profil: 'couple_1e', taux:  40, revenuMaxAn:  64_063 },
        { profil: 'couple_1e', taux:  30, revenuMaxAn:  69_167 },
        { profil: 'couple_1e', taux:  20, revenuMaxAn:  74_271 },
        { profil: 'couple_1e', taux:  10, revenuMaxAn:  79_375 },
        // Couple avec 2 enfants
        { profil: 'couple_2e', taux: 100, revenuMaxAn:  58_750 },
        { profil: 'couple_2e', taux:  70, revenuMaxAn:  63_854 },
        { profil: 'couple_2e', taux:  50, revenuMaxAn:  68_958 },
        { profil: 'couple_2e', taux:  40, revenuMaxAn:  74_063 },
        { profil: 'couple_2e', taux:  30, revenuMaxAn:  79_167 },
        { profil: 'couple_2e', taux:  20, revenuMaxAn:  84_271 },
        { profil: 'couple_2e', taux:  10, revenuMaxAn:  89_375 },
        // Couple avec 3 enfants
        { profil: 'couple_3e', taux: 100, revenuMaxAn:  66_750 },
        { profil: 'couple_3e', taux:  70, revenuMaxAn:  71_854 },
        { profil: 'couple_3e', taux:  50, revenuMaxAn:  76_958 },
        { profil: 'couple_3e', taux:  40, revenuMaxAn:  82_063 },
        { profil: 'couple_3e', taux:  30, revenuMaxAn:  87_167 },
        { profil: 'couple_3e', taux:  20, revenuMaxAn:  92_271 },
        { profil: 'couple_3e', taux:  10, revenuMaxAn:  97_375 },
        // Couple avec 4+ enfants
        { profil: 'couple_4e+', taux: 100, revenuMaxAn:  72_750 },
        { profil: 'couple_4e+', taux:  70, revenuMaxAn:  77_854 },
        { profil: 'couple_4e+', taux:  50, revenuMaxAn:  82_958 },
        { profil: 'couple_4e+', taux:  40, revenuMaxAn:  88_063 },
        { profil: 'couple_4e+', taux:  30, revenuMaxAn:  93_167 },
        { profil: 'couple_4e+', taux:  20, revenuMaxAn:  98_271 },
        { profil: 'couple_4e+', taux:  10, revenuMaxAn: 103_375 },
      ],
      // Revenu max annuel pour le subside enfant (80 % × prime de référence enfant)
      enfantMaxRevenu: [
        { statut: 'seul',   nbEnfants: 1, revenuMax:  63_000 },
        { statut: 'seul',   nbEnfants: 2, revenuMax:  73_000 },
        { statut: 'seul',   nbEnfants: 3, revenuMax:  81_000 },
        { statut: 'seul',   nbEnfants: 4, revenuMax:  87_000 },
        { statut: 'couple', nbEnfants: 1, revenuMax: 116_000 },
        { statut: 'couple', nbEnfants: 2, revenuMax: 116_000 },
        { statut: 'couple', nbEnfants: 3, revenuMax: 116_000 },
        { statut: 'couple', nbEnfants: 4, revenuMax: 116_000 },
      ],
    },
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCantonSubside(code: string): CantonSubside2026 | undefined {
  return SUBSIDES_2026[code as CantonCode]
}

export const ALL_CANTON_CODES = Object.keys(SUBSIDES_2026) as CantonCode[]
