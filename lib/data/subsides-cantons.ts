// ─────────────────────────────────────────────────────────────────────────────
// Subsides LAMal par canton — données officielles scrapées
//
// Source : sites cantonaux officiels (voir lienOfficiel par canton)
// Profil de référence : adulte 35 ans, sans enfant, sauf mention contraire
//
// Légende profil :
//   adulte         = 26 ans et plus
//   jeune_adulte   = 18 à 25 ans
//
// Légende statut :
//   seul           = célibataire / monoparental
//   couple         = marié ou partenaire enregistré
// ─────────────────────────────────────────────────────────────────────────────

export interface SubsideSeuil {
  statut:  'seul' | 'couple'
  profil:  'adulte' | 'jeune_adulte'
  enfants: number          // 0 | 1 | 2 | 3
  region:  string          // '1' | '2' | '3' | 'unique'
  revenuMaxAn: number      // CHF/an (revenu déterminant)
}

export interface SubsideCantonData {
  code:           string          // 'ZH', 'BE', etc.
  nom:            string
  automatique:    boolean         // true = attribution sans demande
  nbRegions:      number
  lienOfficiel:   string
  annee:          number          // 2026
  delaiDemande?:  string          // ex. '31 mars 2027'
  limiteFortuneSeul?:   number   // CHF — fortune max pour avoir droit
  limiteFortuneCouple?: number
  seuilsRevenu:   SubsideSeuil[]
  noteGenerale?:  string
}

