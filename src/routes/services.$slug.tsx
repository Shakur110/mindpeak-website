import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft } from "lucide-react";
import { PageHero, Reveal, SectionHeading, ServiceCard, CtaBand } from "@/components/site/ui";
import { services, meta } from "@/lib/content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = services.find((x) => x.slug === loaderData?.slug);
    return { meta: s ? meta(`${s.title} — Mindpeak Digital`, s.description) : [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug)!;
  const Icon = s.icon;
  return (
    <>
      <PageHero eyebrow={`Service ${s.number}`} title={s.title} copy={s.description} />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All services</Link>
      </div>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-3 lg:px-8">
        <Reveal className="glass rounded-2xl p-8 lg:col-span-1">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand"><Icon className="h-7 w-7 text-primary-foreground" /></span>
          <h2 className="mt-8 text-2xl font-semibold">What we deliver</h2>
          <ul className="mt-6 space-y-3">{s.tags.map((t) => <li key={t} className="flex items-center gap-3 text-muted-foreground"><Check className="h-4 w-4 text-primary" />{t}</li>)}</ul>
        </Reveal>
        <Reveal delay={100} className="rounded-2xl border border-border bg-card/50 p-8">
          <h2 className="text-2xl font-semibold">Business benefits</h2>
          <ul className="mt-6 space-y-4">{s.benefits.map((b) => <li key={b} className="border-t border-border pt-4 text-muted-foreground">{b}</li>)}</ul>
        </Reveal>
        <Reveal delay={200} className="rounded-2xl border border-border bg-card/50 p-8">
          <h2 className="text-2xl font-semibold">Who it's for</h2>
          <ul className="mt-6 space-y-4">{s.clients.map((b) => <li key={b} className="border-t border-border pt-4 text-muted-foreground">{b}</li>)}</ul>
        </Reveal>
      </section>
      <CtaBand title={`Ready to start your ${s.short.toLowerCase()} project?`} copy="Tell us about your goals and we'll recommend the right approach." />
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <SectionHeading eyebrow="Explore more" title="Other services" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.filter((x) => x.slug !== s.slug).slice(0, 3).map((x, i) => <ServiceCard key={x.slug} s={x} i={i} />)}
        </div>
      </section>
    </>
  );
}
