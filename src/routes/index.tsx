import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading, ServiceCard, PostCard, CtaBand } from "@/components/site/ui";
import { WorkGrid } from "@/components/site/WorkGrid";
import { services, whyUs, processSteps, posts, meta } from "@/lib/content";
import heroVisual from "@/assets/hero-visual.jpg";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: meta("Mindpeak Digital — Your Vision. Our Digital Expertise.", "A multidisciplinary digital agency for websites, AI video, automation, e-learning, marketing and branding.") }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid-lines absolute inset-0" />
        <div className="glow-orb -left-40 top-10 h-[520px] w-[520px] bg-primary/30" />
        <div className="glow-orb right-0 top-40 h-[480px] w-[480px] bg-violet/25" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div className="animate-reveal">
            <p className="eyebrow inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Digital Solutions Agency</p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-[5.2rem]">
              Your Vision.<br /><span className="text-gradient">Our Digital Expertise.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We help businesses turn ideas into impactful digital experiences through innovative technology, creative production and intelligent business solutions.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl"><Link to="/services">Explore Our Services <ArrowRight /></Link></Button>
              <Button asChild variant="glass" size="xl"><Link to="/contact">Start a Project</Link></Button>
            </div>
            <p className="mt-12 border-t border-border pt-6 text-sm tracking-wide text-muted-foreground">
              Creative Minds. Technical Expertise. Measurable Solutions.
            </p>
          </div>
          <div className="relative animate-reveal [animation-delay:200ms]">
            <div className="absolute -inset-6 rounded-[2rem] bg-brand opacity-20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border animate-float">
              <img src={heroVisual} alt="Abstract glass shapes glowing in blue and purple light" width={1200} height={1200} className="aspect-square w-full object-cover" />
            </div>
            <div className="glass absolute -bottom-6 -left-4 hidden rounded-xl px-5 py-4 sm:block">
              <p className="text-xs text-muted-foreground">Six connected disciplines</p>
              <p className="mt-1 font-display text-sm font-semibold">Build · Automate · Create · Grow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative">
          <img src={studio} alt="Studio workspace with screens showing code, video editing and design" loading="lazy" width={1200} height={912} className="rounded-3xl border border-border object-cover" />
        </Reveal>
        <div>
          <SectionHeading eyebrow="Who we are" title="More Than an Agency. Your Digital Growth Partner." />
          <Reveal delay={100} className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>At Mindpeak Digital, we bring together talented professionals across web development, artificial intelligence, automation, digital marketing and creative production.</p>
            <p>Our multidisciplinary approach allows us to deliver connected digital solutions that help businesses establish their presence, improve operations and reach new opportunities.</p>
            <Link to="/about" className="inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary">More about us <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="relative bg-background-2 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Services" title="Everything You Need to Build, Create and Grow." copy="From your first digital presence to advanced business automation, we provide the expertise to move your business forward." />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="Why Mindpeak" title="Expertise That Moves Your Business Forward." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <Reveal key={w.n} delay={i * 90} className="group bg-background p-8 transition-colors hover:bg-card">
              <span className="font-display text-4xl font-semibold text-gradient">{w.n}</span>
              <h3 className="mt-8 text-lg font-semibold">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="Our Work" title="Ideas Into Impactful Digital Experiences." copy="Explore selected projects showcasing our capabilities across web development, automation, creative production and digital solutions." />
        <div className="mt-12"><WorkGrid /></div>
      </section>

      {/* Process */}
      <section className="bg-background-2 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Process" title="From First Conversation to Final Delivery." />
          <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-brand opacity-40 lg:block" />
            {processSteps.map((p, i) => (
              <Reveal key={p.n} delay={i * 110} className="relative flex gap-5 lg:block">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/40 bg-background font-display text-sm font-semibold">{p.n}</span>
                <div><h3 className="text-xl font-semibold lg:mt-7">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p></div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />

      {/* Insights */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Insights for a Digital World." />
          <Button asChild variant="glass" size="lg"><Link to="/insights">All insights</Link></Button>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
        </div>
      </section>
    </>
  );
}
