// Source : FINMA — registre des entreprises d'assurance assujetties (vu.xlsx)
// Critère : branche B2 (maladie/Krankheit) autorisée, hors liquidation
// Mis à jour : mai 2026

export type CategorieAssureur =
  | 'assureur-maladie'    // Spécialiste santé, offre LAMal + complémentaires LCA
  | 'caisse-maladie'      // Petite caisse régionale, offre LAMal + complémentaires LCA
  | 'assureur-generaliste' // Assureur multi-branches proposant aussi de la complémentaire santé

export interface AssureurComplementaire {
  id: string              // slug URL
  nomFinma: string        // Nom officiel dans le registre FINMA
  nomCommercial: string   // Nom court utilisé commercialement
  categorie: CategorieAssureur
  pays: string            // Code ISO — 'CH' pour les entités suisses
  site?: string           // URL site web (à compléter au fur et à mesure)
}

export const assureursComplementaire: AssureurComplementaire[] = [
  // ─── Spécialistes santé (Assureurs-maladie) ───────────────────────────────
  {
    id: 'agrisano',
    nomFinma: 'Agrisano Versicherungen AG',
    nomCommercial: 'Agrisano',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.agrisano.ch',
  },
  {
    id: 'assura',
    nomFinma: 'Assura SA',
    nomCommercial: 'Assura',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.assura.ch',
  },
  {
    id: 'concordia',
    nomFinma: 'CONCORDIA Versicherungen AG',
    nomCommercial: 'Concordia',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.concordia.ch',
  },
  {
    id: 'css',
    nomFinma: 'CSS Versicherung AG',
    nomCommercial: 'CSS',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.css.ch',
  },
  {
    id: 'egk',
    nomFinma: 'EGK Privatversicherungen AG',
    nomCommercial: 'EGK',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.egk.ch',
  },
  {
    id: 'groupe-mutuel',
    nomFinma: 'Groupe Mutuel Assurances GMA SA',
    nomCommercial: 'Groupe Mutuel',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.groupemutuel.ch',
  },
  {
    id: 'helsana',
    nomFinma: 'Helsana Zusatzversicherungen AG',
    nomCommercial: 'Helsana',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.helsana.ch',
  },
  {
    id: 'innova',
    nomFinma: 'innova Versicherungen AG',
    nomCommercial: 'innova',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.innova.ch',
  },
  {
    id: 'kpt',
    nomFinma: 'KPT Versicherungen AG',
    nomCommercial: 'KPT',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.kpt.ch',
  },
  {
    id: 'okk',
    nomFinma: 'ÖKK Versicherungen AG',
    nomCommercial: 'ÖKK',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.oekk.ch',
  },
  {
    id: 'sanitas',
    nomFinma: 'Sanitas Privatversicherungen AG',
    nomCommercial: 'Sanitas',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.sanitas.com',
  },
  {
    id: 'slkk',
    nomFinma: 'Genossenschaft SLKK VERSICHERUNGEN',
    nomCommercial: 'SLKK',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.slkk.ch',
  },
  {
    id: 'swica',
    nomFinma: 'SWICA Versicherungen AG',
    nomCommercial: 'SWICA',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.swica.ch',
  },
  {
    id: 'sympany',
    nomFinma: 'Sympany Versicherungen AG',
    nomCommercial: 'Sympany',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.sympany.ch',
  },
  {
    id: 'visana',
    nomFinma: 'Visana Versicherungen AG',
    nomCommercial: 'Visana',
    categorie: 'assureur-maladie',
    pays: 'CH',
    site: 'https://www.visana.ch',
  },
  {
    id: 'bupa',
    nomFinma: 'Bupa Insurance Limited, London, Switzerland Branch Zurich',
    nomCommercial: 'Bupa',
    categorie: 'assureur-maladie',
    pays: 'GB',
    site: 'https://www.bupa.com',
  },
  {
    id: 'cigna',
    nomFinma: 'Cigna Europe Insurance Company S.A.-N.V., Antwerpen, Zweigniederlassung Zürich',
    nomCommercial: 'Cigna',
    categorie: 'assureur-maladie',
    pays: 'BE',
    site: 'https://www.cigna.ch',
  },

  // ─── Caisses maladie régionales ───────────────────────────────────────────
  {
    id: 'aquilana',
    nomFinma: 'Aquilana Versicherungen',
    nomCommercial: 'Aquilana',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.aquilana.ch',
  },
  {
    id: 'atupri',
    nomFinma: 'Atupri Gesundheitsversicherung AG',
    nomCommercial: 'Atupri',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.atupri.ch',
  },
  {
    id: 'kk-steffisburg',
    nomFinma: 'Genossenschaft Krankenkasse Steffisburg',
    nomCommercial: 'Krankenkasse Steffisburg',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.kksteff.ch',
  },
  {
    id: 'kk-luzerner-hinterland',
    nomFinma: 'Krankenkasse Luzerner Hinterland',
    nomCommercial: 'KK Luzerner Hinterland',
    categorie: 'caisse-maladie',
    pays: 'CH',
  },
  {
    id: 'rhenusana',
    nomFinma: 'rhenusana',
    nomCommercial: 'rhenusana',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.rhenusana.ch',
  },
  {
    id: 'sodalis',
    nomFinma: 'sodalis gesundheitsgruppe',
    nomCommercial: 'sodalis',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.sodalis.ch',
  },
  {
    id: 'kk-waedenswil',
    nomFinma: 'Stiftung Krankenkasse Wädenswil',
    nomCommercial: 'Krankenkasse Wädenswil',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.kkwaedenswil.ch',
  },
  {
    id: 'sumiswalder',
    nomFinma: 'Sumiswalder Krankenkasse',
    nomCommercial: 'Sumiswalder',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.sumiswalder.ch',
  },
  {
    id: 'vita-surselva',
    nomFinma: 'vita surselva',
    nomCommercial: 'vita surselva',
    categorie: 'caisse-maladie',
    pays: 'CH',
    site: 'https://www.vitasurselva.ch',
  },

  // ─── Assureurs généralistes (branche B2 autorisée) ───────────────────────
  {
    id: 'axa',
    nomFinma: 'AXA Versicherungen AG',
    nomCommercial: 'AXA',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.axa.ch',
  },
  {
    id: 'allianz',
    nomFinma: 'Allianz Suisse Versicherungs-Gesellschaft AG',
    nomCommercial: 'Allianz',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.allianz.ch',
  },
  {
    id: 'baloise',
    nomFinma: 'Baloise Versicherung AG',
    nomCommercial: 'Baloise',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.baloise.ch',
  },
  {
    id: 'generali',
    nomFinma: 'GENERALI Assurances Générales SA',
    nomCommercial: 'Generali',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.generali.ch',
  },
  {
    id: 'helvetia',
    nomFinma: 'Helvetia Schweizerische Versicherungsgesellschaft AG',
    nomCommercial: 'Helvetia',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.helvetia.com/ch',
  },
  {
    id: 'mobiliar',
    nomFinma: 'Schweizerische Mobiliar Versicherungsgesellschaft AG',
    nomCommercial: 'Mobiliar',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.mobiliar.ch',
  },
  {
    id: 'vaudoise',
    nomFinma: 'VAUDOISE GENERALE, Compagnie d\'Assurances SA',
    nomCommercial: 'Vaudoise',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.vaudoise.ch',
  },
  {
    id: 'zurich',
    nomFinma: 'Zürich Versicherungs-Gesellschaft AG',
    nomCommercial: 'Zurich',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.zurich.ch',
  },
  {
    id: 'chubb',
    nomFinma: 'Chubb Versicherungen (Schweiz) AG',
    nomCommercial: 'Chubb',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.chubb.com/ch',
  },
  {
    id: 'hotela',
    nomFinma: 'HOTELA ASSURANCES SA',
    nomCommercial: 'Hotela',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.hotela.ch',
  },
  {
    id: 'solida',
    nomFinma: 'Solida Versicherungen AG',
    nomCommercial: 'Solida',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.solida.ch',
  },
  {
    id: 'swiss-post-insurance',
    nomFinma: 'Swiss Post Insurance AG',
    nomCommercial: 'Swiss Post Insurance',
    categorie: 'assureur-generaliste',
    pays: 'CH',
  },
  {
    id: 'branchen-versicherung',
    nomFinma: 'Branchen Versicherung Genossenschaft',
    nomCommercial: 'Branchen Versicherung',
    categorie: 'assureur-generaliste',
    pays: 'CH',
    site: 'https://www.bvg-versicherung.ch',
  },
  {
    id: 'aig',
    nomFinma: 'AIG Europe S.A., Luxemburg, Zweigniederlassung Opfikon',
    nomCommercial: 'AIG',
    categorie: 'assureur-generaliste',
    pays: 'LU',
    site: 'https://www.aig.ch',
  },
  {
    id: 'awp',
    nomFinma: 'AWP P&C S.A., Saint-Ouen (Paris), succursale de Wallisellen (Suisse)',
    nomCommercial: 'Allianz Partners (AWP)',
    categorie: 'assureur-generaliste',
    pays: 'FR',
    site: 'https://www.allianz-partners.com',
  },
  {
    id: 'uniqa',
    nomFinma: 'UNIQA Österreich Versicherungen AG, Wien, Zweigniederlassung Zürich',
    nomCommercial: 'UNIQA',
    categorie: 'assureur-generaliste',
    pays: 'AT',
    site: 'https://www.uniqa.ch',
  },
  {
    id: 'si-insurance',
    nomFinma: 'SI Insurance (Europe), SA, Luxembourg, Zweigniederlassung Zürich',
    nomCommercial: 'SI Insurance',
    categorie: 'assureur-generaliste',
    pays: 'LU',
  },
  {
    id: 'protect',
    nomFinma: 'ProTect Versicherung Aktiengesellschaft, Düsseldorf, Zweigniederlassung Cham',
    nomCommercial: 'ProTect',
    categorie: 'assureur-generaliste',
    pays: 'DE',
  },
  {
    id: 'xl-insurance',
    nomFinma: 'XL Insurance Company SE, Dublin, Zweigniederlassung Zürich',
    nomCommercial: 'XL Insurance',
    categorie: 'assureur-generaliste',
    pays: 'IE',
  },
]

// Helpers
export const specialistesSante = assureursComplementaire.filter(
  (a) => a.categorie === 'assureur-maladie' || a.categorie === 'caisse-maladie'
)

export const assureursGeneralistes = assureursComplementaire.filter(
  (a) => a.categorie === 'assureur-generaliste'
)

export const assureursSuisses = assureursComplementaire.filter(
  (a) => a.pays === 'CH'
)
