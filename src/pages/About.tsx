export default function About() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-[0_18px_45px_rgba(34,58,97,0.14)] backdrop-blur-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
          About This Project
        </p>

        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          OW Who Said It
        </h1>

        <p className="mt-5 max-w-4xl text-base leading-7 text-slate-700 sm:text-lg">
          OW Who Said It is a fan-made Overwatch quote challenge where you guess
          which hero said each voice line.
        </p>

        <div className="mt-6 rounded-xl border border-[#f99e1a]/45 bg-[#fff4e2]/70 p-4 sm:mt-8 sm:p-5">
          <h2 className="text-lg font-bold text-slate-900">About me</h2>
          <p className="mt-3 text-slate-700">
            I am Eren, a software engineer from the Netherlands. As you might
            have noticed I really like the video game Overwatch, maybe a bit too
            much altough my rank definitely does NOT reflect that at all.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://erenbasaran.nl/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-md border border-[#f99e1a] bg-[#f99e1a] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-900 transition-colors duration-200 hover:bg-[#ffb13f]"
            >
              Visit My Portfolio
            </a>

            <a
              href="https://github.com/76eren/ow-who-said-it"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-800 transition-colors duration-200 hover:border-[#f99e1a]/70 hover:bg-[#fff4e2]"
            >
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
