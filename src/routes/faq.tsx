import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — GoodCacau" },
      { name: "description", content: "Answers about ordering, pickup, delivery, allergens and confirmations." },
      { property: "og:title", content: "FAQ — GoodCacau" },
      { property: "og:description", content: "Ordering, pickup, delivery and allergen info." },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "How do I place an order?",
    a: "Browse the menu, add what you'd like, and tap 'Send via WhatsApp' on your order page. Your order arrives as a pre-filled message we'll confirm by chat.",
  },
  {
    q: "Is my order confirmed once I send it?",
    a: "Not automatically. A real person on our team replies on WhatsApp to confirm timing, availability and total. Please wait for our confirmation.",
  },
  {
    q: "Pickup or delivery?",
    a: "Both. Pickup is at our café (Rua das Flores, 123). Delivery is available within a small radius — we'll let you know the fee when we confirm.",
  },
  {
    q: "Do you accommodate allergies?",
    a: "Every product lists its allergens on the product page. Add details in your order notes and we'll do our best.",
  },
  {
    q: "Do you have vegan or gluten-free options?",
    a: "Yes — filter the menu by Vegan or Gluten-free. We add more options each season.",
  },
  {
    q: "How do I pay?",
    a: "On pickup or delivery: Pix, card or cash. No online payment needed.",
  },
];

function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-terracotta">FAQ</p>
      <h1 className="mt-3 font-display text-5xl leading-tight">Good to know</h1>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-display text-lg">{f.q}</span>
              <span className="text-2xl text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-foreground/80">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
