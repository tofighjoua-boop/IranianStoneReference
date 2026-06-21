import Image from "next/image";
import Link from "next/link";
import { type Language, translations } from "@/lib/translations";
import { categories } from "@/data/categories";

interface CategoriesGridProps {
  locale: Language;
}

export function CategoriesGrid({ locale }: CategoriesGridProps) {
  const t = translations[locale];
  const isRTL = locale === "fa";

  return (
    <section className="bg-[#fbfaf6]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 pb-10 text-center">
        <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
          {isRTL ? "مجموعه‌ها" : "Collections"}
        </p>
        <h2
          className={[
            "text-3xl sm:text-4xl font-bold text-[#1d2330] mb-4",
            isRTL ? "" : "font-display",
          ].join(" ")}
        >
          {t.categories.heading}
        </h2>
        <p className="text-[#1d2330]/60 text-base max-w-xl mx-auto leading-relaxed">
          {t.categories.subheading}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/${locale}/gallery/${cat.slug}`}
            className="group relative overflow-hidden block"
            style={{ aspectRatio: "4/3" }}
          >
            {/* Image */}
            <Image
              src={cat.image}
              alt={locale === "fa" ? cat.nameFa : cat.nameEn}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i < 3}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1626]/90 via-[#0c1626]/20 to-transparent group-hover:from-[#0c1626]/80 transition-all duration-500" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <h3
                className={[
                  "text-[#f4f1ea] text-xl sm:text-2xl font-bold mb-1",
                  isRTL ? "" : "font-display",
                ].join(" ")}
              >
                {locale === "fa" ? cat.nameFa : cat.nameEn}
              </h3>
              <div className="flex items-center gap-2 text-[#c6a25f] text-xs uppercase tracking-[0.2em] font-semibold transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {t.categories.explore}
                <span>{isRTL ? "←" : "→"}</span>
              </div>
            </div>

            {/* Gold bottom accent */}
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c6a25f] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        ))}
      </div>
    </section>
  );
}
