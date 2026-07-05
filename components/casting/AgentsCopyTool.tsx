"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { AGENTS, type Agent } from "@/lib/mock";
import { cn } from "@/lib/utils";

const CATEGORIES: Agent["category"][] = ["Adult", "Child", "Model", "UK-based"];

/**
 * The agents tool from the brief: pick a category, copy every agent email in one go,
 * then BCC them from your own inbox. Real clipboard copy.
 */
export default function AgentsCopyTool() {
  const [cat, setCat] = useState<Agent["category"]>("Adult");
  const [copied, setCopied] = useState(false);

  const list = useMemo(() => AGENTS.filter((a) => a.category === cat), [cat]);
  const emails = list.map((a) => a.email).join(", ");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(emails);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op in preview */
    }
  };

  return (
    <div className="border border-ash/70 bg-noir-2 frame">
      <div className="flex items-center gap-2 border-b border-ash/60 px-5 py-3">
        <Mail className="h-4 w-4 text-tungsten" />
        <span className="kicker">Send to agents — BCC list</span>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 border-b border-ash/60 p-4">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-colors",
              cat === c
                ? "border-tungsten bg-tungsten/10 text-tungsten"
                : "border-ash-2 text-bone-dim hover:text-bone",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Agent list */}
      <ul className="max-h-56 divide-y divide-ash/40 overflow-y-auto">
        {list.map((a) => (
          <li key={a.name} className="flex items-center justify-between gap-3 px-5 py-3">
            <div className="min-w-0">
              <p className="truncate text-[0.88rem] text-bone">{a.name}</p>
              <p className="slate truncate">
                {a.location} · {a.roster} on roster
              </p>
            </div>
            <span className="shrink-0 font-mono text-[0.7rem] text-bone-faint">{a.email}</span>
          </li>
        ))}
      </ul>

      {/* Copy bar */}
      <div className="flex items-center justify-between gap-3 border-t border-ash/60 p-4">
        <span className="slate">{list.length} agents selected</span>
        <button
          onClick={copy}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] transition-colors",
            copied
              ? "border-tungsten bg-tungsten text-noir"
              : "border-ash-2 text-bone hover:border-tungsten hover:text-tungsten",
          )}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied — paste into BCC" : "Copy all emails"}
        </button>
      </div>
    </div>
  );
}
