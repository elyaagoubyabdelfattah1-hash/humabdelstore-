import { ArrowRight } from "./Icons";

export default function Closing() {
  return (
    <section id="about" className="scroll-mt-16 bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-7 py-20 text-center text-ivory sm:px-16 sm:py-28">
          {/* Subtle gold ambient glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-40 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
            <div className="absolute inset-5 rounded-[1.6rem] border border-gold/15 sm:inset-7" />
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">HUMABDEL SHOP</p>

            <h2 className="mt-5 font-serif text-3xl font-medium leading-tight sm:text-5xl md:text-6xl">
              Shop Smarter. <em className="gold-text italic">Live Better.</em>
            </h2>

            <p className="mx-auto mt-6 max-w-xl font-light leading-relaxed text-ivory/70 sm:text-lg">
              Discover your next favorite product with HUMABDEL SHOP.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#collection"
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-navy-950 shadow-[0_10px_30px_-10px_rgba(198,161,91,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_16px_40px_-10px_rgba(198,161,91,0.75)]"
              >
                EXPLORE PRODUCTS
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
