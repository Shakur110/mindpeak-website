import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { PageHero, Reveal, CtaBand, ProjectCard, ProjectVisual } from "@/components/site/ui";
import { projects, meta } from "@/lib/content";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = projects.find((x) => x.slug === loaderData?.slug);
    return {
      meta: p
        ? [
            ...meta(`${p.title} — Case Study | Mindpeak Digital`, p.description),
            ...(p.placeholder ? [{ name: "robots", content: "noindex" }] : []),
          ]
        : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { slug } = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === slug);
  const p = projects[idx]!;
  const next = projects[(idx + 1) % projects.length]!;
  const blocks = [
    ["01", "Project objective", p.objective],
    ["02", "The challenge", p.challenge],
    ["03", "Our approach", p.approach],
    ["04", "Solutions delivered", p.solution],
  ] as const;
  const related = projects
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, 3);

  return (
    <>
      <PageHero eyebrow={p.category} title={p.title} copy={p.description}>
        <Link
          to="/work"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        {p.placeholder && (
          <p className="mb-6 flex items-start gap-3 rounded-xl border border-dashed border-primary/40 px-5 py-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            This is a placeholder case study. Real project details and images will be added by the
            Mindpeak team.
          </p>
        )}
        <ProjectVisual
          p={p}
          large
          className="aspect-[16/10] rounded-3xl border border-border md:aspect-[21/9]"
        />
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {blocks.map(([n, t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 100} className="border-t border-border pt-6">
              <span className="font-display text-sm text-primary">{n}</span>
              <h2 className="mt-2 text-2xl font-semibold">{t}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
        {p.results && (
          <Reveal className="glass mt-12 rounded-2xl p-6 md:mt-16 md:p-8">
            <h2 className="text-2xl font-semibold">Results</h2>
            <p className="mt-4 text-muted-foreground">{p.results}</p>
          </Reveal>
        )}

        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group mt-14 flex items-center justify-between gap-6 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 md:mt-20 md:p-8"
        >
          <div>
            <p className="eyebrow">Next project</p>
            <p className="mt-2 font-display text-xl font-semibold md:text-3xl">{next.title}</p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand transition-transform group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold">More {p.category.toLowerCase()} work</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <ProjectCard key={r.slug} p={r} i={i} />
              ))}
            </div>
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}
