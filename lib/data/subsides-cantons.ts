// ─────────────────────────────────────────────────────────────────────────────
// Subsides LAMal par canton — données officielles scrapées
//
// Source : sites cantonaux officiels (voir lienOfficiel par canton)
// Profil de référence : adulte 35 ans, sans enfant, sauf mention contraire
//
// Légende profil :
//   adulte                       = 26 ans et plus
//   adulte_famille               = adulte dans famille avec enfants (seuil 45k)
//   jeune_adulte                 = 18–25 ans rattaché à famille ou couple
//   jeune_adulte_hors_famille    = 18–25 ans non rattaché, sans formation
//   jeune_adulte_formation       = 18–25 ans non rattaché, en formation
//   enfant                       = moins de 18 ans
//
// Légende statut :
//   seul    = célibataire / monoparental
//   couple  = marié ou partenaire enregistré
//
// Légende typeRevenu :
//   fiscal      = revenu fiscal ordinaire (ex. ZH)
//   determinant = revenu déterminant calculé selon schéma cantonal (ex. BE)
// ─────────────────────────────────────────────────────────────────────────────

export type ProfilSubside =
  | 'adulte'
  | 'adulte_famille'
  | 'jeune_adulte'
  | 'jeune_adulte_hors_famille'
  | 'jeune_adulte_formation'
  | 'enfant'

// Seuil d'éligibilité : revenu MAX pour avoir droit au subside (modèle ZH)
export interface SubsideSeuil {
  statut:      'seul' | 'couple'
  profil:      'adulte' | 'jeune_adulte'
  enfants:     number          // 0 | 1 | 2 | 3
  region:      string          // '1' | '2' | '3' | 'unique'
  revenuMaxAn: number          // CHF/an
}

// Montant de subside par tranche de revenu (modèle BE)
export interface SubsideMontant {
  region:       string         // '1' | '2' | '3' | 'unique'
  profil:       ProfilSubside
  revenuMaxAn:  number         // borne supérieure de la tranche (revenu déterminant)
  montantMois:  number         // CHF/mois accordés
}

// Déductions sociales pour le calcul du revenu déterminant (modèle BE)
export interface DeductionSociale {
  label:   string
  montant: number
}

export interface SubsideCantonData {
  code:              string
  nom:               string
  automatique:       boolean         // true = attribution sans demande
  nbRegions:         number
  lienOfficiel:      string
  annee:             number          // 2026
  delaiDemande?:        string
  limiteFortuneSeul?:   number
  limiteFortuneCouple?: number
  // Modèle ZH : seuils de revenu au-delà desquels le droit s'éteint
  seuilsRevenu?:        SubsideSeuil[]
  // Modèle BE : barème montant par tranche de revenu déterminant
  montantsSubside?:     SubsideMontant[]
  // Déductions sociales pour calcul du revenu déterminant (modèle BE)
  deductionsSociales?:  DeductionSociale[]
  noteGenerale?:        string
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

