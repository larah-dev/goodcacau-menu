import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category, type Tag } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — GoodCacau" },
      { name: "description", content: "Browse hot & iced cacao, brownies, brioche, gifts and seasonal specials." },
      { property: "og:title", content: "Menu — GoodCacau" },
      { property: "og:description", content: "Browse hot & iced cacao, brownies, brioche, gifts and seasonal specials." },
    ],
  }),
  component: MenuPage,
});

const FILTERS: { id: Tag; label: string }[] = [
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "seasonal", label: "Seasonal" },
];

function MenuPage() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [tags, setTags] = useState<Tag[]>([]);

  const products = useMemo(() => {
    return PRODUCTS.filter((p) => (cat === "all" ? true : p.category === cat)).filter((p) =>
      tags.every((t) => p.tags.includes(t))
    );
  }, [cat, tags]);

  const toggle = (t: Tag) => setTags((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]));

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-terracotta">Menu</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">All things cacao</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Tap a category, filter to taste, and add to your order. We confirm everything by WhatsApp.
        </p>
      </div>

      <div className="sticky top-[60px] z-20 -mx-4 mb-6 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Chip active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Chip key={f.id} small active={tags.includes(f.id)} onClick={() => toggle(f.id)}>
              {f.label}
            </Chip>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">Nothing matches that combo — try another filter.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function Chip({
  children,
  active,
  onClick,
  small,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border transition-colors ${
        small ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
      } ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground/80 hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
