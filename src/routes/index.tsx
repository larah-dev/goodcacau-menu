import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-cacau.jpg";
import storyImg from "@/assets/story.jpg";
import { PRODUCTS, BRAND } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GoodCacau — Cozy cacao, made slow" },
      { name: "description", content: "Hot & iced cacao, brownies, brioche and gift kits. Order in minutes via WhatsApp." },
      { property: "og:title", content: "GoodCacau — Cozy cacao, made slow" },
      { property: "og:description", content: "Hot & iced cacao, brownies, brioche and gift kits. Order via WhatsApp." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.05fr_1fr] md:py-20">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
              Open today · {BRAND.hours.split("·")[1]?.trim() ?? BRAND.hours}
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
              Cacau de verdade,
              <br />
              <span className="italic text-terracotta">feito devagar.</span>
            </h1>
            <p className="mt-5 max-w-md text-balance text-base text-muted-foreground sm:text-lg">
              Drinks quentes, gelados e doces de cacau de origem — preparados todos os dias na nossa cozinha pequena.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                View the Menu
              </Link>
              <Link
                to="/order"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cocoa/30 bg-cream px-6 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" />
                Order via WhatsApp
              </Link>
            </div>
            <div className="mt-7 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {BRAND.hours}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-caramel/30 via-transparent to-terracotta/20 blur-2xl" />
            <img
              src={heroImg}
              alt="Steaming ceramic mug of hot cacao with cinnamon"
              width={1536}
              height={1280}
              className="aspect-[5/6] w-full rounded-[2rem] object-cover shadow-warm"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-soft sm:block">
              <div className="font-display text-2xl">70%</div>
              <div className="text-xs text-muted-foreground">single-origin cacao</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={storyImg}
            alt="Cacau products on a wooden table"
            loading="lazy"
            width={1280}
            height={960}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta">Nossa história</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">A cozy ritual, in every cup.</h2>
            <p className="mt-4 text-muted-foreground">
              GoodCacau started as a small Sunday ritual — friends, ceramic mugs, and slowly stirred cacao.
              Today, we still bake in small batches and stir each pot by hand. Nada de pressa.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline">
              Read more →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta">Favoritos</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">This week's picks</h2>
          </div>
          <Link to="/menu" className="hidden text-sm font-medium underline-offset-4 hover:underline sm:inline">
            See full menu →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
