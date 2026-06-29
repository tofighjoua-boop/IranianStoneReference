import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/gallery/ProductCard";
import { WashbasinViewer } from "@/components/gallery/WashbasinViewer";
import { getCategoryBySlug, getParentCategory, categories } from "@/data/categories";
import { products } from "@/data/products";
import { getProducts } from "@/lib/storage";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.nameEn} — سنگ طبیعی`,
    description: product.descriptionFa.replace("[PLACEHOLDER] ", ""),
  };
}

export default async function ProductPageFA({ params }: Props) {
  const { category: catSlug, slug } = await params;

  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.slug === slug);
  const cat = getCategoryBySlug(catSlug);
  if (!product || !cat || product.categorySlug !== catSlug) notFound();

  const parentCat = getParentCategory(catSlug);
  const related = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Breadcrumb */}
        <div className="bg-[#0c1626] pt-28 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#f4f1ea]/40 flex-row-reverse justify-end">
              <Link href="/fa" className="hover:text-[#c6a25f] transition-colors">خانه</Link>
              <span>/</span>
              <Link href="/fa/gallery" className="hover:text-[#c6a25f] transition-colors">گالری</Link>
              <span>/</span>
              {parentCat && (
                <>
                  <Link href={`/fa/gallery/${parentCat.slug}`} className="hover:text-[#c6a25f] transition-colors">{parentCat.nameFa}</Link>
                  <span>/</span>
                </>
              )}
              <Link href={`/fa/gallery/${catSlug}`} className="hover:text-[#c6a25f] transition-colors">{cat.nameFa}</Link>
              <span>/</span>
              <span className="text-[#c6a25f]">{product.nameEn}</span>
            </nav>
          </div>
        </div>

        {/* Main product section */}
        <section className="bg-[#fbfaf6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Image */}
              <div className="order-2 lg:order-1">
                {product.categorySlug === "washbasins" ? (
                  <WashbasinViewer
                    images={product.images}
                    productName={product.nameEn}
                    locale="fa"
                  />
                ) : (
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.nameEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    {product.isExclusive && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="exclusive">ویژه</Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center order-1 lg:order-2">
                <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
                  {cat.nameFa}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1d2330] mb-2">
                  {product.nameEn}
                </h1>
                <p className="text-[#1d2330]/50 text-sm uppercase tracking-[0.1em] mb-6">
                  {product.colorFa}
                </p>

                <div className="h-px bg-[#c6a25f]/30 mb-6" />

                <p className="text-[#1d2330]/70 text-base leading-relaxed mb-8">
                  {product.descriptionFa.replace("[PLACEHOLDER] ", "")}
                </p>

                <dl className="grid grid-cols-2 gap-4 mb-8">
                  {product.dimensions && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/40 font-bold mb-1">
                        ابعاد
                      </dt>
                      <dd className="text-sm text-[#1d2330]">{product.dimensions}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/40 font-bold mb-1">
                      فینیش‌های موجود
                    </dt>
                    <dd className="flex flex-wrap gap-1">
                      {product.finishesFa.map((f, i) => (
                        <span key={i} className="text-[9px] uppercase tracking-[0.1em] border border-[#e5e0d8] px-2 py-0.5 text-[#1d2330]/60">
                          {f}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {product.characteristicsFa && (
                  <ul className="space-y-2 mb-8">
                    {product.characteristicsFa.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-[#1d2330]/70">
                        <span className="w-1 h-1 bg-[#c6a25f] rounded-full flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/fa/contact?stone=${slug}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#c6a25f] text-[#0c1626] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors"
                >
                  درخواست قیمت این سنگ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <h2 className="text-2xl font-bold text-[#1d2330] mb-8">
                بیشتر از {cat.nameFa}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} locale="fa" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
