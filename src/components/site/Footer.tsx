import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { contact, services } from "@/lib/content";

const socialIcons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  Instagram,
  X: Twitter,
  YouTube: Youtube,
};

type FooterPath = "/about" | "/work" | "/team" | "/contact" | "/insights" | "/services";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-2">
      <div className="glow-orb -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 bg-primary/10" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Top CTA strip */}
        <div className="flex flex-col gap-6 border-b border-border py-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-display text-2xl font-semibold leading-tight md:text-3xl">
            Ready to build something <span className="text-gradient">remarkable?</span>
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50 md:self-auto"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1.4fr_1.2fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building digital experiences, creating intelligent solutions and helping businesses
              grow through technology.
            </p>
            <div className="mt-6 flex gap-2">
              {contact.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-foreground"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{s.label}</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
          <Col title="Explore">
            <FL to="/about">About</FL>
            <FL to="/work">Our Work</FL>
            <FL to="/team">Our Team</FL>
            <FL to="/insights">Insights</FL>
            <FL to="/contact">Contact</FL>
          </Col>
          <Col title="Services">
            {services.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.short}
              </Link>
            ))}
          </Col>
          <Col title="Get in touch" className="col-span-2 md:col-span-1">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 break-all text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" /> {contact.email}
            </a>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-primary" /> WhatsApp{" "}
              {contact.whatsapp}
            </a>
          </Col>
        </div>
      </div>
      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Mindpeak Digital. All rights reserved.</p>
          <p>Build · Automate · Create · Grow</p>
        </div>
      </div>
    </footer>
  );
}

function Col({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FL({ to, children }: { to: FooterPath; children: ReactNode }) {
  return (
    <Link to={to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
      {children}
    </Link>
  );
}
