import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { ProductCard } from "@/components/gallery/ProductCard";
import { ProductFilter } from "@/components/gallery/ProductFilter";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

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

  const allProducts = getProductsByCategory(slug);

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
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Page header */}
        <section className="bg-[#0c1626] pt-36 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#f4f1ea]/40 mb-6 flex-row-reverse justify-end">
              <Link href="/fa" className="hover:text-[#c6a25f] transition-colors">خانه</Link>
              <span>/</span>
              <Link href="/fa/gallery" className="hover:text-[#c6a25f] transition-colors">گالری</Link>
              <span>/</span>
              <span className="text-[#c6a25f]">{cat.nameFa}</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#f4f1ea] mb-3">
              {cat.nameFa}
            </h1>
            <p className="text-[#f4f1ea]/60 text-base max-w-2xl">
              {cat.descriptionFa}
            </p>
          </div>
        </section>

        {/* Filter + Grid */}
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

        {/* CTA */}
        <section className="bg-[#0c1626] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[#f4f1ea]/60 text-sm mb-6">
              به {cat.nameFa} علاقه‌مند هستید؟ از تیم ما نمونه و استعلام سفارشی بخواهید.
            </p>
            <Link
              href={`/fa/contact?stone=${slug}`}
              className="inline-flex items-center px-8 py-4 bg-[#c6a25f] text-[#0c1626] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors"
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
