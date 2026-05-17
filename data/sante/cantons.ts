export interface TopCaisse {
  name: string
  prime: number
}

export interface FranchiseRow {
  franchise: number
  primeMois: number
  primeAn: number
  cout0: number
  cout3000: number
  cout8000: number
}

export interface RegionPrime {
  id: string
  label: string
  prime: number
}

export interface SubsideProfilRow {
  profil: string
  subsideMax: string   // ex. "486 CHF/mois" ou "—"
  revenuMax: string    // ex. "56 000 CHF/an" ou "—"
}

export interface SubsideInfo {
  seuilRevenu: string
  subsideMensuel: string
  subsideMensuelMax?: number   // CHF/mois max pour un adulte seul
  automatique: boolean
  delai?: string
  lienOfficiel: string
  bareme?: Array<{ revenu: string; montant: string }>
  tableauProfils?: SubsideProfilRow[]
}

export interface CapitaleData {
  name: string                 // nom de la ville
  regionId: string             // ex. "VD1"
  cheapest: TopCaisse
  mostExpensive: TopCaisse
}

export interface Canton {
  slug: string
  name: string
  cantonDe: string
  demonym: string              // ex. "vaudois", "genevois"
  villePrincipale: string      // ex. "Lausanne", "Genève"
  rang: number                 // rang parmi 26 cantons (1 = le moins cher)
  primeMoyenne: number         // adulte · f=300 · standard · sans accident · moyenne canton
  primeMoyenneJA: number       // jeune adulte 19-25 ans · même profil
  primeMoyenneEnfant: number   // enfant 0-18 ans · f=300 · standard
  economieMois: number         // écart max−min intra-canton en CHF/mois
  economieAn: number           // idem × 12
  subsidesPct: string
  nbRegions: number
  breakEvenFranchise: number  // seuil d'équilibre F300 vs F2500 — avg régions, adulte 35 ans, BASE, sans LAA
  topCaisses: TopCaisse[]      // top 5 caisses les moins chères (avg canton)
  caissePlusChere: TopCaisse
  caisseRef: string            // caisse utilisée pour le tableau des franchises
  regions: RegionPrime[]
  franchiseTable: FranchiseRow[]
  caisseJA?: { name: string; prime: number }
  modelesAlternatifs?: Array<{ modele: string; caisse: string; prime: number }>
  subside: SubsideInfo
  capitale?: CapitaleData      // données spécifiques à la ville principale
}

