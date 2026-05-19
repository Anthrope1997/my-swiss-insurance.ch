import type { ProduitComplementaire } from '../types'

// Source : vitasurselva.ch — relevé mai 2026
// Note : vita surselva est une petite caisse régionale des Grisons (Surselva)
// Langue principale : romanche/allemand — pas de site FR

export const produits: ProduitComplementaire[] = [

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'vita-surselva-hospital-generale',
    assureurId: 'vita-surselva',
    nomProduit: 'Spitalzusatz Générale (Kombi A)',
    famille: 'hospitalier',
    description: 'Division commune dans toute la Suisse. Forfait hospitalier CHF 500-1\'000 selon variante. vita surselva est une caisse régionale des Grisons.',
    hospitalier: {
      typeChambre: 'generale',
      libreChoixHopital: true,
      libreChoixMedecin: false,
      zoneGeographique: 'suisse',
      noteDetails: 'Forfait hospitalier CHF 500-1\'000. Variante Kombi A. Montants précis à confirmer sur vitasurselva.ch.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 6,   source: 'api', dateReleve: '2026-05-19' },
      { profilId: 'famille',      montantCHF: 6,   source: 'api', dateReleve: '2026-05-19' },
      { profilId: 'senior',       montantCHF: 8,   source: 'api', dateReleve: '2026-05-19' },
    ],
    urlProduit: 'https://www.vitasurselva.ch/privatkunde/angebot/zusatzversicherungen/spitalzusatz',
    dateMAJ: '2026-05-19',
    scoreComplet: 40,
  },

  {
    id: 'vita-surselva-hospital-privee',
    assureurId: 'vita-surselva',
    nomProduit: 'Spitalzusatz Cumpletta (Privée/Monde)',
    famille: 'hospitalier',
    description: 'Division semi-privée, privée ou au choix, couverture mondiale. Forfait hospitalier jusqu\'à CHF 3\'000 selon variante. Sanvita (non-fumeurs) disponible.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'monde',
      noteDetails: 'Variantes Cumpletta (privée/monde) et Activa/Sanvita (non-fumeurs). Forfait hospitalier CHF 1\'500-3\'000. Chambre au choix selon variante souscrite.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 148, source: 'api', dateReleve: '2026-05-19' },
      { profilId: 'famille',      montantCHF: 162, source: 'api', dateReleve: '2026-05-19' },
      { profilId: 'senior',       montantCHF: 293, source: 'api', dateReleve: '2026-05-19' },
    ],
    urlProduit: 'https://www.vitasurselva.ch/privatkunde/angebot/zusatzversicherungen/spitalzusatz',
    dateMAJ: '2026-05-19',
    scoreComplet: 42,
  },

  // ─── DENTAIRE ────────────────────────────────────────────────────────────────

  {
    id: 'vita-surselva-denta-1',
    assureurId: 'vita-surselva',
    nomProduit: 'Denta 50%',
    famille: 'dentaire',
    description: 'Assurance dentaire d\'entrée vita surselva : 50% des frais, CHF 1\'000/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 50,
      montantMaxSoins: 1000,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements dentaires courants. Détails complets sur vitasurselva.ch.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 17, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 20, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 27, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.vitasurselva.ch/privatkunde/angebot/zusatzversicherungen/zahnpflege',
    dateMAJ: '2026-05-15',
    scoreComplet: 40,
  },

  {
    id: 'vita-surselva-denta-2',
    assureurId: 'vita-surselva',
    nomProduit: 'Denta 75% / CHF 1\'500',
    famille: 'dentaire',
    description: 'Assurance dentaire intermédiaire vita surselva : 75% des frais, CHF 1\'500/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 1500,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements dentaires courants. Détails complets sur vitasurselva.ch.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 48, source: 'api', dateReleve: '2026-05-19' },
      { profilId: 'famille',      montantCHF: 52, source: 'api', dateReleve: '2026-05-19' },
      { profilId: 'senior',       montantCHF: 71, source: 'api', dateReleve: '2026-05-19' },
    ],
    urlProduit: 'https://www.vitasurselva.ch/privatkunde/angebot/zusatzversicherungen/zahnpflege',
    dateMAJ: '2026-05-15',
    scoreComplet: 42,
  },

  {
    id: 'vita-surselva-denta-3',
    assureurId: 'vita-surselva',
    nomProduit: 'Denta 75% / CHF 3\'000',
    famille: 'dentaire',
    description: 'Meilleure couverture dentaire vita surselva : 75% des frais, CHF 3\'000/an.',
    dentaire: {
      couvert: true,
      pourcentSoins: 75,
      montantMaxSoins: 3000,
      orthodontie: false,
      implants: false,
      noteDetails: 'Traitements dentaires courants. Détails complets sur vitasurselva.ch.',
    },
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 86,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 94,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 128, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.vitasurselva.ch/privatkunde/angebot/zusatzversicherungen/zahnpflege',
    dateMAJ: '2026-05-15',
    scoreComplet: 45,
  },
]
