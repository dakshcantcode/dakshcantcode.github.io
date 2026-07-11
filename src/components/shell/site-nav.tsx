"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TrebleClefIcon } from "@/components/shell/brand-icons";
import { StaffDivider } from "@/components/shell/notation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

/**
 * Floating frosted-glass nav (macOS style): translucent white glass with
 * dark ink, so it reads over both light and dark bands. The grand-staff
 * system stays — staff lines behind the links, a notehead-with-stem
 * marking the active page, treble-clef monogram.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="relative mx-auto flex h-14 max-w-5xl items-center justify-between overflow-hidden rounded-full border border-white/40 bg-white/60 px-6 shadow-lg shadow-black/[0.06] ring-1 ring-black/5 backdrop-blur-2xl backdrop-saturate-150">
        {/* Scroll progress along the capsule's bottom edge */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-6 bottom-0 h-[2px] origin-left rounded-full bg-foreground/50"
        />

        <Link
          href="/"
          className="flex items-center gap-2 text-foreground"
          aria-label="Daksh Agrawal, home"
        >
          <TrebleClefIcon className="text-foreground/70" />
          <span className="font-heading text-lg italic tracking-wide">DA</span>
        </Link>

        <div className="relative hidden md:block">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 bottom-[10px] space-y-[6px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-px w-full bg-foreground/20" />
            ))}
          </div>
          <ul className="relative flex items-center gap-10">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "group block pb-9 pt-3 font-heading text-sm italic transition-colors duration-300",
                      active
                        ? "text-foreground"
                        : "text-foreground/55 hover:text-foreground",
                    )}
                  >
                    <span className="block transition-transform duration-300 group-hover:-translate-y-0.5">
                      {link.label}
                    </span>
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-note"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 40,
                      }}
                      className="absolute bottom-[15px]"
                      style={{ left: "50%", marginLeft: -4 }}
                    >
                      <span className="block size-2 -rotate-[20deg] scale-x-125 rounded-full bg-foreground" />
                      <span className="absolute -top-2.5 right-0 h-2.5 w-px bg-foreground" />
                    </motion.span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="h-7 font-heading text-sm italic text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <Link href="/about#contact">Get in touch</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-foreground hover:bg-foreground/[0.06] hover:text-foreground md:hidden"
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="border-black/10 bg-white/80 text-foreground backdrop-blur-2xl"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="p-6 pt-12">
              <StaffDivider className="mb-6 opacity-60" />
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-2 font-heading text-3xl font-medium italic transition-colors",
                        pathname === link.href
                          ? "text-foreground"
                          : "text-foreground/50 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
