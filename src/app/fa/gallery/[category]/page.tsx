import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { CategoryCard } from "@/components/gallery/CategoryCard";
import { ProductCard } from "@/components/gallery/ProductCard";
import { ProductFilter } from "@/components/gallery/ProductFilter";
import { getCategoryBySlug, getSubcategories, categories } from "@/data/categories";
import { type Product } from "@/data/products";
import { getProducts } from "@/lib/storage";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ color?: string; finish?: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.nameFa} — گالری سنگ طبیعی`,
    description: cat.descriptionFa,
  };
}

export default async function CategoryPageFA({ params, searchParams }: Props) {
  const { category: slug } = await params;
  const { color: filterColor, finish: filterFinish } = await searchParams;

  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const subcategories = getSubcategories(slug);
  const isParent = subcategories.length > 0;

  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Page header */}
        <section className="bg-[#0c1626] pt-36 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <nav className="flex items-center gap-2 text-[10px] tracking-[0.15em] mb-6 flex-row-reverse justify-end" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Link href="/fa" className="hover:text-[#A18F7A] transition-colors">خانه</Link>
              <span>/</span>
              <Link href="/fa/gallery" className="hover:text-[#A18F7A] transition-colors">گالری</Link>
              <span>/</span>
              <span style={{ color: "#A18F7A" }}>{cat.nameFa}</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{cat.nameFa}</h1>
            <p className="text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              {cat.descriptionFa}
            </p>
          </div>
        </section>

        {isParent ? (
          /* ── Parent: show subcategory cards ── */
          <section className="bg-[#fbfaf6]">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {subcategories.map((sub) => (
                <CategoryCard key={sub.slug} category={sub} locale="fa" />
              ))}
            </div>
          </section>
        ) : (
          /* ── Leaf: show product listing ── */
          <ProductListingWrapper
            slug={slug}
            filterColor={filterColor}
            filterFinish={filterFinish}
            catNameFa={cat.nameFa}
          />
        )}

        <section className="bg-[#0c1626] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              به {cat.nameFa} علاقه‌مند هستید؟ از تیم ما نمونه و استعلام سفارشی بخواهید.
            </p>
            <Link
              href={`/fa/contact?stone=${slug}`}
              className="collection-cta-btn"
              style={{ fontFamily: "Vazirmatn, Tahoma, sans-serif" }}
            >
              درخواست قیمت
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}

async function ProductListingWrapper({
  slug,
  filterColor,
  filterFinish,
  catNameFa,
}: {
  slug: string;
  filterColor?: string;
  filterFinish?: string;
  catNameFa: string;
}) {
  const allProducts = (await getProducts()).filter((p: Product) => p.categorySlug === slug);

  const colors = [...new Set(allProducts.map((p) => p.color))].map((c) => ({
    value: c,
    label: c,
  }));
  const finishes = [...new Set(allProducts.flatMap((p) => p.finishes))].map((f) => ({
    value: f,
    label: f,
  }));

  const filtered = allProducts.filter((p) => {
    if (filterColor && filterColor !== "all" && p.color !== filterColor) return false;
    if (filterFinish && filterFinish !== "all" && !p.finishes.includes(filterFinish)) return false;
    return true;
  });

  return (
    <section className="bg-[#fbfaf6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Suspense>
          <ProductFilter locale="fa" colors={colors} finishes={finishes} />
        </Suspense>
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-[#1d2330]/40 text-sm">
            سنگی با این فیلتر یافت نشد.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} locale="fa" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
