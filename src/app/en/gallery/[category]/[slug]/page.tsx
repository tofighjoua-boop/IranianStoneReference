import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/gallery/ProductCard";
import { getCategoryBySlug, getParentCategory, categories } from "@/data/categories";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

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
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.nameEn} — ${product.color} Natural Stone`,
    description: product.descriptionEn.replace("[PLACEHOLDER] ", ""),
  };
}

export default async function ProductPageEN({ params }: Props) {
  const { category: catSlug, slug } = await params;

  const product = getProductBySlug(slug);
  const cat = getCategoryBySlug(catSlug);
  if (!product || !cat || product.categorySlug !== catSlug) notFound();

  const parentCat = getParentCategory(catSlug);
  const related = getRelatedProducts(product, 4);

  return (
    <>
      <Header locale="en" />
      <main>
        {/* Breadcrumb */}
        <div className="bg-[#0c1626] pt-28 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#f4f1ea]/40">
              <Link href="/en" className="hover:text-[#c6a25f] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/en/gallery" className="hover:text-[#c6a25f] transition-colors">Gallery</Link>
              <span>/</span>
              {parentCat && (
                <>
                  <Link href={`/en/gallery/${parentCat.slug}`} className="hover:text-[#c6a25f] transition-colors">{parentCat.nameEn}</Link>
                  <span>/</span>
                </>
              )}
              <Link href={`/en/gallery/${catSlug}`} className="hover:text-[#c6a25f] transition-colors">{cat.nameEn}</Link>
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
              <div className="relative aspect-square overflow-hidden">
                {product.categorySlug === "washbasins" && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: "-40px",
                      backgroundImage: `url(${product.images[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(32px) brightness(1.08) saturate(0.9)",
                      transform: "scale(1.2)",
                    }}
                  />
                )}
                <Image
                  src={product.images[0]}
                  alt={product.nameEn}
                  fill
                  className={product.categorySlug === "washbasins" ? "object-contain p-6" : "object-cover"}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.isExclusive && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="exclusive">Exclusive</Badge>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
                  {cat.nameEn}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1d2330] mb-2">
                  {product.nameEn}
                </h1>
                <p className="text-[#1d2330]/50 text-sm uppercase tracking-[0.1em] mb-6">
                  {product.color}
                </p>

                {/* Gold divider */}
                <div className="h-px bg-[#c6a25f]/30 mb-6" />

                <p className="text-[#1d2330]/70 text-base leading-relaxed mb-8">
                  {product.descriptionEn.replace("[PLACEHOLDER] ", "")}
                </p>

                {/* Specs grid */}
                <dl className="grid grid-cols-2 gap-4 mb-8">
                  {product.dimensions && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/40 font-bold mb-1">
                        Dimensions
                      </dt>
                      <dd className="text-sm text-[#1d2330]">{product.dimensions}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/40 font-bold mb-1">
                      Available Finishes
                    </dt>
                    <dd className="flex flex-wrap gap-1">
                      {product.finishes.map((f) => (
                        <span key={f} className="text-[9px] uppercase tracking-[0.1em] border border-[#e5e0d8] px-2 py-0.5 text-[#1d2330]/60">
                          {f}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {/* Characteristics */}
                {product.characteristics && (
                  <ul className="space-y-2 mb-8">
                    {product.characteristics.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-[#1d2330]/70">
                        <span className="w-1 h-1 bg-[#c6a25f] rounded-full flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <Link
                  href={`/en/contact?stone=${slug}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#c6a25f] text-[#0c1626] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors"
                >
                  Request Quote for This Stone
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <h2 className="font-display text-2xl font-bold text-[#1d2330] mb-8">
                More from {cat.nameEn}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} locale="en" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
