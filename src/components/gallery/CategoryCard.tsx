import Image from "next/image";
import Link from "next/link";
import { type Language } from "@/lib/translations";
import { type StoneCategory } from "@/data/categories";

interface CategoryCardProps {
  category: StoneCategory;
  locale: Language;
}

export function CategoryCard({ category, locale }: CategoryCardProps) {
  const isRTL = locale === "fa";

  return (
    <Link
      href={`/${locale}/gallery/${category.slug}`}
      className="group relative overflow-hidden block bg-[#0c1626]"
      style={{ aspectRatio: "3/2" }}
    >
      <Image
        src={category.image}
        alt={locale === "fa" ? category.nameFa : category.nameEn}
        fill
        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1626]/95 via-[#0c1626]/30 to-transparent" />

      {/* Content */}
      <div
        className={[
          "absolute bottom-0 p-6 sm:p-8",
          isRTL ? "right-0 text-right" : "left-0 text-left",
        ].join(" ")}
      >
        <h3
          className={[
            "text-[#f4f1ea] text-2xl sm:text-3xl font-bold mb-2 leading-tight",
            isRTL ? "" : "font-display",
          ].join(" ")}
        >
          {locale === "fa" ? category.nameFa : category.nameEn}
        </h3>
        <p className="text-[#f4f1ea]/60 text-sm leading-relaxed line-clamp-2 max-w-xs mb-4">
          {locale === "fa" ? category.descriptionFa : category.descriptionEn}
        </p>
        <span className="inline-flex items-center gap-1 text-[#c6a25f] text-[10px] uppercase tracking-[0.2em] font-bold">
          {locale === "fa" ? "مشاهده" : "Explore"}
          <span>{isRTL ? "←" : "→"}</span>
        </span>
      </div>

      {/* Gold accent */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c6a25f] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  );
}
