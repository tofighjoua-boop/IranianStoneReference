import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { CategoryCard } from "@/components/gallery/CategoryCard";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "گالری — مجموعه‌های سنگ طبیعی",
  description:
    "مجموعه‌های سنگ طبیعی پریمیوم ما را کشف کنید — مرمر، تراورتن، اونیکس، گرانیت، روشویی و اکسسوری.",
};

export default function GalleryFA() {
  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Page header */}
        <section className="bg-[#0c1626] pt-36 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              مجموعه‌ها
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f4f1ea] mb-4">
              گالری
            </h1>
            <p className="text-[#f4f1ea]/60 text-base max-w-xl mx-auto">
              شش دستهٔ سنگ طبیعی پریمیوم — از اسلب خام تا اشیاء تمام‌شده.
            </p>
          </div>
        </section>

        {/* Category grid */}
        <section className="bg-[#fbfaf6]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} locale="fa" />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0c1626] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[#f4f1ea]/60 text-sm mb-6">
              دنبال سنگ یا مقدار خاصی هستید؟ تیم ما به شما کمک می‌کند بهترین گزینه را پیدا کنید.
            </p>
            <a
              href="/fa/contact"
              className="inline-flex items-center px-8 py-4 bg-[#c6a25f] text-[#0c1626] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors"
            >
              درخواست قیمت
            </a>
          </div>
        </section>
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
