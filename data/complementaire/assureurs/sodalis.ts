import type { ProduitComplementaire } from '../types'

// Source : sodalis.ch — relevé mai 2026
// Note : sodalis est une caisse régionale (Suisse centrale)
// Transport urgence : couverture via Medicall (mondiale illimitée)

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'sodalis-sana',
    assureurId: 'sodalis',
    nomProduit: 'Sana',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'Couverture ambulatoire d\'entrée sodalis : médecines alternatives 70%/CHF 500, optique 50%/CHF 150 (3 ans), acupuncture 10 séances, fitness 50%/CHF 200, médicaments 50%, transport mondial illimité via Medicall.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 50 },
        { nom: 'Acupuncture', couvert: true, pourcent: 50, montantMaxSession: 30, sessionsMax: 10, noteDetails: 'CHF 30–60/séance, max 10 séances/an.' },
        { nom: 'Traitements dentaires (malpositions)', couvert: true, montantMaxAnnuel: 500 },
        { nom: 'Prévention enfants', couvert: true, pourcent: 100, montantMaxAnnuel: 500 },
        { nom: 'Transport & sauvetage urgence (monde)', couvert: true, noteDetails: 'Illimité via Medicall.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'naturopathie', 'osteopathie'],
      montantMaxAnnuel: 500,
      pourcent: 70,
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 150,
      noteDetails: '50%, max CHF 150 par période de 3 ans (adultes). Enfants : couverture annuelle.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: false,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness : 50%/CHF 200/an (en combinaison avec l\'assurance hospitalière sodalis).',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/sana-sana-plus',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'sodalis-sana-plus',
    assureurId: 'sodalis',
    nomProduit: 'Sana Plus',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'Couverture ambulatoire étendue sodalis : médecines alternatives 70%/CHF 1\'000, médicaments 100% (CHF 100\'000), optique 50%/CHF 400 (3 ans), dentaire CHF 1\'000, transport mondial illimité.',
    ambulatoire: {
      postes: [
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 100, montantMaxAnnuel: 100000 },
        { nom: 'Acupuncture', couvert: true, pourcent: 50, montantMaxSession: 60, sessionsMax: 10 },
        { nom: 'Traitements dentaires (malpositions)', couvert: true, montantMaxAnnuel: 1000 },
        { nom: 'Extractions (franchise 10%)', couvert: true },
        { nom: 'Prévention enfants', couvert: true, pourcent: 100, montantMaxAnnuel: 1000 },
        { nom: 'Transport & sauvetage urgence (monde)', couvert: true, noteDetails: 'Illimité via Medicall.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'naturopathie', 'osteopathie'],
      montantMaxAnnuel: 1000,
      pourcent: 70,
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      frequenceAns: 3,
      montantMaxAnnuel: 400,
      noteDetails: '50%, max CHF 400 par période de 3 ans (adultes).',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: false,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness : 50%/CHF 200/an (en combinaison avec l\'assurance hospitalière sodalis).',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/sana-sana-plus',
    dateMAJ: '2026-05-15',
    scoreComplet: 70,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'sodalis-hospital-generale',
    assureurId: 'sodalis',
    nomProduit: 'Hospitalisation Générale',
    famille: 'hospitalier',
    description: 'Division commune sodalis : urgences monde CHF 100\'000, transport illimité via Medicall, thérapies EMR 70%/CHF 600, rooming-in CHF 50/nuit (30 nuits), fitness 50%/CHF 200, naissance CHF 100. Enfants gratuits si parent assuré.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Urgences médicales internationales : max CHF 100\'000. Transport & sauvetage illimité via Medicall. Thérapies EMR : 70%/CHF 600/an. Rooming-in : CHF 50/nuit max 30 nuits. Fitness : 50%/CHF 200/an. Naissance : CHF 100. Enfants gratuits si un parent est assuré sodalis.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/spitalversicherung',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  {
    id: 'sodalis-hospital-demi-privee',
    assureurId: 'sodalis',
    nomProduit: 'Hospitalisation Demi-Privée',
    famille: 'hospitalier',
    description: 'Division semi-privée sodalis : chambre 2 lits, urgences monde CHF 200\'000, transport illimité, rooming-in, fitness. Franchise CHF 100/j max 30 jours/an.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Chambre 2 lits. Franchise : CHF 100/j max 30 jours/an. Urgences internationales : CHF 200\'000. Transport illimité via Medicall. Rooming-in : CHF 50/nuit max 30 nuits. Enfants gratuits si parent assuré.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/spitalversicherung',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'sodalis-hospital-privee',
    assureurId: 'sodalis',
    nomProduit: 'Hospitalisation Privée',
    famille: 'hospitalier',
    description: 'Division privée sodalis : chambre individuelle, libre choix médecin, urgences monde CHF 200\'000, transport illimité. Franchise CHF 200/j max 30 jours/an.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Chambre individuelle. Franchise : CHF 200/j max 30 jours/an. Urgences internationales : CHF 200\'000. Transport illimité via Medicall. Enfants gratuits si parent assuré.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/spitalversicherung',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'sodalis-hospital-flex',
    assureurId: 'sodalis',
    nomProduit: 'Hospitalisation Flex',
    famille: 'hospitalier',
    description: 'Division flexible sodalis : choix de la division à chaque séjour (commune, semi-privée ou privée). Transport illimité via Medicall. Enfants gratuits si parent assuré.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Division choisie au moment de l\'admission. Combine les avantages des 3 variantes avec suppléments journaliers selon division. Transport & sauvetage illimité Medicall. Enfants gratuits si parent assuré.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/spitalversicherung',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'sodalis-denta-1',
    assureurId: 'sodalis',
    nomProduit: 'Denta Classe 1',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée sodalis : 75%/CHF 500/an. Enfants 0-3 ans gratuits, 3-6 ans 50% remise sans examen.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 500,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements, laboratoire, prophylaxie (tarif SSO). Enfants 0-3 ans : gratuits. Enfants 3-6 ans : 50% remise, sans bilan dentaire requis.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/denta',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  {
    id: 'sodalis-denta-2',
    assureurId: 'sodalis',
    nomProduit: 'Denta Classe 2',
    famille: 'dentaire',
    description: 'Couverture dentaire intermédiaire sodalis : 75%/CHF 1\'000/an. Enfants 0-3 ans gratuits.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 1000,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements, laboratoire, prophylaxie. Enfants 0-3 ans : gratuits. Enfants 3-6 ans : 50% remise.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/denta',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'sodalis-denta-3',
    assureurId: 'sodalis',
    nomProduit: 'Denta Classe 3',
    famille: 'dentaire',
    description: 'Bonne couverture dentaire sodalis : 75%/CHF 1\'500/an. Enfants 0-3 ans gratuits.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 1500,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements, laboratoire, prophylaxie. Enfants 0-3 ans : gratuits. Enfants 3-6 ans : 50% remise.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/denta',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'sodalis-denta-4',
    assureurId: 'sodalis',
    nomProduit: 'Denta Classe 4',
    famille: 'dentaire',
    description: 'La couverture dentaire maximale sodalis : 75%/CHF 3\'000/an. Orthodontie incluse. Enfants 0-3 ans gratuits.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 3000,
      orthodontie: true,
      implants: false,
      noteDetails: 'Traitements, laboratoire, prophylaxie, orthodontie. Enfants 0-3 ans : gratuits. Enfants 3-6 ans : 50% remise.',
    },
    tarifs: [],
    urlProduit: 'https://www.sodalis.ch/de/fuer-private/versicherungen/zusatzversicherung/denta',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },
]
