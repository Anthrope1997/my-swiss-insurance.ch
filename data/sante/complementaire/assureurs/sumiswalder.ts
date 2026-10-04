import type { ProduitComplementaire } from '../types'

// Source : sumiswalder.ch — relevé mai 2026
// Note : Sumiswalder est une petite caisse régionale (Émmental, BE)
// 130+ thérapies reconnues pour la gamme Komplementär

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'sumiswalder-krankenpflege',
    assureurId: 'sumiswalder',
    nomProduit: 'Krankenpflege-Zusatz',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'optique', 'prevention', 'maternite'],
    description: 'Couverture ambulatoire de base Sumiswalder : lunettes CHF 200/an, médicaments 50%, vaccins 90% (<15 ans) / 50% (≥16 ans), gynéco préventive 90%, dentaire de base 50%/CHF 500/an, allaitement CHF 100.',
    ambulatoire: {
      postes: [
        { nom: 'Lunettes et lentilles de contact', couvert: true, montantMaxAnnuel: 200 },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 50, noteDetails: 'Médicaments enregistrés Swissmedic non-LAMal.' },
        { nom: 'Vaccins (< 15 ans)', couvert: true, pourcent: 90 },
        { nom: 'Vaccins (≥ 16 ans)', couvert: true, pourcent: 50 },
        { nom: 'Gynécologie préventive', couvert: true, pourcent: 90 },
        { nom: 'Traitements dentaires de base', couvert: true, pourcent: 50, montantMaxAnnuel: 500, noteDetails: 'Détartrage, extractions, chirurgie, parodontologie. Max CHF 500/an.' },
        { nom: 'Correction malpositions dentaires (<20 ans)', couvert: true, pourcent: 20 },
        { nom: 'Maternité : allocation allaitement', couvert: true, montantMaxAnnuel: 100, noteDetails: 'CHF 100 forfait allaitement. Echographies non médicalement justifiées : 50%.' },
      ],
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 200,
      noteDetails: 'CHF 200/an.',
    },
    maternite: {
      couvert: true,
      preparationAccouchement: false,
      sageFemme: false,
      bebe: false,
      noteDetails: 'Allocation allaitement CHF 100. Contrôles obstétriques supplémentaires couverts.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 8.40,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 10.10, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 14.40, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/krankenpflege-zusatz/',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  // ─── MÉDECINES DOUCES (gamme Komplementär) ───────────────────────────────────

  {
    id: 'sumiswalder-komplementaer-1',
    assureurId: 'sumiswalder',
    nomProduit: 'Komplementär 1',
    famille: 'medecines-douces',
    description: 'Couverture médecines alternatives d\'entrée Sumiswalder : 90% traitements par médecins, thérapeutes reconnus CHF 80/h, plafond CHF 2\'000/an. Plus de 130 thérapies reconnues.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 2000,
      pourcent: 90,
      noteDetails: '130+ thérapies reconnues. Traitements par médecins : 90%. Thérapeutes reconnus (EMR) : CHF 80/h max. Plafond global CHF 2\'000/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 21.20, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 24.10, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 32.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/komplementaer/',
    dateMAJ: '2026-05-15',
    scoreComplet: 60,
  },

  {
    id: 'sumiswalder-komplementaer-2',
    assureurId: 'sumiswalder',
    nomProduit: 'Komplementär 2',
    famille: 'medecines-douces',
    familles: ['medecines-douces', 'prevention'],
    description: 'Médecines alternatives intermédiaires : 90%/CHF 3\'000, 20 séances CHF 20 chez thérapeutes non reconnus, fitness CHF 200/an.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 3000,
      pourcent: 90,
      noteDetails: '130+ thérapies. Thérapeutes reconnus CHF 80/h. Thérapeutes non reconnus : 20 séances CHF 20/séance (CHF 400/an). Fitness CHF 200/an inclus.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: false,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness (abonnements et cours reconnus) : CHF 200/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 27.70, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 32.30, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 41.80, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/komplementaer/',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'sumiswalder-komplementaer-3',
    assureurId: 'sumiswalder',
    nomProduit: 'Komplementär 3',
    famille: 'medecines-douces',
    familles: ['medecines-douces', 'prevention'],
    description: 'Couverture médecines alternatives maximale Sumiswalder : 90%/CHF 4\'000, thérapeutes non reconnus 20 séances, fitness CHF 200/an. Accidents inclus gratuitement.',
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 4000,
      pourcent: 90,
      noteDetails: '130+ thérapies. Thérapeutes reconnus CHF 80/h. Thérapeutes non reconnus : 20 séances CHF 20/séance. Couverture accidents incluse gratuitement dans tous les plans Komplementär.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: false,
      vaccinationVoyage: false,
      coachingSante: false,
      noteDetails: 'Fitness (abonnements et cours reconnus) : CHF 200/an.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 44.70, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 50.10, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 69.40, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/komplementaer/',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'sumiswalder-kombi-generale',
    assureurId: 'sumiswalder',
    nomProduit: 'Kombi Générale',
    famille: 'hospitalier',
    description: 'Hospitalisation commune Sumiswalder : urgences monde CHF 50\'000, aide ménagère CHF 20-34/h (max 3h/j), transport CHF 10\'000/3 ans, fitness CHF 100-300/an, rooming-in CHF 30/nuit (14 nuits).',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Urgences internationales : CHF 50\'000. Aide ménagère : CHF 20-34/h, max 3h/j (cap CHF 2\'700-4\'500/an). Transport & sauvetage : CHF 10\'000/3 ans. Fitness : CHF 100-300/an. Rooming-in : CHF 30/nuit max 14 nuits. Maternité : délai 360 jours.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 11.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 13.10, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 19.20, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/kombi/',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'sumiswalder-kombi-demi-privee',
    assureurId: 'sumiswalder',
    nomProduit: 'Kombi Demi-Privée',
    famille: 'hospitalier',
    description: 'Hospitalisation demi-privée Sumiswalder : urgences monde CHF 75\'000, aide ménagère, transport CHF 10\'000/3 ans, fitness CHF 100-300/an.',
    hospitalier: {
      typeChambre: 'semi-privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Urgences internationales : CHF 75\'000. Aide ménagère : CHF 20-34/h max 3h/j. Transport : CHF 10\'000/3 ans. Fitness : CHF 100-300/an. Rooming-in : CHF 30/nuit max 14 nuits.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 56.40,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 77.40,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 98.20,  source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/kombi/',
    dateMAJ: '2026-05-15',
    scoreComplet: 65,
  },

  {
    id: 'sumiswalder-kombi-privee',
    assureurId: 'sumiswalder',
    nomProduit: 'Kombi Privée',
    famille: 'hospitalier',
    description: 'Hospitalisation privée Sumiswalder : urgences monde CHF 100\'000, libre choix médecin, aide ménagère, transport CHF 10\'000/3 ans.',
    hospitalier: {
      typeChambre: 'privee',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Urgences internationales : CHF 100\'000. Aide ménagère : CHF 20-34/h max 3h/j. Transport : CHF 10\'000/3 ans. Fitness : CHF 100-300/an. Rooming-in : CHF 30/nuit max 14 nuits.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 90.50,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 129.50, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 170.60, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/kombi/',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'sumiswalder-dental-50',
    assureurId: 'sumiswalder',
    nomProduit: 'Dental 50% (variantes B/C)',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée Sumiswalder : 50% des frais, CHF 500 ou CHF 1\'000/an (variantes B et C). Prophylaxie CHF 100. Enfants < 3 ans gratuits.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 1000,
      orthodontie: true,
      implants: true,
      noteDetails: 'Variante B : 50%/CHF 500/an. Variante C : 50%/CHF 1\'000/an. Prothèses, implants, couronnes, bridges, orthodontie inclus. Prophylaxie : CHF 100. Enfants <3 ans : gratuits ; nourrissons <1 an : sans déclaration de santé.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 32.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 35.50, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 49.50, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/dental/',
    dateMAJ: '2026-05-15',
    scoreComplet: 62,
  },

  {
    id: 'sumiswalder-dental-75',
    assureurId: 'sumiswalder',
    nomProduit: 'Dental 75% (variantes A/D–H)',
    famille: 'dentaire',
    description: 'Couverture dentaire élargie Sumiswalder : 75% des frais, CHF 1\'000 à CHF 5\'000/an selon variante (A, D, E, F, G, H). Franchise CHF 500 pour variantes A et G. Prothèses et implants inclus.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 5000,
      orthodontie: true,
      implants: true,
      noteDetails: '6 variantes 75% : plafonds CHF 1\'000-5\'000/an. Franchise CHF 500 sur variantes A et G. Prothèses (couronnes, bridges), implants, orthodontie, prophylaxie CHF 100. Enfants <3 ans : gratuits ; nourrissons <1 an : sans déclaration.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 45.50, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 50.00, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 70.00, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://sumiswalder.ch/privatkunden/angebot/zusatzversicherungen/dental/',
    dateMAJ: '2026-05-15',
    scoreComplet: 68,
  },
]
