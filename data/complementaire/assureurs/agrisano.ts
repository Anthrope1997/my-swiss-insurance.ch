import type { ProduitComplementaire } from '../types'

// Source : agrisano.ch + flyer PDF AGRI-spézial — relevé mai 2026
// Note : AGRI-spézial est EXCLUSIVEMENT réservé à la population agricole (agriculteurs et familles rurales)
// Les autres produits sont ouverts à tous.

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'agrisano-agri-spezial',
    assureurId: 'agrisano',
    nomProduit: 'AGRI-spézial',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'prevention', 'maternite'],
    description: 'Complément LAMal Agrisano réservé à la population agricole : médicaments 50%, psychothérapie 20 séances/CHF 50, prévention 90%/CHF 500, maternité gym 50%/CHF 500, transport 50%/CHF 500, sauvetage 50%/CHF 5\'000, cure CHF 45/j (30j), médecines EMR 90%/CHF 120h/CHF 2\'000, orthodontie <20 ans 50% illimité.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 50 },
        { nom: 'Psychothérapie (thérapeutes reconnus Agrisano)', couvert: true, pourcent: 100, montantMaxSession: 50, sessionsMax: 20, noteDetails: 'Max 20 séances/an, CHF 50/séance.' },
        { nom: 'Prévention (vaccins, check-ups non-LAMal)', couvert: true, pourcent: 90, montantMaxAnnuel: 500 },
        { nom: 'Dos et nutrition (sur prescription médicale)', couvert: true, pourcent: 50, montantMaxAnnuel: 500, noteDetails: 'Inclus gym grossesse/rétablissement. Partagé avec maternité.' },
        { nom: 'Lunettes et lentilles de contact', couvert: true, montantMaxAnnuel: 200, noteDetails: 'CHF 200 max / 720 jours.' },
        { nom: 'Équipements médicaux complémentaires', couvert: true, pourcent: 90, montantMaxAnnuel: 5000 },
        { nom: 'Transport de malades', couvert: true, pourcent: 50, montantMaxAnnuel: 500 },
        { nom: 'Sauvetage', couvert: true, pourcent: 50, montantMaxAnnuel: 5000 },
        { nom: 'Transport & sauvetage urgence (global)', couvert: true, pourcent: 90, montantMaxAnnuel: 20000 },
        { nom: 'Aide ménagère (incapacité totale de travail)', couvert: true, montantMaxAnnuel: 800, noteDetails: 'Max CHF 80/j, max CHF 800/an. Ordonnance médicale requise. Via organisations reconnues.' },
        { nom: 'Urgences étranger (complément KVG)', couvert: true, noteDetails: 'Max 2x le tarif Suisse. Hospitalisation urgente : max CHF 50\'000, CHF 1\'000/j.' },
        { nom: 'Extraction dentaire (tarif SSO)', couvert: true, pourcent: 50, montantMaxAnnuel: 500 },
        { nom: 'Orthodontie / chirurgie bucco-maxillaire (<20 ans)', couvert: true, pourcent: 50, noteDetails: 'Illimité. Traitement doit commencer avant 18 ans.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'naturopathie', 'shiatsu'],
      montantMaxAnnuel: 2000,
      pourcent: 90,
      noteDetails: 'Thérapeutes EMR (Erfahrungs-Medizinisches Register) ou kantonal reconnus. 90%, max CHF 120/h, max CHF 2\'000/an.',
    },
    prevention: {
      fitness: false,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Prévention (vaccins, check-ups non-LAMal) : 90%/CHF 500/an. Dos/nutrition sur prescription : 50%/CHF 500/an (partagé avec maternité).',
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: false,
      bebe: false,
      noteDetails: 'Cours gym grossesse et rétablissement : 50%, max CHF 500/an (partagé avec prévention dos/nutrition).',
    },
    conditionsSouscription: ['EXCLUSIVEMENT pour la population agricole (agriculteurs, familles rurales et employés agricoles)'],
    tarifs: [],
    urlProduit: 'https://www.agrisano.ch/de/angebot/zusatzversicherungen/agri-spezial',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },

  // ─── MÉDECINES DOUCES ────────────────────────────────────────────────────────

  {
    id: 'agrisano-agri-natuerlich',
    assureurId: 'agrisano',
    nomProduit: 'AGRI-naturel',
    famille: 'medecines-douces',
    description: 'Médecines alternatives Agrisano : thérapies reconnues EMR (Shiatsu, fleurs de Bach, etc.), 90% des frais médicaux (CHF 120/h max), remèdes 50%. Plafond CHF 5\'000/an.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['shiatsu', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 5000,
      pourcent: 90,
      noteDetails: 'Thérapies reconnues EMR : Shiatsu, fleurs de Bach, et autres. Traitements 90% max CHF 120/h. Remèdes thérapeutiques 50%. Le plafond CHF 5\'000 est réduit des prestations AGRI-spézial obtenues dans l\'année.',
    },
    tarifs: [],
    urlProduit: 'https://www.agrisano.ch/de/angebot/zusatzversicherungen/agri-natuerlich',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'agrisano-hospital-flex',
    assureurId: 'agrisano',
    nomProduit: 'Hospital Flex',
    famille: 'hospitalier',
    description: 'Hospitalisation flexible Agrisano : choix libre de la division (commune, semi-privée ou privée) à chaque séjour. Disponible en 2 variantes (Flex 1 et Flex 2). Libre choix du médecin.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Division choisie à chaque hospitalisation. Hôpitaux de la liste LAMal et Helsana. 2 variantes : Hospital Flex 1 et Flex 2. Allocation accouchement ambulatoire incluse (délai 365 jours). Rooming-in et aide ménagère inclus.',
    },
    delaiAttente: { mois: 12, detail: 'Délai 365 jours pour l\'allocation accouchement ambulatoire.' },
    tarifs: [],
    urlProduit: 'https://www.agrisano.ch/de/angebot/zusatzversicherungen/hospital-flex',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  {
    id: 'agrisano-spitalzusatz',
    assureurId: 'agrisano',
    nomProduit: 'Complément hospitalier',
    famille: 'hospitalier',
    // Produit Sanitas distribué sous étiquette Agrisano (partenariat confirmé agrisano.ch)
    description: 'Hospitalisation complémentaire Agrisano (produit Sanitas) : division commune, semi-privée ou privée, libre choix du médecin. Réservé aux membres Agrisano (population agricole).',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Produit développé en partenariat avec Sanitas. Division choisie : commune, demi-privée ou privée. Libre choix du médecin et de l\'hôpital. Montants et conditions selon contrat Sanitas sous-jacent. Destiné en priorité à la population agricole.',
    },
    conditionsSouscription: ['Destiné principalement à la population agricole (membres Agrisano)'],
    tarifs: [],
    urlProduit: 'https://www.agrisano.ch/de/angebot/zusatzversicherungen/spitalzusatz',
    dateMAJ: '2026-05-15',
    scoreComplet: 48,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'agrisano-dental',
    assureurId: 'agrisano',
    nomProduit: 'AGRI-dental',
    famille: 'dentaire',
    description: 'Assurance dentaire Agrisano : 50% des frais dentaires non couverts (prévention, orthodontie, traitements conservateurs). Montant maximum annuel à confirmer sur agrisano.ch.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      orthodontie: true,
      implants: false,
      noteDetails: 'Couvre : prévention (hygiène), orthodontie, obturations, couronnes, bridges. Calculé sur les tarifs KVG.',
    },
    tarifs: [],
    urlProduit: 'https://www.agrisano.ch/de/angebot/zusatzversicherungen/agri-dental',
    dateMAJ: '2026-05-15',
    scoreComplet: 52,
  },
]
