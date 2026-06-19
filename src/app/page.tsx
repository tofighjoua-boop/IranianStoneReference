import { Navigation } from "@/components/Navigation";
import { HeroBanner } from "@/components/HeroBanner";
import { CollectionSections } from "@/components/CollectionSections";
import { BottomBanner } from "@/components/BottomBanner";
import { TechnologySection } from "@/components/TechnologySection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroBanner />
        <CollectionSections />
        <BottomBanner />
        <TechnologySection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
