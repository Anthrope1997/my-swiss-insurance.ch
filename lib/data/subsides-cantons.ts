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

// BS : barème lookup (22 groupes de revenus × 8 tailles de ménage)
// Chaque groupe définit le plafond de revenu déterminant par taille de ménage
// et les montants de subside mensuel par catégorie d'assuré.
export interface SubsideEinkommensgruppe {
  gruppe:               number     // numéro du groupe (1–22)
  limites:              number[]   // plafond revenu déterminant par taille ménage [1PH, 2PH, ..., 8PH]
  enfantMois:           number     // CHF/mois, assurance standard
  jeuneAdulteMois:      number     // CHF/mois, assurance standard (indépendamment de la formation)
  adulteMois:           number     // CHF/mois, assurance standard
  enfantAltMois?:       number     // CHF/mois, modèle alternatif (HMO, Telmed, etc.)
  jeuneAdulteAltMois?:  number
  adulteAltMois?:       number
}

// Abattements sur la fortune avant calcul de la composante fortune du revenu déterminant
export interface FreibetragFortune {
  seul:         number    // BS: 37 500
  couple:       number    // BS: 60 000
  parEnfant:    number    // BS: 15 000 par enfant / JA < 25 ans
  tauxAuDessus: number    // BS: 0.10 — fraction du patrimoine net au-delà de l'abattement ajoutée au revenu
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
  // BS : abattements fortune + taux au-delà
  freibetragFortune?:   FreibetragFortune
  // BS : revenu hypothétique imputé si un adulte ne justifie pas d'une activité ≥ 80 %
  hypothetischesEinkommen?: number
  // Modèle ZH : seuils de revenu au-delà desquels le droit s'éteint
  seuilsRevenu?:        SubsideSeuil[]
  // Modèle BE : barème montant par tranche de revenu déterminant
  montantsSubside?:     SubsideMontant[]
  // Déductions sociales pour calcul du revenu déterminant (modèle BE)
  deductionsSociales?:  DeductionSociale[]
  // Modèle LU : formule proportionnelle
  formule?:             SubsideFormule
  // Modèle BS : barème lookup par groupe de revenus et taille de ménage
  einkommensgruppen?:   SubsideEinkommensgruppe[]
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

