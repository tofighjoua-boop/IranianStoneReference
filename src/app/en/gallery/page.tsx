import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { CategoryCard } from "@/components/gallery/CategoryCard";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Gallery — Natural Stone Collections",
  description:
    "Explore our premium natural stone collections — marble, travertine, onyx, granite, stone washbasins and accessories.",
};

export default function GalleryEN() {
  return (
    <>
      <Header locale="en" />
      <main>
        {/* Page header */}
        <section className="bg-[#090808] pt-36 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "#A18F7A" }}>
              Collections
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Gallery
            </h1>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Six categories of premium natural stone — from raw slabs to finished objects.
            </p>
          </div>
        </section>

        {/* Category grid */}
        <section className="bg-[#fbfaf6]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} locale="en" />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#090808] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Looking for a specific stone or quantity? Our team will help you find the perfect match.
            </p>
            <a
              href="/en/contact"
              className="collection-cta-btn"
            >
              Request a Quote
            </a>
          </div>
        </section>
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
