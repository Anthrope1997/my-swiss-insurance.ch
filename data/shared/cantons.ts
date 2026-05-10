export interface SharedCanton {
  code: string
  nom: string
  nomCourt?: string
  slug: string
}

export const CANTONS: SharedCanton[] = [
  { code: 'AG', nom: 'Argovie',                        slug: 'argovie' },
  { code: 'AI', nom: 'Appenzell Rhodes-Intérieures',   nomCourt: 'Appenzell Rh.-Int.', slug: 'appenzell-rhodes-interieures' },
  { code: 'AR', nom: 'Appenzell Rhodes-Extérieures',   nomCourt: 'Appenzell Rh.-Ext.', slug: 'appenzell-rhodes-exterieures' },
  { code: 'BE', nom: 'Berne',                           slug: 'berne' },
  { code: 'BL', nom: 'Bâle-Campagne',                  slug: 'bale-campagne' },
  { code: 'BS', nom: 'Bâle-Ville',                     slug: 'bale-ville' },
  { code: 'FR', nom: 'Fribourg',                        slug: 'fribourg' },
  { code: 'GE', nom: 'Genève',                          slug: 'geneve' },
  { code: 'GL', nom: 'Glaris',                          slug: 'glaris' },
  { code: 'GR', nom: 'Grisons',                         slug: 'grisons' },
  { code: 'JU', nom: 'Jura',                            slug: 'jura' },
  { code: 'LU', nom: 'Lucerne',                         slug: 'lucerne' },
  { code: 'NE', nom: 'Neuchâtel',                       slug: 'neuchatel' },
  { code: 'NW', nom: 'Nidwald',                         slug: 'nidwald' },
  { code: 'OW', nom: 'Obwald',                          slug: 'obwald' },
  { code: 'SG', nom: 'Saint-Gall',                      slug: 'saint-gall' },
  { code: 'SH', nom: 'Schaffhouse',                     slug: 'schaffhouse' },
  { code: 'SO', nom: 'Soleure',                         slug: 'soleure' },
  { code: 'SZ', nom: 'Schwyz',                          slug: 'schwyz' },
  { code: 'TG', nom: 'Thurgovie',                       slug: 'thurgovie' },
  { code: 'TI', nom: 'Tessin',                          slug: 'tessin' },
  { code: 'UR', nom: 'Uri',                             slug: 'uri' },
  { code: 'VD', nom: 'Vaud',                            slug: 'vaud' },
  { code: 'VS', nom: 'Valais',                          slug: 'valais' },
  { code: 'ZG', nom: 'Zoug',                            slug: 'zoug' },
  { code: 'ZH', nom: 'Zurich',                          slug: 'zurich' },
]

export const CANTON_NOMS = CANTONS.map(c => c.nom)
