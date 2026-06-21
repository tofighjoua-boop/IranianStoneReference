import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { AIWidget } from "@/components/layout/AIWidget";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { ProcessTeaser } from "@/components/home/ProcessTeaser";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { MagazineTeaser } from "@/components/home/MagazineTeaser";
import { ContactNewsletter } from "@/components/home/ContactNewsletter";

export const metadata: Metadata = {
  title: "Premium Natural Stone — Marble, Travertine, Onyx & Granite",
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
        <HeroSection locale="en" />
        <CategoriesGrid locale="en" />
        <FeaturedProject locale="en" />
        <ProcessTeaser locale="en" />
        <AboutTeaser locale="en" />
        <MagazineTeaser locale="en" />
        <ContactNewsletter locale="en" />
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
      <AIWidget />
    </>
  );
}
