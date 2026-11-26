import { Gem, Shield, Sparkle } from "./Icons";

const items = [
  {
    icon: Gem,
    title: "Thoughtfully Curated",
    text: "We filter through thousands of options to bring you only products that genuinely earn their place in your life.",
  },
  {
    icon: Shield,
    title: "Trusted Checkout",
    text: "Every purchase is completed securely on Amazon — with the reliable shipping, returns and support you know.",
  },
  {
    icon: Sparkle,
    title: "Smarter Living",
    text: "From intelligent gadgets to elegant essentials, each pick is chosen to make your daily routine simpler.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-16 bg-navy-900 py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Why HUMABDEL</p>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight sm:text-5xl">
              Quality over quantity. <em className="gold-text italic">Always.</em>
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-ivory/60">
              We believe shopping should feel effortless. That's why we focus on a refined selection rather than endless
              aisles.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {items.map(({ icon: Icon, title, text }) => (
              <div key={title} className="group bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-950">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ivory/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
