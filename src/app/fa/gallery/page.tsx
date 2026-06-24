import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { CategoryCard } from "@/components/gallery/CategoryCard";
import { getTopLevelCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "گالری — مجموعه‌های سنگ طبیعی",
  description:
    "مجموعه‌های سنگ طبیعی پریمیوم ما را کشف کنید — مرمریت، تراورتن، مرمر، گرانیت، روشویی و اکسسوری.",
};

export default function GalleryFA() {
  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Page header */}
        <section className="bg-[#0c1626] pt-36 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "#A18F7A" }}>
              مجموعه‌ها
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              گالری
            </h1>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              شش دستهٔ سنگ طبیعی پریمیوم — از اسلب خام تا اشیاء تمام‌شده.
            </p>
          </div>
        </section>

        {/* Category grid */}
        <section className="bg-[#fbfaf6]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {getTopLevelCategories().map((cat) => (
              <CategoryCard key={cat.slug} category={cat} locale="fa" />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0c1626] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              دنبال سنگ یا مقدار خاصی هستید؟ تیم ما به شما کمک می‌کند بهترین گزینه را پیدا کنید.
            </p>
            <a
              href="/fa/contact"
              className="collection-cta-btn"
              style={{ fontFamily: "Vazirmatn, Tahoma, sans-serif" }}
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
