"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, Code2 as Github, Sparkles } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Inline project data ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "1",
    title: "Luminary Design System",
    description:
      "A comprehensive component library built for scale. Includes 80+ accessible components, dark mode support, and a Figma token pipeline that keeps design and code in sync.",
    image: "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/a8e8d466-bc0b-4eae-ae4a-eeb9f809fab6/Hero%20banner%20image.png?h=474&fm=webp",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    category: "Design",
    href: "#",
    github: "#",
    featured: true,
    year: "2024",
  },
  {
    id: "2",
    title: "Orbit Analytics Platform",
    description:
      "Real-time data visualization dashboard for SaaS metrics. Processes over 2M events per day with sub-100ms query latency using ClickHouse and WebSockets.",
    image: "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/a6ac1170-ceb9-4572-ad1c-af21c7c7c8d5.png",
    tags: ["Next.js", "ClickHouse", "WebSockets", "Recharts"],
    category: "Web",
    href: "#",
    github: "#",
    featured: true,
    year: "2024",
  },
  {
    id: "3",
    title: "Pulse — Health Tracker",
    description:
      "Cross-platform mobile app for tracking fitness goals, sleep, and nutrition. Integrates with Apple Health and Google Fit. 12k active users in the first month.",
    image: "https://www.koozo.com/cdn/shop/files/qorfit_correct_creative.png?v=1774603313&width=1946",
    tags: ["React Native", "Expo", "Supabase", "HealthKit"],
    category: "Mobile",
    href: "#",
    github: "#",
    featured: false,
    year: "2023",
  },
  {
    id: "4",
    title: "Cartographer — Map Builder",
    description:
      "Interactive map-building tool for game designers and worldbuilders. Supports custom tile sets, layered annotations, and real-time collaboration via CRDTs.",
    image: "https://geospatial.com/wp-content/uploads/2024/11/Portfolio_preview_border-1024x370.png",
    tags: ["Canvas API", "CRDTs", "WebGL", "Node.js"],
    category: "Web",
    href: "#",
    github: "#",
    featured: false,
    year: "2023",
  },
  {
    id: "5",
    title: "Inkwell — Writing App",
    description:
      "Distraction-free writing environment with AI-assisted editing, version history, and beautiful export to PDF and ePub. Built for long-form writers.",
    image: "https://lovable.dev/cdn-cgi/image/width=3840,f=auto,fit=scale-down/https://assets.lovable.dev/templates/inkwell-brutalist-copywriter-portfolio-screenshot.webp",
    tags: ["Electron", "ProseMirror", "OpenAI", "SQLite"],
    category: "Other",
    href: "#",
    github: "#",
    featured: false,
    year: "2023",
  },
  {
    id: "6",
    title: "Beacon — Brand Identity",
    description:
      "Full brand identity system for a fintech startup: logo, color system, typography, motion guidelines, and a 60-page brand book delivered in 6 weeks.",
    image: "https://www.jaymehta.co/wp-content/uploads/2024/01/beacon-reality-branding.webp",
    tags: ["Figma", "Illustrator", "Motion", "Brand Strategy"],
    category: "Design",
    href: "#",
    github: "#",
    featured: false,
    year: "2022",
  },
  {
    id: "7",
    title: "Relay — API Gateway",
    description:
      "Open-source API gateway with rate limiting, JWT auth, request transformation, and a visual route editor. 800+ GitHub stars in the first quarter.",
    image: "https://www.salesforce-carlogavazzi.com/cdn-cgi/image/fit=scale-down,format=webp,quality=75/https://api.gavazziautomation.com/fileadmin/user_upload/News_RSLS_.jpg",
    tags: ["Go", "Redis", "Docker", "gRPC"],
    category: "Other",
    href: "#",
    github: "#",
    featured: false,
    year: "2022",
  },
  {
    id: "8",
    title: "Folio — Portfolio CMS",
    description:
      "Headless CMS purpose-built for creative portfolios. Drag-and-drop layout editor, image optimization pipeline, and one-click deploy to Vercel or Netlify.",
    image: "https://y4pdgnepgswqffpt.public.blob.vercel-storage.com/templates/62028/studio-folio-0nd8n7InKWDJwdaikIXQnOm2HMoRkJ",
    tags: ["Next.js", "Sanity", "Cloudinary", "Vercel"],
    category: "Web",
    href: "#",
    github: "#",
    featured: false,
    year: "2022",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Variants ─────────────────────────────────────────────────────────────────
const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -4, transition: { duration: 0.3, ease: "easeOut" } },
};

const glowPulse: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const filterUnderline: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations();
  const isLarge = project.featured && index < 2;

  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm",
        "shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]",
        "transition-colors duration-300 hover:border-[var(--accent)]/30",
        isLarge ? "md:col-span-2" : "",
      )}
    >
      {/* Purple glow on hover */}
      <motion.div
        variants={glowPulse}
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Image */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-white/[0.04]",
          isLarge ? "h-56 sm:h-72" : "h-44 sm:h-52",
        )}
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Year badge */}
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white/60 backdrop-blur-sm">
          {project.year}
        </span>

        {project.featured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)] backdrop-blur-sm">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {t("projects.featured")}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-lg font-semibold tracking-tight text-white">{project.title}</h2>
        <p className="flex-1 text-sm leading-relaxed text-white/55">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-0.5 text-xs font-medium text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          <Link
            href={project.href}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
            aria-label={`${t("projects.viewProject")} ${project.title}`}
          >
            {t("projects.viewProject")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={project.github}
            className="flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
            aria-label={`${t("projects.viewCode")} ${project.title}`}
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            {t("projects.viewCode")}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="min-h-screen bg-[var(--background)] pb-32 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Page header ── */}
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              {t("projects.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl text-balance">
              {t("projects.heading")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/55 text-pretty">
              {t("projects.subheading")}
            </p>
          </div>
        </Reveal>

        {/* ── Filter bar ── */}
        <Reveal delay={0.08}>
          <div
            className="mb-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label={t("projects.filterLabel")}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "relative rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                    isActive
                      ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80",
                  )}
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute inset-x-3 -bottom-px h-px rounded-full bg-[var(--accent)]"
                      variants={filterUnderline}
                      initial="hidden"
                      animate="visible"
                    />
                  )}
                </button>
              );
            })}

            <span className="ml-auto self-center text-sm text-white/30">
              {filtered.length} {t("projects.projectCount")}
            </span>
          </div>
        </Reveal>

        {/* ── Project grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, index) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="mb-4 rounded-full border border-white/10 bg-white/[0.04] p-5">
              <Sparkles className="h-8 w-8 text-white/20" aria-hidden="true" />
            </div>
            <p className="text-base font-medium text-white/40">{t("projects.emptyState")}</p>
          </motion.div>
        )}

        {/* ── CTA strip ── */}
        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 py-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]">
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 65%)",
              }}
            />
            <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t("projects.ctaHeading")}
            </h2>
            <p className="relative max-w-md text-sm leading-relaxed text-white/50">
              {t("projects.ctaBody")}
            </p>
            <Link
              href="/contact"
              className="relative mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {t("projects.ctaButton")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}