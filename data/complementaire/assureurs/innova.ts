import type { ProduitComplementaire } from '../types'

// Source : innova.ch — relevé mai 2026
// Note : innova est basée à Lucerne ; produits disponibles en allemand principalement
// Remise sanvita (non-fumeurs) : jusqu'à 25% sur la prime hospitalisation
// Remise enfants : 20% si un parent est assuré innova
// Remise combinaison ambulatoire : jusqu'à 15%

export const produits: ProduitComplementaire[] = [

  // ─── HOSPITALIER (switch) ─────────────────────────────────────────────────────

  {
    id: 'innova-switch',
    assureurId: 'innova',
    nomProduit: 'switch',
    famille: 'hospitalier',
    description: 'Hospitalisation flexible innova : choix libre de la division à chaque entrée (commune/demi-privée/privée). Franchise journalière selon division. Non-fumeurs (sanvita) : jusqu\'à 25% de remise. Enfants -20% si parent assuré.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Division choisie au moment de l\'admission. Franchise : générale CHF 10/j, demi-privée CHF 75/j, privée CHF 200/j (max 30 jours/an). Urgences médicales à l\'étranger couvertes. Maternité : délai 365 jours. Remise sanvita (non-fumeurs) : jusqu\'à 25%. Remise enfants : 20% si parent assuré innova.',
    },
    delaiAttente: { mois: 12, detail: 'Délai 365 jours pour les prestations de maternité.' },
    conditionsSouscription: ['Variante sanvita (non-fumeurs) : remise jusqu\'à 25%', 'Variante activa (fumeurs) : conditions standard', 'Enfants < 18 ans : remise 20% si parent assuré'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 38,    source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 45,    source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 83,    source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.innova.ch/private/versicherungen/zusatzversicherungen/spitalzusatzversicherung',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  // ─── AMBULATOIRE (plus eins / plus deux / plus trois) ────────────────────────

  {
    id: 'innova-plus-eins',
    assureurId: 'innova',
    nomProduit: 'plus eins',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'prevention'],
    description: 'Ambulatoire d\'entrée innova : médecines alternatives 75%/CHF 1\'500, dentaire enfants/ados 75% sans plafond, transport 75% illimité, urgences étranger 90%, prévention CHF 300.',
    ambulatoire: {
      postes: [
        { nom: 'Dentaire enfants et adolescents', couvert: true, pourcent: 75, noteDetails: 'Sans plafond annuel.' },
        { nom: 'Transport & sauvetage urgence', couvert: true, pourcent: 75, noteDetails: 'Sans plafond.' },
        { nom: 'Urgences médicales à l\'étranger', couvert: true, pourcent: 90 },
        { nom: 'Prévention (check-ups)', couvert: true, montantMaxAnnuel: 300 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie'],
      montantMaxAnnuel: 1500,
      pourcent: 75,
    },
    conditionsSouscription: ['Remise combinaison avec plus deux / plus trois : jusqu\'à 15%'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 24,    source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 27,    source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 32,    source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.innova.ch/private/versicherungen/zusatzversicherungen/ambulante-zusatzversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 65,
  },

  {
    id: 'innova-plus-deux',
    assureurId: 'innova',
    nomProduit: 'plus deux',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'Ambulatoire complet innova : médecines alternatives 75%/CHF 3\'000, optique CHF 200, fitness CHF 250, transport 100% illimité, prévention CHF 500, équipements CHF 300/3 ans.',
    ambulatoire: {
      postes: [
        { nom: 'Dentaire enfants et adolescents', couvert: true, pourcent: 75, noteDetails: 'Sans plafond.' },
        { nom: 'Transport & sauvetage urgence', couvert: true, pourcent: 100, noteDetails: 'Sans plafond.' },
        { nom: 'Urgences médicales à l\'étranger', couvert: true, pourcent: 90 },
        { nom: 'Équipements médicaux', couvert: true, montantMaxAnnuel: 300, noteDetails: 'CHF 300/3 ans.' },
        { nom: 'Prévention (check-ups)', couvert: true, montantMaxAnnuel: 500 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie'],
      montantMaxAnnuel: 3000,
      pourcent: 75,
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 200,
      noteDetails: 'CHF 200/an.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 250,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness : CHF 250/an. Check-ups : CHF 500/an.',
    },
    conditionsSouscription: ['Remise combinaison : jusqu\'à 15%'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 46,    source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 48,    source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 52,    source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.innova.ch/private/versicherungen/zusatzversicherungen/ambulante-zusatzversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 75,
  },

  {
    id: 'innova-plus-trois',
    assureurId: 'innova',
    nomProduit: 'plus trois',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'prevention'],
    description: 'Module complémentaire innova (combinable avec plus eins/deux) : médicaments 75%/CHF 5\'000, actes chirurgicaux CHF 300/intervention, urgences étranger 100%, équipements CHF 3\'000/3 ans, optique CHF 200/3 ans.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 75, montantMaxAnnuel: 5000 },
        { nom: 'Actes chirurgicaux ambulatoires', couvert: true, montantMaxSession: 300, sessionsMax: 1, noteDetails: 'CHF 300/intervention, 1 fois/an.' },
        { nom: 'Urgences médicales à l\'étranger', couvert: true, pourcent: 100 },
        { nom: 'Protection juridique médicale (monde)', couvert: true },
        { nom: 'Équipements médicaux', couvert: true, montantMaxAnnuel: 3000, noteDetails: 'CHF 3\'000/3 ans.' },
        { nom: 'Prévention (check-ups)', couvert: true, montantMaxAnnuel: 500 },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 200,
      noteDetails: 'CHF 200/3 ans.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 300,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness : CHF 300/an. Check-ups : CHF 500/an.',
    },
    conditionsSouscription: ['Module indépendant ou combinable avec plus eins / plus deux. Remise jusqu\'à 15%.'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 25.65, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 28.50, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 33.25, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.innova.ch/private/versicherungen/zusatzversicherungen/ambulante-zusatzversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 70,
  },

  // ─── DENTAIRE (denta) ─────────────────────────────────────────────────────────

  {
    id: 'innova-denta-1',
    assureurId: 'innova',
    nomProduit: 'denta Classe 1',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée innova : 50%/CHF 1\'000/an. Hygiène dentaire, traitements canal, implants. Traitements dans les pays limitrophes. Nécessite l\'assurance switch.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 1000,
      orthodontie: false,
      implants: true,
      noteDetails: 'Hygiène dentaire, traitements de canal, implants. Traitements dans les pays limitrophes au tarif Suisse. Souscription simultanée de switch (hospit) requise.',
    },
    conditionsSouscription: ['Souscription simultanée de l\'assurance hospitalière switch requise'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 17,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 20,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 27,  source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.innova.ch/private/versicherungen/zusatzversicherungen/zahnversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 65,
  },

  {
    id: 'innova-denta-2',
    assureurId: 'innova',
    nomProduit: 'denta Classe 2',
    famille: 'dentaire',
    description: 'Assurance dentaire intermédiaire innova : 75%/CHF 1\'500/an. Implants inclus. Pays limitrophes. Nécessite switch.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 1500,
      orthodontie: false,
      implants: true,
      noteDetails: 'Hygiène, traitements canal, implants. Pays limitrophes au tarif Suisse. Souscription switch requise.',
    },
    conditionsSouscription: ['Souscription simultanée de switch requise'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 48,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 52,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 71,  source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.innova.ch/private/versicherungen/zusatzversicherungen/zahnversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 68,
  },

  {
    id: 'innova-denta-3',
    assureurId: 'innova',
    nomProduit: 'denta Classe 3',
    famille: 'dentaire',
    description: 'Meilleure couverture dentaire innova : 75%/CHF 3\'000/an. Implants inclus. Traitements dans les pays limitrophes. Nécessite switch.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 3000,
      orthodontie: false,
      implants: true,
      noteDetails: 'Hygiène, traitements canal, implants. Pays limitrophes au tarif Suisse. Souscription switch requise.',
    },
    conditionsSouscription: ['Souscription simultanée de switch requise'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 86,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 94,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 128, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.innova.ch/private/versicherungen/zusatzversicherungen/zahnversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 72,
  },
]
