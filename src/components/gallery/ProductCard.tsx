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
  const isWashbasin = product.categorySlug === "washbasins";

  return (
    <Link
      href={`/${locale}/gallery/${product.categorySlug}/${product.slug}`}
      className="group block bg-white"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>

        {/* Washbasin: blurred image as background so edges blend seamlessly */}
        {isWashbasin && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-40px",
              backgroundImage: `url(${product.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(28px) brightness(1.08) saturate(0.9)",
              transform: "scale(1.2)",
            }}
          />
        )}

        <Image
          src={product.thumbnail}
          alt={product.nameEn}
          fill
          className={
            isWashbasin
              ? "object-contain p-5 transition-transform duration-700 group-hover:scale-105"
              : "object-cover group-hover:scale-105 transition-transform duration-700"
          }
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Overlay — lighter for washbasins so blurred bg stays visible */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: isWashbasin
              ? "rgba(12,22,38,0.08)"
              : "rgba(12,22,38,0.20)",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isWashbasin
              ? "rgba(12,22,38,0.04)"
              : "rgba(12,22,38,0.10)",
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isExclusive && (
            <Badge variant="exclusive">{g.exclusive}</Badge>
          )}
          {product.isNew && (
            <Badge variant="new">New</Badge>
          )}
        </div>

        {/* ISR Code */}
        {product.code && (
          <span className="absolute bottom-3 left-3 text-[11px] font-sans font-semibold tracking-wider text-white bg-[#0c1626]/70 px-2 py-1 backdrop-blur-sm">
            {product.code}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border border-t-0 border-[#e5e0d8]">
        <h3
          className="text-[#1d2330] font-semibold text-base mb-1 group-hover:text-[#c6a25f] transition-colors"
        >
          {isRTL ? product.nameFa : product.nameEn}
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
