// Modèle de données — Comparateur assurances complémentaires
// Objectif : couvrir le même niveau de détail que Comparis

// ─── Profils de comparaison standardisés ──────────────────────────────────────
// Utilisés pour obtenir des tarifs comparables entre assureurs

export type ProfilType =
  | 'jeune-adulte'   // 26 ans, sans enfant
  | 'famille'        // 35 ans, avec enfants
  | 'senior'         // 55 ans

export interface ProfilComparaison {
  id: ProfilType
  label: string
  age: number
  sexe: 'H' | 'F'
  canton: string    // code ISO canton (ex: 'VD', 'GE', 'FR')
  npa: number
}

export const PROFILS_COMPARAISON: ProfilComparaison[] = [
  { id: 'jeune-adulte', label: 'Jeune adulte', age: 26, sexe: 'H', canton: 'VD', npa: 1000 },
  { id: 'famille',      label: 'Famille',      age: 35, sexe: 'F', canton: 'GE', npa: 1200 },
  { id: 'senior',       label: 'Senior',       age: 55, sexe: 'H', canton: 'VD', npa: 1000 },
]

// ─── Catégories de couverture ──────────────────────────────────────────────────

export type FamilleComplementaire =
  | 'hospitalier'       // Chambre d'hôpital, libre choix médecin/hôpital
  | 'ambulatoire'       // Soins hors hôpital : physio, ostéo, spécialistes
  | 'dentaire'          // Soins dentaires courants et orthodontie
  | 'medecines-douces'  // Médecines alternatives reconnues ASCA/RME
  | 'optique'           // Lunettes, lentilles
  | 'prevention'        // Fitness, bilan santé, vaccination voyage
  | 'maternite'         // Préparation accouchement, sage-femme, bébé
  | 'voyage'            // Soins à l'étranger, rapatriement
  | 'autre'

// ─── Couverture hospitalière ───────────────────────────────────────────────────

export type TypeChambre = 'generale' | 'semi-privee' | 'privee' | 'flex'
export type ZoneGeographique = 'suisse' | 'europe' | 'monde'

export interface CouvertureHospitaliere {
  typeChambre: TypeChambre
  libreChoixHopital: boolean         // Peut choisir n'importe quel hôpital Suisse
  libreChoixMedecin: boolean         // Peut choisir son médecin dans l'hôpital
  zoneGeographique: ZoneGeographique
  pourcent?: number                  // % des frais couverts (ex: 100)
  montantMaxAnnuel?: number          // CHF/an — null = illimité
  forfaitJournalier?: number         // CHF/jour si applicable
  noteDetails?: string               // Précisions importantes en texte libre
}

// ─── Couverture ambulatoire ────────────────────────────────────────────────────

export interface PosteAmbulatoire {
  nom: string                        // Ex: "Physiothérapie", "Ostéopathie"
  couvert: boolean
  pourcent?: number                  // % des frais remboursés
  montantMaxAnnuel?: number          // CHF/an
  montantMaxSession?: number         // CHF/séance
  sessionsMax?: number               // Nombre max de séances/an
  noteDetails?: string
}

export interface CouvertureAmbulatoire {
  postes: PosteAmbulatoire[]
  montantGlobalMax?: number          // Plafond global toutes prestations ambulatoires
}

// ─── Couverture dentaire ───────────────────────────────────────────────────────

export interface CouvertureDentaire {
  couvert: boolean
  pourcentSoins?: number             // % remboursé pour soins courants
  montantMaxSoins?: number           // CHF/an soins courants
  orthodontie: boolean
  pourcentOrthodontie?: number
  montantMaxOrthodontie?: number
  implants: boolean
  montantMaxImplants?: number
  noteDetails?: string
}

// ─── Médecines douces ──────────────────────────────────────────────────────────

// Thérapies reconnues selon les listes ASCA et/ou RME
export type TherapieDouce =
  | 'homeopathie' | 'acupuncture' | 'osteopathie' | 'naturopathie'
  | 'chiropraxie' | 'reflexologie' | 'phytotherapie' | 'shiatsu'
  | 'medecine-traditionnelle-chinoise' | 'ayurveda' | 'hypnose'

export interface CouvertureMedecinesDouces {
  listesReconnues: ('ASCA' | 'RME' | 'autre')[]  // Listes de thérapeutes acceptées
  therapiesCouvertes: TherapieDouce[]
  montantMaxAnnuel?: number
  pourcent?: number
  noteDetails?: string
}

// ─── Optique ───────────────────────────────────────────────────────────────────

export interface CouvertureOptique {
  couvert: boolean
  montantMaxAnnuel?: number
  frequenceAns?: number              // Tous les X ans
  lunettes: boolean
  lentilles: boolean
  noteDetails?: string
}

// ─── Prévention & fitness ──────────────────────────────────────────────────────

export interface CouverturePrevention {
  fitness: boolean
  montantMaxFitness?: number         // CHF/an abonnement salle
  bilanSante: boolean
  vaccinationVoyage: boolean
  coachingSante: boolean
  autresPostes?: string[]
  montantGlobalMax?: number
  noteDetails?: string
}

// ─── Maternité ─────────────────────────────────────────────────────────────────

