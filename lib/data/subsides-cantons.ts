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

// Modèle LU/UR : calcul proportionnel (subside = Richtprämien − Selbstbehalt)
//
// Deux variantes de Selbstbehalt :
//   LU (variable) : (partFixePct + coeffVariable × revenuDet) × revenuDet / 100
//   UR (plat)     : selbstbehaltPct × revenuDet / 100
export interface SubsideFormule {
  type:                      'proportionnel'
  // ── Selbstbehalt (quote-part propre) ──────────────────────────────────────
  partFixePct?:              number   // LU: 10.0 — composante fixe (%)
  coeffVariable?:            number   // LU: 0.00006 — pts % par CHF de revenu
  selbstbehaltPct?:          number   // UR/SZ: taux plat (%)
  // OW : Selbstbehalt progressif au-delà d'un seuil
  // taux = selbstbehaltPct + max(0, revenu − selbstbehaltProgressifSeuil) / 100 × selbstbehaltProgressifIncrPour100
  selbstbehaltProgressifSeuil?:        number   // OW: 35 000 — revenu à partir duquel le taux monte
  selbstbehaltProgressifIncrPour100?:  number   // OW: 0.01 — pts % ajoutés par CHF 100 au-dessus du seuil
  // GL : Selbstbehalt par tranches (barème en escalier)
  selbstbehaltTranches?: {
    revenuMaxAn: number   // borne supérieure de la tranche (utiliser Infinity pour la dernière)
    tauxPct:     number   // taux Selbstbehalt applicable dans cette tranche (%)
  }[]
  // ZG : réduction progressive du subside calculé entre deux seuils de revenu
  // Au-delà de seuilHaut, le droit s'éteint complètement.
  // réduction = reductionPctPar100 % par CHF 100 de revenu au-dessus de seuilBas
  reductionProgressive?: {
    seuilBas:           number   // ZG: 70 000 — revenu à partir duquel la réduction démarre
    seuilHaut:          number   // ZG: 89 900 — revenu au-delà duquel plus de droit
    reductionPctPar100: number   // ZG: 0.5 — % de réduction du subside par CHF 100 au-dessus
  }
  // ── Fortune ───────────────────────────────────────────────────────────────
  coeffFortune:              number   // LU: 0.10 / UR: 0.15 — part de fortune ajoutée au revenu
  // ── Seuil revenu au-delà duquel les minima garantis enfants/JA n'existent plus ──
  obergrenzeEinkommen?:      number   // UR: 90 000
  // ── Primes de référence : % entrant dans le pool anrechenbare ─────────────
  pctRichtprämieEnfant:      number   // LU: 80 / UR: 20 (anrechenbare) + 80 garanti
  pctRichtprämieJAFormation: number   // LU: 50 / UR: 50
  // ── Minima garantis (appliqués si revenu ≤ obergrenzeEinkommen) ───────────
  pctFixeEnfant?:            number   // UR: 80 — subside minimum garanti enfant (%)
  pctFixeJAFormation?:       number   // UR: 50 — subside minimum garanti JA formation (%)
  // ── Seuils LU pour prime enfant fixe ─────────────────────────────────────
  seuilEnfantSeulParent?:    number
  seuilEnfantDeuxParents?:   number
  // ── Freibeträge : abattements sur la fortune avant application du coefficient ──
  freibetraegeVermogen?: {
    label:   string
    montant: number
  }[]
  // ── Höchsteinkommen (SZ) : seuils revenu par composition du ménage ────────
  // valeurs minimales (Mietzinsregion la moins chère, enfants < 11 ans) ;
  // les seuils réels peuvent être plus élevés selon région et âge des enfants
  hoechsteinkommen?: {
    statut:                     'seul' | 'couple'
    enfants:                    number
    revenuMaxAn:                number   // seuil général d'éligibilité
    revenuMaxAnGarantiEnfant?:  number   // seuil élargi pour minima garantis enfants/JA
    augmentationParJAFormation?: number  // CHF ajoutés par JA en formation
  }[]
  // ── Primes de référence annuelles par région ──────────────────────────────
  richtprämienAn: {
    region:                      string
    adulte:                      number
    jeuneAdulteHorsFormation?:   number   // UR: catégorie 19–25 hors formation
    jeuneAdulteFormation:        number
    enfant:                      number
  }[]
  // ── Composantes du revenu déterminant ─────────────────────────────────────
  composantesRevenu: {
    label:    string
    ziffer?:  string
    signe:    '+' | '-'
  }[]
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
  limiteFortuneParEnfant?: number    // majoration de la limite par enfant/JA en formation
  // Modèle ZH : seuils de revenu au-delà desquels le droit s'éteint
  seuilsRevenu?:        SubsideSeuil[]
  // Modèle BE : barème montant par tranche de revenu déterminant
  montantsSubside?:     SubsideMontant[]
  // Déductions sociales pour calcul du revenu déterminant (modèle BE)
  deductionsSociales?:  DeductionSociale[]
  // Modèle LU : formule proportionnelle
  formule?:             SubsideFormule
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

