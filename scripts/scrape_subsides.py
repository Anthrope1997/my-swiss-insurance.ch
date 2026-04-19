#!/usr/bin/env python3
"""
Scrape les informations sur les subsides LAMal pour les 26 cantons suisses.

Usage :
    python3 scripts/scrape_subsides.py

Requirements :
    pip install playwright anthropic beautifulsoup4
    playwright install chromium

Output :
    lib/data/subsidesLamal.json  — données structurées
    lib/data/subsidesLamal.md    — rapport lisible
"""

import asyncio
import json
import os
import re
import sys
import time
from datetime import date
from typing import Optional
from urllib.parse import urljoin, urlparse

import anthropic
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

TODAY = date.today().isoformat()

CANTONS = {
    "AG": {"nom": "Argovie",                        "url": "https://www.sva-ag.ch/pv",                   "langue": "de"},
    "AI": {"nom": "Appenzell Rhodes-Intérieures",    "url": "https://www.ai.ch/",                         "langue": "de"},
    "AR": {"nom": "Appenzell Rhodes-Extérieures",    "url": "http://www.sovar.ch/",                       "langue": "de"},
    "BE": {"nom": "Berne",                           "url": "https://www.asv.dij.be.ch",                  "langue": "de"},
    "BL": {"nom": "Bâle-Campagne",                   "url": "https://www.sva-bl.ch/",                     "langue": "de"},
    "BS": {"nom": "Bâle-Ville",                      "url": "https://www.asb.bs.ch/",                     "langue": "de"},
    "FR": {"nom": "Fribourg",                        "url": "https://www.ecasfr.ch/",                     "langue": "fr"},
    "GE": {"nom": "Genève",                          "url": "https://www.ge.ch",                          "langue": "fr"},
    "GL": {"nom": "Glaris",                          "url": "https://www.gl.ch/",                         "langue": "de"},
    "GR": {"nom": "Grisons",                         "url": "https://www.sva.gr.ch/",                     "langue": "de"},
    "JU": {"nom": "Jura",                            "url": "https://www.ecasjura.ch/",                   "langue": "fr"},
    "LU": {"nom": "Lucerne",                         "url": "http://www.was-luzern.ch/ak",                "langue": "de"},
    "NE": {"nom": "Neuchâtel",                       "url": "https://www.ne.ch/",                         "langue": "fr"},
    "NW": {"nom": "Nidwald",                         "url": "http://www.aknw.ch/",                        "langue": "de"},
    "OW": {"nom": "Obwald",                          "url": "https://www.akow.ch/ipv",                    "langue": "de"},
    "SG": {"nom": "Saint-Gall",                      "url": "https://www.svasg.ch/ipv",                   "langue": "de"},
    "SH": {"nom": "Schaffhouse",                     "url": "https://www.svash.ch/",                      "langue": "de"},
    "SO": {"nom": "Soleure",                         "url": "http://www.akso.ch/",                        "langue": "de"},
    "SZ": {"nom": "Schwyz",                          "url": "http://www.aksz.ch/",                        "langue": "de"},
    "TG": {"nom": "Thurgovie",                       "url": "https://gesundheit.tg.ch/",                  "langue": "de"},
    "TI": {"nom": "Tessin",                          "url": "https://www.ti.ch/",                         "langue": "it"},
    "UR": {"nom": "Uri",                             "url": "https://www.ur.ch/praemienverbilligung",     "langue": "de"},
    "VD": {"nom": "Vaud",                            "url": "https://www.vd.ch",                          "langue": "fr"},
    "VS": {"nom": "Valais",                          "url": "https://www.avs.vs.ch/",                     "langue": "fr"},
    "ZG": {"nom": "Zoug",                            "url": "https://www.akzug.ch/ipv/",                  "langue": "de"},
    "ZH": {"nom": "Zurich",                          "url": "https://svazurich.ch",                       "langue": "de"},
}

# Mots-clés pour identifier les pages pertinentes
KEYWORDS_FR = ["subside", "réduction", "prime", "conditions", "demande", "formulaire", "revenu"]
KEYWORDS_DE = ["prämienverbilligung", "verbilligung", "bedingungen", "antrag", "formular", "einkommen"]
KEYWORDS_IT = ["riduzione", "premio", "condizioni", "domanda", "formulario", "reddito"]
ALL_KEYWORDS = KEYWORDS_FR + KEYWORDS_DE + KEYWORDS_IT

OUTPUT_JSON = "lib/data/subsidesLamal.json"
OUTPUT_MD   = "lib/data/subsidesLamal.md"

# Délai entre requêtes (secondes)
MIN_DELAY = 2
MAX_DELAY = 3

