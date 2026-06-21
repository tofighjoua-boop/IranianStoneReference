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
  title: "سنگ طبیعی پریمیوم — مرمر، تراورتن، اونیکس و گرانیت",
  description:
    "مرجع سنگ ایرانیان — تأمین‌کنندهٔ پیشرو سنگ طبیعی پریمیوم. مرمر، تراورتن، اونیکس، گرانیت، روشویی و اکسسوری سنگی. صادرات به سراسر جهان از سال ۱۳۸۹.",
  alternates: {
    languages: { en: "/en" },
  },
};

export default function HomeFA() {
  return (
    <>
      <Header locale="fa" />
      <main>
        <HeroSection locale="fa" />
        <CategoriesGrid locale="fa" />
        <FeaturedProject locale="fa" />
        <ProcessTeaser locale="fa" />
        <AboutTeaser locale="fa" />
        <MagazineTeaser locale="fa" />
        <ContactNewsletter locale="fa" />
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
      <AIWidget />
    </>
  );
}
