import { produits as assuraProduits } from './assureurs/assura'
import { produits as swicaProduits } from './assureurs/swica'
import { produits as cssProduits } from './assureurs/css'
import { produits as concordiaProduits } from './assureurs/concordia'
import { produits as groupeMutuelProduits } from './assureurs/groupe-mutuel'
import { produits as helsanaProduits } from './assureurs/helsana'
import { produits as sanitasProduits } from './assureurs/sanitas'
import { produits as kptProduits } from './assureurs/kpt'
import { produits as okkProduits } from './assureurs/okk'
import { produits as sympanyProduits } from './assureurs/sympany'
import { produits as visanaProduits } from './assureurs/visana'
import { produits as atupriProduits } from './assureurs/atupri'
import { produits as aquilanaProduits } from './assureurs/aquilana'
import { produits as agrisanoProduits } from './assureurs/agrisano'
import { produits as egkProduits } from './assureurs/egk'
import { produits as sumiswaldeProduits } from './assureurs/sumiswalder'
import { produits as rhenusanaProduits } from './assureurs/rhenusana'
import { produits as sodalisProduits } from './assureurs/sodalis'
import { produits as slkkProduits } from './assureurs/slkk'
import { produits as axaProduits } from './assureurs/axa'
import { produits as innovaProduits } from './assureurs/innova'
import { produits as vitaSurselvasProduits } from './assureurs/vita-surselva'
import type { ProduitComplementaire, FamilleComplementaire } from './types'

export * from './types'
export * from './assureurs'

export const tousLesProduits: ProduitComplementaire[] = [
  ...assuraProduits,
  ...swicaProduits,
  ...cssProduits,
  ...concordiaProduits,
  ...groupeMutuelProduits,
  ...helsanaProduits,
  ...sanitasProduits,
  ...kptProduits,
  ...okkProduits,
  ...sympanyProduits,
  ...visanaProduits,
  ...atupriProduits,
  ...aquilanaProduits,
  ...agrisanoProduits,
  ...egkProduits,
  ...sumiswaldeProduits,
  ...rhenusanaProduits,
  ...sodalisProduits,
  ...slkkProduits,
  ...axaProduits,
  ...innovaProduits,
  ...vitaSurselvasProduits,
]

export function produitsByAssureur(assureurId: string): ProduitComplementaire[] {
  return tousLesProduits.filter((p) => p.assureurId === assureurId)
}

export function produitsByFamille(famille: FamilleComplementaire): ProduitComplementaire[] {
  return tousLesProduits.filter(
    (p) => p.famille === famille || p.familles?.includes(famille)
  )
}

export function produitsByBesoin(besoinId: string): ProduitComplementaire[] {
  const { BESOINS_SANTE } = require('./types')
  const besoin = BESOINS_SANTE.find((b: { id: string }) => b.id === besoinId)
  if (!besoin) return []
  return produitsByFamille(besoin.familles[0])
}
