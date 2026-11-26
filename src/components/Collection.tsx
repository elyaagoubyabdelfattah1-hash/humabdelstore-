import { useMemo, useState } from "react";
import { products, type Category, type Product } from "../data/products";
import ProductCard from "./ProductCard";
import QuickView from "./QuickView";

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState<string>("All Products");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Compute only the categories that actually contain products
  const availableCategories = useMemo(() => {
    const present = new Set<Category>();
    for (const p of products) {
      present.add(p.category);
    }
    // Return with "All Products" first, followed by alphabetical categories
    return ["All Products", ...Array.from(present).sort()];
  }, []);

  // Filter products based on active category and optional quick search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "All Products" || p.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Count per category
  const getCount = (cat: string) => {
    if (cat === "All Products") return products.length;
    return products.filter((p) => p.category === cat).length;
  };

  return (
    <section id="collection" className="scroll-mt-16 bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold-dark">
            Handpicked Catalog
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-navy-900 sm:text-5xl">
            The <em className="italic text-gold-dark">Collection</em>
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-navy-900/65 sm:text-base">
            Each product links to its Amazon listing, with its name, a short description and a Buy button.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="mt-12">
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            role="tablist"
            aria-label="Filter products by category"
          >
            {availableCategories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = getCount(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-gold ${
                    isActive
                      ? "bg-navy-900 text-ivory shadow-md shadow-navy-950/20"
                      : "border border-navy-900/15 bg-white/70 text-navy-900/70 hover:border-gold hover:bg-white hover:text-navy-900"
                  }`}
                >
                  <span className="font-medium">{cat}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isActive
                        ? "bg-gold text-navy-950"
                        : "bg-navy-900/5 text-navy-900/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-bar: Status and optional search filter */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-navy-900/10 pb-5 sm:flex-row">
            <p className="text-xs uppercase tracking-[0.18em] text-navy-900/55">
              Showing{" "}
              <span className="font-semibold text-navy-900">
                {filteredProducts.length}
              </span>{" "}
              of <span className="font-semibold text-navy-900">{products.length}</span>{" "}
              products
              {activeCategory !== "All Products" && (
                <span>
                  {" "}
                  in <span className="text-gold-dark">{activeCategory}</span>
                </span>
              )}
            </p>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-navy-900/15 bg-white px-4 py-2 pl-9 text-xs text-navy-900 placeholder:text-navy-900/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                aria-label="Search within products"
              />
              <svg
                className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-navy-900/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-xs text-navy-900/40 hover:text-navy-900"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="my-20 rounded-2xl border border-dashed border-navy-900/20 bg-white/50 p-12 text-center">
            <p className="font-serif text-2xl text-navy-900">No matching products found</p>
            <p className="mt-2 text-sm text-navy-900/60">
              Try selecting another category or clearing your search filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All Products");
                setSearchQuery("");
              }}
              className="mt-6 rounded-full bg-navy-900 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-ivory hover:bg-gold hover:text-navy-950"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                index={p.id - 1}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        )}

        {/* Affiliate compliance notice directly under collection */}
        <div id="disclosure" className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-xs leading-relaxed text-navy-900/50">
            <strong className="font-medium text-navy-900/70">Affiliate Disclosure:</strong>{" "}
            As an Amazon Associate, I earn from qualifying purchases. When you purchase through links on this site, HUMABDEL SHOP may earn an affiliate commission at no extra cost to you.
          </p>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