export interface CouvertureMaternite {
  couvert: boolean
  preparationAccouchement: boolean
  sageFemme: boolean
  montantMaxAnnuel?: number
  bebe: boolean                      // Couverture nourrisson incluse
  noteDetails?: string
}

// ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ─── ───

// ─── Produit complémentaire (unité de base du comparateur) ────────────────────

export interface DelaiAttente {
  mois: number
  detail?: string  // Ex: "3 mois pour la dentaire, 0 pour hospitalier"
}

export interface TarifMensuel {
  profilId: ProfilType
  montantCHF: number
  source: 'site-web' | 'api' | 'pdf' | 'courtier' | 'appel' | 'estime'
  dateReleve: string  // ISO date
}

export interface ProduitComplementaire {
  id: string                         // slug unique ex: "assura-medna"
  assureurId: string                 // ref vers AssureurComplementaire.id
  nomProduit: string                 // Nom commercial exact ex: "MEDNA"
  famille: FamilleComplementaire     // Catégorie principale
  familles?: FamilleComplementaire[] // Si multi-familles (ex: ambulatoire + optique)
  description: string                // 1-2 phrases en français simple

  // Couvertures détaillées
  hospitalier?: CouvertureHospitaliere
  ambulatoire?: CouvertureAmbulatoire
  dentaire?: CouvertureDentaire
  medecinesDouces?: CouvertureMedecinesDouces
  optique?: CouvertureOptique
  prevention?: CouverturePrevention
  maternite?: CouvertureMaternite

  // Conditions
  delaiAttente?: DelaiAttente
  exclusionsPrincipales?: string[]   // Liste des exclusions importantes
  conditionsSouscription?: string[]  // Ex: "Réservé aux membres de la caisse LAMal"

  // Tarifs
  tarifs: TarifMensuel[]

  // Métadonnées
  urlProduit?: string                // Page produit sur le site de l'assureur
  urlCGA?: string                    // URL du PDF des Conditions Générales
  dateMAJ: string                    // ISO date dernière mise à jour
  scoreComplet: number               // 0-100 — % des champs renseignés (auto-calculé)
  masquer?: true                     // Exclure du comparateur (tarif non disponible en ligne)
}

// ─── Besoin utilisateur → familles pertinentes ────────────────────────────────
// Utilisé pour le moteur de recommandation "j'ai besoin de..."

export interface BesoinSante {
  id: string
  label: string                      // "Je veux une chambre privée à l'hôpital"
  description: string                // Explication en français simple
  familles: FamilleComplementaire[]
  motsClés: string[]
}

export const BESOINS_SANTE: BesoinSante[] = [
  {
    id: 'hopital-chambre-privee',
    label: 'Chambre privée ou semi-privée à l\'hôpital',
    description: 'Vous souhaitez choisir votre médecin et avoir plus de confort lors d\'une hospitalisation.',
    familles: ['hospitalier'],
    motsClés: ['hôpital', 'chambre', 'privé', 'semi-privé', 'médecin', 'opération'],
  },
  {
    id: 'douleurs-chroniques',
    label: 'Douleurs chroniques (dos, articulations…)',
    description: 'Physiothérapie, ostéopathie ou autres thérapies régulières non remboursées par la LAMal.',
    familles: ['ambulatoire', 'medecines-douces'],
    motsClés: ['dos', 'physio', 'physiothérapie', 'ostéo', 'douleur', 'chronique'],
  },
  {
    id: 'dentaire',
    label: 'Soins dentaires ou orthodontie',
    description: 'Remboursement partiel des soins dentaires, couronnes, appareils orthodontiques.',
    familles: ['dentaire'],
    motsClés: ['dents', 'dentiste', 'orthodontie', 'couronne', 'implant', 'appareil'],
  },
  {
    id: 'medecines-alternatives',
    label: 'Médecines alternatives (acupuncture, homéopathie…)',
    description: 'Consultations chez des thérapeutes reconnus ASCA ou RME.',
    familles: ['medecines-douces'],
    motsClés: ['acupuncture', 'homéopathie', 'naturopathie', 'médecine douce', 'ASCA', 'RME'],
  },
  {
    id: 'lunettes',
    label: 'Lunettes ou lentilles de contact',
    description: 'Contribution annuelle pour l\'achat de lunettes ou lentilles correctrices.',
    familles: ['optique'],
    motsClés: ['lunettes', 'lentilles', 'optique', 'vue', 'myopie'],
  },
  {
    id: 'grossesse',
    label: 'Grossesse et naissance',
    description: 'Cours de préparation à l\'accouchement, sage-femme, suivi post-natal.',
    familles: ['maternite'],
    motsClés: ['grossesse', 'enceinte', 'accouchement', 'sage-femme', 'bébé', 'maternité'],
  },
  {
    id: 'fitness',
    label: 'Sport et prévention santé',
    description: 'Remboursement d\'abonnements de fitness, coaching ou bilans de santé préventifs.',
    familles: ['prevention'],
    motsClés: ['sport', 'fitness', 'gym', 'salle', 'prévention', 'bilan', 'coaching'],
  },
  {
    id: 'voyages',
    label: 'Soins à l\'étranger et rapatriement',
    description: 'Couverture médicale lors de séjours hors de Suisse.',
    familles: ['voyage', 'hospitalier'],
    motsClés: ['voyage', 'étranger', 'rapatriement', 'urgence', 'monde'],
  },
]
