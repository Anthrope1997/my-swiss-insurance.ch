'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { cantonBySlug } from '@/data/sante/cantons'

type AgeGroup = 'adulte' | 'jeuneAdulte' | 'enfant'

const CANTONS: { slug: string; name: string }[] = [
  { slug: 'argovie',                       name: 'Argovie'                        },
  { slug: 'appenzell-rhodes-exterieures',  name: 'Appenzell Rhodes-Extérieures'   },
  { slug: 'appenzell-rhodes-interieures',  name: 'Appenzell Rhodes-Intérieures'   },
  { slug: 'bale-campagne',                 name: 'Bâle-Campagne'                  },
  { slug: 'bale-ville',                    name: 'Bâle-Ville'                     },
  { slug: 'berne',                         name: 'Berne'                          },
  { slug: 'fribourg',                      name: 'Fribourg'                       },
  { slug: 'geneve',                        name: 'Genève'                         },
  { slug: 'glaris',                        name: 'Glaris'                         },
  { slug: 'grisons',                       name: 'Grisons'                        },
  { slug: 'jura',                          name: 'Jura'                           },
  { slug: 'lucerne',                       name: 'Lucerne'                        },
  { slug: 'neuchatel',                     name: 'Neuchâtel'                      },
  { slug: 'nidwald',                       name: 'Nidwald'                        },
  { slug: 'obwald',                        name: 'Obwald'                         },
  { slug: 'saint-gall',                    name: 'Saint-Gall'                     },
  { slug: 'schaffhouse',                   name: 'Schaffhouse'                    },
  { slug: 'schwyz',                        name: 'Schwyz'                         },
  { slug: 'soleure',                       name: 'Soleure'                        },
  { slug: 'tessin',                        name: 'Tessin'                         },
  { slug: 'thurgovie',                     name: 'Thurgovie'                      },
  { slug: 'uri',                           name: 'Uri'                            },
  { slug: 'valais',                        name: 'Valais'                         },
  { slug: 'vaud',                          name: 'Vaud'                           },
  { slug: 'zoug',                          name: 'Zoug'                           },
  { slug: 'zurich',                        name: 'Zurich'                         },
]

// Factors relative to primeMoyenneEnfant (measured at franchise 300 CHF)
const CHILD_FACTORS: { franchise: number; factor: number }[] = [
  { franchise: 0,   factor: 1.08 },
  { franchise: 100, factor: 1.04 },
  { franchise: 200, factor: 1.02 },
  { franchise: 300, factor: 1.00 },
  { franchise: 400, factor: 0.97 },
  { franchise: 600, factor: 0.93 },
]

const AGE_OPTIONS: { value: AgeGroup; label: string; sub: string }[] = [
  { value: 'adulte',      label: 'Adulte',       sub: '26 ans et plus' },
  { value: 'jeuneAdulte', label: 'Jeune adulte', sub: '19 à 25 ans'    },
  { value: 'enfant',      label: 'Enfant',       sub: '0 à 18 ans'     },
]

interface Option { franchise: number; primeMois: number; total: number }

function calcTotal(primeMois: number, franchise: number, frais: number, maxQP: number): number {
  const charge = Math.min(frais, franchise) + Math.min(0.1 * Math.max(frais - franchise, 0), maxQP)
  return Math.round(primeMois * 12 + charge)
}

function fmtN(n: number): string {
  return Math.round(n).toLocaleString('fr-CH')
}

