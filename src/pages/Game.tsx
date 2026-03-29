import { useState } from "react";
import useHeroService from "../services/useHeroService";
import type { Hero } from "../models/Hero";

export default function Game() {
  const heroes = useHeroService();
  const [points, setPoints] = useState(0);

  const [selectedHeroes, setSelectedHeroes] = useState<Hero[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Map<string, string>>();
  const [userSelectedHero, setUserSelectedHero] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function startNewRound() {
    const heroesPair = getTwoRandomHeroes();
    setSelectedHeroes(heroesPair);
    selectRandomQuote(heroesPair);
    setUserSelectedHero(null);
    setGameOver(false);
  }

  function getTwoRandomHeroes(): Hero[] {
    const hero1 = heroes[Math.floor(Math.random() * heroes.length)];
    const hero2 = heroes[Math.floor(Math.random() * heroes.length)];

    if (hero1.name === hero2.name) {
      // If the same hero is selected twice, we need to select a different second hero
      do {
        hero2 = heroes[Math.floor(Math.random() * heroes.length)];
      } while (hero1.name === hero2.name);
    }
    return [hero1, hero2];
  }

  function selectRandomQuote(heroesPair: Hero[]) {
    const randomHero =
      heroesPair[Math.floor(Math.random() * heroesPair.length)];

    const quoteCategories = Object.keys(randomHero.heroesQuotes);
    const randomCategory =
      quoteCategories[Math.floor(Math.random() * quoteCategories.length)];

    const quotes = randomHero.heroesQuotes[randomCategory];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // if the selected heroes name is inside of the quote, we want to replace it with "[Hero to guess]"
    const quoteWithPlaceholder = randomQuote.replace(
      new RegExp(`\\b${randomHero.name}\\b`, "gi"),
      "[Hero to guess]",
    );

    setSelectedQuote(new Map([[randomHero.name, quoteWithPlaceholder]]));
  }

  function getUserHighScore() {
    let highScore = localStorage.getItem("highScore");
    return highScore ? parseInt(highScore) : 0;
  }

  function onSubmit() {
    if (!selectedQuote || !userSelectedHero) {
      return;
    }

    const correctHero = selectedQuote.keys().next().value as string | undefined;
    if (!correctHero) {
      return;
    }

    if (userSelectedHero === correctHero) {
      setPoints((previousPoints) => {
        const newPoints = previousPoints + 1;
        if (newPoints > getUserHighScore()) {
          localStorage.setItem("highScore", newPoints.toString());
        }
        return newPoints;
      });

      startNewRound();
      return;
    }

    if (points > getUserHighScore()) {
      localStorage.setItem("highScore", points.toString());
    }

    setGameOver(true);
  }

  function restartAfterGameOver() {
    setPoints(0);
    startNewRound();
  }

  const quoteToGuess = selectedQuote
    ? Array.from(selectedQuote.values())[0]
    : "";
  const correctHero = selectedQuote?.keys().next().value as string | undefined;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-[0_18px_45px_rgba(34,58,97,0.14)] backdrop-blur-sm sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Who Said It?
        </h1>

        {!gameStarted ? (
          <div className="mt-8">
            <button
              className="rounded-md border border-[#f99e1a] bg-[#f99e1a] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-900 transition-colors duration-200 hover:bg-[#ffb13f]"
              onClick={() => {
                setGameStarted(true);
                setPoints(0);
                startNewRound();
              }}
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="mt-7 space-y-8">
            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-700">
              <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
                Points: {points}
              </p>
              <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
                High Score: {getUserHighScore()}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Guess This Quote
              </p>
              <p className="mt-2 text-lg font-semibold leading-8 text-slate-900 sm:text-xl">
                {quoteToGuess ? `"${quoteToGuess}"` : "Loading quote..."}
              </p>
            </div>

            {gameOver ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                Game Over! The correct hero was <strong>{correctHero}</strong>.
              </p>
            ) : null}

            <div className="w-full flex justify-center">
              <div className="inline-grid grid-cols-1 sm:grid-cols-2 gap-20">
                {selectedHeroes.map((hero) => (
                  <button
                    type="button"
                    key={hero.name}
                    onClick={() => setUserSelectedHero(hero.name)}
                    disabled={gameOver}
                    className={[
                      "flex flex-col items-center rounded-md transition-transform duration-200 hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7ec8]",
                      gameOver ? "cursor-default hover:scale-100" : "",
                      gameOver && hero.name === correctHero
                        ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-white"
                        : "",
                      gameOver &&
                      hero.name === userSelectedHero &&
                      hero.name !== correctHero
                        ? "ring-2 ring-red-500 ring-offset-2 ring-offset-white"
                        : "",
                      !gameOver && userSelectedHero === hero.name
                        ? "ring-2 ring-[#f99e1a] ring-offset-2 ring-offset-white"
                        : "",
                    ].join(" ")}
                    aria-pressed={userSelectedHero === hero.name}
                  >
                    <div className="w-full max-w-[256px]">
                      <img
                        src={hero.imageUrl}
                        alt={hero.name}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />

                      <div className="flex items-center justify-center rounded-b border border-t-0 border-[#9aa3ad] bg-white px-3 py-2">
                        <h2 className="text-sm font-extrabold tracking-wide text-[#2b2f33]">
                          {hero.name.toUpperCase()}
                        </h2>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              {gameOver ? (
                <button
                  type="button"
                  onClick={restartAfterGameOver}
                  className="rounded-md border border-[#f99e1a] bg-[#f99e1a] px-8 py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-900 transition-colors duration-200 hover:bg-[#ffb13f]"
                >
                  Play Again
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={!userSelectedHero}
                  className={[
                    "rounded-md px-8 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-200",
                    userSelectedHero
                      ? "border border-[#f99e1a] bg-[#f99e1a] text-slate-900 hover:bg-[#ffb13f]"
                      : "cursor-not-allowed border border-slate-300 bg-slate-200 text-slate-500",
                  ].join(" ")}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
