import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Geist_Mono } from "next/font/google";
import { CursorGlow } from "@/components/shell/cursor-glow";
import { MotionProvider } from "@/components/shell/motion-provider";
import { SiteNav } from "@/components/shell/site-nav";
import { SiteFooter } from "@/components/shell/site-footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Daksh Agrawal | Software & Machine Learning",
    template: "%s | Daksh Agrawal",
  },
  description:
    "Computer Science @ University of Waterloo. AI Engineer @ Kissht this summer, open to future co-op terms.",
  openGraph: {
    title: "Daksh Agrawal | Software & Machine Learning",
    description:
      "Computer Science @ University of Waterloo. Award-winning hackathon builds, GraphQL systems, and deep learning projects.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Daksh Agrawal | Software & Machine Learning",
    description:
      "Computer Science @ University of Waterloo. AI Engineer @ Kissht this summer, open to future co-op terms.",
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
      className={`${cormorant.variable} ${ebGaramond.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <CursorGlow />
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