export default function FranchiseSimulator() {
  const [canton, setCanton]     = useState('zurich')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adulte')
  const [frais, setFrais]       = useState(1000)

  const result = useMemo<{ best: Option; worst: Option; economy: number } | null>(() => {
    const data = cantonBySlug[canton]
    if (!data) return null

    let options: Option[]

    if (ageGroup === 'enfant') {
      const base = data.primeMoyenneEnfant
      options = CHILD_FACTORS.map(({ franchise, factor }) => {
        const primeMois = Math.round(base * factor * 100) / 100
        return { franchise, primeMois, total: calcTotal(primeMois, franchise, frais, 350) }
      })
    } else {
      const ratio = ageGroup === 'jeuneAdulte' && data.primeMoyenne > 0
        ? data.primeMoyenneJA / data.primeMoyenne
        : 1
      options = data.franchiseTable.map(row => {
        const primeMois = Math.round(row.primeMois * ratio * 100) / 100
        return { franchise: row.franchise, primeMois, total: calcTotal(primeMois, row.franchise, frais, 700) }
      })
    }

    if (options.length === 0) return null
    const sorted = [...options].sort((a, b) => a.total - b.total)
    const best   = sorted[0]
    const worst  = sorted[sorted.length - 1]
    return { best, worst, economy: worst.total - best.total }
  }, [canton, ageGroup, frais])

  const breakEven = cantonBySlug[canton]?.breakEvenFranchise ?? 1897

  const phrase = result
    ? ageGroup === 'enfant'
      ? `Avec CHF ${fmtN(frais)} de frais estimés, la franchise CHF ${fmtN(result.best.franchise)} est la plus avantageuse pour votre enfant.`
      : `Avec CHF ${fmtN(frais)} de frais estimés, la franchise CHF ${fmtN(result.best.franchise)} est la plus avantageuse dans votre canton.`
    : null

  const economyLine = result && result.economy > 0
    ? `CHF ${fmtN(result.economy)} de moins par an par rapport à la franchise CHF ${fmtN(result.worst.franchise)}`
    : null

  const comparateurUrl =
    `/sante/comparateur?canton=${canton}&franchise=${result?.best.franchise ?? 300}&profil=${ageGroup}`

  return (
    <div className="bg-white border border-edge rounded-xl p-6 mt-8">

      {/* Tranche d'âge */}
      <div className="mb-5">
        <p className="text-[16px] font-medium text-ink mb-3">Tranche d&apos;âge</p>
        <div className="flex flex-wrap gap-2">
          {AGE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setAgeGroup(opt.value)}
              className={`px-4 py-2 rounded-md border text-left transition-colors ${
                ageGroup === opt.value
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-slate border-edge hover:border-brand hover:text-brand'
              }`}
            >
              <span className="block text-[16px] font-medium">{opt.label}</span>
              <span className={`block text-[13px] font-normal ${ageGroup === opt.value ? 'text-white/80' : 'text-slate/60'}`}>
                {opt.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Canton */}
      <div className="mb-5">
        <label htmlFor="sim-canton" className="text-[16px] font-medium text-ink mb-2 block">
          Canton de résidence
        </label>
        <div className="sm:max-w-xs">
          <select
            id="sim-canton"
            value={canton}
            onChange={e => setCanton(e.target.value)}
            className="select-field"
          >
            {CANTONS.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Frais médicaux */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <label htmlFor="sim-frais" className="text-[16px] font-medium text-ink">
            Frais médicaux estimés
          </label>
          <span className="text-[16px] font-semibold text-brand">CHF {fmtN(frais)} / an</span>
        </div>
        <input
          id="sim-frais"
          type="range"
          min={0}
          max={6000}
          step={100}
          value={frais}
          onChange={e => setFrais(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <div className="flex justify-between text-[13px] text-slate/60 mt-1">
          <span>CHF 0</span>
          <span>Seuil équilibre ≈ CHF {fmtN(breakEven)}</span>
          <span>CHF 6 000</span>
        </div>
      </div>

      {/* Résultat */}
      {result && phrase && (
        <div className="bg-blue-tint rounded-lg px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-brand shrink-0" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[16px] font-semibold text-ink">
              Franchise recommandée : CHF {fmtN(result.best.franchise)}
            </span>
          </div>
          <p className="text-[16px] text-ink leading-relaxed mb-1">{phrase}</p>
          {economyLine && (
            <p className="text-[16px] font-semibold text-brand mb-4">{economyLine}</p>
          )}
          <Link href={comparateurUrl} className="btn-primary inline-flex items-center gap-2">
            Comparer les primes dans mon canton →
          </Link>
        </div>
      )}

    </div>
  )
}
