# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a modern portfolio website with dark mode

## Goal
Build a modern dark-mode portfolio website with animated hero, project showcase, about, and contact pages using Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Project type
portfolio

## Design system — match this exactly
- Color tokens: `--background: #0A0A0A`, `--foreground: #F5F5F5`, `--muted: #6B6B6B`, `--primary: #A855F7`, `--accent: #D946EF`, `--border: #1F1F1F`, `--brand-primary: #18181B`, `--brand-on-primary: #FFFFFF`, `--brand-secondary: #3F3F46`, `--brand-accent: #2563EB`, `--brand-background: #FAFAFA`, `--brand-foreground: #09090B`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `contact`, `cta`, `footer`, `hero`, `homeCta`, `nav`, `projects`, `skills`, `testimonials`, `valueProps`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
