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
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <Aperture className="h-5 w-5 text-tungsten" strokeWidth={1.4} />
        <span className="font-display text-[1.2rem] font-medium tracking-[-0.02em] text-bone">Actorly</span>
        <span className="ml-auto rounded-full border border-ash-2 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-bone-faint">
          {roleLabel}
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
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
                "group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[0.86rem] transition-colors",
                on ? "bg-tungsten/10 text-tungsten" : "text-bone-dim hover:bg-char hover:text-bone",
              )}
            >
              <it.icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.5} />
              <span className="flex-1">{it.label}</span>
              {it.badge ? (
                <span className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.66rem] font-medium",
                  on ? "bg-tungsten text-noir" : "bg-ash-2 text-bone",
                )}>
                  {it.badge}
                </span>
              ) : null}
              {on && <span className="h-4 w-px bg-tungsten" />}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-ash/60 p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={face(user.img)} alt="" className="duotone h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.84rem] text-bone">{user.name}</p>
            <p className="slate truncate">{user.meta}</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.82rem] text-bone-faint transition-colors hover:bg-char hover:text-bone"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Exit to site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100svh] lg:grid lg:grid-cols-[264px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-[100svh] border-r border-ash/60 bg-noir-2 lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-noir/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-ash/60 bg-noir-2">
            <button className="absolute right-4 top-6 text-bone-dim" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="min-w-0">
        <header className="sticky top-0 z-[80] border-b border-ash/60 bg-noir/80 backdrop-blur-xl">
          <div className="flex items-center gap-4 px-5 py-4 md:px-8">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-5 w-5 text-bone" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-[1.4rem] font-light leading-tight text-bone md:text-[1.7rem]">
                {title}
              </h1>
              {subtitle && <p className="slate mt-0.5 truncate">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3">
              {actions}
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ash-2 text-bone-dim transition-colors hover:text-bone" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-tungsten" />
              </button>
            </div>
          </div>
        </header>

        <div className="px-5 py-8 md:px-8 md:py-10">{children}</div>
      </div>
    </div>
  );
}
