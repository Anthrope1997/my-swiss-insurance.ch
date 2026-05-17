import type { ProduitComplementaire } from '../types'

// Source : visana.ch — relevé mai 2026
// Note : l'assurance Vacanza (voyage 8 semaines) est incluse dans Traitements ambulatoires et Hospitalisation
// Niveaux I/II/III disponibles selon la profondeur de couverture souhaitée

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'visana-ambulatoire',
    assureurId: 'visana',
    nomProduit: 'Traitements ambulatoires',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'prevention', 'maternite'],
    description: 'Couverture ambulatoire Visana : lunettes, corrections dentaires, fitness/wellness CHF 350, maternité, examens préventifs. Assurance voyage Vacanza (8 semaines) incluse. Disponible en niveaux I, II, III.',
    ambulatoire: {
      postes: [
        { nom: 'Corrections dentaires (orthodontie partielle)', couvert: true },
        { nom: 'Lunettes et lentilles de contact', couvert: true },
        { nom: 'Fitness et cours de santé', couvert: true, montantMaxAnnuel: 350 },
        { nom: 'Contrôles maternité', couvert: true },
        { nom: 'Examens préventifs', couvert: true },
        { nom: 'Assurance voyage Vacanza (urgences étranger, 8 sem.)', couvert: true },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      noteDetails: 'Contribution lunettes et lentilles incluse. Montant précis à confirmer selon niveau choisi.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 350,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Wellness/fitness : CHF 350/an. Examens préventifs inclus.',
    },
    maternite: {
      couvert: true,
      preparationAccouchement: true,
      sageFemme: false,
      bebe: false,
      noteDetails: 'Contrôles maternité et cours inclus.',
    },
    tarifs: [],
    urlProduit: 'https://www.visana.ch/fr/clientele-privee/assurances/maladie-et-accidents/assurances-complementaires/en-bref',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  // ─── MÉDECINES DOUCES ────────────────────────────────────────────────────────

  {
    id: 'visana-medecine-complementaire',
    assureurId: 'visana',
    nomProduit: 'Médecine complémentaire',
    famille: 'medecines-douces',
    description: 'Couverture des médecines alternatives Visana jusqu\'à CHF 10\'000/an. 3 niveaux : niveau I avec prescription, niveaux II/III sans prescription. Zone Suisse + frontalières (100 km).',
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'ayurveda', 'medecine-traditionnelle-chinoise', 'osteopathie', 'homeopathie', 'shiatsu'],
      montantMaxAnnuel: 10000,
      noteDetails: 'Niveaux I, II, III. Niveau I : prescription médicale requise, thérapeutes reconnus. Niveaux II/III : sans prescription. Niveau III : sans exigence de reconnaissance du thérapeute. Aussi : kinésiologie. Zone Suisse + 100 km transfrontalier.',
    },
    tarifs: [],
    urlProduit: 'https://www.visana.ch/fr/clientele-privee/assurances/maladie-et-accidents/assurances-complementaires/medecine-complementaire',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'visana-hospital',
    assureurId: 'visana',
    nomProduit: 'Assurance d\'hospitalisation',
    famille: 'hospitalier',
    description: 'Hospitalisation Visana : libre choix de tous les hôpitaux Suisse reconnus, traitement par médecin-chef, chambre à 1 ou 2 lits. Options commune, semi-privée, privée. Vacanza (voyage 8 semaines ou 11 mois privé mondial) incluse.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Libre accès tous hôpitaux Suisse reconnus. Traitement par médecin-chef. Chambre 1 lit (privée) ou 2 lits (demi-privée) selon variante. Assurance voyage Vacanza incluse : 8 semaines ou 11 mois (privée mondiale). Remise 20% prime N+1 si aucun sinistre.',
    },
    tarifs: [],
    urlProduit: 'https://www.visana.ch/fr/clientele-privee/assurances/maladie-et-accidents/assurances-complementaires/en-bref',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'visana-dental',
    assureurId: 'visana',
    nomProduit: 'Assurance soins dentaires',
    famille: 'dentaire',
    description: 'Dentaire Visana : 8 niveaux de couverture, 50-75% des frais, CHF 600 à CHF 5\'000/an. Orthodontie incluse. Enfants assurés avant 4 ans sans examen de santé.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 5000,
      orthodontie: true,
      implants: false,
      noteDetails: '8 niveaux disponibles : de 50%/CHF 600 à 75%/CHF 5\'000/an. Orthodontie (appareils amovibles et fixes, corrections malpositions). Enfants assurés avant 4 ans : sans examen de santé. Adultes : denture assainie requise, aucun traitement prévu. Exclusions : traitements esthétiques, accidents.',
    },
    tarifs: [],
    urlProduit: 'https://www.visana.ch/fr/clientele-privee/assurances/maladie-et-accidents/assurances-complementaires/assurance-soins-dentaires',
    dateMAJ: '2026-05-15',
    scoreComplet: 72,
  },

  // ─── PAQUET ───────────────────────────────────────────────────────────────────

  {
    id: 'visana-basic',
    assureurId: 'visana',
    nomProduit: 'Paquet Basic',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'hospitalier', 'optique', 'prevention', 'voyage'],
    description: 'Paquet combiné Visana : Traitements ambulatoires II + Médecine complémentaire II + Hospitalisation + Vacanza voyage. Wellness CHF 350/an. Remise 20% sans sinistre. Remise 2-3% contrat 3-5 ans. 2ème enfant et + : -50%. Âge 19-65 ans.',
    ambulatoire: {
      postes: [
        { nom: 'Traitements ambulatoires (lunettes, corrections dentaires, maternité)', couvert: true },
        { nom: 'Médecine complémentaire II (sans prescription)', couvert: true, montantMaxAnnuel: 10000 },
        { nom: 'Wellness/fitness', couvert: true, montantMaxAnnuel: 350 },
        { nom: 'Assurance voyage Vacanza (urgences étranger)', couvert: true },
      ],
    },
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Hospitalisation incluse dans le paquet. Variante privée mondiale : Vacanza 11 mois.',
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'osteopathie', 'homeopathie', 'shiatsu', 'medecine-traditionnelle-chinoise'],
      montantMaxAnnuel: 10000,
      noteDetails: 'Médecine complémentaire II : sans prescription médicale requise.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 350,
      bilanSante: true,
      vaccinationVoyage: false,
      coachingSante: false,
    },
    conditionsSouscription: ['Âge 19-65 ans', '2ème enfant et + : prime réduite de 50% jusqu\'à 18 ans', 'Remise 20% prime N+1 sans sinistre', 'Remise 2-3% contrat 3-5 ans'],
    tarifs: [],
    urlProduit: 'https://www.visana.ch/fr/clientele-privee/assurances/maladie-et-accidents/assurances-complementaires/assurances-complementaires-combinees',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },
]
