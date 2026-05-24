import { createFileRoute } from "@tanstack/react-router";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GoodCacau" },
      { name: "description", content: "Small-batch cacau, made slow in São Paulo. Our story and values." },
      { property: "og:title", content: "About — GoodCacau" },
      { property: "og:description", content: "Small-batch cacau, made slow in São Paulo." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-terracotta">About</p>
      <h1 className="mt-3 font-display text-5xl leading-tight text-balance">
        We make cacau the slow way — and we like it that way.
      </h1>
      <img
        src={storyImg}
        alt="Cacau products on a wooden table"
        width={1280}
        height={960}
        loading="lazy"
        className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
      />
      <div className="prose mt-8 max-w-none space-y-5 text-base leading-relaxed text-foreground/85">
        <p>
          GoodCacau is a small cacau house in São Paulo. We source single-origin cacau from family farms in Bahia,
          temper our chocolate in small batches, and bake brownies and brioche every morning before the doors open.
        </p>
        <p>
          We're a tiny team — three people, two ovens, one slow Sunday playlist. Nothing here is mass-produced.
          That means we sometimes run out of the bombons before noon, and that's okay.
        </p>
        <p>
          Our values are simple: real ingredients, fair prices to our farmers, ceramic mugs over disposables,
          and a quiet welcome whenever you walk in.
        </p>
        <p className="italic text-muted-foreground">— Marina, Lucas & Bia</p>
      </div>
    </section>
  );
}