  /* ─── BÂLE-VILLE (BS) ────────────────────────────────────────────────── */
  // Sources : https://www.bs.ch/themen/finanzielle-hilfe/leistungen/praemienverbilligung
  //           Bericht über die Prämienverbilligung 2026, Amt für Sozialbeiträge,
  //           Oktober 2025 — Anhang 2 : tableau 2026 complet (22 groupes × 8 tailles ménage)
  //           https://media.bs.ch/original_file/6728c0b091999dea9afc2a4c778dcb753b90e1d7/kvo2026-bericht-pv-0.pdf
  // Scrapé le 23 avril 2026
  //
  // Modèle barème lookup par groupe de revenus et taille de ménage (PH = Personenhaushalt) :
  //   massgebliches Einkommen = Nettoeinkommen
  //                           + 10 % × max(0, Reinvermögen − Freibetrag)
  //                           + Sozialleistungen (unterhalt, alimentation, Mietbeiträge)
  //   → chercher le groupe (01–22) selon taille ménage, lire subside mensuel par catégorie
  //
  // Richtprämie = 90 % de la Durchschnittsprämie (§ 21 Abs. 2 KVO)
  //   Adulte : 693.50 × 90 % = 624.15 CHF/mois
  //   JA     : 507.10 × 90 % = 456.39 CHF/mois → min 50 % = 228.20 ≈ 229 CHF/mois (groupes 07–22)
  //   Enfant : 171.90 × 90 % = 154.71 CHF/mois → min 80 % = 123.77 ≈ 124 CHF/mois (groupes 05–22)
  //
  // JA (19–25 ans) : même montant que formation ou non (note a du tableau)
  // Bonus modèle alternatif (HMO/Telmed) : +30 CHF adulte, +6 CHF enfant/JA (groupes 01–21)
  //   Exception groupe 22 : +9 CHF adulte uniquement (plafonnement)
  {
    code:         'BS',
    nom:          'Bâle-Ville',
    automatique:  false,   // courriers envoyés aux ménages potentiellement éligibles ; EL/Sozialhilfe = auto
    nbRegions:    1,
    lienOfficiel: 'https://www.bs.ch/themen/finanzielle-hilfe/leistungen/praemienverbilligung',
    annee:        2026,
    // pas de délai annuel fixe ; nouveaux arrivants étrangers : demande dans les 3 mois suivant l'arrivée
    noteGenerale: 'Richtprämie = 90 % de la Durchschnittsprämie (§ 21 Abs. 2 KVO). JA (19–25 ans) : montant identique formation ou non. Bonus modèle alternatif (HMO/Telmed) : +30 CHF adulte, +6 CHF enfant/JA (groupes 01–21) ; groupe 22 : +9 CHF adulte uniquement. Revenu hypothétique 28 800 CHF/an imputé par adulte ne justifiant pas d\'une activité ≥ 80 %. Nouveaux arrivants étrangers : demande dans les 3 mois. EL/Sozialhilfe : attribution automatique (EL = jusqu\'à 90 % de la Durchschnittsprämie).',
    freibetragFortune: {
      seul:         37_500,
      couple:       60_000,
      parEnfant:    15_000,   // par enfant / JA < 25 ans
      tauxAuDessus: 0.10,
    },
    hypothetischesEinkommen: 28_800,   // CHF/an par adulte sans justification d'emploi ≥ 80 %
    // Barème 2026 — Anhang 2 du Bericht, en vigueur au 1er janvier 2026
    // Colonne limites : [1PH, 2PH, 3PH, 4PH, 5PH, 6PH, 7PH, 8PH]
    // T3 = assurance standard ; T4 = modèle alternatif
    einkommensgruppen: [
      { gruppe:  1, limites: [23_125, 37_000, 47_000, 55_000, 61_000, 65_000, 69_000,  73_000], enfantMois: 157, jeuneAdulteMois: 329, adulteMois: 444, enfantAltMois: 163, jeuneAdulteAltMois: 335, adulteAltMois: 474 },
      { gruppe:  2, limites: [24_375, 39_000, 49_000, 57_000, 63_000, 67_000, 71_000,  75_000], enfantMois: 146, jeuneAdulteMois: 308, adulteMois: 415, enfantAltMois: 152, jeuneAdulteAltMois: 314, adulteAltMois: 445 },
      { gruppe:  3, limites: [25_625, 41_000, 51_000, 59_000, 65_000, 69_000, 73_000,  77_000], enfantMois: 137, jeuneAdulteMois: 289, adulteMois: 385, enfantAltMois: 143, jeuneAdulteAltMois: 295, adulteAltMois: 415 },
      { gruppe:  4, limites: [26_875, 43_000, 53_000, 61_000, 67_000, 71_000, 75_000,  79_000], enfantMois: 129, jeuneAdulteMois: 266, adulteMois: 352, enfantAltMois: 135, jeuneAdulteAltMois: 272, adulteAltMois: 382 },
      { gruppe:  5, limites: [28_125, 45_000, 55_000, 63_000, 69_000, 73_000, 77_000,  81_000], enfantMois: 124, jeuneAdulteMois: 247, adulteMois: 325, enfantAltMois: 130, jeuneAdulteAltMois: 253, adulteAltMois: 355 },
      { gruppe:  6, limites: [29_375, 47_000, 57_000, 65_000, 71_000, 75_000, 79_000,  83_000], enfantMois: 124, jeuneAdulteMois: 232, adulteMois: 296, enfantAltMois: 130, jeuneAdulteAltMois: 238, adulteAltMois: 326 },
      { gruppe:  7, limites: [30_625, 49_000, 59_000, 67_000, 73_000, 77_000, 81_000,  85_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois: 266, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois: 296 },
      { gruppe:  8, limites: [31_875, 51_000, 61_000, 69_000, 75_000, 79_000, 83_000,  87_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois: 237, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois: 267 },
      { gruppe:  9, limites: [33_125, 53_000, 63_000, 71_000, 77_000, 81_000, 85_000,  89_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois: 210, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois: 240 },
      { gruppe: 10, limites: [34_375, 55_000, 65_000, 73_000, 79_000, 83_000, 87_000,  91_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois: 179, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois: 209 },
      { gruppe: 11, limites: [35_625, 57_000, 67_000, 75_000, 81_000, 85_000, 89_000,  93_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois: 148, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois: 178 },
      { gruppe: 12, limites: [36_875, 59_000, 69_000, 77_000, 83_000, 87_000, 91_000,  95_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois: 118, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois: 148 },
      { gruppe: 13, limites: [38_125, 61_000, 71_000, 79_000, 85_000, 89_000, 93_000,  97_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  91, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois: 121 },
      { gruppe: 14, limites: [39_375, 63_000, 73_000, 81_000, 87_000, 91_000, 95_000,  99_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  61, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  91 },
      { gruppe: 15, limites: [40_625, 65_000, 75_000, 83_000, 89_000, 93_000, 97_000, 101_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  43, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  73 },
      { gruppe: 16, limites: [41_875, 67_000, 77_000, 85_000, 91_000, 95_000, 99_000, 103_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  37, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  67 },
      { gruppe: 17, limites: [43_125, 69_000, 79_000, 87_000, 93_000, 97_000,101_000, 105_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  33, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  63 },
      { gruppe: 18, limites: [44_375, 71_000, 81_000, 89_000, 95_000, 99_000,103_000, 107_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  30, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  60 },
      { gruppe: 19, limites: [45_625, 73_000, 83_000, 91_000, 97_000,101_000,105_000, 109_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  26, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  56 },
      { gruppe: 20, limites: [46_875, 75_000, 85_000, 93_000, 99_000,103_000,107_000, 111_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  23, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  53 },
      { gruppe: 21, limites: [48_125, 77_000, 87_000, 95_000,101_000,105_000,109_000, 113_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  20, enfantAltMois: 130, jeuneAdulteAltMois: 235, adulteAltMois:  50 },
      { gruppe: 22, limites: [49_375, 79_000, 89_000, 97_000,103_000,107_000,111_000, 115_000], enfantMois: 124, jeuneAdulteMois: 229, adulteMois:  17, enfantAltMois: 124, jeuneAdulteAltMois: 229, adulteAltMois:  26 },
      //                                                                                          ^enfant min 80%   ^JA min 50%                          ^groupe 22 : pas de bonus enfant/JA ; adulte +9 seulement
    ],
  },

  /* ─── SOLEURE (SO) ───────────────────────────────────────────────────── */
  // Sources : https://www.akso.ch/dienstleistungen/praemienverbilligung-ipv
  //           Verfügung Parameters IPV 2026 du 27.01.2026 (Departement des Innern)
  //           Regierungsratsvorlage SGB 0226/2025 du 28.10.2025
  //           Merkblatt IPV 2026 (1 p.)
  // Scrapé le 23 avril 2026
  //
  // Modèle formule proportionnelle avec Eigenanteil linéaire :
  //   massgebendes Einkommen = revenu fiscal + 50 % du satzbestimmendes Vermögen
  //   Eigenanteil (%) = 10 + (6/74 000) × revenuDet   [10 % à revenu 0 → 16 % à 74 000]
  //   Selbstbehalt (CHF) = Eigenanteil(%) × revenuDet / 100
  //   Subside = Σ Richtprämien − Selbstbehalt  (≥ 0 ; plafonné aux primes effectives)
  //   Si revenuDet > 74 000 : aucun droit
  //   Minimum versé : CHF 240/an par adulte éligible
  //
  // Richtprämien = 70 % de la Durchschnittsprämie (abattement 30 % vs 10 % légal)
  // Durchschnittsprämie 2026 SO : adulte 602 / JA 435 / enfant 139 CHF/mois
  {
    code:         'SO',
    nom:          'Soleure',
    automatique:  false,   // formulaire pré-rempli envoyé à tous les ménages potentiellement éligibles ; EL/FamEL/Sozialhilfe = auto
    nbRegions:    1,
    lienOfficiel: 'https://www.akso.ch/dienstleistungen/praemienverbilligung-ipv',
    annee:        2026,
    delaiDemande: '31 juillet 2026',
    noteGenerale: 'Minimum versé : CHF 240/an par adulte éligible. EL/FamEL/Sozialhilfe : attribution automatique. Concubinage : revenus des deux partenaires cumulés si demi-déduction sociale (Ziffer 630) accordée aux deux — calcul manuel par AKSO. Hausse revenus > 20 % ou fortune ≥ CHF 20 000 en 2025 vs 2024 : dossier suspendu jusqu\'à taxation 2025.',
    formule: {
      type:          'proportionnel',
      // Eigenanteil linéaire : taux = 10 % + (6/74 000) × revenu
      // même structure que LU : (partFixePct + coeffVariable × revenu) × revenu / 100
      partFixePct:   10,
      coeffVariable: 6 / 74_000,   // ≈ 0.0000811 pts%/CHF — linéaire 10 %→16 % sur 0–74 000 CHF
      coeffFortune:  0.50,          // 50 % du satzbestimmendes Vermögen — taux max légal, Verfügung 27.01.2026
      obergrenzeEinkommen: 74_000,
      pctRichtprämieEnfant:      80,
      pctFixeEnfant:             80,
      pctRichtprämieJAFormation: 50,
      pctFixeJAFormation:        50,
      // Richtprämien 2026 = Durchschnittsprämie × 70 % (abattement 30 %) — Verfügung 27.01.2026
      richtprämienAn: [
        {
          region: 'unique',
          adulte:               5_064,   // 422 CHF/mois × 12
          jeuneAdulteFormation: 3_660,   // 305 CHF/mois × 12
          enfant:               1_176,   // 98 CHF/mois × 12
        },
      ],
      composantesRevenu: [
        { label: 'Revenu fiscal (satzbestimmendes Einkommen, taxation 2024)',  signe: '+' },
        { label: '50 % du satzbestimmendes Vermögen (fortune imposable 2024)', signe: '+' },
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
