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
  // OW/AI : Selbstbehalt progressif au-delà d'un seuil, plafonné à un taux max
  // taux = min(selbstbehaltProgressifMax, selbstbehaltPct + max(0, revenu − selbstbehaltProgressifSeuil) / 100 × selbstbehaltProgressifIncrPour100)
  selbstbehaltProgressifSeuil?:        number   // OW: 35 000 / AI: 45 000 — seuil bas
  selbstbehaltProgressifIncrPour100?:  number   // OW: 0.01 / AI: 0.0125 — pts % par CHF 100 au-dessus du seuil
  selbstbehaltProgressifMax?:          number   // AI: 12 — taux plafond (%; implicitement au-delà de 85 000)
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
  // SG : Belastungsgrenze = formule linéaire progressive, 4 catégories (Art. 5 Regierungsbeschluss sGS 331.538)
  // Selbstbehalt = basePct + max(0, revenu − baseSeuil) × incrPctParCHF   (pour seul/couple sans enfants)
  // baseSeuil dépend du nb de JA et d'enfants pour les ménages avec enfants
  belastungsgrenzeSG?: {
    // Cat. 1 : Alleinstehend ohne Kinder
    seulSansEnfants: {
      basePct:       number   // 2024: 10.40 / 2026: ~10.96 (confirmé form_4100)
      baseSeuil:     number   // 2024: 17 500 CHF — revenu au-dessous duquel taux = basePct
      incrPctParCHF: number   // 2024: 0.0002 pp/CHF
    }
    // Cat. 2 : Verheiratet ohne Kinder
    coupleSansEnfants: {
      basePct:       number   // 2024: 10.40
      baseSeuil:     number   // 2024: 26 250
      incrPctParCHF: number   // 2024: 0.0003
    }
    // Cat. 3 : Alleinstehend mit Kindern
    // baseSeuil = baseSeuilAdulte + baseSeuilParJA × nJA + baseSeuilParEnfant × nEnfants
    seulAvecEnfants: {
      basePct:              number   // 2024: 9.20
      baseSeuilAdulte:      number   // 2024: 17 500
      baseSeuilParJA:       number   // 2024: 8 750 (JA < 26 ans)
      baseSeuilParEnfant:   number   // 2024: 5 250
      incrPctParCHFAdulte:  number   // 2024: 0.0002
      incrPctParCHFJA:      number   // 2024: 0.00005
      incrPctParCHFEnfant:  number   // 2024: 0.00003
      maxIncrPctParCHF:     number   // 2024: 0.0003 — plafond de l'incrément total
    }
    // Cat. 4 : Verheiratet mit Kindern
    coupleAvecEnfants: {
      basePct:              number   // 2024: 10.65
      baseSeuilAdulte:      number   // 2024: 26 250
      baseSeuilParJA:       number   // 2024: 8 750
      baseSeuilParEnfant:   number   // 2024: 5 250
      incrPctParCHFAdulte:  number   // 2024: 0.00025
      incrPctParCHFJA:      number   // 2024: 0.00005
      incrPctParCHFEnfant:  number   // 2024: 0.00003
      maxIncrPctParCHF:     number   // 2024: 0.00035
    }
  }
  // SH : plancher du Selbstbehalt en % des Richtprämien totales
  // Selbstbehalt = max(selbstbehaltPct × revenu, minSelbstbehaltPctRichtprämie × Richtprämien)
  // → le subside ne peut pas dépasser (100 − minSelbstbehaltPctRichtprämie) % des Richtprämies
  minSelbstbehaltPctRichtprämie?: number   // SH: 35
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
  // SH : Grundabzug — déduction forfaitaire du revenu déterminant avant calcul Selbstbehalt
  grundabzugMitKindern?:  number   // SH: 9 000 — ménage avec enfants ≤ 20 ans (droit conjoint)
  grundabzugOhneKindern?: number   // SH: 4 500 — tous autres ménages
  // AR : Lebensbedarf — montant de subsistance soustrait du revenu avant application du Selbstbehalt
  // Selbstbehalt = selbstbehaltPct / 100 × max(0, revenu − Lebensbedarf)
  // Lebensbedarf = lebensbedarfSeul (seul sans enfant) ou lebensbedarfFamille (couple / monoparental)
  //                + lebensbedarfParEnfant × nb enfants
  lebensbedarfSeul?:       number   // AR: 20 670 — personne seule sans enfant
  lebensbedarfFamille?:    number   // AR: 31 005 — couple ou monoparental avec enfant(s)
  lebensbedarfParEnfant?:  number   // AR:  2 000 — supplément par enfant
  // GR : Selbstbehalt pour enfants et JA en formation exprimé en % de la Richtprämie (pas du revenu)
  // par tranche de revenu du ménage (anrechenbares Einkommen total)
  // IPV_enfant/JA = max(0, (1 − pctRichtprämie/100) × Richtprämie)
  selbstbehaltTranchesEnfantJA?: {
    revenuMaxAn:    number   // borne supérieure de la tranche (utiliser Infinity pour la dernière)
    pctRichtprämie: number   // % de la Richtprämie à la charge de l'assuré (Selbstbehalt en %)
  }[]
  // AG : Einkommensabzüge — déductions forfaitaires du revenu avant application du Selbstbehalt
  // Selbstbehalt = selbstbehaltPct / 100 × max(0, massgebendes Einkommen − Einkommensabzug − proKindJAFormation × n)
  einkommensabzuege?: {
    alleinstehend:             number   // AG: 8 500 — personne seule sans enfant
    alleinstehendMitKindern:   number   // AG: 12 200 — monoparental
    ehepaarOhneKinder:         number   // AG: 0 — couple sans enfant
    ehepaarMitKindern:         number   // AG: 8 000 — couple avec enfant(s)
    proKindJAFormation:        number   // AG: 2 500 — supplément par enfant ou JA en formation
  }
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
  composantesRevenu?: {
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

// TG : barème fiscal — IPV fixé par catégorie selon la "einfache satzbestimmende Steuer zu 100%"
// Condition d'éligibilité : steuer ≤ steuerMax ET steuerbares Vermögen provisoire ≤ 0
// Source : Merkblatt IPV 2026, Amt für Gesundheit TG
export interface SubsideBaremeFiscalTG {
  categorie:  string    // 'A' | 'B' | 'C' (adultes) | 'D' (enfants)
  profil:     'adulte' | 'enfant'
  steuerMax:  number    // plafond de la "einfache satzbestimmende Steuer zu 100%" (CHF)
  ipvAn:      number    // montant IPV annuel fixe (CHF)
}

// TI : modèle RIPAM (Riduzione Individuale dei Premi dell'Assicurazione Malattie)
// Source : LCAMal art. 32a–32b (modifiés, en vigueur 01.01.2026) + norma transitoria 2026
//          Rapporto di maggioranza n. 8619 R1 del 02.12.2025
//
// Formule d'éligibilité : RD ≤ RDM
//   RD = ∑ redditi_UR + 1/15 × sostanza_netta − PMR_UR − contrib_sociali − alimenti_pagati
//        − min(spese_professionali, speseProfessionaliMax) − min(interessi_passivi, speseInteressiMax)
//   RDM senza figli = costanteSenzaFigli × 0.5 × fabbisogno_UR
//   RDM con figli   = [costanteConFigliBase + (1 − nb_figli / 10)] × 0.5 × fabbisogno_UR
//   fabbisogno_UR   = fabbisognoPersonaUR + somme des suppléments selon nb membres
//
// Formule RIPAM : RIPAM_UR = max(0, PMR_UR − max(0, RD_UR))
//   Redistribué proportionnellement aux PMR des membres ; mineurs et JA formation prioritaires
export interface ParametriRipamTI {
  // Costanti 2026 — norma transitoria (votation populaire 28.09.2025, en vigueur 01.01.2026)
  costanteSenzaFigli:      number    // art. 32a cpv. 2 — 2026 : 5.0 (base LCAMal : 3.8)
  costanteConFigliBase:    number    // art. 32a cpv. 3 — 2026 : 5.9 (base LCAMal : 4.7)
  // Limite di fabbisogno par position dans l'UR (art. 32b, en vigueur 01.01.2026)
  fabbisognoPersonaUR:     number    // a) 18 182 CHF/an — 1re personne de l'UR
  fabbisognoSuppl1:        number    // b)  8 955 CHF/an — 1re personne supplémentaire (2e totale)
  fabbisognoSuppl2:        number    // c)  6 675 CHF/an — 2e personne supplémentaire (3e totale)
  fabbisognoSuppl3:        number    // d)  5 105 CHF/an — 3e personne supplémentaire (4e totale)
  fabbisognoSuppl4plus:    number    // e)  5 086 CHF/an — 4e personne et chaque suivante
  // Déductions admises dans le calcul du RD
  speseProfessionaliMax:   number    // 4 000 CHF/an max — frais professionnels salariés
  speseInteressiMax:       number    // 3 000 CHF/an max — intérêts passifs privés/pro
  // Garanties fédérales (art. 65 LAMal) — si RIPAM_UR < seuil, attribuée en priorité aux mineurs/JA
  pctMinPMRMinorenni:      number    // 80 — RIPAM ≥ 80 % du PMR pour les mineurs
  pctMinPMRJAFormazione:   number    // 50 — RIPAM ≥ 50 % du PMR pour les JA en formation
  // Seuil minimum de versement
  importoMinAnnuoPerMembro: number   // 120 CHF/an par membre UR — pas de versement en dessous
}

// ── Interfaces pour cantons romands ──────────────────────────────────────────

// GE : groupe d'imposition (9 groupes, montants mensuels fixes)
// Groupe 9 : « rattrapage familles » — activé uniquement quand revenu > plafond du groupe 8
//            ET nbEnfants ≥ 1 ; adulte seul sans enfant inéligible dans ce groupe (adulte = 0).
export interface SubsideGroupeGE {
  groupe:          number   // 1–9
  adulte:          number   // CHF/mois — adulte ≥ 26 ans (0 au groupe 9 quand seul sans enfant)
  jeune:           number   // CHF/mois — 19–25 ans
  enfant:          number   // CHF/mois
  revenuMaxSeul:   number   // seuil revenu annuel max, personne seule sans enfant (Infinity pour groupe 9)
  revenuMaxCouple: number   // seuil revenu annuel max, couple sans enfant (Infinity pour groupe 9)
}

// NE : bande de classification S1–S15 (5 groupes fusionnés)
// Ajustement du revenu avant comparaison aux seuils :
//   revenuAjusté = (revenu / facteurCoupleNE) / (1 + nbEnfants × facteurEnfantNE)
//   facteurCoupleNE = 0.60 si couple, 1.0 si seul
export interface SubsideBandeNE {
  label:    string   // 'S1–S11' | 'S12' | 'S13' | 'S14' | 'S15'
  adulte:   number   // CHF/mois — adulte ≥ 26 ans
  jeune:    number   // CHF/mois — 19–25 ans
  enfant:   number   // CHF/mois
  maxSeul:  number   // seuil revenu annuel max (revenu ajusté vs personne seule sans enfant)
}

// VS : prime de référence mensuelle (source : Echelle RIP 2026, moyenne régions I et II)
export interface PrimeReferenceVS {
  adulte: number   // CHF/mois — adulte ≥ 26 ans
  jeune:  number   // CHF/mois — 19–25 ans
  enfant: number   // CHF/mois
}

// VS : entrée du barème de taux par profil de ménage et tranche de revenu
// subside adulte = taux/100 × primeReferenceVS.adulte (ou .jeune si isJeune)
// profil encode la situation familiale et le nombre d'enfants :
//   'seul_0e'    = personne seule sans enfant
//   'seul_1e+'   = personne seule avec 1 ou plusieurs enfants (table unique pour ≥ 1 enfant)
//   'couple_Xe'  = couple avec X enfants (0, 1, 2, 3 ; ≥ 4 → couple_4e+)
export interface SubsideTauxVS {
  profil:      'seul_0e' | 'seul_1e+' | 'couple_0e' | 'couple_1e' | 'couple_2e' | 'couple_3e' | 'couple_4e+'
  taux:        number    // % de la prime de référence couverte (100 | 70 | 50 | 40 | 30 | 20 | 10)
  revenuMaxAn: number    // borne supérieure revenu annuel pour ce taux (revenu net fiscal + ajustements)
}

// VD : segment du barème linéaire par morceaux (subside ordinaire OVAM 2026)
// Interprétation : pour un revenu donné, utiliser le premier segment tel que revenu ≤ revenuMax.
// Montant interpolé linéairement entre montantMin (à revenuMin) et montantMax (à revenuMax).
// Si montantMin == montantMax → palier plat. Si montantMin == montantMax == 0 → hors barème.
// Nota bene (profil adulte26_famille) : discontinuité à revenuMin=24 200 CHF (318 → 300 CHF).
export interface SubsideSegmentVD {
  profil:     'adulte26_seul' | 'adulte1925' | 'adulte26_famille' | 'enfant'
  revenuMin:  number   // borne inférieure du segment (CHF/an)
  revenuMax:  number   // borne supérieure du segment (CHF/an) — Infinity pour le segment « hors barème »
  montantMin: number   // CHF/mois au niveau revenuMin
  montantMax: number   // CHF/mois au niveau revenuMax (= montantMin si palier plat)
}

// FR : palier de la grille lissage des taux (art. 6 ORP / art. 15 LALAMal)
// Formule : pctEnDessous = (limite − revenuDéterminant) / limite × 100
// On cherche le palier tel que pctMin ≤ pctEnDessous ≤ pctMax → taux sur la prime moyenne
// Dernier palier (≥ 60.01 %) : pctMax = Infinity
export interface SubsidePalierFR {
  pctMin: number   // % min en dessous de la limite (inclus)
  pctMax: number   // % max en dessous de la limite (inclus) — Infinity pour le dernier palier
  taux:   number   // % de la prime moyenne régionale accordé (de 1.00 à 65.00)
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
  // Modèle TG : barème fiscal (catégories A–D basées sur la "einfache satzbestimmende Steuer")
  baremeFiscalTG?:      SubsideBaremeFiscalTG[]
  // TG : IPV max pour JA en formation = 50 % de la prime moyenne cantonale
  jaFormationIPVMaxAn?: number
  // Modèle TI : paramètres RIPAM (art. 32a–32b LCAMal + norma transitoria 2026)
  parametriRipamTI?:    ParametriRipamTI
  // ── Cantons romands ───────────────────────────────────────────────────────
  // GE : groupes d'imposition avec montants mensuels et seuils de revenu
  groupesGE?:              SubsideGroupeGE[]
  bonusParEnfantSeulGE?:   number   // GE: 13 000 — CHF ajoutés aux seuils "seul" par enfant
  bonusParEnfantCoupleGE?: number   // GE: 17 000 — CHF ajoutés aux seuils "couple" par enfant
  // NE : bandes de classification S1–S15 et facteurs d'ajustement du revenu
  bandesNE?:               SubsideBandeNE[]
  facteurCoupleNE?:        number   // NE: 0.60 — diviseur du revenu couple pour le comparer aux seuils "seul"
  facteurEnfantNE?:        number   // NE: 0.28 — coefficient additionnel par enfant dans le diviseur
  // VS : prime de référence mensuelle et barème de taux (Echelle RIP 2026)
  primeReferenceVS?:       PrimeReferenceVS
  tauxVS?:                 SubsideTauxVS[]
  // VS : revenu annuel max pour éligibilité au subside enfant (80 % × prime enfant de référence)
  enfantMaxRevenuVS?:      { situation: 'seul' | 'couple'; nbEnfants: number; revenuMax: number }[]
  // VD : barème linéaire par morceaux (subside ordinaire OVAM 2026)
  segmentsVD?:             SubsideSegmentVD[]
  // FR : grille lissage des taux (60 paliers, art. 6 ORP)
  paliersFR?:              SubsidePalierFR[]
  // FR : prime moyenne régionale mensuelle 2026 — base de calcul du subside
  primesMoyennesFR?:       { region: string; adulte: number; jeune: number; enfant: number }[]
  // FR : taux minimum garanti (% de la prime moyenne) pour enfants et JA en formation
  pctMinEnfantFR?:         number   // FR: 80 — subside ≥ 80 % prime moyenne enfant
  pctMinJAFormationFR?:    number   // FR: 50 — subside ≥ 50 % prime moyenne jeune adulte
  noteGenerale?:           string
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

  /* ─── BÂLE-CAMPAGNE (BL) ────────────────────────────────────────────── */
  // Sources : https://www.sva-bl.ch/de/ausgleichskasse/individuelle-praemienverbilligung-ipv
  //           SVA BL Kennzahlen per 01.01.2026 (PDF) — Richtprämies confirmées
  //           https://www.sva-bl.ch/fileadmin/user_upload/formulare_merkblaetter/AK/Allgemein/Kennzahlen_per_01.01.2026.pdf
  //           LRV 2024/602 (Interpellation) — formule § 9 EG KVG, Obergrenzen, Liegenschaftseink., 20 % Vermögen
  //           https://baselland.talus.ch/de/dokumente/geschaeft/1f0dfecef3fe4cc2b1a0e3bdf3632572-332
  //           Vorlage neues Prämienverbilligungssystem BL (2025) — confirmation formule
  //           hellosafe.ch/de/krankenversicherung/praemienverbilligung/baselland — Obergrenzen
  // Scrapé le 23 avril 2026
  //
  // Modèle proportionnel avec Einkommensobergrenzen (seuils DURS, effet falaise) :
  //   massgebendes Einkommen = Zwischentotal Einkünfte (Ziffer 399)
  //                           + Nettoeinkommen nicht selbst bewohnter Liegenschaften (Ziff. 405/410/440/450 − Pauschalabzug)
  //                           + 20 % × steuerbares Vermögen (Ziffer 910)
  //                           − Unterhaltsbeiträge − CHF 5 000/enfant
  //   Subside = max(Mindestanspruch, Richtprämie − 7.75 % × revenuDet)
  //   Si revenuDet > Einkommensobergrenze : aucun droit (coupure nette)
  //   Source formule : § 9 EG KVG (SGS 362), confirmé par LRV 2024/602 p. 2
  //
  // Prozentanteil 7.75 % confirmé par rétro-calcul :
  //   Richtprämie seulParent+2enf 2025 = 4'368 + 2×1'884 = 8'136
  //   Mindestanspruch 2 enf = 2 × 80 % × 1'884 = 3'014
  //   → 8'136 − 7.75 % × 66'085 = 3'014 ✓ (source : LRV neues System p. 7)
  //
  // Nouveau système prévu ~2027-2028 (Sozialziel sans Obergrenzen fixes)
  {
    code:         'BL',
    nom:          'Bâle-Campagne',
    automatique:  false,
    nbRegions:    1,
    lienOfficiel: 'https://www.sva-bl.ch/de/ausgleichskasse/individuelle-praemienverbilligung-ipv',
    annee:        2026,
    delaiDemande: '31 décembre 2026',
    noteGenerale: 'Prozentanteil 7.75 % fixe sur tout le revenu déterminant. Obergrenzen DURES (effet falaise) : au-delà du seuil, droit = 0 même si la formule donnerait un montant positif. Revenu déterminant = Ziffer 399 + Nettoeinkommen non-owner Liegenschaften + 20 % Vermögen (Ziffer 910) − Unterhaltsbeiträge − CHF 5 000/enfant (§ 9 EG KVG). JA en formation rattachés aux parents : revenu des parents utilisé. Nouveau système BL en préparation (~2027-2028) : Sozialziel/Eigenanteilssatz, sans Obergrenzen fixes.',
    // Einkommensobergrenzen — Dekret SGS 362.1 ; par tranche de +11 000 au-delà du 2e enfant
    // Seul : seul+0=31k / +1=52k (+21k) / +2=68k (+16k) / +3=79k (+11k) / +4=90k
    // Couple : couple+0=51k / +1=72k (+21k) / +2=88k (+16k) / +3=99k / +4=110k
    seuilsRevenu: [
      { statut: 'seul',   profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  31_000 },
      { statut: 'seul',   profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  52_000 },
      { statut: 'seul',   profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  68_000 },
      { statut: 'seul',   profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn:  79_000 },
      { statut: 'seul',   profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn:  90_000 },
      { statut: 'couple', profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  51_000 },
      { statut: 'couple', profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  72_000 },
      { statut: 'couple', profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  88_000 },
      { statut: 'couple', profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn:  99_000 },
      { statut: 'couple', profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn: 110_000 },
    ],
    formule: {
      type:            'proportionnel',
      selbstbehaltPct: 7.75,
      coeffFortune:    0.20,  // 20 % du steuerbares Vermögen (Ziffer 910) — § 9 EG KVG, LRV 2024/602 p. 2
      pctRichtprämieEnfant:      80,
      pctFixeEnfant:             80,   // Mindestanspruch enfant ≥ 80 % Richtprämie
      pctRichtprämieJAFormation: 50,
      pctFixeJAFormation:        50,   // Mindestanspruch JA formation ≥ 50 % Richtprämie
      // Richtprämien 2026 — SVA BL Kennzahlen per 01.01.2026 (kantonale Richtprämie, unique)
      richtprämienAn: [
        {
          region:               'unique',
          adulte:               4_596,
          jeuneAdulteFormation: 3_816,
          enfant:               1_968,
        },
      ],
      composantesRevenu: [
        { label: 'Zwischentotal des revenus (Ziffer 399)',                                                  ziffer: '399',           signe: '+' },
        { label: 'Nettoeinkommen non-owner Liegenschaften (Ziff. 405+410+440+450 − Pauschalabzug)',         ziffer: '405/410/440/450', signe: '+' },
        { label: '20 % du steuerbares Vermögen',                                                            ziffer: '910 × 20 %',    signe: '+' },
        { label: 'Pensions alimentaires versées (Unterhaltsbeiträge)',                                      ziffer: '570+575',       signe: '-' },
        { label: 'CHF 5 000 par enfant mineur à charge',                                                                             signe: '-' },
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

  /* ─── SCHAFFHOUSE (SH) ───────────────────────────────────────────────── */
  // Sources : https://svash.ch/wp-content/uploads/zul01-merkblatt.pdf — Merkblatt IPV 2026 résidents
  //           https://svash.ch/wp-content/uploads/zul12-merkblatt.pdf — Merkblatt IPV 2026 Grenzgänger
  // Scrapé le 23 avril 2026
  //
  // Modèle proportionnel avec plancher Selbstbehalt :
  //   anrechenbares Einkommen = Reineinkommen (kant. Steuerrecht)
  //                           + 15 % × steuerpflichtiges Vermögen
  //                           + solde négatif Grundeigentum (si charges > loyer brut)
  //                           + Einlagen gebundene Selbstvorsorge (3a) + dons
  //                           − Entlastungsabzug (taux retraités appliqués uniformément)
  //                           − Grundabzug (CHF 9 000 / CHF 4 500)
  //   Selbstbehalt = max(15 % × revenu, 35 % × Richtprämien totales)
  //   Subside = Richtprämien − Selbstbehalt   (si > 0)
  //
  // 2 régions : R1 = Schaffhausen-Stadt + Neuhausen ; R2 = reste du canton
  // Grenzgänger : formule distincte (zul12) — Richtprämies EDI fédérales, 75 % × rev. + Kaufkraft
  {
    code:         'SH',
    nom:          'Schaffhouse',
    automatique:  false,
    nbRegions:    2,
    lienOfficiel: 'https://www.svash.ch',
    annee:        2026,
    delaiDemande: '30 avril 2026',
    noteGenerale: 'Selbstbehalt = max(15 % × revenu, 35 % × Richtprämies totales) — plancher à 35 % : subside max = 65 % des Richtprämies. Grundabzug déduit du revenu : CHF 9 000 (ménage avec enfants ≤ 20 ans, droit conjoint), CHF 4 500 (autres). R1 = Schaffhausen-Stadt + Neuhausen ; R2 = reste du canton. JA Jg. 2001–2007 en formation → Richtprämie JA. JA Jg. 2006–2007 avec propre dossier (Quellensteuer) : seuil d\'éligibilité CHF 37 600/an. Grenzgänger : formule distincte, Richtprämies EDI (Adulte 3 360, JA 2 340, Enfant 1 152), revenu = 75 % × (Quellensteuer-Einkommens × Kaufkraftfaktor) + 10 % Vermögen.',
    formule: {
      type:            'proportionnel',
      selbstbehaltPct: 15,
      minSelbstbehaltPctRichtprämie: 35,   // plancher : Selbstbehalt ≥ 35 % × Richtprämien totales
      coeffFortune:    0.15,               // 15 % du steuerpflichtiges Vermögen
      grundabzugMitKindern:  9_000,        // Grundabzug : ménage avec enfants ≤ 20 ans (droit conjoint)
      grundabzugOhneKindern: 4_500,        // Grundabzug : tous autres ménages
      pctRichtprämieEnfant:      80,
      pctFixeEnfant:             80,
      pctRichtprämieJAFormation: 50,
      pctFixeJAFormation:        50,
      // Richtprämien 2026 — Merkblatt zul01, p. 2
      richtprämienAn: [
        { region: '1', adulte: 5_947, jeuneAdulteFormation: 3_879, enfant: 1_387 },
        { region: '2', adulte: 5_620, jeuneAdulteFormation: 3_618, enfant: 1_295 },
      ],
      composantesRevenu: [
        { label: 'Reineinkommen (kantonales Steuerrecht, taxation 2024)',                      signe: '+' },
        { label: '15 % du steuerpflichtiges Vermögen',                                        signe: '+' },
        { label: 'Solde négatif Grundeigentum (si charges totales > loyer brut)',              signe: '+' },
        { label: 'Einlagen gebundene Selbstvorsorge (3a)',                                     signe: '+' },
        { label: 'Zuwendungen gemeinnützige Organisationen / politische Parteien',             signe: '+' },
        { label: 'Entlastungsabzug (taux retraités applicables uniformément, StG SH)',        signe: '-' },
        { label: 'Grundabzug : CHF 9 000 (enfants ≤ 20 ans, droit conjoint) / 4 500 (autres)', signe: '-' },
      ],
    },
  },

  /* ─── APPENZELL RHODES-EXTÉRIEURES (AR) ─────────────────────────────── */
  // Sources : https://www.sovar.ch/dienstleistungen/prämienverbilligung-ipv — délai, présentation
  //           https://www.sovar.ch/uploads/SOVAR/Formulare/AK/Beitraege/Merkblatt-IPV-2026.pdf
  // Scrapé le 23 avril 2026
  //
  // Modèle proportionnel avec Lebensbedarf :
  //   massgebendes Einkommen = Reineinkommen (steuerbar, dernière taxation rechtskräftig)
  //                          + 15 % × steuerbares Vermögen
  //                          + Liegenschaftsaufwand + rachats 3a/BVG + pertes + divers
  //   Selbstbehalt = 46 % × max(0, revenu − Lebensbedarf)
  //   Lebensbedarf : 20 670 (seul sans enfant) | 31 005 (couple/monoparental) + 2 000/enfant
  //   Subside = Richtprämien − Selbstbehalt   (si > 0 ET revenu ≤ Einkommensobergrenze)
  //
  // Obergrenzen DURES (effet falaise) sur revenu ET fortune
  // 1 région. Délai 31 mars — forclusion stricte (aucun dépôt tardif accepté).
  {
    code:         'AR',
    nom:          'Appenzell Rhodes-Extérieures',
    automatique:  false,
    nbRegions:    1,
    lienOfficiel: 'https://www.sovar.ch/dienstleistungen/prämienverbilligung-ipv',
    annee:        2026,
    delaiDemande: '31 mars 2026',   // STRICT — forclusion ; dépôt tardif = perte du droit pour 2026
    limiteFortuneSeul:   120_000,
    limiteFortuneCouple: 200_000,
    noteGenerale: 'Selbstbehalt = 46 % × max(0, revenu − Lebensbedarf). Lebensbedarf : CHF 20 670 (seul sans enfant), CHF 31 005 (couple ou monoparental avec enfants) + CHF 2 000/enfant. JA en formation inclus avec parents (Ausbildungszulage = présomption de formation). Richtprämie JA indépendant : 4 233.60 CHF/an ; pool famille : 50 % = 2 116.80. Vermögen Obergrenze : 120 000 CHF (seul/monoparental) / 200 000 CHF (couple). EL : remboursement direct sans demande. Sozialhilfe : IPV = Richtprämie complète plafonnée à la prime effective.',
    // Einkommensobergrenzen DURES — Merkblatt IPV 2026, p. 1
    seuilsRevenu: [
      { statut: 'seul',   profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  35_000 },
      { statut: 'seul',   profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  46_200 },
      { statut: 'seul',   profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  47_000 },
      { statut: 'seul',   profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn:  50_400 },
      { statut: 'seul',   profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn:  56_700 },
      { statut: 'seul',   profil: 'adulte', enfants: 5, region: 'unique', revenuMaxAn:  63_000 },
      { statut: 'couple', profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  55_000 },
      { statut: 'couple', profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  68_200 },
      { statut: 'couple', profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  75_900 },
      { statut: 'couple', profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn:  76_000 },
      { statut: 'couple', profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn:  77_000 },
      { statut: 'couple', profil: 'adulte', enfants: 5, region: 'unique', revenuMaxAn:  81_000 },
    ],
    formule: {
      type:                'proportionnel',
      selbstbehaltPct:     46,
      lebensbedarfSeul:    20_670,
      lebensbedarfFamille: 31_005,
      lebensbedarfParEnfant: 2_000,
      coeffFortune:        0.15,
      pctRichtprämieEnfant:      100,  // enfant: 1 114.80 est la valeur anrechenbare annoncée (Merkblatt)
      pctFixeEnfant:             80,
      pctRichtprämieJAFormation: 50,   // pool famille = 50 % × 4 233.60 = 2 116.80
      pctFixeJAFormation:        50,
      // Richtprämien 2026 — Merkblatt IPV 2026, p. 1
      richtprämienAn: [
        { region: 'unique', adulte: 6_025.20, jeuneAdulteFormation: 4_233.60, enfant: 1_114.80 },
      ],
      composantesRevenu: [
        { label: 'Reineinkommen (steuerbares Einkommen, taxation rechtskräftig)',                             signe: '+' },
        { label: '15 % du steuerbares Vermögen',                                                             signe: '+' },
        { label: 'Liegenschaftsaufwand net négatif (si charges Grundeigentum > loyer brut)',                 signe: '+' },
        { label: 'Einlagen gebundene Selbstvorsorge 3a (avec BVG : intégral ; sans BVG : excédent > 10 000)', signe: '+' },
        { label: 'Einkaufsbeiträge berufliche Vorsorge (BVG)',                                               signe: '+' },
        { label: 'Vorjahresverluste',                                                                        signe: '+' },
        { label: 'Einkünfte vereinfachtes Abrechnungsverfahren',                                             signe: '+' },
        { label: 'Mitgliederbeiträge / Zuwendungen politische Parteien (Art. 35 lit. j StG)',                signe: '+' },
        { label: 'Zuwendungen juristische Personen en Suisse (Art. 36 lit. b StG)',                          signe: '+' },
      ],
    },
  },

  /* ─── APPENZELL RHODES-INTÉRIEURES (AI) ─────────────────────────────── */
  // Source : /lib/data/données cantons 2026/Merkblatt IPV 2026.pdf (AI 511.2-34.5-1358131)
  // Scrapé le 23 avril 2026
  //
  // Modèle proportionnel progressif plafonné :
  //   massgebendes Gesamteinkommen = steuerpflichtiges Gesamteinkommen
  //                                 + 10 % × steuerpflichtiges Gesamtvermögen
  //                                 + ajustements (Liegenschaft, 3a, BVG, BGSA, Art. 22ter/23)
  //   taux Selbstbehalt = 7 % (≤ 45 000) → 12 % (≥ 85 000), +0.125 %/1 000 CHF entre les deux
  //   Subside = Richtprämien − taux × revenu
  //
  // AUTOMATIQUE — aucune demande ; Gesundheitsamt informe les bénéficiaires
  // JA Gesamtanspruch si revenu JA < CHF 12 000 (utilise taxation 2025 pour JA)
  // Mindestanspruch enfants (80 %) + JA formation (50 %) si revenu global ≤ CHF 75 000
  // Min paiement : CHF 100/an
  {
    code:         'AI',
    nom:          'Appenzell Rhodes-Intérieures',
    automatique:  true,   // Gesundheitsamt calcule automatiquement, pas de formulaire
    nbRegions:    1,
    lienOfficiel: 'https://www.ai.ch/themen/gesundheit/krankenversicherung/praemienverbilligung',
    annee:        2026,
    noteGenerale: 'Attribution automatique par le Gesundheitsamt — aucune demande. Selbstbehalt progressif : 7 % (revenu ≤ 45 000), +0.125 %/1 000 CHF jusqu\'à 12 % plafonné (revenu ≥ 85 000). JA inclus en Gesamtanspruch avec les parents si revenu JA < CHF 12 000 (taxation 2025 attendue). JA avec revenu > 12 000 : Alleinanspruch, taxation 2024 ou 2025. Mindestanspruch 80 % enfants / 50 % JA formation appliqué si revenu global ≤ CHF 75 000. Min : CHF 100/an. Quellensteuer : revenu brut × 80 % (Pauschalabzug 20 %). EL : calculé par Kantonale Ausgleichskasse. Sozialhilfe : Richtprämie complète sans Selbstbehalt.',
    formule: {
      type:                          'proportionnel',
      selbstbehaltPct:               7,       // taux initial (revenu ≤ 45 000)
      selbstbehaltProgressifSeuil:   45_000,
      selbstbehaltProgressifIncrPour100: 0.0125,  // 0.125 %/1 000 CHF = 0.0125 %/100 CHF
      selbstbehaltProgressifMax:     12,      // plafond 12 % (revenu ≥ 85 000)
      coeffFortune:                  0.10,
      pctRichtprämieEnfant:          100,     // 1 034 CHF = Richtprämie complète enfant
      pctFixeEnfant:                 80,      // Mindestanspruch 80 % × 1 034 = 827.20 CHF/an
      seuilEnfantSeulParent:         75_000,  // Mindestanspruch annulé si revenu global > 75 000
      seuilEnfantDeuxParents:        75_000,
      pctRichtprämieJAFormation:     100,     // 3 446 CHF = Richtprämie complète JA
      pctFixeJAFormation:            50,      // Mindestanspruch 50 % × 3 446 = 1 723 CHF/an
      // Richtprämien 2026 — Standeskommissionsbeschluss GS 832.501
      richtprämienAn: [
        { region: 'unique', adulte: 4_640, jeuneAdulteFormation: 3_446, enfant: 1_034 },
      ],
      composantesRevenu: [
        { label: 'steuerpflichtiges Gesamteinkommen (taxation définitive 2024)',                              signe: '+' },
        { label: '10 % du steuerpflichtiges Gesamtvermögen',                                                 signe: '+' },
        { label: 'Unterhalts-/Verwaltungskosten Grundstücke Privatvermögen (excédent > 20 % Pauschalabzug)', signe: '+' },
        { label: 'Beiträge gebundene Selbstvorsorge (Säule 3a)',                                             signe: '+' },
        { label: 'Einkaufsbeiträge berufliche Vorsorge (BVG)',                                               signe: '+' },
        { label: 'Einkommen vereinfachtes Abrechnungsverfahren (BGSA)',                                      signe: '+' },
        { label: 'Einkünfte Art. 22ter und Art. 23 Abs. 1bis StG (aufgerechnet auf 100 %)',                  signe: '+' },
      ],
    },
  },

  /* ─── SAINT-GALL (SG) ────────────────────────────────────────────────── */
  // Sources : https://www.svasg.ch/online-schalter/pdf/form_4100.pdf — Merkblatt IPV 2026
  //           https://www.svasg.ch/online-schalter/pdf/form_4200.pdf — Erläuterungen + Referenzprämien + Einkommensobergrenzen 2026
  //           https://www.lexfind.ch/tolv/233524/de — Regierungsbeschluss sGS 331.538, édition 2024 (formule Belastungsgrenze Art. 5)
  // Scrapé le 23 avril 2026
  //
  // Referenzprämien = primes les moins chères de la région BAG (≠ moyenne cantonale) — 3 régions
  // Belastungsgrenze = Selbstbehalt progressif linéaire, 4 catégories (Art. 5 sGS 331.538) :
  //   taux = basePct + max(0, revenu − baseSeuil) × incrPctParCHF
  //   baseSeuil dépend du nb de JA/enfants pour les ménages avec enfants
  // Valeurs 2026 connues : seulAvecEnfants.basePct = 10.96 % (minimum confirmé form_4100)
  //                        seulSansEnfants.basePct ≈ 12.16 % (cohérent avec exemple "Annahme" form_4100)
  // Valeurs 2024 (Regierungsbeschluss) : baseSeuils et incréments — structure identique pour 2026
  // Einkommensobergrenzen 2026 (form_4200 / Art. 6 sGS 331.538) = seuils DURS généraux
  // Fortune : base 100 000 + 20 000/enfant <18 + 40 000/JA <25, plafond 150 000 CHF
  {
    code:         'SG',
    nom:          'Saint-Gall',
    automatique:  false,   // SVA contacte proactivement les éligibles via données fiscales ; formulaire si non contacté
    nbRegions:    3,
    lienOfficiel: 'https://www.svasg.ch/produkte/ipv/',
    annee:        2026,
    delaiDemande: '31 mars 2026',   // ganzjährig ; dépôt tardif → IPV dès mois de dépôt
    limiteFortuneSeul:        100_000,   // base ; +20 000/enfant <18 ; +40 000/JA <25 ; max 150 000
    limiteFortuneCouple:      100_000,
    limiteFortuneParEnfant:    20_000,
    noteGenerale: 'Belastungsgrenze = Selbstbehalt progressif linéaire, 4 catégories (Art. 5 sGS 331.538) — voir belastungsgrenzeSG. Valeurs 2026 : seulAvecEnfants.basePct = 10.96 % (confirmé), seulSansEnfants.basePct ≈ 12.16 % (cohérent avec exemple form_4100). baseSeuils/incréments : valeurs 2024 ; 2026 exact = Regierungsbeschluss 2026 non disponible. Referenzprämiens = primes les moins chères de la région (3 régions BAG). Fortune : base 100 000 CHF + 20 000/enfant <18 + 40 000/JA <25, plafond 150 000. EL : inclus avec EL mensuel, sans formulaire. Min : CHF 100/an.',
    // Einkommensobergrenzen 2026 — form_4200 / Art. 6 sGS 331.538 (seuils DURS, éligibilité générale)
    seuilsRevenu: [
      { statut: 'seul',   profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  41_700 },
      { statut: 'seul',   profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  65_700 },
      { statut: 'seul',   profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  65_700 },
      { statut: 'seul',   profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn:  70_700 },
      { statut: 'seul',   profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn:  75_700 },
      { statut: 'seul',   profil: 'adulte', enfants: 5, region: 'unique', revenuMaxAn:  80_700 },
      { statut: 'couple', profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  62_600 },
      { statut: 'couple', profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  86_500 },
      { statut: 'couple', profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  86_500 },
      { statut: 'couple', profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn:  91_500 },
      { statut: 'couple', profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn:  96_500 },
      { statut: 'couple', profil: 'adulte', enfants: 5, region: 'unique', revenuMaxAn: 101_500 },
    ],
    formule: {
      type:            'proportionnel',
      selbstbehaltPct: 10.96,  // plancher 2026 confirmé (= seulAvecEnfants.basePct) — voir belastungsgrenzeSG
      coeffFortune:    0.20,
      pctRichtprämieEnfant:      100,
      pctFixeEnfant:             80,
      pctRichtprämieJAFormation: 100,
      pctFixeJAFormation:        50,
      // Belastungsgrenze 2026 — Art. 5 sGS 331.538
      // basePct 2026 : seulSansEnfants ≈ 12.16, seulAvecEnfants = 10.96 (confirmé)
      // baseSeuils/incréments : valeurs 2024 — structure identique pour 2026
      belastungsgrenzeSG: {
        seulSansEnfants: {
          basePct:       12.16,   // 2026 ≈ 12.16 (exemple form_4100 "Annahme") ; 2024 = 10.40
          baseSeuil:     17_500,  // 2024 — à confirmer pour 2026
          incrPctParCHF: 0.0002,  // 2024 — 0.0002 pp/CHF au-dessus de baseSeuil
        },
        coupleSansEnfants: {
          basePct:       12.16,   // 2026 estimé ≈ 12.16 ; 2024 = 10.40
          baseSeuil:     26_250,  // 2024 — à confirmer pour 2026
          incrPctParCHF: 0.0003,
        },
        seulAvecEnfants: {
          basePct:              10.96,   // 2026 CONFIRMÉ (minimum form_4100) ; 2024 = 9.20
          baseSeuilAdulte:      17_500,  // 2024
          baseSeuilParJA:        8_750,  // 2024 — par JA < 26 ans
          baseSeuilParEnfant:    5_250,  // 2024 — par enfant
          incrPctParCHFAdulte:  0.0002,
          incrPctParCHFJA:      0.00005,
          incrPctParCHFEnfant:  0.00003,
          maxIncrPctParCHF:     0.0003,
        },
        coupleAvecEnfants: {
          basePct:              12.41,   // 2026 estimé : 10.96 + (10.65−9.20) = 12.41 ; 2024 = 10.65
          baseSeuilAdulte:      26_250,  // 2024
          baseSeuilParJA:        8_750,
          baseSeuilParEnfant:    5_250,
          incrPctParCHFAdulte:  0.00025,
          incrPctParCHFJA:      0.00005,
          incrPctParCHFEnfant:  0.00003,
          maxIncrPctParCHF:     0.00035,
        },
      },
      // Referenzprämien 2026 — form_4100 §4.1 (primes les moins chères de chaque région BAG)
      richtprämienAn: [
        { region: '1', adulte: 6_285.60, jeuneAdulteFormation: 4_492.80, enfant: 1_462.80 },
        { region: '2', adulte: 5_879.40, jeuneAdulteFormation: 4_218.00, enfant: 1_351.20 },
        { region: '3', adulte: 5_681.40, jeuneAdulteFormation: 4_063.20, enfant: 1_306.80 },
      ],
      composantesRevenu: [
        { label: 'Reineinkommen (kantonales Steuerrecht, Code 248, taxation 2024)',               ziffer: '248',          signe: '+' },
        { label: '20 % du steuerbares Vermögen',                                                 ziffer: '338 × 20 %',   signe: '+' },
        { label: 'Leistungen / Einkaufsbeiträge berufliche Vorsorge (Säule 2/BVG)',                                      signe: '+' },
        { label: 'Beiträge gebundene Selbstvorsorge (Säule 3a)',                                                          signe: '+' },
        { label: 'Liegenschaftsaufwand net (excédent > 20 % Pauschalabzug des Mieteinnahmen)',                            signe: '+' },
        { label: 'Vorjahresverluste (Art. 42 StG)',                                                                       signe: '+' },
        { label: '75 % du Bruttoeinkommen vereinfachtes Abrechnungsverfahren',                                            signe: '+' },
        { label: 'Freiwillige Zuwendungen und Parteispenden',                                                              signe: '+' },
        { label: '30 % de l\'Eigenmietwert (réintégration de la déduction)',                                              signe: '+' },
        { label: '30 % des Beteiligungserträge Privatvermögen',                                                           signe: '+' },
        { label: '30 % des Beteiligungserträge Geschäftsvermögen',                                                        signe: '+' },
        { label: 'CHF 4 000 par enfant (Kinderabzug)',                                           ziffer: '−4 000/enfant', signe: '-' },
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

  /* ─── ARGOVIE (AG) ───────────────────────────────────────────────────── */
  // Sources : https://www.sva-aargau.ch/private/ihre-private-situation/finanzielle-unterstuetzung/praemienverbilligung/allgemeine
  //           https://www.ag.ch/media/kanton-aargau/dgs/dokumente/gesellschaft/soziales/handbuch-soziales/kapitel-7/richtpr-mien-2026.pdf
  //           (AGS 2025/1 Anhang 1 — Berechnungselemente für die Verteilung der Prämienverbilligung 2026)
  // Scrapé le 23 avril 2026
  {
    code:         'AG',
    nom:          'Argovie',
    automatique:  false,   // EL / Sozialhilfe : attribution automatique ; autres : sur demande
    nbRegions:    1,       // aucune distinction régionale — Richtprämien cantonales uniques
    lienOfficiel: 'https://www.sva-aargau.ch/private/ihre-private-situation/finanzielle-unterstuetzung/praemienverbilligung/allgemeine',
    annee:        2026,
    delaiDemande: '31 décembre 2026',   // candidature rétroactive possible jusqu'au 31.12.2026 ; paiement dès le mois suivant la demande
    noteGenerale: 'EL/Sozialhilfe : attribution automatique. Déclaration obligatoire dans les 60 jours si revenu augmente de ≥ 20 % ou CHF 20 000, ou si fortune augmente de ≥ CHF 20 000. Pas de Vermögensgrenzen absolues : le patrimoine est intégré au revenu via le coefficient de 20 %.',
    formule: {
      type:         'proportionnel',
      selbstbehaltPct: 17.5,    // Einkommenssatz — AGS 2025/1 Anhang 1 / § 5 KVGG
      coeffFortune: 0.20,       // 20 % du Reinvermögen ajouté au revenu — SVA Aargau site officiel
      // Einkommensabzüge par catégorie de ménage — AGS 2025/1 Anhang 1
      einkommensabzuege: {
        alleinstehend:           8_500,
        alleinstehendMitKindern: 12_200,
        ehepaarOhneKinder:       0,
        ehepaarMitKindern:       8_000,
        proKindJAFormation:      2_500,
      },
      pctRichtprämieEnfant:      100,
      pctRichtprämieJAFormation: 100,
      richtprämienAn: [
        { region: 'unique', adulte: 5_830, jeuneAdulteFormation: 4_260, enfant: 1_380 },
      ],
      // Composantes du revenu massgebend — SVA Aargau site officiel (base : taxation 2023)
      composantesRevenu: [
        { label: 'Revenu imposable déterminant (steuerbares Einkommen, taxation 2023)',      signe: '+' },
        { label: '20 % du patrimoine net (Reinvermögen)',                                    signe: '+' },
        { label: 'Frais d\'entretien immeubles excédant l\'abattement fiscal standard',      signe: '+' },
        { label: 'Cotisations 2e pilier (berufliche Vorsorge)',                              signe: '+' },
        { label: 'Cotisations 3e pilier lié (Säule 3a)',                                    signe: '+' },
        { label: 'Dons à des institutions d\'utilité publique (gemeinnützige Zuwendungen)',  signe: '+' },
        { label: 'Cotisations à des partis politiques (Mitgliederbeiträge)',                 signe: '+' },
        { label: 'Pertes antérieures (Verlustvorträge, indépendants)',                       signe: '+' },
        { label: 'Abattement fiscal revenus modestes (Kleinverdienerabzug)',                 signe: '+' },
        { label: 'Revenus déclarés au régime simplifié (vereinfachtes Abrechnungsverfahren)', signe: '+' },
        { label: 'Déduction forfaitaire ménage (Einkommensabzug selon catégorie)',           signe: '-' },
        { label: 'CHF 2 500 par enfant ou JA en formation (proKindJAFormation)',             signe: '-' },
      ],
    },
  },

  /* ─── GRISONS (GR) ────────────────────────────────────────────────────── */
  // Sources : https://www.sva.gr.ch/files/sva/dienstleistungen/07_ipv/ipv_wegleitung_d.pdf
  //           https://www.sva.gr.ch/files/sva/dienstleistungen/07_ipv/ipv_praemienregion_d.pdf
  // Scrapé le 23 avril 2026
  {
    code:         'GR',
    nom:          'Grisons',
    automatique:  false,
    nbRegions:    3,
    lienOfficiel: 'https://www.sva.gr.ch/dienstleistungen/individuelle-praemienverbilligung.html',
    annee:        2026,
    delaiDemande: '31 décembre 2026',
    noteGenerale: 'Personnes à la source : anmeldung jährlich. Avance de 65 % si taxation 2025 non encore disponible à la date du traitement.',
    formule: {
      type:         'proportionnel',
      coeffFortune: 0.10,   // 10 % du Reinvermögen ajouté au revenu satzbestimmend — Wegleitung p. 1
      // Selbstbehalt adultes : tranches de revenu anrechenbar — Wegleitung p. 1
      selbstbehaltTranches: [
        { revenuMaxAn:  10_000, tauxPct:  5.0 },
        { revenuMaxAn:  20_000, tauxPct:  6.5 },
        { revenuMaxAn:  30_000, tauxPct:  8.0 },
        { revenuMaxAn:  40_000, tauxPct:  9.0 },
        { revenuMaxAn: Infinity, tauxPct: 10.0 },
      ],
      // Selbstbehalt enfants et JA en formation : % de la Richtprämie (pas du revenu) — Wegleitung p. 1
      // Revenu = revenu anrechenbar total du foyer (Gesamtanspruch)
      selbstbehaltTranchesEnfantJA: [
        { revenuMaxAn:  65_000, pctRichtprämie:   0 },
        { revenuMaxAn:  70_000, pctRichtprämie:  25 },
        { revenuMaxAn:  75_000, pctRichtprämie:  50 },
        { revenuMaxAn:  80_000, pctRichtprämie:  75 },
        { revenuMaxAn: Infinity, pctRichtprämie: 100 },
      ],
      pctRichtprämieEnfant:      100,
      pctRichtprämieJAFormation: 100,
      // Richtprämien 2026 — Wegleitung p. 1 (fixées par le Gouvernement)
      richtprämienAn: [
        { region: '1', adulte: 5_916, jeuneAdulteFormation: 4_368, enfant: 1_404 },
        { region: '2', adulte: 5_532, jeuneAdulteFormation: 4_092, enfant: 1_320 },
        { region: '3', adulte: 5_232, jeuneAdulteFormation: 3_912, enfant: 1_248 },
      ],
      // Composantes du revenu anrechenbar — Wegleitung p. 1 (§ art. 99 StG pour les sourciers)
      composantesRevenu: [
        { label: 'Revenu satzbestimmend imposable (satzbestimmendes steuerbares Einkommen)', signe: '+' },
        { label: '10 % du patrimoine net (Reinvermögen)',                                    signe: '+' },
        { label: 'Revenus non imposés de participations (nicht versteuerte Beteiligungserträge)', signe: '+' },
        { label: 'Rendement net négatif des immeubles (Nettoertrag Liegenschaften < 0)',     signe: '+' },
        { label: 'Cotisations 2e pilier (Beiträge berufliche Vorsorge)',                     signe: '+' },
        { label: 'Cotisations 3e pilier lié (Beiträge Säule 3a)',                            signe: '+' },
        { label: 'Dons à des institutions d\'utilité publique (gemeinnützige Zuwendungen)',  signe: '+' },
        { label: 'Cotisations à des partis politiques (Mitgliederbeiträge)',                 signe: '+' },
        { label: 'Revenus déclarés au régime simplifié (vereinfachtes Abrechnungsverfahren)', signe: '+' },
      ],
    },
  },

  /* ─── THURGOVIE (TG) ─────────────────────────────────────────────────── */
  // Source : https://www.aadorf.ch/public/upload/assets/7940/Merkblatt%20IPV%202026.pdf
  //          (Amt für Gesundheit TG — Information zur Prämienverbilligung 2026)
  //          https://gesundheit.tg.ch/bevoelkerung/krankenversicherung/praemienverbilligung.html/5578
  // Scrapé le 23 avril 2026
  {
    code:         'TG',
    nom:          'Thurgovie',
    // Communes envoient un formulaire aux éligibles au printemps ; EL/Sozialhilfe = auto
    automatique:  false,
    nbRegions:    1,
    lienOfficiel: 'https://gesundheit.tg.ch/bevoelkerung/krankenversicherung/praemienverbilligung.html/5578',
    annee:        2026,
    delaiDemande: '31 décembre 2026',
    noteGenerale:
      'Modèle fiscal unique : éligibilité basée sur la "einfache satzbestimmende Steuer zu 100 %" (données provisoires de l\'année précédente). ' +
      'Condition : steuerbares Vermögen provisoire ≤ CHF 0. ' +
      'EL/Sozialhilfe : Prämienpauschale automatique, pas de demande nécessaire. ' +
      'JA en formation (nés 2001–2007) : reçoivent d\'abord IPV Cat. A–C ; peuvent demander reclassification en JA l\'année suivante. ' +
      'Délai impératif — le droit s\'éteint définitivement sans possibilité de nouveau calcul si la date limite est manquée.',
    // Barème fiscal TG — Merkblatt IPV 2026
    baremeFiscalTG: [
      // Adultes (26 ans et plus)
      { categorie: 'A', profil: 'adulte', steuerMax:   400, ipvAn: 3_408 },
      { categorie: 'B', profil: 'adulte', steuerMax:   600, ipvAn: 2_556 },
      { categorie: 'C', profil: 'adulte', steuerMax:   800, ipvAn: 1_704 },
      // Enfants (nés 2008–2025) — basé sur la Steuer des parents
      { categorie: 'D', profil: 'enfant', steuerMax: 1_600, ipvAn: 1_236 },
    ],
    // JA en formation : 50 % de la prime KVG effective, plafonnée à 50 % de la moyenne cantonale
    // Prime moyenne cantonale 2026 : CHF 4 752/an → max IPV : CHF 2 376/an
    jaFormationIPVMaxAn: 2_376,
  },

  /* ─── TESSIN (TI) ────────────────────────────────────────────────────── */
  // Sources : https://www4.ti.ch/fileadmin/DSS/IAS/pdf/informazioni_periodiche/2026_Info_periodiche_RIPAM.pdf
  //           https://www4.ti.ch/fileadmin/DSS/IAS/pdf/approfondimenti/Istruzioni_per_la_richiesta_di_RIPAM_2026.pdf
  //           Rapporto di maggioranza n. 8619 R1 del 02.12.2025 — art. 32a–32b LCAMal, norma transitoria 2026
  //           Decreto esecutivo del Consiglio di Stato 19.11.2025 (PMR 2026)
  // Scrapé le 23 avril 2026
  {
    code:         'TI',
    nom:          'Tessin',
    // PC/AFI/API/prestazioni assistenziali : traitement d'office ; autres : formulaire sur demande
    automatique:  false,
    nbRegions:    1,   // PMR uniques pour tout le canton — pas de régions de primes pour la RIPAM
    lienOfficiel: 'https://www4.ti.ch/dss/ias/prestazioni-e-contributi/scheda/p/s/dettaglio/riduzione-dei-premi-dellassicurazione-malattia-ripam/richiesta-del-formulario-ripam/',
    annee:        2026,
    // Droit dès janvier 2026 uniquement si demande soumise au plus tard le 31.12.2025 ;
    // sinon droit à partir du mois suivant le dépôt (cachet postal)
    delaiDemande: '31 décembre 2025',
    noteGenerale:
      'Modèle unique basé sur le Reddito Disponibile (RD). ' +
      'Norma transitoria 2026 : costanti relevées suite à la votation populaire du 28.09.2025 (art. 32a LCAMal). ' +
      'PC AVS/AI, AFI, API et bénéficiaires de prestazioni assistenziali : droit établi d\'office. ' +
      'Base de calcul : imponibile IC 2023 (tassazione definitiva) ; en l\'absence, situation économique actuelle.',
    // PMR 2026 — Decreto esecutivo del Consiglio di Stato 19.11.2025
    // Utilisés comme Richtprämien : entrent dans le calcul du RD ET constituent le plafond de la RIPAM
    formule: {
      type:         'proportionnel',
      coeffFortune: 1 / 15,   // 1/15 de la sostanza netta ajouté au reddito — Istruzioni RIPAM 2026
      // Pas de selbstbehaltTranches : l'éligibilité et le montant sont déterminés via parametriRipamTI
      pctRichtprämieEnfant:      100,
      pctRichtprämieJAFormation: 100,
      richtprämienAn: [
        { region: 'unique', adulte: 8_016, jeuneAdulteFormation: 6_143, enfant: 1_827 },
      ],
      // Composantes du Reddito Disponibile (RD) — Istruzioni RIPAM 2026 p. 2
      composantesRevenu: [
        { label: 'Somme des revenus de l\'UR (punto 8 IC 2023, brut frais immobiliers)',     signe: '+' },
        { label: 'Revenus éventuels (punto 5.5 IC 2023)',                                    signe: '+' },
        { label: '1/15 de la sostanza netta (punto 34 IC 2023)',                             signe: '+' },
        { label: 'PMR 2026 de tous les membres de l\'UR',                                    signe: '-' },
        { label: 'Contributions sociales obligatoires (AVS, AI, IPG, AD, AINP, LPP — punti 10.1–10.3)', signe: '-' },
        { label: 'Pensions alimentaires versées — ex-conjoint et enfants (punti 14.1–14.2)', signe: '-' },
        { label: 'Frais professionnels salariés (max CHF 4 000/an par UR)',                  signe: '-' },
        { label: 'Intérêts passifs privés et professionnels (max CHF 3 000/an — punti 13.2–13.3)', signe: '-' },
      ],
    },
    // Paramètres spécifiques RIPAM TI — art. 32a–32b LCAMal (en vigueur 01.01.2026)
    parametriRipamTI: {
      // Costanti 2026 (norma transitoria — votation 28.09.2025)
      costanteSenzaFigli:      5.0,    // base LCAMal : 3.8 ; transitoire 2026 : 5.0
      costanteConFigliBase:    5.9,    // base LCAMal : 4.7 ; transitoire 2026 : 5.9
      // RDM senza figli = 5.0 × 0.5 × fabbisogno_UR
      // RDM con figli   = [5.9 + (1 − nb_figli / 10)] × 0.5 × fabbisogno_UR
      // Limite di fabbisogno par position dans l'UR (art. 32b, en vigueur 01.01.2026)
      fabbisognoPersonaUR:     18_182,  // a) 1re personne de l'UR
      fabbisognoSuppl1:         8_955,  // b) 2e personne totale (1re supplémentaire)
      fabbisognoSuppl2:         6_675,  // c) 3e personne totale
      fabbisognoSuppl3:         5_105,  // d) 4e personne totale
      fabbisognoSuppl4plus:     5_086,  // e) 5e personne et chaque suivante
      // Déductions admises dans le calcul du RD
      speseProfessionaliMax:    4_000,
      speseInteressiMax:        3_000,
      // Garanties fédérales
      pctMinPMRMinorenni:         80,
      pctMinPMRJAFormazione:      50,
      importoMinAnnuoPerMembro:  120,
    },
  },


  /* ─── GENÈVE (GE) ─────────────────────────────────────────────────────── */
  // Source : ge.ch/informations-generales-subside-assurance-maladie/baremes
  // 9 groupes d'imposition — montants mensuels fixes, seuils de revenu annuel
  // Seuils ajustés par enfant : +13 000 CHF (seul) / +17 000 CHF (couple) par enfant
  {
    code:         'GE',
    nom:          'Genève',
    automatique:  true,
    nbRegions:    1,
    lienOfficiel: 'https://www.ge.ch/informations-generales-subside-assurance-maladie/baremes',
    annee:        2026,
    bonusParEnfantSeulGE:    13_000,
    bonusParEnfantCoupleGE:  17_000,
    groupesGE: [
      // groupe, adulte CHF/mois, jeune CHF/mois, enfant CHF/mois, revenuMaxSeul, revenuMaxCouple
      { groupe: 1, adulte: 348, jeune: 231, enfant: 132, revenuMaxSeul:  30_000, revenuMaxCouple:  45_000 },
      { groupe: 2, adulte: 294, jeune: 231, enfant: 132, revenuMaxSeul:  32_917, revenuMaxCouple:  55_000 },
      { groupe: 3, adulte: 240, jeune: 231, enfant: 132, revenuMaxSeul:  35_833, revenuMaxCouple:  65_000 },
      { groupe: 4, adulte: 196, jeune: 231, enfant: 132, revenuMaxSeul:  38_750, revenuMaxCouple:  75_000 },
      { groupe: 5, adulte: 164, jeune: 231, enfant: 132, revenuMaxSeul:  41_667, revenuMaxCouple:  85_000 },
      { groupe: 6, adulte: 120, jeune: 231, enfant: 132, revenuMaxSeul:  44_583, revenuMaxCouple:  95_000 },
      { groupe: 7, adulte:  87, jeune: 231, enfant: 132, revenuMaxSeul:  47_500, revenuMaxCouple: 105_000 },
      { groupe: 8, adulte:  55, jeune: 231, enfant: 132, revenuMaxSeul:  50_000, revenuMaxCouple: 115_000 },
      // Groupe 9 : réservé aux familles avec enfants quand revenu > plafond du groupe 8
      // adulte = 0 (adulte seul sans enfant hors barème) ; jeune et enfant conservent un droit résiduel
      { groupe: 9, adulte:   0, jeune: 106, enfant:  67, revenuMaxSeul: Infinity, revenuMaxCouple: Infinity },
    ],
    noteGenerale:
      'Barème 2026 — source : ge.ch. Estimation (seuils intermédiaires des groupes 2–8 interpolés). ' +
      'Consultez ge.ch pour le montant officiel exact.',
  },

  /* ─── VAUD (VD) ───────────────────────────────────────────────────────── */
  // Source : Notice explicative OVAM 2026
  // Barème linéaire par morceaux — subside ordinaire mensuel
  // Un subside spécifique complémentaire peut s'ajouter si primes > 10 % du RDU
  {
    code:         'VD',
    nom:          'Vaud',
    automatique:  false,
    nbRegions:    2,
    lienOfficiel: 'https://www.vd.ch/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',
    annee:        2026,
    delaiDemande: 'Délais prolongés 2026 — consulter OVAM',
    segmentsVD: [
      // adulte26_seul : adulte ≥ 26 ans, personne seule sans enfant ni couple
      { profil: 'adulte26_seul', revenuMin:      0, revenuMax:  17_000, montantMin: 331, montantMax: 331 },
      { profil: 'adulte26_seul', revenuMin: 17_000, revenuMax:  40_000, montantMin: 331, montantMax:  30 },
      { profil: 'adulte26_seul', revenuMin: 40_000, revenuMax:  50_000, montantMin:  30, montantMax:  30 },
      { profil: 'adulte26_seul', revenuMin: 50_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
      // adulte1925 : jeune adulte 19–25 ans (seul, en couple, avec ou sans enfants)
      { profil: 'adulte1925', revenuMin:      0, revenuMax:  16_000, montantMin: 255, montantMax: 255 },
      { profil: 'adulte1925', revenuMin: 16_000, revenuMax:  34_000, montantMin: 255, montantMax:  20 },
      { profil: 'adulte1925', revenuMin: 34_000, revenuMax:  39_000, montantMin:  20, montantMax:  20 },
      { profil: 'adulte1925', revenuMin: 39_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
      // adulte26_famille : adulte ≥ 26 ans en couple ou avec enfant(s)
      // Discontinuité à 24 200 CHF : passage de 318 CHF (palier) à ~300 CHF (début de la rampe)
      { profil: 'adulte26_famille', revenuMin:      0, revenuMax:  24_200, montantMin: 318, montantMax: 318 },
      { profil: 'adulte26_famille', revenuMin: 24_200, revenuMax:  55_000, montantMin: 300, montantMax:  20 },
      { profil: 'adulte26_famille', revenuMin: 55_000, revenuMax:  72_500, montantMin:  20, montantMax:  20 },
      { profil: 'adulte26_famille', revenuMin: 72_500, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
      // enfant : moins de 18 ans (indépendant de la région — barème unique selon la notice OVAM)
      { profil: 'enfant', revenuMin:      0, revenuMax:  76_000, montantMin: 114, montantMax: 114 },
      { profil: 'enfant', revenuMin: 76_000, revenuMax: Infinity, montantMin:   0, montantMax:   0 },
    ],
    noteGenerale:
      'Subside ordinaire — estimation indicative OVAM 2026. ' +
      'Un subside spécifique peut s\'ajouter si vos primes dépassent 10 % du RDU. ' +
      'Délais de demande prolongés en 2026 (contacter OVAM).',
  },

  /* ─── NEUCHÂTEL (NE) ──────────────────────────────────────────────────── */
  // Source : ne.ch — barème 2026, classifications S1–S15 (RSN 821.102)
  // Revenu ajusté avant comparaison aux seuils S :
  //   revAdj = (revenu / facteurCoupleNE) / (1 + nbEnfants × facteurEnfantNE)
  //   facteurCoupleNE = 0.60 si couple, 1.0 si seul
  {
    code:         'NE',
    nom:          'Neuchâtel',
    automatique:  true,
    nbRegions:    1,
    lienOfficiel: 'https://www.ne.ch/themes/social/assurance-maladie/subsides-assurance-maladie-lamal',
    annee:        2026,
    facteurCoupleNE:  0.60,
    facteurEnfantNE:  0.28,
    bandesNE: [
      // label, adulte CHF/mois, jeune CHF/mois, enfant CHF/mois, maxSeul revenu ajusté
      { label: 'S1–S11', adulte: 643, jeune: 484, enfant: 160, maxSeul: 50_600 },
      { label: 'S12',    adulte: 515, jeune: 387, enfant: 160, maxSeul: 53_500 },
      { label: 'S13',    adulte: 390, jeune: 293, enfant: 160, maxSeul: 56_400 },
      { label: 'S14',    adulte: 272, jeune: 204, enfant: 160, maxSeul: 58_164 },
      { label: 'S15',    adulte: 166, jeune: 124, enfant: 160, maxSeul: 65_089 },
    ],
    noteGenerale:
      'Estimation basée sur les classifications S1–S15. Barème complet : RSN 821.102. ' +
      'Attribution automatique dès 26 ans après taxation fiscale.',
  },

  /* ─── FRIBOURG (FR) ───────────────────────────────────────────────────── */
  // Sources : FR-memento_rpi_f_2026.pdf + FR-grille_lissage_des_taux_paliers_f.pdf (ECAS FR)
  //           Mémento RPI 2026 (art. 14–15 LALAMal + art. 6 ORP)
  //
  // Formule complète :
  //   1. Revenu déterminant (RD) = revenu net fiscal (code 4.910)
  //      + primes et cotisations assurance (codes 4.110–4.140)
  //      + intérêts passifs privés au-delà de CHF 30 000 (code 4.210)
  //      + frais entretien immeubles privés au-delà de CHF 15 000 (code 4.310)
  //      + 5 % de la fortune imposable (code 7.910)
  //   2. Exclusion absolue : revenu net > 150 000 CHF OU fortune imposable > 250 000 CHF
  //   3. Éligibilité : RD < limite(situation, nbEnfants)
  //   4. pctEnDessous = (limite − RD) / limite × 100
  //   5. Lookup taux dans paliersFR
  //   6. Subside = taux/100 × prime_moyenne_régionale[profil][région]
  //      Enfants : taux = max(taux calculé, 80 %)  ; JA formation : taux = max(taux calculé, 50 %)
  //   7. Plafond : subside ≤ prime nette réelle de l'assuré (100 %)
  {
    code:         'FR',
    nom:          'Fribourg',
    automatique:  true,
    nbRegions:    2,
    lienOfficiel: 'https://www.ecasfr.ch/fr/Assurances/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie.html',
    annee:        2026,
    delaiDemande: '31 août 2026',
    limiteFortuneSeul:   250_000,   // exclusion absolue si fortune imposable > 250 000
    limiteFortuneCouple: 250_000,
    // Seuils d'éligibilité (mémento 2026, art. 3 ORP)
    // seul 1e : +20 400 (premier enfant), puis +14 000 par enfant supplémentaire
    // couple : +14 000 par enfant
    seuilsRevenu: [
      { statut: 'seul',   profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  37_000 },
      { statut: 'seul',   profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  57_400 },
      { statut: 'seul',   profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  71_400 },
      { statut: 'seul',   profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn:  85_400 },
      { statut: 'seul',   profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn:  99_400 },
      { statut: 'seul',   profil: 'adulte', enfants: 5, region: 'unique', revenuMaxAn: 113_400 },
      { statut: 'seul',   profil: 'adulte', enfants: 6, region: 'unique', revenuMaxAn: 127_400 },
      { statut: 'couple', profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn:  65_000 },
      { statut: 'couple', profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn:  79_000 },
      { statut: 'couple', profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn:  93_000 },
      { statut: 'couple', profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn: 107_000 },
      { statut: 'couple', profil: 'adulte', enfants: 4, region: 'unique', revenuMaxAn: 121_000 },
      { statut: 'couple', profil: 'adulte', enfants: 5, region: 'unique', revenuMaxAn: 135_000 },
      { statut: 'couple', profil: 'adulte', enfants: 6, region: 'unique', revenuMaxAn: 149_000 },
    ],
    // Prime moyenne régionale mensuelle 2026 (base du calcul du subside, art. 8.1 mémento)
    primesMoyennesFR: [
      { region: '1', adulte: 569, jeune: 415, enfant: 136 },   // Région 1 : district de la Sarine
      { region: '2', adulte: 524, jeune: 386, enfant: 124 },   // Région 2 : Broye, Glâne, Gruyère, Lac, Singine, Veveyse
    ],
    // Taux minimum garanti (% de la prime moyenne) pour profils protégés
    pctMinEnfantFR:      80,   // enfants à charge : subside ≥ 80 % de la prime moyenne enfant
    pctMinJAFormationFR: 50,   // JA en formation jusqu'à 25 ans : subside ≥ 50 % de la prime moyenne jeune
    // Grille lissage des taux — 60 paliers (art. 6 ORP / art. 15 LALAMal)
    // Source : FR-grille_lissage_des_taux_paliers_f.pdf (ECAS FR, 06.2023/ECAS)
    paliersFR: [
      { pctMin:  0.01, pctMax:  1.02, taux:  1.00 },
      { pctMin:  1.03, pctMax:  2.03, taux:  2.08 },
      { pctMin:  2.04, pctMax:  3.05, taux:  3.17 },
      { pctMin:  3.06, pctMax:  4.07, taux:  4.25 },
      { pctMin:  4.08, pctMax:  5.08, taux:  5.34 },
      { pctMin:  5.09, pctMax:  6.10, taux:  6.42 },
      { pctMin:  6.11, pctMax:  7.12, taux:  7.51 },
      { pctMin:  7.13, pctMax:  8.14, taux:  8.59 },
      { pctMin:  8.15, pctMax:  9.15, taux:  9.68 },
      { pctMin:  9.16, pctMax: 10.17, taux: 10.76 },
      { pctMin: 10.18, pctMax: 11.19, taux: 11.85 },
      { pctMin: 11.20, pctMax: 12.20, taux: 12.93 },
      { pctMin: 12.21, pctMax: 13.22, taux: 14.02 },
      { pctMin: 13.23, pctMax: 14.24, taux: 15.10 },
      { pctMin: 14.25, pctMax: 15.25, taux: 16.19 },
      { pctMin: 15.26, pctMax: 16.27, taux: 17.27 },
      { pctMin: 16.28, pctMax: 17.29, taux: 18.36 },
      { pctMin: 17.30, pctMax: 18.31, taux: 19.44 },
      { pctMin: 18.32, pctMax: 19.32, taux: 20.53 },
      { pctMin: 19.33, pctMax: 20.34, taux: 21.61 },
      { pctMin: 20.35, pctMax: 21.36, taux: 22.69 },
      { pctMin: 21.37, pctMax: 22.37, taux: 23.78 },
      { pctMin: 22.38, pctMax: 23.39, taux: 24.86 },
      { pctMin: 23.40, pctMax: 24.41, taux: 25.95 },
      { pctMin: 24.42, pctMax: 25.42, taux: 27.03 },
      { pctMin: 25.43, pctMax: 26.44, taux: 28.12 },
      { pctMin: 26.45, pctMax: 27.46, taux: 29.20 },
      { pctMin: 27.47, pctMax: 28.47, taux: 30.29 },
      { pctMin: 28.48, pctMax: 29.49, taux: 31.37 },
      { pctMin: 29.50, pctMax: 30.51, taux: 32.46 },
      { pctMin: 30.52, pctMax: 31.53, taux: 33.54 },
      { pctMin: 31.54, pctMax: 32.54, taux: 34.63 },
      { pctMin: 32.55, pctMax: 33.56, taux: 35.71 },
      { pctMin: 33.57, pctMax: 34.58, taux: 36.80 },
      { pctMin: 34.59, pctMax: 35.59, taux: 37.88 },
      { pctMin: 35.60, pctMax: 36.61, taux: 38.97 },
      { pctMin: 36.62, pctMax: 37.63, taux: 40.05 },
      { pctMin: 37.64, pctMax: 38.64, taux: 41.14 },
      { pctMin: 38.65, pctMax: 39.66, taux: 42.22 },
      { pctMin: 39.67, pctMax: 40.68, taux: 43.31 },
      { pctMin: 40.69, pctMax: 41.69, taux: 44.39 },
      { pctMin: 41.70, pctMax: 42.71, taux: 45.47 },
      { pctMin: 42.72, pctMax: 43.73, taux: 46.56 },
      { pctMin: 43.74, pctMax: 44.75, taux: 47.64 },
      { pctMin: 44.76, pctMax: 45.76, taux: 48.73 },
      { pctMin: 45.77, pctMax: 46.78, taux: 49.81 },
      { pctMin: 46.79, pctMax: 47.80, taux: 50.90 },
      { pctMin: 47.81, pctMax: 48.81, taux: 51.98 },
      { pctMin: 48.82, pctMax: 49.83, taux: 53.07 },
      { pctMin: 49.84, pctMax: 50.85, taux: 54.15 },
      { pctMin: 50.86, pctMax: 51.86, taux: 55.24 },
      { pctMin: 51.87, pctMax: 52.88, taux: 56.32 },
      { pctMin: 52.89, pctMax: 53.90, taux: 57.41 },
      { pctMin: 53.91, pctMax: 54.92, taux: 58.49 },
      { pctMin: 54.93, pctMax: 55.93, taux: 59.58 },
      { pctMin: 55.94, pctMax: 56.95, taux: 60.66 },
      { pctMin: 56.96, pctMax: 57.97, taux: 61.75 },
      { pctMin: 57.98, pctMax: 58.98, taux: 62.83 },
      { pctMin: 58.99, pctMax: 60.00, taux: 63.92 },
      { pctMin: 60.01, pctMax: Infinity, taux: 65.00 },
    ],
    noteGenerale:
      'Fribourg — RPI 2026. Sources : Mémento RPI 2026 + Grille lissage des taux (ECAS FR). ' +
      'Revenu déterminant = revenu net fiscal + primes assurances + intérêts passifs (au-delà 30k) ' +
      '+ entretien immeubles (au-delà 15k) + 5% fortune imposable. ' +
      'Exclusions absolues : revenu net > 150 000 CHF ou fortune > 250 000 CHF. ' +
      'Source-taxés : RD = 80% revenu brut + 1/20 fortune. ' +
      'Délai de demande : 31 août 2026.',
  },

  /* ─── JURA (JU) ───────────────────────────────────────────────────────── */
  // Sources : communiqué SIC jura.ch 2025 + ecasjura.ch RPI 2026
  // Deux systèmes distincts :
  //   (A) Subside partiel ordinaire — bénéficiaires selon revenu (RDU)
  //   (B) Subside intégral — bénéficiaires PC AVS/AI et aide sociale (pleine prime de référence)
  {
    code:         'JU',
    nom:          'Jura',
    automatique:  false,
    nbRegions:    1,
    lienOfficiel: 'https://www.ecasjura.ch/fr/Assurances/Assurance-maladie/Reduction-des-primes-d-assurance-maladie-RPI-Informations-generales-2026/Reduction-des-primes-d-assurance-maladie-RPI-Informations-generales-2026.html',
    annee:        2026,
    delaiDemande: '31 décembre 2026',
    // Seuils d'éligibilité (RDU) — source : communiqué jura.ch 2025
    // adulte seul : RDU ≤ 26 999 ; enfants/JA formation : RDU ≤ 52 999
    // couple sans enfant : 40 000 (source : ecasjura.ch, à confirmer pour 2026)
    seuilsRevenu: [
      { statut: 'seul',   profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn: 26_999 },
      { statut: 'seul',   profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn: 52_999 },
      { statut: 'seul',   profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn: 52_999 },
      { statut: 'seul',   profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn: 52_999 },
      { statut: 'couple', profil: 'adulte', enfants: 0, region: 'unique', revenuMaxAn: 40_000 },
      { statut: 'couple', profil: 'adulte', enfants: 1, region: 'unique', revenuMaxAn: 52_999 },
      { statut: 'couple', profil: 'adulte', enfants: 2, region: 'unique', revenuMaxAn: 52_999 },
      { statut: 'couple', profil: 'adulte', enfants: 3, region: 'unique', revenuMaxAn: 52_999 },
    ],
    // Montants subside partiel ordinaire 2026 (système A)
    // adulte : gradué 15–225 CHF/mois selon RDU (barème complet non publié — montantMois = maximum)
    // enfant et JA formation : montants fixes 2026 (hausse par rapport à 2025)
    montantsSubside: [
      { region: 'unique', profil: 'adulte',       revenuMaxAn: 26_999, montantMois: 225 },   // max ; gradué 15–225
      { region: 'unique', profil: 'enfant',       revenuMaxAn: 52_999, montantMois: 100 },   // fixe (97 CHF en 2025)
      { region: 'unique', profil: 'jeune_adulte', revenuMaxAn: 52_999, montantMois: 196 },   // fixe (185 CHF en 2025)
    ],
    noteGenerale:
      'Jura — RPI 2026. Source : communiqué SIC jura.ch + ecasjura.ch. ' +
      '(A) Subside partiel ordinaire : adulte 15–225 CHF/mois (gradué selon RDU, barème complet non publié), ' +
      'enfant 100 CHF/mois, JA formation < 25 ans 196 CHF/mois. ' +
      'Supplément famille (RDU < 18 000 CHF) : 15–300 CHF/mois supplémentaire pour les parents. ' +
      '(B) Subside intégral (PC AVS/AI, aide sociale) : adulte 568.30 / JA 391.80 / enfant 125.00 CHF/mois. ' +
      'Délai de demande : 31 décembre 2026.',
  },

  /* ─── VALAIS (VS) ─────────────────────────────────────────────────────── */
  // Source : Echelle RIP 2026 — Service AVS Valais
  // Modèle : taux × prime de référence, par profil de ménage et tranche de revenu
  // Subside adulte = taux/100 × primeReferenceVS.adulte (ou .jeune si 19–25 ans)
  // Subside enfant = 80 % × primeReferenceVS.enfant si revenu ≤ enfantMaxRevenuVS
  {
    code:         'VS',
    nom:          'Valais',
    automatique:  true,
    nbRegions:    2,
    lienOfficiel: 'https://www.avsvalais.ch/fr/Assurances/RIP-Reduction-individuelle-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-caisse-maladie.html',
    annee:        2026,
    primeReferenceVS: { adulte: 521, jeune: 380, enfant: 122 },
    tauxVS: [
      // Personne seule sans enfant — VS_SEUL_0E
      { profil: 'seul_0e',   taux: 100, revenuMaxAn:  21_000 },
      { profil: 'seul_0e',   taux:  70, revenuMaxAn:  23_917 },
      { profil: 'seul_0e',   taux:  50, revenuMaxAn:  26_833 },
      { profil: 'seul_0e',   taux:  40, revenuMaxAn:  29_750 },
      { profil: 'seul_0e',   taux:  30, revenuMaxAn:  32_667 },
      { profil: 'seul_0e',   taux:  20, revenuMaxAn:  35_583 },
      { profil: 'seul_0e',   taux:  10, revenuMaxAn:  38_500 },
      // Personne seule avec 1+ enfant — VS_SEUL_1E (table unique pour nbEnfants ≥ 1)
      { profil: 'seul_1e+',  taux: 100, revenuMaxAn:  38_250 },
      { profil: 'seul_1e+',  taux:  70, revenuMaxAn:  41_896 },
      { profil: 'seul_1e+',  taux:  50, revenuMaxAn:  45_542 },
      { profil: 'seul_1e+',  taux:  40, revenuMaxAn:  49_188 },
      { profil: 'seul_1e+',  taux:  30, revenuMaxAn:  52_833 },
      { profil: 'seul_1e+',  taux:  20, revenuMaxAn:  56_479 },
      { profil: 'seul_1e+',  taux:  10, revenuMaxAn:  60_125 },
      // Couple sans enfant — VS_CPLI_0E
      { profil: 'couple_0e', taux: 100, revenuMaxAn:  36_750 },
      { profil: 'couple_0e', taux:  70, revenuMaxAn:  41_854 },
      { profil: 'couple_0e', taux:  50, revenuMaxAn:  46_958 },
      { profil: 'couple_0e', taux:  40, revenuMaxAn:  52_063 },
      { profil: 'couple_0e', taux:  30, revenuMaxAn:  57_167 },
      { profil: 'couple_0e', taux:  20, revenuMaxAn:  62_271 },
      { profil: 'couple_0e', taux:  10, revenuMaxAn:  67_375 },
      // Couple avec 1 enfant — VS_CPLI_1E
      { profil: 'couple_1e', taux: 100, revenuMaxAn:  48_750 },
      { profil: 'couple_1e', taux:  70, revenuMaxAn:  53_854 },
      { profil: 'couple_1e', taux:  50, revenuMaxAn:  58_958 },
      { profil: 'couple_1e', taux:  40, revenuMaxAn:  64_063 },
      { profil: 'couple_1e', taux:  30, revenuMaxAn:  69_167 },
      { profil: 'couple_1e', taux:  20, revenuMaxAn:  74_271 },
      { profil: 'couple_1e', taux:  10, revenuMaxAn:  79_375 },
      // Couple avec 2 enfants — VS_CPLI_2E
      { profil: 'couple_2e', taux: 100, revenuMaxAn:  58_750 },
      { profil: 'couple_2e', taux:  70, revenuMaxAn:  63_854 },
      { profil: 'couple_2e', taux:  50, revenuMaxAn:  68_958 },
      { profil: 'couple_2e', taux:  40, revenuMaxAn:  74_063 },
      { profil: 'couple_2e', taux:  30, revenuMaxAn:  79_167 },
      { profil: 'couple_2e', taux:  20, revenuMaxAn:  84_271 },
      { profil: 'couple_2e', taux:  10, revenuMaxAn:  89_375 },
      // Couple avec 3 enfants — VS_CPLI_3E
      { profil: 'couple_3e', taux: 100, revenuMaxAn:  66_750 },
      { profil: 'couple_3e', taux:  70, revenuMaxAn:  71_854 },
      { profil: 'couple_3e', taux:  50, revenuMaxAn:  76_958 },
      { profil: 'couple_3e', taux:  40, revenuMaxAn:  82_063 },
      { profil: 'couple_3e', taux:  30, revenuMaxAn:  87_167 },
      { profil: 'couple_3e', taux:  20, revenuMaxAn:  92_271 },
      { profil: 'couple_3e', taux:  10, revenuMaxAn:  97_375 },
      // Couple avec 4+ enfants — VS_CPLI_4E
      { profil: 'couple_4e+', taux: 100, revenuMaxAn:  72_750 },
      { profil: 'couple_4e+', taux:  70, revenuMaxAn:  77_854 },
      { profil: 'couple_4e+', taux:  50, revenuMaxAn:  82_958 },
      { profil: 'couple_4e+', taux:  40, revenuMaxAn:  88_063 },
      { profil: 'couple_4e+', taux:  30, revenuMaxAn:  93_167 },
      { profil: 'couple_4e+', taux:  20, revenuMaxAn:  98_271 },
      { profil: 'couple_4e+', taux:  10, revenuMaxAn: 103_375 },
    ],
    // Revenu max annuel pour le subside enfant (80 % × prime enfant de référence)
    enfantMaxRevenuVS: [
      { situation: 'seul',   nbEnfants: 1, revenuMax:  63_000 },
      { situation: 'seul',   nbEnfants: 2, revenuMax:  73_000 },
      { situation: 'seul',   nbEnfants: 3, revenuMax:  81_000 },
      { situation: 'seul',   nbEnfants: 4, revenuMax:  87_000 },
      { situation: 'couple', nbEnfants: 1, revenuMax: 116_000 },
      { situation: 'couple', nbEnfants: 2, revenuMax: 116_000 },
      { situation: 'couple', nbEnfants: 3, revenuMax: 116_000 },
      { situation: 'couple', nbEnfants: 4, revenuMax: 116_000 },
    ],
    noteGenerale:
      'Valais — Réduction individuelle des primes (RIP) 2026. ' +
      'Prime de référence : moyenne régions I et II. ' +
      'Subside enfant = 80 % × prime de référence enfant si revenu ≤ enfantMaxRevenuVS. ' +
      'Source : Echelle RIP 2026, Service AVS Valais.',
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
