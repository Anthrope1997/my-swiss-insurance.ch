#!/usr/bin/env python3
"""
Scrape toutes les primes LAMal 2026 depuis priminfo.admin.ch
Output final : lib/data/primes.json  (tableau JSON plat)

Usage :
    python3 scripts/scrape_primes.py

Requirements :
    pip install requests beautifulsoup4

Robustesse :
    - Reprise automatique si interruption (fichier d'état primes_state.json)
    - Retry 2× par requête, puis skip avec log
    - Sauvegarde d'état toutes les SAVE_EVERY combinaisons
    - Ctrl+C intercepté : sauvegarde propre avant de quitter
    - Aucune interaction utilisateur requise
"""

import json
import os
import re
import signal
import sys
import time
import warnings
from typing import Dict, List, Optional, Set

import requests
from bs4 import BeautifulSoup

warnings.filterwarnings("ignore")

# ---------------------------------------------------------------------------
# Chemins
# ---------------------------------------------------------------------------

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR   = os.path.join(SCRIPT_DIR, "..", "lib", "data")
JSONL_FILE = os.path.join(DATA_DIR, "primes_raw.jsonl")   # écriture au fil de l'eau
STATE_FILE = os.path.join(DATA_DIR, "primes_state.json")  # progression
OUTPUT_JSON = os.path.join(DATA_DIR, "primes.json")       # fichier final

# ---------------------------------------------------------------------------
# Paramètres
# ---------------------------------------------------------------------------

