import type { Hero, HeroQuotes } from "../models/Hero";
import heroesManifest from "../json/heroes/heroes.json";

type HeroManifestEntry = {
  name: string;
  image: string;
};

const heroQuoteModules = import.meta.glob("../json/heroes_quotes/*.json", {
  eager: true,
}) as Record<string, { default: HeroQuotes }>;

function toQuoteFileKey(heroName: string): string {
  return heroName.replace(/[^\p{L}\p{N}]/gu, "_");
}

const quotesByFileKey: Record<string, HeroQuotes> = {};
for (const [path, moduleValue] of Object.entries(heroQuoteModules)) {
  const fileName = path.split("/").pop() ?? "";
  const fileKey = fileName.replace(".json", "");
  quotesByFileKey[fileKey] = moduleValue.default;
}

const heroes: Hero[] = (heroesManifest as HeroManifestEntry[]).map((hero) => ({
  name: hero.name,
  imageUrl: hero.image,
  heroesQuotes: quotesByFileKey[toQuoteFileKey(hero.name)] ?? {},
}));

export default function useHeroService(): Hero[] {
  return heroes;
}
