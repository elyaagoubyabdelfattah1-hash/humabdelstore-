import { useEffect } from "react";
import type { Product } from "../data/products";
import { BuyButton, ProductImage } from "./ProductCard";
import { Check, Close } from "./Icons";

export default function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-end justify-center bg-navy-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qv-title"
    >
      <div
        className="animate-rise-in relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy-900 shadow transition-colors hover:bg-gold hover:text-navy-950"
          aria-label="Close modal"
        >
          <Close />
        </button>

        {/* Left: Authentic Amazon product image */}
        <div className="aspect-square bg-gradient-to-b from-ivory to-beige/40 p-10 md:aspect-auto md:p-14">
          <ProductImage product={product} className="h-full w-full" />
        </div>

        {/* Right: Verified product details */}
        <div className="flex flex-col p-7 md:p-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark">
              {product.brand}
            </span>
            <span className="text-navy-900/30">·</span>
            <span className="rounded-full bg-beige/60 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-navy-900/70">
              {product.category}
            </span>
          </div>

          <h3
            id="qv-title"
            className="mt-3 pr-8 font-serif text-2xl font-medium leading-snug text-navy-900 md:text-[1.65rem]"
          >
            {product.name}
          </h3>

          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-navy-900/40">
            Amazon ASIN · {product.asin}
          </p>

          <div className="my-4 h-px w-12 bg-gold/60" />

          <p className="text-sm font-light leading-relaxed text-navy-900/75">
            {product.description}
          </p>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-navy-900/50">
            Product Highlights
          </p>
          <ul className="mt-2.5 space-y-2.5">
            {product.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-navy-900/80 sm:text-sm">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-dark">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <BuyButton product={product} className="w-full" />
            <p className="mt-3 text-center text-[10px] leading-relaxed text-navy-900/40">
              Opens Amazon in a new tab. Affiliate link to Amazon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
