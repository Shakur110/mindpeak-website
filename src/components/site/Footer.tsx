import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { contact, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Building digital experiences, creating intelligent solutions and helping businesses grow through technology.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {contact.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground">{s.label}</a>
            ))}
          </div>
        </div>
        <Col title="Explore">
          <FL to="/about">About</FL><FL to="/work">Our Work</FL><FL to="/team">Our Team</FL><FL to="/contact">Contact</FL>
        </Col>
        <Col title="Our Services">
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="text-sm text-muted-foreground hover:text-foreground">{s.title}</Link>
          ))}
        </Col>
        <Col title="Resources">
          <FL to="/insights">Insights</FL><FL to="/services">All Services</FL>
        </Col>
        <Col title="Contact">
          <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-foreground">{contact.email}</a>
          <a href={contact.whatsappLink} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">WhatsApp: {contact.whatsapp}</a>
        </Col>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Copyright © 2026 Mindpeak Digital. All rights reserved.
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h4 className="mb-4 text-sm font-semibold">{title}</h4><div className="flex flex-col gap-2.5">{children}</div></div>;
}
function FL({ to, children }: { to: "/about" | "/work" | "/team" | "/contact" | "/insights" | "/services"; children: React.ReactNode }) {
  return <Link to={to} className="text-sm text-muted-foreground hover:text-foreground">{children}</Link>;
}
