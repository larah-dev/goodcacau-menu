import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, cartTotal, formatBRL, buildWhatsAppMessage } from "@/store/cart";
import { WHATSAPP_NUMBER } from "@/data/products";
import { Minus, Plus, Trash2, MessageCircle, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Your order — GoodCacau" },
      { name: "description", content: "Review your cacao order and send it via WhatsApp." },
      { property: "og:title", content: "Your order — GoodCacau" },
      { property: "og:description", content: "Review your cacao order and send it via WhatsApp." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const s = useCart();
  const total = cartTotal(s.items);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameMissing = !s.customerName.trim();
  const addrMissing = s.fulfillment === "delivery" && !s.address.trim();
  const blocked = s.items.length === 0 || nameMissing || addrMissing;

  const message = buildWhatsAppMessage(s);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleSend = (e: React.MouseEvent) => {
    setSubmitted(true);
    if (blocked) e.preventDefault();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {/* noop */}
  };

  if (s.items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Your basket is empty</h1>
        <p className="mt-3 text-muted-foreground">No rush — go pick something cozy.</p>
        <Link to="/menu" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
          Browse the menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h1 className="font-display text-4xl sm:text-5xl">Your order</h1>
        <p className="mt-2 text-muted-foreground">Edit anything below — we'll confirm details on WhatsApp.</p>

        <ul className="mt-6 space-y-3">
          {s.items.map((i) => (
            <li key={i.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-lg">{i.name}</div>
                    {Object.entries(i.options).length > 0 && (
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {Object.values(i.options).join(" · ")}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatBRL(i.unitPrice * i.qty)}</div>
                    <div className="text-xs text-muted-foreground">{formatBRL(i.unitPrice)} each</div>
                  </div>
                </div>
                <textarea
                  value={i.notes ?? ""}
                  onChange={(e) => s.setItemNotes(i.id, e.target.value)}
                  placeholder="Notes (e.g. less sugar)"
                  rows={1}
                  maxLength={160}
                  className="mt-3 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                />
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => s.setQty(i.id, i.qty - 1)} className="grid h-9 w-9 place-items-center">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-7 text-center text-sm">{i.qty}</span>
                    <button onClick={() => s.setQty(i.id, i.qty + 1)} className="grid h-9 w-9 place-items-center">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => s.remove(i.id)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="font-display text-xl">Details</h2>

          <label className="mt-4 block text-sm font-medium">Your name</label>
          <input
            value={s.customerName}
            onChange={(e) => s.setCustomerName(e.target.value)}
            maxLength={60}
            placeholder="e.g. Mariana"
            className={`mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-ring ${
              submitted && nameMissing ? "border-destructive" : "border-input"
            }`}
          />
          {submitted && nameMissing && <p className="mt-1 text-xs text-destructive">Please add your name.</p>}

          <div className="mt-4 grid grid-cols-2 gap-2">
            {(["pickup", "delivery"] as const).map((f) => (
              <button
                key={f}
                onClick={() => s.setFulfillment(f)}
                className={`rounded-xl border px-3 py-2 text-sm capitalize transition-colors ${
                  s.fulfillment === f ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                }`}
              >
                {f === "pickup" ? "Pickup" : "Delivery"}
              </button>
            ))}
          </div>

          {s.fulfillment === "delivery" && (
            <>
              <label className="mt-4 block text-sm font-medium">Delivery address</label>
              <input
                value={s.address}
                onChange={(e) => s.setAddress(e.target.value)}
                maxLength={140}
                placeholder="Street, number, neighborhood"
                className={`mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-ring ${
                  submitted && addrMissing ? "border-destructive" : "border-input"
                }`}
              />
              {submitted && addrMissing && <p className="mt-1 text-xs text-destructive">Please add your address.</p>}
              <p className="mt-2 text-xs text-muted-foreground">
                Outside our usual area? Send it anyway — we'll check by WhatsApp.
              </p>
            </>
          )}

          <label className="mt-4 block text-sm font-medium">Order notes</label>
          <textarea
            value={s.orderNotes}
            onChange={(e) => s.setOrderNotes(e.target.value)}
            rows={2}
            maxLength={300}
            placeholder="Pickup time, allergies, gift message…"
            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
          />

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Estimated total</span>
            <span className="font-display text-2xl">{formatBRL(total)}</span>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSend}
            className={`mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors ${
              blocked
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "bg-[#25D366] text-white hover:brightness-95"
            }`}
            aria-disabled={blocked}
          >
            <MessageCircle className="h-4 w-4" />
            Send via WhatsApp
          </a>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            We'll confirm your order shortly — pay on pickup or delivery.
          </p>

          <button
            onClick={copy}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm hover:bg-secondary"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy message"}
          </button>
        </div>

        <details className="rounded-2xl border border-border bg-card p-5 text-sm">
          <summary className="cursor-pointer font-medium">Preview WhatsApp message</summary>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-xs text-muted-foreground">{message}</pre>
        </details>
      </aside>
    </section>
  );
}