EMPTY_RECORD = {
    "conditions": {
        "revenu_max_seul": None,
        "revenu_max_couple": None,
        "revenu_max_famille": None,
        "residence_requise": None,
        "autres": [],
    },
    "montants": {
        "adulte": None,
        "enfant": None,
        "jeune_adulte": None,
        "details": [],
    },
    "procedure": {
        "automatique": None,
        "formulaire_url": None,
        "documents_requis": [],
        "delai": None,
        "contact": None,
    },
    "notes": "",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def is_relevant_link(href: str, text: str) -> bool:
    combined = (href + " " + text).lower()
    return any(kw in combined for kw in ALL_KEYWORDS)


def same_domain(base_url: str, href: str) -> bool:
    try:
        base = urlparse(base_url)
        target = urlparse(urljoin(base_url, href))
        return base.netloc == target.netloc
    except Exception:
        return False


def clean_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header"]):
        tag.decompose()
    text = soup.get_text(separator="\n", strip=True)
    # Collapse blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text[:12000]  # limite pour l'API


def extract_links(html: str, base_url: str) -> list[tuple[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        text = a.get_text(strip=True)
        full_url = urljoin(base_url, href)
        if same_domain(base_url, full_url) and is_relevant_link(href, text):
            links.append((full_url, text))
    return links


# ---------------------------------------------------------------------------
# Playwright scraper
# ---------------------------------------------------------------------------

async def fetch_page(page, url: str, timeout: int = 20000) -> Optional[str]:
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=timeout)
        await page.wait_for_timeout(1500)
        return await page.content()
    except Exception as e:
        print(f"    ⚠️  Erreur fetch {url}: {e}")
        return None


async def scrape_canton(page, code: str, info: dict) -> dict:
    base_url = info["url"]
    print(f"\n{'='*60}")
    print(f"[{code}] {info['nom']} — {base_url}")

    pages_content: list[str] = []
    visited: set[str] = set()

    # Page principale
    html = await fetch_page(page, base_url)
    if not html:
        print(f"  ❌ Page principale inaccessible")
        return build_record(code, info, "")

    text = clean_text(html)
    pages_content.append(f"=== PAGE PRINCIPALE: {base_url} ===\n{text}")
    visited.add(base_url)

    # Liens internes pertinents (max 4 sous-pages)
    links = extract_links(html, base_url)
    print(f"  🔗 {len(links)} liens pertinents trouvés")

    for link_url, link_text in links[:6]:
        if link_url in visited:
            continue
        visited.add(link_url)
        print(f"  → Visite : {link_text[:60]} ({link_url})")
        await asyncio.sleep(1)
        sub_html = await fetch_page(page, link_url)
        if sub_html:
            sub_text = clean_text(sub_html)
            pages_content.append(f"\n=== SOUS-PAGE: {link_url} ===\n{sub_text}")
        if len(pages_content) >= 5:
            break

    combined = "\n\n".join(pages_content)
    print(f"  📄 {len(combined)} caractères collectés")
    return build_record(code, info, combined)


# ---------------------------------------------------------------------------
# Claude extraction
# ---------------------------------------------------------------------------

def build_record(code: str, info: dict, raw_text: str) -> dict:
    return {
        "canton": code,
        "nom": info["nom"],
        "url": info["url"],
        "langue": info["langue"],
        "derniere_maj": TODAY,
        "_raw": raw_text,
        **EMPTY_RECORD,
    }


def extract_with_claude(client: anthropic.Anthropic, record: dict) -> dict:
    raw = record.pop("_raw", "")
    if not raw.strip():
        record["notes"] = "Site inaccessible lors du scraping."
        return record

    code = record["canton"]
    nom  = record["nom"]

    prompt = f"""Tu es un expert en assurances sociales suisses. Voici le contenu brut extrait du site officiel
du canton {code} ({nom}) concernant les subsides LAMal (réduction de primes).

TON TRAVAIL :
1. Extraire les informations demandées. Si une info est absente, mets null.
2. Traduire en français tout contenu en allemand ou italien.
3. Ne rien inventer : uniquement ce qui est explicitement présent dans le texte.

CONTENU DU SITE :
---
{raw[:10000]}
---

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de texte avant/après) :
{{
  "conditions": {{
    "revenu_max_seul": <nombre CHF ou null>,
    "revenu_max_couple": <nombre CHF ou null>,
    "revenu_max_famille": <nombre CHF ou null>,
    "residence_requise": <string ou null>,
    "autres": [<liste de conditions supplémentaires en français>]
  }},
  "montants": {{
    "adulte": <montant CHF/an ou null>,
    "enfant": <montant CHF/an ou null>,
    "jeune_adulte": <montant CHF/an ou null>,
    "details": [<descriptions des tranches ou montants spécifiques>]
  }},
  "procedure": {{
    "automatique": <true/false/null>,
    "formulaire_url": <URL exacte du formulaire ou null>,
    "documents_requis": [<liste de documents en français>],
    "delai": <string décrivant le délai ou null>,
    "contact": <email ou téléphone ou null>
  }},
  "notes": "<observations importantes en français, ou chaîne vide>"
}}"""

    try:
        response = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}],
        )
        raw_json = response.content[0].text.strip()
        # Nettoie si Claude a quand même mis des backticks
        raw_json = re.sub(r"^```json\s*", "", raw_json)
        raw_json = re.sub(r"```$", "", raw_json).strip()
        extracted = json.loads(raw_json)
        record.update(extracted)
        print(f"  ✅ Extraction Claude réussie")
    except json.JSONDecodeError as e:
        print(f"  ⚠️  JSON invalide depuis Claude : {e}")
        record["notes"] = "Erreur parsing réponse Claude."
    except Exception as e:
        print(f"  ⚠️  Erreur Claude API : {e}")
        record["notes"] = f"Erreur API : {e}"

    return record


