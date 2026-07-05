"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Wordmark from "@/components/ui/Wordmark";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/for-actors", label: "For Actors" },
  { href: "/for-casting", label: "For Casting" },
  { href: "/instacast", label: "Instacast" },
  { href: "/pricing", label: "Pricing" },
];

const MOBILE_LINKS = [
  ...LINKS,
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log in" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when menu open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "glass border-b"
            : "border-b border-transparent bg-transparent",
        )}
        style={scrolled ? undefined : { backdropFilter: "none" }}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-[var(--spacing-gutter)]">
          <Wordmark />

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "link-underline text-[0.8rem] tracking-[0.01em] transition-colors duration-300",
                    active ? "text-signal" : "text-bone-dim hover:text-bone",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/login"
              className="link-underline text-[0.8rem] tracking-[0.01em] text-bone-dim transition-colors hover:text-bone"
            >
              Log in
            </Link>
            <Button href="/join" arrow className="px-5 py-2.5 text-[0.76rem]">
              Join Actorly
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center text-bone md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-noir/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-[68px] items-center justify-between px-[var(--spacing-gutter)]">
              <Wordmark />
              <button
                className="flex h-10 w-10 items-center justify-center text-bone"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-[var(--spacing-gutter)]">
              {MOBILE_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.06,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className="flex items-baseline gap-4 border-b py-4 font-display text-[2rem] font-medium tracking-[-0.02em] text-bone"
                  >
                    <span className="slate text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-[var(--spacing-gutter)] pb-10">
              <Button href="/join" arrow magnetic={false} className="w-full">
                Join Actorly
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
