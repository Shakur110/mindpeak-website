/**
 * Mindpeak Digital site content. Edit this file to update services, projects,
 * team members, articles and contact details — pages render from it.
 */
import { Code2, Clapperboard, Workflow, GraduationCap, TrendingUp, Palette, type LucideIcon } from "lucide-react";

export const contact = {
  // Placeholders — replace with real details.
  email: "hello@mindpeakdigital.com",
  whatsapp: "+000 000 000 0000",
  whatsappLink: "https://wa.me/0000000000",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export type Service = {
  slug: string; number: string; title: string; short: string; description: string;
  icon: LucideIcon; tags: string[]; benefits: string[]; clients: string[];
};

export const services: Service[] = [
  { slug: "website-design-development", number: "01", title: "Website Design & Development", short: "Web Development",
    description: "We design and develop beautiful, functional websites that communicate your brand, engage visitors and turn opportunities into customers.",
    icon: Code2, tags: ["WordPress Development", "Wix Website Design", "Shopify & E-commerce", "Landing Pages", "Website Redesign", "Website Optimization"],
    benefits: ["A credible online presence that reflects your brand", "Faster, mobile-friendly pages visitors enjoy using", "Clear journeys that guide visitors toward enquiries or sales", "A site your team can update with confidence"],
    clients: ["Businesses launching their first website", "Brands outgrowing an outdated site", "Online stores and product businesses", "Teams running campaigns that need landing pages"] },
  { slug: "ai-video-production", number: "02", title: "AI Video Production & Editing", short: "AI & Video",
    description: "We combine artificial intelligence and creative storytelling to produce engaging video content for brands, businesses and digital creators.",
    icon: Clapperboard, tags: ["AI Video Production", "AI Cinematic Videos", "AI Advertisements", "AI Avatar Videos", "Social Media Video Editing", "Product Promotional Videos"],
    benefits: ["Produce more video content in less time", "Cinematic visuals without full production crews", "Content formatted for every social platform", "Consistent storytelling across your brand"],
    clients: ["Brands advertising on social media", "Content creators and personal brands", "Product companies launching new offers", "Educators producing course content"] },
  { slug: "business-automation-crm", number: "03", title: "Business Automation & CRM", short: "Automation",
    description: "We help businesses simplify operations, manage customer relationships and automate repetitive processes using intelligent digital systems.",
    icon: Workflow, tags: ["GoHighLevel", "HubSpot CRM", "Zoho CRM", "Make & n8n", "Workflow Automation", "AI Agents", "Email Automation"],
    benefits: ["Less manual, repetitive admin work", "A single view of every customer relationship", "Faster responses to leads and enquiries", "Systems that scale as your business grows"],
    clients: ["Service businesses handling many leads", "Agencies and consultancies", "Sales teams needing a structured pipeline", "Founders wanting to reclaim their time"] },
  { slug: "online-course-elearning", number: "04", title: "Online Course & E-learning Solutions", short: "E-learning",
    description: "We help coaches, educators and businesses transform their knowledge into professional online learning experiences.",
    icon: GraduationCap, tags: ["Online Course Platform Setup", "Learning Management Systems", "Membership Websites", "Course Sales Funnels", "Payment Integration", "Student Onboarding Automation"],
    benefits: ["A professional home for your courses", "Smooth enrolment and payment experiences", "Automated onboarding for new students", "A scalable way to share your expertise"],
    clients: ["Coaches and consultants", "Educators and training providers", "Companies running internal training", "Community and membership founders"] },
  { slug: "digital-marketing-growth", number: "05", title: "Digital Marketing & Growth", short: "Marketing",
    description: "We help brands attract the right audience, generate leads and build meaningful customer relationships through strategic digital marketing.",
    icon: TrendingUp, tags: ["Email Marketing", "Social Media Management", "Lead Generation", "Newsletter Setup", "Marketing Automation", "Conversion Optimization"],
    benefits: ["Reach the audience most likely to buy", "Steady lead generation systems", "Stronger relationships through email", "Better conversion from existing traffic"],
    clients: ["Growing small and medium businesses", "E-commerce brands", "B2B service providers", "Creators building an audience"] },
  { slug: "creative-design-branding", number: "06", title: "Creative Design & Branding", short: "Creative Design",
    description: "We create compelling visual experiences that help businesses communicate their identity and stand out in competitive markets.",
    icon: Palette, tags: ["Brand Identity", "Graphic Design", "Marketing Creatives", "Presentation Design", "Digital Product Design", "Advertising Creatives"],
    benefits: ["A distinctive and consistent identity", "Marketing materials that look professional", "Presentations that persuade", "Creative assets ready for every channel"],
    clients: ["Startups defining their brand", "Businesses refreshing their image", "Teams pitching to investors or clients", "Marketers needing ongoing creatives"] },
];

export const workCategories = ["All Projects", "Web Development", "AI & Video", "Automation", "E-learning", "Creative Design"] as const;

export type Project = {
  slug: string; title: string; category: (typeof workCategories)[number]; description: string;
  placeholder: boolean; objective: string; challenge: string; approach: string; solution: string;
  results?: string; // Only fill in with verified results supplied by the agency.
};

const ph = (slug: string, title: string, category: Project["category"], description: string): Project => ({
  slug, title, category, description, placeholder: true,
  objective: "Project objective to be supplied by the Mindpeak team.",
  challenge: "Describe the challenge the client faced before the project.",
  approach: "Explain the strategy, tools and process the team used.",
  solution: "Summarise the solution delivered and its key components.",
});

export const projects: Project[] = [
  ph("web-project-placeholder", "Website Project", "Web Development", "Placeholder for a website design and development case study."),
  ph("ai-video-placeholder", "AI Video Campaign", "AI & Video", "Placeholder for an AI video production case study."),
  ph("automation-placeholder", "CRM & Automation System", "Automation", "Placeholder for a business automation case study."),
  ph("elearning-placeholder", "Online Course Platform", "E-learning", "Placeholder for an e-learning platform case study."),
  ph("branding-placeholder", "Brand Identity Project", "Creative Design", "Placeholder for a branding and design case study."),
  ph("ecommerce-placeholder", "E-commerce Store", "Web Development", "Placeholder for a Shopify or e-commerce case study."),
];

export const blogCategories = ["Web Development", "Artificial Intelligence", "Business Automation", "Digital Marketing", "Online Education", "Creative Technology"] as const;

export type Post = { slug: string; title: string; category: (typeof blogCategories)[number]; excerpt: string; readTime: string; draft: boolean; body: string[] };

export const posts: Post[] = [
  { slug: "what-makes-a-business-website-work", title: "What Makes a Business Website Actually Work", category: "Web Development", readTime: "5 min", draft: true,
    excerpt: "Beyond good looks: the structure, clarity and speed that turn visitors into enquiries.",
    body: ["This is a draft article placeholder. Replace this text with the final article content.", "A strong business website starts with clarity: who you help, what you offer and what visitors should do next.", "Speed, mobile experience and trustworthy content all shape whether a visitor stays or leaves."] },
  { slug: "where-ai-video-fits-your-marketing", title: "Where AI Video Fits Into Your Marketing", category: "Artificial Intelligence", readTime: "4 min", draft: true,
    excerpt: "How brands can use AI-assisted video to produce more content without losing their voice.",
    body: ["This is a draft article placeholder. Replace this text with the final article content.", "AI tools make it possible to prototype, produce and adapt video faster than before.", "The best results still come from a clear story and a consistent brand style."] },
  { slug: "first-steps-to-automating-your-business", title: "First Steps to Automating Your Business", category: "Business Automation", readTime: "6 min", draft: true,
    excerpt: "A practical starting point for identifying the processes worth automating first.",
    body: ["This is a draft article placeholder. Replace this text with the final article content.", "Start by listing repetitive tasks your team does every week.", "Pick one process with clear inputs and outputs, automate it, then measure the time saved."] },
  { slug: "email-marketing-foundations", title: "Email Marketing Foundations for Growing Brands", category: "Digital Marketing", readTime: "5 min", draft: true,
    excerpt: "Building a list, writing useful emails and setting up simple automations.",
    body: ["This is a draft article placeholder. Replace this text with the final article content."] },
  { slug: "launching-your-first-online-course", title: "Launching Your First Online Course", category: "Online Education", readTime: "7 min", draft: true,
    excerpt: "Choosing a platform, structuring lessons and preparing a smooth student experience.",
    body: ["This is a draft article placeholder. Replace this text with the final article content."] },
];

export type TeamMember = { name: string; role: string; department: string; bio: string; photo?: string; socials?: { label: string; href: string }[] };

// Placeholder profiles — replace with real team members. Add new entries to grow the grid.
export const team: TeamMember[] = [
  { name: "Team Member", role: "Role to be confirmed", department: "Web Development", bio: "Short biography to be supplied." },
  { name: "Team Member", role: "Role to be confirmed", department: "AI & Video", bio: "Short biography to be supplied." },
  { name: "Team Member", role: "Role to be confirmed", department: "Automation & CRM", bio: "Short biography to be supplied." },
  { name: "Team Member", role: "Role to be confirmed", department: "E-learning", bio: "Short biography to be supplied." },
  { name: "Team Member", role: "Role to be confirmed", department: "Digital Marketing", bio: "Short biography to be supplied." },
  { name: "Team Member", role: "Role to be confirmed", department: "Creative Design", bio: "Short biography to be supplied." },
];

export const whyUs = [
  { n: "01", title: "Multidisciplinary Expertise", text: "Different specialists. Connected capabilities. One team working towards your goals." },
  { n: "02", title: "Technology-Driven Solutions", text: "We leverage modern platforms, automation and AI to deliver smarter solutions." },
  { n: "03", title: "Creative Thinking", text: "We combine strategy, creativity and technical execution to bring ideas to life." },
  { n: "04", title: "Client-Focused Delivery", text: "We prioritize communication, collaboration and solutions aligned with your business objectives." },
];

export const processSteps = [
  { n: "01", title: "Discover", text: "We understand your business, objectives and project requirements." },
  { n: "02", title: "Strategize", text: "We identify the right approach, tools and solutions for your goals." },
  { n: "03", title: "Create & Build", text: "Our specialists bring the strategy to life through collaborative execution." },
  { n: "04", title: "Deliver & Support", text: "We deliver the completed solution and provide agreed post-project support." },
];

export function meta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
