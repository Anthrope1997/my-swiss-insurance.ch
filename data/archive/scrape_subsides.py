#!/usr/bin/env python3
"""
Scrape les informations sur les subsides LAMal pour les 26 cantons suisses.
Version sans API Claude : extraction par regex + heuristiques.

Usage :
    python3 scripts/scrape_subsides.py

Requirements :
    pip install playwright beautifulsoup4
    playwright install chromium

Output :
    lib/data/subsidesLamal.json  — données structurées
    lib/data/subsidesLamal.md    — rapport lisible
"""

import asyncio
import copy
import json
import os
import re
import sys
from datetime import date
from typing import Optional
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

TODAY = date.today().isoformat()

CANTONS = {
    "AG": {"nom": "Argovie",                       "url": "https://www.sva-ag.ch/pv",               "langue": "de"},
    "AI": {"nom": "Appenzell Rhodes-Intérieures",   "url": "https://www.ai.ch/",                     "langue": "de"},
    "AR": {"nom": "Appenzell Rhodes-Extérieures",   "url": "http://www.sovar.ch/",                   "langue": "de"},
    "BE": {"nom": "Berne",                          "url": "https://www.asv.dij.be.ch",              "langue": "de"},
    "BL": {"nom": "Bâle-Campagne",                  "url": "https://www.sva-bl.ch/",                 "langue": "de"},
    "BS": {"nom": "Bâle-Ville",                     "url": "https://www.asb.bs.ch/",                 "langue": "de"},
    "FR": {"nom": "Fribourg",                       "url": "https://www.ecasfr.ch/",                 "langue": "fr"},
    "GE": {"nom": "Genève",                         "url": "https://www.ge.ch",                      "langue": "fr"},
    "GL": {"nom": "Glaris",                         "url": "https://www.gl.ch/",                     "langue": "de"},
    "GR": {"nom": "Grisons",                        "url": "https://www.sva.gr.ch/",                 "langue": "de"},
    "JU": {"nom": "Jura",                           "url": "https://www.ecasjura.ch/",               "langue": "fr"},
    "LU": {"nom": "Lucerne",                        "url": "http://www.was-luzern.ch/ak",            "langue": "de"},
    "NE": {"nom": "Neuchâtel",                      "url": "https://www.ne.ch/",                     "langue": "fr"},
    "NW": {"nom": "Nidwald",                        "url": "http://www.aknw.ch/",                    "langue": "de"},
    "OW": {"nom": "Obwald",                         "url": "https://www.akow.ch/ipv",                "langue": "de"},
    "SG": {"nom": "Saint-Gall",                     "url": "https://www.svasg.ch/ipv",               "langue": "de"},
    "SH": {"nom": "Schaffhouse",                    "url": "https://www.svash.ch/",                  "langue": "de"},
    "SO": {"nom": "Soleure",                        "url": "http://www.akso.ch/",                    "langue": "de"},
    "SZ": {"nom": "Schwyz",                         "url": "http://www.aksz.ch/",                    "langue": "de"},
    "TG": {"nom": "Thurgovie",                      "url": "https://gesundheit.tg.ch/",              "langue": "de"},
    "TI": {"nom": "Tessin",                         "url": "https://www.ti.ch/",                     "langue": "it"},
    "UR": {"nom": "Uri",                            "url": "https://www.ur.ch/praemienverbilligung", "langue": "de"},
    "VD": {"nom": "Vaud",                           "url": "https://www.vd.ch",                      "langue": "fr"},
    "VS": {"nom": "Valais",                         "url": "https://www.avs.vs.ch/",                 "langue": "fr"},
    "ZG": {"nom": "Zoug",                           "url": "https://www.akzug.ch/ipv/",              "langue": "de"},
    "ZH": {"nom": "Zurich",                         "url": "https://svazurich.ch",                   "langue": "de"},
}

KEYWORDS_FR = ["subside", "réduction", "prime", "conditions", "demande", "formulaire", "revenu", "ipv", "ipt"]
KEYWORDS_DE = ["prämienverbilligung", "verbilligung", "bedingungen", "antrag", "formular", "einkommen", "ipv"]
KEYWORDS_IT = ["riduzione", "premio", "condizioni", "domanda", "formulario", "reddito", "ipv"]
ALL_KEYWORDS = KEYWORDS_FR + KEYWORDS_DE + KEYWORDS_IT

OUTPUT_JSON = "lib/data/subsidesLamal.json"
OUTPUT_MD   = "lib/data/subsidesLamal.md"

MIN_DELAY = 2
MAX_DELAY = 3

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
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text[:15000]


