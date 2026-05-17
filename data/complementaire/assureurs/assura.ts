import type { ProduitComplementaire } from '../types'

// Source : assura.ch — relevé mai 2026
// Tarifs : prix de départ indiqués sur le site (profil non spécifié par Assura)

export const produits: ProduitComplementaire[] = [

  // ─── HOSPITALIER ────────────────────────────────────────────────────────────

  {
    id: 'assura-optima-flex-varia',
    assureurId: 'assura',
    nomProduit: 'Optima Flex Varia',
    famille: 'hospitalier',
    description: 'Assurance hospitalisation flexible : vous choisissez votre division (générale, semi-privée ou privée) à chaque hospitalisation, avec une participation aux frais selon le choix.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Générale : bonus CHF 250/jour (max CHF 3\'750/an). Semi-privée : coparticipation CHF 100/jour (max 15 jours = CHF 1\'500). Privée : coparticipation CHF 300/jour (max 15 jours = CHF 4\'500). Souscription jusqu\'à 75 ans.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 23.30, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  {
    id: 'assura-optima-varia',
    assureurId: 'assura',
    nomProduit: 'Optima Varia',
    famille: 'hospitalier',
    description: 'Couverture hospitalisation en division semi-privée (chambre à 2 lits) dans les hôpitaux agréés.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Pas de coparticipation pour la division choisie. Liste d\'hôpitaux agréés Assura. Souscription jusqu\'à 75 ans.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 39, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  {
    id: 'assura-optima-plus-varia',
    assureurId: 'assura',
    nomProduit: 'Optima Plus Varia',
    famille: 'hospitalier',
    description: 'Couverture hospitalisation en chambre privée (1 lit) dans les hôpitaux agréés.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: false,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Pas de coparticipation pour la division choisie. Liste d\'hôpitaux agréés Assura. Souscription jusqu\'à 75 ans.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 49, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  {
    id: 'assura-ultra-varia',
    assureurId: 'assura',
    nomProduit: 'Ultra Varia',
    famille: 'hospitalier',
    description: 'Assurance hospitalisation haut de gamme : chambre privée avec libre choix du médecin et de l\'hôpital dans toute la Suisse.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Libre choix complet sauf hôpitaux explicitement exclus. Souscription jusqu\'à 75 ans.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 85, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/assurance-hospitalisation',
    dateMAJ: '2026-05-15',
    scoreComplet: 75,
  },

  // ─── AMBULATOIRE / COMPLÉMENT ────────────────────────────────────────────────

  {
    id: 'assura-complementa-extra',
    assureurId: 'assura',
    nomProduit: 'Complementa Extra',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'dentaire'],
    description: 'Complément à l\'assurance de base couvrant de nombreuses lacunes : optique, transport, soins à domicile, aide ménagère et une contribution dentaire.',
    ambulatoire: {
      postes: [
        { nom: 'Transport & sauvetage (Suisse)', couvert: true, montantMaxAnnuel: undefined, noteDetails: 'Transport illimité en Suisse. Sauvetage : CHF 20\'000 par cas.' },
        { nom: 'Soins à domicile', couvert: true, montantMaxSession: 200, sessionsMax: 21, noteDetails: 'CHF 200/jour, max 21 jours/an (pour éviter hospitalisation).' },
        { nom: 'Aide ménagère', couvert: true, montantMaxSession: 50, sessionsMax: 30, noteDetails: 'CHF 50/jour, max 30 jours/an.' },
        { nom: 'Garde d\'enfants', couvert: true, montantMaxSession: 70, sessionsMax: 21, noteDetails: 'CHF 70/jour, max 21 jours/an lors d\'une hospitalisation du parent.' },
        { nom: 'Convalescence', couvert: true, montantMaxSession: 40, sessionsMax: 21, noteDetails: 'CHF 40/jour, max 21 jours/an en établissement de convalescence.' },
        { nom: 'Médicaments vitaux sans équivalent', couvert: true, noteDetails: 'CHF 50\'000 sur la vie entière pour médicaments Swissmedic sans équivalent générique.' },
      ],
    },
    optique: {
      couvert: true,
      montantMaxAnnuel: 100,
      frequenceAns: 1,
      lunettes: true,
      lentilles: true,
      noteDetails: 'CHF 100/an, cumulable sur 5 ans (max CHF 500) pour lunettes ou chirurgie corrective.',
    },
    dentaire: {
      couvert: true,
      pourcentSoins: undefined,
      montantMaxSoins: 1000,
      orthodontie: false,
      implants: false,
      noteDetails: 'CHF 1\'000/an après franchise CHF 500. Soins courants uniquement.',
    },
    tarifs: [],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/complement-assurance-de-base',
    dateMAJ: '2026-05-15',
    scoreComplet: 80,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'assura-denta-sana',
    assureurId: 'assura',
    nomProduit: 'Denta Sana',
    famille: 'dentaire',
    description: 'Assurance dentaire pour les soins courants : remboursement à 75% des frais de soins, couronnes, bridges et implants, jusqu\'à CHF 6\'000 par an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 6000,
      orthodontie: false,
      implants: true,
      noteDetails: 'Prévention (détartrage, contrôle) : 100% jusqu\'à CHF 80/an sans délai d\'attente. Soins : délai d\'attente 6 mois. Traitement possible dans pays limitrophes (DE, AT, IT, LI, FR) aux tarifs suisses. Souscription jusqu\'à 99 ans.',
    },
    delaiAttente: { mois: 6, detail: 'Pas de délai pour les soins préventifs (détartrage, contrôle).' },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 18, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/soins-dentaires',
    dateMAJ: '2026-05-15',
    scoreComplet: 85,
  },

  {
    id: 'assura-denta-ortho',
    assureurId: 'assura',
    nomProduit: 'Denta Ortho',
    famille: 'dentaire',
    description: 'Assurance orthodontie avec choix du plafond annuel (CHF 2\'000, 6\'000 ou 10\'000). 75% des frais remboursés.',
    dentaire: {
      couvert: true,
      pourcentOrthodontie: 75,
      montantMaxOrthodontie: 10000,
      orthodontie: true,
      implants: false,
      noteDetails: 'Choix du plafond annuel : CHF 2\'000, CHF 6\'000 ou CHF 10\'000. Enfants < 5 ans : pas d\'examen dentaire préalable requis. Réduction 15% si souscrit avant la naissance. Délai d\'attente 12 mois. Traitements dans pays limitrophes acceptés.',
    },
    delaiAttente: { mois: 12 },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 23.50, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/soins-dentaires',
    dateMAJ: '2026-05-15',
    scoreComplet: 85,
  },

  // ─── MÉDECINES DOUCES ────────────────────────────────────────────────────────

  {
    id: 'assura-natura',
    assureurId: 'assura',
    nomProduit: 'Natura',
    famille: 'medecines-douces',
    description: 'Large couverture pour 24 thérapies alternatives (acupuncture, ostéopathie, homéopathie, drainage lymphatique…) chez des thérapeutes reconnus.',
    medecinesDouces: {
      listesReconnues: ['ASCA'],
      therapiesCouvertes: [
        'acupuncture', 'osteopathie', 'homeopathie',
        'medecine-traditionnelle-chinoise', 'reflexologie',
        'shiatsu', 'phytotherapie', 'naturopathie',
      ],
      montantMaxAnnuel: 800,
      noteDetails: '24 thérapies couvertes au total. CHF 800/an pour médicaments/examens de laboratoire. 12 séances/an (extensible sur demande). Franchise CHF 200, coparticipation 10%. Remboursement CHF 50–130 première consultation, CHF 50–110 suites. Souscription jusqu\'à 60 ans.',
    },
    delaiAttente: { mois: 0 },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 14, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/medecine-alternative',
    dateMAJ: '2026-05-15',
    scoreComplet: 82,
  },

  {
    id: 'assura-medna',
    assureurId: 'assura',
    nomProduit: 'Medna',
    famille: 'medecines-douces',
    description: 'Couverture des médecines alternatives prescrites par un médecin (acupuncture, homéopathie, hypnose médicale…) avec remboursement des médicaments Swissmedic.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: [
        'acupuncture', 'homeopathie', 'hypnose',
        'phytotherapie', 'naturopathie',
      ],
      montantMaxAnnuel: 2000,
      pourcent: 80,
      noteDetails: '11 thérapies médicales couvertes. CHF 80/séance (illimité). Médicaments Swissmedic : CHF 2\'000/an remboursés à 80% après franchise CHF 200. Prescriptions médicales requises. Souscription jusqu\'à 99 ans. Réduction CHF 2.25/mois si combiné avec Natura.',
    },
    delaiAttente: { mois: 0 },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 4, source: 'site-web', dateReleve: '2026-05-15' },
    ],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/medecine-alternative',
    dateMAJ: '2026-05-15',
    scoreComplet: 80,
  },

  // ─── MATERNITÉ ───────────────────────────────────────────────────────────────

  {
    id: 'assura-materna-varia',
    assureurId: 'assura',
    nomProduit: 'Materna Varia',
    famille: 'maternite',
    description: 'Couverture complète pendant la grossesse et le postnatal : échographies supplémentaires, cours d\'accouchement, NIPT, rééducation post-partum et chambre privée à l\'hôpital.',
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: true,
      montantMaxAnnuel: 2000,
      bebe: false,
      noteDetails: 'Remboursement à 75%, max CHF 2\'000 toutes prestations. Bonus CHF 1\'500 pour accouchement à domicile ou ambulatoire. Chambre privée dans établissements agréés. Inclut : échographies supplémentaires, NIPT, cours préparation, transport d\'urgence maternité, gymnast. postnatale, prime allaitement CHF 200. Souscription uniquement via conseiller. Délai d\'attente 12 mois. Couverture cesse à 50 ans.',
    },
    delaiAttente: { mois: 12 },
    conditionsSouscription: ['Souscription uniquement via conseiller Assura (non disponible en ligne)', 'Couverture cesse à la fin de l\'année des 50 ans'],
    tarifs: [],
    urlProduit: 'https://www.assura.ch/fr/assurances/assurances-complementaires/assurance-maternite',
    dateMAJ: '2026-05-15',
    scoreComplet: 78,
  },
]
