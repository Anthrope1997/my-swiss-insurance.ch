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
  automatique: boolean
  lienOfficiel: string
}

export interface Canton {
  slug: string
  name: string
  cantonDe: string
  rang: number                 // rang parmi 26 cantons (1 = le moins cher)
  primeMoyenne: number         // adulte · f=300 · standard · sans accident
  primeMoyenneJA: number       // jeune adulte 19-25 ans · même profil
  primeMoyenneEnfant: number   // enfant 0-18 ans · f=300 · standard
  economieMois: number         // écart max−min intra-région en CHF/mois
  economieAn: number           // idem × 12
  subsidesPct: string
  nbRegions: number
  topCaisses: TopCaisse[]      // top 5 caisses les moins chères (avg canton)
  caissePlusChere: TopCaisse
  caisseRef: string            // caisse utilisée pour le tableau des franchises
  regions: RegionPrime[]
  franchiseTable: FranchiseRow[]
  subside: SubsideInfo
}

const cantons: Canton[] = [
  /* ─── VAUD ─────────────────────────────────────────────── */
  {
    slug: 'vaud',
    name: 'Vaud',
    cantonDe: 'canton de Vaud',
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
      seuilRevenu: '≈ 56 900 CHF/an',
      subsideMensuel: '≈ 180 CHF',
      automatique: true,
      lienOfficiel: 'https://www.vd.ch',
    },
  },

  /* ─── GENÈVE ────────────────────────────────────────────── */
  {
    slug: 'geneve',
    name: 'Genève',
    cantonDe: 'canton de Genève',
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
      seuilRevenu: '≈ 53 000 CHF/an',
      subsideMensuel: '≈ 210 CHF',
      automatique: true,
      lienOfficiel: 'https://www.ge.ch',
    },
  },

  /* ─── FRIBOURG ──────────────────────────────────────────── */
  {
    slug: 'fribourg',
    name: 'Fribourg',
    cantonDe: 'canton de Fribourg',
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
      seuilRevenu: '≈ 48 000 CHF/an',
      subsideMensuel: '≈ 155 CHF',
      automatique: false,
      lienOfficiel: 'https://www.fr.ch',
    },
  },

  /* ─── VALAIS ────────────────────────────────────────────── */
  {
    slug: 'valais',
    name: 'Valais',
    cantonDe: 'canton du Valais',
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
      seuilRevenu: '≈ 46 000 CHF/an',
      subsideMensuel: '≈ 148 CHF',
      automatique: false,
      lienOfficiel: 'https://www.vs.ch',
    },
  },

  /* ─── NEUCHÂTEL ─────────────────────────────────────────── */
  {
    slug: 'neuchatel',
    name: 'Neuchâtel',
    cantonDe: 'canton de Neuchâtel',
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
      seuilRevenu: '≈ 50 000 CHF/an',
      subsideMensuel: '≈ 162 CHF',
      automatique: true,
      lienOfficiel: 'https://www.ne.ch',
    },
  },

  /* ─── JURA ──────────────────────────────────────────────── */
  {
    slug: 'jura',
    name: 'Jura',
    cantonDe: 'canton du Jura',
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
      seuilRevenu: '≈ 44 000 CHF/an',
      subsideMensuel: '≈ 138 CHF',
      automatique: false,
      lienOfficiel: 'https://www.jura.ch',
    },
  },
]

export const cantonBySlug: Record<string, Canton> = Object.fromEntries(
  cantons.map((c) => [c.slug, c])
)

export const allCantons = cantons
export default cantons
