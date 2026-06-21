import Image from "next/image";
import { type Language, translations } from "@/lib/translations";

interface MagazineTeaserProps {
  locale: Language;
}

const placeholderArticles = [
  {
    slug: "marble-vs-travertine",
    title_en: "Marble vs. Travertine: Which Stone is Right for Your Project?",
    title_fa: "مرمر در مقابل تراورتن: کدام سنگ برای پروژه‌تان مناسب‌تر است؟",
    category_en: "Knowledge",
    category_fa: "دانش",
    image: "/images/banner-2.jpg",
  },
  {
    slug: "onyx-backlit-guide",
    title_en: "The Complete Guide to Backlit Onyx Installations",
    title_fa: "راهنمای کامل نصب اونیکس با نورپشتی",
    category_en: "Knowledge",
    category_fa: "دانش",
    image: "/images/banner-3.jpg",
  },
  {
    slug: "stone-care-tips",
    title_en: "5 Essential Stone Care Tips from Our Experts",
    title_fa: "۵ نکتهٔ اساسی مراقبت از سنگ از متخصصان ما",
    category_en: "Care Guide",
    category_fa: "راهنمای مراقبت",
    image: "/images/banner-1.jpg",
  },
];

export function MagazineTeaser({ locale }: MagazineTeaserProps) {
  const t = translations[locale];
  const m = t.magazineTeaser;
  const isRTL = locale === "fa";

  return (
    <section className="bg-[#fbfaf6] py-20 lg:py-28" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              {isRTL ? "مجله" : "Magazine"}
            </p>
            <h2
              className={[
                "text-3xl sm:text-4xl font-bold text-[#1d2330]",
                isRTL ? "" : "font-display",
              ].join(" ")}
            >
              {m.heading}
            </h2>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 text-[#1d2330]/40 text-xs uppercase tracking-[0.2em] font-semibold border border-[#1d2330]/20 px-4 py-2">
              {m.comingSoon}
            </span>
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 pointer-events-none select-none">
          {placeholderArticles.map((art, i) => (
            <article key={art.slug} className="group">
              <div className="relative aspect-[16/9] overflow-hidden mb-4">
                <Image
                  src={art.image}
                  alt={locale === "fa" ? art.title_fa : art.title_en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-[#0c1626]/30" />
                <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.2em] bg-[#c6a25f] text-[#0c1626] px-2 py-0.5 font-bold">
                  {locale === "fa" ? art.category_fa : art.category_en}
                </span>
              </div>
              <h3 className="text-[#1d2330] font-semibold text-base leading-snug line-clamp-2">
                {locale === "fa" ? art.title_fa : art.title_en}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
