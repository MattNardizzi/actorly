"use client";

import { useState } from "react";
import { ArrowRight, MailCheck } from "lucide-react";

const TOPICS = ["I'm an actor", "I'm casting", "I'm an agent", "Press / other"];

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-tungsten/30 bg-tungsten/[0.04] p-10 text-center">
        <MailCheck className="mx-auto h-10 w-10 text-tungsten" strokeWidth={1.3} />
        <h2 className="mt-5 font-display text-[1.6rem] font-light text-bone">Message sent</h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.9rem] leading-relaxed text-bone-dim">
          Thanks for reaching out — we&rsquo;ll be back to you within a working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
      <div>
        <p className="kicker mb-3">You are</p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] transition-colors ${
                topic === t ? "border-tungsten bg-tungsten/10 text-tungsten" : "border-ash-2 text-bone-dim hover:text-bone"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" placeholder="Your name" required />
        <Field label="Email" type="email" placeholder="you@email.ie" required />
      </div>

      <label className="block">
        <span className="kicker mb-2 block">Message</span>
        <textarea
          required
          rows={5}
          placeholder="How can we help?"
          className="w-full resize-none border border-ash-2 bg-noir px-4 py-3 text-[0.9rem] text-bone placeholder:text-bone-faint focus:border-tungsten/50 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-tungsten px-7 py-3.5 text-[0.84rem] font-medium text-noir transition-colors hover:bg-tungsten-soft"
      >
        Send message
        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="kicker mb-2 block">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border border-ash-2 bg-noir px-4 py-3 text-[0.9rem] text-bone placeholder:text-bone-faint focus:border-tungsten/50 focus:outline-none"
      />
    </label>
  );
}
