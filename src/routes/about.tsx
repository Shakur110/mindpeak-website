import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Eye, Target, User } from "lucide-react";
import { PageHero, Reveal, SectionHeading, CtaBand } from "@/components/site/ui";
import { services, whyUs, roles, meta } from "@/lib/content";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: meta(
      "About Mindpeak Digital — Your Digital Growth Partner",
      "Meet the multidisciplinary agency combining creative talent, technical expertise and innovative technology.",
    ),
  }),
  component: About,
});

const values = [
  { t: "Clarity", d: "Honest communication and clear expectations at every stage." },
  { t: "Craft", d: "Attention to detail in everything we design, build and produce." },
  { t: "Curiosity", d: "Continuously exploring new tools, AI and better ways of working." },
  { t: "Partnership", d: "Treating your goals as our own, from kickoff to support." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A full-service digital agency built to help you{" "}
            <span className="text-gradient">build, automate, create and grow.</span>
          </>
        }
        copy="Mindpeak Digital combines creative talent, technical expertise and innovative technology to deliver connected digital solutions."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <Reveal>
          <img
            src={studio}
            alt="Mindpeak studio workspace"
            loading="lazy"
            width={1200}
            height={912}
            className="rounded-3xl border border-border object-cover"
          />
        </Reveal>
        <div>
          <SectionHeading eyebrow="Our story" title="Many specialists. One connected team." />
          <Reveal
            delay={100}
            className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            <p>
              Businesses today need more than a single skill. A website connects to a CRM, a
              campaign needs video, a course needs payments and onboarding.
            </p>
            <p>
              Mindpeak Digital brings specialists across web, AI, automation, marketing, e-learning
              and design together, so your digital work feels connected instead of scattered.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:grid-cols-2 md:gap-5 md:py-16 lg:px-8">
        {(
          [
            [
              Target,
              "Mission",
              "To help businesses turn ideas into impactful digital experiences through technology, creativity and intelligent solutions.",
            ],
            [
              Eye,
              "Vision",
              "To be a trusted international partner for businesses building their future in a digital world.",
            ],
          ] as const
        ).map(([Icon, t, d], i) => (
          <Reveal
            key={t}
            delay={i * 100}
            className="card-glow relative overflow-hidden rounded-2xl p-7 md:p-10"
          >
            <div className="glow-orb -right-16 -top-16 h-48 w-48 bg-primary/20" />
            <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-brand shadow-glow">
              <Icon className="h-6 w-6" />
            </span>
            <p className="eyebrow relative mt-6">{t}</p>
            <p className="relative mt-4 font-display text-xl leading-snug md:text-2xl">{d}</p>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16 lg:px-8">
        <SectionHeading eyebrow="Our values" title="What guides our work." />
        <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:mt-12 md:gap-5 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 80} className="card-glow rounded-2xl p-6 md:p-7">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{v.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-background-2 section-y">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Our multidisciplinary team"
              title="Six departments working as one."
            />
            <Link
              to="/team"
              className="group inline-flex items-center gap-2 self-start font-semibold hover:text-primary md:self-auto"
            >
              Meet the team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const I = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/30 p-4 transition-colors hover:border-primary/40 md:p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/60 text-primary transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                    <I className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{s.title}</span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section id="roles" className="mx-auto max-w-7xl px-5 section-y lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Roles"
            title="The roles behind every project."
            copy="Each project is handled by the right specialist, working together as one connected team."
          />
          <Link
            to="/team"
            className="group inline-flex items-center gap-2 self-start font-semibold hover:text-primary md:self-auto"
          >
            Meet the team{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        {/* Swipeable row on phones, grid on larger screens */}
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:mt-12 md:gap-5 lg:grid-cols-4">
          {roles.map((r, i) => (
            <Reveal
              key={r.title}
              delay={(i % 4) * 80}
              className="card-glow group flex h-full w-[80%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1 sm:w-auto"
            >
              <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-background-2">
                {r.photo ? (
                  <img
                    src={r.photo}
                    alt={r.name ? `${r.name}, ${r.title}` : r.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="grid-lines absolute inset-0 opacity-60" />
                    <div className="glow-orb h-32 w-32 bg-primary/25 transition-colors group-hover:bg-violet/30" />
                    <span className="glass relative grid h-16 w-16 place-items-center rounded-full">
                      <User className="h-7 w-7 text-muted-foreground" />
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-background/60 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                      Photo coming soon
                    </span>
                  </>
                )}
                <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs">
                  {r.department}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="text-lg font-semibold leading-snug">{r.title}</h3>
                {r.name && <p className="text-sm text-primary">{r.name}</p>}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
                <ul className="mt-4 space-y-2 border-t border-border pt-4">
                  {r.responsibilities.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 section-y lg:px-8">
        <SectionHeading
          eyebrow="Why businesses work with us"
          title="Expertise that moves your business forward."
        />
        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2">
          {whyUs.map((w) => (
            <Reveal key={w.n} className="flex gap-6 border-t border-border pt-6">
              <span className="font-display text-gradient text-2xl font-semibold">{w.n}</span>
              <div>
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-muted-foreground">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
