import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "Alex Mercer — Full-Stack Developer & UI Engineer",
    template: "%s | Alex Mercer",
  },
  description:
    "Full-Stack Developer & UI Engineer based in New York. Crafting high-performance interfaces and elegant digital experiences.",
  openGraph: {
    title: "Alex Mercer — Full-Stack Developer & UI Engineer",
    description:
      "Full-Stack Developer & UI Engineer based in New York. Crafting high-performance interfaces and elegant digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-body antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}