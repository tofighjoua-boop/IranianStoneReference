import Image from "next/image";
import Link from "next/link";
import { type Language, translations } from "@/lib/translations";

interface HeroSectionProps {
  locale: Language;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = translations[locale];
  const isRTL = locale === "fa";

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background image */}
      <Image
        src="/images/banner-1.jpg"
        alt="Iranian Stone — Hero"
        fill
        priority
        className="object-cover object-center scale-105 collection-banner-img"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1626]/70 via-[#0c1626]/40 to-[#0c1626]/80" />

      {/* Gold accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c6a25f]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Brand stamp */}
        <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold">
          {isRTL ? "مرجع سنگ ایرانیان®" : "Iranian Stone Reference®"}
        </p>

        <h1
          className={[
            "font-bold text-[#f4f1ea] mb-6 leading-tight",
            isRTL
              ? "text-4xl sm:text-5xl md:text-6xl"
              : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display",
          ].join(" ")}
          style={isRTL ? { fontFamily: "Vazirmatn, Tahoma, sans-serif" } : {}}
        >
          {t.hero.tagline}
        </h1>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-[#c6a25f]/60" />
          <div className="w-1.5 h-1.5 bg-[#c6a25f] rotate-45" />
          <div className="h-px w-16 bg-[#c6a25f]/60" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#c6a25f] text-[#0c1626] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors min-w-[180px]"
          >
            {t.hero.cta_gallery}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 border border-[#f4f1ea]/50 text-[#f4f1ea] text-xs uppercase tracking-[0.2em] font-semibold hover:border-[#c6a25f] hover:text-[#c6a25f] transition-colors min-w-[180px]"
          >
            {t.hero.cta_contact}
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f4f1ea]/50">
        <div className="w-px h-10 bg-gradient-to-b from-[#c6a25f]/60 to-transparent" />
      </div>
    </section>
  );
}
