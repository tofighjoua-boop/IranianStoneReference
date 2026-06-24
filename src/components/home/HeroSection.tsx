"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Language } from "@/lib/translations";


const SLIDES = [
  { bg: "/images/banner-new-1.jpg",      category: "marble" },
  { bg: "/images/banner-arch.jpg",       category: "travertine" },
  { bg: "/images/banner-new-3.jpg",      category: "onyx" },
  { bg: "/images/banner-stone-dark.jpg", category: "granite" },
  { bg: "/images/banner-washbasin.jpg",  category: "washbasins" },
  { bg: "/images/banner-new-4.jpg",      category: "accessories" },
] as const;

const CAT_LABELS = {
  marble:     { en: "Marble Collection",     fa: "مجموعهٔ مرمریت" },
  travertine: { en: "Travertine Collection", fa: "مجموعهٔ تراورتن" },
  onyx:       { en: "Onyx Collection",       fa: "مجموعهٔ مرمر" },
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
              className={isRTL ? "" : "text-[22px] sm:text-[28px] lg:text-[36px]"}
              style={{
                fontSize: isRTL ? "34px" : undefined,
                lineHeight: "1.35",
                letterSpacing: isRTL ? "2px" : "3px",
                color: "white",
                textTransform: "uppercase",
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                fontWeight: isRTL ? 300 : 700,
                whiteSpace: isRTL ? "nowrap" : "normal",
                textAlign: "center",
              }}
            >
              {isRTL ? (
                "از دل کوه تا قلب معماری"
              ) : (
                <>
                  FROM THE HEART OF THE MOUNTAIN
                  <br className="sm:hidden" />
                  {" "}TO THE HEART OF ARCHITECTURE
                </>
              )}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
