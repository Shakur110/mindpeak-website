import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Mindpeak Digital home">
      <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-brand shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary-foreground" aria-hidden>
          <path d="M3 19 9.5 7l3.5 6 2.5-4L21 19z" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Mindpeak<span className="text-muted-foreground font-normal"> Digital</span>
      </span>
    </Link>
  );
}
