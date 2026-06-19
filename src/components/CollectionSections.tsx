"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

function CollectionCTA({
  text,
  href,
  isRTL,
}: {
  text: string;
  href: string;
  isRTL: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "12px 30px",
        border: "1px solid #A18F7A",
        color: hovered ? "white" : "#A18F7A",
        backgroundColor: hovered ? "#A18F7A" : "transparent",
        fontSize: "13px",
        letterSpacing: isRTL ? "0px" : "3px",
        textTransform: isRTL ? "none" : "uppercase",
        textDecoration: "none",
        transition: "all 0.5s ease",
        cursor: "pointer",
        fontFamily: isRTL
          ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
          : "Lato, sans-serif",
        fontWeight: 400,
      }}
    >
      {text}
    </a>
  );
}

export function CollectionSections() {
  const { t, isRTL } = useLanguage();

  const fontFamily = isRTL
    ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
    : "Lato, sans-serif";

  const collections = [
    {
      id: "exclusive",
      backgroundImage: "/images/collection-exclusive.jpg",
      label: t.collections.brand,
      title: t.collections.exclusiveTitle,
      body: t.collections.exclusiveBody,
      ctaText: t.collections.discoverMaterial,
      ctaHref: "/en/c3/exclusive-collection",
      logoSrc: undefined as string | undefined,
      logoAlt: undefined as string | undefined,
      logoWidth: undefined as number | undefined,
      logoHeight: undefined as number | undefined,
    },
    {
      id: "stoneroom",
      backgroundImage: "/images/collection-stoneroom.jpg",
      label: null,
      title: null,
      body: null,
      ctaText: t.collections.discoverMore,
      ctaHref: "/en/milanoduomo",
      logoSrc: "/images/stoneroom-logo.png",
      logoAlt: "Iranian Stone Reference® Stoneroom®",
      logoWidth: 260,
      logoHeight: 72,
    },
    {
      id: "tableware",
      backgroundImage: "/images/collection-tableware.jpg",
      label: t.collections.brand,
      title: t.collections.tablewareTitle,
      body: null,
      ctaText: t.collections.discover,
      ctaHref: "/en/tableware",
      logoSrc: undefined,
      logoAlt: undefined,
      logoWidth: undefined,
      logoHeight: undefined,
    },
    {
      id: "technology",
      backgroundImage: "/images/collection-tech.jpg",
      label: t.collections.brand,
      title: t.collections.innovationTitle,
      body: null,
      ctaText: t.collections.discover,
      ctaHref: "/en/innovation",
      logoSrc: undefined,
      logoAlt: undefined,
      logoWidth: undefined,
      logoHeight: undefined,
    },
  ];

  return (
    <div>
      {collections.map((col) => (
        <section
          key={col.id}
          style={{
            position: "relative",
            width: "100%",
            height: "600px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Background image with slow zoom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${col.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "slowZoom 20s ease-in-out infinite",
            }}
          />

          {/* Content overlay */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "20px",
              padding: "0 40px",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {col.logoSrc ? (
              <>
                <Image
                  src={col.logoSrc}
                  alt={col.logoAlt ?? "Logo"}
                  width={col.logoWidth ?? 260}
                  height={col.logoHeight ?? 72}
                  style={{ objectFit: "contain" }}
                />
                <CollectionCTA
                  text={col.ctaText}
                  href={col.ctaHref}
                  isRTL={isRTL}
                />
              </>
            ) : (
              <>
                {col.label && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#A18F7A",
                      letterSpacing: isRTL ? "1px" : "5px",
                      textTransform: isRTL ? "none" : "uppercase",
                      fontWeight: 400,
                      margin: 0,
                      fontFamily,
                    }}
                  >
                    {col.label}
                  </p>
                )}
                {col.title && (
                  <h2
                    style={{
                      fontSize: "28px",
                      color: "#A18F7A",
                      letterSpacing: isRTL ? "1px" : "3px",
                      textTransform: isRTL ? "none" : "uppercase",
                      fontWeight: 400,
                      lineHeight: 1.3,
                      margin: 0,
                      fontFamily,
                    }}
                  >
                    {col.title}
                  </h2>
                )}
                {col.body && (
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#A18F7A",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      maxWidth: "480px",
                      margin: 0,
                      fontFamily,
                    }}
                  >
                    {col.body}
                  </p>
                )}
                <CollectionCTA
                  text={col.ctaText}
                  href={col.ctaHref}
                  isRTL={isRTL}
                />
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
