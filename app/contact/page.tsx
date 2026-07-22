"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Send, CheckCircle, AlertCircle, MapPin, ArrowRight } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
type BRAND_NAME = any;
const BRAND_NAME: any = [];
type BRAND_LOCATION = any;
const BRAND_LOCATION: any = [];

const CONTACT_LINKS = [
  {
    key: "email",
    label: "Email",
    value: "alex@alexmercer.dev",
    href: "mailto:alex@alexmercer.dev",
    icon: Mail,
    color: "var(--accent)",
  },
  {
    key: "github",
    label: "GitHub",
    value: "github.com/alexmorrow",
    href: "https://github.com/alexmorrow",
    icon: Github,
    color: "#6e7681",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/alexmorrow",
    href: "https://linkedin.com/in/alexmorrow",
    icon: Linkedin,
    color: "#0a66c2",
  },
  {
    key: "twitter",
    label: "Twitter / X",
    value: "@alexmorrowdev",
    href: "https://twitter.com/alexmorrowdev",
    icon: Twitter,
    color: "#1d9bf0",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -12,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = t("contact.form.errors.nameRequired");
    else if (form.name.trim().length < 2) newErrors.name = t("contact.form.errors.nameTooShort");

    if (!form.email.trim()) newErrors.email = t("contact.form.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = t("contact.form.errors.emailInvalid");

    if (!form.subject.trim()) newErrors.subject = t("contact.form.errors.subjectRequired");

    if (!form.message.trim()) newErrors.message = t("contact.form.errors.messageRequired");
    else if (form.message.trim().length < 20)
      newErrors.message = t("contact.form.errors.messageTooShort");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(false);
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 1400));
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-28 pb-32">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/4 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Editorial heading */}
        <Reveal>
          <div className="mb-16 md:mb-20">
            <p className="text-[var(--accent)] text-sm font-medium tracking-widest uppercase mb-4">
              {t("contact.eyebrow")}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-[0.95] mb-6">
              {t("contact.heading")}
            </h1>
            <p className="text-[var(--fg-muted)] text-lg md:text-xl max-w-xl leading-relaxed">
              {t("contact.subheading")}
            </p>
          </div>
        </Reveal>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
          {/* Form column */}
          <Reveal>
            <div className="relative">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center text-center py-24 px-8 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5"
                  >
                    <motion.div
                      variants={glowPulse}
                      initial="hidden"
                      animate="visible"
                      className="mb-6 relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-[var(--accent)]/30 blur-xl scale-150" />
                      <CheckCircle
                        className="relative h-16 w-16 text-[var(--accent)]"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      {t("contact.success.heading")}
                    </h2>
                    <p className="text-[var(--fg-muted)] leading-relaxed max-w-sm mb-8">
                      {t("contact.success.body")}
                    </p>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--accent)]/40 text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent)]/10 transition-all duration-300"
                    >
                      {t("contact.success.again")}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="space-y-6"
                  >
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-[var(--fg-muted)]"
                        >
                          {t("contact.form.nameLabel")}
                          <span className="text-[var(--accent)] ml-1">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder={t("contact.form.namePlaceholder")}
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]/60 ${
                            errors.name
                              ? "border-red-500/60 bg-red-500/5"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        />
                        {errors.name && (
                          <p className="flex items-center gap-1.5 text-xs text-red-400">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-[var(--fg-muted)]"
                        >
                          {t("contact.form.emailLabel")}
                          <span className="text-[var(--accent)] ml-1">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder={t("contact.form.emailPlaceholder")}
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]/60 ${
                            errors.email
                              ? "border-red-500/60 bg-red-500/5"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        />
                        {errors.email && (
                          <p className="flex items-center gap-1.5 text-xs text-red-400">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-[var(--fg-muted)]"
                      >
                        {t("contact.form.subjectLabel")}
                        <span className="text-[var(--accent)] ml-1">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder={t("contact.form.subjectPlaceholder")}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]/60 ${
                          errors.subject
                            ? "border-red-500/60 bg-red-500/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {errors.subject && (
                        <p className="flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-[var(--fg-muted)]"
                      >
                        {t("contact.form.messageLabel")}
                        <span className="text-[var(--accent)] ml-1">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t("contact.form.messagePlaceholder")}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]/60 resize-none leading-relaxed ${
                          errors.message
                            ? "border-red-500/60 bg-red-500/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      <div className="flex items-center justify-between">
                        {errors.message ? (
                          <p className="flex items-center gap-1.5 text-xs text-red-400">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                            {errors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="text-xs text-[var(--fg-muted)]/50 ml-auto">
                          {form.message.length} {t("contact.form.chars")}
                        </span>
                      </div>
                    </div>

                    {/* Submit error */}
                    {submitError && (
                      <p className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {t("contact.form.errors.submitFailed")}
                      </p>
                    )}

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_32px_-4px_var(--accent)] hover:shadow-[0_0_48px_-4px_var(--accent)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {submitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                            />
                            {t("contact.form.sending")}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            {t("contact.form.submit")}
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Side panel */}
          <div className="flex flex-col gap-6">
            {/* Location card */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[var(--accent)]/15 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--fg-muted)] mb-0.5">{t("contact.side.basedIn")}</p>
                  <p className="text-sm font-medium">{BRAND_LOCATION}, USA</p>
                </div>
              </div>
            </Reveal>

            {/* Availability badge */}
            <Reveal delay={0.15}>
              <div className="px-5 py-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <p className="text-sm font-semibold text-emerald-400">{t("contact.side.availableTitle")}</p>
                </div>
                <p className="text-xs text-[var(--fg-muted)] leading-relaxed pl-4">
                  {t("contact.side.availableBody")}
                </p>
              </div>
            </Reveal>

            {/* Contact links */}
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-widest px-1">
                  {t("contact.side.findMe")}
                </p>
                {CONTACT_LINKS.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      target={link.key !== "email" ? "_blank" : undefined}
                      rel={link.key !== "email" ? "noopener noreferrer" : undefined}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="group flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300"
                      style={
                        {
                          "--link-glow": link.color,
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_-2px_var(--link-glow)]"
                        style={{ backgroundColor: `${link.color}20` }}
                      >
                        <Icon
                          className="h-4 w-4 transition-colors duration-300"
                          style={{ color: link.color }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[var(--fg-muted)] mb-0.5">{link.label}</p>
                        <p className="text-sm font-medium truncate">{link.value}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--fg-muted)]/40 group-hover:text-[var(--fg-muted)] transition-colors duration-300 flex-shrink-0" />
                    </motion.a>
                  );
                })}
              </div>
            </Reveal>

            {/* Response time note */}
            <Reveal delay={0.25}>
              <p className="text-xs text-[var(--fg-muted)]/60 leading-relaxed px-1">
                {t("contact.side.responseNote")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}