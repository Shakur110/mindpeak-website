import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { FilterChips, PageHero, PostCard } from "@/components/site/ui";
import { posts, blogCategories, meta } from "@/lib/content";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: meta(
      "Insights — Mindpeak Digital",
      "Ideas on web development, AI, automation, marketing, online education and creative technology.",
    ),
  }),
  component: Insights,
});

const categories = ["All", ...blogCategories] as const;

function Insights() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const query = q.trim().toLowerCase();
  const list = posts.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (!query || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(query)),
  );
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Insights for a <span className="text-gradient">digital world.</span>
          </>
        }
        copy="Ideas and practical guides on web, AI, automation, marketing and online education."
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 lg:order-1">
            <FilterChips
              label="Filter articles by category"
              options={categories}
              value={cat}
              onChange={setCat}
            />
          </div>
          <div className="relative w-full shrink-0 lg:order-2 lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles"
              aria-label="Search articles"
              className="h-12 w-full rounded-full border border-input bg-card/50 pl-10 pr-10 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 md:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
          {list.length} {list.length === 1 ? "article" : "articles"}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {list.map((p, i) => (
            <PostCard key={p.slug} p={p} i={i} />
          ))}
        </div>
        {list.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No articles match your search.{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => {
                setQ("");
                setCat("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
