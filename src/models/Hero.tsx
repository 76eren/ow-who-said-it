export type HeroQuotes = Record<string, string[]>;

export type Hero = {
  name: string;
  imageUrl: string;
  heroesQuotes: HeroQuotes;
};
