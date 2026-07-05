import type { Metadata } from "next";
import { Fraunces, Courier_Prime, Instrument_Sans } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/fx/Grain";
import CursorLight from "@/components/fx/CursorLight";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
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
      className={`${fraunces.variable} ${courier.variable} ${instrument.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        {/* Global vignette — seats the whole site in the dark */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[65]"
          style={{
            background:
              "radial-gradient(130% 100% at 50% 0%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <Grain />
        <CursorLight />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
