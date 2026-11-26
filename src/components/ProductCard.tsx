import { useState } from "react";
import { AFFILIATE_REL, type Product } from "../data/products";
import { ExternalLink, Eye } from "./Icons";

interface Props {
  product: Product;
  index: number;
  onQuickView: (p: Product) => void;
}

export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !product.image) {
    return (
      <div
        className={`grid place-items-center text-center ${className}`}
        role="img"
        aria-label="Product image placeholder"
      >
        <div className="flex flex-col items-center p-4">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-navy-900/10 bg-white/60">
            <svg
              className="h-7 w-7 text-navy-900/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.3}
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="m3 16 5-5 4 4 3-3 6 6" strokeLinejoin="round" />
              <circle cx="15.5" cy="8.5" r="1.5" />
            </svg>
          </span>
          <span className="mt-2 font-serif text-sm text-navy-900/60">{product.brand}</span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-navy-900/40">
            Image Unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.05] ${className}`}
    />
  );
}

export function BuyButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel={AFFILIATE_REL}
      aria-label={`Buy ${product.name} now on Amazon (opens in new tab)`}
      className={`group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-navy-900 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-navy-950 hover:shadow-[0_12px_28px_-10px_rgba(198,161,91,0.75)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <span>Buy Now on Amazon</span>
      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
    </a>
  );
}

export default function ProductCard({ product, index, onQuickView }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/[0.08] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_24px_50px_-20px_rgba(10,18,40,0.28)]">
      {/* Top Image Section */}
      <div className="relative">
        <div className="aspect-square bg-gradient-to-b from-ivory to-beige/40 p-8 sm:p-10">
          <ProductImage product={product} className="h-full w-full" />
        </div>

        {/* Index badge */}
        <span className="absolute left-4 top-4 font-serif text-xs italic text-navy-900/40">
          No. {String(index + 1).padStart(2, "0")}
        </span>

        {/* Verified category tag */}
        <span className="absolute right-4 top-4 rounded-full border border-navy-900/10 bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-navy-900/70 shadow-xs backdrop-blur-xs">
          {product.category}
        </span>

        {/* View Product button on hover */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-navy-900 opacity-0 shadow-md transition-all duration-300 hover:text-gold-dark focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View Details</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark">
          {product.brand}
        </p>

        <h3
          title={product.name}
          className="mt-2 line-clamp-2 font-serif text-lg font-medium leading-snug text-navy-900 sm:text-xl"
        >
          {product.name}
        </h3>

        <div className="my-3.5 h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-16" />

        <p className="line-clamp-3 flex-1 text-xs font-light leading-relaxed text-navy-900/70 sm:text-sm">
          {product.description}
        </p>

        <div className="mt-6 pt-2">
          <BuyButton product={product} className="w-full" />
        </div>
      </div>
    </article>
  );
}
