"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Language } from "@/lib/translations";

const SLIDES = [
  { bg: "/images/banner-new-1.png", mobileBg: "/images/banner-new-1.png", category: "marble" },
  { bg: "/images/banner-2.jpg", mobileBg: "/images/banner-mobile-2.jpg", category: "travertine" },
  { bg: "/images/banner-new-3.png", mobileBg: "/images/banner-new-3.png", category: "onyx" },
  { bg: "/images/banner-1.jpg", mobileBg: "/images/banner-mobile-1.jpg", category: "granite" },
  { bg: "/images/banner-new-2.png", mobileBg: "/images/banner-new-2.png", category: "washbasins" },
  { bg: "/images/banner-6.jpg", mobileBg: "/images/banner-mobile-1.jpg", category: "accessories" },
] as const;

const CAT_LABELS = {
  marble:     { en: "Marble Collection",     fa: "مجموعهٔ مرمر" },
  travertine: { en: "Travertine Collection", fa: "مجموعهٔ تراورتن" },
  onyx:       { en: "Onyx Collection",       fa: "مجموعهٔ اونیکس" },
  granite:    { en: "Granite Collection",    fa: "مجموعهٔ گرانیت" },
  washbasins: { en: "Stone Washbasins",      fa: "روشویی‌های سنگی" },
  accessories:{ en: "Stone Accessories",     fa: "اکسسوری سنگی" },
} as const;

export function HeroSection({ locale }: { locale: Language }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const isRTL = locale === "fa";

  return (
    <div
      className="home_banner_container"
      style={{
        position: "relative",
        width: "100%",
        height: "720px",
        maxHeight: "800px",
        minHeight: "520px",
        overflow: "hidden",
      }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#ffffff",
            opacity: i === active ? 1 : 0,
            transition: "opacity 2s ease-out",
          }}
        >
          <div
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              textAlign: "center",
              maxWidth: "835px",
              padding: "0 20px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "white",
                letterSpacing: "4px",
                textTransform: "uppercase",
                fontWeight: 300,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {isRTL ? "مرجع سنگ ایرانیان®" : "IRANIAN STONE REFERENCE®"}
            </span>

            <div
              style={{
                fontSize: isRTL ? "28px" : "32px",
                lineHeight: "1.2",
                letterSpacing: isRTL ? "2px" : "4.8px",
                color: "white",
                textTransform: "uppercase",
                fontWeight: 300,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {isRTL ? "طراحی شده توسط طبیعت" : "DESIGNED BY NATURE"}
            </div>

            <div
              style={{
                fontSize: "22px",
                lineHeight: "29px",
                letterSpacing: "2px",
                color: "white",
                fontWeight: 300,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {isRTL ? "کامل شده در ایران." : "PERFECTED IN IRAN."}
            </div>

            <Link
              href={`/${locale}/gallery/${slide.category}`}
              style={{
                fontSize: "18px",
                color: "white",
                letterSpacing: "2px",
                textDecoration: "none",
                marginTop: "32px",
                fontWeight: 300,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                opacity: 0.9,
              }}
            >
              {CAT_LABELS[slide.category][locale]}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
