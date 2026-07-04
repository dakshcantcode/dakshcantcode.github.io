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

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/50"
      />
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
          aria-label="Daksh Agrawal — home"
        >
          <TrebleClefIcon className="text-white/80" />
          <span className="font-heading text-lg italic tracking-wide">DA</span>
        </Link>

        {/* Grand-staff link row: 5 staff lines behind the links; the active
            link is marked by a notehead-with-stem sitting on the staff. */}
        <div className="relative hidden md:block">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 bottom-[10px] space-y-[6px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-px w-full bg-white/15" />
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
                      active ? "text-white" : "text-white/60 hover:text-white",
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
                      <span className="block size-2 -rotate-[20deg] scale-x-125 rounded-full bg-white" />
                      <span className="absolute -top-2.5 right-0 h-2.5 w-px bg-white" />
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
            className="h-7 font-heading text-sm italic text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/about#contact">Get in touch</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-white hover:bg-white/10 hover:text-white md:hidden"
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="dark border-white/10 bg-background text-foreground"
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
                          : "text-muted-foreground hover:text-foreground",
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
