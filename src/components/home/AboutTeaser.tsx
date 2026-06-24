import Image from "next/image";
import Link from "next/link";
import { type Language, translations } from "@/lib/translations";

interface AboutTeaserProps {
  locale: Language;
}

const exportMarkets = [
  { code: "AE", label: "UAE" },
  { code: "QA", label: "Qatar" },
  { code: "RU", label: "Russia" },
  { code: "DE", label: "Germany" },
  { code: "US", label: "USA" },
];

const stats = [
  { en: "15+", label_en: "Years of Experience", label_fa: "سال تجربه" },
  { en: "5", label_en: "Export Markets", label_fa: "بازار صادراتی" },
  { en: "500+", label_en: "Projects Delivered", label_fa: "پروژه تحویل داده‌شده" },
];

export function AboutTeaser({ locale }: AboutTeaserProps) {
  const t = translations[locale];
  const a = t.aboutTeaser;
  const isRTL = locale === "fa";

  return (
    <section className="bg-[#0c1626] py-20 lg:py-28" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div className={isRTL ? "order-2 lg:order-1" : ""}>
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              {isRTL ? "درباره ما" : "About Us"}
            </p>
            <h2
              className={[
                "text-3xl sm:text-4xl font-bold text-[#f4f1ea] mb-6 leading-tight",
                isRTL ? "" : "font-display",
              ].join(" ")}
            >
              {a.heading}
            </h2>
            <p className="text-[#f4f1ea]/70 text-base leading-relaxed mb-10">
              {a.body}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map((s) => (
                <div key={s.en}>
                  <p className="text-[#c6a25f] text-2xl font-bold mb-1">{s.en}</p>
                  <p className="text-[#f4f1ea]/50 text-xs uppercase tracking-wide leading-tight">
                    {locale === "fa" ? s.label_fa : s.label_en}
                  </p>
                </div>
              ))}
            </div>

            {/* Export markets */}
            <div className="mb-10">
              <p className="text-[#f4f1ea]/40 text-[10px] uppercase tracking-[0.2em] mb-3">
                {a.exportTitle}
              </p>
              <div className="flex flex-wrap gap-3">
                {exportMarkets.map((m) => (
                  <span
                    key={m.code}
                    className="text-[10px] uppercase tracking-[0.15em] text-[#c6a25f] border border-[#c6a25f]/30 px-3 py-1"
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 text-[#c6a25f] text-xs uppercase tracking-[0.2em] font-bold border-b border-[#c6a25f]/50 pb-0.5 hover:border-[#c6a25f] hover:text-[#d8bd86] transition-colors group"
            >
              {a.cta}
              <span className="group-hover:translate-x-1 transition-transform">
                {isRTL ? "←" : "→"}
              </span>
            </Link>
          </div>

          {/* Image side */}
          <div className={[
            "relative",
            isRTL ? "order-1 lg:order-2" : "",
          ].join(" ")}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/collection-marble-dark.jpg"
                alt="ISR Showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#0c1626]/20" />
            </div>
            {/* Gold frame accent */}
            <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-[#c6a25f]/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
