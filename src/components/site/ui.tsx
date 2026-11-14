import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Post, Project, Service } from "@/lib/content";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, copy, center }: { eyebrow: string; title: ReactNode; copy?: string; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.1] md:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48">
      <div className="grid-lines absolute inset-0" />
      <div className="glow-orb -top-40 left-1/4 h-[420px] w-[420px] bg-primary/30" />
      <div className="glow-orb -top-20 right-0 h-[360px] w-[360px] bg-violet/25" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 animate-reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">{title}</h1>
        {copy && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy}</p>}
      </div>
    </section>
  );
}

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  const Icon = s.icon;
  return (
    <Reveal delay={(i % 3) * 90} className="h-full">
      <Link to="/services/$slug" params={{ slug: s.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
        <div className="glow-orb -right-16 -top-16 h-40 w-40 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/30" />
        <div className="relative flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-accent/60 text-primary transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </span>
          <span className="font-display text-sm text-muted-foreground">{s.number}</span>
        </div>
        <h3 className="relative mt-7 text-xl font-semibold">{s.title}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
        <div className="relative mt-6 flex flex-wrap gap-1.5">
          {s.tags.slice(0, 4).map((t) => <span key={t} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">{t}</span>)}
          {s.tags.length > 4 && <span className="rounded-md px-2 py-1 text-xs text-muted-foreground">+{s.tags.length - 4}</span>}
        </div>
        <span className="relative mt-auto pt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
          Explore Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

export function ProjectCard({ p, i = 0 }: { p: Project; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 90}>
      <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-card">
          <div className="grid-lines absolute inset-0 opacity-70" />
          <div className="glow-orb left-1/4 top-1/4 h-40 w-40 bg-primary/25 transition-transform duration-700 group-hover:scale-125" />
          <div className="glow-orb right-1/4 bottom-1/4 h-32 w-32 bg-violet/25" />
          <div className="relative flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs uppercase tracking-[0.2em]">Project image placeholder</span>
          </div>
          <span className="absolute left-4 top-4 rounded-md glass px-2.5 py-1 text-xs">{p.category}</span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <span className="mt-3 inline-block text-sm font-semibold text-primary">View Case Study</span>
      </Link>
    </Reveal>
  );
}

export function PostCard({ p, i = 0 }: { p: Post; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 90} className="h-full">
      <Link to="/insights/$slug" params={{ slug: p.slug }}
        className="group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="text-primary">{p.category}</span><span>·</span><span>{p.readTime} read</span>
          {p.draft && <span className="ml-auto rounded border border-border px-2 py-0.5">Draft</span>}
        </div>
        <h3 className="mt-6 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
        <span className="mt-auto pt-8 inline-flex items-center gap-1.5 text-sm font-semibold">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      </Link>
    </Reveal>
  );
}

export function CtaBand({ title = "Have a Project in Mind? Let's Make It Happen.", copy = "Whether you're building something new, improving an existing system or exploring what's possible with AI, our team is ready to help." }: { title?: string; copy?: string }) {
  return (
    <section className="px-5 py-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/25 bg-background-2 px-6 py-20 text-center md:px-16">
        <div className="glow-orb -left-20 -bottom-32 h-96 w-96 bg-primary/45" />
        <div className="glow-orb -right-20 -top-32 h-96 w-96 bg-violet/40" />
        <div className="grid-lines absolute inset-0" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{copy}</p>
          <Button asChild variant="hero" size="xl" className="mt-9"><Link to="/contact">Let's Talk About Your Project <ArrowRight /></Link></Button>
        </div>
      </Reveal>
    </section>
  );
}