  /* ─── LUCERNE (LU) ────────────────────────────────────────────────────── */
  // Sources : https://www.was-luzern.ch/praemienverbilligung
  //           AK_Merkblatt_IPV_0.pdf (Merkblatt Nr. 02/25, août 2025)
  //           AK_IPV_Merkblatt_Berechnungsbeispiel_2026.pdf
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle :
  //   Revenu déterminant = Nettoeinkommen + 10 % Reinvermögen + Aufrechnungen − Abzüge
  //   Subside = Σ Richtprämien (adulte:100%, enfant:80%, JA formation:50%)
  //             − quote-part propre (10% + 0,00006 × revenu) × revenu
  //
  // Richtprämien 2026 (Regierungsrat) non publiées en CHF dans les documents
  // disponibles — le montant effectif varie selon la prime de référence régionale.
  {
    code:         'LU',
    nom:          'Lucerne',
    automatique:  false,
    nbRegions:    3,
    lienOfficiel: 'https://www.was-luzern.ch/praemienverbilligung',
    annee:        2026,
    delaiDemande: '31 octobre 2025',
    limiteFortuneSeul:      100_000,
    limiteFortuneCouple:    200_000,
    limiteFortuneParEnfant:  50_000,   // majoration par enfant ou JA en formation
    noteGenerale: 'Demande annuelle obligatoire avant le 31 octobre. Pas de rétroactivité (droit au mois suivant la demande si tardive). Versement direct à la caisse maladie. Recalcul possible si revenus baissent de plus de 25 % ou naissance.',
    formule: {
      type:                      'proportionnel',
      partFixePct:               10,
      coeffVariable:             0.00006,
      coeffFortune:              0.10,
      pctRichtprämieEnfant:      80,
      pctRichtprämieJAFormation: 50,
      seuilEnfantSeulParent:     77_114,
      seuilEnfantDeuxParents:    96_392,
      // Richtprämien 2026 — source : was-luzern.ch/berechnung-ipv
      // NB : pour les enfants, anrechenbare Prämie = 80 % × Richtprämie enfant
      //      pour JA en formation, anrechenbare Prämie = 50 % × Richtprämie JA formation
      richtprämienAn: [
        { region: '1', adulte: 5_628, jeuneAdulteFormation: 4_044, enfant: 1_308 },
        { region: '2', adulte: 5_304, jeuneAdulteFormation: 3_780, enfant: 1_224 },
        { region: '3', adulte: 5_100, jeuneAdulteFormation: 3_660, enfant: 1_176 },
      ],
      composantesRevenu: [
        { label: 'Revenu net (Nettoeinkommen)',                              ziffer: '310', signe: '+' },
        { label: 'Cotisations pilier 3a',                                   ziffer: '260+261', signe: '+' },
        { label: 'Pertes commerciales reportables des années précédentes',  ziffer: '290', signe: '+' },
        { label: '10 % du Reinvermögen (fortune nette)',                    ziffer: '470 × 10 %', signe: '+' },
        { label: 'Frais maladie, accident et invalidité déductibles',       ziffer: '320', signe: '-' },
        { label: 'Déduction par enfant (Freibetrag)',                       ziffer: 'CHF 9\'000/enfant', signe: '-' },
      ],
    },
  },

