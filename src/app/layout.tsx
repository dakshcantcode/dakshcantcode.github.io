import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Daksh Agrawal — Software Engineering & Machine Learning",
    template: "%s — Daksh Agrawal",
  },
  description:
    "Computer Science @ University of Waterloo. Software engineering, machine learning, and 3D visualization — open to Summer 2026 internships & co-ops.",
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
      "Computer Science @ University of Waterloo. Open to Summer 2026 internships & co-ops.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
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
