"use client";

import { useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import { cn } from "@/lib/utils";
type BRAND_NAME = any;
const BRAND_NAME: any = [];
type BRAND_TAGLINE = any;
const BRAND_TAGLINE: any = [];
type BRAND_LOCATION = any;
const BRAND_LOCATION: any = [];

// ─── Inline data ──────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    id: "exp1",
    period: "2022 – Present",
    role: "Senior Full-Stack Engineer",
    company: "Vercel",
    location: "Remote",
    description:
      "Lead development of Next.js-based SaaS products serving 40k+ monthly active users. Architected a real-time collaboration layer using WebSockets and Redis, cutting latency by 60%. Mentored a team of four engineers and drove adoption of TypeScript strict mode across all repositories.",
    type: "work",
  },
  {
    id: "exp2",
    period: "2020 – 2022",
    role: "Frontend Engineer",
    company: "Stripe",
    location: "New York, NY",
    description:
      "Built and maintained the Stripe Dashboard's component library used by 200+ internal engineers. Shipped the redesigned Payments overview page, improving task completion rates by 34%. Championed accessibility audits that brought the dashboard to WCAG AA compliance.",
    type: "work",
  },
  {
    id: "exp3",
    period: "2018 – 2020",
    role: "UI Engineer",
    company: "Figma",
    location: "San Francisco, CA",
    description:
      "Contributed to the canvas rendering engine and plugin API surface. Developed the first iteration of the Auto Layout inspector panel. Collaborated closely with design systems and product design teams to ship pixel-perfect interfaces at scale.",
    type: "work",
  },
  {
    id: "exp4",
    period: "2014 – 2018",
    role: "B.S. Computer Science",
    company: "NYU Tandon School of Engineering",
    location: "Brooklyn, NY",
    description:
      "Graduated with honors. Focused on human-computer interaction and distributed systems. Senior thesis on adaptive UI rendering for low-bandwidth environments, awarded Best Undergraduate Research by the CS department.",
    type: "education",
  },
];

const SKILLS = [
  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Radix UI", category: "Frontend" },
  { name: "WebGL / Three.js", category: "Frontend" },
  { name: "CSS / SCSS", category: "Frontend" },
  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Redis", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "tRPC", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  // Tools
  { name: "Git / GitHub", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "AWS", category: "Tools" },
  { name: "Turborepo", category: "Tools" },
  { name: "Vitest", category: "Tools" },
  { name: "Playwright", category: "Tools" },
];

const SKILL_CATEGORIES = ["Frontend", "Backend", "Tools"] as const;
type SkillCategory = (typeof SKILL_CATEGORIES)[number];

const CATEGORY_ICONS: Record<SkillCategory, string> = {
  Frontend: "✦",
  Backend: "◈",
  Tools: "⬡",
};

// ─── Timeline item component ──────────────────────────────────────────────────