  /* ─── URI (UR) ────────────────────────────────────────────────────────── */
  // Sources : https://www.svsuri.ch/dienstleistungen/prämienverbilligung-ipv
  //           SVS.Uri_Antrag.Praemienverbilligung.2026.pdf
  //           SVS.Uri.IPV.Berechnungsformular_2026.xlsx (données extraites)
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle (Selbstbehalt plat 8,5 %) :
  //   PV-Einkommen = Nettoeinkünfte + 15 % × Reinvermögen − déductions
  //   Subside = Σ anrechenbare Prämien − 8,5 % × PV-Einkommen + minima garantis
  //   Si PV-Einkommen ≤ 90 000 : enfants → 80 % fixe garanti + 20 % anrechenbare
  //                               JA en formation → 50 % fixe garanti + 50 % anrechenbare
  {
    code:         'UR',
    nom:          'Uri',
    automatique:  false,
    nbRegions:    1,
    lienOfficiel: 'https://www.svsuri.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    annee:        2026,
    delaiDemande: '31 décembre 2026',
    noteGenerale: 'Demande annuelle par formulaire papier ou en ligne. Base de calcul : dernière taxation fiscale valide (max 4 ans). Retraités Ergänzungsleistungen AHV/IV : subside automatique via EL.',
    formule: {
      type:                    'proportionnel',
      selbstbehaltPct:         8.5,
      coeffFortune:            0.15,
      obergrenzeEinkommen:     90_000,
      // Si PV-Einkommen ≤ 90 000 : 20 % entre dans le pool, 80 % = minimum garanti
      pctRichtprämieEnfant:    20,
      pctFixeEnfant:           80,
      // Si PV-Einkommen ≤ 90 000 : 50 % dans le pool, 50 % = minimum garanti
      pctRichtprämieJAFormation: 50,
      pctFixeJAFormation:      50,
      // Richtprämien 2026 — région unique (source : Berechnungsformular_2026.xlsx)
      richtprämienAn: [
        {
          region:                    'unique',
          adulte:                    4_368,
          jeuneAdulteHorsFormation:  2_844,
          jeuneAdulteFormation:      2_844,
          enfant:                    1_104,
        },
      ],
      // Composantes du PV-Einkommen (massgebendes Einkommen)
      composantesRevenu: [
        { label: 'Revenus (hors immobilier)',                               ziffer: '1000–1700', signe: '+' },
        { label: 'Déductions rentes prévoyance (à réintégrer)',             ziffer: 'annexe',    signe: '+' },
        { label: 'Valeur locative logement propre',                         ziffer: '1800',      signe: '+' },
        { label: 'Revenus locatifs et fermages',                            ziffer: '1820',      signe: '+' },
        { label: 'Produit droit d\'habitation / usufruit',                  ziffer: '1830+1840', signe: '+' },
        { label: 'Entretien immeuble',                                      ziffer: '2460',      signe: '-' },
        { label: 'Intérêts passifs',                                        ziffer: '2500',      signe: '-' },
        { label: 'Frais professionnels',                                    ziffer: '2010–2340', signe: '-' },
        { label: 'Frais de formation professionnelle',                      ziffer: '2880+2890', signe: '-' },
        { label: 'Contributions d\'entretien versées',                      ziffer: '2540–2560', signe: '-' },
        { label: 'Frais maladie et accident',                               ziffer: '3440',      signe: '-' },
        { label: 'Frais liés au handicap',                                  ziffer: '3460',      signe: '-' },
        { label: '15 % de la fortune imposable (Reinvermögen)',             ziffer: '4800 × 15 %', signe: '+' },
      ],
    },
  },

