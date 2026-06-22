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
    title: `${cat.nameEn} — Natural Stone Gallery`,
    description: cat.descriptionEn,
  };
}

export default async function CategoryPageEN({ params, searchParams }: Props) {
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
      <Header locale="en" />
      <main>
        {/* Page header */}
        <section className="bg-[#090808] pt-36 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Link href="/en" className="hover:text-[#A18F7A] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/en/gallery" className="hover:text-[#A18F7A] transition-colors">Gallery</Link>
              <span>/</span>
              <span style={{ color: "#A18F7A" }}>{cat.nameEn}</span>
            </nav>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              {cat.nameEn}
            </h1>
            <p className="text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              {cat.descriptionEn}
            </p>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="bg-[#fbfaf6] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <Suspense>
              <ProductFilter
                locale="en"
                colors={colors}
                finishes={finishes}
              />
            </Suspense>

            {filtered.length === 0 ? (
              <div className="py-20 text-center text-[#1d2330]/40 text-sm">
                No stones match your filter.
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.slug} product={product} locale="en" />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#090808] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Interested in {cat.nameEn}? Request samples and custom quotes from our team.
            </p>
            <Link
              href={`/en/contact?stone=${slug}`}
              className="collection-cta-btn"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
