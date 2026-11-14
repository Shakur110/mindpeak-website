import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { PageHero, Reveal, CtaBand } from "@/components/site/ui";
import { team, meta } from "@/lib/content";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: meta("Our Team — Mindpeak Digital", "Meet the specialists behind Mindpeak Digital across web, AI, automation, e-learning, marketing and design.") }),
  component: () => (
    <>
      <PageHero eyebrow="Our Team" title={<>Different specialists. <span className="text-gradient">One team.</span></>} copy="The people who bring your ideas to life. Team profiles will be updated as the agency grows." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {team.map((m, i) => (
          <Reveal key={i} delay={(i % 3) * 90} className="group overflow-hidden rounded-2xl border border-border bg-card/50">
            <div className="relative grid aspect-[4/5] place-items-center overflow-hidden bg-background-2">
              {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover" /> : (
                <><div className="glow-orb h-40 w-40 bg-primary/25" /><User className="relative h-14 w-14 text-muted-foreground" /><span className="absolute bottom-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Photo placeholder</span></>
              )}
            </div>
            <div className="p-6">
              <p className="eyebrow">{m.department}</p>
              <h3 className="mt-3 text-xl font-semibold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
              <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>
              {m.socials && <div className="mt-4 flex gap-3">{m.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-primary">{s.label}</a>)}</div>}
            </div>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </>
  ),
});