  /* ─── SCHWYZ (SZ) ────────────────────────────────────────────────────── */
  // Sources : https://www.sva-sz.ch/dienstleistungen/prämienverbilligung-ipv
  //           2026-Praemienverbilligung-Kanton-Schwyz.pdf (Merkblatt 16 p.)
  //           Grenzwerte-IPV-2026.pdf (Richtprämien + Höchsteinkommen 2026)
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle (Selbstbehalt plat 11 %) :
  //   Revenu déterminant = Reineinkommen (Code 820) + 10 % × (Reinvermögen − Freibetrag)
  //                        + rachats 2e pilier + entretien extraordinaire immeuble
  //   Subside = Σ Richtprämien − 11 % × revenu déterminant
  //   Minima garantis : enfants ≥ 80 % Richtprämie, JA formation ≥ 50 %
  {
    code:         'SZ',
    nom:          'Schwyz',
    automatique:  false,   // semi-auto : bénéficiaires 2025 réinscrits d'office ; rentiers EL auto
    nbRegions:    3,        // 3 Mietzinsregionen (affectent seuils, pas les Richtprämien)
    lienOfficiel: 'https://www.sva-sz.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
    annee:        2026,
    delaiDemande: '31 décembre 2026',
    limiteFortuneSeul:   250_000,
    limiteFortuneCouple: 500_000,
    noteGenerale: 'Bénéficiaires 2025 automatiquement réinscrits (confirmation envoyée). Rentiers avec EL AHV/IV : attribution automatique. Nouveaux candidats probables : formulaire envoyé d\'office. Les Höchsteinkommen indiqués sont les valeurs minimales (Mietzinsregion 3, enfants < 11 ans) ; les seuils réels peuvent être plus élevés selon région et âge des enfants. Subside plafonné aux primes effectives KVG. Minimum CHF 50/an, sinon pas de versement.',
    formule: {
      type:              'proportionnel',
      selbstbehaltPct:   11,
      coeffFortune:      0.10,
      pctRichtprämieEnfant:      80,   // minimum garanti
      pctFixeEnfant:             80,
      pctRichtprämieJAFormation: 50,   // minimum garanti
      pctFixeJAFormation:        50,
      // Freibeträge sur le Reinvermögen avant application du coefficient 10 %
      freibetraegeVermogen: [
        { label: 'Alleinstehende Person',             montant:  25_000 },
        { label: 'Ehepaar',                           montant:  50_000 },
        { label: 'Kind (bis 18 Jahre)',               montant:  15_000 },
        { label: 'Junge Erwachsene in Ausbildung',   montant:  15_000 },
      ],
      // Höchsteinkommen 2026 — valeurs minimales (Mietzinsregion 3, enfants < 11 ans)
      // Source : Grenzwerte-IPV-2026.pdf
      hoechsteinkommen: [
        // ── Seuil général d'éligibilité ─────────────────────────────────────
        { statut: 'seul',   enfants: 0, revenuMaxAn:  43_554, revenuMaxAnGarantiEnfant:  43_554, augmentationParJAFormation: 3_024 },
        { statut: 'seul',   enfants: 1, revenuMaxAn:  56_052, revenuMaxAnGarantiEnfant:  63_117, augmentationParJAFormation: 3_024 },
        { statut: 'seul',   enfants: 2, revenuMaxAn:  65_845, revenuMaxAnGarantiEnfant:  74_491, augmentationParJAFormation: 3_024 },
        { statut: 'seul',   enfants: 3, revenuMaxAn:  74_343, revenuMaxAnGarantiEnfant:  84_307, augmentationParJAFormation: 3_024 },
        { statut: 'seul',   enfants: 4, revenuMaxAn:  80_161, revenuMaxAnGarantiEnfant:  91_222, augmentationParJAFormation: 3_024 },
        { statut: 'couple', enfants: 0, revenuMaxAn:  63_573, revenuMaxAnGarantiEnfant:  63_573, augmentationParJAFormation: 3_024 },
        { statut: 'couple', enfants: 1, revenuMaxAn:  74_631, revenuMaxAnGarantiEnfant:  84_280, augmentationParJAFormation: 3_024 },
        { statut: 'couple', enfants: 2, revenuMaxAn:  84_184, revenuMaxAnGarantiEnfant:  95_414, augmentationParJAFormation: 3_024 },
        { statut: 'couple', enfants: 3, revenuMaxAn:  90_882, revenuMaxAnGarantiEnfant: 103_430, augmentationParJAFormation: 3_024 },
        { statut: 'couple', enfants: 4, revenuMaxAn:  96_700, revenuMaxAnGarantiEnfant: 110_345, augmentationParJAFormation: 3_024 },
      ],
      // Richtprämien 2026 = 90 % des Durchschnittsprämien — source : Grenzwerte-IPV-2026.pdf
      // NB : pas de variation régionale sur les Richtprämien ; les Mietzinsregionen
      //      n'affectent que les Höchsteinkommen (non modélisés ici en détail)
      richtprämienAn: [
        { region: 'unique', adulte: 5_583.60, jeuneAdulteFormation: 3_931.20, enfant: 1_285.20 },
      ],
      composantesRevenu: [
        { label: 'Reineinkommen (impôt fédéral direct)',            ziffer: '820',      signe: '+' },
        { label: '10 % du Reinvermögen après Freibetrag',          ziffer: '970 − FB', signe: '+' },
        { label: 'Rachats volontaires 2e pilier',                               signe: '+' },
        { label: 'Entretien extraordinaire d\'immeuble',                        signe: '+' },
      ],
    },
  },

