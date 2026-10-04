import type { ProduitComplementaire } from '../types'

// Source : kpt.ch — relevé mai 2026
// Tarifs : API publique assistant.kpt.ch/kpt-api/public/productprice/query — scraping mai 2026
// Note : réduction 6.7% sur les primes avec contrat de 3 ans sur tous les produits

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE (gamme Pulse) ────────────────────────────────────────────────

  {
    id: 'kpt-pulse-eco',
    assureurId: 'kpt',
    nomProduit: 'Pulse Eco',
    famille: 'ambulatoire',
    description: 'Couverture ambulatoire d\'entrée KPT : soutien psychologique digital CHF 1\'000, vaccins, aides auxiliaires et transport d\'urgence.',
    ambulatoire: {
      postes: [
        { nom: 'Soutien psychologique digital', couvert: true, montantMaxAnnuel: 1000, noteDetails: 'Service de psychologie en ligne.' },
        { nom: 'Vaccins', couvert: true },
        { nom: 'Aides auxiliaires', couvert: true },
        { nom: 'Transport urgence', couvert: true },
        { nom: 'Examens gynécologiques', couvert: true },
        { nom: 'Soutien maternité', couvert: true },
      ],
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 12.5,  source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 12.5,  source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 14.5,  source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/assurance-complementaire-ambulatoire',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  {
    id: 'kpt-pulse-top',
    assureurId: 'kpt',
    nomProduit: 'Pulse Top',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'medecines-douces', 'prevention'],
    description: 'Couverture ambulatoire intermédiaire : médecines alternatives et examens préventifs jusqu\'à CHF 2\'000, optique incluse.',
    ambulatoire: {
      postes: [
        { nom: 'Médecines alternatives + examens préventifs', couvert: true, montantMaxAnnuel: 2000 },
        { nom: 'Vaccins', couvert: true },
        { nom: 'Aides auxiliaires', couvert: true },
        { nom: 'Transport urgence', couvert: true },
        { nom: 'Examens gynécologiques', couvert: true },
        { nom: 'Soutien maternité', couvert: true },
        { nom: 'Soutien psychologique digital', couvert: true, montantMaxAnnuel: 1000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'RME'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 2000,
      noteDetails: 'Inclus dans le plafond global CHF 2\'000 médecines alternatives + prévention.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      noteDetails: 'Contribution optique incluse.',
    },
    prevention: {
      fitness: false,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Examens préventifs inclus dans le plafond CHF 2\'000.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 44.5, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 49.5, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 54.5, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/assurance-complementaire-ambulatoire',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },

  {
    id: 'kpt-pulse-premium',
    assureurId: 'kpt',
    nomProduit: 'Pulse Premium',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'medecines-douces', 'prevention'],
    description: 'La couverture ambulatoire maximale de KPT : médecines alternatives + prévention CHF 4\'000, fitness CHF 600, massages, chirurgie laser yeux.',
    ambulatoire: {
      postes: [
        { nom: 'Médecines alternatives + examens préventifs', couvert: true, montantMaxAnnuel: 4000 },
        { nom: 'Massages thérapeutiques', couvert: true },
        { nom: 'Chirurgie réfractive laser (yeux)', couvert: true },
        { nom: 'Vaccins', couvert: true },
        { nom: 'Aides auxiliaires', couvert: true },
        { nom: 'Transport urgence', couvert: true },
        { nom: 'Soutien psychologique digital', couvert: true, montantMaxAnnuel: 1000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'RME'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'phytotherapie', 'reflexologie', 'shiatsu'],
      montantMaxAnnuel: 4000,
      noteDetails: 'Inclus dans le plafond global CHF 4\'000.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      noteDetails: 'Lunettes, lentilles et chirurgie laser yeux couverts.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 600,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Fitness : max CHF 600/an. Examens préventifs dans le plafond CHF 4\'000.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 59.5, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 64.5, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 79.5, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/assurance-complementaire-ambulatoire',
    dateMAJ: '2026-05-15',
    scoreComplet: 88,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'kpt-hospital-commune',
    assureurId: 'kpt',
    nomProduit: 'Hospitalisation Commune',
    famille: 'hospitalier',
    description: 'Division commune avec libre choix de l\'hôpital, y compris hors canton de domicile, sans surcoût.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Traitement hors canton possible sans frais supplémentaires.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 1.8,  source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 2.1,  source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/assurances-complementaires-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'kpt-hospital-flex',
    assureurId: 'kpt',
    nomProduit: 'Hospital Flex',
    famille: 'hospitalier',
    description: 'Libre choix de la division (commune, semi-privée ou privée) avant chaque hospitalisation dans les hôpitaux KPT.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: false,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Division choisie avant chaque séjour. Hôpitaux reconnus KPT. Versions Eco et Top disponibles. Réduction 6.7% avec contrat 3 ans.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 29.9, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 39.9, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 44.9, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/assurances-complementaires-hospitalisation/assurance-hospitalisation-flexible',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  {
    id: 'kpt-hospital-demi-privee',
    assureurId: 'kpt',
    nomProduit: 'Hospitalisation Semi-Privée',
    famille: 'hospitalier',
    description: 'Chambre à deux lits avec libre choix du médecin dans les hôpitaux conventionnés KPT en Suisse.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: false,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 74.1,  source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 136.5, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/assurances-complementaires-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  {
    id: 'kpt-hospital-privee',
    assureurId: 'kpt',
    nomProduit: 'Hospitalisation Privée',
    famille: 'hospitalier',
    description: 'Chambre privée avec libre choix du médecin, couverture Suisse et mondiale.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 76.1,  source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 139.9, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/assurances-complementaires-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 70,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'kpt-dentaire-klasse-1',
    assureurId: 'kpt',
    nomProduit: 'Dentaire Leistungsklasse 1',
    famille: 'dentaire',
    description: 'Dentaire d\'entrée KPT : 50% des frais, max CHF 500/an. Couvre soins, nettoyages, orthodontie, implants. Sans examen de santé. Délai d\'attente 6 mois (12 mois orthodontie/prothèses).',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 500,
      orthodontie: true,
      implants: true,
      noteDetails: '50%, max CHF 500/an. Inclus : soins dentaires, détartrage, orthodontie, bridges, couronnes, implants, extraction sagesses. Délai : 6 mois généraux, 12 mois orthodontie/prothèses/amalgame. Accepté sans examen de santé tous âges.',
    },
    delaiAttente: { mois: 6, detail: '12 mois pour orthodontie, prothèses et amalgame.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 19.9, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 19.9, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 19.9, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/autres-assurances/assurance-dentaire-complementaire',
    dateMAJ: '2026-05-15',
    scoreComplet: 88,
  },

  {
    id: 'kpt-dentaire-klasse-3',
    assureurId: 'kpt',
    nomProduit: 'Dentaire Leistungsklasse 3',
    famille: 'dentaire',
    description: 'Dentaire intermédiaire KPT : 75% des frais, max CHF 1\'500/an. Couvre soins, détartrage, orthodontie, implants. Sans examen de santé si souscrit avant 5 ans.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 1500,
      orthodontie: true,
      implants: true,
      noteDetails: '75%, max CHF 1\'500/an. Inclus : soins dentaires, détartrage, orthodontie (appareils), bridges, couronnes, implants, extractions. Délai : 6 mois généraux, 12 mois orthodontie/prothèses. Sans examen santé si souscrit avant 5 ans ; examen requis après 5 ans.',
    },
    delaiAttente: { mois: 6, detail: '12 mois pour orthodontie et prothèses.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 28.4, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 28.4, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 52.2, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/autres-assurances/assurance-dentaire-complementaire',
    dateMAJ: '2026-05-15',
    scoreComplet: 90,
  },

  {
    id: 'kpt-dentaire-klasse-4',
    assureurId: 'kpt',
    nomProduit: 'Dentaire Leistungsklasse 4',
    famille: 'dentaire',
    description: 'Dentaire maximal KPT : 75% / CHF 2\'000/an + orthodontie 75% sans limite jusqu\'à 20 ans. Première année de vie gratuite. Idéal pour enfants.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 2000,
      orthodontie: true,
      implants: true,
      noteDetails: '75%, max CHF 2\'000/an. ORTHODONTIE : 75% sans limite de montant jusqu\'à 20 ans, puis 75%/CHF 2\'000/an. Nourrissons (première année de vie) : couverture gratuite. Sans examen santé si souscrit avant 5 ans. Inclus : soins, détartrage, extractions, bridges, couronnes, implants, chirurgie buccale. Délai : 6 mois généraux, 12 mois orthodontie/prothèses.',
    },
    delaiAttente: { mois: 6, detail: '12 mois pour orthodontie et prothèses.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 33.2, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 33.2, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 56.9, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.kpt.ch/fr/autres-assurances/assurance-dentaire-complementaire',
    dateMAJ: '2026-05-15',
    scoreComplet: 92,
  },
]
