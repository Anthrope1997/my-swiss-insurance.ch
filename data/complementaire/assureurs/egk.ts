import type { ProduitComplementaire } from '../types'

// Source : egk.ch + aperçu des prestations EGK-SUN PDF (2024) — relevé mai 2026
// EGK = Eau de Grâce / Gesundheitskasse — spécialisée en médecines naturelles
// 4 variantes hospitalières (SUN-3 Commune / SUN-2 Demi-privée / SUN-Flex / SUN-1 Privée)
// Couverture ambulatoire identique pour toutes les variantes — franchise ambulatoire au choix (CHF 0/300/600/1000)
// Rabais famille 10% sur prime (même ménage)
// EGK-DENT : 3 variantes indépendantes de EGK-SUN

export const produits: ProduitComplementaire[] = [

  // ─── EGK-SUN Prestations ambulatoires communes (toutes variantes) ──────────
  // La couverture ambulatoire est identique dans les 4 variantes — seule l'hospitalisation diffère

  // ─── EGK-SUN variante 3 — Division Commune ─────────────────────────────────

  {
    id: 'egk-sun-3',
    assureurId: 'egk',
    nomProduit: 'EGK-SUN Commune (SUN-3)',
    famille: 'medecines-douces',
    familles: ['medecines-douces', 'ambulatoire', 'hospitalier', 'prevention', 'optique', 'maternite'],
    description: 'EGK-SUN division commune : médecine complémentaire 80% illimité (14\'000+ naturopathes), médicaments 80%/CHF 2\'000, thérapies 80%/CHF 2\'600, optique CHF 200/3ans, fitness CHF 360, orthodontie <18 ans 80%/CHF 10\'000 (délai 3 ans), transport urgence CHF 100\'000.',
    ambulatoire: {
      postes: [
        { nom: 'Médecine complémentaire (naturopathe reconnu EGK)', couvert: true, pourcent: 80, noteDetails: 'Illimité. 14\'000+ naturopathes traités à l\'égal des médecins.' },
        { nom: 'Acupuncture (médecin ou naturopathe)', couvert: true, pourcent: 80, noteDetails: 'Illimité.' },
        { nom: 'Remèdes naturels (prescrits médecin ou naturopathe)', couvert: true, pourcent: 80, noteDetails: 'Illimité.' },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 80, montantMaxAnnuel: 2000, noteDetails: 'Sur prescription médicale, hors liste séparée EGK.' },
        { nom: 'Thérapies ambulatoires reconnues EGK (thérapeutes)', couvert: true, pourcent: 80, montantMaxAnnuel: 2600 },
        { nom: 'Thérapies non reconnues EGK (plafond commun)', couvert: true, pourcent: 80, montantMaxAnnuel: 480, noteDetails: 'Dans un plafond global CHF 500/an avec cours et médicaments sans ordonnance.' },
        { nom: 'Cours de promotion de la santé', couvert: true, montantMaxAnnuel: 100 },
        { nom: 'Médicaments sans prescription', couvert: true, montantMaxAnnuel: 100 },
        { nom: 'Abonnement fitness / Pilates', couvert: true, montantMaxAnnuel: 360 },
        { nom: 'Examens labo médecine complémentaire', couvert: true, montantMaxAnnuel: 500 },
        { nom: 'Vaccins (non-LAMal)', couvert: true, montantMaxAnnuel: 200 },
        { nom: 'Orthodontie / chirurgie bucco-maxillaire (<18 ans)', couvert: true, pourcent: 80, montantMaxAnnuel: 10000, noteDetails: 'Délai de carence 3 ans.' },
        { nom: 'Optique — enfants (<18 ans)', couvert: true, montantMaxAnnuel: 200, noteDetails: 'Max CHF 200 / 2 ans.' },
        { nom: 'Optique — adultes', couvert: true, montantMaxAnnuel: 200, noteDetails: 'Max CHF 200 / 3 ans (idem laser).' },
        { nom: 'Check-up médical préventif', couvert: true, montantMaxAnnuel: 200 },
        { nom: 'Gynécologie préventive', couvert: true, noteDetails: '2 examens / 3 ans. Mammographie tous les 2 ans dès 50 ans (si pas AOS).' },
        { nom: 'Transport urgence Suisse et étranger', couvert: true, montantMaxAnnuel: 100000 },
        { nom: 'Cures (médecine élargie sur prescription)', couvert: true, montantMaxAnnuel: 500 },
        { nom: 'Électroacupuncture Voll, thérapie neurale, Kneipp', couvert: true, montantMaxAnnuel: 500 },
        { nom: 'Soins grossesse complémentaires AOS + forfait suites de couches', couvert: true, noteDetails: 'Tous examens grossesse + baignoire accouchement CHF 300.' },
        { nom: 'Sage-femme (accouchement à domicile)', couvert: true, montantMaxAnnuel: 400 },
        { nom: 'Maison de naissance (sans mandat cantonal)', couvert: true, noteDetails: 'Frais selon garantie EGK préalable.' },
        { nom: 'Préparation accouchement / rééducation postnatale', couvert: true, pourcent: 50 },
        { nom: 'Aide ménagère (maladie/accident, sur prescription)', couvert: true, montantMaxAnnuel: 630, noteDetails: 'CHF 30/j max 21j/an (Commune).' },
        { nom: 'Garde d\'enfants (hospitalisation du parent)', couvert: true, montantMaxAnnuel: 630, noteDetails: 'CHF 30/j max 21j/an.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie', 'reflexologie', 'shiatsu', 'ayurveda'],
      noteDetails: '14\'000+ naturopathes et médecins reconnus par EGK. Traités à l\'égal des médecins conventionnés — unique en Suisse. Listes EMR, ASCA et autres. Médecine comp. illimitée à 80%.',
    },
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Division commune dans hôpitaux avec mandat de prestations cantonal. Hôpitaux à orientation médecine complémentaire inclus (liste EGK).',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 200,
      noteDetails: 'Adultes : CHF 200/3 ans. Enfants (<18 ans) : CHF 200/2 ans. Idem traitement laser.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 360,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Fitness/Pilates : CHF 360/an. Check-up : CHF 200/an. Vaccins : CHF 200/an. Cours santé : CHF 100/an.',
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      bebe: false,
      noteDetails: 'Tous examens grossesse + forfait suites de couches + baignoire CHF 300. Sage-femme domicile CHF 400. Prép./rééducation 50%.',
    },
    delaiAttente: { mois: 36, detail: 'Délai de carence 3 ans pour l\'orthodontie enfants.' },
    conditionsSouscription: ['Rabais famille 10% (même ménage, même encaissement)', 'Adhésion prénatale possible dans toutes les variantes', 'Franchise ambulatoire au choix : CHF 0, 300, 600 ou 1\'000/an'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 58.20,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 102.60, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 87.20,  source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.egk.ch/fr/assurances/assurances-complementaires',
    dateMAJ: '2026-05-17',
    scoreComplet: 88,
  },

  // ─── EGK-SUN variante 2 — Division Semi-Privée ─────────────────────────────

  {
    id: 'egk-sun-2',
    assureurId: 'egk',
    nomProduit: 'EGK-SUN Demi-Privée (SUN-2)',
    famille: 'medecines-douces',
    familles: ['medecines-douces', 'ambulatoire', 'hospitalier', 'prevention', 'optique', 'maternite'],
    description: 'EGK-SUN division semi-privée : toutes les prestations ambulatoires SUN-3 + chambre 2 lits libre choix, aide ménagère CHF 50/j, garde enfants CHF 50/j. Quote-part hospit au choix CHF 0/1000/2000/5000.',
    ambulatoire: {
      postes: [
        { nom: 'Voir EGK-SUN Commune pour les prestations ambulatoires complètes', couvert: true, noteDetails: 'Identique à SUN-3 : médecine comp 80% illimité, médicaments 80%/CHF 2\'000, thérapies 80%/CHF 2\'600, fitness CHF 360, orthodontie 80%/CHF 10\'000, etc.' },
        { nom: 'Aide ménagère (maladie/accident)', couvert: true, montantMaxAnnuel: 1050, noteDetails: 'CHF 50/j max 21j/an.' },
        { nom: 'Garde d\'enfants (hospitalisation parent)', couvert: true, montantMaxAnnuel: 1050, noteDetails: 'CHF 50/j max 21j/an.' },
        { nom: 'Transport urgence Suisse et étranger', couvert: true, montantMaxAnnuel: 100000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie', 'reflexologie', 'shiatsu', 'ayurveda'],
      noteDetails: 'Identique à SUN-3. Médecine complémentaire illimitée à 80%.',
    },
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Division semi-privée, tous hôpitaux et cliniques reconnus par les autorités cantonales. Quote-part hospitalière au choix : CHF 0/1\'000/2\'000/5\'000/an. Quote-part demi-privée : 15% max CHF 6\'000/an (si applicable).',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 200,
      noteDetails: 'Adultes : CHF 200/3 ans. Enfants (<18 ans) : CHF 200/2 ans.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 360,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      bebe: false,
    },
    delaiAttente: { mois: 36, detail: 'Délai de carence 3 ans pour l\'orthodontie enfants.' },
    conditionsSouscription: ['Quote-part hospit au choix : CHF 0, 1\'000, 2\'000 ou 5\'000/an', 'Rabais famille 10%'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 119.20, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 170.80, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 206.10, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.egk.ch/fr/assurances/assurances-complementaires',
    dateMAJ: '2026-05-17',
    scoreComplet: 88,
  },

  // ─── EGK-SUN variante Flex ──────────────────────────────────────────────────

  {
    id: 'egk-sun-flex',
    assureurId: 'egk',
    nomProduit: 'EGK-SUN Flex',
    famille: 'medecines-douces',
    familles: ['medecines-douces', 'ambulatoire', 'hospitalier', 'prevention', 'optique', 'maternite'],
    description: 'EGK-SUN flex : libre choix de la division avant chaque séjour, tous hôpitaux reconnus. Aide ménagère CHF 60/j. Toutes les prestations ambulatoires SUN-3.',
    ambulatoire: {
      postes: [
        { nom: 'Prestations ambulatoires : voir EGK-SUN Commune', couvert: true, noteDetails: 'Identique à SUN-3.' },
        { nom: 'Aide ménagère (maladie/accident)', couvert: true, montantMaxAnnuel: 1260, noteDetails: 'CHF 60/j max 21j/an.' },
        { nom: 'Garde d\'enfants (hospitalisation parent)', couvert: true, montantMaxAnnuel: 1260, noteDetails: 'CHF 60/j max 21j/an.' },
        { nom: 'Transport urgence', couvert: true, montantMaxAnnuel: 100000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie', 'reflexologie', 'shiatsu', 'ayurveda'],
      noteDetails: 'Identique à SUN-3. Médecine complémentaire illimitée à 80%.',
    },
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Libre choix de la division avant chaque séjour (commune, semi-privée, privée). Tous hôpitaux reconnus cantonalement. Traitements ambulatoires et stationnaires planifiés à l\'étranger possibles sur demande préalable.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 200,
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 360,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      bebe: false,
    },
    delaiAttente: { mois: 36, detail: 'Délai de carence 3 ans pour l\'orthodontie enfants.' },
    conditionsSouscription: ['Rabais famille 10%', 'Adhésion prénatale possible'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 85.20,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 134.10, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 159.50, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.egk.ch/fr/assurances/assurances-complementaires',
    dateMAJ: '2026-05-17',
    scoreComplet: 88,
  },

  // ─── EGK-SUN variante 1 — Division Privée ──────────────────────────────────

  {
    id: 'egk-sun-1',
    assureurId: 'egk',
    nomProduit: 'EGK-SUN Privée (SUN-1)',
    famille: 'medecines-douces',
    familles: ['medecines-douces', 'ambulatoire', 'hospitalier', 'prevention', 'optique', 'maternite'],
    description: 'EGK-SUN division privée : toutes les prestations ambulatoires SUN-3 + chambre individuelle libre choix, aide ménagère CHF 100/j, traitement étranger illimité dans le temps. Quote-part hospit au choix CHF 0/1000/2000/5000.',
    ambulatoire: {
      postes: [
        { nom: 'Prestations ambulatoires : voir EGK-SUN Commune', couvert: true, noteDetails: 'Identique à SUN-3.' },
        { nom: 'Aide ménagère (maladie/accident)', couvert: true, montantMaxAnnuel: 2100, noteDetails: 'CHF 100/j max 21j/an.' },
        { nom: 'Garde d\'enfants (hospitalisation parent)', couvert: true, montantMaxAnnuel: 2100, noteDetails: 'CHF 100/j max 21j/an.' },
        { nom: 'Transport urgence', couvert: true, montantMaxAnnuel: 100000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie', 'reflexologie', 'shiatsu', 'ayurveda'],
      noteDetails: 'Identique à SUN-3. Médecine complémentaire illimitée à 80%.',
    },
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Division privée, tous hôpitaux reconnus cantonalement. Quote-part au choix : CHF 0/1\'000/2\'000/5\'000/an. Quote-part privée : 25% max CHF 8\'000/an (si applicable). Traitements à l\'étranger : ambulatoires et stationnaires illimités dans le temps (complément AOS).',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 200,
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 360,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      bebe: false,
    },
    delaiAttente: { mois: 36, detail: 'Délai de carence 3 ans pour l\'orthodontie enfants.' },
    conditionsSouscription: ['Quote-part hospit au choix : CHF 0, 1\'000, 2\'000 ou 5\'000/an', 'Rabais famille 10%'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 158.50, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 289.40, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 334.40, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.egk.ch/fr/assurances/assurances-complementaires',
    dateMAJ: '2026-05-17',
    scoreComplet: 90,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'egk-dent-500',
    assureurId: 'egk',
    nomProduit: 'EGK-DENT 50%/CHF 500',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée EGK : 50% des frais, plafond CHF 500/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 500,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements dentaires courants : 50%/CHF 500/an. Orthodontie enfants disponible via EGK-SUN (80%/CHF 10\'000, délai 3 ans).',
    },
    tarifs: [],
    masquer: true,
    urlProduit: 'https://www.egk.ch/fr/assurances/assurances-complementaires/egk-dent-fr',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  {
    id: 'egk-dent-1000',
    assureurId: 'egk',
    nomProduit: 'EGK-DENT 50%/CHF 1\'000',
    famille: 'dentaire',
    description: 'Assurance dentaire intermédiaire EGK : 50% des frais, plafond CHF 1\'000/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 1000,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements dentaires courants : 50%/CHF 1\'000/an. Orthodontie enfants via EGK-SUN.',
    },
    tarifs: [],
    masquer: true,
    urlProduit: 'https://www.egk.ch/fr/assurances/assurances-complementaires/egk-dent-fr',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'egk-dent-1500',
    assureurId: 'egk',
    nomProduit: 'EGK-DENT 75%/CHF 1\'500',
    famille: 'dentaire',
    description: 'Meilleure couverture dentaire EGK : 75% des frais, plafond CHF 1\'500/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 1500,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements dentaires courants : 75%/CHF 1\'500/an. Orthodontie enfants via EGK-SUN.',
    },
    tarifs: [],
    masquer: true,
    urlProduit: 'https://www.egk.ch/fr/assurances/assurances-complementaires/egk-dent-fr',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },
]
