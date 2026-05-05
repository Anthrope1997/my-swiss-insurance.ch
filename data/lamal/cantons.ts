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

export interface SubsideInfo {
  seuilRevenu: string
  subsideMensuel: string
  subsideMensuelMax?: number   // CHF/mois max pour un adulte seul
  automatique: boolean
  delai?: string
  lienOfficiel: string
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
  topCaisses: TopCaisse[]      // top 5 caisses les moins chères (avg canton)
  caissePlusChere: TopCaisse
  caisseRef: string            // caisse utilisée pour le tableau des franchises
  regions: RegionPrime[]
  franchiseTable: FranchiseRow[]
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
    primeMoyenne: 638,
    primeMoyenneJA: 472,
    primeMoyenneEnfant: 137,
    economieMois: 112,
    economieAn: 1347,
    subsidesPct: '28%',
    nbRegions: 2,
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
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'de 30 à 331 CHF/mois',
      subsideMensuelMax: 331,
      automatique: false,
      delai: 'Voir OVAM 2026',
      lienOfficiel: 'https://www.vd.ch',
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
    primeMoyenne: 710,
    primeMoyenneJA: 540,
    primeMoyenneEnfant: 158,
    economieMois: 229,
    economieAn: 2753,
    subsidesPct: '31%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'de 55 à 348 CHF/mois',
      subsideMensuelMax: 348,
      automatique: true,
      delai: '—',
      lienOfficiel: 'https://www.ge.ch',
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
    primeMoyenne: 522,
    primeMoyenneJA: 395,
    primeMoyenneEnfant: 108,
    economieMois: 92,
    economieAn: 1099,
    subsidesPct: '24%',
    nbRegions: 2,
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
    subside: {
      seuilRevenu: '≈ 37 000 CHF/an (seul)',
      subsideMensuel: 'Barème non publié (60 paliers)',
      automatique: false,
      delai: '31 août 2026',
      lienOfficiel: 'https://www.fr.ch',
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
    primeMoyenne: 528,
    primeMoyenneJA: 387,
    primeMoyenneEnfant: 103,
    economieMois: 120,
    economieAn: 1445,
    subsidesPct: '26%',
    nbRegions: 2,
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
    subside: {
      seuilRevenu: '≈ 38 500 CHF/an (seul)',
      subsideMensuel: 'de 52 à 521 CHF/mois',
      subsideMensuelMax: 521,
      automatique: true,
      delai: '—',
      lienOfficiel: 'https://www.vs.ch',
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
    primeMoyenne: 663,
    primeMoyenneJA: 499,
    primeMoyenneEnfant: 137,
    economieMois: 146,
    economieAn: 1747,
    subsidesPct: '29%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 65 000 CHF/an (seul)',
      subsideMensuel: 'de 166 à 643 CHF/mois',
      subsideMensuelMax: 643,
      automatique: true,
      delai: '—',
      lienOfficiel: 'https://www.ne.ch',
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
    primeMoyenne: 633,
    primeMoyenneJA: 476,
    primeMoyenneEnfant: 130,
    economieMois: 116,
    economieAn: 1390,
    subsidesPct: '22%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 27 000 CHF/an (seul)',
      subsideMensuel: "jusqu'à 568 CHF/mois",
      subsideMensuelMax: 568,
      automatique: false,
      delai: '31 déc. 2026',
      lienOfficiel: 'https://www.jura.ch',
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
    primeMoyenne: 403,
    primeMoyenneJA: 302,
    primeMoyenneEnfant: 79,
    economieMois: 152,
    economieAn: 1824,
    subsidesPct: '16%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 75 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.zg.ch',
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
    primeMoyenne: 424,
    primeMoyenneJA: 318,
    primeMoyenneEnfant: 83,
    economieMois: 117,
    economieAn: 1404,
    subsidesPct: '18%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 44 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.ai.ch',
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
    primeMoyenne: 460,
    primeMoyenneJA: 344,
    primeMoyenneEnfant: 92,
    economieMois: 115,
    economieAn: 1380,
    subsidesPct: '18%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.nw.ch',
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
    primeMoyenne: 463,
    primeMoyenneJA: 347,
    primeMoyenneEnfant: 92,
    economieMois: 221,
    economieAn: 2652,
    subsidesPct: '18%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 48 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.ur.ch',
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
    primeMoyenne: 467,
    primeMoyenneJA: 349,
    primeMoyenneEnfant: 94,
    economieMois: 111,
    economieAn: 1332,
    subsidesPct: '18%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 48 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.ow.ch',
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
    primeMoyenne: 485,
    primeMoyenneJA: 358,
    primeMoyenneEnfant: 96,
    economieMois: 134,
    economieAn: 1608,
    subsidesPct: '20%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 55 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.sz.ch',
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
    primeMoyenne: 496,
    primeMoyenneJA: 370,
    primeMoyenneEnfant: 99,
    economieMois: 117,
    economieAn: 1404,
    subsidesPct: '24%',
    nbRegions: 3,
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
    subside: {
      seuilRevenu: '≈ 56 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.sg.ch',
    },
  },

  /* ─── GL — GLARIS ────────────────────────────────── */
  {
    slug: 'glaris',
    name: 'Glaris',
    cantonDe: 'canton de Glaris',
    demonym: 'glaronnais',
    villePrincipale: 'Glaris',
    rang: 8,
    primeMoyenne: 498,
    primeMoyenneJA: 374,
    primeMoyenneEnfant: 100,
    economieMois: 61,
    economieAn: 732,
    subsidesPct: '20%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.gl.ch',
    },
  },