const cantons: Canton[] = [
  /* ─── VAUD ─────────────────────────────────────────────── */
  {
    slug: 'vaud',
    name: 'Vaud',
    cantonDe: 'canton de Vaud',
    demonym: 'vaudois',
    villePrincipale: 'Lausanne',
    rang: 22,
    primeMoyenne: 543,
    primeMoyenneJA: 472,
    primeMoyenneEnfant: 137,
    economieMois: 352,
    economieAn: 4220,
    subsidesPct: '28%',
    nbRegions: 2,
    breakEvenFranchise: 1900,
    topCaisses: [
      { name: 'Galenos',       prime: 579 },
      { name: 'Atupri',        prime: 594 },
      { name: 'ÖKK',           prime: 595 },
      { name: 'Assura',        prime: 595 },
      { name: 'Aquilana',      prime: 611 },
    ],
    caissePlusChere: { name: 'Vita Surselva', prime: 686 },
    caisseRef: 'Galenos',
    regions: [
      { id: 'VD1', label: 'Zone Lausanne – Vevey (VD1)', prime: 650.79 },
      { id: 'VD2', label: 'Zone Nyon – Morges (VD2)',    prime: 610.85 },
    ],
    franchiseTable: [
      { franchise: 300,  primeMois: 578.75, primeAn: 6945, cout0: 6945, cout3000: 7515, cout8000: 7945 },
      { franchise: 500,  primeMois: 567.85, primeAn: 6814, cout0: 6814, cout3000: 7564, cout8000: 8014 },
      { franchise: 1000, primeMois: 540.60, primeAn: 6487, cout0: 6487, cout3000: 7687, cout8000: 8187 },
      { franchise: 1500, primeMois: 513.30, primeAn: 6160, cout0: 6160, cout3000: 7810, cout8000: 8310 },
      { franchise: 2000, primeMois: 486.10, primeAn: 5833, cout0: 5833, cout3000: 7933, cout8000: 8433 },
      { franchise: 2500, primeMois: 458.80, primeAn: 5506, cout0: 5506, cout3000: 8056, cout8000: 8556 },
    ],
    caisseJA: { name: 'Sanitas', prime: 392.9 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Galenos', prime: 578.75 },
      { modele: 'Médecin de famille', caisse: 'ÖKK', prime: 534.8 },
      { modele: 'HMO', caisse: 'Atupri', prime: 521.9 },
      { modele: 'Télémédecine', caisse: 'Vivao Sympany', prime: 526.9 },
    ],
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'de 20 à 331 CHF/mois',
      subsideMensuelMax: 331,
      automatique: false,
      delai: 'Pas de délai annuel fixe (droit dès le 2e mois suivant le dépôt)',
      lienOfficiel: 'https://www.vd.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',          subsideMax: '331 CHF/mois', revenuMax: '50 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',         subsideMax: '331 CHF/mois', revenuMax: '50 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                subsideMax: '255 CHF/mois', revenuMax: '39 000 CHF/an' },
      ],
    },
    capitale: {
      name: 'Lausanne',
      regionId: 'VD1',
      cheapest:      { name: 'Galenos',       prime: 591 },
      mostExpensive: { name: 'Vita Surselva', prime: 701 },
    },
  },

  /* ─── GENÈVE ────────────────────────────────────────────── */
  {
    slug: 'geneve',
    name: 'Genève',
    cantonDe: 'canton de Genève',
    demonym: 'genevois',
    villePrincipale: 'Genève',
    rang: 26,
    primeMoyenne: 596,
    primeMoyenneJA: 540,
    primeMoyenneEnfant: 158,
    economieMois: 471,
    economieAn: 5653,
    subsidesPct: '31%',
    nbRegions: 1,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'Assura',        prime: 634 },
      { name: 'Vivao Sympany', prime: 646 },
      { name: 'ÖKK',           prime: 655 },
      { name: 'Atupri',        prime: 658 },
      { name: 'EGK',           prime: 661 },
    ],
    caissePlusChere: { name: 'Agrisano', prime: 863 },
    caisseRef: 'Assura',
    regions: [
      { id: 'GE0', label: 'Genève', prime: 710.41 },
    ],
    franchiseTable: [
      { franchise: 300,  primeMois: 633.55, primeAn: 7603, cout0: 7603, cout3000: 8173, cout8000: 8603 },
      { franchise: 500,  primeMois: 622.75, primeAn: 7473, cout0: 7473, cout3000: 8223, cout8000: 8673 },
      { franchise: 1000, primeMois: 595.55, primeAn: 7147, cout0: 7147, cout3000: 8347, cout8000: 8847 },
      { franchise: 1500, primeMois: 568.45, primeAn: 6821, cout0: 6821, cout3000: 8471, cout8000: 8971 },
      { franchise: 2000, primeMois: 541.35, primeAn: 6496, cout0: 6496, cout3000: 8596, cout8000: 9096 },
      { franchise: 2500, primeMois: 514.25, primeAn: 6171, cout0: 6171, cout3000: 8721, cout8000: 9221 },
    ],
    caisseJA: { name: 'Sanitas', prime: 430.75 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Assura', prime: 633.55 },
      { modele: 'Médecin de famille', caisse: 'Vivao Sympany', prime: 577.55 },
      { modele: 'HMO', caisse: 'Vivao Sympany', prime: 567.75 },
      { modele: 'Télémédecine', caisse: 'Assura', prime: 561.45 },
    ],
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'de 55 à 348 CHF/mois',
      subsideMensuelMax: 348,
      automatique: true,
      delai: '—',
      lienOfficiel: 'https://www.ge.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',  subsideMax: '348 CHF/mois', revenuMax: '50 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)', subsideMax: '231 CHF/mois', revenuMax: '50 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',        subsideMax: '132 CHF/mois', revenuMax: '50 000 CHF/an' },
      ],
    },
  },

  /* ─── FRIBOURG ──────────────────────────────────────────── */
  {
    slug: 'fribourg',
    name: 'Fribourg',
    cantonDe: 'canton de Fribourg',
    demonym: 'fribourgeois',
    villePrincipale: 'Fribourg',
    rang: 13,
    primeMoyenne: 437,
    primeMoyenneJA: 395,
    primeMoyenneEnfant: 108,
    economieMois: 303,
    economieAn: 3632,
    subsidesPct: '24%',
    nbRegions: 2,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'ÖKK',      prime: 489 },
      { name: 'Aquilana', prime: 490 },
      { name: 'SLKK',     prime: 491 },
      { name: 'Agrisano', prime: 492 },
      { name: 'Visana',   prime: 493 },
    ],
    caissePlusChere: { name: 'Vita Surselva', prime: 580 },
    caisseRef: 'ÖKK',
    regions: [
      { id: 'FR1', label: 'Fribourg zone 1 (FR1)', prime: 522.27 },
      { id: 'FR2', label: 'Fribourg zone 2 (FR2)', prime: 522.27 },
    ],
    franchiseTable: [
      { franchise: 300,  primeMois: 488.75, primeAn: 5865, cout0: 5865, cout3000: 6435, cout8000: 6865 },
      { franchise: 500,  primeMois: 477.95, primeAn: 5735, cout0: 5735, cout3000: 6485, cout8000: 6935 },
      { franchise: 1000, primeMois: 450.75, primeAn: 5409, cout0: 5409, cout3000: 6609, cout8000: 7109 },
      { franchise: 1500, primeMois: 423.65, primeAn: 5084, cout0: 5084, cout3000: 6734, cout8000: 7234 },
      { franchise: 2000, primeMois: 396.55, primeAn: 4759, cout0: 4759, cout3000: 6859, cout8000: 7359 },
      { franchise: 2500, primeMois: 369.45, primeAn: 4433, cout0: 4433, cout3000: 6983, cout8000: 7483 },
    ],
    caisseJA: { name: 'EGK', prime: 351.75 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'ÖKK', prime: 488.75 },
      { modele: 'Médecin de famille', caisse: 'Visana', prime: 433.15 },
      { modele: 'HMO', caisse: 'Visana', prime: 429.65 },
      { modele: 'Télémédecine', caisse: 'Aquilana', prime: 425.85 },
    ],
    subside: {
      seuilRevenu: '≈ 37 000 CHF/an (seul)',
      subsideMensuel: 'Barème non publié (60 paliers)',
      subsideMensuelMax: 370,
      automatique: true,
      delai: '31 août 2026',
      lienOfficiel: 'https://www.ecasfr.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',          subsideMax: '370 CHF/mois', revenuMax: '37 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans, formation)', subsideMax: '270 CHF/mois', revenuMax: '37 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                subsideMax: '109 CHF/mois', revenuMax: '57 000 CHF/an' },
      ],
    },
  },

  /* ─── VALAIS ────────────────────────────────────────────── */
  {
    slug: 'valais',
    name: 'Valais',
    cantonDe: 'canton du Valais',
    demonym: 'valaisans',
    villePrincipale: 'Sion',
    rang: 14,
    primeMoyenne: 444,
    primeMoyenneJA: 387,
    primeMoyenneEnfant: 103,
    economieMois: 321,
    economieAn: 3846,
    subsidesPct: '26%',
    nbRegions: 2,
    breakEvenFranchise: 1812,
    topCaisses: [
      { name: 'Visperterminen', prime: 433 },
      { name: 'SLKK',           prime: 453 },
      { name: 'ÖKK',            prime: 476 },
      { name: 'Sodalis',        prime: 481 },
      { name: 'Agrisano',       prime: 482 },
    ],
    caissePlusChere: { name: 'Visana', prime: 575 },
    caisseRef: 'Visperterminen',
    regions: [
      { id: 'VS1', label: 'Haut-Valais (VS1)', prime: 541.97 },
      { id: 'VS2', label: 'Bas-Valais (VS2)',  prime: 488.16 },
    ],
    franchiseTable: [
      { franchise: 300,  primeMois: 432.80, primeAn: 5194, cout0: 5194, cout3000: 5764, cout8000: 6194 },
      { franchise: 500,  primeMois: 421.85, primeAn: 5062, cout0: 5062, cout3000: 5812, cout8000: 6262 },
      { franchise: 1000, primeMois: 396.80, primeAn: 4762, cout0: 4762, cout3000: 5962, cout8000: 6462 },
      { franchise: 1500, primeMois: 367.95, primeAn: 4415, cout0: 4415, cout3000: 6065, cout8000: 6565 },
      { franchise: 2000, primeMois: 344.75, primeAn: 4137, cout0: 4137, cout3000: 6237, cout8000: 6737 },
      { franchise: 2500, primeMois: 325.05, primeAn: 3901, cout0: 3901, cout3000: 6451, cout8000: 6951 },
    ],
    caisseJA: { name: 'Visperterminen', prime: 321.0 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Visperterminen', prime: 432.8 },
      { modele: 'Médecin de famille', caisse: 'Visperterminen', prime: 399.95 },
      { modele: 'HMO', caisse: 'Agrisano', prime: 407.75 },
      { modele: 'Télémédecine', caisse: 'Visperterminen', prime: 384.6 },
    ],
    subside: {
      seuilRevenu: '≈ 38 500 CHF/an (seul)',
      subsideMensuel: 'de 52 à 521 CHF/mois',
      subsideMensuelMax: 521,
      automatique: true,
      delai: '—',
      lienOfficiel: 'https://www.avsvalais.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',  subsideMax: '521 CHF/mois', revenuMax: '38 500 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)', subsideMax: '380 CHF/mois', revenuMax: '38 500 CHF/an' },
        { profil: 'Enfant (0–18 ans)',        subsideMax: '98 CHF/mois',  revenuMax: '63 000 CHF/an' },
      ],
    },
  },

  /* ─── NEUCHÂTEL ─────────────────────────────────────────── */
  {
    slug: 'neuchatel',
    name: 'Neuchâtel',
    cantonDe: 'canton de Neuchâtel',
    demonym: 'neuchâtelois',
    villePrincipale: 'Neuchâtel',
    rang: 23,
    primeMoyenne: 563,
    primeMoyenneJA: 499,
    primeMoyenneEnfant: 137,
    economieMois: 391,
    economieAn: 4686,
    subsidesPct: '29%',
    nbRegions: 1,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'Helsana', prime: 610 },
      { name: 'Atupri',  prime: 618 },
      { name: 'Assura',  prime: 621 },
      { name: 'ÖKK',     prime: 623 },
      { name: 'Swica',   prime: 633 },
    ],
    caissePlusChere: { name: 'Vita Surselva', prime: 755 },
    caisseRef: 'Helsana',
    regions: [
      { id: 'NE0', label: 'Neuchâtel', prime: 663.19 },
    ],
    franchiseTable: [
      { franchise: 300,  primeMois: 609.65, primeAn: 7316, cout0: 7316, cout3000: 7886, cout8000: 8316 },
      { franchise: 500,  primeMois: 598.85, primeAn: 7186, cout0: 7186, cout3000: 7936, cout8000: 8386 },
      { franchise: 1000, primeMois: 571.65, primeAn: 6860, cout0: 6860, cout3000: 8060, cout8000: 8560 },
      { franchise: 1500, primeMois: 544.55, primeAn: 6535, cout0: 6535, cout3000: 8185, cout8000: 8685 },
      { franchise: 2000, primeMois: 517.45, primeAn: 6209, cout0: 6209, cout3000: 8309, cout8000: 8809 },
      { franchise: 2500, primeMois: 490.35, primeAn: 5884, cout0: 5884, cout3000: 8434, cout8000: 8934 },
    ],
    caisseJA: { name: 'Sanitas', prime: 397.55 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Helsana', prime: 609.65 },
      { modele: 'Médecin de famille', caisse: 'Assura', prime: 553.15 },
      { modele: 'HMO', caisse: 'Swica', prime: 517.75 },
      { modele: 'Télémédecine', caisse: 'Aquilana', prime: 550.15 },
    ],
    subside: {
      seuilRevenu: '≈ 65 000 CHF/an (seul)',
      subsideMensuel: 'de 166 à 643 CHF/mois',
      subsideMensuelMax: 643,
      automatique: true,
      delai: '—',
      lienOfficiel: 'https://www.ne.ch',
      tableauProfils: [
        { profil: 'Adulte (≥ 26 ans)',        subsideMax: '643 CHF/mois', revenuMax: '65 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)', subsideMax: '484 CHF/mois', revenuMax: '65 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '160 CHF/mois', revenuMax: '65 000 CHF/an' },
      ],
    },
  },

  /* ─── JURA ──────────────────────────────────────────────── */
  {
    slug: 'jura',
    name: 'Jura',
    cantonDe: 'canton du Jura',
    demonym: 'jurassiens',
    villePrincipale: 'Delémont',
    rang: 21,
    primeMoyenne: 541,
    primeMoyenneJA: 476,
    primeMoyenneEnfant: 130,
    economieMois: 359,
    economieAn: 4308,
    subsidesPct: '22%',
    nbRegions: 1,
    breakEvenFranchise: 1925,
    topCaisses: [
      { name: 'Atupri',   prime: 592 },
      { name: 'Agrisano', prime: 595 },
      { name: 'ÖKK',      prime: 599 },
      { name: 'Assura',   prime: 603 },
      { name: 'Sanitas',  prime: 605 },
    ],
    caissePlusChere: { name: 'Galenos', prime: 707 },
    caisseRef: 'Atupri',
    regions: [
      { id: 'JU0', label: 'Jura', prime: 633.21 },
    ],
    franchiseTable: [
      { franchise: 300,  primeMois: 591.65, primeAn: 7100, cout0: 7100, cout3000: 7670, cout8000: 8100 },
      { franchise: 500,  primeMois: 580.65, primeAn: 6968, cout0: 6968, cout3000: 7718, cout8000: 8168 },
      { franchise: 1000, primeMois: 552.85, primeAn: 6634, cout0: 6634, cout3000: 7834, cout8000: 8334 },
      { franchise: 1500, primeMois: 525.15, primeAn: 6302, cout0: 6302, cout3000: 7952, cout8000: 8452 },
      { franchise: 2000, primeMois: 497.45, primeAn: 5969, cout0: 5969, cout3000: 8069, cout8000: 8569 },
      { franchise: 2500, primeMois: 469.75, primeAn: 5637, cout0: 5637, cout3000: 8187, cout8000: 8687 },
    ],
    caisseJA: { name: 'Sanitas', prime: 391.15 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Atupri', prime: 591.65 },
      { modele: 'Médecin de famille', caisse: 'Vivao Sympany', prime: 540.45 },
      { modele: 'HMO', caisse: 'Vivao Sympany', prime: 528.15 },
      { modele: 'Télémédecine', caisse: 'Assura', prime: 523.75 },
    ],
    subside: {
      seuilRevenu: '≈ 27 000 CHF/an (seul)',
      subsideMensuel: "jusqu'à 225 CHF/mois",
      subsideMensuelMax: 225,
      automatique: false,
      delai: '31 déc. 2026',
      lienOfficiel: 'https://www.ecasjura.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',             subsideMax: '225 CHF/mois', revenuMax: '27 000 CHF/an' },
        { profil: 'Jeune adulte (< 25 ans, formation)', subsideMax: '196 CHF/mois', revenuMax: '53 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                  subsideMax: '100 CHF/mois', revenuMax: '53 000 CHF/an' },
      ],
    },
  },

  /* ─── ZG — ZOUG ──────────────────────────────────── */
  {
    slug: 'zoug',
    name: 'Zoug',
    cantonDe: 'canton de Zoug',
    demonym: 'zougois',
    villePrincipale: 'Zoug',
    rang: 1,
    primeMoyenne: 319,
    primeMoyenneJA: 302,
    primeMoyenneEnfant: 79,
    economieMois: 340,
    economieAn: 4081,
    subsidesPct: '16%',
    nbRegions: 1,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'Vivao Sympany', prime: 359 },
      { name: 'Concordia', prime: 359 },
      { name: 'SLKK', prime: 361 },
      { name: 'Agrisano', prime: 365 },
      { name: 'KPT', prime: 368 },
    ],
    caissePlusChere: { name: 'Vita Surselva', prime: 512 },
    caisseRef: 'Vivao Sympany',
    regions: [
      { id: 'ZG0', label: 'Zoug (ZG0)', prime: 403.06 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 359.45 , primeAn: 4313, cout0: 4313, cout3000: 4883, cout8000: 5313 },
      { franchise: 500 , primeMois: 348.65 , primeAn: 4184, cout0: 4184, cout3000: 4934, cout8000: 5384 },
      { franchise: 1000, primeMois: 321.55 , primeAn: 3859, cout0: 3859, cout3000: 5059, cout8000: 5559 },
      { franchise: 1500, primeMois: 294.35 , primeAn: 3532, cout0: 3532, cout3000: 5182, cout8000: 5682 },
      { franchise: 2000, primeMois: 267.25 , primeAn: 3207, cout0: 3207, cout3000: 5307, cout8000: 5807 },
      { franchise: 2500, primeMois: 240.15 , primeAn: 2882, cout0: 2882, cout3000: 5432, cout8000: 5932 },
    ],
    caisseJA: { name: 'Vivao Sympany', prime: 261.05 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Vivao Sympany', prime: 359.45 },
      { modele: 'Médecin de famille', caisse: 'Vivao Sympany', prime: 321.25 },
      { modele: 'HMO', caisse: 'Concordia', prime: 312.15 },
      { modele: 'Télémédecine', caisse: 'Vivao Sympany', prime: 319.35 },
    ],
    subside: {
      seuilRevenu: '≤ 89 900 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 415,
      automatique: false,
      lienOfficiel: 'https://www.akzug.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '415 CHF/mois', revenuMax: '89 900 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '289 CHF/mois', revenuMax: '43 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '102 CHF/mois', revenuMax: '75 000 CHF/an' },
      ],
    },
  },

  /* ─── AI — APPENZELL RHODES-INTÉRIEURES ──────────── */
  {
    slug: 'appenzell-rhodes-interieures',
    name: 'Appenzell Rhodes-Intérieures',
    cantonDe: "canton d'Appenzell Rhodes-Intérieures",
    demonym: 'appenzellois',
    villePrincipale: 'Appenzell',
    rang: 2,
    primeMoyenne: 344,
    primeMoyenneJA: 318,
    primeMoyenneEnfant: 83,
    economieMois: 327,
    economieAn: 3925,
    subsidesPct: '18%',
    nbRegions: 1,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'Assura', prime: 383 },
      { name: 'Vivao Sympany', prime: 385 },
      { name: 'Agrisano', prime: 385 },
      { name: 'ÖKK', prime: 387 },
      { name: 'KPT', prime: 389 },
    ],
    caissePlusChere: { name: 'Avenir', prime: 500 },
    caisseRef: 'Assura',
    regions: [
      { id: 'AI0', label: 'Rhodes-Intérieures (AI0)', prime: 424.35 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 383.25 , primeAn: 4599, cout0: 4599, cout3000: 5169, cout8000: 5599 },
      { franchise: 500 , primeMois: 372.45 , primeAn: 4469, cout0: 4469, cout3000: 5219, cout8000: 5669 },
      { franchise: 1000, primeMois: 345.35 , primeAn: 4144, cout0: 4144, cout3000: 5344, cout8000: 5844 },
      { franchise: 1500, primeMois: 318.15 , primeAn: 3818, cout0: 3818, cout3000: 5468, cout8000: 5968 },
      { franchise: 2000, primeMois: 291.15 , primeAn: 3494, cout0: 3494, cout3000: 5594, cout8000: 6094 },
      { franchise: 2500, primeMois: 263.95 , primeAn: 3167, cout0: 3167, cout3000: 5717, cout8000: 6217 },
    ],
    caisseJA: { name: 'CSS', prime: 261.85 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Assura', prime: 383.25 },
      { modele: 'Médecin de famille', caisse: 'ÖKK', prime: 348.15 },
      { modele: 'HMO', caisse: 'Vivao Sympany', prime: 330.05 },
      { modele: 'Télémédecine', caisse: 'Vivao Sympany', prime: 337.85 },
    ],
    subside: {
      seuilRevenu: '≈ 55 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 387,
      automatique: true,
      lienOfficiel: 'https://www.ai.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '387 CHF/mois', revenuMax: '55 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '287 CHF/mois', revenuMax: '33 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '86 CHF/mois',  revenuMax: '75 000 CHF/an' },
      ],
    },
  },

  /* ─── NW — NIDWALD ───────────────────────────────── */
  {
    slug: 'nidwald',
    name: 'Nidwald',
    cantonDe: 'canton de Nidwald',
    demonym: 'nidwaldiens',
    villePrincipale: 'Stans',
    rang: 3,
    primeMoyenne: 381,
    primeMoyenneJA: 344,
    primeMoyenneEnfant: 92,
    economieMois: 320,
    economieAn: 3838,
    subsidesPct: '18%',
    nbRegions: 1,
    breakEvenFranchise: 1925,
    topCaisses: [
      { name: 'Agrisano', prime: 421 },
      { name: 'Vivao Sympany', prime: 426 },
      { name: 'Assura', prime: 433 },
      { name: 'EGK', prime: 436 },
      { name: 'Atupri', prime: 437 },
    ],
    caissePlusChere: { name: 'Mutuel', prime: 535 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'NW0', label: 'Nidwald (NW0)', prime: 459.98 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 420.55 , primeAn: 5047, cout0: 5047, cout3000: 5617, cout8000: 6047 },
      { franchise: 500 , primeMois: 409.45 , primeAn: 4913, cout0: 4913, cout3000: 5663, cout8000: 6113 },
      { franchise: 1000, primeMois: 381.75 , primeAn: 4581, cout0: 4581, cout3000: 5781, cout8000: 6281 },
      { franchise: 1500, primeMois: 354.05 , primeAn: 4249, cout0: 4249, cout3000: 5899, cout8000: 6399 },
      { franchise: 2000, primeMois: 326.35 , primeAn: 3916, cout0: 3916, cout3000: 6016, cout8000: 6516 },
      { franchise: 2500, primeMois: 298.65 , primeAn: 3584, cout0: 3584, cout3000: 6134, cout8000: 6634 },
    ],
    caisseJA: { name: 'Sanitas', prime: 291.55 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 420.55 },
      { modele: 'Médecin de famille', caisse: 'Vivao Sympany', prime: 387.65 },
      { modele: 'HMO', caisse: 'Vivao Sympany', prime: 376.85 },
      { modele: 'Télémédecine', caisse: 'Vivao Sympany', prime: 376.85 },
    ],
    subside: {
      seuilRevenu: '≈ 54 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 450,
      automatique: false,
      lienOfficiel: 'https://www.aknw.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '450 CHF/mois', revenuMax: '54 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '326 CHF/mois', revenuMax: '39 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '105 CHF/mois', revenuMax: '100 000 CHF/an' },
      ],
    },
  },

  /* ─── UR — URI ───────────────────────────────────── */
  {
    slug: 'uri',
    name: 'Uri',
    cantonDe: "canton d'Uri",
    demonym: 'uranais',
    villePrincipale: 'Altdorf',
    rang: 4,
    primeMoyenne: 384,
    primeMoyenneJA: 347,
    primeMoyenneEnfant: 92,
    economieMois: 428,
    economieAn: 5140,
    subsidesPct: '18%',
    nbRegions: 1,
    breakEvenFranchise: 1925,
    topCaisses: [
      { name: 'Agrisano', prime: 411 },
      { name: 'Vivao Sympany', prime: 416 },
      { name: 'Atupri', prime: 426 },
      { name: 'Sumiswalder', prime: 427 },
      { name: 'Sanitas', prime: 427 },
    ],
    caissePlusChere: { name: 'Sana24', prime: 632 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'UR0', label: 'Uri (UR0)', prime: 463.33 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 410.85 , primeAn: 4930, cout0: 4930, cout3000: 5500, cout8000: 5930 },
      { franchise: 500 , primeMois: 399.75 , primeAn: 4797, cout0: 4797, cout3000: 5547, cout8000: 5997 },
      { franchise: 1000, primeMois: 372.05 , primeAn: 4465, cout0: 4465, cout3000: 5665, cout8000: 6165 },
      { franchise: 1500, primeMois: 344.35 , primeAn: 4132, cout0: 4132, cout3000: 5782, cout8000: 6282 },
      { franchise: 2000, primeMois: 316.65 , primeAn: 3800, cout0: 3800, cout3000: 5900, cout8000: 6400 },
      { franchise: 2500, primeMois: 288.95 , primeAn: 3467, cout0: 3467, cout3000: 6017, cout8000: 6517 },
    ],
    caisseJA: { name: 'CSS', prime: 289.45 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 410.85 },
      { modele: 'Médecin de famille', caisse: 'Vivao Sympany', prime: 369.85 },
      { modele: 'HMO', caisse: 'Vivao Sympany', prime: 367.85 },
      { modele: 'Télémédecine', caisse: 'Vivao Sympany', prime: 369.85 },
    ],
    subside: {
      seuilRevenu: '≈ 51 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 364,
      automatique: true,
      lienOfficiel: 'https://www.ur.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',              subsideMax: '364 CHF/mois', revenuMax: '51 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans, formation)', subsideMax: '237 CHF/mois', revenuMax: '33 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                   subsideMax: '92 CHF/mois',  revenuMax: '90 000 CHF/an' },
      ],
    },
  },

  /* ─── OW — OBWALD ────────────────────────────────── */
  {
    slug: 'obwald',
    name: 'Obwald',
    cantonDe: "canton d'Obwald",
    demonym: 'obwaldiens',
    villePrincipale: 'Sarnen',
    rang: 5,
    primeMoyenne: 387,
    primeMoyenneJA: 349,
    primeMoyenneEnfant: 94,
    economieMois: 315,
    economieAn: 3781,
    subsidesPct: '18%',
    nbRegions: 1,
    breakEvenFranchise: 1924,
    topCaisses: [
      { name: 'Agrisano', prime: 418 },
      { name: 'Sumiswalder', prime: 439 },
      { name: 'EGK', prime: 442 },
      { name: 'Sanitas', prime: 442 },
      { name: 'Atupri', prime: 444 },
    ],
    caissePlusChere: { name: 'Avenir', prime: 529 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'OW0', label: 'Obwald (OW0)', prime: 467.13 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 417.65 , primeAn: 5012, cout0: 5012, cout3000: 5582, cout8000: 6012 },
      { franchise: 500 , primeMois: 406.55 , primeAn: 4879, cout0: 4879, cout3000: 5629, cout8000: 6079 },
      { franchise: 1000, primeMois: 378.95 , primeAn: 4547, cout0: 4547, cout3000: 5747, cout8000: 6247 },
      { franchise: 1500, primeMois: 351.15 , primeAn: 4214, cout0: 4214, cout3000: 5864, cout8000: 6364 },
      { franchise: 2000, primeMois: 323.45 , primeAn: 3881, cout0: 3881, cout3000: 5981, cout8000: 6481 },
      { franchise: 2500, primeMois: 295.85 , primeAn: 3550, cout0: 3550, cout3000: 6100, cout8000: 6600 },
    ],
    caisseJA: { name: 'Sanitas', prime: 292.55 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 417.65 },
      { modele: 'Médecin de famille', caisse: 'EGK', prime: 393.15 },
      { modele: 'HMO', caisse: 'Agrisano', prime: 383.85 },
      { modele: 'Télémédecine', caisse: 'Agrisano', prime: 377.55 },
    ],
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 418,
      automatique: false,
      lienOfficiel: 'https://www.akow.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '418 CHF/mois', revenuMax: '50 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '298 CHF/mois', revenuMax: '37 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '115 CHF/mois', revenuMax: '50 000 CHF/an' },
      ],
    },
  },

  /* ─── SZ — SCHWYZ ────────────────────────────────── */
  {
    slug: 'schwyz',
    name: 'Schwyz',
    cantonDe: 'canton de Schwyz',
    demonym: 'schwytzois',
    villePrincipale: 'Schwyz',
    rang: 6,
    primeMoyenne: 409,
    primeMoyenneJA: 358,
    primeMoyenneEnfant: 96,
    economieMois: 310,
    economieAn: 3721,
    subsidesPct: '20%',
    nbRegions: 1,
    breakEvenFranchise: 1907,
    topCaisses: [
      { name: 'Einsiedeln', prime: 408 },
      { name: 'Agrisano', prime: 437 },
      { name: 'Sumiswalder', prime: 457 },
      { name: 'Wädenswil', prime: 458 },
      { name: 'ÖKK', prime: 462 },
    ],
    caissePlusChere: { name: 'Visana', prime: 542 },
    caisseRef: 'Einsiedeln',
    regions: [
      { id: 'SZ0', label: 'Schwyz (SZ0)', prime: 484.88 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 407.75 , primeAn: 4893, cout0: 4893, cout3000: 5463, cout8000: 5893 },
      { franchise: 500 , primeMois: 396.95 , primeAn: 4763, cout0: 4763, cout3000: 5513, cout8000: 5963 },
      { franchise: 1000, primeMois: 369.45 , primeAn: 4433, cout0: 4433, cout3000: 5633, cout8000: 6133 },
      { franchise: 1500, primeMois: 342.05 , primeAn: 4105, cout0: 4105, cout3000: 5755, cout8000: 6255 },
      { franchise: 2000, primeMois: 314.65 , primeAn: 3776, cout0: 3776, cout3000: 5876, cout8000: 6376 },
      { franchise: 2500, primeMois: 287.25 , primeAn: 3447, cout0: 3447, cout3000: 5997, cout8000: 6497 },
    ],
    caisseJA: { name: 'Einsiedeln', prime: 304.55 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Einsiedeln', prime: 407.75 },
      { modele: 'HMO', caisse: 'Agrisano', prime: 401.55 },
      { modele: 'Télémédecine', caisse: 'Agrisano', prime: 375.05 },
    ],
    subside: {
      seuilRevenu: '≤ 43 554 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 465,
      automatique: false,
      lienOfficiel: 'https://www.ahv-sz.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '465 CHF/mois', revenuMax: '43 554 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '328 CHF/mois', revenuMax: '36 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '107 CHF/mois', revenuMax: '56 000 CHF/an' },
      ],
    },
  },

  /* ─── SG — SAINT-GALL ────────────────────────────── */
  {
    slug: 'saint-gall',
    name: 'Saint-Gall',
    cantonDe: 'canton de Saint-Gall',
    demonym: 'saint-gallois',
    villePrincipale: 'Saint-Gall',
    rang: 7,
    primeMoyenne: 413,
    primeMoyenneJA: 370,
    primeMoyenneEnfant: 99,
    economieMois: 339,
    economieAn: 4068,
    subsidesPct: '24%',
    nbRegions: 3,
    breakEvenFranchise: 1914,
    topCaisses: [
      { name: 'Agrisano', prime: 455 },
      { name: 'ÖKK', prime: 465 },
      { name: 'Sumiswalder', prime: 470 },
      { name: 'Atupri', prime: 474 },
      { name: 'KPT', prime: 477 },
    ],
    caissePlusChere: { name: 'Philos', prime: 546 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'SG1', label: 'Saint-Gall ville (SG1)', prime: 540.49 },
      { id: 'SG2', label: 'Rapperswil – See-Gaster (SG2)', prime: 503.15 },
      { id: 'SG3', label: 'Rheintal (SG3)', prime: 424.35 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 454.62 , primeAn: 5455, cout0: 5455, cout3000: 6025, cout8000: 6455 },
      { franchise: 500 , primeMois: 443.5  , primeAn: 5322, cout0: 5322, cout3000: 6072, cout8000: 6522 },
      { franchise: 1000, primeMois: 415.82 , primeAn: 4990, cout0: 4990, cout3000: 6190, cout8000: 6690 },
      { franchise: 1500, primeMois: 388.12 , primeAn: 4657, cout0: 4657, cout3000: 6307, cout8000: 6807 },
      { franchise: 2000, primeMois: 360.37 , primeAn: 4324, cout0: 4324, cout3000: 6424, cout8000: 6924 },
      { franchise: 2500, primeMois: 332.72 , primeAn: 3993, cout0: 3993, cout3000: 6543, cout8000: 7043 },
    ],
    caisseJA: { name: 'Sanitas', prime: 314.08 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 449.38 },
      { modele: 'Médecin de famille', caisse: 'ÖKK', prime: 411.18 },
      { modele: 'HMO', caisse: 'ÖKK', prime: 400.62 },
      { modele: 'Télémédecine', caisse: 'Agrisano', prime: 406.15 },
    ],
    subside: {
      seuilRevenu: '≤ 57 350 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 524,
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.svasg.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '524 CHF/mois', revenuMax: '57 350 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '374 CHF/mois', revenuMax: '57 350 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '122 CHF/mois', revenuMax: '65 700 CHF/an' },
      ],
    },
  },

  /* ─── GL — GLARIS ────────────────────────────────── */
  {
    slug: 'glaris',
    name: 'Glaris',
    cantonDe: 'canton de Glaris',
    demonym: 'glaronnais',
    villePrincipale: 'Glaris',
    rang: 9,
    primeMoyenne: 420,
    primeMoyenneJA: 374,
    primeMoyenneEnfant: 100,
    economieMois: 283,
    economieAn: 3395,
    subsidesPct: '20%',
    nbRegions: 1,
    breakEvenFranchise: 1925,
    topCaisses: [
      { name: 'Agrisano', prime: 473 },
      { name: 'Sumiswalder', prime: 474 },
      { name: 'Philos', prime: 478 },
      { name: 'Sanitas', prime: 482 },
      { name: 'Atupri', prime: 483 },
    ],
    caissePlusChere: { name: 'Assura', prime: 534 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'GL0', label: 'Glaris (GL0)', prime: 498.01 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 473.35 , primeAn: 5680, cout0: 5680, cout3000: 6250, cout8000: 6680 },
      { franchise: 500 , primeMois: 462.25 , primeAn: 5547, cout0: 5547, cout3000: 6297, cout8000: 6747 },
      { franchise: 1000, primeMois: 434.65 , primeAn: 5216, cout0: 5216, cout3000: 6416, cout8000: 6916 },
      { franchise: 1500, primeMois: 406.85 , primeAn: 4882, cout0: 4882, cout3000: 6532, cout8000: 7032 },
      { franchise: 2000, primeMois: 379.15 , primeAn: 4550, cout0: 4550, cout3000: 6650, cout8000: 7150 },
      { franchise: 2500, primeMois: 351.45 , primeAn: 4217, cout0: 4217, cout3000: 6767, cout8000: 7267 },
    ],
    caisseJA: { name: 'Sanitas', prime: 316.75 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 473.35 },
      { modele: 'Médecin de famille', caisse: 'Philos', prime: 427.75 },
      { modele: 'HMO', caisse: 'Concordia', prime: 422.45 },
      { modele: 'Télémédecine', caisse: 'Philos', prime: 410.75 },
    ],
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 454,
      automatique: false,
      lienOfficiel: 'https://www.gl.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '454 CHF/mois', revenuMax: '50 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '325 CHF/mois', revenuMax: '39 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '125 CHF/mois', revenuMax: '85 000 CHF/an' },
      ],
    },
  },

  /* ─── LU — LUCERNE ───────────────────────────────── */
  {
    slug: 'lucerne',
    name: 'Lucerne',
    cantonDe: 'canton de Lucerne',
    demonym: 'lucernois',
    villePrincipale: 'Lucerne',
    rang: 8,
    primeMoyenne: 419,
    primeMoyenneJA: 375,
    primeMoyenneEnfant: 100,
    economieMois: 334,
    economieAn: 4002,
    subsidesPct: '24%',
    nbRegions: 3,
    breakEvenFranchise: 1909,
    topCaisses: [
      { name: 'KKLH', prime: 443 },
      { name: 'Sanitas', prime: 472 },
      { name: 'Vivao Sympany', prime: 473 },
      { name: 'Sumiswalder', prime: 476 },
      { name: 'Atupri', prime: 481 },
    ],
    caissePlusChere: { name: 'Mutuel', prime: 568 },
    caisseRef: 'KKLH',
    regions: [
      { id: 'LU1', label: 'Lucerne (LU1)', prime: 525.96 },
      { id: 'LU2', label: 'Sursee (LU2)', prime: 491.31 },
      { id: 'LU3', label: 'Hochdorf (LU3)', prime: 475.96 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 443.47 , primeAn: 5322, cout0: 5322, cout3000: 5892, cout8000: 6322 },
      { franchise: 500 , primeMois: 433.72 , primeAn: 5205, cout0: 5205, cout3000: 5955, cout8000: 6405 },
      { franchise: 1000, primeMois: 405.07 , primeAn: 4861, cout0: 4861, cout3000: 6061, cout8000: 6561 },
      { franchise: 1500, primeMois: 377.67 , primeAn: 4532, cout0: 4532, cout3000: 6182, cout8000: 6682 },
      { franchise: 2000, primeMois: 350.24 , primeAn: 4203, cout0: 4203, cout3000: 6303, cout8000: 6803 },
      { franchise: 2500, primeMois: 322.82 , primeAn: 3874, cout0: 3874, cout3000: 6424, cout8000: 6924 },
    ],
    caisseJA: { name: 'Sanitas', prime: 313.95 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'KKLH', prime: 441.02 },
      { modele: 'Médecin de famille', caisse: 'KKLH', prime: 418.7 },
      { modele: 'HMO', caisse: 'Vivao Sympany', prime: 411.02 },
      { modele: 'Télémédecine', caisse: 'KKLH', prime: 414.23 },
    ],
    subside: {
      seuilRevenu: '≈ 44 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 469,
      automatique: false,
      delai: '31 oct. 2025 (ordinaire) ; arrivants et revenus en baisse –25% : jusqu\'au 31 déc. 2026',
      lienOfficiel: 'https://www.was-luzern.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '469 CHF/mois', revenuMax: '44 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',  subsideMax: '337 CHF/mois', revenuMax: '42 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '109 CHF/mois', revenuMax: '77 000 CHF/an' },
      ],
    },
  },

  /* ─── AR — APPENZELL RHODES-EXTÉRIEURES ──────────── */
  {
    slug: 'appenzell-rhodes-exterieures',
    name: 'Appenzell Rhodes-Extérieures',
    cantonDe: "canton d'Appenzell Rhodes-Extérieures",
    demonym: 'appenzellois',
    villePrincipale: 'Hérisau',
    rang: 11,
    primeMoyenne: 426,
    primeMoyenneJA: 376,
    primeMoyenneEnfant: 100,
    economieMois: 365,
    economieAn: 4385,
    subsidesPct: '20%',
    nbRegions: 1,
    breakEvenFranchise: 1925,
    topCaisses: [
      { name: 'Agrisano', prime: 450 },
      { name: 'ÖKK', prime: 462 },
      { name: 'Rhenusana', prime: 470 },
      { name: 'Sumiswalder', prime: 472 },
      { name: 'Sanitas', prime: 475 },
    ],
    caissePlusChere: { name: 'Atupri', prime: 614 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'AR0', label: 'Rhodes-Extérieures (AR0)', prime: 508.83 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 450.25 , primeAn: 5403, cout0: 5403, cout3000: 5973, cout8000: 6403 },
      { franchise: 500 , primeMois: 439.15 , primeAn: 5270, cout0: 5270, cout3000: 6020, cout8000: 6470 },
      { franchise: 1000, primeMois: 411.55 , primeAn: 4939, cout0: 4939, cout3000: 6139, cout8000: 6639 },
      { franchise: 1500, primeMois: 383.75 , primeAn: 4605, cout0: 4605, cout3000: 6255, cout8000: 6755 },
      { franchise: 2000, primeMois: 356.05 , primeAn: 4273, cout0: 4273, cout3000: 6373, cout8000: 6873 },
      { franchise: 2500, primeMois: 328.35 , primeAn: 3940, cout0: 3940, cout3000: 6490, cout8000: 6990 },
    ],
    caisseJA: { name: 'Sanitas', prime: 317.55 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 450.25 },
      { modele: 'Médecin de famille', caisse: 'ÖKK', prime: 415.05 },
      { modele: 'HMO', caisse: 'ÖKK', prime: 401.15 },
      { modele: 'Télémédecine', caisse: 'Agrisano', prime: 386.55 },
    ],
    subside: {
      seuilRevenu: '≤ 35 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 502,
      automatique: false,
      lienOfficiel: 'https://www.sovar.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',              subsideMax: '502 CHF/mois', revenuMax: '35 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans, formation)', subsideMax: '353 CHF/mois', revenuMax: '46 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                   subsideMax: '93 CHF/mois',  revenuMax: '47 000 CHF/an' },
      ],
    },
  },

  /* ─── TG — THURGOVIE ─────────────────────────────── */
  {
    slug: 'thurgovie',
    name: 'Thurgovie',
    cantonDe: 'canton de Thurgovie',
    demonym: 'thurgoviens',
    villePrincipale: 'Frauenfeld',
    rang: 10,
    primeMoyenne: 426,
    primeMoyenneJA: 380,
    primeMoyenneEnfant: 104,
    economieMois: 298,
    economieAn: 3571,
    subsidesPct: '22%',
    nbRegions: 1,
    breakEvenFranchise: 1925,
    topCaisses: [
      { name: 'Agrisano', prime: 469 },
      { name: 'SLKK', prime: 483 },
      { name: 'Sumiswalder', prime: 485 },
      { name: 'ÖKK', prime: 486 },
      { name: 'Sanitas', prime: 491 },
    ],
    caissePlusChere: { name: 'Aquilana', prime: 554 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'TG0', label: 'Thurgovie (TG0)', prime: 508.64 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 469.45 , primeAn: 5633, cout0: 5633, cout3000: 6203, cout8000: 6633 },
      { franchise: 500 , primeMois: 458.35 , primeAn: 5500, cout0: 5500, cout3000: 6250, cout8000: 6700 },
      { franchise: 1000, primeMois: 430.75 , primeAn: 5169, cout0: 5169, cout3000: 6369, cout8000: 6869 },
      { franchise: 1500, primeMois: 402.95 , primeAn: 4835, cout0: 4835, cout3000: 6485, cout8000: 6985 },
      { franchise: 2000, primeMois: 375.25 , primeAn: 4503, cout0: 4503, cout3000: 6603, cout8000: 7103 },
      { franchise: 2500, primeMois: 347.55 , primeAn: 4171, cout0: 4171, cout3000: 6721, cout8000: 7221 },
    ],
    caisseJA: { name: 'Sanitas', prime: 330.05 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 469.45 },
      { modele: 'Médecin de famille', caisse: 'Atupri', prime: 431.95 },
      { modele: 'HMO', caisse: 'Atupri', prime: 420.45 },
      { modele: 'Télémédecine', caisse: 'Agrisano', prime: 424.35 },
    ],
    subside: {
      seuilRevenu: '≈ 38 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 284,
      automatique: false,
      delai: '31 déc. 2026',
      lienOfficiel: 'https://www.svtg.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',              subsideMax: '284 CHF/mois', revenuMax: '38 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans, formation)', subsideMax: '198 CHF/mois', revenuMax: '38 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                   subsideMax: '103 CHF/mois', revenuMax: '38 000 CHF/an' },
      ],
    },
  },

  /* ─── GR — GRISONS ───────────────────────────────── */
  {
    slug: 'grisons',
    name: 'Grisons',
    cantonDe: 'canton des Grisons',
    demonym: 'grisons',
    villePrincipale: 'Coire',
    rang: 12,
    primeMoyenne: 437,
    primeMoyenneJA: 389,
    primeMoyenneEnfant: 105,
    economieMois: 357,
    economieAn: 4286,
    subsidesPct: '22%',
    nbRegions: 3,
    breakEvenFranchise: 1869,
    topCaisses: [
      { name: 'curaulta', prime: 465 },
      { name: 'ÖKK', prime: 465 },
      { name: 'Sumiswalder', prime: 471 },
      { name: 'Vita Surselva', prime: 475 },
      { name: 'Sanitas', prime: 489 },
    ],
    caissePlusChere: { name: 'SLKK', prime: 598 },
    caisseRef: 'curaulta',
    regions: [
      { id: 'GR1', label: 'Coire – Plessur (GR1)', prime: 529.77 },
      { id: 'GR2', label: 'Davos – Prättigau (GR2)', prime: 529.77 },
      { id: 'GR3', label: 'Surselva (GR3)', prime: 473.0 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 464.95 , primeAn: 5579, cout0: 5579, cout3000: 6149, cout8000: 6579 },
      { franchise: 500 , primeMois: 454.64 , primeAn: 5456, cout0: 5456, cout3000: 6206, cout8000: 6656 },
      { franchise: 1000, primeMois: 425.84 , primeAn: 5110, cout0: 5110, cout3000: 6310, cout8000: 6810 },
      { franchise: 1500, primeMois: 397.83 , primeAn: 4774, cout0: 4774, cout3000: 6424, cout8000: 6924 },
      { franchise: 2000, primeMois: 370.65 , primeAn: 4448, cout0: 4448, cout3000: 6548, cout8000: 7048 },
      { franchise: 2500, primeMois: 343.9  , primeAn: 4127, cout0: 4127, cout3000: 6677, cout8000: 7177 },
    ],
    caisseJA: { name: 'Sanitas', prime: 319.48 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'curaulta', prime: 457.05 },
      { modele: 'Médecin de famille', caisse: 'ÖKK', prime: 414.25 },
      { modele: 'HMO', caisse: 'ÖKK', prime: 414.25 },
      { modele: 'Télémédecine', caisse: 'Concordia', prime: 420.05 },
    ],
    subside: {
      seuilRevenu: '≈ 59 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 493,
      automatique: false,
      delai: '31 déc. 2026',
      lienOfficiel: 'https://www.sva.gr.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',  subsideMax: '493 CHF/mois', revenuMax: '59 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)', subsideMax: '364 CHF/mois', revenuMax: '44 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',        subsideMax: '117 CHF/mois', revenuMax: '80 000 CHF/an' },
      ],
    },
  },

  /* ─── AG — ARGOVIE ───────────────────────────────── */
  {
    slug: 'argovie',
    name: 'Argovie',
    cantonDe: "canton d'Argovie",
    demonym: 'argoviens',
    villePrincipale: 'Aarau',
    rang: 15,
    primeMoyenne: 448,
    primeMoyenneJA: 392,
    primeMoyenneEnfant: 105,
    economieMois: 296,
    economieAn: 3548,
    subsidesPct: '22%',
    nbRegions: 1,
    breakEvenFranchise: 1909,
    topCaisses: [
      { name: 'KKLH', prime: 483 },
      { name: 'Sumiswalder', prime: 486 },
      { name: 'Agrisano', prime: 496 },
      { name: 'Wädenswil', prime: 500 },
      { name: 'Sanitas', prime: 507 },
    ],
    caissePlusChere: { name: 'Swica', prime: 573 },
    caisseRef: 'KKLH',
    regions: [
      { id: 'AG0', label: 'Argovie (AG0)', prime: 527.98 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 482.95 , primeAn: 5795, cout0: 5795, cout3000: 6365, cout8000: 6795 },
      { franchise: 500 , primeMois: 472.0  , primeAn: 5664, cout0: 5664, cout3000: 6414, cout8000: 6864 },
      { franchise: 1000, primeMois: 444.55 , primeAn: 5335, cout0: 5335, cout3000: 6535, cout8000: 7035 },
      { franchise: 1500, primeMois: 417.15 , primeAn: 5006, cout0: 5006, cout3000: 6656, cout8000: 7156 },
      { franchise: 2000, primeMois: 389.75 , primeAn: 4677, cout0: 4677, cout3000: 6777, cout8000: 7277 },
      { franchise: 2500, primeMois: 362.3  , primeAn: 4348, cout0: 4348, cout3000: 6898, cout8000: 7398 },
    ],
    caisseJA: { name: 'Sanitas', prime: 341.75 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'KKLH', prime: 482.95 },
      { modele: 'Médecin de famille', caisse: 'Sumiswalder', prime: 447.15 },
      { modele: 'HMO', caisse: 'Avenir', prime: 442.25 },
      { modele: 'Télémédecine', caisse: 'Aquilana', prime: 444.25 },
    ],
    subside: {
      seuilRevenu: '≈ 42 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 486,
      automatique: false,
      delai: '31 déc. 2025',
      lienOfficiel: 'https://www.sva-aargau.ch',
      bareme: [
        { revenu: 'Moins de 30 000 CHF', montant: 'de 172 à 486 CHF / mois' },
        { revenu: '30 000 – 42 000 CHF', montant: "jusqu'à 172 CHF / mois"  },
        { revenu: 'Plus de 42 000 CHF',  montant: 'Non éligible'            },
      ],
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',              subsideMax: '486 CHF/mois', revenuMax: '42 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)',             subsideMax: '355 CHF/mois', revenuMax: '33 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                    subsideMax: '115 CHF/mois', revenuMax: '56 000 CHF/an' },
      ],
    },
  },

  /* ─── ZH — ZURICH ────────────────────────────────── */
  {
    slug: 'zurich',
    name: 'Zurich',
    cantonDe: 'canton de Zurich',
    demonym: 'zurichois',
    villePrincipale: 'Zurich',
    rang: 16,
    primeMoyenne: 449,
    primeMoyenneJA: 399,
    primeMoyenneEnfant: 109,
    economieMois: 357,
    economieAn: 4285,
    subsidesPct: '26%',
    nbRegions: 3,
    breakEvenFranchise: 1888,
    topCaisses: [
      { name: 'Rhenusana', prime: 489 },
      { name: 'Wädenswil', prime: 490 },
      { name: 'SLKK', prime: 492 },
      { name: 'Sumiswalder', prime: 492 },
      { name: 'KKLH', prime: 493 },
    ],
    caissePlusChere: { name: 'Philos', prime: 589 },
    caisseRef: 'Rhenusana',
    regions: [
      { id: 'ZH1', label: 'Zurich ville (ZH1)', prime: 601.36 },
      { id: 'ZH2', label: 'Winterthour (ZH2)', prime: 504.44 },
      { id: 'ZH3', label: 'Oberland – Limmattal (ZH3)', prime: 504.44 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 488.52 , primeAn: 5862, cout0: 5862, cout3000: 6432, cout8000: 6862 },
      { franchise: 500 , primeMois: 477.82 , primeAn: 5734, cout0: 5734, cout3000: 6484, cout8000: 6934 },
      { franchise: 1000, primeMois: 450.62 , primeAn: 5407, cout0: 5407, cout3000: 6607, cout8000: 7107 },
      { franchise: 1500, primeMois: 423.45 , primeAn: 5081, cout0: 5081, cout3000: 6731, cout8000: 7231 },
      { franchise: 2000, primeMois: 396.42 , primeAn: 4757, cout0: 4757, cout3000: 6857, cout8000: 7357 },
      { franchise: 2500, primeMois: 369.5  , primeAn: 4434, cout0: 4434, cout3000: 6984, cout8000: 7484 },
    ],
    caisseJA: { name: 'Sanitas', prime: 331.65 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Rhenusana', prime: 496.08 },
      { modele: 'Médecin de famille', caisse: 'SLKK', prime: 447.12 },
      { modele: 'HMO', caisse: 'ÖKK', prime: 448.25 },
      { modele: 'Télémédecine', caisse: 'SLKK', prime: 452.15 },
    ],
    subside: {
      seuilRevenu: '≈ 64 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 481,
      automatique: false,
      delai: '31 mars 2027',
      lienOfficiel: 'https://svazurich.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',   subsideMax: '481 CHF/mois', revenuMax: '64 000 CHF/an' },
        { profil: 'Jeune adulte (18–25 ans)',  subsideMax: '321 CHF/mois', revenuMax: '45 900 CHF/an' },
        { profil: 'Enfant (0–18 ans)',         subsideMax: '108 CHF/mois', revenuMax: '79 400 CHF/an' },
      ],
    },
  },

  /* ─── SH — SCHAFFHOUSE ───────────────────────────── */
  {
    slug: 'schaffhouse',
    name: 'Schaffhouse',
    cantonDe: 'canton de Schaffhouse',
    demonym: 'schaffhousois',
    villePrincipale: 'Schaffhouse',
    rang: 17,
    primeMoyenne: 452,
    primeMoyenneJA: 402,
    primeMoyenneEnfant: 107,
    economieMois: 317,
    economieAn: 3805,
    subsidesPct: '22%',
    nbRegions: 2,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'ÖKK', prime: 493 },
      { name: 'Assura', prime: 497 },
      { name: 'Agrisano', prime: 503 },
      { name: 'Aquilana', prime: 506 },
      { name: 'Sumiswalder', prime: 507 },
    ],
    caissePlusChere: { name: 'Avenir', prime: 584 },
    caisseRef: 'ÖKK',
    regions: [
      { id: 'SH1', label: 'Schaffhouse (SH1)', prime: 549.85 },
      { id: 'SH2', label: 'Klettgau (SH2)', prime: 517.0 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 493.45 , primeAn: 5921, cout0: 5921, cout3000: 6491, cout8000: 6921 },
      { franchise: 500 , primeMois: 482.65 , primeAn: 5792, cout0: 5792, cout3000: 6542, cout8000: 6992 },
      { franchise: 1000, primeMois: 455.55 , primeAn: 5467, cout0: 5467, cout3000: 6667, cout8000: 7167 },
      { franchise: 1500, primeMois: 428.35 , primeAn: 5140, cout0: 5140, cout3000: 6790, cout8000: 7290 },
      { franchise: 2000, primeMois: 401.25 , primeAn: 4815, cout0: 4815, cout3000: 6915, cout8000: 7415 },
      { franchise: 2500, primeMois: 374.15 , primeAn: 4490, cout0: 4490, cout3000: 7040, cout8000: 7540 },
    ],
    caisseJA: { name: 'Sanitas', prime: 339.8 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'ÖKK', prime: 491.05 },
      { modele: 'Médecin de famille', caisse: 'ÖKK', prime: 441.45 },
      { modele: 'HMO', caisse: 'ÖKK', prime: 426.6 },
      { modele: 'Télémédecine', caisse: 'Aquilana', prime: 437.4 },
    ],
    subside: {
      seuilRevenu: '≈ 44 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 322,
      automatique: false,
      delai: '30 avr. 2026',
      lienOfficiel: 'https://www.svash.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',  subsideMax: '322 CHF/mois', revenuMax: '44 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)', subsideMax: '210 CHF/mois', revenuMax: '35 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',        subsideMax: '75 CHF/mois',  revenuMax: '54 000 CHF/an' },
      ],
    },
  },

  /* ─── SO — SOLEURE ───────────────────────────────── */
  {
    slug: 'soleure',
    name: 'Soleure',
    cantonDe: 'canton de Soleure',
    demonym: 'soleurois',
    villePrincipale: 'Soleure',
    rang: 18,
    primeMoyenne: 473,
    primeMoyenneJA: 415,
    primeMoyenneEnfant: 112,
    economieMois: 297,
    economieAn: 3558,
    subsidesPct: '24%',
    nbRegions: 1,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'Sumiswalder', prime: 531 },
      { name: 'Agrisano', prime: 532 },
      { name: 'Helsana', prime: 536 },
      { name: 'KKLH', prime: 538 },
      { name: 'Aquilana', prime: 539 },
    ],
    caissePlusChere: { name: 'Avenir', prime: 593 },
    caisseRef: 'Sumiswalder',
    regions: [
      { id: 'SO0', label: 'Soleure (SO0)', prime: 560.35 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 530.65 , primeAn: 6368, cout0: 6368, cout3000: 6938, cout8000: 7368 },
      { franchise: 500 , primeMois: 519.85 , primeAn: 6238, cout0: 6238, cout3000: 6988, cout8000: 7438 },
      { franchise: 1000, primeMois: 492.75 , primeAn: 5913, cout0: 5913, cout3000: 7113, cout8000: 7613 },
      { franchise: 1500, primeMois: 465.55 , primeAn: 5587, cout0: 5587, cout3000: 7237, cout8000: 7737 },
      { franchise: 2000, primeMois: 438.55 , primeAn: 5263, cout0: 5263, cout3000: 7363, cout8000: 7863 },
      { franchise: 2500, primeMois: 411.35 , primeAn: 4936, cout0: 4936, cout3000: 7486, cout8000: 7986 },
    ],
    caisseJA: { name: 'Sanitas', prime: 366.45 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Sumiswalder', prime: 530.65 },
      { modele: 'Médecin de famille', caisse: 'CSS', prime: 482.35 },
      { modele: 'HMO', caisse: 'Visana', prime: 461.65 },
      { modele: 'Télémédecine', caisse: 'Aquilana', prime: 468.15 },
    ],
    subside: {
      seuilRevenu: '≤ 74 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 240,
      automatique: false,
      delai: '31 juil. 2026',
      lienOfficiel: 'https://www.akso.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',              subsideMax: '240 CHF/mois', revenuMax: '74 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans, formation)', subsideMax: '305 CHF/mois', revenuMax: '41 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                   subsideMax: '98 CHF/mois',  revenuMax: '74 000 CHF/an' },
      ],
    },
  },

  /* ─── BE — BERNE ─────────────────────────────────── */
  {
    slug: 'berne',
    name: 'Berne',
    cantonDe: 'canton de Berne',
    demonym: 'bernois',
    villePrincipale: 'Berne',
    rang: 19,
    primeMoyenne: 490,
    primeMoyenneJA: 432,
    primeMoyenneEnfant: 116,
    economieMois: 371,
    economieAn: 4447,
    subsidesPct: '28%',
    nbRegions: 3,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'Sumiswalder', prime: 533 },
      { name: 'ÖKK', prime: 548 },
      { name: 'Helsana', prime: 555 },
      { name: 'KKLH', prime: 556 },
      { name: 'Visana', prime: 557 },
    ],
    caissePlusChere: { name: 'Vita Surselva', prime: 641 },
    caisseRef: 'Sumiswalder',
    regions: [
      { id: 'BE1', label: 'Berne (BE1)', prime: 630.67 },
      { id: 'BE2', label: 'Thoune – Oberland (BE2)', prime: 566.15 },
      { id: 'BE3', label: 'Oberaargau – Emmental (BE3)', prime: 530.84 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 533.15 , primeAn: 6398, cout0: 6398, cout3000: 6968, cout8000: 7398 },
      { franchise: 500 , primeMois: 522.35 , primeAn: 6268, cout0: 6268, cout3000: 7018, cout8000: 7468 },
      { franchise: 1000, primeMois: 495.25 , primeAn: 5943, cout0: 5943, cout3000: 7143, cout8000: 7643 },
      { franchise: 1500, primeMois: 468.05 , primeAn: 5617, cout0: 5617, cout3000: 7267, cout8000: 7767 },
      { franchise: 2000, primeMois: 441.05 , primeAn: 5293, cout0: 5293, cout3000: 7393, cout8000: 7893 },
      { franchise: 2500, primeMois: 413.85 , primeAn: 4966, cout0: 4966, cout3000: 7516, cout8000: 8016 },
    ],
    caisseJA: { name: 'Sanitas', prime: 360.32 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Sumiswalder', prime: 530.15 },
      { modele: 'Médecin de famille', caisse: 'Sumiswalder', prime: 487.32 },
      { modele: 'HMO', caisse: 'ÖKK', prime: 480.25 },
      { modele: 'Télémédecine', caisse: 'Vivao Sympany', prime: 485.95 },
    ],
    subside: {
      seuilRevenu: '≤ 35 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 221,
      automatique: true,
      delai: '31 déc. 2026',
      lienOfficiel: 'https://www.asv.dij.be.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',        subsideMax: '221 CHF/mois', revenuMax: '35 000 CHF/an' },
        { profil: 'Jeune adulte (hors foyer)',      subsideMax: '206 CHF/mois', revenuMax: '45 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',              subsideMax: '119 CHF/mois', revenuMax: '45 000 CHF/an' },
      ],
    },
  },

  /* ─── BL — BÂLE-CAMPAGNE ─────────────────────────── */
  {
    slug: 'bale-campagne',
    name: 'Bâle-Campagne',
    cantonDe: 'canton de Bâle-Campagne',
    demonym: 'bâlois-campagnards',
    villePrincipale: 'Liestal',
    rang: 20,
    primeMoyenne: 532,
    primeMoyenneJA: 462,
    primeMoyenneEnfant: 132,
    economieMois: 368,
    economieAn: 4421,
    subsidesPct: '26%',
    nbRegions: 2,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'ÖKK', prime: 569 },
      { name: 'Sumiswalder', prime: 587 },
      { name: 'Atupri', prime: 596 },
      { name: 'Agrisano', prime: 598 },
      { name: 'CSS', prime: 601 },
    ],
    caissePlusChere: { name: 'SLKK', prime: 701 },
    caisseRef: 'ÖKK',
    regions: [
      { id: 'BL1', label: 'Arlesheim (BL1)', prime: 637.06 },
      { id: 'BL2', label: 'Sissach (BL2)', prime: 594.31 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 569.06 , primeAn: 6829, cout0: 6829, cout3000: 7399, cout8000: 7829 },
      { franchise: 500 , primeMois: 558.34 , primeAn: 6700, cout0: 6700, cout3000: 7450, cout8000: 7900 },
      { franchise: 1000, primeMois: 531.16 , primeAn: 6374, cout0: 6374, cout3000: 7574, cout8000: 8074 },
      { franchise: 1500, primeMois: 503.96 , primeAn: 6048, cout0: 6048, cout3000: 7698, cout8000: 8198 },
      { franchise: 2000, primeMois: 476.94 , primeAn: 5723, cout0: 5723, cout3000: 7823, cout8000: 8323 },
      { franchise: 2500, primeMois: 449.76 , primeAn: 5397, cout0: 5397, cout3000: 7947, cout8000: 8447 },
    ],
    caisseJA: { name: 'Sanitas', prime: 387.2 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'ÖKK', prime: 559.85 },
      { modele: 'Médecin de famille', caisse: 'ÖKK', prime: 503.4 },
      { modele: 'HMO', caisse: 'ÖKK', prime: 497.75 },
      { modele: 'Télémédecine', caisse: 'ÖKK', prime: 511.9 },
    ],
    subside: {
      seuilRevenu: '≈ 31 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 383,
      automatique: false,
      delai: '31 déc. 2026',
      lienOfficiel: 'https://www.sva-bl.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',              subsideMax: '383 CHF/mois', revenuMax: '31 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans, formation)',  subsideMax: '318 CHF/mois', revenuMax: '52 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',                    subsideMax: '131 CHF/mois', revenuMax: '52 000 CHF/an' },
      ],
    },
  },

  /* ─── BS — BÂLE-VILLE ────────────────────────────── */
  {
    slug: 'bale-ville',
    name: 'Bâle-Ville',
    cantonDe: 'canton de Bâle-Ville',
    demonym: 'bâlois',
    villePrincipale: 'Bâle',
    rang: 24,
    primeMoyenne: 565,
    primeMoyenneJA: 501,
    primeMoyenneEnfant: 142,
    economieMois: 393,
    economieAn: 4721,
    subsidesPct: '32%',
    nbRegions: 1,
    breakEvenFranchise: 1891,
    topCaisses: [
      { name: 'Assura', prime: 621 },
      { name: 'Vivao Sympany', prime: 625 },
      { name: 'CSS', prime: 631 },
      { name: 'Helsana', prime: 631 },
      { name: 'Avenir', prime: 635 },
    ],
    caissePlusChere: { name: 'Vita Surselva', prime: 769 },
    caisseRef: 'Assura',
    regions: [
      { id: 'BS0', label: 'Bâle-Ville (BS0)', prime: 668.4 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 621.45 , primeAn: 7457, cout0: 7457, cout3000: 8027, cout8000: 8457 },
      { franchise: 500 , primeMois: 610.65 , primeAn: 7328, cout0: 7328, cout3000: 8078, cout8000: 8528 },
      { franchise: 1000, primeMois: 583.45 , primeAn: 7001, cout0: 7001, cout3000: 8201, cout8000: 8701 },
      { franchise: 1500, primeMois: 556.35 , primeAn: 6676, cout0: 6676, cout3000: 8326, cout8000: 8826 },
      { franchise: 2000, primeMois: 529.25 , primeAn: 6351, cout0: 6351, cout3000: 8451, cout8000: 8951 },
      { franchise: 2500, primeMois: 502.15 , primeAn: 6026, cout0: 6026, cout3000: 8576, cout8000: 9076 },
    ],
    caisseJA: { name: 'Sanitas', prime: 420.95 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Assura', prime: 621.45 },
      { modele: 'Médecin de famille', caisse: 'Sana24', prime: 537.95 },
      { modele: 'HMO', caisse: 'Vivao Sympany', prime: 542.65 },
      { modele: 'Télémédecine', caisse: 'Vivao Sympany', prime: 548.95 },
    ],
    subside: {
      seuilRevenu: '≤ 49 375 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 444,
      automatique: false,
      delai: 'Pas de délai fixe (droit dès le mois suivant le dépôt)',
      lienOfficiel: 'https://www.bs.ch/themen/finanzielle-hilfe/leistungen/praemienverbilligung',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',  subsideMax: '444 CHF/mois', revenuMax: '49 375 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)', subsideMax: '329 CHF/mois', revenuMax: '49 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',        subsideMax: '157 CHF/mois', revenuMax: '79 000 CHF/an' },
      ],
    },
  },

  /* ─── TI — TESSIN ────────────────────────────────── */
  {
    slug: 'tessin',
    name: 'Tessin',
    cantonDe: 'canton du Tessin',
    demonym: 'tessinois',
    villePrincipale: 'Lugano',
    rang: 25,
    primeMoyenne: 594,
    primeMoyenneJA: 513,
    primeMoyenneEnfant: 142,
    economieMois: 390,
    economieAn: 4684,
    subsidesPct: '26%',
    nbRegions: 2,
    breakEvenFranchise: 1925,
    topCaisses: [
      { name: 'Agrisano', prime: 634 },
      { name: 'Galenos', prime: 637 },
      { name: 'Aquilana', prime: 641 },
      { name: 'Sanitas', prime: 665 },
      { name: 'ÖKK', prime: 668 },
    ],
    caissePlusChere: { name: 'Swica', prime: 760 },
    caisseRef: 'Agrisano',
    regions: [
      { id: 'TI1', label: 'Lugano – Locarno (TI1)', prime: 692.11 },
      { id: 'TI2', label: 'Riviera – Bellinzone (TI2)', prime: 645.41 },
    ],
    franchiseTable: [
      { franchise: 300 , primeMois: 633.53 , primeAn: 7602, cout0: 7602, cout3000: 8172, cout8000: 8602 },
      { franchise: 500 , primeMois: 622.34 , primeAn: 7468, cout0: 7468, cout3000: 8218, cout8000: 8668 },
      { franchise: 1000, primeMois: 594.73 , primeAn: 7137, cout0: 7137, cout3000: 8337, cout8000: 8837 },
      { franchise: 1500, primeMois: 567.03 , primeAn: 6804, cout0: 6804, cout3000: 8454, cout8000: 8954 },
      { franchise: 2000, primeMois: 539.23 , primeAn: 6471, cout0: 6471, cout3000: 8571, cout8000: 9071 },
      { franchise: 2500, primeMois: 511.63 , primeAn: 6140, cout0: 6140, cout3000: 8690, cout8000: 9190 },
    ],
    caisseJA: { name: 'Sanitas', prime: 405.55 },
    modelesAlternatifs: [
      { modele: 'Standard', caisse: 'Agrisano', prime: 615.1 },
      { modele: 'Médecin de famille', caisse: 'Galenos', prime: 564.35 },
      { modele: 'HMO', caisse: 'Concordia', prime: 554.8 },
      { modele: 'Télémédecine', caisse: 'Aquilana', prime: 551.15 },
    ],
    subside: {
      seuilRevenu: '≈ 52 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      subsideMensuelMax: 668,
      automatique: false,
      delai: 'Rétroactif si avant 31 déc. N-1, sinon dès le mois suivant',
      lienOfficiel: 'https://www.ti.ch',
      tableauProfils: [
        { profil: 'Adulte seul (≥ 26 ans)',  subsideMax: '668 CHF/mois', revenuMax: '52 000 CHF/an' },
        { profil: 'Jeune adulte (19–25 ans)', subsideMax: '512 CHF/mois', revenuMax: '40 000 CHF/an' },
        { profil: 'Enfant (0–18 ans)',        subsideMax: '152 CHF/mois', revenuMax: '52 000 CHF/an' },
      ],
    },
  },
]

