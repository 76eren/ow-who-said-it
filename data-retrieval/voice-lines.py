import json
import os
import re
from bs4 import BeautifulSoup
import curl_cffi

TEXT_FILTER = (
    " English: "  # This marks non English quotes which need to be filtered out, because otherwise they are easily to guess
)

all_heroes = [
    "Anran",
    "Domina",
    "Emre",
    "Jetpack_Cat",
    "Mizuki",
    "Vendetta",
    "Ana",
    "Ashe",
    "Baptiste",
    "Bastion",
    "Brigitte",
    "Cassidy",
    "D.Va",
    "Doomfist",
    "Echo",
    "Freja",
    "Genji",
    "Hanzo",
    "Hazard",
    "Illari",
    "Junker_Queen",
    "Junkrat",
    "Juno",
    "Kiriko",
    "Lifeweaver",
    "Lúcio",
    "Mauga",
    "Mei",
    "Mercy",
    "Moira",
    "Orisa",
    "Pharah",
    "Ramattra",
    "Reaper",
    "Reinhardt",
    "Roadhog",
    "Sigma",
    "Sojourn",
    "Soldier:_76",
    "Sombra",
    "Symmetra",
    "Torbjörn",
    "Tracer",
    "Venture",
    "Widowmaker",
    "Winston",
    "Wrecking_Ball",
    "Wuyang",
    "Zarya",
    "Zenyatta",
]


ALLOWED_SECTIONS = [
    "abilities",
    "chatter",
    "call-outs",
    "eliminations",
    "voice-lines",
    "interactions",
    "map-specific",
]

base_url = "https://overwatch.fandom.com/wiki/{}/Quotes"

os.makedirs("heroes_quotes", exist_ok=True)


def clean_text(text: str) -> str:
    return " ".join(text.split()).strip()


def safe_filename(hero_name: str) -> str:
    normalized = hero_name.replace(" ", "_")
    return re.sub(r'[<>:"/\\|?*]', "_", normalized)


def is_audio_or_link_only(text: str) -> bool:
    simplified = re.sub(r"[^a-z0-9]+", "", text.lower())
    if simplified in {"", "link", "playpause"}:
        return True

    without_link = re.sub(r"\b(link|play|pause)\b", "", text.lower())
    without_symbols = re.sub(r"[^a-z0-9]+", "", without_link)
    return without_symbols == ""


def extract_quotes_from_section(start_h2) -> list[str]:
    quotes = []

    for sibling in start_h2.find_next_siblings():
        if sibling.name == "h2":
            break

        if sibling.name in {"ul", "ol"}:
            for li in sibling.find_all("li"):
                text = clean_text(li.get_text(" ", strip=True))
                if text and not is_audio_or_link_only(text):
                    quotes.append(text)

        if sibling.name == "table":
            for row in sibling.find_all("tr"):
                cells = row.find_all("td")
                if not cells:
                    continue

                text_candidates = []
                for cell in cells:
                    if cell.find("audio") or cell.find("a", class_="ext-audiobutton"):
                        continue

                    text = clean_text(cell.get_text(" ", strip=True))
                    if not text or is_audio_or_link_only(text):
                        continue

                    if TEXT_FILTER in text:
                        continue

                    text_candidates.append(text)

                if not text_candidates:
                    continue

                quotes.append(text_candidates[-1])

    return list(dict.fromkeys(quotes))


for hero in all_heroes:
    print(f"Processing {hero}...")

    url = base_url.format(hero)
    print("Making request to url:", url)

    response = curl_cffi.get(
        url,
        impersonate="chrome",
        http_version="v3",
        timeout=45,
    )

    if response.status_code != 200:
        print(f"Failed: {hero}")
        print(f"Status code: {response.status_code}")
        continue

    soup = BeautifulSoup(response.text, "html.parser")
    content_root = soup.find("div", class_="mw-parser-output")

    if not content_root:
        print(f"Could not find article content for {hero}")
        continue

    data = {}

    for h2 in content_root.find_all("h2"):
        headline = h2.find("span", class_="mw-headline")
        if not headline or headline.text.strip().lower() not in ALLOWED_SECTIONS:
            continue

        section_name = headline.text.strip()
        quotes = extract_quotes_from_section(h2)

        if quotes:
            data[section_name.lower()] = quotes

    filename = f"heroes_quotes/{safe_filename(hero)}.json"
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Saved {len(data)} sections to {filename}")


print("Done!")