const lineVariant: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const dotVariant: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof EXPERIENCES)[number];
  index: number;
  isLast: boolean;
}) {
  const t = useTranslations();
  return (
    <Reveal delay={index * 0.1}>
      <div className="relative flex gap-6 pb-12">
        {/* Line + dot */}
        <div className="relative flex flex-col items-center">
          <motion.div
            variants={dotVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn(
              "relative z-10 mt-1 h-3 w-3 rounded-full border-2 flex-shrink-0",
              item.type === "work"
                ? "border-[var(--accent)] bg-[var(--accent)]/20"
                : "border-white/40 bg-white/10"
            )}
          />
          {!isLast && (
            <motion.div
              variants={lineVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ originY: 0 }}
              className="mt-2 w-px flex-1 bg-gradient-to-b from-white/20 to-transparent"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-2">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/50 tabular-nums">
              {item.period}
            </span>
            {item.type === "education" && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/40">
                {t("about.timeline.educationBadge")}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold tracking-tight text-white">
            {item.role}
          </h3>
          <p className="mb-3 text-sm text-[var(--accent)]">
            {item.company}
            <span className="ml-2 text-white/30">·</span>
            <span className="ml-2 text-white/40">{item.location}</span>
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            {item.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Skill card ───────────────────────────────────────────────────────────────

function SkillCard({ name, index }: { name: string; index: number }) {
  return (
    <Reveal delay={index * 0.04}>
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
        <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors">
          {name}
        </span>
      </motion.div>
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");

  const filteredSkills = useMemo(
    () =>
      activeCategory === "All"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const allCategories: Array<SkillCategory | "All"> = ["All", ...SKILL_CATEGORIES];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-white">
      {/* ── Hero / Bio split ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/8 px-6 pb-24 pt-32 md:px-12 lg:px-20">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-[120px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            {/* Left — editorial heading */}
            <motion.div variants={slideInLeft} className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t("about.hero.eyebrow")}
              </p>
              <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                {t("about.hero.heading")}
              </h1>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <span className="text-sm text-white/40">{BRAND_LOCATION}</span>
              </div>
            </motion.div>

            {/* Right — bio paragraphs */}
            <motion.div variants={slideInRight} className="flex flex-col justify-center space-y-5">
              <p className="text-pretty text-lg leading-relaxed text-white/70">
                {t("about.hero.bio1")}
              </p>
              <p className="text-pretty text-base leading-relaxed text-white/55">
                {t("about.hero.bio2")}
              </p>
              <p className="text-pretty text-base leading-relaxed text-white/55">
                {t("about.hero.bio3")}
              </p>

              {/* Quick stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
                {(
                  t.raw("about.hero.stats") as {
                    value: string;
                    label: string;
                  }[]
                ).map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Experience timeline ───────────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t("about.timeline.eyebrow")}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t("about.timeline.heading")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_2px_1fr] lg:gap-16">
            {/* Work column */}
            <div>
              <Reveal>
                <p className="mb-8 text-xs font-semibold uppercase tracking-[0.15em] text-white/30">
                  {t("about.timeline.workLabel")}
                </p>
              </Reveal>
              {EXPERIENCES.filter((e) => e.type === "work").map((exp, i, arr) => (
                <TimelineItem
                  key={exp.id}
                  item={exp}
                  index={i}
                  isLast={i === arr.length - 1}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="hidden lg:block">
              <div className="h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
            </div>

            {/* Education column */}
            <div>
              <Reveal>
                <p className="mb-8 text-xs font-semibold uppercase tracking-[0.15em] text-white/30">
                  {t("about.timeline.educationLabel")}
                </p>
              </Reveal>
              {EXPERIENCES.filter((e) => e.type === "education").map(
                (exp, i, arr) => (
                  <TimelineItem
                    key={exp.id}
                    item={exp}
                    index={i}
                    isLast={i === arr.length - 1}
                  />
                )
              )}

              {/* Values / approach card */}
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                  <h3 className="mb-3 text-sm font-semibold text-white">
                    {t("about.values.heading")}
                  </h3>
                  <ul className="space-y-2.5">
                    {(
                      t.raw("about.values.items") as {
                        label: string;
                        text: string;
                      }[]
                    ).map((v, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-white/55">
                        <span className="mt-0.5 text-[var(--accent)]">✦</span>
                        <span>
                          <span className="font-medium text-white/80">
                            {v.label}
                          </span>{" "}
                          {v.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech stack ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/8 bg-white/[0.015] px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {t("about.stack.eyebrow")}
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {t("about.stack.heading")}
                </h2>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
                      activeCategory === cat
                        ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Grouped grid */}
          {activeCategory === "All" ? (
            <div className="space-y-10">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat}>
                  <Reveal>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-base text-[var(--accent)]">
                        {CATEGORY_ICONS[cat]}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">
                        {cat}
                      </span>
                      <span className="h-px flex-1 bg-white/8" />
                    </div>
                  </Reveal>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {SKILLS.filter((s) => s.category === cat).map((skill, i) => (
                      <SkillCard key={skill.name} name={skill.name} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Reveal>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-base text-[var(--accent)]">
                    {CATEGORY_ICONS[activeCategory as SkillCategory]}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">
                    {activeCategory}
                  </span>
                  <span className="h-px flex-1 bg-white/8" />
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredSkills.map((skill, i) => (
                  <SkillCard key={skill.name} name={skill.name} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Personal / beyond code ───────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Reveal className="lg:col-span-1">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {t("about.beyond.eyebrow")}
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {t("about.beyond.heading")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  {t("about.beyond.subtext")}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              {(
                t.raw("about.beyond.cards") as {
                  icon: string;
                  title: string;
                  text: string;
                }[]
              ).map((card, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
                  >
                    <span className="mb-3 block text-2xl">{card.icon}</span>
                    <h3 className="mb-1.5 text-sm font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">
                      {card.text}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-t border-white/8 px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t("about.cta.eyebrow")}
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t("about.cta.heading")}
              </h2>
              <p className="max-w-md text-pretty text-base text-white/50">
                {t("about.cta.subtext")}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-black shadow-[0_4px_24px_-4px_var(--accent)] transition-shadow hover:shadow-[0_6px_32px_-4px_var(--accent)]"
              >
                {t("about.cta.button")}
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}