def extract_links(html: str, base_url: str) -> list[tuple[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    links = []
    seen = set()
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if href.startswith(("mailto:", "tel:", "#", "javascript:")):
            continue
        text = a.get_text(strip=True)
        full_url = urljoin(base_url, href)
        if full_url in seen:
            continue
        seen.add(full_url)
        if same_domain(base_url, full_url) and is_relevant_link(href, text):
            links.append((full_url, text))
    return links


def find_form_urls(html: str, base_url: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    urls = []
    form_keywords = ["formulaire", "formular", "formulario", "antrag", "demande", "download", "pdf"]
    for a in soup.find_all("a", href=True):
        href = a["href"].lower()
        text = a.get_text(strip=True).lower()
        if any(kw in href or kw in text for kw in form_keywords):
            full = urljoin(base_url, a["href"])
            urls.append(full)
    return urls[:3]


def find_contact(text: str) -> Optional[str]:
    # Email
    m = re.search(r"[\w.+-]+@[\w-]+\.[a-z]{2,}", text)
    if m:
        return m.group(0)
    # Phone CH
    m = re.search(r"(\+41|0)[\s\-]?\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}", text)
    if m:
        return m.group(0).strip()
    return None


def find_chf_amounts(text: str) -> list[int]:
    """Trouve tous les montants CHF dans le texte (> 100 pour filtrer les %)."""
    matches = re.findall(r"(?:CHF|Fr\.?)\s*([\d''\s]+)", text, re.IGNORECASE)
    results = []
    for m in matches:
        try:
            val = int(re.sub(r"[\s''']", "", m))
            if 100 < val < 200000:
                results.append(val)
        except ValueError:
            pass
    # Aussi les nombres seuls précédés/suivis de CHF
    matches2 = re.findall(r"([\d''\s]{4,9})\s*(?:CHF|Fr\.?|francs?)", text, re.IGNORECASE)
    for m in matches2:
        try:
            val = int(re.sub(r"[\s''']", "", m))
            if 100 < val < 200000:
                results.append(val)
        except ValueError:
            pass
    return sorted(set(results))


def detect_automatic(text: str) -> Optional[bool]:
    text_l = text.lower()
    auto_yes = ["automatiquement", "automatisch", "automatica", "sans demande", "ohne antrag", "d'office"]
    auto_no  = ["formulaire", "demande à déposer", "antrag stellen", "müssen sie", "doit être demandé"]
    if any(kw in text_l for kw in auto_yes):
        return True
    if any(kw in text_l for kw in auto_no):
        return False
    return None


def extract_deadline(text: str) -> Optional[str]:
    patterns = [
        r"(?:délai|frist|termine)[^\n]{0,80}(31\s+(?:mars|marzo|märz|december|dezember|décembre)[^\n]{0,20})",
        r"(?:jusqu'au|bis zum|entro il)\s+(\d{1,2}[\s.]\w+[\s.]\d{4})",
        r"(?:avant le|vor dem|prima del)\s+(\d{1,2}[\s.]\w+[\s.]\d{4})",
        r"(\d{1,2}\.\d{1,2}\.\d{4})",
    ]
    for pat in patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            return m.group(1).strip()
    return None


def extract_snippet(text: str, keyword: str, window: int = 200) -> str:
    idx = text.lower().find(keyword.lower())
    if idx == -1:
        return ""
    start = max(0, idx - 50)
    end   = min(len(text), idx + window)
    return text[start:end].replace("\n", " ").strip()


# ---------------------------------------------------------------------------
# Playwright scraper
# ---------------------------------------------------------------------------

async def fetch_page(page, url: str, timeout: int = 25000) -> Optional[str]:
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

    pages_text: list[str] = []
    all_html: list[str] = []
    visited: set[str] = set()

    html = await fetch_page(page, base_url)
    if not html:
        print(f"  ❌ Page principale inaccessible")
        return make_record(code, info, "", [])

    text = clean_text(html)
    pages_text.append(f"=== PAGE PRINCIPALE: {base_url} ===\n{text}")
    all_html.append(html)
    visited.add(base_url)

    links = extract_links(html, base_url)
    print(f"  🔗 {len(links)} liens pertinents trouvés")

    for link_url, link_text in links[:6]:
        if link_url in visited:
            continue
        visited.add(link_url)
        print(f"  → {link_text[:55]} ({link_url})")
        await asyncio.sleep(1)
        sub_html = await fetch_page(page, link_url)
        if sub_html:
            sub_text = clean_text(sub_html)
            pages_text.append(f"\n=== SOUS-PAGE: {link_url} ===\n{sub_text}")
            all_html.append(sub_html)
        if len(pages_text) >= 5:
            break

    combined = "\n\n".join(pages_text)
    print(f"  📄 {len(combined)} caractères collectés")
    return make_record(code, info, combined, all_html)


# ---------------------------------------------------------------------------
# Extraction heuristique
# ---------------------------------------------------------------------------

def make_record(code: str, info: dict, combined_text: str, all_html: list[str]) -> dict:
    base_url = info["url"]

    # Montants CHF
    amounts = find_chf_amounts(combined_text)

    # URLs de formulaire
    form_urls: list[str] = []
    for html in all_html:
        form_urls.extend(find_form_urls(html, base_url))
    form_url = form_urls[0] if form_urls else None

    # Contact
    contact = find_contact(combined_text)

    # Attribution automatique
    automatic = detect_automatic(combined_text)

    # Délai
    deadline = extract_deadline(combined_text)

    # Snippets contextuels pour les notes
    notes_parts = []
    for kw in ["revenu", "einkommen", "reddito", "condition", "bedingung"]:
        snippet = extract_snippet(combined_text, kw, 250)
        if snippet:
            notes_parts.append(snippet)
            break

    # Seuils de revenu : chercher des patterns "CHF XX XXX" proches de mots-clés revenu
    revenu_snippets = []
    for kw in ["revenu", "einkommen", "reddito", "massgebend"]:
        idx = combined_text.lower().find(kw)
        if idx != -1:
            chunk = combined_text[max(0, idx-50):idx+400]
            revenu_snippets.append(chunk)

    rev_amounts = find_chf_amounts(" ".join(revenu_snippets)) if revenu_snippets else []

    # Heuristique grossière : 1er montant revenu = seul, 2ème = couple, 3ème = famille
    rev_seul    = rev_amounts[0] if len(rev_amounts) > 0 else None
    rev_couple  = rev_amounts[1] if len(rev_amounts) > 1 else None
    rev_famille = rev_amounts[2] if len(rev_amounts) > 2 else None

    # Montants subsides (hors revenus)
    subside_amounts = [a for a in amounts if a not in (rev_amounts or [])]

    notes = " | ".join(notes_parts[:1]) if not combined_text.strip() else (
        "Site inaccessible." if not combined_text.strip() else ""
    )
    if not combined_text.strip():
        notes = "Site inaccessible lors du scraping."

    return {
        "canton": code,
        "nom": info["nom"],
        "url": base_url,
        "langue": info["langue"],
        "derniere_maj": TODAY,
        "conditions": {
            "revenu_max_seul":    rev_seul,
            "revenu_max_couple":  rev_couple,
            "revenu_max_famille": rev_famille,
            "residence_requise":  None,
            "autres": [],
        },
        "montants": {
            "adulte":       subside_amounts[0] if len(subside_amounts) > 0 else None,
            "enfant":       subside_amounts[1] if len(subside_amounts) > 1 else None,
            "jeune_adulte": subside_amounts[2] if len(subside_amounts) > 2 else None,
            "details":      [str(a) + " CHF" for a in subside_amounts[:6]],
        },
        "procedure": {
            "automatique":     automatic,
            "formulaire_url":  form_url,
            "documents_requis": [],
            "delai":           deadline,
            "contact":         contact,
        },
        "notes": notes,
    }


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
        f"\n_Données extraites le {TODAY} (extraction automatique sans IA)_\n",
        "---\n",
    ]

    for r in records:
        c = r["conditions"]
        m = r["montants"]
        p = r["procedure"]

        lines.append(f"## {r['canton']} — {r['nom']}")
        lines.append(f"**Source :** [{r['url']}]({r['url']})\n")

        lines.append("### Conditions")
        lines.append(f"- Revenu max (seul) : {c['revenu_max_seul'] or '—'} CHF")
        lines.append(f"- Revenu max (couple) : {c['revenu_max_couple'] or '—'} CHF")
        lines.append(f"- Revenu max (famille) : {c['revenu_max_famille'] or '—'} CHF")
        lines.append(f"- Résidence : {c['residence_requise'] or '—'}")

        lines.append("\n### Montants détectés")
        lines.append(f"- Adulte : {m['adulte'] or '—'} CHF")
        lines.append(f"- Enfant : {m['enfant'] or '—'} CHF")
        lines.append(f"- Jeune adulte : {m['jeune_adulte'] or '—'} CHF")
        if m["details"]:
            lines.append(f"- Tous montants : {', '.join(m['details'])}")

        lines.append("\n### Procédure")
        auto = "Oui" if p["automatique"] is True else ("Non" if p["automatique"] is False else "—")
        lines.append(f"- Attribution automatique : {auto}")
        lines.append(f"- Formulaire : {p['formulaire_url'] or '—'}")
        lines.append(f"- Délai : {p['delai'] or '—'}")
        lines.append(f"- Contact : {p['contact'] or '—'}")

        if r.get("notes"):
            lines.append(f"\n> ⚠️ {r['notes']}")

        lines.append("\n---\n")

    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"📝 Markdown sauvegardé : {path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

async def main():
    # Reprise
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
            record = await scrape_canton(page, code, info)
            results.append(record)
            save_json(results, OUTPUT_JSON)

            if i < len(cantons_todo) - 1:
                delay = MIN_DELAY + (MAX_DELAY - MIN_DELAY) * (i % 2)
                print(f"  ⏳ Pause {delay}s…")
                await asyncio.sleep(delay)

        await browser.close()

    results.sort(key=lambda r: r["canton"])
    save_json(results, OUTPUT_JSON)
    save_markdown(results, OUTPUT_MD)

    found = sum(
        1 for r in results
        if r["conditions"]["revenu_max_seul"] is not None or r["montants"]["adulte"] is not None
    )
    print(f"\n✅ Terminé : {len(results)}/26 cantons, {found} avec données détectées.")
    print(f"   ⚠️  Résultats bruts — à vérifier canton par canton.")


if __name__ == "__main__":
    asyncio.run(main())
