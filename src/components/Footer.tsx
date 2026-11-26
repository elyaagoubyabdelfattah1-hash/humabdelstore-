import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-3 font-serif text-base italic text-ivory/60">
              More Than a Name. A Smarter Way to Shop.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8" aria-label="Footer Navigation">
            <a
              href="#top"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-gold"
            >
              Home
            </a>
            <a
              href="#collection"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-gold"
            >
              All Products
            </a>
            <a
              href="#collection"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-gold"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-gold"
            >
              About HUMABDEL SHOP
            </a>
            <a
              href="#disclosure"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-gold"
            >
              Affiliate Disclosure
            </a>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-ivory/45 md:flex md:items-start md:justify-between md:gap-10">
          <p className="max-w-3xl">
            <strong className="font-semibold text-gold">Affiliate Disclosure:</strong>{" "}
            As an Amazon Associate, I earn from qualifying purchases. Product names, trademarks, and imagery belong to Amazon.com, Inc. or its affiliates.
          </p>
          <p className="mt-4 shrink-0 md:mt-0">
            © {new Date().getFullYear()} HUMABDEL SHOP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
