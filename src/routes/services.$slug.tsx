import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Reveal, SectionHeading, ServiceCard, CtaBand } from "@/components/site/ui";
import { services, processSteps, meta } from "@/lib/content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = services.find((x) => x.slug === loaderData?.slug);
    return {
      meta: s
        ? meta(`${s.title} — Mindpeak Digital`, s.description)
        : [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const idx = services.findIndex((x) => x.slug === slug);
  const s = services[idx]!;
  const Icon = s.icon;
  const others = [1, 2, 3].map((n) => services[(idx + n) % services.length]!);

  return (
    <>
      <PageHero eyebrow={`Service ${s.number}`} title={s.title} copy={s.description}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Start a {s.short.toLowerCase()} project <ArrowRight />
            </Link>
          </Button>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-2 py-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:px-8">
        <Reveal className="card-glow rounded-2xl p-6 md:col-span-2 md:p-8 lg:col-span-1">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand shadow-glow">
            <Icon className="h-7 w-7 text-primary-foreground" />
          </span>
          <h2 className="mt-7 text-2xl font-semibold">What we deliver</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {s.tags.map((t) => (
              <li key={t} className="flex items-center gap-3 text-muted-foreground">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100} className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Business benefits</h2>
          <ul className="mt-6 space-y-4">
            {s.benefits.map((b) => (
              <li key={b} className="border-t border-border pt-4 text-muted-foreground">
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={200} className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Who it's for</h2>
          <ul className="mt-6 space-y-4">
            {s.clients.map((b) => (
              <li key={b} className="border-t border-border pt-4 text-muted-foreground">
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 section-y lg:px-8">
        <SectionHeading eyebrow="How we work" title="A clear process, start to finish." />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              delay={i * 90}
              className="rounded-2xl border border-border bg-card/40 p-6"
            >
              <span className="font-display text-3xl font-semibold text-gradient">{p.n}</span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBand
        title={`Ready to start your ${s.short.toLowerCase()} project?`}
        copy="Tell us about your goals and we'll recommend the right approach."
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24 lg:px-8">
        <SectionHeading eyebrow="Explore more" title="Other services" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {others.map((x, i) => (
            <ServiceCard key={x.slug} s={x} i={i} />
          ))}
        </div>
      </section>
    </>
  );
}
