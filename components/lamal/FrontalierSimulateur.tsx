'use client'

import { useState } from 'react'

const questions = [
  {
    id: 'soins',
    texte: 'Où consultez-vous principalement un médecin ?',
    options: [
      { value: 'suisse', label: 'En Suisse' },
      { value: 'pays', label: 'Dans mon pays de résidence' },
      { value: 'deux', label: 'Dans les deux pays selon le cas' },
    ],
  },
  {
    id: 'famille',
    texte: 'Votre famille réside-t-elle en Suisse avec vous ?',
    options: [
      { value: 'oui', label: 'Oui, toute ou partie de ma famille est en Suisse' },
      { value: 'non', label: 'Non, ma famille réside dans mon pays de résidence' },
    ],
  },
  {
    id: 'subsides',
    texte: 'Vos revenus vous rendraient-ils éligible aux subsides LAMal cantonaux ?',
    options: [
      { value: 'oui', label: 'Oui, mes revenus sont modestes' },
      { value: 'non', label: 'Non, mes revenus dépassent les seuils' },
      { value: 'sais_pas', label: 'Je ne sais pas' },
    ],
  },
  {
    id: 'stabilite',
    texte: 'Votre activité professionnelle en Suisse est-elle stable sur le long terme ?',
    options: [
      { value: 'oui', label: 'Oui, contrat longue durée ou emploi stable' },
      { value: 'non', label: 'Non, mission temporaire ou situation incertaine' },
    ],
  },
  {
    id: 'soins_reguliers',
    texte: 'Avez-vous des soins médicaux réguliers prévus (traitement chronique, spécialiste) ?',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
    ],
  },
]

function calculerRecommandation(reponses: Record<string, string>): {
  titre: string
  description: string
  points: string[]
  niveau: 'lamal' | 'pays' | 'neutre'
} {
  let scoreLamal = 0

  if (reponses.soins === 'suisse') scoreLamal += 3
  else if (reponses.soins === 'deux') scoreLamal += 1

  if (reponses.famille === 'oui') scoreLamal += 2

  if (reponses.subsides === 'oui') scoreLamal += 2

  if (reponses.stabilite === 'oui') scoreLamal += 1

  if (reponses.soins_reguliers === 'oui' && reponses.soins === 'suisse') scoreLamal += 2

  if (scoreLamal >= 6) {
    return {
      niveau: 'lamal',
      titre: 'La LAMal semble adaptée à votre situation',
      description:
        'Votre profil — soins principalement en Suisse, situation stable, éligibilité possible aux subsides — plaide en faveur de la LAMal suisse. Vous bénéficieriez d\'un accès complet au système de santé suisse.',
      points: [
        'Accès direct à tous les médecins et hôpitaux suisses',
        reponses.subsides === 'oui' ? 'Droit potentiel aux subsides cantonaux' : 'Couverture complète dès la prise d\'effet',
        'Couverture accidents si vous devenez indépendant',
        'Facilité pour les soins réguliers en Suisse',
      ],
    }
  }

  if (scoreLamal <= 2) {
    return {
      niveau: 'pays',
      titre: 'Le système de votre pays de résidence semble plus adapté',
      description:
        'Votre profil — soins principalement dans votre pays, famille restée au pays, mission temporaire — suggère que rester dans votre système national pourrait être plus avantageux.',
      points: [
        'Continuité avec votre médecin habituel et votre réseau de soins',
        'Couverture de votre famille dans votre pays',
        'Soins en Suisse couverts aux urgences via le formulaire S1',
        'Moins de changements administratifs si votre mission est courte',
      ],
    }
  }

  return {
    niveau: 'neutre',
    titre: 'Votre situation mérite une analyse personnalisée',
    description:
      'Votre profil présente des arguments pour les deux systèmes. Plusieurs critères sont à peser précisément : montant des subsides potentiels, fréquence des soins, durée de votre activité en Suisse.',
    points: [
      'Comparez le coût réel : prime LAMal moins subsides vs cotisations dans votre pays',
      'Vérifiez vos droits aux subsides cantonaux (critères variables selon canton)',
      'Évaluez la durée probable de votre activité en Suisse',
      'Un expert peut vous aider à chiffrer les deux options',
    ],
  }
}

