import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import CursorLight from "@/components/fx/CursorLight";
import HUD from "@/components/fx/HUD";

/* Archivo — technical grotesque. The voice: headlines, wordmark, big statements.
   Ranges from tight-huge display to wide uppercase HUD. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  style: ["normal", "italic"],
});

/* Hanken Grotesk — clean neutral grotesque. Body, UI, forms, tables. */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

/* Martian Mono — wide technical mono. The instrument HUD: codes, coordinates,
   takes, timecodes, the domain signature. */
const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://actorly.ie"),
  title: {
    default: "Actorly — Ireland's casting platform",
    template: "%s · Actorly",
  },
  description:
    "The casting database for actors and casting directors in Ireland. Build a profile, get seen, post jobs, and send self-tapes with Instacast. Formerly castandhire.ie.",
  keywords: [
    "casting Ireland",
    "actors Ireland",
    "casting directors",
    "self-tape",
    "Irish actors",
    "casting database",
    "Screen Ireland",
  ],
  openGraph: {
    title: "Actorly — Ireland's casting platform",
    description:
      "Where actors are seen and casting directors see. Ireland's casting database, rebuilt.",
    url: "https://actorly.ie",
    siteName: "Actorly",
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Actorly — Ireland's casting platform",
    description: "Where actors are seen and casting directors see.",
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
      className={`${archivo.variable} ${hanken.variable} ${martian.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <CursorLight />
        <HUD />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
