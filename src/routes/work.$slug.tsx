import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { PageHero, Reveal, CtaBand } from "@/components/site/ui";
import { projects, meta } from "@/lib/content";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = projects.find((x) => x.slug === loaderData?.slug);
    return { meta: p ? meta(`${p.title} — Case Study | Mindpeak Digital`, p.description) : [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { slug } = Route.useLoaderData();
  const p = projects.find((x) => x.slug === slug)!;
  const blocks = [["Project objective", p.objective], ["The challenge", p.challenge], ["Our approach", p.approach], ["Solutions delivered", p.solution]];
  return (
    <>
      <PageHero eyebrow={p.category} title={p.title} copy={p.description} />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All projects</Link>
        {p.placeholder && <p className="mt-6 rounded-xl border border-dashed border-primary/40 px-5 py-4 text-sm text-muted-foreground">This is a placeholder case study. Real project details and images will be added by the Mindpeak team.</p>}
      </div>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid aspect-[21/9] place-items-center rounded-3xl border border-dashed border-primary/30 bg-card text-muted-foreground"><div className="flex flex-col items-center gap-2"><ImageIcon className="h-8 w-8" /><span className="text-xs uppercase tracking-[0.2em]">Cover image placeholder</span></div></div>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {blocks.map(([t, d], i) => <Reveal key={t} delay={(i % 2) * 100} className="border-t border-border pt-6"><h2 className="text-2xl font-semibold">{t}</h2><p className="mt-4 text-muted-foreground leading-relaxed">{d}</p></Reveal>)}
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {[1, 2].map((n) => <div key={n} className="grid aspect-video place-items-center rounded-2xl border border-dashed border-border bg-card text-xs uppercase tracking-[0.2em] text-muted-foreground">Screenshot placeholder</div>)}
        </div>
        {p.results && <Reveal className="mt-16 glass rounded-2xl p-8"><h2 className="text-2xl font-semibold">Results</h2><p className="mt-4 text-muted-foreground">{p.results}</p></Reveal>}
      </section>
      <CtaBand />
    </>
  );
}
