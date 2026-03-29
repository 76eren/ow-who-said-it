export default function Home() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-xl  p-8  backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
          Overwatch Quote Challenge
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Who Said It?
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
          You will see a quote from Overwatch and your goal is to guess which
          character said it. Test your memory, learn hero voice lines, and see
          how well you really know the roster.
        </p>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50/90 p-5">
          <h2 className="text-lg font-bold text-slate-900">How it works</h2>
          <p className="mt-2 text-slate-700">
            Read the quote, pick the hero you think said it, and check if you
            were right. The closer your guesses, the better your score.
          </p>
        </div>
      </div>
    </section>
  );
}
