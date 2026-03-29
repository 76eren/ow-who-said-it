import { useState } from "react";
import useHeroService from "../services/useHeroService";

export default function Game() {
  const heroes = useHeroService();
  const [points] = useState(0);

  const totalQuotes = heroes.reduce((sum, hero) => {
    return (
      sum +
      Object.values(hero.heroesQuotes).reduce((quoteSum, groupQuotes) => {
        return quoteSum + groupQuotes.length;
      }, 0)
    );
  }, 0);

  return (
    <div>
      <h1 className="text-3xl underline font-bold">Game</h1>
      <p className="mt-4">Loaded heroes: {heroes.length}</p>
      <p>Total quotes: {totalQuotes}</p>
      <p>Points: {points}</p>
    </div>
  );
}
