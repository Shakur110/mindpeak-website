import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/ui";
import { services, contact, meta } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: meta("Contact — Start a Project | Mindpeak Digital", "Tell us about your project and the Mindpeak Digital team will get back to you.") }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(120).optional(),
  service: z.string().min(1, "Please choose a service"),
  budget: z.string().optional(),
  description: z.string().trim().min(20, "Please describe your project (at least 20 characters)").max(3000),
});

const field = "mt-2 w-full rounded-lg border border-input bg-card/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    // Ready for a backend integration: send r.data to an email/CRM service here.
    setSent(true);
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Have a project in mind? <span className="text-gradient">Let's talk.</span></>} copy="Share a few details and we'll recommend the right approach." />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div className="glass rounded-2xl p-7 md:p-10">
          {sent ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-5 text-2xl font-semibold">Thank you — your details look good.</h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">Online delivery of this form isn't connected yet, so please also email us at {contact.email} to make sure we receive your enquiry.</p>
              <Button variant="glass" size="lg" className="mt-6" onClick={() => setSent(false)}>Send another</Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2">
              <F label="Name" err={errors.name}><input name="name" className={field} /></F>
              <F label="Email" err={errors.email}><input name="email" type="email" className={field} /></F>
              <F label="Company name (optional)"><input name="company" className={field} /></F>
              <F label="Service required" err={errors.service}>
                <select name="service" defaultValue="" className={field}>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                  <option>Not sure yet</option>
                </select>
              </F>
              <div className="md:col-span-2"><F label="Project budget (optional)">
                <select name="budget" defaultValue="" className={field}>
                  <option value="">Prefer not to say</option><option>Under $1,000</option><option>$1,000 – $5,000</option><option>$5,000 – $15,000</option><option>$15,000+</option>
                </select></F></div>
              <div className="md:col-span-2"><F label="Project description" err={errors.description}><textarea name="description" rows={6} className={field} /></F></div>
              <div className="md:col-span-2"><Button type="submit" variant="hero" size="xl">Submit Inquiry</Button></div>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-4 rounded-2xl border border-border p-6 hover:border-primary/40"><Mail className="h-5 w-5 text-primary" /><div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{contact.email}</p></div></a>
          <a href={contact.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border p-6 hover:border-primary/40"><MessageCircle className="h-5 w-5 text-primary" /><div><p className="text-sm text-muted-foreground">WhatsApp</p><p className="font-medium">{contact.whatsapp}</p></div></a>
          <div className="flex flex-wrap gap-2 pt-2">{contact.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{s.label}</a>)}</div>
        </aside>
      </section>
    </>
  );
}

function F({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium">{label}{children}{err && <span className="mt-1.5 block text-xs text-destructive">{err}</span>}</label>;
}
