import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, workCategories } from "@/lib/content";
import { FilterChips, ProjectCard } from "./ui";

type Category = (typeof workCategories)[number];

/** Filterable project grid. Pass `limit` to show a preview with a link to the full Work page. */
export function WorkGrid({ limit }: { limit?: number }) {
  const [cat, setCat] = useState<Category>("All Projects");
  const filtered = cat === "All Projects" ? projects : projects.filter((p) => p.category === cat);
  const list = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      <FilterChips
        label="Filter projects by category"
        options={workCategories}
        value={cat}
        onChange={setCat}
      />
      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.slug + cat} p={p} i={i} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-10 text-muted-foreground">No projects in this category yet.</p>
      )}
      {limit && filtered.length > limit && (
        <div className="mt-12 flex justify-center">
          <Button asChild variant="glass" size="xl">
            <Link to="/work">
              View all projects <ArrowRight />
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
