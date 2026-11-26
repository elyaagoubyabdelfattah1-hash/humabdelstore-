import { ArrowDown } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 text-ivory">
      {/* Subtle luxury ambient glow and minimalist grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-navy-800/50 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[92svh] max-w-5xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center lg:px-10">
        <p className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-gold sm:text-xs">
          <span className="h-px w-8 bg-gold/60" />
          More Than a Name. A Smarter Way to Shop.
          <span className="h-px w-8 bg-gold/60" />
        </p>

        <h1 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          Discover Products That
          <br />
          Make <em className="gold-text italic">Life Better.</em>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed text-ivory/70 sm:text-lg">
          Explore carefully selected products across technology, home, lifestyle, creativity and everyday essentials.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-navy-950 shadow-[0_10px_35px_-8px_rgba(198,161,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_16px_45px_-10px_rgba(198,161,91,0.7)]"
          >
            EXPLORE COLLECTION
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Highlight metrics */}
        <dl className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
          <div className="px-3 text-center">
            <dd className="font-serif text-3xl font-normal text-gold-light sm:text-4xl">48</dd>
            <dt className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ivory/60 sm:text-[11px]">
              Curated Products
            </dt>
          </div>
          <div className="px-3 text-center">
            <dd className="font-serif text-3xl font-normal text-gold-light sm:text-4xl">5</dd>
            <dt className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ivory/60 sm:text-[11px]">
              Curated Categories
            </dt>
          </div>
          <div className="px-3 text-center">
            <dd className="font-serif text-3xl font-normal text-gold-light sm:text-4xl">Amazon</dd>
            <dt className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ivory/60 sm:text-[11px]">
              Affiliate Links
            </dt>
          </div>
        </dl>
      </div>
    </section>
  );
}
