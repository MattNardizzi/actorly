import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { Kicker } from "@/components/ui/bits";
import { Reveal } from "@/components/fx/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Actorly team — actors, casting professionals, agents and press.",
};

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@actorly.ie" },
  { icon: MessageSquare, label: "Support", value: "support@actorly.ie" },
  { icon: MapPin, label: "Based", value: "Dublin, Ireland" },
];

export default function Contact() {
  return (
    <>
      <PageHero
        index="01"
        kicker="Contact"
        title="Let's talk."
        emphasis="We read everything."
        sub="Questions, feedback, a role you can't find the words for — reach out and a real person gets back to you."
        slateRight="CHANNEL · DIRECT"
      />

      <section className="px-[var(--spacing-gutter)] pb-28 md:pb-40">
        <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Kicker index="02">Reach us</Kicker>
            <div className="mt-8 space-y-6">
              {CHANNELS.map((c) => (
                <div key={c.label} className="flex items-center gap-4 border-b border-ash/50 pb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ash-2 text-tungsten">
                    <c.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="slate">{c.label}</p>
                    <p className="text-[1rem] text-bone">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-xs text-[0.9rem] leading-relaxed text-bone-dim text-pretty">
              For agents wanting to be listed in the Actorly directory, mention it in your
              message and we&rsquo;ll set you up.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-ash/70 bg-noir-2 p-8 frame md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
