import React from "react";
import Link from "next/link";
import { type Language } from "@/lib/translations";

interface TechItem {
  icon: React.ReactNode;
  title: { en: string; fa: string };
  body: { en: string; fa: string };
  cta: { en: string; fa: string };
  href: string;
  comingSoon?: boolean;
}

const ITEMS: TechItem[] = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#A18F7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="20" />
        <polyline points="16,24 21,29 32,18" />
      </svg>
    ),
    title: { en: "ISR® QUALITY STANDARD", fa: "استاندارد کیفی مرجع سنگ" },
    body: {
      en: "Every slab is hand-selected and quality-verified before export. Polished, honed, leather and brushed finishes available.",
      fa: "هر اسلب قبل از صادرات دست‌چین و کیفیت‌سنجی می‌شود. فینیش‌های پولیش، مات، چرم و براش موجود است.",
    },
    cta: { en: "Discover more", fa: "بیشتر بدانید" },
    href: "/about",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#A18F7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <ellipse cx="24" cy="24" rx="8" ry="18" />
        <line x1="6" y1="24" x2="42" y2="24" />
        <line x1="24" y1="6" x2="24" y2="42" />
      </svg>
    ),
    title: { en: "WORLDWIDE EXPORT", fa: "صادرات جهانی" },
    body: {
      en: "Exporting to UAE, Qatar, Germany, Russia and the United States since 2010. Full logistics and customs documentation.",
      fa: "صادرات به امارات، قطر، آلمان، روسیه و آمریکا از سال ۱۳۸۹. لجستیک کامل و مستندات گمرکی.",
    },
    cta: { en: "Discover more", fa: "بیشتر بدانید" },
    href: "/about",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#A18F7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z" />
      </svg>
    ),
    title: { en: "ISR® AI STONE ADVISOR", fa: "مشاور سنگ هوشمند ISR" },
    body: {
      en: "Describe your project — material, finish, dimensions — and our AI will match the perfect stone from our catalogue.",
      fa: "پروژه‌ی خود را توصیف کنید — ماده، فینیش، ابعاد — و هوش مصنوعی ما بهترین سنگ را از کاتالوگ ما تطبیق می‌دهد.",
    },
    cta: { en: "Coming soon", fa: "به‌زودی" },
    href: "#",
    comingSoon: true,
  },
];

export function TechnologySection({ locale }: { locale: Language }) {
  const isRTL = locale === "fa";

  return (
    <section
      style={{
        backgroundColor: "#0c1626",
        width: "100%",
        padding: "80px 0",
      }}
    >
      <div
        dir={isRTL ? "rtl" : "ltr"}
        style={{
          maxWidth: "1640px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 140px)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "60px",
          flexWrap: "wrap",
        }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
              flex: "1 1 260px",
              minWidth: "220px",
            }}
          >
            {item.icon}

            <h3
              style={{
                fontSize: "14px",
                color: "#A18F7A",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 400,
                margin: 0,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {item.title[locale]}
            </h3>

            <p
              style={{
                fontSize: "15px",
                color: "#A18F7A",
                lineHeight: 1.6,
                maxWidth: "300px",
                margin: 0,
                fontWeight: 400,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {item.body[locale]}
            </p>

            <Link
              href={item.comingSoon ? "#" : `/${locale}${item.href}`}
              style={{
                fontSize: "14px",
                color: "#A18F7A",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid #A18F7A",
                paddingBottom: "2px",
                opacity: item.comingSoon ? 0.5 : 1,
                cursor: item.comingSoon ? "default" : "pointer",
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {item.cta[locale]}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