export const cantonBySlug: Record<string, Canton> = Object.fromEntries(
  cantons.map((c) => [c.slug, c])
)

export const allCantons = cantons
export default cantons

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATEUR DE SUBSIDES — données et types
//
// Sources officielles — vérification initiale (avril 2026) :
//   GE : ge.ch/informations-generales-subside-assurance-maladie/baremes
//   VD : Notice explicative OVAM 2026 (PDF)
//   NE : ne.ch barèmes 2026 (RSN 821.102, classifications S1–S15)
//   VS : Echelle RIP 2026 (PDF officiel, Service AVS Valais)
//   FR : FR-memento_rpi_f_2026.pdf + FR-grille_lissage_des_taux_paliers_f.pdf (ECAS FR)
//   JU : communiqué SIC jura.ch 2025 + ecasjura.ch RPI 2026
//
// Sources officielles — re-vérification complète (mai 2026) :
//   AG  : gesetzessammlungen.ag.ch §837.211 Anhang (Richtprämie 5830, Einkommenssatz 17.5%, Grundabzug 8500)
//         → seuilNum corrigé 44000→42000 ; sva-aargau.ch/informationsblattpv
//   AI  : ai.ch FAQ Prämienverbilligung (Richtprämie 4640/an = 387/mois) — seuilNum 55000 non vérifiable (site 403)
//   AR  : sovar.ch (Richtprämie 6024, seuilNum 35000, delai 31.03.2026) ✅
//   BE  : asv.dij.be.ch (delai corrigé 31 mars 2027→31 déc. 2026) ; be_calc.pdf ✅
//   BL  : bl.clex.ch §362.12 (Richtprämie 4596/an = 383/mois) ; §362.1 §1a (seuilNum 31000, Stand 2014)
//   BS  : bs.ch/themen/finanzielle-hilfe/leistungen/praemienverbilligung
//         → delai corrigé '31 déc. 2026'→'Pas de délai fixe (droit dès le mois suivant le dépôt)' ✅
//   GR  : SVA Graubünden PDF IPV 2026 (Richtprämie 5916/an, seuilNum ~59000, delai 31.12.2026) ✅
//   LU  : srl.lu.ch §866a §2 (formule Selbstbehalt quadratique → seuilNum ~44433 ≈ 44000)
//         was-luzern.ch PDF Richtprämien 2026 Région 1 = 5628/an = 469/mois ✅
//   NW  : aknw.ch PDF IPV 2026 (Richtprämie 5400, seuilNum 54000, delai 30.04.2026) ✅
//   OW  : akow.ch PDF IPV 2026 (Richtprämie 5018.40, seuilNum 50000, delai 31.05.2026) ✅
//   SG  : svasg.ch Merkblatt 2026 (Referenzprämie 6285.60, Selbstbehalt 10.96%, delai 31.03.2026)
//         → seuilNum corrigé 41700→57350 (6285.60/0.1096) ✅
//   SH  : SVA Schaffhausen PDF IPV 2026 (Richtprämie 5947, Selbstbehalt 15%, seuilNum ~44000, delai 30.04.2026) ✅
//   SO  : ahv-iv.ch + akso.ch (seuilNum 74000, delai 31 juil. 2026) ✅
//   SZ  : ahv-sz.ch (seuilNum 43554, delai 31 déc. 2026) ✅
//   TG  : SVA Thurgau PDF IPV 2026 (Kat.A 3408/an = 284/mois, delai 31.12.2026) ✅
//   UR  : svsuri.ch XLSX Richtprämien 2026 (4368/an = 364/mois, Selbstbehalt 8.5%) ✅
//   ZG  : SVA Zug PDF IPV 2026 (Richtprämie 4984.80, seuilNum 89900, delai 30.04.2026) ✅
//   ZH  : SVA Zürich Kundeninformation 2026 PDF (delai 31.03.2027 confirmé — système rétroactif) ✅
// ─────────────────────────────────────────────────────────────────────────────

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
  adulte:   number
  enfant:   number
  total:    number
  approx:   boolean
  label?:   string
  note?:    string
}

