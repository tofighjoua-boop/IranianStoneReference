import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { CatalogPopup } from "@/components/layout/CatalogPopup";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionSections } from "@/components/home/CollectionSections";
import { BottomBanner } from "@/components/home/BottomBanner";
import { BannerProvider } from "@/components/home/BannerProvider";
import { TechnologySection } from "@/components/home/TechnologySection";
import { ContactNewsletter } from "@/components/home/ContactNewsletter";

export const metadata: Metadata = {
  title: "Premium Natural Stone — Marble, Travertine, Onyx & Granite | Iranian Stone Reference",
  description:
    "Iranian Stone Reference — leading B2B supplier of premium natural stone. Marble, travertine, onyx, granite, stone washbasins and accessories. Exporting worldwide since 2010.",
  alternates: {
    languages: { fa: "/fa" },
  },
};

export default function HomeEN() {
  return (
    <>
      <Header locale="en" />
      <main>
        <BannerProvider>
          <HeroSection locale="en" />
          <CollectionSections locale="en" />
          <BottomBanner locale="en" />
        </BannerProvider>
        <TechnologySection locale="en" />
        <ContactNewsletter locale="en" />
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
      <CatalogPopup locale="en" />
    </>
  );
}
