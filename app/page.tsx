"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Star, Zap, Code, Layers, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
type BRAND_NAME = any;
const BRAND_NAME: any = [];
type BRAND_TAGLINE = any;
const BRAND_TAGLINE: any = [];
type BRAND_LOCATION = any;
const BRAND_LOCATION: any = [];
import { useTranslations } from "next-intl";

// ─── Inline data ──────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    title: "Horizon Dashboard",
    description: "A real-time analytics platform for SaaS teams. Built with Next.js, Prisma, and WebSockets. Handles 50k+ events per day with sub-100ms latency.",
    image: "https://manjitkarve.com/wp-content/uploads/2017/07/02-Horizon-Roadmap.jpg",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSockets"],
    href: "/projects",
    accent: "from-violet-500/20 to-indigo-500/10",
  },
  {
    title: "Forma Design System",
    description: "A composable component library used across three production products. Includes 60+ accessible components, dark mode, and a Figma token pipeline.",
    image: "https://adsknews.autodesk.com/app/uploads/2026/04/FCC.png",
    tags: ["React", "Storybook", "Radix UI", "CSS Variables"],
    href: "/projects",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "Relay — API Gateway",
    description: "An open-source reverse proxy with rate limiting, JWT auth, and a visual rule editor. 1.2k GitHub stars and growing.",
    image: "https://www.salesforce-carlogavazzi.com/cdn-cgi/image/fit=scale-down,format=webp,quality=75/https://api.gavazziautomation.com/fileadmin/user_upload/News_RSLS_.jpg",
    tags: ["Go", "React", "Docker", "PostgreSQL"],
    href: "/projects",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

const SKILLS = [
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "GraphQL", category: "API" },
  { name: "Figma", category: "Design" },
];

const VALUE_PROPS = [
  {
    icon: Code,
    title: "Clean, Maintainable Code",
    body: "Every project ships with thorough documentation, typed interfaces, and a test suite. Future-you will thank present-me.",
  },
  {
    icon: Zap,
    title: "Performance by Default",
    body: "Core Web Vitals are a first-class concern, not an afterthought. Lighthouse 95+ is the baseline, not the goal.",
  },
  {
    icon: Layers,
    title: "Design-System Thinking",
    body: "UI built on composable primitives and design tokens so your product scales without visual debt accumulating.",
  },
  {
    icon: Star,
    title: "Shipped, Not Just Started",
    body: "I've taken products from zero to production and from legacy to modern. Delivery is the only metric that matters.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Alex rewrote our frontend in three months. The new codebase is half the size, twice as fast, and the team actually enjoys working in it.",
    name: "Priya Nair",
    role: "CTO, Stackline",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20Nair",
  },
  {
    quote: "Rare combination of strong engineering instincts and genuine design sensibility. The dashboard he built became our main sales demo.",
    name: "Jordan Elliot",
    role: "Head of Product, Orbit",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan%20Elliot",
  },
  {
    quote: "Delivered a fully accessible component library in six weeks. Every component had tests, stories, and docs on day one.",
    name: "Sam Okafor",
    role: "Engineering Lead, Forma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam%20Okafor",
  },
];

const STATS = [
  { value: "8+", label: "Years shipping product" },
  { value: "40+", label: "Projects delivered" },
  { value: "12", label: "Open-source packages" },
  { value: "95+", label: "Average Lighthouse score" },
];

// ─── Hero section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const t = useTranslations();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--bg-base)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[var(--accent)]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Location pill */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 text-[var(--accent)] text-sm font-medium tracking-wide">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {t("hero.location")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-[1.05] text-[var(--text-primary)] mb-6"
          >
            {t("hero.headline.line1")}{" "}
            <span className="text-[var(--accent)]">{t("hero.headline.accent")}</span>
            <br />
            {t("hero.headline.line2")}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10 text-pretty"
          >
            {t("hero.subhead")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-base)] font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-[0_0_24px_rgba(var(--accent-rgb),0.35)] hover:shadow-[0_0_32px_rgba(var(--accent-rgb),0.5)] hover:-translate-y-0.5"
            >
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all duration-300"
            >
              {t("hero.cta.secondary")}
              <Mail className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{t("hero.social.label")}</span>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/alexmorrow", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/alexmorrow", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/alexmorrowdev", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-9 w-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{t("hero.scroll")}</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--accent)]/60 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsSection() {
  const t = useTranslations();
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <Reveal>
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[var(--border)]">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center md:px-8">
                <span className="text-3xl md:text-4xl font-bold text-[var(--accent)] tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

