import type { ProduitComplementaire } from '../types'

// Source : sanitas.com — relevé mai 2026

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE (gamme Vital) ────────────────────────────────────────────────

  {
    id: 'sanitas-vital-basic',
    assureurId: 'sanitas',
    nomProduit: 'Vital Basic',
    famille: 'ambulatoire',
    description: 'Couverture ambulatoire d\'entrée : urgences internationales illimitées, soins de base. Sans médecines alternatives ni fitness.',
    ambulatoire: {
      postes: [
        { nom: 'Transport & sauvetage urgence (monde)', couvert: true, pourcent: 100, noteDetails: 'Sans plafond.' },
      ],
    },
    delaiAttente: { mois: 0 },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 14.4, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 14.4, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 19.9, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-complementaires/ambulatoire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 55,
  },

  {
    id: 'sanitas-vital-smart',
    assureurId: 'sanitas',
    nomProduit: 'Vital Smart',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'medecines-douces', 'prevention', 'maternite'],
    description: 'Couverture ambulatoire intermédiaire : médecines alternatives 80% (CHF 2\'500 ou CHF 5\'000 au choix), fitness 50% (CHF 400-600), optique CHF 300/3 ans, orthodontie CHF 10\'000.',
    ambulatoire: {
      postes: [
        { nom: 'Transport & sauvetage urgence (monde)', couvert: true, pourcent: 100, noteDetails: 'Sans plafond.' },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 50, montantMaxAnnuel: 10000 },
        { nom: 'Prévention', couvert: true, pourcent: 80, montantMaxAnnuel: 1000 },
        { nom: 'Prestations parentales (naissance)', couvert: true, pourcent: 80, montantMaxAnnuel: 1000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'RME'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 5000,
      pourcent: 80,
      noteDetails: 'Au choix CHF 2\'500 ou CHF 5\'000/an.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      noteDetails: '100%, max CHF 300 par période de 3 ans.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 600,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Fitness : 50%, CHF 400 ou CHF 600/an au choix.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 35.1, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 48.3, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 51.6, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-complementaires/ambulatoire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 85,
  },

  {
    id: 'sanitas-vital-premium',
    assureurId: 'sanitas',
    nomProduit: 'Vital Premium',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'medecines-douces', 'prevention', 'maternite'],
    description: 'La couverture ambulatoire la plus complète de Sanitas : médecines alternatives 80%/CHF 10\'000, orthodontie 80% sans plafond, fitness 80%/CHF 800, optique CHF 600/3 ans.',
    ambulatoire: {
      postes: [
        { nom: 'Transport & sauvetage urgence (monde)', couvert: true, pourcent: 100, noteDetails: 'Sans plafond.' },
        { nom: 'Orthodontie (jusqu\'à 20 ans)', couvert: true, pourcent: 80, noteDetails: 'Sans plafond.' },
        { nom: 'Prévention', couvert: true, pourcent: 80, montantMaxAnnuel: 1500 },
        { nom: 'Prestations parentales (naissance)', couvert: true, noteDetails: 'Indemnités journalières CHF 1\'000 par naissance.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'RME'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'naturopathie', 'phytotherapie', 'reflexologie', 'shiatsu'],
      montantMaxAnnuel: 10000,
      pourcent: 80,
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      noteDetails: '100%, max CHF 600 par période de 3 ans.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 800,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: true,
      noteDetails: 'Fitness : 80%, max CHF 800/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 52.5, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 73.4, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 74.8, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-complementaires/ambulatoire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 88,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'sanitas-hospital-standard',
    assureurId: 'sanitas',
    nomProduit: 'Hospital Standard Liberty',
    famille: 'hospitalier',
    description: 'Division commune dans les hôpitaux conventionnés Sanitas. Aide-ménagère CHF 1\'500, soins à domicile 90 jours.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Hôpitaux conventionnés Sanitas Suisse. Urgences à l\'étranger : 90% des coûts. Aide-ménagère : CHF 25/h, max CHF 1\'500. Soins à domicile : CHF 20/jour, max 90 jours.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 9.95, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 9.95, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 14.05, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-hospitalisation/hopital-stationnaire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  {
    id: 'sanitas-hospital-extra',
    assureurId: 'sanitas',
    nomProduit: 'Hospital Extra Liberty',
    famille: 'hospitalier',
    description: 'Division demi-privée dans tous les hôpitaux reconnus Sanitas dans le monde. Surclassement 75%, soins à domicile CHF 5\'000. Priority Access : rendez-vous spécialiste en 7 jours.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Tous hôpitaux reconnus Sanitas mondialement. Surclassement : 75%, quote-part max CHF 10\'000. Soins à domicile : CHF 50/jour, max CHF 5\'000. Aide-ménagère : CHF 25/h, max CHF 750. Priority Access : rendez-vous spécialiste ≤ 7 jours.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 62.65, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 149.0, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 134.25, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-hospitalisation/hopital-stationnaire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 75,
  },

  {
    id: 'sanitas-hospital-top',
    assureurId: 'sanitas',
    nomProduit: 'Hospital Top Liberty',
    famille: 'hospitalier',
    description: 'Division privée mondiale sans restriction. Dépenses privées CHF 500/séjour, sauvetage CHF 20\'000, frais étranger jusqu\'à CHF 250\'000. Priority Access : rendez-vous spécialiste en 3 jours.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      montantMaxAnnuel: 250000,
      noteDetails: 'Cliniques et médecins sans restriction mondiale. Dépenses privées : max CHF 500/séjour. Sauvetage/transport : max CHF 20\'000. Frais étranger : max CHF 250\'000. Priority Access : rendez-vous spécialiste ≤ 3 jours.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 67.25, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 150.0, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 158.45, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-hospitalisation/hopital-stationnaire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 78,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'sanitas-dental-basic',
    assureurId: 'sanitas',
    nomProduit: 'Dental Basic',
    famille: 'dentaire',
    description: 'Couverture dentaire d\'entrée : 80% des frais jusqu\'à CHF 2\'000/an. Prévention CHF 100/an. Franchise CHF 250. Traitements en Suisse et pays limitrophes.',
    dentaire: {
      couvert: true,
      pourcentSoins: 80,
      montantMaxSoins: 2000,
      orthodontie: false,
      implants: true,
      noteDetails: 'Prévention (contrôle, détartrage) : CHF 100/an séparément. Traitements : obturations, extractions, veneers, parodontie, prothèses, implants. Traitements en Suisse et pays limitrophes uniquement. Franchise CHF 250/an (sauf prévention). Délai 6 mois (soins conservateurs, parodontaux, sagesse) / 12 mois (couronnes, bridges, pivots, inlays, facettes).',
    },
    delaiAttente: { mois: 6, detail: '12 mois pour couronnes, bridges, pivots, inlays et facettes.' },
    exclusionsPrincipales: ['Orthodontie non couverte', 'Traitements hors Suisse et pays limitrophes exclus'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 21.8, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 28.5, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 55.8, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-complementaires/assurances-dentaires.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },

  {
    id: 'sanitas-dental',
    assureurId: 'sanitas',
    nomProduit: 'Dental',
    famille: 'dentaire',
    description: 'Couverture dentaire complète : 80% des frais jusqu\'à CHF 5\'000/an. Orthodontie et chirurgie maxillaire incluses. Couverture mondiale. Franchise CHF 350/cas.',
    dentaire: {
      couvert: true,
      pourcentSoins: 80,
      montantMaxSoins: 5000,
      orthodontie: true,
      pourcentOrthodontie: 80,
      montantMaxOrthodontie: 5000,
      implants: true,
      noteDetails: 'Prévention : 1 contrôle ou détartrage/an. Traitements : mêmes que Dental Basic + orthodontie + chirurgie maxillaire. Couverture mondiale. Franchise CHF 350/cas. Délai 6 mois (soins conservateurs, parodontaux, sagesse) / 12 mois (couronnes, bridges, pivots, inlays, facettes).',
    },
    delaiAttente: { mois: 6, detail: '12 mois pour couronnes, bridges, pivots, inlays et facettes.' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 54.65, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille', montantCHF: 54.65, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior', montantCHF: 76.0, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-complementaires/assurances-dentaires.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 85,
  },

  // ─── SPÉCIAL ─────────────────────────────────────────────────────────────────

  {
    id: 'sanitas-desir-enfant',
    assureurId: 'sanitas',
    nomProduit: 'Désir d\'enfant',
    famille: 'maternite',
    description: 'Unique sur le marché : couvre les tentatives de fécondation in vitro (FIV) et tests prénatals/génétiques non remboursés par la LAMal.',
    maternite: {
      couvert: true,
      preparationAccouchement: false,
      sageFemme: false,
      bebe: false,
      noteDetails: 'Couvre FIV et procréation médicalement assistée. Tests prénataux et génétiques. Produit unique sur le marché suisse.',
    },
    tarifs: [
      { profilId: 'famille', montantCHF: 39.1, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://www.sanitas.com/fr/clients-prives/assurances/assurances-complementaires/desir-enfant-assurance.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },
]
