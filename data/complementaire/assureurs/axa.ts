import type { ProduitComplementaire } from '../types'

// Source : axa.ch — relevé mai 2026
// Remise famille : 5% (2 membres) / 10% (3+ membres du même ménage)
// Délai d'attente dentaire : 6 mois (levé si couverture équivalente antérieure)

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'axa-ambulatoire-actif',
    assureurId: 'axa',
    nomProduit: 'Ambulatoire ACTIF',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'prevention'],
    description: 'Couverture ambulatoire d\'entrée AXA : médecines complémentaires 75%/CHF 1\'000, fitness 75%/CHF 200, prévention CHF 500. Sans optique ni médicaments.',
    ambulatoire: {
      postes: [
        { nom: 'Médecines complémentaires', couvert: true, pourcent: 75, montantMaxAnnuel: 1000 },
        { nom: 'Fitness et abonnements wellness', couvert: true, pourcent: 75, montantMaxAnnuel: 200 },
        { nom: 'Prévention et check-ups', couvert: true, montantMaxAnnuel: 500 },
        { nom: 'Lunettes et lentilles', couvert: false },
        { nom: 'Médicaments non remboursés LAMal', couvert: false },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie'],
      montantMaxAnnuel: 1000,
      pourcent: 75,
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness : 75%/CHF 200/an. Prévention/check-ups : CHF 500/an.',
    },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 24.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 24.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 24.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-complementaire-ambulatoire.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 62,
  },

  {
    id: 'axa-ambulatoire-plus',
    assureurId: 'axa',
    nomProduit: 'Ambulatoire PLUS',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'Couverture ambulatoire intermédiaire AXA : optique CHF 150/an, médicaments 75%, psychothérapie 75%/CHF 1\'000, urgences étranger 100%.',
    ambulatoire: {
      postes: [
        { nom: 'Lunettes et lentilles de contact', couvert: true, montantMaxAnnuel: 150 },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 75, noteDetails: 'Plafond annuel à confirmer dans l\'aperçu des prestations.' },
        { nom: 'Psychothérapie', couvert: true, pourcent: 75, montantMaxAnnuel: 1000 },
        { nom: 'Urgences médicales à l\'étranger', couvert: true, pourcent: 100 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie'],
      noteDetails: 'Médecines complémentaires incluses. Montant précis dans l\'aperçu des prestations AXA.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 150,
      noteDetails: 'CHF 150/an adultes.',
    },
    prevention: {
      fitness: true,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness et prévention inclus. Montants dans l\'aperçu des prestations AXA.',
    },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 18.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 20.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 25.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-complementaire-ambulatoire.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 60,
  },

  {
    id: 'axa-ambulatoire-complet',
    assureurId: 'axa',
    nomProduit: 'Ambulatoire COMPLET',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'La couverture ambulatoire maximale AXA : médecines comp 75%/CHF 3\'000, optique CHF 300/an, médicaments 90%, psycho 75%/CHF 3\'000, fitness 75%/CHF 300, prévention CHF 600, urgences étranger 100%.',
    ambulatoire: {
      postes: [
        { nom: 'Médecines complémentaires', couvert: true, pourcent: 75, montantMaxAnnuel: 3000 },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 90, noteDetails: 'Plafond à confirmer.' },
        { nom: 'Psychothérapie', couvert: true, pourcent: 75, montantMaxAnnuel: 3000 },
        { nom: 'Lunettes et lentilles', couvert: true, montantMaxAnnuel: 300 },
        { nom: 'Fitness et abonnements wellness', couvert: true, pourcent: 75, montantMaxAnnuel: 300 },
        { nom: 'Prévention et check-ups', couvert: true, montantMaxAnnuel: 600 },
        { nom: 'Urgences médicales à l\'étranger', couvert: true, pourcent: 100 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 3000,
      pourcent: 75,
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 300,
      noteDetails: 'CHF 300/an adultes.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 300,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness : 75%/CHF 300/an (max CHF 500 total). Check-ups : CHF 600/an.',
    },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 52.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 57.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 61.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-complementaire-ambulatoire.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 75,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'axa-hospital-generale',
    assureurId: 'axa',
    nomProduit: 'Hospitalisation Commune',
    famille: 'hospitalier',
    description: 'Division commune AXA : jusqu\'à 4 lits, couverture internationale voyageurs incluse. Remise famille 5-10%.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Chambre commune (jusqu\'à 4 lits). Couverture internationale pour voyageurs incluse. Remise famille 5-10%.',
    },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 6.00,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 10.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 12.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-complementaire-hospitalisation.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 52,
  },

  {
    id: 'axa-hospital-demi-privee',
    assureurId: 'axa',
    nomProduit: 'Hospitalisation Demi-Privée',
    famille: 'hospitalier',
    description: 'Division demi-privée AXA : chambre à 2 lits, libre choix du spécialiste, hospitalisations planifiées à l\'étranger incluses. Remise famille 5-10%.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Chambre 2 lits. Libre choix du spécialiste. Hospitalisations planifiées à l\'étranger incluses. Frais d\'accompagnant inclus.',
    },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 61.20,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 139.70, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 179.10, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-complementaire-hospitalisation.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 55,
  },

  {
    id: 'axa-hospital-privee',
    assureurId: 'axa',
    nomProduit: 'Hospitalisation Privée',
    famille: 'hospitalier',
    description: 'Division privée AXA : chambre individuelle, libre choix du médecin-chef, urgences monde tous frais couverts. Remise famille 5-10%.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Chambre individuelle. Libre choix médecin-chef. Urgences médicales monde : tous frais couverts. Frais d\'accompagnant inclus.',
    },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 111.60, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 240.90, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 319.50, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-complementaire-hospitalisation.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 58,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'axa-dental-1000',
    assureurId: 'axa',
    nomProduit: 'Dentaire 1000',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée AXA : 50%/CHF 1\'000/an, hygiène 50%/CHF 200/an. Délai d\'attente 6 mois. Remise famille 5-10%.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 1000,
      orthodontie: false,
      implants: false,
      noteDetails: 'Soins et orthodontie : 50%/CHF 1\'000/an. Hygiène/blanchiment : 50%/CHF 200/an. Délai d\'attente 6 mois (levé si couverture antérieure équivalente). Souscription jusqu\'à 65 ans.',
    },
    delaiAttente: { mois: 6, detail: 'Délai levé si couverture dentaire équivalente antérieure.' },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)', 'Souscription possible jusqu\'à 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 34.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 56.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 63.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-dentaire.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 65,
  },

  {
    id: 'axa-dental-2000',
    assureurId: 'axa',
    nomProduit: 'Dentaire 2000',
    famille: 'dentaire',
    description: 'Assurance dentaire intermédiaire AXA : 75%/CHF 2\'000/an, hygiène 75%/CHF 300/an. Délai d\'attente 6 mois. Remise famille 5-10%.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 2000,
      orthodontie: false,
      implants: false,
      noteDetails: 'Soins et orthodontie : 75%/CHF 2\'000/an. Hygiène/blanchiment : 75%/CHF 300/an. Délai d\'attente 6 mois. Souscription jusqu\'à 65 ans.',
    },
    delaiAttente: { mois: 6, detail: 'Délai levé si couverture dentaire équivalente antérieure.' },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)', 'Souscription possible jusqu\'à 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 49.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 81.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 91.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-dentaire.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 68,
  },

  {
    id: 'axa-dental-3000',
    assureurId: 'axa',
    nomProduit: 'Dentaire 3000',
    famille: 'dentaire',
    description: 'Meilleure couverture dentaire AXA : 75%/CHF 3\'000/an, hygiène 75%/CHF 500/an. Délai d\'attente 6 mois. Remise famille 5-10%.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 3000,
      orthodontie: false,
      implants: false,
      noteDetails: 'Soins et orthodontie : 75%/CHF 3\'000/an. Hygiène/blanchiment : 75%/CHF 500/an. Délai d\'attente 6 mois. Souscription jusqu\'à 65 ans.',
    },
    delaiAttente: { mois: 6, detail: 'Délai levé si couverture dentaire équivalente antérieure.' },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)', 'Souscription possible jusqu\'à 65 ans'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 60.00,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 100.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 112.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-dentaire.html',
    dateMAJ: '2026-05-18',
    scoreComplet: 70,
  },

  {
    id: 'axa-dental-enfants',
    assureurId: 'axa',
    nomProduit: 'Dentaire Enfants',
    famille: 'dentaire',
    description: 'Assurance dentaire AXA pour enfants : orthodontie incluse. Recommandé avant 5 ans pour éviter les attestations médicales. Remise famille 5-10%.',
    dentaire: {
      couvert: true,
      orthodontie: true,
      implants: false,
      noteDetails: 'Dédié aux enfants. Orthodontie incluse. Souscription recommandée avant 5 ans (examen médical requis après). Tarifs observés (NPA 1000, garçon 8 ans, mai 2026) : Dentaire 1000 = CHF 19/mois, Dentaire 2000 = CHF 28/mois, Dentaire 3000 = CHF 35/mois.',
    },
    conditionsSouscription: ['Remise famille 5% (2 membres) / 10% (3+ membres)', 'Dédié aux enfants et adolescents', 'Souscription recommandée avant 5 ans'],
    tarifs: [],
    urlProduit: 'https://www.axa.ch/fr/particuliers/offres/sante-accidents/assurance-complementaire/assurance-dentaire.html',
    dateMAJ: '2026-05-15',
    scoreComplet: 55,
  },
]
