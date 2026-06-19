"use client";

import { useState, useEffect } from "react";

interface HeroSlide {
  id: string;
  backgroundImage: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "banner-1",
    backgroundImage: "/images/banner-1.jpg",
    title: "ANTOLINI® HAUTE NATURE®",
    subtitle: "Designed by Nature, Perfected in Italy.",
    linkText: "Antolini® Exclusive Collection",
    linkHref: "/en/c3/exclusive-collection",
  },
  {
    id: "banner-2",
    backgroundImage: "/images/banner-2.jpg",
    title: "ANTOLINI® HAUTE NATURE®",
    subtitle: "Designed by Nature, Perfected in Italy.",
    linkText: "Antolini® Exclusive Collection",
    linkHref: "/en/c3/exclusive-collection",
  },
  {
    id: "banner-3",
    backgroundImage: "/images/banner-3.jpg",
    title: "ANTOLINI® HAUTE NATURE®",
    subtitle: "Designed by Nature, Perfected in Italy.",
    linkText: "Antolini® Collections",
    linkHref: "/en/c3/exclusive-collection",
  },
  {
    id: "banner-4",
    backgroundImage: "/images/banner-4.jpg",
    title: "ANTOLINI® HAUTE NATURE®",
    subtitle: "Designed by Nature, Perfected in Italy.",
    linkText: "Antolini® Collections",
    linkHref: "/en/c3/exclusive-collection",
  },
  {
    id: "banner-5",
    backgroundImage: "/images/banner-5.jpg",
    title: "ANTOLINI® 2024",
    subtitle: "Designed by Nature, Perfected in Italy.",
    linkText: "Discover More",
    linkHref: "/en/haute-nature",
  },
  {
    id: "banner-6",
    backgroundImage: "/images/banner-6.jpg",
    title: "ANTOLINI® HAUTE NATURE®",
    subtitle: "Designed by Nature, Perfected in Italy.",
    linkText: "Antolini® Collections",
    linkHref: "/en/c3/exclusive-collection",
  },
];

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
            }}
          >
            <span
              style={{
                fontSize: "22px",
                color: "white",
                letterSpacing: "5px",
                textTransform: "uppercase",
                fontWeight: 300,
                fontFamily: "Lato, sans-serif",
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
                letterSpacing: "5px",
                color: "white",
                fontWeight: 300,
                fontFamily: "Lato, sans-serif",
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
                letterSpacing: "2px",
                textDecoration: "none",
                fontFamily: "Lato, sans-serif",
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
