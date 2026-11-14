import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/ui";
import { WorkGrid } from "@/components/site/WorkGrid";
import { meta } from "@/lib/content";

export const Route = createFileRoute("/work/")({
  head: () => ({ meta: meta("Our Work — Mindpeak Digital", "Selected projects across web development, AI video, automation, e-learning and creative design.") }),
  component: () => (
    <>
      <PageHero eyebrow="Our Work" title={<>Ideas into <span className="text-gradient">impactful digital experiences.</span></>}
        copy="Explore selected projects showcasing our capabilities across web development, automation, creative production and digital solutions." />
      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8"><WorkGrid /></section>
      <CtaBand />
    </>
  ),
});
