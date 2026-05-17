import type { ProduitComplementaire } from '../types'

// Source : concordia.ch — relevé mai 2026

export const produits: ProduitComplementaire[] = [

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'concordia-hosp-privee',
    assureurId: 'concordia',
    nomProduit: 'Hospitalisation PRIVÉE',
    famille: 'hospitalier',
    description: 'Chambre individuelle avec libre choix du médecin et de l\'hôpital dans le monde entier.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 118.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 156.40, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 365.80, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/spital.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'concordia-hosp-mi-privee',
    assureurId: 'concordia',
    nomProduit: 'Hospitalisation MI-PRIVÉE',
    famille: 'hospitalier',
    description: 'Chambre à deux lits avec libre choix du médecin et de l\'hôpital en Suisse.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Contribution rooming-in : max CHF 60/jour.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 68.90,  source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 88.50,  source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 203.30, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/spital.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'concordia-hosp-libero',
    assureurId: 'concordia',
    nomProduit: 'Hospitalisation LIBERO',
    famille: 'hospitalier',
    description: 'Division flexible (commune, mi-privée ou privée) avec libre choix selon la division choisie. Franchise possible CHF 5\'000.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Option franchise CHF 5\'000 disponible. Libre choix selon division sélectionnée.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 18.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 25.20, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 67.10, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/spital.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'concordia-hosp-commune',
    assureurId: 'concordia',
    nomProduit: 'Hospitalisation COMMUNE',
    famille: 'hospitalier',
    description: 'Division commune avec libre choix de l\'hôpital en Suisse.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Couverture limitée hors canton sans accord préalable.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 4.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 5.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 9.30, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/spital.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  // ─── AMBULATOIRE / MÉDECINES DOUCES / PRÉVENTION ──────────────────────────────

  {
    id: 'concordia-diversa-premium',
    assureurId: 'concordia',
    nomProduit: 'DIVERSA Premium',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'prevention', 'maternite'],
    description: 'Le produit ambulatoire le plus complet de Concordia : urgences monde entier, optique CHF 300/an, enfants gratuits à partir du 3ème, rooming-in CHF 100/nuit.',
    ambulatoire: {
      postes: [
        { nom: 'Urgences ambulatoires à l\'étranger', couvert: true, noteDetails: 'Transport illimité. Sauvetage CHF 25\'000.' },
        { nom: 'Soins ambulatoires chirurgicaux', couvert: true, pourcent: 75 },
        { nom: 'Médicaments hors liste de base', couvert: true, pourcent: 75 },
        { nom: 'Garde d\'enfants malades', couvert: true, montantMaxAnnuel: 600, noteDetails: 'CHF 50/heure, max CHF 600/an.' },
        { nom: 'Rooming-in (parents)', couvert: true, montantMaxSession: 100, sessionsMax: 10, noteDetails: 'CHF 100/nuit, max 10 nuits.' },
        { nom: 'Rooming-in accouchement', couvert: true, montantMaxSession: 100, sessionsMax: 5, noteDetails: 'CHF 100/nuit, max 5 nuits.' },
      ],
    },
    optique: {
      couvert: true,
      frequenceAns: 1,
      lunettes: true,
      lentilles: true,
      noteDetails: 'Adultes : CHF 300/an. Enfants (< 18 ans) : CHF 300/an.',
    },
    prevention: {
      fitness: false,
      bilanSante: false,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Vaccins non obligatoires : 90% remboursés.',
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      bebe: false,
      noteDetails: 'Gym pré/postnatale, lactation : 50%, max CHF 200/domaine/an.',
    },
    conditionsSouscription: ['3ème enfant et suivants gratuits si les 2 premiers sont assurés DIVERSA'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 34.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 43.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 43.00, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/diversa.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },

  {
    id: 'concordia-diversa-base',
    assureurId: 'concordia',
    nomProduit: 'DIVERSA',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique'],
    description: 'Version de base DIVERSA : urgences monde entier, optique CHF 150/3 ans, sauvetage CHF 10\'000.',
    ambulatoire: {
      postes: [
        { nom: 'Urgences ambulatoires à l\'étranger', couvert: true, noteDetails: 'Transport illimité. Sauvetage CHF 10\'000.' },
        { nom: 'Soins ambulatoires chirurgicaux', couvert: true, pourcent: 50 },
        { nom: 'Médicaments hors liste de base', couvert: true, pourcent: 50 },
      ],
    },
    optique: {
      couvert: true,
      frequenceAns: 3,
      lunettes: true,
      lentilles: true,
      noteDetails: 'Adultes : CHF 150 par période de 3 ans. Enfants (< 18 ans) : CHF 150/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 13.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 13.50, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 16.00, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/diversa.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 70,
  },

  // ─── MÉDECINES DOUCES ─────────────────────────────────────────────────────────

  {
    id: 'concordia-natura',
    assureurId: 'concordia',
    nomProduit: 'NATURA',
    famille: 'medecines-douces',
    description: 'Plus de 70 méthodes alternatives reconnues par Concordia. 75% des frais remboursés jusqu\'à CHF 4\'000/an (naturopathes) et CHF 1\'500/an (thérapeutes). Enfants dès CHF 6/mois.',
    medecinesDouces: {
      listesReconnues: ['ASCA'],
      therapiesCouvertes: [
        'acupuncture', 'osteopathie', 'homeopathie', 'naturopathie',
        'reflexologie', 'shiatsu', 'phytotherapie',
      ],
      montantMaxAnnuel: 4000,
      pourcent: 75,
      noteDetails: 'Plus de 70 méthodes reconnues. Naturopathes : 75%, max CHF 4\'000/an. Thérapeutes ASCA : 75%, max CHF 1\'500/an. Fitness/bien-être/maternité : 50%, max CHF 200/domaine/an (total max CHF 500). Bilans préventifs : 90%, max CHF 500/an. 3ème enfant gratuit si les 2 premiers assurés. Enfants < 15 ans : CHF 6/mois.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      montantGlobalMax: 500,
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      bebe: false,
      noteDetails: 'Gym prénatale/postnatale et lactation : 50%, max CHF 200/domaine/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 23.50, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 28.50, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 31.00, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/natura.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 85,
  },

  {
    id: 'concordia-natura-plus',
    assureurId: 'concordia',
    nomProduit: 'NATURAplus',
    famille: 'medecines-douces',
    description: 'Plus de 130 méthodes alternatives reconnues. 75% remboursés jusqu\'à CHF 6\'000/an (naturopathes) et CHF 2\'000/an (thérapeutes). La plus large couverture médecines douces de Concordia.',
    medecinesDouces: {
      listesReconnues: ['ASCA', 'RME'],
      therapiesCouvertes: [
        'acupuncture', 'osteopathie', 'homeopathie', 'naturopathie',
        'reflexologie', 'shiatsu', 'phytotherapie', 'medecine-traditionnelle-chinoise',
        'ayurveda', 'hypnose',
      ],
      montantMaxAnnuel: 6000,
      pourcent: 75,
      noteDetails: 'Plus de 130 méthodes reconnues (inclut nage bébé). Naturopathes : 75%, max CHF 6\'000/an. Thérapeutes : 75%, max CHF 2\'000/an. Même structure de bonus fitness/maternité/prévention que NATURA.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      montantGlobalMax: 500,
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      bebe: true,
      noteDetails: 'Nage bébé incluse en plus de NATURAplus.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 39.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 48.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 57.50, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/natura.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 85,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'concordia-dent-v1',
    assureurId: 'concordia',
    nomProduit: 'Assurance Dentaire Variante 1',
    famille: 'dentaire',
    description: 'Couverture dentaire d\'entrée : 50% des frais, max CHF 500/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 500,
      orthodontie: true,
      implants: true,
      noteDetails: 'Soins courants, orthodontie, prothèses (couronnes, bridges, implants) tous inclus. Enfants < 5 ans : sans examen de santé préalable. Délais d\'attente non précisés sur le site.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 21.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 21.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 21.00, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/zahnpflege.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  {
    id: 'concordia-dent-v4',
    assureurId: 'concordia',
    nomProduit: 'Assurance Dentaire Variante 4',
    famille: 'dentaire',
    description: 'Couverture dentaire maximale Concordia : 75% des frais, max CHF 2\'000/an. Orthodontie, implants et prothèses inclus.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 2000,
      orthodontie: true,
      implants: true,
      noteDetails: 'Couverture la plus complète Concordia. Soins courants + orthodontie + prothèses (couronnes, bridges, implants). Enfants < 5 ans sans examen préalable.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 62.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'famille',      montantCHF: 62.00, source: 'site-web', dateReleve: '2026-05-15' },
      { profilId: 'senior',       montantCHF: 62.00, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.concordia.ch/fr/versicherungen/zusatzversicherungen/zahnpflege.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 75,
  },
]
