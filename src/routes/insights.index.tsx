import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageHero, PostCard } from "@/components/site/ui";
import { posts, blogCategories, meta } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/insights/")({
  head: () => ({ meta: meta("Insights — Mindpeak Digital", "Ideas on web development, AI, automation, marketing, online education and creative technology.") }),
  component: Insights,
});

function Insights() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const list = posts.filter((p) => (cat === "All" || p.category === cat) && (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero eyebrow="Insights" title={<>Insights for a <span className="text-gradient">digital world.</span></>} copy="Articles are being prepared — posts marked Draft are placeholders." />
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", ...blogCategories].map((c) => (
              <button key={c} onClick={() => setCat(c)} className={cn("rounded-lg border px-4 py-2 text-sm transition-all", cat === c ? "border-transparent bg-brand text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground")}>{c}</button>
            ))}
          </div>
          <label className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" aria-label="Search articles"
              className="h-11 w-full rounded-lg border border-input bg-card/50 pl-10 pr-4 text-sm outline-none focus:border-primary" />
          </label>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}</div>
        {list.length === 0 && <p className="mt-12 text-muted-foreground">No articles match your search.</p>}
      </section>
    </>
  );
}
