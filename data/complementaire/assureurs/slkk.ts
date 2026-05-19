import type { ProduitComplementaire } from '../types'

// Source : slkk.ch + EB PDF (2025-09) — relevé mai 2026
// SLKK = Schweizerische Lehrerkrankenkasse — ouverte à tous les résidents suisses
// Remise familiale : 5% dès 3 membres du même ménage
// Escompte : 0.5% (semestriel) / 1% (annuel)

export const produits: ProduitComplementaire[] = [

  // ─── AMBULATOIRE ─────────────────────────────────────────────────────────────

  {
    id: 'slkk-qualicare-basis',
    assureurId: 'slkk',
    nomProduit: 'QualiCare Basis',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention'],
    description: 'Couverture ambulatoire SLKK : médecines nat. 75%, remèdes 75%/CHF 1\'200, médicaments 75%/CHF 1\'200, lunettes 75%/CHF 200/an, prévention 75%/CHF 300, fitness 75%/CHF 300, psycho 75%/CHF 2\'000, orthodontie <20 ans 75%/CHF 10\'000.',
    ambulatoire: {
      postes: [
        { nom: 'Médecines naturelles (thérapeutes sur liste SLKK)', couvert: true, pourcent: 75 },
        { nom: 'Remèdes (homéo, phyto, anthropo, Oligosol)', couvert: true, pourcent: 75, montantMaxAnnuel: 1200 },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 75, montantMaxAnnuel: 1200 },
        { nom: 'Lunettes et lentilles de contact', couvert: true, pourcent: 75, montantMaxAnnuel: 200 },
        { nom: 'Prévention (vaccins, check-ups, sevrage tabac)', couvert: true, pourcent: 75, montantMaxAnnuel: 300 },
        { nom: 'Cours santé (dos, nutrition, grossesse, relaxation)', couvert: true, pourcent: 75, montantMaxAnnuel: 500, noteDetails: '75%/cours, max CHF 200/cours, max CHF 500/an total.' },
        { nom: 'Abonnement fitness (salle reconnue SLKK)', couvert: true, pourcent: 75, montantMaxAnnuel: 300, noteDetails: 'CHF 300/an, séparé du plafond cours CHF 500.' },
        { nom: 'Équipements médicaux (sur ordonnance)', couvert: true, pourcent: 75, montantMaxAnnuel: 300 },
        { nom: 'Soins urgences à l\'étranger', couvert: true, pourcent: 75, noteDetails: 'Urgences uniquement. EU/AELE : selon conditions du pays.' },
        { nom: 'Psychothérapie non-médecin (patent. cantonal)', couvert: true, pourcent: 75, montantMaxAnnuel: 2000, noteDetails: 'Max 4 ans, une seule fois par vie d\'assurance.' },
        { nom: 'Stérilisation / Vasectomie', couvert: true, pourcent: 75, montantMaxAnnuel: 500, noteDetails: 'Une seule fois.' },
        { nom: 'Orthodontie (<20 ans)', couvert: true, pourcent: 75, montantMaxAnnuel: 10000, noteDetails: 'Un parent doit détenir un QualiCare SLKK.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 1200,
      pourcent: 75,
      noteDetails: '75% pour thérapeutes sur liste SLKK + méthodes sur liste SLKK. Remèdes homéo/phyto/anthropo : 75%/CHF 1\'200/an.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 200,
      noteDetails: '75%, max CHF 200/an.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 300,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Fitness : 75%/CHF 300/an. Prévention (vaccins, check-ups, sevrage) : 75%/CHF 300/an. Cours santé : 75%/CHF 500/an.',
    },
    conditionsSouscription: ['Remise familiale 5% dès 3 membres du même ménage', 'Escompte 0.5% (semestriel) / 1% (annuel)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 49.70,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 55.20,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 56.50,  source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.slkk.ch/de/zusatzversicherungen/qualicare/',
    dateMAJ: '2026-05-18',
    scoreComplet: 88,
  },

  {
    id: 'slkk-qualicare-comfort',
    assureurId: 'slkk',
    nomProduit: 'QualiCare Comfort',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention', 'maternite', 'dentaire'],
    description: 'Couverture ambulatoire étendue SLKK : remèdes/médicaments 75%/CHF 5\'000 (vs 1\'200), lunettes 75%/CHF 300, prévention CHF 750, allaitement CHF 200, contraception 50%/CHF 200, dentaire CHF 300, orthodontie 75%/CHF 10\'000, chirurgie esthétique 50%/CHF 2\'000.',
    ambulatoire: {
      postes: [
        { nom: 'Médecines naturelles (thérapeutes sur liste SLKK)', couvert: true, pourcent: 75 },
        { nom: 'Remèdes (homéo, phyto, anthropo, Oligosol)', couvert: true, pourcent: 75, montantMaxAnnuel: 5000 },
        { nom: 'Médicaments non remboursés LAMal', couvert: true, pourcent: 75, montantMaxAnnuel: 5000 },
        { nom: 'Lunettes et lentilles de contact', couvert: true, pourcent: 75, montantMaxAnnuel: 300 },
        { nom: 'Prévention (vaccins, check-ups, sevrage tabac)', couvert: true, pourcent: 75, montantMaxAnnuel: 750 },
        { nom: 'Cours santé', couvert: true, pourcent: 75, montantMaxAnnuel: 800, noteDetails: '75%/cours, max CHF 200/cours, max CHF 800/an total.' },
        { nom: 'Abonnement fitness', couvert: true, pourcent: 75, montantMaxAnnuel: 300, noteDetails: 'CHF 300/an, séparé du plafond cours CHF 800.' },
        { nom: 'Allocation allaitement', couvert: true, montantMaxAnnuel: 200, noteDetails: 'CHF 200 si au moins 10 semaines d\'allaitement (attesté).' },
        { nom: 'Équipements médicaux', couvert: true, pourcent: 75, montantMaxAnnuel: 500 },
        { nom: 'Médecins hors convention (inland)', couvert: true, pourcent: 75, montantMaxAnnuel: 3000 },
        { nom: 'Soins urgences à l\'étranger', couvert: true, pourcent: 75, noteDetails: 'Urgences illimité. Traitements planifiés étranger : 75%/CHF 1\'000/an.' },
        { nom: 'Contraception (femme)', couvert: true, pourcent: 50, montantMaxAnnuel: 200 },
        { nom: 'Stérilisation / Vasectomie', couvert: true, pourcent: 75, montantMaxAnnuel: 500, noteDetails: 'Une seule fois.' },
        { nom: 'Psychothérapie non-médecin', couvert: true, pourcent: 75, montantMaxAnnuel: 2000, noteDetails: 'Max 4 ans, une seule fois.' },
        { nom: 'Traitements dentaires (extraction, Röntgen, anesthésie, gingivectomie)', couvert: true, montantMaxAnnuel: 300 },
        { nom: 'Orthodontie (<20 ans)', couvert: true, pourcent: 75, montantMaxAnnuel: 10000, noteDetails: 'Un parent doit détenir un QualiCare SLKK.' },
        { nom: 'Chirurgie esthétique médicalement indiquée', couvert: true, pourcent: 50, montantMaxAnnuel: 2000, noteDetails: 'CHF 2\'000/traitement, si valeur pathologique reconnue.' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['ASCA', 'autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 5000,
      pourcent: 75,
      noteDetails: '75% thérapeutes + méthodes listes SLKK. Remèdes : 75%/CHF 5\'000/an.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 300,
      noteDetails: '75%, max CHF 300/an.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 300,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: false,
      noteDetails: 'Fitness : 75%/CHF 300/an. Prévention : 75%/CHF 750/an. Cours santé : 75%/CHF 800/an.',
    },
    maternite: {
      couvert: true,
      preparationAccouchement: false,
      sageFemme: false,
      bebe: false,
      noteDetails: 'Allocation allaitement CHF 200 (min 10 semaines, attesté médecin/sage-femme/conseillère allait.).',
    },
    conditionsSouscription: ['Remise familiale 5% dès 3 membres du même ménage', 'Escompte 0.5% (semestriel) / 1% (annuel)'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 53.80,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 61.90,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 70.00,  source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.slkk.ch/de/zusatzversicherungen/qualicare/',
    dateMAJ: '2026-05-18',
    scoreComplet: 92,
  },

  {
    id: 'slkk-medico-plus',
    assureurId: 'slkk',
    nomProduit: 'MedicoPlus',
    famille: 'ambulatoire',
    familles: ['ambulatoire', 'medecines-douces', 'optique', 'prevention', 'dentaire'],
    description: 'Ambulatoire SLKK en 4 variantes : Standard (médicaments 90%/CHF 1\'200, vaccins, nutrition, psycho, cures), Alternativ (médecines EMR 50%/CHF 1\'200, remèdes 90%/CHF 1\'200, optique 90%), Complet (Standard+Alternativ), Jeunesse 0-18 ans (orthodontie 70%/CHF 3\'000, lunettes CHF 300, dentaire CHF 300). Remise 5% famille.',
    ambulatoire: {
      postes: [
        // ─ Standard (et Complet) ─
        { nom: 'Médicaments non remboursés LAMal (sur ordonnance)', couvert: true, pourcent: 90, montantMaxAnnuel: 1200, noteDetails: 'Standard et Complet : 90%, max CHF 1\'200/an.' },
        { nom: 'Vaccins (non-LAMal)', couvert: true, montantMaxAnnuel: 100, noteDetails: 'Max CHF 100/an.' },
        { nom: 'Conseil en nutrition', couvert: true, montantMaxAnnuel: 300, noteDetails: 'Max CHF 300/an.' },
        { nom: 'Fitness / Gym grossesse (Gesundheitsförderung)', couvert: true, montantMaxAnnuel: 200, noteDetails: 'Max CHF 200/an. Non cumulable avec prestations LAMal.' },
        { nom: 'Psychothérapie non-médicale (sur ordonnance)', couvert: true, pourcent: 50, montantMaxAnnuel: 300, noteDetails: '50%, max CHF 300/an (variante Standard). Variante Complet : max 40h à CHF 50/h, une fois (max CHF 2\'000).' },
        { nom: 'Cure balnéaire stationnaire (sur ordonnance)', couvert: true, montantMaxAnnuel: 420, noteDetails: 'CHF 20/j, max 21 jours/an (= CHF 420/an).' },
        { nom: 'Cure récupération après hospitalisation (sur ordonnance)', couvert: true, montantMaxAnnuel: 420, noteDetails: 'CHF 20/j, max 21 jours/an.' },
        { nom: 'Cure balnéaire ambulatoire (sur ordonnance)', couvert: true, pourcent: 50, montantMaxAnnuel: 250, noteDetails: '50%, max CHF 250/an.' },
        { nom: 'Transport / sauvetage / rapatriement / recherche', couvert: true, montantMaxAnnuel: 10000, noteDetails: 'Via assurance Assistance SLKK, max CHF 10\'000/personne.' },
        { nom: 'Dentaire — soins non-LAMal (extraction, radio, anesthésie, gingivectomie)', couvert: true, montantMaxAnnuel: 300, noteDetails: 'Max CHF 300/an (Standard et Complet).' },
        { nom: 'Stérilisation / Vasectomie', couvert: true, montantMaxAnnuel: 500, noteDetails: 'CHF 500, une fois.' },
        { nom: 'Gynécologie préventive', couvert: true, noteDetails: 'Incluse.' },
        // ─ Alternativ (et Complet) ─
        { nom: 'Médecines naturelles EMR (thérapeutes liste SLKK)', couvert: true, pourcent: 50, montantMaxAnnuel: 1200, noteDetails: 'Variante Alternativ/Complet : 50%, max CHF 1\'200/an. Thérapeutes reconnus EMR selon liste SLKK.' },
        { nom: 'Remèdes naturels (Heilmittel)', couvert: true, pourcent: 90, montantMaxAnnuel: 1200, noteDetails: 'Variante Alternativ/Complet : 90%, max CHF 1\'200/an.' },
        { nom: 'Équipements médicaux (sur ordonnance)', couvert: true, pourcent: 90, montantMaxAnnuel: 300, noteDetails: 'Variante Alternativ/Complet : 90%, max CHF 300/an.' },
        { nom: 'Lunettes / lentilles (variante Alternativ)', couvert: true, pourcent: 90, noteDetails: 'Alternativ : 90% (sans plafond précisé). Standard/Complet : 50%/CHF 200/an. Jeunesse : 50%/CHF 300/an.' },
        // ─ Jeunesse (0-18 ans) ─
        { nom: 'Orthodontie — Jeunesse (<18 ans)', couvert: true, pourcent: 70, montantMaxAnnuel: 3000, noteDetails: '70%, max CHF 3\'000, une fois. Variante Jeunesse uniquement.' },
        { nom: 'Lunettes / lentilles — Jeunesse', couvert: true, pourcent: 50, montantMaxAnnuel: 300, noteDetails: 'Jeunesse : 50%, max CHF 300/an.' },
        { nom: 'Dentaire — Jeunesse (soins non-LAMal)', couvert: true, montantMaxAnnuel: 300, noteDetails: 'Max CHF 300/an (Jeunesse).' },
      ],
    },
    medecinesDouces: {
      listesReconnues: ['autre'],
      therapiesCouvertes: ['acupuncture', 'homeopathie', 'osteopathie', 'naturopathie', 'phytotherapie'],
      montantMaxAnnuel: 1200,
      pourcent: 50,
      noteDetails: 'Variante Alternativ/Complet : thérapeutes reconnus EMR, liste SLKK. 50%, max CHF 1\'200/an. Remèdes : 90%/CHF 1\'200/an.',
    },
    optique: {
      couvert: true,
      lunettes: true,
      lentilles: true,
      montantMaxAnnuel: 200,
      noteDetails: 'Standard/Complet : 50%, max CHF 200/an. Alternativ : 90%. Jeunesse : 50%, max CHF 300/an.',
    },
    prevention: {
      fitness: true,
      montantMaxFitness: 200,
      bilanSante: true,
      vaccinationVoyage: true,
      coachingSante: true,
      noteDetails: 'Fitness/gym grossesse : CHF 200/an. Vaccins : CHF 100/an. Conseil nutrition : CHF 300/an. Gynéco préventive incluse.',
    },
    conditionsSouscription: [
      '4 variantes : Standard (≥19 ans), Alternativ (≥19 ans), Complet = Standard+Alternativ (≥19 ans), Jeunesse (0–18 ans)',
      'Remise familiale 5%',
      'Complet : psychothérapie max 40h à CHF 50/h, une fois (CHF 2\'000 max)',
    ],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 20.40,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 29.50,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 24.20,  source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.slkk.ch/de/zusatzversicherungen/zusatzversicherung-medico/',
    dateMAJ: '2026-05-15',
    scoreComplet: 80,
  },

  // ─── HOSPITALIER ─────────────────────────────────────────────────────────────

  {
    id: 'slkk-superflex',
    assureurId: 'slkk',
    nomProduit: 'SuperFlex®',
    famille: 'hospitalier',
    description: 'Hospitalisation flexible SLKK : choix libre de la division à chaque séjour. Franchise CHF 50/j (demi-privée) ou CHF 200/j (privée). Variante F4 mondiale. Bonus fidélité 5%/an (max 40%). Remise pluriannuelle 10%.',
    hospitalier: {
      typeChambre: 'flex',
      libreChoixHopital: true,
      libreChoixMedecin: true,
      zoneGeographique: 'suisse',
      noteDetails: 'Division choisie avant chaque admission. Tous hôpitaux soins aigus Suisse + cliniques privées. Franchise : CHF 50/j (demi-privée), CHF 200/j (privée). Variante F4 : couverture mondiale (= privée F3). Bonus sans sinistre : 5%/an max 40% cumulé. Remise contrat pluriannuel : 10%. Remise famille : 5%.',
    },
    conditionsSouscription: ['Remise pluriannuelle 10%', 'Bonus fidélité 5%/an sans sinistre (max 40%)', 'Remise familiale 5%'],
    tarifs: [
      { profilId: 'jeune-adulte', montantCHF: 53.30,  source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'famille',      montantCHF: 110.10, source: 'site-web', dateReleve: '2026-05-18' },
      { profilId: 'senior',       montantCHF: 137.40, source: 'site-web', dateReleve: '2026-05-18' },
    ],
    urlProduit: 'https://www.slkk.ch/de/zusatzversicherungen/spitalzusatzversicherung-superflex/',
    dateMAJ: '2026-05-15',
    scoreComplet: 70,
  },
]