const subsidesCantons: SubsideCantonData[] = [

  /* ─── ZURICH (ZH) ─────────────────────────────────────────────────────── */
  // Source : https://svazurich.ch/ihr-anliegen/privatpersonen/praemienverbilligung/
  //          praemienverbilligung_2026/einkommensgrenzen-2026.html
  // Scrapé le 23 avril 2026
  {
    code:         'ZH',
    nom:          'Zurich',
    automatique:  false,
    nbRegions:    3,
    lienOfficiel: 'https://svazurich.ch/ihr-anliegen/privatpersonen/praemienverbilligung/praemienverbilligung_2026/einkommensgrenzen-2026.html',
    annee:        2026,
    delaiDemande: '31 mars 2027',
    limiteFortuneSeul:   150_000,
    limiteFortuneCouple: 300_000,
    seuilsRevenu: [
      // ── Personnes seules ── Région 1
      { statut: 'seul', profil: 'jeune_adulte', enfants: 0, region: '1', revenuMaxAn:  45_900 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 1, region: '1', revenuMaxAn:  70_500 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 2, region: '1', revenuMaxAn:  76_700 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 3, region: '1', revenuMaxAn:  92_100 },
      { statut: 'seul', profil: 'adulte',       enfants: 0, region: '1', revenuMaxAn:  64_000 },
      { statut: 'seul', profil: 'adulte',       enfants: 1, region: '1', revenuMaxAn:  79_400 },
      { statut: 'seul', profil: 'adulte',       enfants: 2, region: '1', revenuMaxAn:  94_800 },
      { statut: 'seul', profil: 'adulte',       enfants: 3, region: '1', revenuMaxAn: 110_200 },
      // ── Personnes seules ── Région 2
      { statut: 'seul', profil: 'jeune_adulte', enfants: 0, region: '2', revenuMaxAn:  42_000 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 1, region: '2', revenuMaxAn:  70_500 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 2, region: '2', revenuMaxAn:  70_500 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 3, region: '2', revenuMaxAn:  84_000 },
      { statut: 'seul', profil: 'adulte',       enfants: 0, region: '2', revenuMaxAn:  58_400 },
      { statut: 'seul', profil: 'adulte',       enfants: 1, region: '2', revenuMaxAn:  72_400 },
      { statut: 'seul', profil: 'adulte',       enfants: 2, region: '2', revenuMaxAn:  86_400 },
      { statut: 'seul', profil: 'adulte',       enfants: 3, region: '2', revenuMaxAn: 100_400 },
      // ── Personnes seules ── Région 3
      { statut: 'seul', profil: 'jeune_adulte', enfants: 0, region: '3', revenuMaxAn:  38_900 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 1, region: '3', revenuMaxAn:  70_500 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 2, region: '3', revenuMaxAn:  70_500 },
      { statut: 'seul', profil: 'jeune_adulte', enfants: 3, region: '3', revenuMaxAn:  77_900 },
      { statut: 'seul', profil: 'adulte',       enfants: 0, region: '3', revenuMaxAn:  54_400 },
      { statut: 'seul', profil: 'adulte',       enfants: 1, region: '3', revenuMaxAn:  70_500 },
      { statut: 'seul', profil: 'adulte',       enfants: 2, region: '3', revenuMaxAn:  80_400 },
      { statut: 'seul', profil: 'adulte',       enfants: 3, region: '3', revenuMaxAn:  93_400 },
      // ── Couples ── Région 1
      { statut: 'couple', profil: 'jeune_adulte', enfants: 0, region: '1', revenuMaxAn:  73_440 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 1, region: '1', revenuMaxAn:  85_760 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 2, region: '1', revenuMaxAn:  98_080 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 3, region: '1', revenuMaxAn: 110_400 },
      { statut: 'couple', profil: 'adulte',       enfants: 0, region: '1', revenuMaxAn: 102_400 },
      { statut: 'couple', profil: 'adulte',       enfants: 1, region: '1', revenuMaxAn: 114_720 },
      { statut: 'couple', profil: 'adulte',       enfants: 2, region: '1', revenuMaxAn: 127_040 },
      { statut: 'couple', profil: 'adulte',       enfants: 3, region: '1', revenuMaxAn: 139_360 },
      // ── Couples ── Région 2
      { statut: 'couple', profil: 'jeune_adulte', enfants: 0, region: '2', revenuMaxAn:  67_200 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 1, region: '2', revenuMaxAn:  78_400 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 2, region: '2', revenuMaxAn:  89_600 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 3, region: '2', revenuMaxAn: 100_800 },
      { statut: 'couple', profil: 'adulte',       enfants: 0, region: '2', revenuMaxAn:  93_440 },
      { statut: 'couple', profil: 'adulte',       enfants: 1, region: '2', revenuMaxAn: 104_640 },
      { statut: 'couple', profil: 'adulte',       enfants: 2, region: '2', revenuMaxAn: 115_840 },
      { statut: 'couple', profil: 'adulte',       enfants: 3, region: '2', revenuMaxAn: 127_040 },
      // ── Couples ── Région 3
      { statut: 'couple', profil: 'jeune_adulte', enfants: 0, region: '3', revenuMaxAn:  62_240 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 1, region: '3', revenuMaxAn:  72_640 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 2, region: '3', revenuMaxAn:  83_040 },
      { statut: 'couple', profil: 'jeune_adulte', enfants: 3, region: '3', revenuMaxAn:  93_440 },
      { statut: 'couple', profil: 'adulte',       enfants: 0, region: '3', revenuMaxAn:  87_040 },
      { statut: 'couple', profil: 'adulte',       enfants: 1, region: '3', revenuMaxAn:  97_440 },
      { statut: 'couple', profil: 'adulte',       enfants: 2, region: '3', revenuMaxAn: 107_840 },
      { statut: 'couple', profil: 'adulte',       enfants: 3, region: '3', revenuMaxAn: 118_240 },
    ],
    noteGenerale: 'Versement direct à la caisse maladie. Demande en ligne via eAdminportal SVA Zürich. Délai de traitement jusqu\'à 6 mois.',
  },

]

export default subsidesCantons

// ─── Helper : récupérer les données d'un canton par code ────────────────────
export function getSubsidesCantonByCode(code: string): SubsideCantonData | undefined {
  return subsidesCantons.find(c => c.code === code)
}

// ─── Helper : seuil applicable à un profil donné ────────────────────────────
export function getSeuilRevenu(
  code: string,
  opts: { statut: 'seul' | 'couple'; profil: 'adulte' | 'jeune_adulte'; enfants: number; region: string },
): number | undefined {
  const canton = getSubsidesCantonByCode(code)
  if (!canton) return undefined
  return canton.seuilsRevenu.find(
    s => s.statut === opts.statut &&
         s.profil === opts.profil &&
         s.enfants === opts.enfants &&
         s.region === opts.region,
  )?.revenuMaxAn
}
