import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PrimeRow {
  region_id: string
  npa: string
  canton: string
  ville: string
  region_num: number
  annee_naissance: number
  franchise: number
  avec_accident: boolean
  modele_categorie: string
  modele_nom: string
  assureur: string
  prime_mensuelle: number
  remboursement: number
  prime_nette: number
}

interface RegionCommune {
  commune: string
  npas: string[]
  population: { total: number; hommes: number; femmes: number; age_0_18: number; age_19_25: number; age_25_plus: number }
}

interface Region {
  region_id: string
  canton: string
  region_num: number
  ville: string
  npa_principal: string
  commune_principale: string
  nb_communes: number
  nb_npas: number
  communes: RegionCommune[]
  population: { total: number; hommes: number; femmes: number; age_0_18: number; age_19_25: number; age_25_plus: number }
}

// ---------------------------------------------------------------------------
// Module-level cache (loaded once, reused across requests)
// ---------------------------------------------------------------------------

let primesCache: PrimeRow[] | null = null
let npaCache: Record<string, string> | null = null
let regionsCache: Record<string, Region> | null = null

function dataPath(filename: string) {
  return path.join(process.cwd(), 'lib', 'data', filename)
}

function getPrimes(): PrimeRow[] {
  if (!primesCache) primesCache = JSON.parse(fs.readFileSync(dataPath('primes.json'), 'utf-8'))
  return primesCache!
}

function getNpaMap(): Record<string, string> {
  if (!npaCache) npaCache = JSON.parse(fs.readFileSync(dataPath('npa_to_region.json'), 'utf-8'))
  return npaCache!
}

function getRegions(): Record<string, Region> {
  if (!regionsCache) regionsCache = JSON.parse(fs.readFileSync(dataPath('regions.json'), 'utf-8'))
  return regionsCache!
}

// ---------------------------------------------------------------------------
// GET /api/primes
//
// Resolve NPA only:
//   ?npa=1006
//   → { regionId, canton, ville, commune }
//
// Full query:
//   ?npa=1006&yob=1990&franchise=300&accident=false&modele=BASE
//   → { regionId, canton, ville, commune, nb_results, results[] }
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const npa = sp.get('npa')?.trim()

  if (!npa || !/^\d{4}$/.test(npa)) {
    return NextResponse.json({ error: 'NPA invalide (4 chiffres requis)' }, { status: 400 })
  }

  const npaMap   = getNpaMap()
  const regionId = npaMap[npa]
  if (!regionId) {
    return NextResponse.json({ error: 'NPA introuvable' }, { status: 404 })
  }

  const regions = getRegions()
  const region  = regions[regionId]
  const commune = region.communes.find(c => c.npas.includes(npa))?.commune
               ?? region.commune_principale

  // Résolution seule (pas de yob) → retourner les infos de localisation
  if (!sp.has('yob')) {
    return NextResponse.json({ regionId, canton: region.canton, ville: region.ville, commune })
  }

  // Requête complète
  const yob      = parseInt(sp.get('yob')!)
  const franchise = parseInt(sp.get('franchise') ?? '300')
  const accident  = sp.get('accident') === 'true'
  const modele    = sp.get('modele') ?? 'BASE'

  if (![1990, 2005, 2015].includes(yob)) {
    return NextResponse.json({ error: 'yob invalide (1990 | 2005 | 2015)' }, { status: 400 })
  }

  const primes  = getPrimes()
  const results = primes
    .filter(p =>
      p.region_id        === regionId &&
      p.annee_naissance  === yob &&
      p.franchise        === franchise &&
      p.avec_accident    === accident &&
      p.modele_categorie === modele,
    )
    .sort((a, b) => a.prime_mensuelle - b.prime_mensuelle)

  return NextResponse.json({
    regionId,
    canton:     region.canton,
    ville:      region.ville,
    commune,
    nb_results: results.length,
    results,
  })
}
