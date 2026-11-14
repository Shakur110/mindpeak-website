import { createFileRoute } from "@tanstack/react-router";
import { cloneElement, useId, useState, type ReactElement, type ReactNode } from "react";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqSection, PageHero } from "@/components/site/ui";
import { services, contact, faqs, meta } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: meta(
      "Contact — Start a Project | Mindpeak Digital",
      "Tell us about your project and the Mindpeak Digital team will get back to you.",
    ),
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(120).optional(),
  service: z.string().min(1, "Please choose a service"),
  budget: z.string().optional(),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project (at least 20 characters)")
    .max(3000),
});
type Inquiry = z.infer<typeof schema>;

const budgets = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000+"];

const nextSteps = [
  {
    t: "We review your brief",
    d: "A specialist from the right team reads through your project details.",
  },
  { t: "Discovery call", d: "We book a short call to understand your goals, timeline and budget." },
  { t: "Proposal", d: "You receive a clear recommended approach, timeline and quote." },
];

function composeMessage(d: Inquiry) {
  return [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.company ? `Company: ${d.company}` : null,
    `Service: ${d.service}`,
    d.budget ? `Budget: ${d.budget}` : null,
    "",
    d.description,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

const fieldCls =
  "mt-2 block w-full rounded-xl border border-input bg-card/50 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive md:text-sm";

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [sent, setSent] = useState<Inquiry | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const r = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!r.success) {
      const errs: Partial<Record<keyof Inquiry, string>> = {};
      r.error.issues.forEach((i) => {
        const k = String(i.path[0]) as keyof Inquiry;
        errs[k] ??= i.message;
      });
      setErrors(errs);
      // Move focus to the first invalid field.
      const first = r.error.issues[0]?.path[0];
      if (first) (form.elements.namedItem(String(first)) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setSent(r.data);
    // Backend hook: when a form service or CRM is connected, send r.data there instead.
    const subject = `New project inquiry — ${r.data.service}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeMessage(r.data))}`;
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Have a project in mind? <span className="text-gradient">Let's talk.</span>
          </>
        }
        copy="Share a few details and we'll recommend the right approach."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 md:pb-24 lg:grid-cols-[1.5fr_1fr] lg:gap-10 lg:px-8">
        <div className="card-glow rounded-3xl p-6 md:p-10">
          {sent ? (
            <div className="py-8 text-center md:py-10" role="status">
              <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
              <h2 className="mt-5 text-2xl font-semibold">
                Almost there, {sent.name.split(" ")[0]}!
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Your email app should have opened with your inquiry ready to send. Prefer another
                way? Use one of the options below.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="hero" size="xl">
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`New project inquiry — ${sent.service}`)}&body=${encodeURIComponent(composeMessage(sent))}`}
                  >
                    <Mail /> Open email again
                  </a>
                </Button>
                <Button asChild variant="glass" size="xl">
                  <a
                    href={`${contact.whatsappLink}?text=${encodeURIComponent(composeMessage(sent))}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle /> Send on WhatsApp
                  </a>
                </Button>
              </div>
              <button
                type="button"
                className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={() => setSent(null)}
              >
                Start a new inquiry
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">Tell us about your project</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fields marked <span className="text-primary">*</span> are required.
              </p>
              <form onSubmit={submit} noValidate className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label="Name" required err={errors.name}>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={fieldCls}
                  />
                </Field>
                <Field label="Email" required err={errors.email}>
                  <input
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={fieldCls}
                  />
                </Field>
                <Field label="Company name">
                  <input
                    name="company"
                    autoComplete="organization"
                    placeholder="Optional"
                    className={fieldCls}
                  />
                </Field>
                <Field label="Service required" required err={errors.service}>
                  <select
                    name="service"
                    defaultValue=""
                    className={cn(fieldCls, "appearance-none")}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.slug}>{s.title}</option>
                    ))}
                    <option>Not sure yet</option>
                  </select>
                </Field>
                <fieldset className="md:col-span-2">
                  <legend className="text-sm font-medium">Project budget</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {budgets.map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" name="budget" value={b} className="peer sr-only" />
                        <span className="block rounded-xl border border-input bg-card/50 px-3 py-3 text-center text-sm text-muted-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary/15 peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring hover:border-primary/30">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="md:col-span-2">
                  <Field label="Project description" required err={errors.description}>
                    <textarea
                      name="description"
                      rows={6}
                      placeholder="What are you looking to build or improve? Any deadlines or links we should see?"
                      className={cn(fieldCls, "resize-y")}
                    />
                  </Field>
                </div>
                <div className="flex flex-col gap-4 md:col-span-2 sm:flex-row sm:items-center">
                  <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto">
                    Submit Inquiry <Send />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Submitting opens your email app with the details filled in.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>

        <aside className="space-y-4">
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40 md:p-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand">
              <Mail className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Email us</p>
              <p className="truncate font-medium">{contact.email}</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={contact.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40 md:p-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Chat on WhatsApp</p>
              <p className="truncate font-medium">{contact.whatsapp}</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </a>

          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h2 className="text-lg font-semibold">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/40 font-display text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{s.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>
      </section>

      <FaqSection items={faqs} title="Before you reach out." />
    </>
  );
}

function Field({
  label,
  err,
  required,
  children,
}: {
  label: string;
  err?: string | undefined;
  required?: boolean;
  children: ReactElement<Record<string, unknown>>;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {cloneElement(children, {
        id,
        "aria-required": required || undefined,
        "aria-invalid": err ? true : undefined,
        "aria-describedby": err ? errId : undefined,
      })}
      {err && <ErrorText id={errId}>{err}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span id={id} role="alert" className="mt-1.5 block text-xs text-destructive">
      {children}
    </span>
  );
}
