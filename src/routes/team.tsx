import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { PageHero, Reveal, CtaBand } from "@/components/site/ui";
import { team, meta } from "@/lib/content";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: meta(
      "Our Team — Mindpeak Digital",
      "Meet the specialists behind Mindpeak Digital across web, AI, automation, e-learning, marketing and design.",
    ),
  }),
  component: Team,
});

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title={
          <>
            Different specialists. <span className="text-gradient">One team.</span>
          </>
        }
        copy="The people who bring your ideas to life. Team profiles will be updated as the agency grows."
      />
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 pb-6 sm:gap-5 lg:grid-cols-3 lg:gap-6 lg:px-8">
        {team.map((m, i) => (
          <Reveal
            key={`${m.department}-${i}`}
            delay={(i % 3) * 90}
            className="card-glow group overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative grid aspect-[4/5] place-items-center overflow-hidden bg-background-2">
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <>
                  <div className="glow-orb h-40 w-40 bg-primary/25 transition-colors group-hover:bg-violet/30" />
                  <div className="grid-lines absolute inset-0 opacity-60" />
                  <span className="glass relative grid h-16 w-16 place-items-center rounded-full sm:h-24 sm:w-24">
                    {m.name === "Team Member" ? (
                      <User className="h-7 w-7 text-muted-foreground sm:h-10 sm:w-10" />
                    ) : (
                      <span className="font-display text-xl font-semibold sm:text-3xl">
                        {initials(m.name)}
                      </span>
                    )}
                  </span>
                </>
              )}
              <span className="absolute bottom-3 left-3 rounded-full bg-background/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground backdrop-blur sm:text-xs">
                {m.department}
              </span>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-base font-semibold sm:text-xl">{m.name}</h3>
              <p className="text-xs text-primary sm:text-sm">{m.role}</p>
              <p className="mt-3 hidden text-sm text-muted-foreground sm:block">{m.bio}</p>
              {m.socials && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {m.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary hover:underline sm:text-sm"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </section>
      <CtaBand
        title="Want to join the team?"
        copy="We're always interested in meeting talented people across web, AI, automation, marketing and design. Get in touch and tell us what you do best."
        action="Get in touch"
      />
    </>
  );
}