  /* ─── OBWALD (OW) ────────────────────────────────────────────────────── */
  // Sources : https://www.akow.ch/dienstleistungen/praemienverbilligung
  //           IPV26_Merkblatt_2026-01.pdf (2 pages, stand janvier 2026)
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle avec Selbstbehalt PROGRESSIF :
  //   Selbstbehalt = 9.5 % jusqu'à CHF 35 000, puis + 0.01 % par CHF 100 supplémentaires
  //   Subside = Richtprämie − Selbstbehalt(revenu)
  //   Taux 2026 non encore confirmé (fixé par le canton en 1re moitié 2026)
  {
    code:         'OW',
    nom:          'Obwald',
    automatique:  false,   // invitation auto en nov. 2025 si éligible ; EL/Sozialhilfe = auto
    nbRegions:    1,
    lienOfficiel: 'https://www.akow.ch/dienstleistungen/praemienverbilligung',
    annee:        2026,
    delaiDemande: '31 mai 2026',   // délai de déchéance — passé ce délai, droit perdu
    noteGenerale: 'Délai de forclusion au 31 mai 2026 (non prorogeable). Taux Selbstbehalt 2026 fixé par le canton en première moitié 2026 (9.5 % = valeur 2025 indicative). À partir du 4e enfant : subside minimum 100 % de la Richtprämie (au lieu de 80 %). JA en formation : minimum 50 % si revenu < CHF 25 000. Imposés à la source : revenu = 75 % du revenu brut 2024.',
    formule: {
      type:                             'proportionnel',
      selbstbehaltPct:                  9.5,
      selbstbehaltProgressifSeuil:      35_000,
      selbstbehaltProgressifIncrPour100: 0.01,
      coeffFortune:                     0.10,
      // Seuils d'éligibilité globaux
      obergrenzeEinkommen:              50_000,   // sans enfants
      // Minima garantis enfants
      pctRichtprämieEnfant:             80,
      pctFixeEnfant:                    80,
      // Seuil élargi avec enfants : < 50 000 (80 % garanti) ; 4e enfant+ : 100 %
      // JA en formation : minimum 50 % si revenu < 25 000
      pctRichtprämieJAFormation:        50,
      pctFixeJAFormation:               50,
      seuilEnfantSeulParent:            50_000,   // revenu < 50k → 80 % garanti
      seuilEnfantDeuxParents:           50_000,
      // Richtprämien 2026 — région unique
      richtprämienAn: [
        { region: 'unique', adulte: 5_018.40, jeuneAdulteFormation: 3_570.00, enfant: 1_380.00 },
      ],
      // Composantes du revenu déterminant (anrechenbares Einkommen)
      composantesRevenu: [
        { label: 'Total des revenus',                                  ziffer: '1990', signe: '+' },
        { label: 'Frais professionnels (Berufsauslagen)',                              signe: '-' },
        { label: 'Contributions d\'entretien et charges durables',                     signe: '-' },
        { label: 'Déduction assurances (Versicherungsabzug)',                          signe: '-' },
        { label: 'Frais maladie, accident, invalidité',                                signe: '-' },
        { label: 'Frais de garde d\'enfants par des tiers',                            signe: '-' },
        { label: 'Intérêts passifs (≤ revenu immobilier)',                             signe: '-' },
        { label: 'Déduction couple marié (CHF 7 000)',                                 signe: '-' },
        { label: 'Déduction par enfant avec droit au subside (CHF 7 000/enfant)',      signe: '-' },
        { label: 'Pertes immobilières',                                                signe: '+' },
        { label: '10 % du patrimoine imposable (steuerbares Vermögen)',               signe: '+' },
      ],
    },
  },

