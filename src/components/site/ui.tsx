import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { services, tools, type Faq, type Post, type Project, type Service } from "@/lib/content";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  center,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <p className={cn("eyebrow inline-flex items-center gap-2", center && "justify-center")}>
        <span className="h-px w-6 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[2rem] font-semibold leading-[1.1] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{copy}</p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-44">
      <div className="grid-lines absolute inset-0" />
      <div className="glow-orb -top-40 left-1/4 h-[420px] w-[420px] bg-primary/30" />
      <div className="glow-orb -top-20 right-0 h-[360px] w-[360px] bg-violet/25" />
      <div className="relative mx-auto max-w-7xl px-5 animate-reveal lg:px-8">
        <p className="eyebrow inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[2.5rem] font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {copy && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Pill-style filter buttons; scroll horizontally on small screens instead of wrapping into many rows. */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {options.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={value === c}
          onClick={() => onChange(c)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm transition-all",
            value === c
              ? "border-transparent bg-brand text-primary-foreground shadow-glow"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  const Icon = s.icon;
  return (
    <Reveal delay={(i % 3) * 90} className="h-full">
      <Link
        to="/services/$slug"
        params={{ slug: s.slug }}
        className="card-glow group flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow md:p-7"
      >
        <div className="glow-orb -right-16 -top-16 h-40 w-40 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/30" />
        <div className="relative flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-accent/60 text-primary transition-colors group-hover:border-transparent group-hover:bg-brand group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </span>
          <span className="font-display text-sm text-muted-foreground">{s.number}</span>
        </div>
        <h3 className="relative mt-6 text-xl font-semibold md:mt-7">{s.title}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
          {s.description}
        </p>
        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {s.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {s.tags.length > 3 && (
            <span className="rounded-full px-2 py-1 text-xs text-muted-foreground">
              +{s.tags.length - 3} more
            </span>
          )}
        </div>
        <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-foreground">
          Explore service{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

/** Visual for a project: its image if provided, otherwise branded artwork based on its category. */
export function ProjectVisual({
  p,
  className,
  large,
}: {
  p: Project;
  className?: string;
  large?: boolean;
}) {
  const Icon = services.find((s) => s.short === p.category)?.icon ?? Sparkles;
  if (p.image) {
    return (
      <div className={cn("relative overflow-hidden bg-card", className)}>
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden bg-card", className)}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, color-mix(in oklab, var(--primary) 35%, transparent), transparent 60%), radial-gradient(ellipse at bottom right, color-mix(in oklab, var(--violet) 30%, transparent), transparent 55%)",
        }}
      />
      <div className="grid-lines absolute inset-0 opacity-70" />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={cn(
            "glass grid place-items-center rounded-2xl text-foreground shadow-glow transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3",
            large ? "h-24 w-24" : "h-16 w-16",
          )}
        >
          <Icon className={large ? "h-11 w-11" : "h-7 w-7"} />
        </span>
      </div>
      {p.placeholder && (
        <span className="absolute bottom-3 right-3 rounded-full bg-background/60 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          Images coming soon
        </span>
      )}
    </div>
  );
}

export function ProjectCard({ p, i = 0 }: { p: Project; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 90} className="h-full">
      <Link to="/work/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col">
        <div className="relative">
          <ProjectVisual
            p={p}
            className="aspect-[4/3] rounded-2xl border border-border transition-colors group-hover:border-primary/40"
          />
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs">
            {p.category}
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
              {p.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:border-transparent group-hover:bg-brand">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function PostCard({ p, i = 0 }: { p: Post; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 90} className="h-full">
      <Link
        to="/insights/$slug"
        params={{ slug: p.slug }}
        className="card-glow group flex h-full flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow md:p-7"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{p.category}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {p.readTime} read
          </span>
          {p.draft && (
            <span className="ml-auto rounded-full border border-border px-2 py-0.5">Draft</span>
          )}
        </div>
        <h3 className="mt-5 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
          {p.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
          Read article{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Questions, answered.",
  copy = "Can't find what you're looking for? Send us a message and we'll get back to you.",
}: {
  items: Faq[];
  eyebrow?: string;
  title?: ReactNode;
  copy?: string;
}) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 section-y lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />
        <Reveal delay={100} className="mt-8">
          <Button asChild variant="glass" size="lg">
            <Link to="/contact">
              Ask us anything <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
          {items.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="rounded-2xl border border-border bg-card/40 px-5 transition-colors data-[state=open]:border-primary/40 data-[state=open]:bg-card/70 md:px-6"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold hover:no-underline md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

/** Infinite scrolling strip of platform names. */
export function ToolsMarquee() {
  const row = [...tools, ...tools];
  return (
    <section
      aria-label="Platforms we work with"
      className="border-y border-border bg-background-2/60 py-8"
    >
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Platforms & tools we build with
      </p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...row, ...row].map((t, i) => (
            <li
              key={`${t}-${i}`}
              aria-hidden={i >= tools.length}
              className="shrink-0 rounded-full border border-border bg-card/40 px-5 py-2.5 font-display text-sm font-medium text-foreground/80 md:text-base"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Have a Project in Mind? Let's Make It Happen.",
  copy = "Whether you're building something new, improving an existing system or exploring what's possible with AI, our team is ready to help.",
  action = "Let's Talk About Your Project",
}: {
  title?: string;
  copy?: string;
  action?: string;
}) {
  return (
    <section className="px-5 py-16 md:py-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/25 bg-background-2 px-6 py-14 text-center md:px-16 md:py-20">
        <div className="glow-orb -bottom-32 -left-20 h-96 w-96 bg-primary/45" />
        <div className="glow-orb -right-20 -top-32 h-96 w-96 bg-violet/40" />
        <div className="grid-lines absolute inset-0" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            {copy}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                {action} <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/work">See our work</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