  /* ─── BERNE (BE) ──────────────────────────────────────────────────────── */
  // Sources : be.ch (pages subsides) + PDFs locaux
  //   Informationsblatt 2026_fr.pdf — règles d'éligibilité et automatisme
  //   Berechnungsschema 2026_fr.pdf — schéma de calcul + barème complet
  // Scrapé le 19 avril 2026
  {
    code:         'BE',
    nom:          'Berne',
    automatique:  true,
    nbRegions:    3,
    lienOfficiel: 'https://www.gef.be.ch/gef/fr/index/gesundheit/gesundheit/krankenversicherung/praemienverbilligung.html',
    annee:        2026,
    delaiDemande: '31 mars 2027',
    noteGenerale: 'Attribution automatique sur la base de la déclaration fiscale. Revenu déterminant = revenu net imposable corrigé + 5 % de la fortune corrigée − déductions sociales. Fortune corrigée = fortune déclarée − CHF 17\'000 par membre de la famille. Versement direct à la caisse maladie.',
    deductionsSociales: [
      { label: 'Déduction couple (mariage / partenariat enregistré)', montant: 13_000 },
      { label: 'Déduction monoparental',                              montant:  9_750 },
      { label: 'Déduction célibataire / seul',                       montant:  2_200 },
      { label: 'Déduction 1er enfant',                               montant: 15_000 },
      { label: 'Déduction 2e enfant',                                montant: 12_500 },
      { label: 'Déduction enfant supplémentaire (3e et suivants)',   montant: 10_000 },
    ],
    montantsSubside: [
      // ── Région 1 — Adultes (sans enfants, revenu déterminant ≤ 35 000) ─
      { region: '1', profil: 'adulte', revenuMaxAn:  9_000, montantMois: 221.00 },
      { region: '1', profil: 'adulte', revenuMaxAn: 17_000, montantMois: 147.00 },
      { region: '1', profil: 'adulte', revenuMaxAn: 25_000, montantMois: 107.00 },
      { region: '1', profil: 'adulte', revenuMaxAn: 35_000, montantMois:  67.00 },
      // ── Région 1 — Adultes avec enfants (revenu déterminant ≤ 45 000) ─
      { region: '1', profil: 'adulte_famille', revenuMaxAn:  9_000, montantMois: 221.00 },
      { region: '1', profil: 'adulte_famille', revenuMaxAn: 17_000, montantMois: 147.00 },
      { region: '1', profil: 'adulte_famille', revenuMaxAn: 25_000, montantMois: 107.00 },
      { region: '1', profil: 'adulte_famille', revenuMaxAn: 35_000, montantMois:  67.00 },
      { region: '1', profil: 'adulte_famille', revenuMaxAn: 45_000, montantMois:  33.50 },
      // ── Région 1 — Jeunes adultes rattachés à famille (18–25 ans) ──────
      { region: '1', profil: 'jeune_adulte',           revenuMaxAn: 25_000, montantMois: 239.25 },
      // ── Région 1 — Jeunes adultes en formation ─────────────────────────
      { region: '1', profil: 'jeune_adulte_formation', revenuMaxAn: 25_000, montantMois: 239.25 },
      // ── Région 1 — Jeunes adultes hors famille, sans formation ─────────
      { region: '1', profil: 'jeune_adulte_hors_famille', revenuMaxAn:  9_000, montantMois: 206.00 },
      { region: '1', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 17_000, montantMois: 138.00 },
      { region: '1', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 25_000, montantMois: 100.00 },
      { region: '1', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 35_000, montantMois:  63.00 },
      { region: '1', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 45_000, montantMois:  31.50 },
      // ── Région 1 — Enfants (< 18 ans) ─────────────────────────────────
      { region: '1', profil: 'enfant', revenuMaxAn: 45_000, montantMois: 119.30 },

      // ── Région 2 — Adultes ─────────────────────────────────────────────
      { region: '2', profil: 'adulte', revenuMaxAn:  9_000, montantMois: 196.00 },
      { region: '2', profil: 'adulte', revenuMaxAn: 17_000, montantMois: 132.00 },
      { region: '2', profil: 'adulte', revenuMaxAn: 25_000, montantMois:  96.00 },
      { region: '2', profil: 'adulte', revenuMaxAn: 35_000, montantMois:  60.00 },
      // ── Région 2 — Adultes avec enfants ───────────────────────────────
      { region: '2', profil: 'adulte_famille', revenuMaxAn:  9_000, montantMois: 196.00 },
      { region: '2', profil: 'adulte_famille', revenuMaxAn: 17_000, montantMois: 132.00 },
      { region: '2', profil: 'adulte_famille', revenuMaxAn: 25_000, montantMois:  96.00 },
      { region: '2', profil: 'adulte_famille', revenuMaxAn: 35_000, montantMois:  60.00 },
      { region: '2', profil: 'adulte_famille', revenuMaxAn: 45_000, montantMois:  30.00 },
      // ── Région 2 — Jeunes adultes rattachés / formation ────────────────
      { region: '2', profil: 'jeune_adulte',           revenuMaxAn: 25_000, montantMois: 214.15 },
      { region: '2', profil: 'jeune_adulte_formation', revenuMaxAn: 25_000, montantMois: 214.15 },
      // ── Région 2 — Jeunes adultes hors famille, sans formation ─────────
      { region: '2', profil: 'jeune_adulte_hors_famille', revenuMaxAn:  9_000, montantMois: 183.00 },
      { region: '2', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 17_000, montantMois: 124.00 },
      { region: '2', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 25_000, montantMois:  90.00 },
      { region: '2', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 35_000, montantMois:  56.00 },
      { region: '2', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 45_000, montantMois:  28.00 },
      // ── Région 2 — Enfants ─────────────────────────────────────────────
      { region: '2', profil: 'enfant', revenuMaxAn: 45_000, montantMois: 106.00 },

      // ── Région 3 — Adultes ─────────────────────────────────────────────
      { region: '3', profil: 'adulte', revenuMaxAn:  9_000, montantMois: 183.00 },
      { region: '3', profil: 'adulte', revenuMaxAn: 17_000, montantMois: 123.00 },
      { region: '3', profil: 'adulte', revenuMaxAn: 25_000, montantMois:  89.00 },
      { region: '3', profil: 'adulte', revenuMaxAn: 35_000, montantMois:  56.00 },
      // ── Région 3 — Adultes avec enfants ───────────────────────────────
      { region: '3', profil: 'adulte_famille', revenuMaxAn:  9_000, montantMois: 183.00 },
      { region: '3', profil: 'adulte_famille', revenuMaxAn: 17_000, montantMois: 123.00 },
      { region: '3', profil: 'adulte_famille', revenuMaxAn: 25_000, montantMois:  89.00 },
      { region: '3', profil: 'adulte_famille', revenuMaxAn: 35_000, montantMois:  56.00 },
      { region: '3', profil: 'adulte_famille', revenuMaxAn: 45_000, montantMois:  28.00 },
      // ── Région 3 — Jeunes adultes rattachés / formation ────────────────
      { region: '3', profil: 'jeune_adulte',           revenuMaxAn: 25_000, montantMois: 200.30 },
      { region: '3', profil: 'jeune_adulte_formation', revenuMaxAn: 25_000, montantMois: 200.30 },
      // ── Région 3 — Jeunes adultes hors famille, sans formation ─────────
      { region: '3', profil: 'jeune_adulte_hors_famille', revenuMaxAn:  9_000, montantMois: 170.00 },
      { region: '3', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 17_000, montantMois: 116.00 },
      { region: '3', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 25_000, montantMois:  84.00 },
      { region: '3', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 35_000, montantMois:  52.00 },
      { region: '3', profil: 'jeune_adulte_hors_famille', revenuMaxAn: 45_000, montantMois:  26.00 },
      // ── Région 3 — Enfants ─────────────────────────────────────────────
      { region: '3', profil: 'enfant', revenuMaxAn: 45_000, montantMois:  99.35 },
    ],
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
  return canton.seuilsRevenu?.find(
    s => s.statut === opts.statut &&
         s.profil === opts.profil &&
         s.enfants === opts.enfants &&
         s.region === opts.region,
  )?.revenuMaxAn
}