BASE_URL       = "https://www.priminfo.admin.ch"
DELAY          = 2.0        # secondes entre chaque requête
SAVE_EVERY     = 25         # sauvegarde état tous les N combos traités
MAX_RETRIES    = 2          # retries avant skip

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,*/*",
}

# ---------------------------------------------------------------------------
# Données de référence
# ---------------------------------------------------------------------------

NPA_MAP = {
    "8345": ("ZH", 3, "Hinwil"),
    "8310": ("ZH", 2, "Winterthur-Land"),
    "8001": ("ZH", 1, "Zürich"),
    "4900": ("BE", 3, "Oberaargau"),
    "3004": ("BE", 1, "Bern"),
    "3600": ("BE", 2, "Thun"),
    "6274": ("LU", 3, "Eschenbach"),
    "6003": ("LU", 1, "Luzern"),
    "6210": ("LU", 2, "Sursee"),
    "6460": ("UR", 0, "Altdorf"),
    "8640": ("SZ", 0, "Schwyz"),
    "6056": ("OW", 0, "Obwalden"),
    "6370": ("NW", 0, "Nidwalden"),
    "8752": ("GL", 0, "Glarus"),
    "6300": ("ZG", 0, "Zug"),
    "1630": ("FR", 2, "La Gruyère"),
    "1700": ("FR", 1, "La Sarine"),
    "4600": ("SO", 0, "Solothurn"),
    "4001": ("BS", 0, "Basel"),
    "4123": ("BL", 1, "BL-Ouest"),
    "4450": ("BL", 2, "BL-Est"),
    "8236": ("SH", 2, "SH-Land"),
    "8200": ("SH", 1, "Schaffhausen"),
    "9100": ("AR", 0, "Appenzell AR"),
    "9050": ("AI", 0, "Appenzell AI"),
    "9000": ("SG", 1, "St. Gallen"),
    "9058": ("SG", 3, "SG-Alpstein"),
    "8630": ("SG", 2, "SG-Est"),
    "7111": ("GR", 3, "GR-Surselva"),
    "7260": ("GR", 2, "Davos"),
    "7000": ("GR", 1, "Chur"),
    "5300": ("AG", 0, "Aargau"),
    "8500": ("TG", 0, "Frauenfeld"),
    "6823": ("TI", 1, "Lugano"),
    "6710": ("TI", 2, "Biasca"),
    "1000": ("VD", 1, "Lausanne"),
    "1400": ("VD", 2, "Yverdon-les-Bains"),
    "3900": ("VS", 2, "Brig"),
    "1950": ("VS", 1, "Sion"),
    "2000": ("NE", 0, "Neuchâtel"),
    "1201": ("GE", 0, "Genève"),
    "2800": ("JU", 0, "Delémont"),
}

ANNEES_NAISSANCE = [1990, 2005, 2015]
COVERAGES        = [0, 1]          # 0 = sans accident, 1 = avec accident
MODELS           = ["BASE", "HAM", "HMO", "DIV"]

# Franchises par année de naissance (LAMal : enfants ≠ adultes)
FRANCHISES_PAR_YOB = {
    1990: [300, 500, 1000, 1500, 2000, 2500],
    2005: [300, 500, 1000, 1500, 2000, 2500],
    2015: [100, 200, 300, 400, 500, 600],
}

TOTAL_COMBOS = sum(
    len(NPA_MAP) * len(FRANCHISES_PAR_YOB[yob]) * len(COVERAGES) * len(MODELS)
    for yob in ANNEES_NAISSANCE
)
# 42 × 6 × 2 × 4 × 3 = 6 048

# ---------------------------------------------------------------------------
# Session HTTP
# ---------------------------------------------------------------------------

SESSION = requests.Session()
SESSION.headers.update(HEADERS)


# ---------------------------------------------------------------------------
# Résolution location_id
# ---------------------------------------------------------------------------

def get_location_id(npa: str) -> Optional[str]:
    url = f"{BASE_URL}/de/praemien/locations"
    for attempt in range(1, MAX_RETRIES + 2):
        try:
            r = SESSION.get(
                url,
                params={"term": npa},
                headers={"X-Requested-With": "XMLHttpRequest"},
                timeout=15,
            )
            r.raise_for_status()
            m = re.search(r"Locations\s*=\s*(\{.+\})", r.text)
            if not m:
                raise ValueError("Réponse Locations introuvable")
            loc_data = json.loads(m.group(1))
            ids = loc_data.get("index", {}).get(npa, [])
            if not ids:
                raise ValueError(f"Aucun location_id pour NPA {npa}")
            return ids[0]
        except Exception as exc:
            if attempt <= MAX_RETRIES:
                print(f"  [location retry {attempt}] {npa}: {exc}", file=sys.stderr)
                time.sleep(DELAY * 2)
            else:
                print(f"  [SKIP location] {npa}: {exc}", file=sys.stderr)
                return None
    return None


# ---------------------------------------------------------------------------
# Parsing du tableau HTML
# ---------------------------------------------------------------------------

def _clean_number(raw: str) -> Optional[float]:
    """Convertit '1'234.56' ou '—' en float ou None."""
    cleaned = raw.replace("\u2019", "").replace("'", "").replace("\u2014", "").replace("—", "").strip()
    if not cleaned:
        return None
    try:
        return round(float(cleaned), 2)
    except ValueError:
        return None


def parse_result_table(html: str, npa: str, canton: str, ville: str, region_num: int,
                       annee_naissance: int, franchise: int, avec_accident: bool,
                       modele_categorie: str) -> list[dict]:
    """
    Parse le tableau de résultats et retourne toutes les lignes valides.
    Retourne [] si pas de tableau ou franchises non applicables (prime = —).
    """
    soup = BeautifulSoup(html, "html.parser")
    tbody = soup.find("tbody", id="disableAriaLive")
    if not tbody:
        return []

    rows = []
    for tr in tbody.find_all("tr", recursive=False):
        cols = tr.find_all(["th", "td"])
        if len(cols) < 5:
            continue

        assureur   = cols[0].get_text(separator=" ", strip=True)
        modele_nom = cols[1].get_text(separator=" ", strip=True)

        prime_mensuelle = _clean_number(cols[2].get_text(strip=True))
        remboursement   = _clean_number(cols[3].get_text(strip=True))
        prime_nette     = _clean_number(cols[4].get_text(strip=True))

        # Franchise non applicable pour cet âge (ex : enfant + franchise 1000+)
        if prime_mensuelle is None:
            continue

        rows.append({
            "npa":               npa,
            "canton":            canton,
            "ville":             ville,
            "region_num":        region_num,
            "annee_naissance":   annee_naissance,
            "franchise":         franchise,
            "avec_accident":     avec_accident,
            "modele_categorie":  modele_categorie,
            "modele_nom":        modele_nom,
            "assureur":          assureur,
            "prime_mensuelle":   prime_mensuelle,
            "remboursement":     remboursement,
            "prime_nette":       prime_nette,
        })

    return rows


# ---------------------------------------------------------------------------
# Requête primes
# ---------------------------------------------------------------------------

def fetch_premiums(location_id: str, npa: str, canton: str, ville: str, region_num: int,
                   annee_naissance: int, franchise: int, coverage: int,
                   modele: str) -> list[dict]:
    params = {
        "location_id": location_id,
        "yob[0]":      annee_naissance,
        "franchise[0]": franchise,
        "coverage[0]": coverage,
        "models[]":    modele,
        "display":     "savings",
    }
    for attempt in range(1, MAX_RETRIES + 2):
        try:
            r = SESSION.get(f"{BASE_URL}/de/praemien", params=params, timeout=20)
            r.raise_for_status()
            return parse_result_table(
                r.text, npa, canton, ville, region_num,
                annee_naissance, franchise, bool(coverage), modele,
            )
        except Exception as exc:
            if attempt <= MAX_RETRIES:
                print(f"  [retry {attempt}/{MAX_RETRIES}] {exc}", file=sys.stderr)
                time.sleep(DELAY * 2)
            else:
                print(f"  [SKIP] npa={npa} yob={annee_naissance} fr={franchise} "
                      f"cov={coverage} model={modele}: {exc}", file=sys.stderr)
                return []
    return []


# ---------------------------------------------------------------------------
# Gestion de l'état (reprise)
# ---------------------------------------------------------------------------

def load_state() -> dict:
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"location_ids": {}, "done_combos": []}


def save_state(state: dict) -> None:
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False)


def combo_key(npa, yob, franchise, coverage, model) -> str:
    return f"{npa}:{yob}:{franchise}:{coverage}:{model}"


# ---------------------------------------------------------------------------
# Conversion JSONL → JSON final
# ---------------------------------------------------------------------------

def finalize_json() -> None:
    print("\nConversion JSONL → primes.json …")
    rows = []
    if os.path.exists(JSONL_FILE):
        with open(JSONL_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        rows.append(json.loads(line))
                    except json.JSONDecodeError:
                        pass
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print(f"✓ {len(rows):,} lignes → {os.path.abspath(OUTPUT_JSON)}")
    print(f"  Taille : {os.path.getsize(OUTPUT_JSON) / 1_048_576:.1f} MB")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    import argparse
    parser = argparse.ArgumentParser(description="Scrape primes LAMal 2026")
    parser.add_argument("--max-combos", type=int, default=None,
                        help="Limite le nombre de combinaisons phase 2 (test)")
    args = parser.parse_args()

    os.makedirs(DATA_DIR, exist_ok=True)

    state       = load_state()
    location_ids: Dict[str, str] = state.get("location_ids", {})
    done_combos: Set[str]        = set(state.get("done_combos", []))

    # Gestion Ctrl+C propre
    interrupted = False

    def handle_signal(sig, frame):
        nonlocal interrupted
        print("\n\nInterruption reçue — sauvegarde de l'état en cours …", file=sys.stderr)
        interrupted = True

    signal.signal(signal.SIGINT,  handle_signal)
    signal.signal(signal.SIGTERM, handle_signal)

    # ------------------------------------------------------------------
    # Phase 1 — Résolution des location_id (42 NPAs)
    # ------------------------------------------------------------------
    npas_to_resolve = [npa for npa in NPA_MAP if npa not in location_ids]
    if npas_to_resolve:
        print(f"Phase 1 : résolution de {len(npas_to_resolve)} location_id(s) …\n")
        for npa in npas_to_resolve:
            if interrupted:
                break
            loc_id = get_location_id(npa)
            if loc_id:
                location_ids[npa] = loc_id
                print(f"  {npa} ({NPA_MAP[npa][0]}/{NPA_MAP[npa][2]}) → {loc_id}")
            else:
                print(f"  {npa} → ÉCHEC (sera ignoré)", file=sys.stderr)
            time.sleep(DELAY)

        state["location_ids"] = location_ids
        save_state(state)
    else:
        print(f"Phase 1 : {len(location_ids)} location_id(s) déjà en cache.\n")

    if interrupted:
        save_state(state)
        sys.exit(0)

    # ------------------------------------------------------------------
    # Phase 2 — Scraping des primes (6 048 combinaisons)
    # ------------------------------------------------------------------
    tasks = [
        (npa, yob, fr, cov, model)
        for npa    in NPA_MAP
        for yob    in ANNEES_NAISSANCE
        for fr     in FRANCHISES_PAR_YOB[yob]
        for cov    in COVERAGES
        for model  in MODELS
        if combo_key(npa, yob, fr, cov, model) not in done_combos
    ]

    if args.max_combos is not None:
        tasks = tasks[:args.max_combos]

    already_done = TOTAL_COMBOS - len(tasks)
    done_count   = already_done
    new_rows     = 0
    since_save   = 0

    if already_done:
        print(f"Reprise : {already_done} combinaisons déjà traitées, "
              f"{len(tasks)} restantes.\n")

    print(f"Phase 2 : {len(tasks)} combinaisons à scraper "
          f"(total {TOTAL_COMBOS}) …\n")

    jsonl_handle = open(JSONL_FILE, "a", encoding="utf-8")

    try:
        for (npa, yob, fr, cov, model) in tasks:
            if interrupted:
                break

            done_count += 1
            canton, region_num, ville = NPA_MAP[npa]
            label = (f"[{done_count}/{TOTAL_COMBOS}] "
                     f"{canton}/{ville} yob={yob} fr={fr} "
                     f"acc={'Y' if cov else 'N'} {model}")

            if npa not in location_ids:
                print(f"{label}  ✗ (location_id manquant)")
                key = combo_key(npa, yob, fr, cov, model)
                done_combos.add(key)
                since_save += 1
            else:
                rows = fetch_premiums(
                    location_ids[npa], npa, canton, ville, region_num,
                    yob, fr, cov, model,
                )

                for row in rows:
                    jsonl_handle.write(json.dumps(row, ensure_ascii=False) + "\n")

                new_rows   += len(rows)
                since_save += 1
                key = combo_key(npa, yob, fr, cov, model)
                done_combos.add(key)

                status = f"✓ {len(rows)} lignes" if rows else "∅ (franchise/modèle N/A)"
                print(f"{label}  {status}")

            # Sauvegarde périodique de l'état
            if since_save >= SAVE_EVERY:
                jsonl_handle.flush()
                state["done_combos"] = list(done_combos)
                save_state(state)
                since_save = 0

            time.sleep(DELAY)

    finally:
        jsonl_handle.flush()
        jsonl_handle.close()
        state["done_combos"] = list(done_combos)
        save_state(state)

    if interrupted:
        print(f"\nInterruption propre. {done_count}/{TOTAL_COMBOS} combinaisons traitées.")
        print(f"Relancez le script pour reprendre.")
        sys.exit(0)

    # ------------------------------------------------------------------
    # Phase 3 — Consolidation finale JSONL → JSON
    # ------------------------------------------------------------------
    finalize_json()

    # Nettoyage des fichiers intermédiaires si tout est OK
    for f in [JSONL_FILE, STATE_FILE]:
        try:
            os.remove(f)
        except OSError:
            pass

    print(f"\nTerminé. {new_rows:,} nouvelles lignes ajoutées.")


if __name__ == "__main__":
    main()
