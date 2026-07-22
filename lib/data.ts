export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  featured?: boolean;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
}

export interface Skill {
  name: string;
  description: string;
}

export const brandName = "Alex Mercer";
export const brandTagline = "Full-Stack Developer & UI Engineer";
export const brandEmail = "hello@alexmorrow.dev";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/alexmorrow", key: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/alexmorrow", key: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/alexmorrowdev", key: "twitter" },
  { label: "Dribbble", href: "https://dribbble.com/alexmorrow", key: "dribbble" },
];