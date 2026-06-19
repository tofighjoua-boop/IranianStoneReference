"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroBanner() {
  const { t, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(1);

  const heroSlides = [
    {
      id: "banner-1",
      backgroundImage: "/images/banner-1.jpg",
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      linkText: t.hero.exclusiveCollection,
      linkHref: "/en/c3/exclusive-collection",
    },
    {
      id: "banner-2",
      backgroundImage: "/images/banner-2.jpg",
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      linkText: t.hero.exclusiveCollection,
      linkHref: "/en/c3/exclusive-collection",
    },
    {
      id: "banner-3",
      backgroundImage: "/images/banner-3.jpg",
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      linkText: t.hero.collections,
      linkHref: "/en/c3/exclusive-collection",
    },
    {
      id: "banner-4",
      backgroundImage: "/images/banner-4.jpg",
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      linkText: t.hero.collections,
      linkHref: "/en/c3/exclusive-collection",
    },
    {
      id: "banner-5",
      backgroundImage: "/images/banner-5.jpg",
      title: t.hero.year2024,
      subtitle: t.hero.subtitle,
      linkText: t.hero.discoverMore,
      linkHref: "/en/haute-nature",
    },
    {
      id: "banner-6",
      backgroundImage: "/images/banner-6.jpg",
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      linkText: t.hero.collections,
      linkHref: "/en/c3/exclusive-collection",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const fontFamily = isRTL
    ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
    : "Lato, sans-serif";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "720px",
        maxHeight: "800px",
        minHeight: "520px",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 2s ease-out",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "900px",
              padding: "0 40px",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                color: "white",
                letterSpacing: isRTL ? "2px" : "5px",
                textTransform: isRTL ? "none" : "uppercase",
                fontWeight: 300,
                fontFamily,
                marginBottom: "16px",
                display: "block",
              }}
            >
              {slide.title}
            </span>
            <p
              style={{
                fontSize: "42px",
                lineHeight: "1.25",
                letterSpacing: isRTL ? "1px" : "5px",
                color: "white",
                fontWeight: 300,
                fontFamily,
                margin: "0 0 40px 0",
              }}
            >
              {slide.subtitle}
            </p>
            <a
              href={slide.linkHref}
              style={{
                fontSize: "18px",
                color: "white",
                letterSpacing: isRTL ? "1px" : "2px",
                textDecoration: "none",
                fontFamily,
                borderBottom: "1px solid rgba(255,255,255,0.6)",
                paddingBottom: "4px",
              }}
            >
              {slide.linkText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
