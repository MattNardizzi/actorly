import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

/** Marketing chrome — the public-facing world. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
