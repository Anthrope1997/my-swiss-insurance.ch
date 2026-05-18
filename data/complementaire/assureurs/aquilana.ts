import type { ProduitComplementaire } from '../types'

// Source : aquilana.ch — relevé mai 2026
// Note : Aquilana est basée à Baden (AG) ; couverture nationale
// Âge max d'admission : 65 ans (bon état de santé requis)

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'aquilana-plus',
    assureurId: 'aquilana',
    nomProduit: 'Krankenpflege PLUS',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'prevention'],
    description: 'Couverture ambulatoire complète : médicaments non remboursés 90% sans limite, médecines alternatives 90%/CHF 1\'000, lunettes 90%/CHF 250, psychothérapie 30 séances CHF 60.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés par la LAMal', couvert: true, pourcent: 90, noteDetails: 'Sans plafond annuel.' },
        { nom: 'Médecines alternatives, massages, coaching santé', couvert: true, pourcent: 90, montantMaxAnnuel: 1000 },
        { nom: 'Appareils médicaux', couvert: true, pourcent: 90, montantMaxAnnuel: 200 },
        { nom: 'Gynécologie préventive', couvert: true, pourcent: 90, noteDetails: '1 fois par année civile.' },
        { nom: 'Vaccins (y compris voyage)', couvert: true, pourcent: 90, montantMaxAnnuel: 250 },
        { nom: 'Psychothérapie', couvert: true, montantMaxSession: 60, sessionsMax: 30, noteDetails: 'CHF 60/séance, max 30 séances/an.' },
        { nom: 'Cures thermales', couvert: true, noteDetails: 'CHF 40/jour, max 30 jours sur 2 ans.' },
        { nom: 'Stérilisation', couvert: true, pourcent: 90, montantMaxAnnuel: 500 },
        { nom: 'Médecins non conventionnés', couvert: true, pourcent: 50 },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 250,
      noteDetails: '90%, max CHF 250 par période de 3 ans (adultes). Annuel pour enfants.',
    },
    conditionsSouscription: ['Bon état de santé requis', 'Âge maximum 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 23.50, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 23.50, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 28.50, source: 'pdf', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.aquilana.ch/versicherungen/zusatzversicherungen/krankenpflege-plus',
    dateMAJ: '2026-05-18',
    scoreComplet: 78,
  },

  {
    id: 'aquilana-top',
    assureurId: 'aquilana',
    nomProduit: 'Krankenpflege TOP',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'prevention'],
    description: 'Couverture ambulatoire avec médecines alternatives 90%/CHF 2\'000, orthodontie 75%/CHF 5\'000 jusqu\'à 25 ans, urgences mondiales 90%. Check-ups et fitness inclus (total CHF 600).',
    ambulatoire: {
      postes: [
        { nom: 'Orthodontie (jusqu\'à 25 ans)', couvert: true, pourcent: 75, montantMaxAnnuel: 5000, noteDetails: 'Délai d\'attente 24 mois.' },
        { nom: 'Aides médicales (hors lunettes)', couvert: true, pourcent: 90, montantMaxAnnuel: 1000 },
        { nom: 'Urgences médicales à l\'étranger (monde)', couvert: true, pourcent: 90, noteDetails: 'Tarifs privés, sans plafond.' },
        { nom: 'Traitement électif à l\'étranger', couvert: true, pourcent: 90, montantMaxAnnuel: 1000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['homeopathie', 'medecine-traditionnelle-chinoise', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 2000,
      pourcent: 90,
      noteDetails: 'Homéopathie, MTC, thérapie neurale, phytothérapie, médecine anthroposophique.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 300,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: true,
      montantGlobalMax: 600,
      noteDetails: 'Check-ups 90%/CHF 500. Fitness 50%/CHF 300. Sevrage tabac/nutrition 50%/CHF 150. Grossesse/post-natal 50%/CHF 150. Cures thermales 50%/CHF 150. Total max CHF 600/an.',
    },
    delaiAttente: { mois: 24, detail: 'Délai 24 mois pour l\'orthodontie uniquement.' },
    conditionsSouscription: ['Bon état de santé requis', 'Âge maximum 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 30.50, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 30.50, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 31.90, source: 'pdf', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.aquilana.ch/versicherungen/zusatzversicherungen/krankenpflege-top',
    dateMAJ: '2026-05-18',
    scoreComplet: 80,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'aquilana-hospital-generale',
    assureurId: 'aquilana',
    nomProduit: 'Spitalzusatz Générale (SV/A)',
    famille: 'hospitalier',
    description: 'Division commune 100% dans les hôpitaux conventionnés Aquilana en Suisse. Urgences étranger CHF 20\'000. Aide ménagère CHF 20/j. Maternité à domicile CHF 1\'000 (délai 24 mois).',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      pourcent: 100,
      noteDetails: 'Hôpitaux de la liste LAMal et conventionnés Aquilana. Urgences étranger : CHF 20\'000. Aide ménagère : CHF 20/j. Repos convalescence : CHF 20/j (max 30j/2 ans). Allocation naissance à domicile : CHF 1\'000 (délai 24 mois).',
    },
    delaiAttente: { mois: 24, detail: 'Pour maternité/naissance uniquement.' },
    conditionsSouscription: ['Bon état de santé requis', 'Âge maximum 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 5.70,  source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 5.70,  source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 10.00, source: 'pdf', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.aquilana.ch/versicherungen/zusatzversicherungen/spitalzusatzversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 62,
  },

  {
    id: 'aquilana-hospital-demi-privee',
    assureurId: 'aquilana',
    nomProduit: 'Spitalzusatz Demi-Privée (SV/HP)',
    famille: 'hospitalier',
    description: 'Chambre à deux lits, sauvetage illimité monde, aide ménagère CHF 40/j, repos CHF 30/j. Maternité à domicile CHF 1\'500 (délai 24 mois).',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: false,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Choix médecin sans garantie. Transport/sauvetage urgence illimité. Aide ménagère : CHF 40/j. Repos convalescence : CHF 30/j. Allocation naissance à domicile : CHF 1\'500 (délai 24 mois).',
    },
    delaiAttente: { mois: 24, detail: 'Pour maternité/naissance uniquement.' },
    conditionsSouscription: ['Bon état de santé requis', 'Âge maximum 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 74.90,  source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 74.90,  source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 139.60, source: 'pdf', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.aquilana.ch/versicherungen/zusatzversicherungen/spitalzusatzversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 65,
  },

  {
    id: 'aquilana-hospital-privee',
    assureurId: 'aquilana',
    nomProduit: 'Spitalzusatz Privée (SV/P)',
    famille: 'hospitalier',
    description: 'Chambre individuelle, libre choix médecin-chef/spécialiste, sauvetage illimité monde, aide ménagère CHF 60/j, repos CHF 40/j. Maternité à domicile CHF 2\'000 (délai 24 mois).',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Médecin-chef ou spécialiste au choix. Transport/sauvetage urgence illimité. Aide ménagère : CHF 60/j. Repos convalescence : CHF 40/j. Allocation naissance à domicile : CHF 2\'000 (délai 24 mois).',
    },
    delaiAttente: { mois: 24, detail: 'Pour maternité/naissance uniquement.' },
    conditionsSouscription: ['Bon état de santé requis', 'Âge maximum 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 141.90, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 141.90, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 220.40, source: 'pdf', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.aquilana.ch/versicherungen/zusatzversicherungen/spitalzusatzversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 68,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'aquilana-dental-1',
    assureurId: 'aquilana',
    nomProduit: 'Zahnpflege ZV I',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée Aquilana : 30% des frais, CHF 1\'000/an. Orthodontie jusqu\'à 25 ans. Enfants < 6 ans sans examen de santé si parent assuré.',
    dentaire: {
      couvert: true,
      pourcentSoins: 30,
      montantMaxSoins: 1000,
      orthodontie: true,
      implants: false,
      noteDetails: 'Prévention, traitements conservateurs, prothèses. Orthodontie jusqu\'à 25 ans. Enfants < 6 ans : sans bilan de santé si parent assuré Aquilana.',
    },
    conditionsSouscription: ['Denture assainie, aucun traitement prévu au moment de la souscription'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 17.60, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 17.60, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 19.80, source: 'pdf', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.aquilana.ch/versicherungen/zusatzversicherungen/zahnpflegeversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 65,
  },

  {
    id: 'aquilana-dental-2',
    assureurId: 'aquilana',
    nomProduit: 'Zahnpflege ZV II',
    famille: 'dentaire',
    description: 'Assurance dentaire complète Aquilana : 60%/CHF 2\'500/an. Combinée avec ZV I : max CHF 3\'500/an. Orthodontie jusqu\'à 25 ans. Délai 24 mois si souscrit avec TOP.',
    dentaire: {
      couvert: true,
      pourcentSoins: 60,
      montantMaxSoins: 2500,
      orthodontie: true,
      implants: false,
      noteDetails: 'Prévention, traitements conservateurs, prothèses, laboratoire. Orthodontie jusqu\'à 25 ans. ZV I + ZV II cumulables : max CHF 3\'500/an. Enfants < 6 ans : sans bilan de santé si parent assuré Aquilana.',
    },
    delaiAttente: { mois: 24, detail: 'Délai 24 mois si souscrit en combinaison avec le plan TOP.' },
    conditionsSouscription: ['Denture assainie, aucun traitement prévu'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 44.00, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 44.00, source: 'pdf', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 49.50, source: 'pdf', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.aquilana.ch/versicherungen/zusatzversicherungen/zahnpflegeversicherung',
    dateMAJ: '2026-05-18',
    scoreComplet: 68,
  },
]
