"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { articles, ARTICLE_CATEGORIES, CATEGORY_LABELS, type ArticleCategory } from "@/data/articles";
import { type Language } from "@/lib/translations";
import { formatDate } from "@/lib/date";

export function KnowledgeClient({ locale }: { locale: Language }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("all");
  const isRTL = locale === "fa";

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = activeCategory === "all" || a.category === activeCategory;
      const q = search.toLowerCase();
      const title = (isRTL ? a.titleFa : a.titleEn).toLowerCase();
      const excerpt = (isRTL ? a.excerptFa : a.excerptEn).toLowerCase();
      return matchCat && (!q || title.includes(q) || excerpt.includes(q));
    });
  }, [search, activeCategory, isRTL]);

  const font = isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif";

  return (
    <section style={{ backgroundColor: "#fbfaf6", padding: "52px 0 100px" }}>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px,5vw,80px)" }}
      >
        {/* Search */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ position: "relative", maxWidth: "540px" }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#A18F7A" strokeWidth="1.8" strokeLinecap="round"
              style={{
                position: "absolute",
                top: "50%",
                [isRTL ? "right" : "left"]: "16px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? "جستجو در مقالات..." : "Search articles..."}
              style={{
                width: "100%",
                padding: isRTL ? "13px 48px 13px 20px" : "13px 20px 13px 48px",
                border: "1px solid rgba(161,143,122,0.35)",
                borderRadius: "0",
                background: "#fff",
                fontSize: "14px",
                fontFamily: font,
                color: "#1d2330",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "48px" }}>
          {ARTICLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "7px 20px",
                border: `1px solid ${activeCategory === cat ? "#A18F7A" : "rgba(161,143,122,0.3)"}`,
                background: activeCategory === cat ? "#A18F7A" : "transparent",
                color: activeCategory === cat ? "#fff" : "#A18F7A",
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: isRTL ? "none" : "uppercase",
                cursor: "pointer",
                fontFamily: font,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {CATEGORY_LABELS[cat][locale]}
            </button>
          ))}
        </div>

        {/* Count */}
        <p style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "36px", fontFamily: "Lato, sans-serif" }}>
          {filtered.length} {isRTL ? "مقاله" : "ARTICLES"}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={{ color: "#1d2330", opacity: 0.5, fontFamily: font, fontSize: "15px" }}>
            {isRTL ? "مقاله‌ای یافت نشد." : "No articles found."}
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px 32px" }}>
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/knowledge/${article.slug}`}
                className="knowledge-card"
                style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
              >
                <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", marginBottom: "20px" }}>
                  <Image
                    src={article.image}
                    alt={isRTL ? article.titleFa : article.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="knowledge-img"
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Lato, sans-serif" }}>
                    {CATEGORY_LABELS[article.category][locale]}
                  </span>
                  <span style={{ color: "rgba(161,143,122,0.4)", fontSize: "10px" }}>·</span>
                  <span style={{ fontSize: "10px", color: "rgba(29,35,48,0.45)", fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif" }}>
                    {article.readTime} {isRTL ? "دقیقه" : "min read"}
                  </span>
                  <span style={{ color: "rgba(161,143,122,0.4)", fontSize: "10px" }}>·</span>
                  <span style={{ fontSize: "10px", color: "rgba(29,35,48,0.45)", fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif" }}>
                    {formatDate(article.publishedAt, locale)}
                  </span>
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1d2330", lineHeight: 1.45, marginBottom: "10px", fontFamily: font, transition: "color 0.2s" }} className="knowledge-title">
                  {isRTL ? article.titleFa : article.titleEn}
                </h3>

                <p style={{ fontSize: "13px", color: "rgba(29,35,48,0.6)", lineHeight: 1.7, fontFamily: font, flexGrow: 1 }}>
                  {isRTL ? article.excerptFa : article.excerptEn}
                </p>

                <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Lato, sans-serif" }}>
                    {isRTL ? "ادامه مطلب" : "Read More"}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d={isRTL ? "M8 6H2M5 3l-3 3 3 3" : "M4 6h6M7 3l3 3-3 3"} stroke="#A18F7A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
