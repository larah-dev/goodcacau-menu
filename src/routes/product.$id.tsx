import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { useCart, formatBRL } from "@/store/cart";
import { ArrowLeft, Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.name} — GoodCacau` : "Product — GoodCacau" },
        { name: "description", content: p?.description ?? "GoodCacau product" },
        { property: "og:title", content: p ? `${p.name} — GoodCacau` : "Product — GoodCacau" },
        { property: "og:description", content: p?.description ?? "GoodCacau product" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => <div className="p-10 text-center">Product not found.</div>,
});

function ProductPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const add = useCart((s) => s.add);

  const [options, setOptions] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {};
    product?.options?.forEach((g) => (o[g.group] = g.choices[0].label));
    return o;
  });
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    let p = product.price;
    product.options?.forEach((g) => {
      const ch = g.choices.find((c) => c.label === options[g.group]);
      p += ch?.priceDelta ?? 0;
    });
    return p;
  }, [product, options]);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p>Product not found.</p>
        <Link to="/menu" className="mt-4 inline-block underline">Back to menu</Link>
      </div>
    );
  }

  const onAdd = () => {
    add(product, options, unitPrice, qty);
    if (notes) {
      const state = useCart.getState();
      const lastMatching = [...state.items].reverse().find((i) => i.productId === product.id);
      if (lastMatching) state.setItemNotes(lastMatching.id, notes);
    }
    navigate({ to: "/order" });
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link to="/menu" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to menu
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="aspect-square w-full rounded-3xl object-cover shadow-soft"
        />
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.longDescription}</p>
          <div className="mt-4 text-2xl font-medium">{formatBRL(unitPrice)}</div>

          {product.options?.map((g) => (
            <div key={g.group} className="mt-6">
              <div className="mb-2 text-sm font-medium">{g.group}</div>
              <div className="flex flex-wrap gap-2">
                {g.choices.map((c) => {
                  const active = options[g.group] === c.label;
                  return (
                    <button
                      key={c.label}
                      onClick={() => setOptions((o) => ({ ...o, [g.group]: c.label }))}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
                      }`}
                    >
                      {c.label}
                      {c.priceDelta ? <span className="ml-1 opacity-70">+{formatBRL(c.priceDelta)}</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Anything we should know?"
              maxLength={200}
              className="w-full rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:border-ring"
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={onAdd}
              disabled={!product.available}
              className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-cocoa/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              {product.available ? `Add ${qty} to order · ${formatBRL(unitPrice * qty)}` : "Back soon"}
            </button>
          </div>

          <div className="mt-8 grid gap-5 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Ingredients</div>
              <p className="mt-1 text-sm">{product.ingredients.join(", ")}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Allergens</div>
              <p className="mt-1 text-sm">{product.allergens.length ? product.allergens.join(", ") : "None"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
