import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <NewsletterSection />
      <Footer />
    </>
  );
}
