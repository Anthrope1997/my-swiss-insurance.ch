import type { ProduitComplementaire } from '../types'

// Source : helsana.ch — relevé mai 2026

export const produits: ProduitComplementaire[] = [

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'helsana-hospital-eco',
    assureurId: 'helsana',
    nomProduit: 'HOSPITAL ECO',
    famille: 'hospitalier',
    description: 'Division commune avec libre choix de l\'hôpital dans toute la Suisse. 100% des coûts couverts.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      pourcent: 100,
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 2.45, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 2.45, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 4.30, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/assurance-hospitalisation.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 60,
  },

  {
    id: 'helsana-hospital-demi-privee',
    assureurId: 'helsana',
    nomProduit: 'HOSPITAL Demi-Privée',
    famille: 'hospitalier',
    description: 'Chambre à deux lits avec libre choix du médecin et de l\'hôpital dans toute la Suisse.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 123.50, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 79.85,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 160.50, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/assurance-hospitalisation.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 62,
  },

  {
    id: 'helsana-hospital-privee',
    assureurId: 'helsana',
    nomProduit: 'HOSPITAL Privée',
    famille: 'hospitalier',
    description: 'Chambre individuelle avec libre choix du médecin et de l\'hôpital dans toute la Suisse.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 150.75, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 119.00, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 196.00, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/assurance-hospitalisation.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 62,
  },

  {
    id: 'helsana-hospital-flex',
    assureurId: 'helsana',
    nomProduit: 'HOSPITAL FLEX',
    famille: 'hospitalier',
    description: 'Libre choix de la division à chaque hospitalisation (commune, demi-privée ou privée) avec modulation de la prime.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Division choisie au cas par cas avant chaque hospitalisation.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 52.00,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 42.30,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 118.60, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/assurance-hospitalisation.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 62,
  },

  // ─── AMBULATOIRE HOSPITALIER ─────────────────────────────────────────────────

  {
    id: 'helsana-primeo',
    assureurId: 'helsana',
    nomProduit: 'PRIMEO',
    famille: 'ambulatoire',
    description: 'Assurances d\'hospitalisation ambulatoires : libre choix du médecin lors de traitements ambulatoires à l\'hôpital, prestations de confort et check-up.',
    ambulatoire: {
      postes: [
        { nom: 'Libre choix du médecin (ambulatoire hospitalier)', couvert: true },
        { nom: 'Prestations de confort', couvert: true },
        { nom: 'Check-up', couvert: true },
      ],
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 9.25,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 11.90, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 22.90, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/assurance-hospitalisation.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 55,
  },

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'helsana-top',
    assureurId: 'helsana',
    nomProduit: 'TOP',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique'],
    description: 'Assurance ambulatoire d\'entrée : thérapies alternatives CHF 3\'000, optique CHF 150, orthodontie CHF 10\'000, sauvetage CHF 100\'000. Couverture urgences EU/EEA/UK incluse.',
    ambulatoire: {
      postes: [
        { nom: 'Thérapies alternatives (ambulatoires)', couvert: true, pourcent: 75, montantMaxAnnuel: 3000 },
        { nom: 'Médicaments (hors liste de base)', couvert: true, pourcent: 90, noteDetails: 'Médicaments conventionnels.' },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 75, montantMaxAnnuel: 10000 },
        { nom: 'Aides médicales', couvert: true, pourcent: 90, montantMaxAnnuel: 1000 },
        { nom: 'Transport & sauvetage (Suisse)', couvert: true, montantMaxAnnuel: 100000 },
        { nom: 'Urgences à l\'étranger (EU/EEA/UK)', couvert: true, noteDetails: 'Couverture complète au-delà de la base. Délai d\'attente maternité : 365 jours.' },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 150,
      noteDetails: '90% des coûts, max CHF 150/an.',
    },
    delaiAttente: { mois: 0, detail: 'Délai d\'attente 365 jours pour maternité uniquement.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 18.15, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 17.75, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 24.45, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/ambulatoires/top.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 82,
  },

  {
    id: 'helsana-completa',
    assureurId: 'helsana',
    nomProduit: 'COMPLETA',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'prevention', 'medecines-douces'],
    description: 'La couverture ambulatoire la plus complète de Helsana : inclut tout TOP et SANA avec montants plus généreux. Optique CHF 300, prévention CHF 750, fitness CHF 200, thérapies spéciales CHF 4\'500.',
    ambulatoire: {
      postes: [
        { nom: 'Thérapies alternatives ambulatoires', couvert: true, pourcent: 75, noteDetails: 'Inclus dans spécialités CHF 4\'500.' },
        { nom: 'Thérapies alternatives stationnaires', couvert: true, pourcent: 100, montantMaxAnnuel: 5000 },
        { nom: 'Thérapies spéciales (ambulatoires)', couvert: true, pourcent: 75, montantMaxAnnuel: 4500 },
        { nom: 'Médicaments conventionnels', couvert: true, pourcent: 90 },
        { nom: 'Médicaments complémentaires', couvert: true, pourcent: 75 },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 75, montantMaxAnnuel: 10000 },
        { nom: 'Aides médicales', couvert: true, pourcent: 90, montantMaxAnnuel: 1500 },
        { nom: 'Transport & sauvetage (Suisse)', couvert: true, montantMaxAnnuel: 100000 },
        { nom: 'Urgences à l\'étranger (EU/EEA/UK)', couvert: true, noteDetails: 'Couverture complète.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'RME'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'phytotherapie', 'reflexologie'],
      montantMaxAnnuel: 4500,
      pourcent: 75,
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 300,
      noteDetails: '90% des coûts, max CHF 300/an.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      montantGlobalMax: 750,
      noteDetails: 'Fitness : 75%, max CHF 200/an. Prévention (vaccins, bilans) : 90%, max CHF 750/an.',
    },
    delaiAttente: { mois: 0, detail: 'Délai d\'attente 365 jours pour maternité uniquement.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 62.35,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 56.20,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 100.25, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/ambulatoires/completa.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 88,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'helsana-dentaplus',
    assureurId: 'helsana',
    nomProduit: 'DENTAplus',
    famille: 'dentaire',
    description: 'Assurance dentaire Helsana couvrant traitements, hygiène, orthodontie et chirurgie maxillo-faciale. Couverture mondiale. Délai d\'attente 6 mois.',
    dentaire: {
      couvert: true,
      orthodontie: true,
      implants: false,
      noteDetails: 'Contrôles, hygiène, obturations, traitements de canal, extractions, orthodontie, chirurgie maxillo-faciale. Couverture mondiale. Souscription jusqu\'à 50 ans. Délai d\'attente 6 mois (sauf variante Light et enfants < 3 ans). Remise 5% famille (2+ membres), 10% (3+ personnes). Contrat minimum 1 an.',
    },
    delaiAttente: { mois: 6, detail: 'Pas de délai pour variante Light et enfants < 3 ans.' },
    conditionsSouscription: ['Souscription jusqu\'à 50 ans', 'Questionnaire de santé requis (sauf Light et enfants < 3 ans)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 11.10, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 14.00, source: 'site-web', dateReleve: '2026-05-17' },
      // senior (55 ans) non éligible — souscription jusqu'à 50 ans
    ],
    urlProduit: 'https://www.helsana.ch/fr/prives/assurances/assurances-complementaires/assurance-dentaire.html',
    dateMAJ: '2026-05-17',
    scoreComplet: 70,
  },
]
