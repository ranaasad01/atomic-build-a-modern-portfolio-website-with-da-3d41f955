"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks, brandName } from "@/lib/data";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

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

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-lg text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 tracking-tight"
          aria-label={`${brandName} — home`}
        >
          <span className="text-[var(--primary)]">A</span>
          {brandName.slice(1)}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.key}>
              <Link
                href={getHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive(link.href)
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {navT[link.key] ?? link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-semibold bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--accent)] transition-all duration-200 shadow-[0_0_16px_0_rgba(168,85,247,0.3)]"
          >
            {t("nav.cta")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileOpen((v) => !v)}
          className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--surface)]/95 backdrop-blur-xl border-b border-[var(--border)]"
          >
            <ul className="px-6 py-4 flex flex-col gap-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileOpen(false);
                    }}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "text-[var(--primary)] bg-[var(--primary)]/10"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-center bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--accent)] transition-colors"
                >
                  {t("nav.cta")}
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}