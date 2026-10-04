import type { ProduitComplementaire } from '../types'

// Source : atupri.ch — relevé mai 2026
// Gamme actuelle : Intense, Basic, Comforta (4 variantes), Denta (2 niveaux)
// Note : prime Intense et Basic constante dès 30 ans ; âge max 70 ans

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'atupri-intense',
    assureurId: 'atupri',
    nomProduit: 'Intense',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention', 'maternite'],
    description: 'Le produit phare Atupri : hospitalisation commune 100%, médecines alternatives 50%/CHF 3\'000, optique CHF 350, fitness 75%/CHF 500, examens préventifs 75%/CHF 500. Prime constante dès 30 ans.',
    ambulatoire: {
      postes: [
        { nom: 'Hospitalisation division commune (Suisse + urgences étranger)', couvert: true, pourcent: 100, noteDetails: 'Sans plafond.' },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 100 },
        { nom: 'Vaccins non remboursés LAMal', couvert: true, pourcent: 100 },
        { nom: 'Transport & sauvetage urgence (Suisse + étranger)', couvert: true, pourcent: 100 },
        { nom: 'Soins médicaux à l\'étranger', couvert: true, pourcent: 100 },
        { nom: 'Protection juridique patient', couvert: true, pourcent: 100 },
        { nom: 'Thérapies & rééducation (analyse du sommeil, psychothérapie, cures)', couvert: true, pourcent: 75, montantMaxAnnuel: 2000 },
        { nom: 'Contraception & maternité (cours, soins post-nataux)', couvert: true, pourcent: 75, montantMaxAnnuel: 1000 },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['osteopathie', 'ayurveda'],
      montantMaxAnnuel: 3000,
      pourcent: 50,
      noteDetails: 'Ostéopathie, Ayurveda, thérapie cranio-sacrée et autres méthodes reconnues.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 350,
      noteDetails: '75%, max CHF 350/an. Correction laser : jusqu\'à CHF 1\'500.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 500,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Fitness (abonnement salle, yoga, Pilates, associations sportives) : 75%/CHF 500/an. Examens préventifs (gynécologie, analyses, dermatologie, diabète) : 75%/CHF 500/an.',
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: false,
      bebe: false,
      montantMaxAnnuel: 1000,
      noteDetails: 'Cours de maternité et soins post-nataux : 75%/CHF 1\'000. Stérilisation et contraception incluses.',
    },
    conditionsSouscription: ['Âge maximum 70 ans', 'Prime constante dès 30 ans', 'Contrat minimum 1 an, résiliable mensuellement avec préavis 3 mois', 'Souscription possible sans LAMal Atupri'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 48.00, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 73.00, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 64.00, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://atupri.ch/fr/assurances/assurances-complementaires/intense',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },

  {
    id: 'atupri-basic',
    assureurId: 'atupri',
    nomProduit: 'Basic',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'prevention', 'maternite'],
    description: 'Couverture ambulatoire essentielle Atupri : hospitalisation commune 100%, urgences monde 100%, fitness 75%/CHF 200, gynécologie CHF 200. Prime constante dès 30 ans.',
    ambulatoire: {
      postes: [
        { nom: 'Hospitalisation division commune (Suisse + urgences étranger)', couvert: true, pourcent: 100 },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 90 },
        { nom: 'Vaccins non remboursés LAMal', couvert: true, pourcent: 90 },
        { nom: 'Transport & sauvetage urgence (Suisse + étranger)', couvert: true, pourcent: 100, montantMaxAnnuel: 20000 },
        { nom: 'Soins médicaux à l\'étranger', couvert: true, pourcent: 100 },
        { nom: 'Rapatriement', couvert: true, montantMaxAnnuel: 20000 },
        { nom: 'Frais de séjour/modification voyage en cas de maladie', couvert: true, montantMaxAnnuel: 5000 },
        { nom: 'Gynécologie (contrôles)', couvert: true, pourcent: 100, montantMaxAnnuel: 200 },
        { nom: 'Maternité', couvert: true, pourcent: 60, montantMaxAnnuel: 1000 },
      ],
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: false,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Fitness (abonnement salle, yoga, Pilates, associations sportives, courses) : 75%/CHF 200/an.',
    },
    conditionsSouscription: ['Âge maximum 70 ans', 'Prime constante dès 30 ans', 'Souscription possible sans LAMal Atupri', 'Combinable avec Comforta et Denta'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 14.20, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 16.80, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 16.80, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://atupri.ch/fr/assurances/assurances-complementaires/basic',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  // ─── HOSPITALIER (Comforta) ───────────────────────────────────────────────────

  {
    id: 'atupri-comforta',
    assureurId: 'atupri',
    nomProduit: 'Comforta',
    famille: 'hospitalier',
    description: 'Assurance hospitalisation Atupri : 4 variantes du libre choix médecin à la chambre privée. Libre choix hôpital et médecin dans toute la Suisse. Remise 5% avec certains modèles LAMal Atupri.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: '4 variantes : du libre choix de médecin à la chambre individuelle (1 lit). Variantes Opti 1 et Opti 2 : choix demi-privée ou privée à chaque séjour. Remise 5% combiné avec SmartCare, TelFirst, CareMed, FlexCare ou HMO Atupri.',
    },
    conditionsSouscription: ['Recommandé en combinaison avec Intense ou Basic', 'Remise 5% avec modèles LAMal Atupri sélectionnés'],
    tarifs: [
      // Prix variante Com-HP (demi-privée fixe), avec couverture accident incluse
      { profilId: 'jeune-adulte', montantCHF: 42.40,  source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 100.50, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 127.90, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://atupri.ch/fr/assurances/assurances-complementaires/comforta',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'atupri-denta',
    assureurId: 'atupri',
    nomProduit: 'Denta',
    famille: 'dentaire',
    description: 'Assurance dentaire Atupri : 2 niveaux, 60-80% des frais. Orthodontie jusqu\'à 30 ans. Nécessite un produit ambulatoire Atupri (Intense, Basic ou Mivita Reala). Âge minimum 26 ans.',
    dentaire: {
      couvert: true,
      pourcentSoins: 80,
      orthodontie: true,
      implants: false,
      noteDetails: '2 niveaux de prestations : 60% (niveau 1) ou 80% (niveau 2). Traitements couverts : nettoyages, obturations, parodontologie, prothèses, dents de sagesse. Orthodontie (appareils, aligners) jusqu\'à 30 ans. Exclusions : blanchiment, esthétique pure.',
    },
    conditionsSouscription: ['Âge minimum 26 ans', 'Souscription conditionnée à Intense, Basic ou Mivita Reala Atupri'],
    tarifs: [
      // Prix Denta Stufe 1 (niveau 1 = 60% des frais)
      { profilId: 'jeune-adulte', montantCHF: 17.70, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'famille',      montantCHF: 17.70, source: 'site-web', dateReleve: '2026-05-17' },
      { profilId: 'senior',       montantCHF: 22.90, source: 'site-web', dateReleve: '2026-05-17' },
    ],
    urlProduit: 'https://atupri.ch/fr/assurances/assurances-complementaires/denta',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },
]
