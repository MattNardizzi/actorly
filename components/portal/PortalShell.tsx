"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Aperture, LogOut, Menu, X, Bell } from "lucide-react";
import { face } from "@/lib/mock";
import { cn } from "@/lib/utils";

export type NavItem = { key: string; label: string; icon: React.ElementType; badge?: number };

export default function PortalShell({
  roleLabel,
  items,
  active,
  onSelect,
  title,
  subtitle,
  actions,
  user,
  children,
}: {
  roleLabel: string;
  items: NavItem[];
  active: string;
  onSelect: (key: string) => void;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  user: { name: string; img: number; meta: string };
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="relative flex h-full flex-col">
      {/* faint blueprint register behind the console rail */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(180deg,black,transparent_55%)]"
      />

      <div className="relative flex items-center gap-2.5 border-b px-6 py-6">
        <Aperture className="h-5 w-5 text-signal" strokeWidth={1.4} />
        <span className="font-display text-[1.2rem] font-medium tracking-[-0.02em] text-bone">Actorly</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-signal/30 px-2.5 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-signal-ink">
          <span className="signal-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          {roleLabel}
        </span>
      </div>

      <nav className="relative flex-1 space-y-1 px-3 py-4">
        {items.map((it) => {
          const on = active === it.key;
          return (
            <button
              key={it.key}
              onClick={() => {
                onSelect(it.key);
                setOpen(false);
              }}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-[3px] px-3 py-2.5 text-left text-[0.86rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                on ? "bg-signal/[0.08] text-signal-ink" : "text-bone-dim hover:bg-char hover:text-bone",
              )}
            >
              {/* signal edge marker — the active rail lights up */}
              <span
                className={cn(
                  "absolute inset-y-1.5 left-0 w-px transition-colors duration-500",
                  on ? "bg-signal" : "bg-transparent",
                )}
                aria-hidden
              />
              <it.icon
                className={cn("h-4.5 w-4.5 shrink-0 transition-colors", on ? "text-signal" : "")}
                strokeWidth={1.5}
              />
              <span className="flex-1">{it.label}</span>
              {it.badge ? (
                <span className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[0.62rem] font-medium tabular-nums transition-colors",
                  on ? "bg-signal text-noir" : "bg-ash-2 text-bone",
                )}>
                  {it.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="relative border-t p-3">
        <div className="flex items-center gap-3 rounded-[3px] border border-transparent px-3 py-2.5 transition-colors hover:border-ash/50 hover:bg-char/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={face(user.img)} alt="" className="duotone h-9 w-9 rounded-full object-cover ring-1 ring-inset ring-signal/20" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.84rem] text-bone">{user.name}</p>
            <p className="slate truncate">{user.meta}</p>
          </div>
        </div>
        <Link
          href="/"
          className="group mt-1 flex items-center gap-3 rounded-[3px] px-3 py-2.5 text-[0.82rem] text-bone-faint transition-colors hover:bg-char hover:text-bone"
        >
          <LogOut className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5" strokeWidth={1.5} />
          Exit to site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100svh] bg-noir lg:grid lg:grid-cols-[264px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-[100svh] border-r bg-noir-2 lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-noir/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 border-r bg-noir-2">
            <button className="absolute right-4 top-6 z-10 text-bone-dim transition-colors hover:text-bone" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="min-w-0">
        <header className="sticky top-0 z-[80] border-b bg-noir/70 backdrop-blur-xl">
          <div className="flex items-center gap-4 px-5 py-4 md:px-8">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ash-2 text-bone transition-colors hover:border-signal/50 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-[1.4rem] font-light leading-tight tracking-[-0.02em] text-bone md:text-[1.7rem]">
                {title}
              </h1>
              {subtitle && <p className="slate mt-1 truncate">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3">
              {actions}
              <button className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-ash-2 text-bone-dim transition-colors hover:border-signal/50 hover:text-bone" aria-label="Notifications">
                <Bell className="h-4 w-4" strokeWidth={1.6} />
                <span className="signal-dot absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-signal" />
              </button>
            </div>
          </div>
        </header>

        <div className="px-5 py-8 md:px-8 md:py-10">{children}</div>
      </div>
    </div>
  );
}
