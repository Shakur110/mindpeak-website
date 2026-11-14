import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Reveal,
  SectionHeading,
  ServiceCard,
  PostCard,
  CtaBand,
  FaqSection,
  ToolsMarquee,
} from "@/components/site/ui";
import { WorkGrid } from "@/components/site/WorkGrid";
import { services, whyUs, processSteps, posts, faqs, meta } from "@/lib/content";
import heroVisual from "@/assets/hero-visual.jpg";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: meta(
      "Mindpeak Digital — Your Vision. Our Digital Expertise.",
      "A multidisciplinary digital agency for websites, AI video, automation, e-learning, marketing and branding.",
    ),
  }),
  component: Index,
});

const highlights = [
  "Strategy, design & build under one roof",
  "Modern platforms, automation & AI",
  "Clear communication from kickoff to launch",
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pt-36 lg:pb-28 lg:pt-40">
        <div className="grid-lines absolute inset-0" />
        <div className="glow-orb -left-40 top-10 h-[520px] w-[520px] bg-primary/30" />
        <div className="glow-orb right-0 top-40 h-[480px] w-[480px] bg-violet/25" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-8">
          <div className="animate-reveal">
            <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Digital Solutions Agency
              <span className="hidden text-foreground/40 sm:inline">·</span>
              <span className="hidden text-foreground sm:inline">Web · AI · Automation</span>
            </p>
            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[5.2rem]">
              Your Vision.
              <br />
              <span className="text-gradient">Our Digital Expertise.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-7">
              We help businesses turn ideas into impactful digital experiences through innovative
              technology, creative production and intelligent business solutions.
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap md:mt-10">
              <Button asChild variant="hero" size="xl">
                <Link to="/services">
                  Explore Our Services <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/contact">Start a Project</Link>
              </Button>
            </div>
            <ul className="mt-10 grid gap-2.5 border-t border-border pt-6 text-sm text-muted-foreground md:mt-12">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md animate-reveal [animation-delay:200ms] lg:max-w-none">
            <div className="absolute -inset-6 rounded-[2rem] bg-brand opacity-20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border animate-float">
              <img
                src={heroVisual}
                alt="Abstract glass shapes glowing in blue and purple light"
                width={1200}
                height={1200}
                fetchPriority="high"
                className="aspect-[4/3] w-full object-cover sm:aspect-square"
              />
            </div>
            <div className="glass absolute -bottom-5 left-4 rounded-xl px-4 py-3 sm:-left-4 sm:px-5 sm:py-4">
              <p className="text-xs text-muted-foreground">Six connected disciplines</p>
              <p className="mt-1 font-display text-sm font-semibold">
                Build · Automate · Create · Grow
              </p>
            </div>
          </div>
        </div>
      </section>

      <ToolsMarquee />

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 section-y lg:grid-cols-2 lg:gap-14 lg:px-8">
        <Reveal className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 rounded-[2rem] bg-brand opacity-10 blur-2xl" />
          <img
            src={studio}
            alt="Studio workspace with screens showing code, video editing and design"
            loading="lazy"
            width={1200}
            height={912}
            className="relative rounded-3xl border border-border object-cover"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Who we are"
            title="More Than an Agency. Your Digital Growth Partner."
          />
          <Reveal
            delay={100}
            className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            <p>
              At Mindpeak Digital, we bring together talented professionals across web development,
              artificial intelligence, automation, digital marketing and creative production.
            </p>
            <p>
              Our multidisciplinary approach allows us to deliver connected digital solutions that
              help businesses establish their presence, improve operations and reach new
              opportunities.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary"
            >
              More about us{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="relative bg-background-2 section-y">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Everything You Need to Build, Create and Grow."
              copy="From your first digital presence to advanced business automation, we provide the expertise to move your business forward."
            />
            <Button asChild variant="glass" size="lg" className="self-start md:self-auto">
              <Link to="/services">
                All services <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-5 section-y lg:px-8">
        <SectionHeading
          eyebrow="Why Mindpeak"
          title="Expertise That Moves Your Business Forward."
        />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border min-[480px]:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <Reveal
              key={w.n}
              delay={i * 90}
              className="group bg-background p-6 transition-colors hover:bg-card md:p-8"
            >
              <span className="font-display text-3xl font-semibold text-gradient md:text-4xl">
                {w.n}
              </span>
              <h3 className="mt-5 text-lg font-semibold md:mt-8">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Ideas Into Impactful Digital Experiences."
          copy="Explore selected projects showcasing our capabilities across web development, automation, creative production and digital solutions."
        />
        <div className="mt-10 md:mt-12">
          <WorkGrid limit={3} />
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-background-2 section-y">
        <div className="glow-orb -right-40 top-0 h-96 w-96 bg-violet/15" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Process" title="From First Conversation to Final Delivery." />
          <ol className="relative mt-12 grid gap-8 md:mt-16 lg:grid-cols-4 lg:gap-6">
            <div
              className="absolute bottom-6 left-6 top-6 w-px bg-brand opacity-40 lg:hidden"
              aria-hidden
            />
            <div
              className="absolute left-0 right-0 top-6 hidden h-px bg-brand opacity-40 lg:block"
              aria-hidden
            />
            {processSteps.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 110} className="relative flex gap-5 lg:block">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/40 bg-background font-display text-sm font-semibold shadow-glow">
                  {p.n}
                </span>
                <div className="pt-2 lg:pt-0">
                  <h3 className="text-xl font-semibold lg:mt-7">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Insights */}
      <section className="mx-auto max-w-7xl px-5 section-y lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Insights" title="Insights for a Digital World." />
          <Button asChild variant="glass" size="lg" className="self-start md:self-auto">
            <Link to="/insights">
              All insights <ArrowRight />
            </Link>
          </Button>
        </div>
        {/* Swipeable on phones, grid on larger screens */}
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {posts.slice(0, 3).map((p, i) => (
            <div key={p.slug} className="w-[85%] shrink-0 snap-start md:w-auto">
              <PostCard p={p} i={i} />
            </div>
          ))}
        </div>
      </section>

      <FaqSection items={faqs} />

      <CtaBand />
    </>
  );
}
