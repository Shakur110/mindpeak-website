import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { PostCard, CtaBand } from "@/components/site/ui";
import { posts, meta } from "@/lib/content";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const p = posts.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = posts.find((x) => x.slug === loaderData?.slug);
    return {
      meta: p
        ? [
            ...meta(`${p.title} — Mindpeak Insights`, p.excerpt),
            { property: "og:type", content: "article" },
            ...(p.draft ? [{ name: "robots", content: "noindex" }] : []),
          ]
        : [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
    };
  },
  component: Article,
});

function Article() {
  const { slug } = Route.useLoaderData();
  const p = posts.find((x) => x.slug === slug)!;
  const sameCat = posts.filter((x) => x.slug !== slug && x.category === p.category);
  const related = [
    ...sameCat,
    ...posts.filter((x) => x.slug !== slug && x.category !== p.category),
  ].slice(0, 3);
  return (
    <>
      <article className="relative overflow-hidden">
        <div className="glow-orb -top-40 left-1/3 h-96 w-96 bg-primary/25" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-28 md:pt-40">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All insights
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{p.category}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {p.readTime} read
            </span>
          </div>
          <h1 className="mt-5 text-[2.25rem] font-semibold leading-tight md:text-5xl">{p.title}</h1>
          {p.draft && (
            <p className="mt-6 rounded-xl border border-dashed border-primary/40 px-5 py-3 text-sm text-muted-foreground">
              Draft placeholder — not yet published.
            </p>
          )}
          <p className="mt-8 border-l-2 border-primary pl-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {p.excerpt}
          </p>
          <div className="mt-10 space-y-6 text-[1.0625rem] leading-[1.8] text-foreground/90 md:text-lg">
            {p.body.map((b, i) => (
              <p key={i}>{b}</p>
            ))}
          </div>
        </div>
      </article>
      <section className="mx-auto max-w-7xl border-t border-border px-5 pt-14 lg:px-8">
        <h2 className="text-2xl font-semibold">Related articles</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {related.map((r, i) => (
            <PostCard key={r.slug} p={r} i={i} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
