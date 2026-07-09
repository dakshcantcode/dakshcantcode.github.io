import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
  Silkscreen,
} from "next/font/google";
import { MotionProvider } from "@/components/shell/motion-provider";
import { SiteNav } from "@/components/shell/site-nav";
import { SiteFooter } from "@/components/shell/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Header pixel font — compact enough to keep the existing layout bones.
const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// The loud 8-bit voice: hero name, eyebrows, dialogue box.
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Daksh Agrawal — Software Engineering & Machine Learning",
    template: "%s — Daksh Agrawal",
  },
  description:
    "Computer Science @ University of Waterloo. AI Engineer @ Kissht for Summer 2026 — open to future co-op terms.",
  openGraph: {
    title: "Daksh Agrawal — Software Engineering & Machine Learning",
    description:
      "Computer Science @ University of Waterloo. Award-winning hackathon builds, GraphQL systems, and deep learning projects.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Daksh Agrawal — Software Engineering & Machine Learning",
    description:
      "Computer Science @ University of Waterloo. AI Engineer @ Kissht for Summer 2026 — open to future co-op terms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} ${pressStart.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
