import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { articles, getArticleBySlug, CATEGORY_LABELS } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.titleEn, description: article.excerptEn };
}

export default async function ArticleEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Header locale="en" />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: "#0c1626", paddingTop: "120px", paddingBottom: "0", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px clamp(16px,5vw,48px) 48px" }}>
            <Link href="/en/knowledge" style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", fontFamily: "Lato, sans-serif", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 6H2M5 3l-3 3 3 3" stroke="#A18F7A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Stone Knowledge
            </Link>
            <p style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "14px" }}>
              {CATEGORY_LABELS[article.category].en} · {article.readTime} min read
            </p>
            <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 300, color: "#fff", lineHeight: 1.3, letterSpacing: "1px", fontFamily: "Lato, sans-serif", marginBottom: "0" }}>
              {article.titleEn}
            </h1>
          </div>
        </section>

        {/* Cover image */}
        <div style={{ position: "relative", height: "clamp(260px,40vw,520px)", overflow: "hidden" }}>
          <Image src={article.image} alt={article.titleEn} fill sizes="100vw" style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0c1626 0%, transparent 30%)" }} />
        </div>

        {/* Body */}
        <section style={{ backgroundColor: "#fbfaf6", padding: "64px 0 100px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 clamp(16px,5vw,48px)" }}>
            <p style={{ fontSize: "17px", color: "rgba(29,35,48,0.8)", lineHeight: 1.8, marginBottom: "32px", fontFamily: "Lato, sans-serif", fontStyle: "italic" }}>
              {article.excerptEn}
            </p>
            <hr style={{ border: "none", borderTop: "1px solid rgba(161,143,122,0.25)", marginBottom: "40px" }} />
            {article.bodyEn.map((para, i) => (
              <p key={i} style={{ fontSize: "15px", color: "rgba(29,35,48,0.75)", lineHeight: 1.9, marginBottom: "24px", fontFamily: "Lato, sans-serif" }}>
                {para}
              </p>
            ))}
            <hr style={{ border: "none", borderTop: "1px solid rgba(161,143,122,0.25)", margin: "48px 0 40px" }} />
            <Link href="/en/knowledge" className="collection-cta-btn">
              ← Back to Stone Knowledge
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
