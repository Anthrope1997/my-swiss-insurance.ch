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
    primeMoyenne: 638,
    economiePossible: "jusqu'à CHF 1'863/an",
    subsidesPct: '28%',
    topCaisses: [
      { name: 'Galenos', prime: 557 },
      { name: 'Assura', prime: 573 },
      { name: 'Atupri', prime: 575 },
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
    primeMoyenne: 710,
    economiePossible: "jusqu'à CHF 2'753/an",
    subsidesPct: '31%',
    topCaisses: [
      { name: 'Assura', prime: 634 },
      { name: 'Vivao Sympany', prime: 646 },
      { name: 'ÖKK', prime: 655 },
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
    primeMoyenne: 522,
    economiePossible: "jusqu'à CHF 1'099/an",
    subsidesPct: '24%',
    topCaisses: [
      { name: 'ÖKK', prime: 489 },
      { name: 'Aquilana', prime: 490 },
      { name: 'SLKK', prime: 491 },
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
    primeMoyenne: 528,
    economiePossible: "jusqu'à CHF 1'958/an",
    subsidesPct: '26%',
    topCaisses: [
      { name: 'Visperterminen', prime: 433 },
      { name: 'ÖKK', prime: 441 },
      { name: 'Sodalis', prime: 441 },
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
    primeMoyenne: 663,
    economiePossible: "jusqu'à CHF 1'747/an",
    subsidesPct: '29%',
    topCaisses: [
      { name: 'Helsana', prime: 610 },
      { name: 'Atupri', prime: 618 },
      { name: 'Assura', prime: 621 },
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
    primeMoyenne: 633,
    economiePossible: "jusqu'à CHF 1'390/an",
    subsidesPct: '22%',
    topCaisses: [
      { name: 'Atupri', prime: 592 },
      { name: 'Agrisano', prime: 595 },
      { name: 'ÖKK', prime: 599 },
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
