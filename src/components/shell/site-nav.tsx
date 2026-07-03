"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-[0.2em] text-white"
        >
          DA
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative flex h-12 items-center">
                <Link
                  href={link.href}
                  className={cn(
                    "text-xs tracking-wide transition-colors duration-300",
                    active ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="h-7 text-xs text-white/80 hover:bg-white/10 hover:text-white"
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
            <ul className="flex flex-col gap-1 p-6 pt-12">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-2 text-2xl font-medium tracking-tight transition-colors",
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
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