  /* ─── NIDWALD (NW) ───────────────────────────────────────────────────── */
  // Sources : https://www.aknw.ch/dienstleistungen/praemienverbilligung-ipv
  //           Merkblatt-Praemienverbilligung-2026.pdf (2 pages, février 2026)
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle (Selbstbehalt plat 10 %) :
  //   Summe der Steuerwerte = Reineinkommen (Code 330) + aufrechnungen + 20 % × Reinvermögen (Code 470)
  //   Subside = Σ Richtprämien − 10 % × Steuerwerte
  //   NB : Richtprämien = Durchschnittsprämien fixées par le Regierungsrat (pas de réduction à 90 %)
  {
    code:         'NW',
    nom:          'Nidwald',
    automatique:  false,   // formulaire envoyé fin mars 2026 aux probables éligibles ; EL AHV/IV = auto
    nbRegions:    1,
    lienOfficiel: 'https://www.aknw.ch/dienstleistungen/praemienverbilligung-ipv',
    annee:        2026,
    delaiDemande: '30 avril 2026',   // délai de déchéance (Poststempel)
    noteGenerale: 'Rentiers EL AHV/IV : attribution automatique (prime moyenne versée directement). Minimum de versement CHF 100/an. Enfants : 80 % garanti si Steuerwerte des parents ≤ CHF 100 000 (besondere PV) ; si le droit général est plus élevé, c\'est lui qui s\'applique. JA en formation : 50 % garanti ; droit éteint si Reineinkommen du JA > CHF 30 240. Richtprämien = Durchschnittsprämien intégrales (non réduites à 90 %). Plafonné aux primes effectives KVG.',
    formule: {
      type:              'proportionnel',
      selbstbehaltPct:   10,
      coeffFortune:      0.20,   // 20 % du Reinvermögen — le plus élevé des cantons traités
      pctRichtprämieEnfant:      80,
      pctFixeEnfant:             80,
      seuilEnfantSeulParent:     100_000,   // Steuerwerte (= revenu + 20 % fortune) des parents
      seuilEnfantDeuxParents:    100_000,
      pctRichtprämieJAFormation: 50,
      pctFixeJAFormation:        50,
      // Richtprämien 2026 = Durchschnittsprämien fixées par le Regierungsrat (région unique)
      richtprämienAn: [
        { region: 'unique', adulte: 5_400, jeuneAdulteFormation: 3_912, enfant: 1_260 },
      ],
      // Composantes des Steuerwerte (Summe der Steuerwerte = revenu déterminant NW)
      composantesRevenu: [
        { label: 'Reineinkommen (taxation cantonale)',              ziffer: '330', signe: '+' },
        { label: 'Revenus procédure simplifiée (à réintégrer)',                   signe: '+' },
        { label: 'Rachat prévoyance professionnelle',                             signe: '+' },
        { label: 'Déductions procédure partielle (Teileinkünfte)',                signe: '+' },
        { label: 'Entretien immeuble net (− 15 % revenus immobiliers privés)',    signe: '+' },
        { label: '20 % du Reinvermögen',                           ziffer: '470', signe: '+' },
      ],
    },
  },

  /* ─── ZOUG (ZG) ──────────────────────────────────────────────────────── */
  // Sources : https://www.akzug.ch/dienstleistungen/praemienverbilligung
  //           Broschuere_IPV_2026.pdf (8 p., Ausgleichskasse Zug)
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle avec Selbstbehalt plat 8 % et réduction progressive :
  //   Subside = Σ Richtprämien − 8 % × massgebendes Einkommen
  //   Si revenu ∈ [70 000 ; 89 900] : subside × (1 − (revenu − 70 000) / 100 × 0.5 %)
  //   Si revenu > 89 900 : aucun droit
  //   Personnes seules / ménages à une seule personne adulte : Obergrenze inférieure (montant non publié dans la brochure)
  {
    code:         'ZG',
    nom:          'Zoug',
    automatique:  false,   // lettre d'invitation envoyée début fév. si éligible selon données fiscales ; EL/Sozialhilfe = auto
    nbRegions:    1,
    lienOfficiel: 'https://www.akzug.ch/dienstleistungen/praemienverbilligung',
    annee:        2026,
    delaiDemande: '30 avril 2026',
    noteGenerale: 'Minimum de versement : CHF 50/an. EL AHV/IV : attribution automatique. JA en formation (2001–2007) : inclus avec les parents si Kinderabzug accordé en 2024 (code 403) ; le revenu du JA est additionné. Couples concubins : enfants déclarés sur le formulaire de la mère. Personnes seules et ménages à une seule personne adulte : Grenzwerte inférieurs à 89 900 CHF (montants exacts non publiés dans la brochure). Entretien extraordinaire d\'immeuble dépassant 20 % des revenus locatifs imposables : excédent réintégré dans le revenu déterminant.',
    formule: {
      type:         'proportionnel',
      selbstbehaltPct: 8,
      coeffFortune: 0,   // non mentionné dans la brochure ; base = revenu imposable de la taxation 2024
      reductionProgressive: {
        seuilBas:           70_000,
        seuilHaut:          89_900,
        reductionPctPar100: 0.5,
      },
      pctRichtprämieEnfant:      80,
      pctFixeEnfant:             80,
      pctRichtprämieJAFormation: 50,
      pctFixeJAFormation:        50,
      // Richtprämien 2026 — source : Broschuere_IPV_2026.pdf p. 4
      richtprämienAn: [
        { region: 'unique', adulte: 4_984.80, jeuneAdulteFormation: 3_472.80, enfant: 1_224.00 },
      ],
      composantesRevenu: [
        { label: 'Revenu imposable (définitive Steuerveranlagung 2024)',     signe: '+' },
        { label: 'Entretien extraordinaire d\'immeuble (> 20 % rev. locatifs)', signe: '+' },
      ],
    },
  },