  /* ─── LU — LUCERNE ───────────────────────────────── */
  {
    slug: 'lucerne',
    name: 'Lucerne',
    cantonDe: 'canton de Lucerne',
    demonym: 'lucernois',
    villePrincipale: 'Lucerne',
    rang: 9,
    primeMoyenne: 500,
    primeMoyenneJA: 375,
    primeMoyenneEnfant: 100,
    economieMois: 128,
    economieAn: 1536,
    subsidesPct: '24%',
    nbRegions: 3,
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
    subside: {
      seuilRevenu: '≈ 58 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.lu.ch',
    },
  },

  /* ─── AR — APPENZELL RHODES-EXTÉRIEURES ──────────── */
  {
    slug: 'appenzell-rhodes-exterieures',
    name: 'Appenzell Rhodes-Extérieures',
    cantonDe: "canton d'Appenzell Rhodes-Extérieures",
    demonym: 'appenzellois',
    villePrincipale: 'Hérisau',
    rang: 10,
    primeMoyenne: 509,
    primeMoyenneJA: 376,
    primeMoyenneEnfant: 100,
    economieMois: 164,
    economieAn: 1968,
    subsidesPct: '20%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 50 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.ar.ch',
    },
  },

  /* ─── TG — THURGOVIE ─────────────────────────────── */
  {
    slug: 'thurgovie',
    name: 'Thurgovie',
    cantonDe: 'canton de Thurgovie',
    demonym: 'thurgoviens',
    villePrincipale: 'Frauenfeld',
    rang: 11,
    primeMoyenne: 509,
    primeMoyenneJA: 380,
    primeMoyenneEnfant: 104,
    economieMois: 84,
    economieAn: 1008,
    subsidesPct: '22%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 55 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.tg.ch',
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
    primeMoyenne: 517,
    primeMoyenneJA: 389,
    primeMoyenneEnfant: 105,
    economieMois: 142,
    economieAn: 1704,
    subsidesPct: '22%',
    nbRegions: 3,
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
    subside: {
      seuilRevenu: '≈ 52 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '30 sept. 2026',
      lienOfficiel: 'https://www.gr.ch',
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
    primeMoyenne: 528,
    primeMoyenneJA: 392,
    primeMoyenneEnfant: 105,
    economieMois: 90,
    economieAn: 1080,
    subsidesPct: '22%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 56 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 oct. 2026',
      lienOfficiel: 'https://www.ag.ch',
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
    primeMoyenne: 531,
    primeMoyenneJA: 399,
    primeMoyenneEnfant: 109,
    economieMois: 119,
    economieAn: 1428,
    subsidesPct: '26%',
    nbRegions: 3,
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
    subside: {
      seuilRevenu: '≈ 80 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.zh.ch',
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
    primeMoyenne: 536,
    primeMoyenneJA: 402,
    primeMoyenneEnfant: 107,
    economieMois: 91,
    economieAn: 1092,
    subsidesPct: '22%',
    nbRegions: 2,
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
    subside: {
      seuilRevenu: '≈ 54 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      lienOfficiel: 'https://www.sh.ch',
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
    primeMoyenne: 560,
    primeMoyenneJA: 415,
    primeMoyenneEnfant: 112,
    economieMois: 62,
    economieAn: 744,
    subsidesPct: '24%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 57 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 oct. 2026',
      lienOfficiel: 'https://www.so.ch',
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
    primeMoyenne: 578,
    primeMoyenneJA: 432,
    primeMoyenneEnfant: 116,
    economieMois: 127,
    economieAn: 1524,
    subsidesPct: '28%',
    nbRegions: 3,
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
    subside: {
      seuilRevenu: '≈ 64 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 oct. 2026',
      lienOfficiel: 'https://www.be.ch',
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
    primeMoyenne: 625,
    primeMoyenneJA: 462,
    primeMoyenneEnfant: 132,
    economieMois: 137,
    economieAn: 1644,
    subsidesPct: '26%',
    nbRegions: 2,
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
    subside: {
      seuilRevenu: '≈ 68 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.bl.ch',
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
    primeMoyenne: 668,
    primeMoyenneJA: 501,
    primeMoyenneEnfant: 142,
    economieMois: 148,
    economieAn: 1776,
    subsidesPct: '32%',
    nbRegions: 1,
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
    subside: {
      seuilRevenu: '≈ 72 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.bs.ch',
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
    primeMoyenne: 686,
    primeMoyenneJA: 513,
    primeMoyenneEnfant: 142,
    economieMois: 146,
    economieAn: 1752,
    subsidesPct: '26%',
    nbRegions: 2,
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
    subside: {
      seuilRevenu: '≈ 52 000 CHF/an (seul)',
      subsideMensuel: 'Variable selon le revenu',
      automatique: false,
      delai: '31 mars 2026',
      lienOfficiel: 'https://www.ti.ch',
    },
  },
]

export const cantonBySlug: Record<string, Canton> = Object.fromEntries(
  cantons.map((c) => [c.slug, c])
)

export const allCantons = cantons
export default cantons
