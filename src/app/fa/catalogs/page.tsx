import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { catalogs } from "@/data/catalogs";

export const metadata: Metadata = {
  title: "کاتالوگ‌ها — مرجع سنگ ایرانیان",
  description: "کاتالوگ‌های محصولات مرجع سنگ ایرانیان را مشاهده و دانلود کنید.",
};

export default function CatalogsFA() {
  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        <section className="bg-[#0c1626] pt-36 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "#A18F7A" }}>
              مستندات
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">کاتالوگ‌ها</h1>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              کاتالوگ‌های محصولات مرجع سنگ ایرانیان را مشاهده کنید.
            </p>
          </div>
        </section>

        <section className="bg-[#fbfaf6] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
            {catalogs.length === 0 ? (
              <p className="text-center text-[#1d2330]/40 text-sm py-20">
                در حال حاضر کاتالوگی موجود نیست.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {catalogs.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/fa/catalogs/${cat.slug}`}
                    className="group flex items-center gap-4 bg-white p-6 border border-[#1d2330]/10 hover:border-[#c6a25f] transition-colors"
                  >
                    <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-[#0c1626]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c6a25f" strokeWidth="1.8">
                        <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                        <path d="M15 2v5h5" />
                        <path d="M8 13h8M8 17h5" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-[#1d2330] font-bold text-lg mb-1 group-hover:text-[#c6a25f] transition-colors">
                        {cat.titleFa}
                      </span>
                      <span className="block text-[#1d2330]/50 text-sm leading-relaxed">
                        {cat.descriptionFa}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