  /* ─── GLARIS (GL) ────────────────────────────────────────────────────── */
  // Sources : gl.ch (Merkblatt IPV 2026, 2 p., octobre 2025)
  //           suedostschweiz.ch/ipv-2026 (Richtprämien + barème Selbstbehalt 2026)
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle avec Selbstbehalt en tranches (barème en escalier) :
  //   AEK = Total revenus + 10 % Vermögen + charges immeuble + Nebenerwerbe
  //         − valeur locative − CHF 5 000/enfant − pensions alimentaires
  //   Subside = Σ Richtprämien − selbstbehalt(AEK) × AEK
  {
    code:         'GL',
    nom:          'Glaris',
    automatique:  false,   // formulaire envoyé fin nov. 2025 à tous les ménages ; EL/Sozialhilfe = auto
    nbRegions:    1,
    lienOfficiel: 'https://www.gl.ch/verwaltung/finanzen-und-gesundheit/steuern/individuelle-praemienverbilligung-ipv.html/502',
    annee:        2026,
    delaiDemande: '31 janvier 2026',   // tardif → IPV à partir du mois suivant l'entrée
    noteGenerale: 'EL/Sozialhilfe : attribution automatique. JA en formation inclus avec parents si Nettoerwerbseinkommen ≤ CHF 14 000 et Kinderabzug accordé ; sinon demande séparée. Richtprämien publiées dans l\'Amtsblatt et sur my.gl.ch. Minimum de versement non précisé. Plafonné aux primes effectives KVG.',
    formule: {
      type:          'proportionnel',
      coeffFortune:  0.10,
      // Selbstbehalt en tranches — source : suedostschweiz.ch/ipv-2026
      selbstbehaltTranches: [
        { revenuMaxAn:  40_000, tauxPct:  9 },
        { revenuMaxAn:  50_000, tauxPct: 10 },
        { revenuMaxAn:  60_000, tauxPct: 11 },
        { revenuMaxAn:  70_000, tauxPct: 12 },
        { revenuMaxAn:  80_000, tauxPct: 13 },
        { revenuMaxAn: Infinity, tauxPct: 14 },
      ],
      pctRichtprämieEnfant:      80,
      pctFixeEnfant:             80,
      seuilEnfantSeulParent:     85_000,
      seuilEnfantDeuxParents:    85_000,
      pctRichtprämieJAFormation: 50,
      pctFixeJAFormation:        50,
      // Richtprämien 2026 — source : suedostschweiz.ch/ipv-2026
      richtprämienAn: [
        { region: 'unique', adulte: 5_447, jeuneAdulteFormation: 3_896, enfant: 1_500 },
      ],
      // Composantes du revenu déterminant (anrechenbares Einkommen = AEK)
      composantesRevenu: [
        { label: 'Total des revenus (Einkünfte)',                                   signe: '+' },
        { label: '10 % du patrimoine imposable (steuerbares Vermögen)',            signe: '+' },
        { label: 'Frais d\'entretien d\'immeubles (Unterhaltskosten)',              signe: '+' },
        { label: 'Revenus annexes décomptés via AHV (Nebenerwerbe)',               signe: '+' },
        { label: 'Valeur locative du logement propre (Mietwert)',                  signe: '-' },
        { label: 'CHF 5 000 par enfant mineur',                                   signe: '-' },
        { label: 'Pensions alimentaires (ex-conjoint et enfants mineurs)',         signe: '-' },
      ],
    },
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
