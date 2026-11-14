import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { contact, nav } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:h-18 lg:px-8">
          <Logo />
          <nav
            aria-label="Main"
            className="hidden items-center gap-1 rounded-full border border-border bg-card/40 p-1 backdrop-blur lg:flex"
          >
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "bg-accent text-foreground!" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">Start a Project</Link>
            </Button>
          </div>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-lg text-foreground transition-colors hover:bg-accent lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu: full-screen sheet below the header bar. */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-background/97 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="glow-orb -right-24 top-10 h-72 w-72 bg-primary/25" />
        <nav aria-label="Mobile" className="relative flex flex-col py-4">
          {nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              tabIndex={open ? 0 : -1}
              activeOptions={{ exact: n.to === "/" }}
              className={cn(
                "group flex items-center justify-between border-b border-border py-4 font-display text-2xl text-muted-foreground transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              activeProps={{ className: "text-foreground!" }}
            >
              {n.label}
              <ArrowRight className="h-5 w-5 opacity-40 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>
        <div className="relative mt-auto space-y-4 pt-6">
          <Button asChild variant="hero" size="xl" className="w-full">
            <Link to="/contact" tabIndex={open ? 0 : -1}>
              Start a Project <ArrowRight />
            </Link>
          </Button>
          <a
            href={`mailto:${contact.email}`}
            tabIndex={open ? 0 : -1}
            className="block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </>
  );
}