// ─── Featured projects ────────────────────────────────────────────────────────

function FeaturedProjectsSection() {
  const t = useTranslations();

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <span className="text-xs text-[var(--accent)] uppercase tracking-widest font-medium mb-3 block">
                {t("projects.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                {t("projects.heading")}
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group shrink-0"
            >
              {t("projects.viewAll")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large featured card */}
          <Reveal className="lg:col-span-2" delay={0}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden h-full shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-[var(--accent)]/30 transition-colors duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${FEATURED_PROJECTS[0].accent} opacity-60`} />
              <div className="relative h-52 overflow-hidden">
                <img
                  src={FEATURED_PROJECTS[0].image}
                  alt={FEATURED_PROJECTS[0].title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="relative p-7">
                <div className="flex flex-wrap gap-2 mb-4">
                  {FEATURED_PROJECTS[0].tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium border border-[var(--accent)]/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{FEATURED_PROJECTS[0].title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{FEATURED_PROJECTS[0].description}</p>
                <Link
                  href={FEATURED_PROJECTS[0].href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:gap-2.5 transition-all duration-200"
                >
                  {t("projects.caseStudy")} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </Reveal>

          {/* Two smaller cards stacked */}
          <div className="flex flex-col gap-6">
            {FEATURED_PROJECTS.slice(1).map((project, i) => (
              <Reveal key={project.title} delay={(i + 1) * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-[var(--accent)]/30 transition-colors duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-50`} />
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="relative p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium border border-[var(--accent)]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1.5">{project.title}</h3>
                    <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:gap-2 transition-all duration-200"
                    >
                      {t("projects.caseStudy")} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Value props ──────────────────────────────────────────────────────────────

function ValuePropsSection() {
  const t = useTranslations();
  const props = t.raw("valueProps.items") as { title: string; body: string }[];
  const icons = [Code, Zap, Layers, Star];

  return (
    <section className="py-24 md:py-32 bg-[var(--surface)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-xs text-[var(--accent)] uppercase tracking-widest font-medium mb-3 block">
              {t("valueProps.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("valueProps.heading")}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t("valueProps.subhead")}
            </p>
          </div>
        </Reveal>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {props.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`rounded-2xl border border-[var(--border)] bg-[var(--bg-base)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:border-[var(--accent)]/25 transition-colors duration-300 ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
                >
                  <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Skills section ───────────────────────────────────────────────────────────

function SkillsSection() {
  const t = useTranslations();

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <Reveal>
            <div>
              <span className="text-xs text-[var(--accent)] uppercase tracking-widest font-medium mb-3 block">
                {t("skills.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-5">
                {t("skills.heading")}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                {t("skills.body")}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all duration-200"
              >
                {t("skills.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* Right: skill pills */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-200 cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const t = useTranslations();
  const testimonials = t.raw("testimonials.items") as { quote: string; name: string; role: string; avatar: string }[];

  return (
    <section className="py-24 md:py-32 bg-[var(--surface)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs text-[var(--accent)] uppercase tracking-widest font-medium mb-3 block">
              {t("testimonials.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {t("testimonials.heading")}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-base)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.25)] hover:border-[var(--accent)]/25 transition-colors duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-[var(--border)]">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--accent)]/20"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA section ──────────────────────────────────────────────────────────────

function CTASection() {
  const t = useTranslations();

  return (
    <Reveal>
      <section id="contact" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="relative rounded-3xl border border-[var(--accent)]/20 bg-[var(--surface)] overflow-hidden p-12 md:p-20 text-center shadow-[0_1px_2px_rgba(0,0,0,0.12),0_16px_48px_-12px_rgba(0,0,0,0.4)]">
            {/* Glow */}
            <div className="absolute inset-0 -z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 text-[var(--accent)] text-xs font-medium tracking-wide mb-6">
                {t("cta.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5 text-balance">
                {t("cta.heading")}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl mx-auto mb-10">
                {t("cta.body")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--bg-base)] font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-[0_0_24px_rgba(var(--accent-rgb),0.4)] hover:shadow-[0_0_36px_rgba(var(--accent-rgb),0.55)] hover:-translate-y-0.5"
                >
                  {t("cta.primary")}
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all duration-300"
                >
                  {t("cta.secondary")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedProjectsSection />
      <ValuePropsSection />
      <SkillsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}