export default function FrontalierSimulateur() {
  const [etape, setEtape] = useState(0)
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [selection, setSelection] = useState<string | null>(null)
  const [resultat, setResultat] = useState<ReturnType<typeof calculerRecommandation> | null>(null)

  const questionActuelle = questions[etape]
  const total = questions.length

  function choisir(valeur: string) {
    setSelection(valeur)
  }

  function suivant() {
    if (!selection) return
    const nouvellesReponses = { ...reponses, [questionActuelle.id]: selection }
    setReponses(nouvellesReponses)
    setSelection(null)

    if (etape < total - 1) {
      setEtape(etape + 1)
    } else {
      setResultat(calculerRecommandation(nouvellesReponses))
    }
  }

  function recommencer() {
    setEtape(0)
    setReponses({})
    setSelection(null)
    setResultat(null)
  }

  if (resultat) {
    const colors = {
      lamal: { bg: 'bg-[#eff6ff]', border: 'border-[#1d4ed8]', text: 'text-[#1d4ed8]', icon: '✓' },
      pays: { bg: 'bg-[#f0fdf4]', border: 'border-[#22c55e]', text: 'text-[#16a34a]', icon: '✓' },
      neutre: { bg: 'bg-[#fff7ed]', border: 'border-[#f59e0b]', text: 'text-[#d97706]', icon: '→' },
    }
    const c = colors[resultat.niveau]

    return (
      <div className={`${c.bg} border ${c.border} rounded-[10px] p-6`}>
        <p className={`text-[12px] font-semibold ${c.text} uppercase tracking-widest mb-2`}>
          Résultat de votre simulation
        </p>
        <h3 className="text-[18px] font-semibold text-[#0f2040] mb-3">{resultat.titre}</h3>
        <p className="text-[14px] text-[#475569] leading-relaxed mb-4">{resultat.description}</p>
        <ul className="space-y-2 mb-5">
          {resultat.points.map((p, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] text-[#475569]">
              <span className={`${c.text} font-bold shrink-0`}>{c.icon}</span>
              {p}
            </li>
          ))}
        </ul>
        <button
          onClick={recommencer}
          className="text-[13px] text-[#475569] hover:text-[#0f2040] underline"
        >
          ← Recommencer la simulation
        </button>
      </div>
    )
  }

  return (
    <div className="border border-[#e2e8f0] rounded-[10px] p-6 bg-white">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[12px] font-semibold text-[#475569] uppercase tracking-widest">
          Simulateur de décision
        </p>
        <span className="text-[12px] text-[#475569]">
          Question {etape + 1} sur {total}
        </span>
      </div>

      <div className="w-full bg-[#e2e8f0] rounded-full h-1 mb-5">
        <div
          className="bg-[#1d4ed8] h-1 rounded-full transition-all duration-300"
          style={{ width: `${((etape) / total) * 100}%` }}
        />
      </div>

      <p className="text-[16px] font-semibold text-[#0f2040] mb-4">
        {questionActuelle.texte}
      </p>

      <div className="space-y-2 mb-5">
        {questionActuelle.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => choisir(opt.value)}
            className={[
              'w-full text-left px-4 py-3 rounded-[8px] border text-[14px] transition-colors duration-150',
              selection === opt.value
                ? 'border-[#1d4ed8] bg-[#eff6ff] text-[#0f2040] font-medium'
                : 'border-[#e2e8f0] bg-white text-[#475569] hover:border-[#1d4ed8]/40',
            ].join(' ')}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button
        onClick={suivant}
        disabled={!selection}
        className={[
          'w-full py-2.5 rounded-[8px] text-[14px] font-semibold transition-colors duration-150',
          selection
            ? 'bg-[#1d4ed8] hover:bg-[#1e40af] text-white'
            : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed',
        ].join(' ')}
      >
        {etape < total - 1 ? 'Question suivante →' : 'Voir ma recommandation →'}
      </button>
    </div>
  )
}
