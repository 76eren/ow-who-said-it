import requests
from bs4 import BeautifulSoup
import json

url = "https://overwatch.blizzard.com/en-us/heroes/"

response = requests.get(
    url,
    headers={"User-Agent": "Mozilla/5.0"},
)

soup = BeautifulSoup(response.text, "html.parser")

gallery = soup.find("blz-media-gallery", class_="heroCards")

results = []

for hero in gallery.find_all("a", class_="hero-card"):
    name_tag = hero.find("h2")
    img_tag = hero.find("blz-image")

    if name_tag and img_tag:
        results.append({"name": name_tag.text.strip(), "image": img_tag.get("src")})

# Save to JSON file
with open("heroes.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=4, ensure_ascii=False)
