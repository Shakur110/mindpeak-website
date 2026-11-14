import { useState } from "react";
import { projects, workCategories } from "@/lib/content";
import { ProjectCard } from "./ui";
import { cn } from "@/lib/utils";

export function WorkGrid() {
  const [cat, setCat] = useState<(typeof workCategories)[number]>("All Projects");
  const list = cat === "All Projects" ? projects : projects.filter((p) => p.category === cat);
  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist">
        {workCategories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={cn("rounded-lg border px-4 py-2 text-sm transition-all",
              cat === c ? "border-transparent bg-brand text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground")}>
            {c}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => <ProjectCard key={p.slug + cat} p={p} i={i} />)}
      </div>
      {list.length === 0 && <p className="mt-10 text-muted-foreground">No projects in this category yet.</p>}
    </>
  );
}
