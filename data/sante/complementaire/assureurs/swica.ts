import type { ProduitComplementaire } from '../types'

// Source : swica.ch — relevé mai 2026

export const produits: ProduitComplementaire[] = [

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'swica-bestmed',
    assureurId: 'swica',
    nomProduit: 'BestMed (Hospita Privée Monde Entier)',
    famille: 'hospitalier',
    description: 'Assurance hospitalisation haut de gamme : chambre privée avec libre choix du médecin et de l\'hôpital dans le monde entier.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 150.8, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 189.1, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 434.2, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  {
    id: 'swica-hospita-privee',
    assureurId: 'swica',
    nomProduit: 'Hospita Privée',
    famille: 'hospitalier',
    description: 'Chambre privée (1 lit) avec libre choix du médecin et de l\'hôpital en Suisse et au Liechtenstein.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 150.7, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 189.0, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 433.7, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'swica-hospita-flex-privee',
    assureurId: 'swica',
    nomProduit: 'Hospita Flex Privée',
    famille: 'hospitalier',
    description: 'Chambre flexible (commune, semi-privée ou privée) avec libre choix et coparticipation selon la division choisie.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Coparticipation aux frais selon la division choisie au-delà de la commune.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 128.1, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 160.6, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 368.7, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  {
    id: 'swica-hospita-demi-privee',
    assureurId: 'swica',
    nomProduit: 'Hospita Demi-Privée',
    famille: 'hospitalier',
    description: 'Chambre semi-privée (2 lits) avec libre choix du médecin et de l\'hôpital en Suisse.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 111.8, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 157.7, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 321.8, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'swica-hospita-flex-demi-privee',
    assureurId: 'swica',
    nomProduit: 'Hospita Flex Demi-Privée',
    famille: 'hospitalier',
    description: 'Chambre flexible (commune ou semi-privée) avec libre choix et coparticipation selon la division choisie.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 95.0, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 134.1, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 273.5, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 58,
  },

  {
    id: 'swica-hospita-commune',
    assureurId: 'swica',
    nomProduit: 'Hospita Commune',
    famille: 'hospitalier',
    description: 'Couverture en division commune avec libre choix de l\'hôpital en Suisse.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Accès limité aux hôpitaux sous contrat SWICA hors canton.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 8.8, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 9.4, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 6.5, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 58,
  },

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'swica-completa-forte',
    assureurId: 'swica',
    nomProduit: 'Completa Forte',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'Assurance ambulatoire complète et généreuse : médecines douces, lunettes, prévention, médicaments hors liste. La référence du marché pour la couverture ambulatoire.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments hors liste de base', couvert: true, noteDetails: 'Remboursement avec coparticipation.' },
        { nom: 'Transport & sauvetage urgence', couvert: true, noteDetails: 'Inclus.' },
      ],
      montantGlobalMax: undefined,
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'RME'],
      therapiesCouvertes: ['homeopathie', 'phytotherapie', 'naturopathie', 'acupuncture', 'osteopathie'],
      noteDetails: 'Sur pied d\'égalité avec la médecine conventionnelle.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      noteDetails: 'Remboursement inclus dans Completa Forte.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 300,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: true,
      montantGlobalMax: 500,
      noteDetails: '90% des frais, max CHF 500/an, max CHF 300/catégorie de prévention.',
    },
    delaiAttente: { mois: 0 },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 84.5, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 84.5, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 84.5, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurances-ambulatoires',
    dateMAJ: '2026-05-15',
    scoreComplet: 70,
  },

  {
    id: 'swica-praevita',
    assureurId: 'swica',
    nomProduit: 'Praevita',
    famille: 'prevention',
    description: 'Complément prévention à souscrire avec Completa Top ou Forte : bilans médicaux, vaccins, gym prénatale/postnatale, fitness. Jusqu\'à CHF 1\'300/an.',
    prevention: {
      fitness: true,
      montantMaxFitness: 500,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      montantGlobalMax: 1300,
      noteDetails: 'Bilans préventifs : 90%, max CHF 500/3 ans. Gym pré/postnatale : 50%, max CHF 300/an. Fitness : 50%, max CHF 500/an (max CHF 300/catégorie). Vaccins : 90%, max CHF 200/an. Requiert souscription simultanée Completa Top ou Forte.',
    },
    conditionsSouscription: ['Requiert Completa Top ou Completa Forte'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 17.9, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 16.9, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 14.9, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/praevita',
    dateMAJ: '2026-05-15',
    scoreComplet: 78,
  },

  {
    id: 'swica-optima',
    assureurId: 'swica',
    nomProduit: 'Optima',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'prevention'],
    description: 'Extension ambulatoire internationale et optique enrichie : soins ambulatoires classiques dans le monde entier (tarifs privés) et CHF 500 pour lunettes/lentilles sur 3 ans.',
    optique: {
      couvert: true,
      montantMaxAnnuel: undefined,
      frequenceAns: 3,
      lunettes: true,
      lentilles: true,
      noteDetails: 'CHF 500 par période de 3 ans.',
    },
    ambulatoire: {
      postes: [
        { nom: 'Soins ambulatoires à l\'étranger (médecine classique)', couvert: true, noteDetails: 'Tarifs privés, couverture mondiale, avec Completa Top.' },
        { nom: 'Médecines complémentaires', couvert: true, noteDetails: 'Couverture complète ambulatoire avec Completa Top.' },
      ],
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 300,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: true,
      montantGlobalMax: 1300,
      noteDetails: '90% des frais, jusqu\'à CHF 1\'300/an total pour activité physique, nutrition, bien-être.',
    },
    conditionsSouscription: ['Requiert Completa Top ou Completa Forte'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 45.5, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 48.4, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 48.9, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/optima',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'swica-denta',
    assureurId: 'swica',
    nomProduit: 'Denta',
    famille: 'dentaire',
    description: 'Assurance dentaire SWICA couvrant contrôles, hygiène, soins, orthodontie et implants. Double prestation pour orthodontie jusqu\'à 25 ans.',
    dentaire: {
      couvert: true,
      orthodontie: true,
      implants: true,
      noteDetails: 'Double montant assuré pour l\'orthodontie jusqu\'à 25 ans. Implants couverts selon la cause. Recommandé avant 5 ans pour les enfants (sans questionnaire de santé). Accès à 100+ offres de promotion de la santé jusqu\'à CHF 1\'300/an.',
    },
    conditionsSouscription: ['Souscription recommandée avant 5 ans pour les enfants'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 23.1, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'famille', montantCHF: 26.5, source: 'site-web', dateReleve: '2026-05-16' },
      { profilId: 'senior', montantCHF: 29.1, source: 'site-web', dateReleve: '2026-05-16' },
    ],
    urlProduit: 'https://www.swica.ch/fr/prive/assurances/assurances-complementaires/assurance-dentaire',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },
]
