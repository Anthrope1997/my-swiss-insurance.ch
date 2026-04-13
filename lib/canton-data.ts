export interface TopCaisse {
  name: string
  prime: number
}

export interface SubsideInfo {
  seuilRevenu: string
  subsideMensuel: string
  demandeVia: string
}

export interface Canton {
  slug: string
  name: string
  cantonDe: string       // "canton de Vaud", "canton du Valais"
  primeMoyenne: number
  economiePossible: string
  subsidesPct: string
  topCaisses: TopCaisse[]
  subside: SubsideInfo
}

const cantons: Canton[] = [
  {
    slug: 'vaud',
    name: 'Vaud',
    cantonDe: 'canton de Vaud',
    primeMoyenne: 487,
    economiePossible: "jusqu'à 94 CHF/mois",
    subsidesPct: '28%',
    topCaisses: [
      { name: 'Assura', prime: 398 },
      { name: 'KPT', prime: 412 },
      { name: 'Groupe Mutuel', prime: 421 },
    ],
    subside: {
      seuilRevenu: '56 900 CHF/an',
      subsideMensuel: '180 CHF',
      demandeVia: 'formulaire VD.ch en ligne',
    },
  },
  {
    slug: 'geneve',
    name: 'Genève',
    cantonDe: 'canton de Genève',
    primeMoyenne: 512,
    economiePossible: "jusqu'à 108 CHF/mois",
    subsidesPct: '31%',
    topCaisses: [
      { name: 'Assura', prime: 418 },
      { name: 'Sanitas', prime: 431 },
      { name: 'KPT', prime: 438 },
    ],
    subside: {
      seuilRevenu: '53 000 CHF/an',
      subsideMensuel: '210 CHF',
      demandeVia: 'formulaire GE.ch en ligne',
    },
  },
  {
    slug: 'fribourg',
    name: 'Fribourg',
    cantonDe: 'canton de Fribourg',
    primeMoyenne: 398,
    economiePossible: "jusqu'à 72 CHF/mois",
    subsidesPct: '24%',
    topCaisses: [
      { name: 'Assura', prime: 312 },
      { name: 'Groupe Mutuel', prime: 324 },
      { name: 'CSS', prime: 331 },
    ],
    subside: {
      seuilRevenu: '48 000 CHF/an',
      subsideMensuel: '155 CHF',
      demandeVia: 'formulaire FR.ch en ligne',
    },
  },
  {
    slug: 'valais',
    name: 'Valais',
    cantonDe: 'canton du Valais',
    primeMoyenne: 412,
    economiePossible: "jusqu'à 68 CHF/mois",
    subsidesPct: '26%',
    topCaisses: [
      { name: 'Assura', prime: 318 },
      { name: 'KPT', prime: 328 },
      { name: 'Visana', prime: 336 },
    ],
    subside: {
      seuilRevenu: '46 000 CHF/an',
      subsideMensuel: '148 CHF',
      demandeVia: 'formulaire VS.ch en ligne',
    },
  },
  {
    slug: 'neuchatel',
    name: 'Neuchâtel',
    cantonDe: 'canton de Neuchâtel',
    primeMoyenne: 445,
    economiePossible: "jusqu'à 81 CHF/mois",
    subsidesPct: '29%',
    topCaisses: [
      { name: 'Assura', prime: 348 },
      { name: 'KPT', prime: 361 },
      { name: 'Groupe Mutuel', prime: 369 },
    ],
    subside: {
      seuilRevenu: '50 000 CHF/an',
      subsideMensuel: '162 CHF',
      demandeVia: 'formulaire NE.ch en ligne',
    },
  },
  {
    slug: 'jura',
    name: 'Jura',
    cantonDe: 'canton du Jura',
    primeMoyenne: 378,
    economiePossible: "jusqu'à 61 CHF/mois",
    subsidesPct: '22%',
    topCaisses: [
      { name: 'Assura', prime: 298 },
      { name: 'Groupe Mutuel', prime: 308 },
      { name: 'CSS', prime: 315 },
    ],
    subside: {
      seuilRevenu: '44 000 CHF/an',
      subsideMensuel: '138 CHF',
      demandeVia: 'formulaire JU.ch en ligne',
    },
  },
]

export const cantonBySlug: Record<string, Canton> = Object.fromEntries(
  cantons.map((c) => [c.slug, c])
)

export const allCantons = cantons
export default cantons
