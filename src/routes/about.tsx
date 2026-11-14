import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, Reveal, SectionHeading, CtaBand } from "@/components/site/ui";
import { services, whyUs, meta } from "@/lib/content";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: meta("About Mindpeak Digital — Your Digital Growth Partner", "Meet the multidisciplinary agency combining creative talent, technical expertise and innovative technology.") }),
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
      <PageHero eyebrow="About us" title={<>A full-service digital agency built to help you <span className="text-gradient">build, automate, create and grow.</span></>}
        copy="Mindpeak Digital combines creative talent, technical expertise and innovative technology to deliver connected digital solutions." />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <Reveal><img src={studio} alt="Mindpeak studio workspace" loading="lazy" width={1200} height={912} className="rounded-3xl border border-border" /></Reveal>
        <div>
          <SectionHeading eyebrow="Our story" title="Many specialists. One connected team." />
          <Reveal delay={100} className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>Businesses today need more than a single skill. A website connects to a CRM, a campaign needs video, a course needs payments and onboarding.</p>
            <p>Mindpeak Digital brings specialists across web, AI, automation, marketing, e-learning and design together, so your digital work feels connected instead of scattered.</p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-16 md:grid-cols-2 lg:px-8">
        {[["Mission", "To help businesses turn ideas into impactful digital experiences through technology, creativity and intelligent solutions."], ["Vision", "To be a trusted international partner for businesses building their future in a digital world."]].map(([t, d], i) => (
          <Reveal key={t} delay={i * 100} className="glass rounded-2xl p-10">
            <p className="eyebrow">{t}</p><p className="mt-5 font-display text-2xl leading-snug">{d}</p>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading eyebrow="Our values" title="What guides our work." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => <Reveal key={v.t} delay={i * 80} className="rounded-2xl border border-border bg-card/50 p-7"><h3 className="text-lg font-semibold">{v.t}</h3><p className="mt-3 text-sm text-muted-foreground">{v.d}</p></Reveal>)}
        </div>
      </section>
      <section className="bg-background-2 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Our multidisciplinary team" title="Six departments working as one." />
            <Link to="/team" className="inline-flex items-center gap-2 font-semibold hover:text-primary">Meet the team <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => { const I = s.icon; return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="flex items-center gap-4 rounded-xl border border-border p-5 transition-colors hover:border-primary/40">
                <I className="h-5 w-5 text-primary" /><span className="font-medium">{s.title}</span>
              </Link>); })}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="Why businesses work with us" title="Expertise that moves your business forward." />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {whyUs.map((w) => <Reveal key={w.n} className="flex gap-6 border-t border-border pt-6"><span className="font-display text-gradient text-2xl font-semibold">{w.n}</span><div><h3 className="text-lg font-semibold">{w.title}</h3><p className="mt-2 text-muted-foreground">{w.text}</p></div></Reveal>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
