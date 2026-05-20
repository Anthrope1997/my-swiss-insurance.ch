'use client'

import { useState, useMemo } from 'react'
import { tousLesProduits } from '@/data/complementaire'
import type { ProfilType, FamilleComplementaire } from '@/data/complementaire'

// ─── Types ────────────────────────────────────────────────────────────────────

type Famille = FamilleComplementaire | 'all'

// ─── Constantes ───────────────────────────────────────────────────────────────

const PROFILS: { id: ProfilType; label: string; detail: string }[] = [
  { id: 'jeune-adulte', label: 'Jeune adulte', detail: '26 ans, NPA 1000' },
  { id: 'famille',      label: 'Famille',      detail: '35 ans, NPA 1201' },
  { id: 'senior',       label: 'Senior',       detail: '55 ans, NPA 1000' },
]

const FAMILLES: { id: Famille; label: string; icon: string }[] = [
  { id: 'all',            label: 'Toutes catégories', icon: '🏥' },
  { id: 'hospitalier',    label: 'Hospitalisation',   icon: '🏨' },
  { id: 'ambulatoire',    label: 'Ambulatoire',        icon: '🩺' },
  { id: 'dentaire',       label: 'Dentaire',           icon: '🦷' },
  { id: 'medecines-douces', label: 'Médecines douces', icon: '🌿' },
]

const ASSUREUR_LABELS: Record<string, string> = {
  swica:     'SWICA',
  kpt:       'KPT',
  sanitas:   'Sanitas',
  concordia: 'Concordia',
  css:       'CSS',
  helsana:   'Helsana',
  assura:    'Assura',
  sympany:   'Sympany',
  visana:    'Visana',
  groupe_mutuel: 'Groupe Mutuel',
  egk:       'EGK',
  atupri:    'Atupri',
  okk:       'OKK',
  innova:    'Innova',
  aquilana:  'Aquilana',
  agrisano:  'Agrisano',
}

const ASSUREUR_COLORS: Record<string, string> = {
  swica:     'bg-teal-100 text-teal-800',
  kpt:       'bg-blue-100 text-blue-800',
  sanitas:   'bg-indigo-100 text-indigo-800',
  concordia: 'bg-orange-100 text-orange-800',
  css:       'bg-red-100 text-red-800',
  helsana:   'bg-rose-100 text-rose-800',
  assura:    'bg-purple-100 text-purple-800',
}

const FAMILLE_LABELS: Record<string, string> = {
  hospitalier:      'Hospitalier',
  ambulatoire:      'Ambulatoire',
  dentaire:         'Dentaire',
  'medecines-douces': 'Médecines douces',
  optique:          'Optique',
  prevention:       'Prévention',
  maternite:        'Maternité',
  voyage:           'Voyage',
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function ComparateurComplementairesClient() {
  const [selectedProfil, setSelectedProfil] = useState<ProfilType>('jeune-adulte')
  const [selectedFamille, setSelectedFamille] = useState<Famille>('all')
  const [showOnlyWithPrices, setShowOnlyWithPrices] = useState(true)

  const produits = useMemo(() => {
    let filtered = tousLesProduits.filter((p) => !p.masquer)

    // Category filter
    if (selectedFamille !== 'all') {
      filtered = filtered.filter(
        (p) => p.famille === selectedFamille || p.familles?.includes(selectedFamille as FamilleComplementaire)
      )
    }

    // Map each product to price for selected profil
    const withPrice = filtered.map((p) => {
      const tarif = p.tarifs.find((t) => t.profilId === selectedProfil)
      return { ...p, prixMois: tarif?.montantCHF ?? null }
    })

    // Optionally filter out products without price
    const result = showOnlyWithPrices
      ? withPrice.filter((p) => p.prixMois !== null)
      : withPrice

    // Sort: with prices first (ascending), then without prices
    return result.sort((a, b) => {
      if (a.prixMois !== null && b.prixMois !== null) return a.prixMois - b.prixMois
      if (a.prixMois !== null) return -1
      if (b.prixMois !== null) return 1
      return a.nomProduit.localeCompare(b.nomProduit)
    })
  }, [selectedProfil, selectedFamille, showOnlyWithPrices])

  const totalWithPrices = tousLesProduits.filter((p) =>
    !p.masquer && p.tarifs.some((t) => t.profilId === selectedProfil)
  ).length

  return (
    <div>
      {/* ── Filters ─────────────────────────────────────────────────────── */}

      {/* Profile selector */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Profil</p>
        <div className="flex flex-wrap gap-2">
          {PROFILS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProfil(p.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedProfil === p.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {p.label}
              <span className="ml-1 text-xs opacity-70">({p.detail})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Catégorie</p>
        <div className="flex flex-wrap gap-2">
          {FAMILLES.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFamille(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFamille === f.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
              }`}
            >
              <span className="mr-1">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary + toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{produits.length} produit{produits.length > 1 ? 's' : ''}</span>
          {' '}affiché{produits.length > 1 ? 's' : ''}
          {' '}— {totalWithPrices} tarifs disponibles pour ce profil
        </p>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showOnlyWithPrices}
            onChange={(e) => setShowOnlyWithPrices(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher uniquement les produits avec tarifs
        </label>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      {produits.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          Aucun produit trouvé pour ces critères.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Assureur</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Produit</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Description</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">CHF/mois</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Score</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {produits.map((p, i) => {
                const assureurLabel =
                  ASSUREUR_LABELS[p.assureurId] ||
                  p.assureurId.charAt(0).toUpperCase() + p.assureurId.slice(1)
                const colorClass =
                  ASSUREUR_COLORS[p.assureurId] || 'bg-gray-100 text-gray-700'
                const categorieLabel =
                  FAMILLE_LABELS[p.famille] || p.famille

                return (
                  <tr
                    key={p.id}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    } ${p.prixMois === null ? 'opacity-60' : ''}`}
                  >
                    {/* Assureur */}
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
                        {assureurLabel}
                      </span>
                    </td>

                    {/* Produit */}
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {p.nomProduit}
                    </td>

                    {/* Catégorie */}
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      {categorieLabel}
                    </td>

                    {/* Description courte */}
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-xs hidden lg:table-cell">
                      <span className="line-clamp-2">{p.description}</span>
                    </td>

                    {/* Prix */}
                    <td className="px-4 py-3 text-right">
                      {p.prixMois !== null ? (
                        <span className="font-bold text-gray-900">
                          {p.prixMois.toFixed(2).replace('.', '.')}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>

                    {/* Score */}
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <ScoreBadge score={p.scoreComplet} />
                    </td>

                    {/* Lien */}
                    <td className="px-4 py-3">
                      {p.urlProduit && (
                        <a
                          href={p.urlProduit}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium whitespace-nowrap"
                          aria-label={`Voir ${p.nomProduit} sur le site ${assureurLabel}`}
                        >
                          Voir →
                        </a>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Methodology note ────────────────────────────────────────────── */}
      <p className="mt-4 text-xs text-gray-400">
        Tarifs relevés en mai 2026 sur les sites officiels des assureurs pour les profils standardisés
        indiqués. Les prix peuvent varier selon votre canton de résidence, votre date de naissance exacte
        et les options choisies. Vérifiez toujours directement auprès de l'assureur avant de souscrire.
      </p>
    </div>
  )
}

// ─── Score badge ─────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? 'bg-green-100 text-green-700' :
    score >= 70 ? 'bg-yellow-100 text-yellow-700' :
    'bg-gray-100 text-gray-500'

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${color}`}>
      {score}
    </span>
  )
}
