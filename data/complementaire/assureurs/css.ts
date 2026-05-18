import type { ProduitComplementaire } from '../types'

// Source : css.ch — relevé mai 2026
// Gamme myFlex : Economy / Balance / Premium (3 niveaux pour hospitalier et ambulatoire)

export const produits: ProduitComplementaire[] = [

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'css-myflex-hosp-economy',
    assureurId: 'css',
    nomProduit: 'myFlex Hospitalisation Economy',
    famille: 'hospitalier',
    description: 'Couverture hospitalisation entrée de gamme : choix de la division (commune, semi-privée ou privée) dans les hôpitaux LAMal. Soins psychiatriques 60 jours/an.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Hôpitaux et médecins reconnus LAMal uniquement. Traitements planifiés en Suisse, urgences dans le monde entier. Rééducation stationnaire : 60 jours/an. Psychiatrie : 60 jours/an. Soins ambulatoires hospit. : max CHF 900/an. Accouchement à domicile : CHF 1\'000.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 800,
      bilanSante: false,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Compte santé CSS : jusqu\'à CHF 800/an pour fitness et bien-être.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 9.5, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille',      montantCHF: 17.2, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior',       montantCHF: 19.1, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/assurance-d-hospitalisation.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  {
    id: 'css-myflex-hosp-balance',
    assureurId: 'css',
    nomProduit: 'myFlex Hospitalisation Balance',
    famille: 'hospitalier',
    description: 'Couverture hospitalisation intermédiaire avec rééducation 90 jours/an et soins ambulatoires hospitaliers jusqu\'à CHF 1\'400/an.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Hôpitaux et médecins reconnus LAMal. Rééducation : 90 jours/an. Psychiatrie : 90 jours/an. Soins ambulatoires hospit. : max CHF 1\'400/an. Accouchement à domicile : CHF 1\'500.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 800,
      bilanSante: false,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Compte santé CSS : jusqu\'à CHF 800/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 40.5, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille',      montantCHF: 72.8, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior',       montantCHF: 82.5, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/assurance-d-hospitalisation.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  {
    id: 'css-myflex-hosp-premium',
    assureurId: 'css',
    nomProduit: 'myFlex Hospitalisation Premium',
    famille: 'hospitalier',
    description: 'Couverture hospitalisation haut de gamme : tous hôpitaux suisses, rééducation illimitée, psychiatrie 180 jours/an, accouchement à domicile CHF 2\'000.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Tous hôpitaux et médecins suisses. Rééducation : illimitée. Psychiatrie : 180 jours/an. Soins ambulatoires hospit. : max CHF 1\'400/an. Accouchement à domicile : CHF 2\'000.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 800,
      bilanSante: false,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Compte santé CSS : jusqu\'à CHF 800/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 104.2, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille',      montantCHF: 187.6, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior',       montantCHF: 208.4, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/assurance-d-hospitalisation.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 75,
  },

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'css-myflex-amb-economy',
    assureurId: 'css',
    nomProduit: 'myFlex Ambulatoire Economy',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique'],
    description: 'Couverture ambulatoire d\'entrée : médicaments 90%, optique CHF 150, psychothérapie CHF 1\'000, aides médicales CHF 500, vaccins CHF 100/an.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments reconnus hors liste de base', couvert: true, pourcent: 90, noteDetails: 'Illimité.' },
        { nom: 'Psychothérapie', couvert: true, pourcent: 75, montantMaxAnnuel: 1000 },
        { nom: 'Aides médicales', couvert: true, pourcent: 90, montantMaxAnnuel: 500 },
        { nom: 'Vaccins', couvert: true, pourcent: 90, montantMaxAnnuel: 100 },
        { nom: 'Soins à domicile', couvert: true, montantMaxSession: 50, sessionsMax: undefined, noteDetails: 'CHF 50/jour, max CHF 2\'000/an.' },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 50, montantMaxAnnuel: 12000 },
        { nom: 'Extraction dents de sagesse (dès 19 ans)', couvert: true, pourcent: 50, montantMaxAnnuel: 1000 },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      noteDetails: 'CHF 150 par cas (adultes et enfants).',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 9.3, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille',      montantCHF: 11.2, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior',       montantCHF: 15.5, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/assurance-ambulatoire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 80,
  },

  {
    id: 'css-myflex-amb-balance',
    assureurId: 'css',
    nomProduit: 'myFlex Ambulatoire Balance',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique'],
    description: 'Couverture ambulatoire intermédiaire : optique CHF 300, psychothérapie CHF 3\'000, vaccins illimités, soins à domicile CHF 4\'000/an.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments reconnus hors liste de base', couvert: true, pourcent: 90, noteDetails: 'Illimité.' },
        { nom: 'Psychothérapie', couvert: true, pourcent: 75, montantMaxAnnuel: 3000 },
        { nom: 'Aides médicales', couvert: true, pourcent: 90, montantMaxAnnuel: 1000 },
        { nom: 'Vaccins', couvert: true, pourcent: 90, noteDetails: 'Illimité.' },
        { nom: 'Soins à domicile', couvert: true, montantMaxSession: 100, noteDetails: 'CHF 100/jour, max CHF 4\'000/an.' },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 50, noteDetails: 'Illimité.' },
        { nom: 'Extraction dents de sagesse (dès 19 ans)', couvert: true, pourcent: 50, montantMaxAnnuel: 2000 },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      noteDetails: 'CHF 300 par cas.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 16.8, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille',      montantCHF: 20.1, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior',       montantCHF: 28.0, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/assurance-ambulatoire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },

  // ─── MÉDECINES ALTERNATIVES ───────────────────────────────────────────────────

  {
    id: 'css-alt-economy',
    assureurId: 'css',
    nomProduit: 'Médecine Alternative Economy',
    famille: 'medecines-douces',
    description: '80 méthodes thérapeutiques naturelles reconnues, remboursées à 75%. Max CHF 1\'000/an, sans franchise, sans ordonnance médicale.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'reflexologie'],
      montantMaxAnnuel: 1000,
      pourcent: 75,
      noteDetails: '~80 méthodes reconnues CSS. Sans franchise. Sans certificat médical. Accès direct aux thérapeutes CSS. Tarifs plafonnés par méthode (si dépassement, patient paie la différence). Requiert myFlex ambulatoire ou hospitalier.',
    },
    conditionsSouscription: ['Requiert myFlex Ambulatoire ou Hospitalier CSS'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 7.30,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 20.60, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 16.50, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/medecine-alternative.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 80,
  },

  {
    id: 'css-alt-balance',
    assureurId: 'css',
    nomProduit: 'Médecine Alternative Balance',
    famille: 'medecines-douces',
    description: '80 méthodes thérapeutiques naturelles, 75% remboursés, jusqu\'à CHF 3\'000/an. Réduction enfants 25%.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'reflexologie'],
      montantMaxAnnuel: 3000,
      pourcent: 75,
      noteDetails: 'Mêmes conditions que Economy, plafond élevé à CHF 3\'000/an.',
    },
    conditionsSouscription: ['Requiert myFlex Ambulatoire ou Hospitalier CSS'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 13.30, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 37.90, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 30.30, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/medecine-alternative.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 80,
  },

  {
    id: 'css-alt-premium',
    assureurId: 'css',
    nomProduit: 'Médecine Alternative Premium',
    famille: 'medecines-douces',
    description: '80 méthodes thérapeutiques naturelles, 75% remboursés, jusqu\'à CHF 10\'000/an. La couverture la plus généreuse du marché pour les médecines douces.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'reflexologie'],
      montantMaxAnnuel: 10000,
      pourcent: 75,
      noteDetails: 'Plafond CHF 10\'000/an — l\'un des plus élevés du marché.',
    },
    conditionsSouscription: ['Requiert myFlex Ambulatoire ou Hospitalier CSS'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 21.20, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 60.10, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 48.10, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/medecine-alternative.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 80,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'css-dent-v1',
    assureurId: 'css',
    nomProduit: 'Assurance Dentaire Variante 1',
    famille: 'dentaire',
    description: 'Couverture dentaire d\'entrée : 50% des frais remboursés, maximum CHF 1\'000/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 1000,
      orthodontie: false,
      implants: true,
      noteDetails: 'Délai d\'attente 6 mois (soins) et 12 mois (prothèses/implants). Enfants < 3 ans sans certificat médical. Remise 25% pour enfants.',
    },
    delaiAttente: { mois: 6, detail: '12 mois pour prothèses, couronnes et implants.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 27.2, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille',      montantCHF: 33.2, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior',       montantCHF: 50.3, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/assurance-soins-dentaires.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 78,
  },

  {
    id: 'css-dent-v4',
    assureurId: 'css',
    nomProduit: 'Assurance Dentaire Variante 4',
    famille: 'dentaire',
    description: 'Couverture dentaire maximale : 75% des frais remboursés jusqu\'à CHF 5\'000/an, avec franchise CHF 500.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 5000,
      orthodontie: true,
      implants: true,
      noteDetails: 'Franchise CHF 500. Délai d\'attente 6 mois (soins) et 12 mois (prothèses/implants). Radiographies, obturations, extractions, hygiène, couronnes, appareils orthodontiques tous couverts.',
    },
    delaiAttente: { mois: 6, detail: '12 mois pour prothèses, couronnes et implants.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 64.7, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille',      montantCHF: 78.9, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior',       montantCHF: 119.6, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.css.ch/fr/clients-prives/bien-assure/caisse-maladie/assurance-complementaire/assurance-soins-dentaires.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },
]
