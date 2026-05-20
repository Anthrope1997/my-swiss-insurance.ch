import type { ProduitComplementaire } from '../types'

// Source : rhenusana.ch — relevé mai 2026
// Tarifs : portail rhenusana.bbtp.ch/portal/offerten/ — scraping Playwright 2026-05-20
// Note : rhenusana est basée à Altstätten (SG), région du Rhin
// Gammes en 3 niveaux : Argent / Or / Platine (Silber / Gold / Platin dans le portail)

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE (gamme rhenuPLUS) ───────────────────────────────────────────

  {
    id: 'rhenusana-rhenuplus-argent',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuPLUS Argent',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique'],
    description: 'Couverture ambulatoire d\'entrée rhenusana : médicaments 90%/CHF 5\'000, orthodontie 60%/CHF 5\'000 (jusqu\'à 20 ans), optique CHF 100/an, équipements médicaux CHF 200.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 90, montantMaxAnnuel: 5000 },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 60, montantMaxAnnuel: 5000 },
        { nom: 'Équipements médicaux complémentaires', couvert: true, montantMaxAnnuel: 200 },
        { nom: 'Transport & sauvetage urgence', couvert: true, montantMaxAnnuel: 10000 },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 100,
      noteDetails: '90%/CHF 100/an (adultes). Option Lifecycle : +CHF 150/an supplémentaire.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 12.40, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 12.40, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 16.30, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenuplus/',
    dateMAJ: '2026-05-20',
    scoreComplet: 65,
  },

  {
    id: 'rhenusana-rhenuplus-or',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuPLUS Or',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'Couverture ambulatoire intermédiaire : médicaments 90%/CHF 20\'000, médecines alternatives 75%/CHF 5\'000, optique CHF 200, orthodontie 60%/CHF 10\'000, fitness 75%/CHF 200, maternité 75%/CHF 200.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 90, montantMaxAnnuel: 20000 },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 60, montantMaxAnnuel: 10000 },
        { nom: 'Transport & sauvetage urgence', couvert: true, montantMaxAnnuel: 20000 },
        { nom: 'Maternité (préparation, post-natal)', couvert: true, pourcent: 75, montantMaxAnnuel: 200 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 5000,
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
      montantMaxFitness: 200,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness 75%/CHF 200/an. Examens médicaux préventifs 75%/CHF 200/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 31.70, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 31.70, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 40.00, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenuplus/',
    dateMAJ: '2026-05-20',
    scoreComplet: 76,
  },

  {
    id: 'rhenusana-rhenuplus-platine',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuPLUS Platine',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention', 'maternite'],
    description: 'La couverture ambulatoire maximale rhenusana : médicaments 90%/CHF 50\'000, médecines alternatives 75%/CHF 10\'000, optique 90%/CHF 400, orthodontie 60% sans plafond (jusqu\'à 20 ans), fitness 75%/CHF 400.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 90, montantMaxAnnuel: 50000 },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 60, noteDetails: 'Sans plafond annuel.' },
        { nom: 'Transport & sauvetage urgence', couvert: true, montantMaxAnnuel: 20000 },
        { nom: 'Maternité (préparation, post-natal)', couvert: true, pourcent: 75, montantMaxAnnuel: 400 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 10000,
      pourcent: 75,
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 400,
      noteDetails: '90%/CHF 400/an.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 400,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness 75%/CHF 400/an. Examens médicaux préventifs 75%/CHF 400/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 64.20, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 64.20, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 80.20, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenuplus/',
    dateMAJ: '2026-05-20',
    scoreComplet: 82,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'rhenusana-rhenuswiss',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuSWISS',
    famille: 'hospitalier',
    description: 'Complémentaire hospitalière rhenusana pour traitements hors canton : division commune dans tous les hôpitaux suisses, urgences à l\'étranger (UE/EFTA) jusqu\'à 60 jours/an.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Couverture complète division commune dans toute la Suisse et Liechtenstein. Urgences à l\'étranger (UE/EFTA selon accords bilatéraux) : max 60 jours/an en hôpital public.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 6.80, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 6.80, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 8.20, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenuswiss/',
    dateMAJ: '2026-05-20',
    scoreComplet: 60,
  },

  {
    id: 'rhenusana-hospital-generale',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuHOSPITAL Argent (Générale)',
    famille: 'hospitalier',
    description: 'Division commune dans les hôpitaux partenaires rhenusana. Franchise réduite. Cures médicales et aide ménagère incluses.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Hôpitaux partenaires rhenusana. Franchise CHF 50/séjour. Cures médicales incluses. Aide ménagère en cas de maladie aiguë. Système bonus fidélité.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 33.00, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 36.70, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 59.40, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenuhospital/',
    dateMAJ: '2026-05-20',
    scoreComplet: 58,
  },

  {
    id: 'rhenusana-hospital-demi-privee',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuHOSPITAL Or (Demi-Privée)',
    famille: 'hospitalier',
    description: 'Chambre à deux lits dans les hôpitaux partenaires rhenusana. Franchise CHF 50. Libre choix médecin et hôpital partenaires.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: false,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Hôpitaux partenaires. Franchise CHF 50/séjour. Cures médicales et aide ménagère. Psychiatrie au tarif de référence du canton de résidence. Système bonus fidélité.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 46.00,  source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 57.00,  source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 125.00, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenuhospital/',
    dateMAJ: '2026-05-20',
    scoreComplet: 60,
  },

  {
    id: 'rhenusana-hospital-privee',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuHOSPITAL Platine (Privée)',
    famille: 'hospitalier',
    description: 'Chambre individuelle dans les hôpitaux partenaires rhenusana. Franchise CHF 200. Libre choix médecin.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: false,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Hôpitaux partenaires. Franchise CHF 200/séjour. Cures médicales et aide ménagère. Système bonus fidélité.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 113.30, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 113.30, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 275.90, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenuhospital/',
    dateMAJ: '2026-05-20',
    scoreComplet: 60,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'rhenusana-denta-argent',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuDENTA Argent',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée rhenusana : 50%/CHF 1\'000/an. Prévention, traitements courants, orthodontie adultes inclus.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 1000,
      orthodontie: true,
      implants: false,
      noteDetails: 'Prévention, traitements conservateurs, prothèses, prophylaxie. Orthodontie adultes incluse.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 17.40, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 17.40, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 24.00, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenudenta/',
    dateMAJ: '2026-05-20',
    scoreComplet: 65,
  },

  {
    id: 'rhenusana-denta-or',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuDENTA Or',
    famille: 'dentaire',
    description: 'Assurance dentaire intermédiaire rhenusana : 75%/CHF 1\'500/an. Orthodontie adultes incluse.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 1500,
      orthodontie: true,
      implants: false,
      noteDetails: 'Prévention, traitements conservateurs, prothèses, prophylaxie, chirurgie maxillofaciale. Orthodontie adultes incluse.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 44.30, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 44.30, source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 61.80, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenudenta/',
    dateMAJ: '2026-05-20',
    scoreComplet: 70,
  },

  {
    id: 'rhenusana-denta-platine',
    assureurId: 'rhenusana',
    nomProduit: 'rhenuDENTA Platine',
    famille: 'dentaire',
    description: 'La meilleure couverture dentaire rhenusana : 90%/CHF 2\'000/an. Option + : 75% des frais > CHF 5\'000 jusqu\'à CHF 30\'000. Orthodontie adultes incluse.',
    dentaire: {
      couvert: true,
      pourcentSoins: 90,
      montantMaxSoins: 2000,
      orthodontie: true,
      implants: true,
      noteDetails: '90% des frais, max CHF 2\'000/an. Option supplémentaire : 75% des frais au-delà de CHF 5\'000, jusqu\'à CHF 30\'000. Orthodontie adultes et chirurgie maxillofaciale incluses.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 83.90,  source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'famille',      montantCHF: 83.90,  source: 'site-web', dateReleve: '2026-05-20' },
      { profilId: 'senior',       montantCHF: 117.30, source: 'site-web', dateReleve: '2026-05-20' },
    ],
    urlProduit: 'https://rhenusana.ch/zusatzversicherung/rhenudenta/',
    dateMAJ: '2026-05-20',
    scoreComplet: 82,
  },
]
