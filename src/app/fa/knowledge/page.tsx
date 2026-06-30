import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { KnowledgeClient } from "@/components/knowledge/KnowledgeClient";
import { getArticles } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "دانش سنگ — راهنماها و مقالات تخصصی",
  description: "راهنماهای تخصصی درباره سنگ طبیعی — مرمریت، تراورتن، مرمر، گرانیت، مراقبت و نگهداری و صنعت سنگ ایران.",
};

export default async function KnowledgeFA() {
  const articles = await getArticles();

  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        <section className="bg-[#0c1626] pt-36 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "16px" }}>
              پایگاه دانش ISR
            </p>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 300, color: "#fff", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "16px" }}>
              دانش سنگ
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "560px", margin: "0 auto", fontFamily: "Vazirmatn, Tahoma, sans-serif", lineHeight: 1.9 }}>
              راهنماهای تخصصی درباره انتخاب سنگ طبیعی، مراقبت، پرداخت‌ها و صنعت سنگ ایران — نوشته شده برای معماران، طراحان و مشتریان آگاه.
            </p>
          </div>
        </section>

        <KnowledgeClient locale="fa" articles={articles} />
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
