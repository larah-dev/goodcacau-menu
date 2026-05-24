import { createFileRoute } from "@tanstack/react-router";
import { BRAND, WHATSAPP_NUMBER } from "@/data/products";
import { MapPin, Clock, MessageCircle, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GoodCacau" },
      { name: "description", content: "Visit us, message us on WhatsApp, or say hi on Instagram." },
      { property: "og:title", content: "Contact — GoodCacau" },
      { property: "og:description", content: "Hours, location and WhatsApp." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá GoodCacau!")}`;
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-terracotta">Contact</p>
      <h1 className="mt-3 font-display text-5xl leading-tight">Come by, or chat with us.</h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card icon={<MapPin className="h-5 w-5" />} title="Visit">
          <p>{BRAND.location}</p>
          <div className="mt-3 aspect-[16/10] rounded-xl border border-border bg-gradient-to-br from-secondary to-muted" aria-label="Map placeholder" />
        </Card>
        <Card icon={<Clock className="h-5 w-5" />} title="Hours">
          <p>{BRAND.hours}</p>
          <p className="mt-1 text-sm text-muted-foreground">Closed on Mondays — we rest, slowly.</p>
        </Card>
        <Card icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp">
          <p>Replies in minutes during opening hours.</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-medium text-white hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" /> Message us
          </a>
        </Card>
        <Card icon={<Instagram className="h-5 w-5" />} title="Instagram">
          <p>{BRAND.instagram}</p>
          <a
            href={`https://instagram.com/${BRAND.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium hover:bg-secondary"
          >
            Follow along
          </a>
        </Card>
      </div>
    </section>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 text-foreground/80">
        {icon}
        <h2 className="font-display text-xl">{title}</h2>
      </div>
      <div className="mt-2 text-foreground/85">{children}</div>
    </div>
  );
}
