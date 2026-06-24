import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { type Language, translations } from "@/lib/translations";
import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  locale: Language;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const t = translations[locale];
  const g = t.gallery;
  const isRTL = locale === "fa";

  return (
    <Link
      href={`/${locale}/gallery/${product.categorySlug}/${product.slug}`}
      className="group block bg-white"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={product.thumbnail}
          alt={product.nameEn}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-[#0c1626]/20 group-hover:bg-[#0c1626]/10 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isExclusive && (
            <Badge variant="exclusive">{g.exclusive}</Badge>
          )}
          {product.isNew && (
            <Badge variant="new">New</Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border border-t-0 border-[#e5e0d8]">
        <h3
          className={[
            "text-[#1d2330] font-semibold text-base mb-1 group-hover:text-[#c6a25f] transition-colors",
            isRTL ? "" : "",
          ].join(" ")}
        >
          {product.nameEn}
        </h3>
        <p className="text-[#1d2330]/50 text-xs uppercase tracking-[0.1em]">
          {locale === "fa" ? product.colorFa : product.color}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {product.finishes.slice(0, 3).map((finish, i) => (
            <span
              key={finish}
              className="text-[9px] uppercase tracking-[0.1em] text-[#1d2330]/40 border border-[#e5e0d8] px-2 py-0.5"
            >
              {locale === "fa" ? (product.finishesFa[i] ?? finish) : finish}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
