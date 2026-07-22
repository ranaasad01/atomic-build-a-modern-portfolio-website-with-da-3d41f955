"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks, brandName, brandEmail, socialLinks } from "@/lib/data";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Heart } from 'lucide-react';

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={18} aria-hidden="true" />,
  linkedin: <Linkedin size={18} aria-hidden="true" />,
  twitter: <Twitter size={18} aria-hidden="true" />,
  dribbble: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  ),
};

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--surface)]"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display font-bold text-xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors mb-3 inline-block"
            >
              <span className="text-[var(--primary)]">A</span>
              {brandName.slice(1)}
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <a
              href={`mailto:${brandEmail}`}
              className="mt-4 inline-block text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
            >
              {brandEmail}
            </a>
          </div>

          {/* Nav column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
              {t("footer.navHeading")}
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
              {t("footer.socialHeading")}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors group"
                    aria-label={`${link.label} (opens in new tab)`}
                  >
                    <span className="group-hover:text-[var(--primary)] transition-colors">
                      {socialIcons[link.key]}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            {t("footer.copyright", { year: "2024", name: brandName })}
          </p>
          <p className="text-xs text-[var(--muted)] flex items-center gap-1">
            {t("footer.madeWith")}
            <Heart
              size={12}
              className="text-[var(--primary)] fill-[var(--primary)]"
              aria-hidden="true"
            />
            {t("footer.madeWithSuffix")}
          </p>
        </div>
      </div>
    </footer>
  );
}