import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ServiceCard, CtaBand, FaqSection, ToolsMarquee } from "@/components/site/ui";
import { services, faqs, meta } from "@/lib/content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: meta(
      "Services — Mindpeak Digital",
      "Websites, AI video, automation & CRM, e-learning, digital marketing and creative branding services.",
    ),
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything you need to <span className="text-gradient">build, create and grow.</span>
          </>
        }
        copy="From your first digital presence to advanced business automation, we provide the expertise to move your business forward."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:grid-cols-2 md:gap-5 md:pb-24 lg:grid-cols-3 lg:px-8">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} s={s} i={i} />
        ))}
      </section>
      <ToolsMarquee />
      <FaqSection items={faqs.slice(0, 4)} />
      <CtaBand />
    </>
  );
}