export interface GroupeGE {
  groupe:          number
  adulte:          number
  jeune:           number
  enfant:          number
  revenuMaxSeul:   number
  revenuMaxCouple: number
}

export interface BandeNE {
  label:   string
  adulte:  number
  jeune:   number
  enfant:  number
  maxSeul: number
}

export interface TauxVS {
  profil:      'seul_0e' | 'seul_1e+' | 'couple_0e' | 'couple_1e' | 'couple_2e' | 'couple_3e' | 'couple_4e+'
  taux:        number
  revenuMaxAn: number
}

export interface SegmentVD {
  profil:     'adulte26_seul' | 'adulte1925' | 'adulte26_famille' | 'enfant'
  revenuMin:  number
  revenuMax:  number
  montantMin: number
  montantMax: number
}

export interface PalierFR {
  pctMin: number
  pctMax: number
  taux:   number
}

export interface SeuilEligibilite {
  statut:    'seul' | 'couple'
  nbEnfants: number
  revenuMax: number
}

export interface CantonSubside2026 {
  nom:           string
  seuilRevenu:   string
  seuilNum?:     number
  montantMaxNum: number
  montantMax:    string
  auto:          boolean
  delai:         string
  lien:          string
  primeMoyenne:  number
  retroactivite?: string
  arrivants?:    string
  note?:         string
  ge?: {
    groupes:           GroupeGE[]
    bonusEnfantSeul:   number
    bonusEnfantCouple: number
  }
  ne?: {
    bandes:        BandeNE[]
    facteurCouple: number
    facteurEnfant: number
  }
  vs?: {
    primeReference:  { adulte: number; jeune: number; enfant: number }
    taux:            TauxVS[]
    enfantMaxRevenu: SeuilEligibilite[]
  }
  vd?: {
    segments: SegmentVD[]
  }
  fr?: {
    seuilsEligibilite:  SeuilEligibilite[]
    paliers:            PalierFR[]
    primesMoyennes:     { region: string; adulte: number; jeune: number; enfant: number }[]
    pctMinEnfant:       number
    pctMinJAFormation:  number
  }
  ju?: {
    seuilsEligibilite: SeuilEligibilite[]
    adulteMax:         number
    enfant:            number
    jeune:             number
  }
}