# ---------------------------------------------------------------------------
# Output writers
# ---------------------------------------------------------------------------

def save_json(records: list[dict], path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)
    print(f"\n💾 JSON sauvegardé : {path}")


def save_markdown(records: list[dict], path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    lines = [
        "# Subsides LAMal — 26 cantons suisses",
        f"\n_Données extraites le {TODAY}_\n",
        "---\n",
    ]

    for r in records:
        c  = r["conditions"]
        m  = r["montants"]
        p  = r["procedure"]

        lines.append(f"## {r['canton']} — {r['nom']}")
        lines.append(f"**Source :** [{r['url']}]({r['url']})\n")

        lines.append("### Conditions")
        lines.append(f"- Revenu max (seul) : {c['revenu_max_seul'] or '—'} CHF")
        lines.append(f"- Revenu max (couple) : {c['revenu_max_couple'] or '—'} CHF")
        lines.append(f"- Revenu max (famille) : {c['revenu_max_famille'] or '—'} CHF")
        lines.append(f"- Résidence : {c['residence_requise'] or '—'}")
        if c["autres"]:
            for a in c["autres"]:
                lines.append(f"- {a}")

        lines.append("\n### Montants")
        lines.append(f"- Adulte : {m['adulte'] or '—'} CHF/an")
        lines.append(f"- Enfant : {m['enfant'] or '—'} CHF/an")
        lines.append(f"- Jeune adulte en formation : {m['jeune_adulte'] or '—'} CHF/an")
        if m["details"]:
            for d in m["details"]:
                lines.append(f"- {d}")

        lines.append("\n### Procédure")
        auto = "Oui" if p["automatique"] is True else ("Non" if p["automatique"] is False else "—")
        lines.append(f"- Attribution automatique : {auto}")
        lines.append(f"- Formulaire : {p['formulaire_url'] or '—'}")
        if p["documents_requis"]:
            lines.append("- Documents requis :")
            for doc in p["documents_requis"]:
                lines.append(f"  - {doc}")
        lines.append(f"- Délai : {p['delai'] or '—'}")
        lines.append(f"- Contact : {p['contact'] or '—'}")

        if r.get("notes"):
            lines.append(f"\n> {r['notes']}")

        lines.append("\n---\n")

    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"📝 Markdown sauvegardé : {path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

async def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("❌ Variable ANTHROPIC_API_KEY manquante.")
        print("   Exécute : export ANTHROPIC_API_KEY=sk-ant-...")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    # Reprise : charge les résultats déjà obtenus
    results: list[dict] = []
    done_codes: set[str] = set()
    if os.path.exists(OUTPUT_JSON):
        try:
            with open(OUTPUT_JSON, encoding="utf-8") as f:
                results = json.load(f)
            done_codes = {r["canton"] for r in results}
            print(f"♻️  Reprise : {len(done_codes)} cantons déjà traités ({', '.join(sorted(done_codes))})")
        except Exception:
            pass

    cantons_todo = {k: v for k, v in CANTONS.items() if k not in done_codes}
    print(f"🚀 {len(cantons_todo)} cantons à traiter\n")

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (compatible; SubsidesBot/1.0; +https://my-swiss-insurance.ch)",
            locale="fr-CH",
        )
        page = await context.new_page()

        for i, (code, info) in enumerate(cantons_todo.items()):
            # Scraping Playwright
            record = await scrape_canton(page, code, info)

            # Extraction Claude
            print(f"  🤖 Extraction Claude pour {code}…")
            record = extract_with_claude(client, record)

            results.append(record)

            # Sauvegarde intermédiaire après chaque canton
            save_json(results, OUTPUT_JSON)

            # Délai poli entre cantons
            if i < len(cantons_todo) - 1:
                delay = MIN_DELAY + (MAX_DELAY - MIN_DELAY) * (i % 2)
                print(f"  ⏳ Pause {delay}s…")
                await asyncio.sleep(delay)

        await browser.close()

    # Tri par code canton
    results.sort(key=lambda r: r["canton"])

    save_json(results, OUTPUT_JSON)
    save_markdown(results, OUTPUT_MD)

    # Résumé
    found = sum(1 for r in results if r["conditions"]["revenu_max_seul"] is not None
                or r["montants"]["adulte"] is not None)
    print(f"\n✅ Terminé : {len(results)}/26 cantons traités, {found} avec données substantielles.")


if __name__ == "__main__":
    asyncio.run(main())
