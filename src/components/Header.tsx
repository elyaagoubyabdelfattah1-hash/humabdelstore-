import { useEffect, useState } from "react";
import { Close, Menu } from "./Icons";

const links = [
  { href: "#top", label: "Home" },
  { href: "#collection", label: "All Products" },
  { href: "#collection", label: "Categories" },
  { href: "#about", label: "About" },
];

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="HUMABDEL SHOP home">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/60 font-serif text-lg font-normal text-gold transition-colors group-hover:bg-gold group-hover:text-navy-950">
        H
      </span>
      <div className="flex flex-col">
        <span className={`text-[12px] font-semibold tracking-[0.3em] ${light ? "text-ivory" : "text-navy-900"}`}>
          HUMABDEL <span className="text-gold">SHOP</span>
        </span>
      </div>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-navy-950/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary Navigation">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              className="text-xs uppercase tracking-[0.22em] text-ivory/70 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#collection"
            className="rounded-full border border-gold/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy-950"
          >
            Explore
          </a>
        </nav>
        <button
          type="button"
          className="text-ivory md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <Close className="h-6 w-6" /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-navy-950/98 px-6 pb-6 md:hidden" aria-label="Mobile Navigation">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3.5 text-xs uppercase tracking-[0.22em] text-ivory/80 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#collection"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-gold py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-navy-950"
          >
            Explore Collection
          </a>
        </nav>
      )}
    </header>
  );
}
