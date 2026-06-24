"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Language } from "@/lib/translations";

const SLIDES = [
  {
    bg: "/images/bottom-banner-1.jpg",
    title: { en: "UAE · QATAR · RUSSIA", fa: "امارات · قطر · روسیه" },
    sub: { en: "Premium Stone for Global Projects", fa: "سنگ پریمیوم برای پروژه‌های جهانی" },
    cta: { en: "Contact Export Team", fa: "تیم صادرات" },
    href: "/contact",
  },
  {
    bg: "/images/banner-new-4.png",
    title: { en: "NATURE'S FINEST STONE", fa: "برترین سنگ طبیعت" },
    sub: { en: "From Iran's Legendary Quarries to the World", fa: "از معادن افسانه‌ای ایران به سراسر جهان" },
    cta: { en: "Explore Gallery", fa: "مشاهده گالری" },
    href: "/gallery",
  },
  {
    bg: "/images/banner-1.jpg",
    title: { en: "GERMANY · USA · GCC", fa: "آلمان · آمریکا · شورای خلیج" },
    sub: { en: "15+ Years of Export Excellence", fa: "بیش از ۱۵ سال تجربهٔ صادراتی" },
    cta: { en: "Our Markets", fa: "بازارهای ما" },
    href: "/about",
  },
  {
    bg: "/images/banner-2.jpg",
    title: { en: "CUSTOM PROCESSING", fa: "فرآوری سفارشی" },
    sub: { en: "CNC Cutting · Polished · Honed · Leather Finish", fa: "برش CNC · پولیش · مات · فینیش چرم" },
    cta: { en: "Production Process", fa: "فرآیند تولید" },
    href: "/about",
  },
] as const;

export function BottomBanner({ locale }: { locale: Language }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const isRTL = locale === "fa";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
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
          {/* Overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />

          <div
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              textAlign: "center",
              padding: "0 24px",
              maxWidth: "835px",
            }}
          >
            <div
              style={{
                fontSize: isRTL ? "24px" : "32px",
                letterSpacing: isRTL ? "1px" : "4.8px",
                textTransform: "uppercase",
                fontWeight: 300,
                color: "white",
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {slide.title[locale]}
            </div>

            <div
              style={{
                fontSize: "18px",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 300,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {slide.sub[locale]}
            </div>

            <Link
              href={`/${locale}${slide.href}`}
              style={{
                marginTop: "24px",
                fontSize: "14px",
                color: "white",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.6)",
                padding: "12px 32px",
                fontWeight: 300,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {slide.cta[locale]}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
