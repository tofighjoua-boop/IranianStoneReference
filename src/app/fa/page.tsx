import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionSections } from "@/components/home/CollectionSections";
import { BottomBanner } from "@/components/home/BottomBanner";
import { TechnologySection } from "@/components/home/TechnologySection";
import { ContactNewsletter } from "@/components/home/ContactNewsletter";

export const metadata: Metadata = {
  title: "سنگ طبیعی پریمیوم — مرمر، تراورتن، اونیکس و گرانیت | مرجع سنگ ایرانیان",
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
        <CollectionSections locale="fa" />
        <BottomBanner locale="fa" />
        <TechnologySection locale="fa" />
        <ContactNewsletter locale="fa" />
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