export const SUBSIDES_2026: Record<CantonCode, CantonSubside2026> = {

  AG: {
    nom: 'Argovie',
    seuilRevenu: '≈ 42 000 CHF/an', seuilNum: 42000,
    montantMaxNum: 486, montantMax: '≤ 486 CHF/mois',
    auto: false, delai: '31 déc. 2025',
    lien: 'https://www.sva-aargau.ch/private/ihre-private-situation/finanzielle-unterstuetzung/praemienverbilligung/allgemeine',
    primeMoyenne: 419,
    retroactivite: 'Rétroactif au 1er janvier si demande déposée avant le 31 déc. (délai impératif). Si dépassé : inscription impossible pour l\'année.',
    arrivants: 'Déposer un «Änderungsantrag» via sva-aargau.ch. Rétroactivité max 12 mois pour bénéficiaires Sozialhilfe ; sinon droit dès la date de la demande.',
  },

  AI: {
    nom: 'Appenzell Rh.-Int.',
    seuilRevenu: '≈ 55 000 CHF/an', seuilNum: 55000,
    montantMaxNum: 387, montantMax: '≤ 387 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.ai.ch/themen/gesundheit/krankenversicherung/praemienverbilligung',
    primeMoyenne: 382,
    retroactivite: 'Attribution automatique par le Gesundheitsamt sur la base des données fiscales — aucun formulaire requis.',
    arrivants: 'Règles pour arrivants étrangers non publiées en ligne — contacter directement le Gesundheitsamt AI (+41 71 788 92 50).',
  },

  AR: {
    nom: 'Appenzell Rh.-Ext.',
    seuilRevenu: '≤ 35 000 CHF/an', seuilNum: 35000,
    montantMaxNum: 502, montantMax: '≤ 502 CHF/mois',
    auto: false, delai: '31 mars 2026',
    lien: 'https://www.sovar.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    primeMoyenne: 432,
    retroactivite: 'Pas de rétroactivité — délai strict 31 mars. Si dépassé : droit uniquement à partir du mois de la demande.',
    arrivants: 'Droit dès le mois de la demande. Formulaire spécifique «Zuzug aus dem Ausland 2026» disponible sur sovar.ch.',
  },

  BE: {
    nom: 'Berne',
    seuilRevenu: '≤ 35 000 CHF/an', seuilNum: 35000,
    montantMaxNum: 221, montantMax: '≤ 221 CHF/mois',
    auto: true, delai: '31 déc. 2026',
    lien: 'https://www.gef.be.ch/gef/fr/index/gesundheit/gesundheit/krankenversicherung/praemienverbilligung.html',
    primeMoyenne: 397,
    retroactivite: 'Attribution automatique (données fiscales N-2). Si situation changée : demande manuelle avant le 31 déc. Pas de rétroactivité en cours d\'année hors cas automatiques.',
    arrivants: 'Demande manuelle requise si non encore dans le système fiscal bernois. Contacter directement l\'ASV Berne (asv.dij.be.ch).',
  },

  BL: {
    nom: 'Bâle-Campagne',
    seuilRevenu: '≤ 31 000 CHF/an', seuilNum: 31000,
    montantMaxNum: 383, montantMax: '≤ 383 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-bl.ch/de/ausgleichskasse/individuelle-praemienverbilligung-ipv',
    primeMoyenne: 466,
    retroactivite: 'Semi-automatique : formulaire envoyé fin déc. aux éligibles identifiés. Retour dans les 12 mois → rétroactivité au 1er jan. Quellenbesteuerte : jusqu\'au 31 déc.',
    arrivants: 'Dépôt possible jusqu\'au 31 déc. de l\'année N+1 suivant l\'arrivée. Calcul basé sur la 1re décision fiscale BL.',
  },

  BS: {
    nom: 'Bâle-Ville',
    seuilRevenu: '≤ 49 375 CHF/an', seuilNum: 49375,
    montantMaxNum: 444, montantMax: '≤ 444 CHF/mois',
    auto: false, delai: 'Pas de délai fixe (droit dès le mois suivant le dépôt)',
    lien: 'https://www.bs.ch/themen/finanzielle-hilfe/leistungen/praemienverbilligung',
    primeMoyenne: 500,
    retroactivite: 'Sur demande — pas de délai annuel strict pour les résidents ordinaires. Traitement en 2–3 mois.',
    arrivants: 'Droit dès le début de l\'assurance si demande déposée dans les 3 mois suivant l\'arrivée. Au-delà : droit dès le mois suivant le dépôt.',
  },

  GL: {
    nom: 'Glaris',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 454, montantMax: '≤ 454 CHF/mois',
    auto: false, delai: '31 janv. 2026',
    lien: 'https://www.gl.ch/verwaltung/finanzen-und-gesundheit/steuern/individuelle-praemienverbilligung-ipv.html/502',
    primeMoyenne: 345,
    retroactivite: 'Règle de rétroactivité non publiée — contacter directement le Departement Finanzen und Gesundheit GL.',
    arrivants: 'Règle pour arrivants étrangers non publiée — contacter directement l\'office cantonal (gl.ch).',
  },

  GR: {
    nom: 'Grisons',
    seuilRevenu: '≈ 59 000 CHF/an', seuilNum: 59000,
    montantMaxNum: 493, montantMax: '≤ 493 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva.gr.ch/dienstleistungen/individuelle-praemienverbilligung.html',
    primeMoyenne: 390,
    retroactivite: 'Potentiellement rétroactif au 1er jan. (non garanti). Délai : 31 déc. de l\'année courante.',
    arrivants: 'Domicile au 1er jan. requis. Provisions de 65 % versées provisoirement. Règle spécifique arrivants étrangers non publiée — contacter SVA Graubünden.',
  },

  LU: {
    nom: 'Lucerne',
    seuilRevenu: '≈ 44 000 CHF/an', seuilNum: 44000,
    montantMaxNum: 469, montantMax: '≤ 469 CHF/mois',
    auto: false, delai: '31 oct. 2025 (ordonnaire) ; arrivants de l\'étranger et revenus en baisse –25% : jusqu\'au 31 déc. 2026',
    lien: 'https://www.was-luzern.ch/praemienverbilligung',
    primeMoyenne: 395,
    retroactivite: 'Délai ordinaire : 31 oct. du Vorjahr (système prospectif). Neuberechnung si revenus diminués de –25% par rapport aux données fiscales de référence : demande jusqu\'au 31 déc. 2026 → droit rétroactif recalculé.',
    arrivants: 'Droit partiel en cours d\'année possible pour les arrivants de l\'étranger — droit dès le mois suivant la demande. Déposer le formulaire dès que possible, au plus tard le 31 déc. 2026 pour les subsides 2026.',
  },

  NW: {
    nom: 'Nidwald',
    seuilRevenu: '≈ 54 000 CHF/an', seuilNum: 54000,
    montantMaxNum: 450, montantMax: '≤ 450 CHF/mois',
    auto: false, delai: '30 avr. 2026',
    lien: 'https://www.aknw.ch/dienstleistungen/praemienverbilligung-ipv',
    primeMoyenne: 288,
    retroactivite: 'Pas de rétroactivité — délai strict 30 avril. Les demandes déposées après cette date ne sont plus prises en compte.',
    arrivants: 'Demande dans les 3 mois après l\'arrivée — délai absolu : 30 avril de l\'année.',
  },

  OW: {
    nom: 'Obwald',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 418, montantMax: '≤ 418 CHF/mois',
    auto: false, delai: '31 mai 2026',
    lien: 'https://www.akow.ch/dienstleistungen/praemienverbilligung',
    primeMoyenne: 303,
    retroactivite: 'Pas de rétroactivité — délai strict 31 mai. Modifications en cours d\'année ne comptent que pour l\'année suivante. Stichtag : 1er jan.',
    arrivants: 'Règle pour arrivants étrangers non publiée — contacter directement l\'Ausgleichskasse Obwalden (akow.ch).',
  },

  SG: {
    nom: 'Saint-Gall',
    seuilRevenu: '≤ 57 350 CHF/an', seuilNum: 57350,
    montantMaxNum: 524, montantMax: '≤ 524 CHF/mois',
    auto: false, delai: '31 mars 2026',
    lien: 'https://www.svasg.ch/produkte/ipv/',
    primeMoyenne: 430,
    retroactivite: 'Pas de rétroactivité si délai dépassé — droit uniquement dès le mois de la demande. Délai : 31 mars.',
    arrivants: 'Droit dès le mois de la demande (délai jusqu\'au 31 déc.). Arrivant inter-cantonal : pas de droit l\'année du déménagement.',
  },

  SH: {
    nom: 'Schaffhouse',
    seuilRevenu: '≈ 44 000 CHF/an', seuilNum: 44000,
    montantMaxNum: 322, montantMax: '≤ 322 CHF/mois',
    auto: false, delai: '30 avr. 2026',
    lien: 'https://www.svash.ch',
    primeMoyenne: 431,
    retroactivite: 'Délai strict 30 avril. Règle de rétroactivité après dépassement : à vérifier via Merkblatt sur svash.ch.',
    arrivants: 'Règle pour arrivants non publiée en ligne — vérifier Merkblatt «Prämienverbilligung für Grenzgänger» sur svash.ch.',
  },

  SO: {
    nom: 'Soleure',
    seuilRevenu: '≤ 74 000 CHF/an', seuilNum: 74000,
    montantMaxNum: 240, montantMax: '≤ 240 CHF/mois',
    auto: false, delai: '31 juil. 2026',
    lien: 'https://www.akso.ch/dienstleistungen/praemienverbilligung-ipv',
    primeMoyenne: 387,
    retroactivite: 'Semi-automatique : formulaire envoyé automatiquement en jan. aux éligibles. Retour dans les 30 jours → rétroactivité au 1er jan. Quellenbesteuerte : jusqu\'au 31 déc.',
    arrivants: 'Règle pour arrivants étrangers non publiée — contacter directement l\'Ausgleichskasse Solothurn (akso.ch).',
  },

  SZ: {
    nom: 'Schwytz',
    seuilRevenu: '≤ 43 554 CHF/an', seuilNum: 43554,
    montantMaxNum: 465, montantMax: '≤ 465 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-sz.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    primeMoyenne: 347,
    retroactivite: 'Potentiellement rétroactif au 1er jan. (non garanti). Délai : 31 déc. de l\'année courante.',
    arrivants: 'Formulaire digital disponible sur sva-sz.ch. Règles spécifiques pour arrivants étrangers non publiées — contacter SVA Schwyz.',
  },

  TG: {
    nom: 'Thurgovie',
    seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000,
    montantMaxNum: 284, montantMax: '≤ 284 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://gesundheit.tg.ch/bevoelkerung/krankenversicherung/praemienverbilligung.html/5578',
    primeMoyenne: 360,
    retroactivite: 'Pas de rétroactivité si délai dépassé — «le droit s\'éteint définitivement, sans possibilité de nouveau calcul». Délai : 31 déc. Stichtag : 1er jan.',
    arrivants: 'Droit dès la soumission à l\'assurance suisse obligatoire. Délai de dépôt : au plus tard le 31 déc. Ajustement parité de pouvoir d\'achat appliqué.',
  },

  TI: {
    nom: 'Tessin',
    seuilRevenu: 'Formule RIPAM',
    montantMaxNum: 668, montantMax: '≤ 668 CHF/mois',
    auto: false, delai: '31 déc. 2025 (droit dès janv. 2026) ; hors délai : droit dès M+2',
    lien: 'https://www4.ti.ch/dss/ias/prestazioni-e-contributi/scheda/p/s/dettaglio/riduzione-dei-premi-dellassicurazione-malattia-ripam/richiesta-del-formulario-ripam/',
    primeMoyenne: 531,
    retroactivite: 'Rétroactif au 1er jan. si formulaire déposé avant le 31 déc. de l\'année précédente. Sinon : droit dès le mois suivant le dépôt.',
    arrivants: 'Arrivant de l\'étranger : droit dès jan. si formulaire RIPAM déposé avant le 31 déc. N-1 ; sinon droit dès le mois suivant le dépôt.',
  },

  UR: {
    nom: 'Uri',
    seuilRevenu: '≈ 51 000 CHF/an', seuilNum: 51000,
    montantMaxNum: 364, montantMax: '≤ 364 CHF/mois',
    auto: true, delai: '31 déc. 2026',
    lien: 'https://www.svsuri.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    primeMoyenne: 310,
    retroactivite: 'Attribution automatique pour les taxés (décisions envoyées mi-jan.). Quellenbesteuerte et arrivants : demande obligatoire. Règle exacte de rétroactivité pour demandes tardives : à vérifier sur svsuri.ch.',
    arrivants: 'Formulaire «Zuzug im 2026 aus Ausland» disponible sur svsuri.ch. Demande obligatoire pour toute personne arrivée en 2026 ou imposée à la source.',
  },

  ZG: {
    nom: 'Zoug',
    seuilRevenu: '≤ 89 900 CHF/an', seuilNum: 89900,
    montantMaxNum: 415, montantMax: '≤ 415 CHF/mois',
    auto: false, delai: '30 avr. 2026',
    lien: 'https://www.akzug.ch/dienstleistungen/praemienverbilligung',
    primeMoyenne: 360,
    retroactivite: 'Pas de rétroactivité — délai strict 30 avril. «Es können keine Anträge mehr eingereicht werden.» EL-Bezüger : attribution automatique.',
    arrivants: 'Règles pour arrivants étrangers non publiées — contacter directement l\'Ausgleichskasse Zug (akzug.ch).',
  },

  ZH: {
    nom: 'Zurich',
    seuilRevenu: '≈ 64 000 CHF/an', seuilNum: 64000,
    montantMaxNum: 481, montantMax: '≤ 481 CHF/mois',
    auto: false, delai: '31 mars 2027',
    lien: 'https://svazurich.ch/ihr-anliegen/privatpersonen/praemienverbilligung/praemienverbilligung_2026/einkommensgrenzen-2026.html',
    primeMoyenne: 442,
    retroactivite: 'Règle de rétroactivité non publiée — contacter directement la SVA Zürich (svazurich.ch).',
    arrivants: 'Règle pour arrivants étrangers non publiée — contacter directement la SVA Zürich (svazurich.ch).',
  },

  GE: {
    nom: 'Genève',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 348, montantMax: '≤ 348 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.ge.ch/informations-generales-subside-assurance-maladie',
    primeMoyenne: 710,
    retroactivite: 'Attribution automatique selon le revenu — pas de démarche active pour la majorité. Demande possible à tout moment via courrier ou e-démarches.',
    arrivants: 'Demande à soumettre dès l\'arrivée via e-démarches ge.ch ou par courrier au Service de l\'assurance-maladie (SAM). Règle de délai spécifique non publiée — contacter le SAM.',
    note: 'Attribution automatique pour la majorité selon le revenu. Demande possible via courrier ou portail e-démarches (ge.ch). Calculateur en ligne disponible.',
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
        { groupe: 9, adulte:   0, jeune: 106, enfant:  67, revenuMaxSeul: Infinity, revenuMaxCouple: Infinity },
      ],
    },
  },

  VD: {
    nom: 'Vaud',
    seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000,
    montantMaxNum: 331, montantMax: '≤ 331 CHF/mois',
    auto: false, delai: 'Pas de délai annuel fixe (droit dès le 1er jour du 2e mois suivant le dépôt)',
    lien: 'https://www.vd.ch/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',
    primeMoyenne: 638,
    retroactivite: 'Le droit prend naissance le 1er jour du 2ème mois suivant le dépôt de la demande. Exception : bénéficiaires RI ou PC AVS/AI (dès le début des prestations).',
    arrivants: 'Changement de canton : nouvelle demande obligatoire auprès de l\'OVAM dans le canton de destination.',
    note: 'Demande en ligne (vd.ch/ovam) ou en agence d\'assurances sociales. Renouvellement annuel fin octobre basé sur taxation définitive au 17 octobre.',
    vd: {
      segments: [
        { profil: 'adulte26_seul', revenuMin:      0, revenuMax:  17_000, montantMin: 331, montantMax: 331 },
        { profil: 'adulte26_seul', revenuMin: 17_000, revenuMax:  40_000, montantMin: 331, montantMax:  30 },
        { profil: 'adulte26_seul', revenuMin: 40_000, revenuMax:  50_000, montantMin:  30, montantMax:  30 },
        { profil: 'adulte26_seul', revenuMin: 50_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
        { profil: 'adulte1925', revenuMin:      0, revenuMax:  16_000, montantMin: 255, montantMax: 255 },
        { profil: 'adulte1925', revenuMin: 16_000, revenuMax:  34_000, montantMin: 255, montantMax:  20 },
        { profil: 'adulte1925', revenuMin: 34_000, revenuMax:  39_000, montantMin:  20, montantMax:  20 },
        { profil: 'adulte1925', revenuMin: 39_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
        { profil: 'adulte26_famille', revenuMin:      0, revenuMax:  24_200, montantMin: 318, montantMax: 318 },
        { profil: 'adulte26_famille', revenuMin: 24_200, revenuMax:  55_000, montantMin: 300, montantMax:  20 },
        { profil: 'adulte26_famille', revenuMin: 55_000, revenuMax:  72_500, montantMin:  20, montantMax:  20 },
        { profil: 'adulte26_famille', revenuMin: 72_500, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
        { profil: 'enfant', revenuMin:      0, revenuMax:  76_000, montantMin: 114, montantMax: 114 },
        { profil: 'enfant', revenuMin: 76_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
      ],
    },
  },

  NE: {
    nom: 'Neuchâtel',
    seuilRevenu: '≈ 65 000 CHF/an', seuilNum: 65000,
    montantMaxNum: 643, montantMax: '≤ 643 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.ne.ch/themes/social/assurance-maladie/subsides-assurance-maladie-lamal',
    primeMoyenne: 663,
    retroactivite: 'Mixte : bénéficiaires 2025 reconduits automatiquement. Nouveaux dans le système → droit à compter de la date de la demande (pas rétroactif au 1er jan.).',
    arrivants: 'Demande au GSR immédiatement à l\'arrivée. Droit à compter de la date de la demande. Inter-cantonal : ancien canton compétent jusqu\'au 31 déc., puis NE dès le 1er jan. suivant.',
    note: 'Renouvellement automatique si situation inchangée. Signaler sans délai au GSR : hausse/baisse revenus, naissance, mariage, divorce, décès.',
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

  FR: {
    nom: 'Fribourg',
    seuilRevenu: '≤ 37 000 CHF/an', seuilNum: 37000,
    montantMaxNum: 370, montantMax: '≤ 370 CHF/mois',
    auto: true, delai: '31 août 2026',
    lien: 'https://www.ecasfr.ch/fr/Assurances/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie.html',
    primeMoyenne: 569,
    retroactivite: 'Non rétroactive — renouvellement automatique annuel sur examen d\'office.',
    arrivants: 'Arrivants non encore dans le système fiscal fribourgeois : contacter directement l\'ECAS FR (026 426 77 00). Documents requis : certificat(s) d\'assurance-maladie + attestation d\'études si jeune 19–25 ans.',
    note: 'Base de calcul : taxation fiscale de l\'année N-2. Renouvellement automatique si situation inchangée.',
    fr: {
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
      primesMoyennes: [
        { region: '1', adulte: 569, jeune: 415, enfant: 136 },
        { region: '2', adulte: 524, jeune: 386, enfant: 124 },
      ],
      pctMinEnfant:      80,
      pctMinJAFormation: 50,
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

  JU: {
    nom: 'Jura',
    seuilRevenu: '≤ 27 000 CHF/an', seuilNum: 27000,
    montantMaxNum: 225, montantMax: '≤ 225 CHF/mois',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.ecasjura.ch/fr/Assurances/Assurance-maladie',
    primeMoyenne: 633,
    retroactivite: 'Rétroactivité au 1er jan. garantie si taxation tardive. Délai ultime : 31 déc. de l\'année courante.',
    arrivants: 'Demande à l\'ECAS. Droit rétroactif au 1er jan. garanti si demande dans les délais. Arrivant de l\'étranger : demande formelle, rétroactivité au 1er jan. garantie.',
    note: 'Examen d\'office si taxation 2024 reçue avant déc. 2026. Demande requise sinon ou sans courrier dans les 30 jours. Situation déterminante : 1er jan. de l\'année.',
    ju: {
      adulteMax:  225,
      enfant:     100,
      jeune:      196,
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

  VS: {
    nom: 'Valais',
    seuilRevenu: '≈ 38 500 CHF/an', seuilNum: 38500,
    montantMaxNum: 521, montantMax: '≤ 521 CHF/mois',
    auto: true, delai: 'Non requis (automatique)',
    lien: 'https://www.avsvalais.ch/fr/Assurances/RIP-Reduction-individuelle-des-primes-d-assurance-maladie',
    primeMoyenne: 528,
    retroactivite: 'Pas de rétroactivité en règle générale. Exception légale : arrivants bénéficiant déjà d\'une PC AVS/AI ou aide sociale → droit depuis l\'établissement en Valais.',
    arrivants: 'Règle générale : domicile au 1er jan. requis → droit ouvert à partir du 1er jan. de l\'année suivante. Exception : bénéficiaires PC AVS/AI ou aide sociale → droit dès l\'arrivée.',
    note: 'Bénéficiaires 2025 reconnus : notification automatique, aucune démarche. Nouveaux bénéficiaires : notification fin février, transmettre copie police d\'assurance. Imposés à la source : demande avant le 31 déc.',
    vs: {
      primeReference: { adulte: 521, jeune: 380, enfant: 122 },
      taux: [
        { profil: 'seul_0e',   taux: 100, revenuMaxAn:  21_000 },
        { profil: 'seul_0e',   taux:  70, revenuMaxAn:  23_917 },
        { profil: 'seul_0e',   taux:  50, revenuMaxAn:  26_833 },
        { profil: 'seul_0e',   taux:  40, revenuMaxAn:  29_750 },
        { profil: 'seul_0e',   taux:  30, revenuMaxAn:  32_667 },
        { profil: 'seul_0e',   taux:  20, revenuMaxAn:  35_583 },
        { profil: 'seul_0e',   taux:  10, revenuMaxAn:  38_500 },
        { profil: 'seul_1e+',  taux: 100, revenuMaxAn:  38_250 },
        { profil: 'seul_1e+',  taux:  70, revenuMaxAn:  41_896 },
        { profil: 'seul_1e+',  taux:  50, revenuMaxAn:  45_542 },
        { profil: 'seul_1e+',  taux:  40, revenuMaxAn:  49_188 },
        { profil: 'seul_1e+',  taux:  30, revenuMaxAn:  52_833 },
        { profil: 'seul_1e+',  taux:  20, revenuMaxAn:  56_479 },
        { profil: 'seul_1e+',  taux:  10, revenuMaxAn:  60_125 },
        { profil: 'couple_0e', taux: 100, revenuMaxAn:  36_750 },
        { profil: 'couple_0e', taux:  70, revenuMaxAn:  41_854 },
        { profil: 'couple_0e', taux:  50, revenuMaxAn:  46_958 },
        { profil: 'couple_0e', taux:  40, revenuMaxAn:  52_063 },
        { profil: 'couple_0e', taux:  30, revenuMaxAn:  57_167 },
        { profil: 'couple_0e', taux:  20, revenuMaxAn:  62_271 },
        { profil: 'couple_0e', taux:  10, revenuMaxAn:  67_375 },
        { profil: 'couple_1e', taux: 100, revenuMaxAn:  48_750 },
        { profil: 'couple_1e', taux:  70, revenuMaxAn:  53_854 },
        { profil: 'couple_1e', taux:  50, revenuMaxAn:  58_958 },
        { profil: 'couple_1e', taux:  40, revenuMaxAn:  64_063 },
        { profil: 'couple_1e', taux:  30, revenuMaxAn:  69_167 },
        { profil: 'couple_1e', taux:  20, revenuMaxAn:  74_271 },
        { profil: 'couple_1e', taux:  10, revenuMaxAn:  79_375 },
        { profil: 'couple_2e', taux: 100, revenuMaxAn:  58_750 },
        { profil: 'couple_2e', taux:  70, revenuMaxAn:  63_854 },
        { profil: 'couple_2e', taux:  50, revenuMaxAn:  68_958 },
        { profil: 'couple_2e', taux:  40, revenuMaxAn:  74_063 },
        { profil: 'couple_2e', taux:  30, revenuMaxAn:  79_167 },
        { profil: 'couple_2e', taux:  20, revenuMaxAn:  84_271 },
        { profil: 'couple_2e', taux:  10, revenuMaxAn:  89_375 },
        { profil: 'couple_3e', taux: 100, revenuMaxAn:  66_750 },
        { profil: 'couple_3e', taux:  70, revenuMaxAn:  71_854 },
        { profil: 'couple_3e', taux:  50, revenuMaxAn:  76_958 },
        { profil: 'couple_3e', taux:  40, revenuMaxAn:  82_063 },
        { profil: 'couple_3e', taux:  30, revenuMaxAn:  87_167 },
        { profil: 'couple_3e', taux:  20, revenuMaxAn:  92_271 },
        { profil: 'couple_3e', taux:  10, revenuMaxAn:  97_375 },
        { profil: 'couple_4e+', taux: 100, revenuMaxAn:  72_750 },
        { profil: 'couple_4e+', taux:  70, revenuMaxAn:  77_854 },
        { profil: 'couple_4e+', taux:  50, revenuMaxAn:  82_958 },
        { profil: 'couple_4e+', taux:  40, revenuMaxAn:  88_063 },
        { profil: 'couple_4e+', taux:  30, revenuMaxAn:  93_167 },
        { profil: 'couple_4e+', taux:  20, revenuMaxAn:  98_271 },
        { profil: 'couple_4e+', taux:  10, revenuMaxAn: 103_375 },
      ],
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

export function getCantonSubside(code: string): CantonSubside2026 | undefined {
  return SUBSIDES_2026[code as CantonCode]
}

export const ALL_CANTON_CODES = Object.keys(SUBSIDES_2026) as CantonCode[]

