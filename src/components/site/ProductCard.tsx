import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart, formatBRL } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;
    // default options = first choice of each group
    const opts: Record<string, string> = {};
    let price = product.price;
    product.options?.forEach((g) => {
      opts[g.group] = g.choices[0].label;
      price += g.choices[0].priceDelta ?? 0;
    });
    add(product, opts, price, 1);
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-warm"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={600}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            !product.available ? "opacity-50 grayscale" : ""
          }`}
        />
        {!product.available && (
          <span className="absolute left-3 top-3 rounded-full bg-cocoa/90 px-3 py-1 text-xs font-medium text-cream">
            Back soon
          </span>
        )}
        {product.tags.includes("seasonal") && product.available && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Seasonal
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <span className="whitespace-nowrap font-medium text-foreground">{formatBRL(product.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {product.tags.filter((t) => t !== "seasonal").map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] uppercase tracking-wide text-secondary-foreground/80">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-3">
          <button
            onClick={quickAdd}
            disabled={!product.available}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-cocoa/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            <Plus className="h-4 w-4" />
            {product.available ? "Add to Order" : "Unavailable"}
          </button>
        </div>
      </div>
    </Link>
  );
}
