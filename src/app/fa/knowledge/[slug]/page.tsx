import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { CATEGORY_LABELS } from "@/data/articles";
import { getArticles } from "@/lib/storage";
import { formatDate } from "@/lib/date";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find(a => a.slug === slug);
  if (!article) return {};
  return { title: article.titleFa, description: article.excerptFa };
}

export default async function ArticleFA({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find(a => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Hero */}
        <section style={{ backgroundColor: "#0c1626", paddingTop: "120px", paddingBottom: "0", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px clamp(16px,5vw,48px) 48px" }}>
            <Link href="/fa/knowledge" style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "1px", textDecoration: "none", fontFamily: "Vazirmatn, Tahoma, sans-serif", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 6h6M7 3l3 3-3 3" stroke="#A18F7A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              دانش سنگ
            </Link>
            <p style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "1px", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "14px" }}>
              {CATEGORY_LABELS[article.category].fa} · {article.readTime} دقیقه · {formatDate(article.publishedAt, 'fa')}
            </p>
            <h1 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 400, color: "#fff", lineHeight: 1.4, fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "0" }}>
              {article.titleFa}
            </h1>
          </div>
        </section>

        {/* Cover image */}
        <div style={{ position: "relative", height: "clamp(260px,40vw,520px)", overflow: "hidden" }}>
          <Image src={article.image} alt={article.titleFa} fill sizes="100vw" style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0c1626 0%, transparent 30%)" }} />
        </div>

        {/* Body */}
        <section style={{ backgroundColor: "#fbfaf6", padding: "64px 0 100px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 clamp(16px,5vw,48px)" }}>
            <p style={{ fontSize: "16px", color: "rgba(29,35,48,0.8)", lineHeight: 2, marginBottom: "32px", fontFamily: "Vazirmatn, Tahoma, sans-serif", fontStyle: "italic" }}>
              {article.excerptFa}
            </p>
            <hr style={{ border: "none", borderTop: "1px solid rgba(161,143,122,0.25)", marginBottom: "40px" }} />
            {article.bodyFa.map((para, i) => (
              <p key={i} style={{ fontSize: "15px", color: "rgba(29,35,48,0.75)", lineHeight: 2, marginBottom: "24px", fontFamily: "Vazirmatn, Tahoma, sans-serif" }}>
                {para}
              </p>
            ))}
            <hr style={{ border: "none", borderTop: "1px solid rgba(161,143,122,0.25)", margin: "48px 0 40px" }} />
            <Link href="/fa/knowledge" className="collection-cta-btn">
              بازگشت به دانش سنگ ←
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
