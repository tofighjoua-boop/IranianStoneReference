"use client";

import { useState } from "react";
import Image from "next/image";

interface CollectionItem {
  id: string;
  backgroundImage: string;
  label: string | null;
  title: string | null;
  body: string | null;
  ctaText: string;
  ctaHref: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

const collections: CollectionItem[] = [
  {
    id: "exclusive",
    backgroundImage: "/images/collection-exclusive.jpg",
    label: "ANTOLINI®",
    title: "EXCLUSIVE COLLECTION",
    body: "Exclusivity through tradition and expertise. Antolini® is curator to Mother Nature's most desired and recognisable masterpieces.",
    ctaText: "DISCOVER THIS MATERIAL",
    ctaHref: "/en/c3/exclusive-collection",
  },
  {
    id: "stoneroom",
    backgroundImage: "/images/collection-stoneroom.jpg",
    label: null,
    title: null,
    body: null,
    ctaText: "DISCOVER MORE",
    ctaHref: "/en/milanoduomo",
    logoSrc: "/images/stoneroom-logo.png",
    logoAlt: "Antolini® Stoneroom®",
    logoWidth: 260,
    logoHeight: 72,
  },
  {
    id: "tableware",
    backgroundImage: "/images/collection-tableware.jpg",
    label: "ANTOLINI®",
    title: "TABLEWARE",
    body: null,
    ctaText: "DISCOVER",
    ctaHref: "/en/tableware",
  },
  {
    id: "technology",
    backgroundImage: "/images/collection-tech.jpg",
    label: "ANTOLINI®",
    title: "INNOVATION",
    body: null,
    ctaText: "DISCOVER",
    ctaHref: "/en/innovation",
  },
];

function CollectionCTA({ text, href }: { text: string; href: string }) {
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
        letterSpacing: "3px",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "all 0.5s ease",
        cursor: "pointer",
        fontFamily: "Lato, sans-serif",
        fontWeight: 400,
      }}
    >
      {text}
    </a>
  );
}

export function CollectionSections() {
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
          {/* Background image with slow zoom animation */}
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
                <CollectionCTA text={col.ctaText} href={col.ctaHref} />
              </>
            ) : (
              <>
                {col.label && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#A18F7A",
                      letterSpacing: "5px",
                      textTransform: "uppercase",
                      fontWeight: 400,
                      margin: 0,
                      fontFamily: "Lato, sans-serif",
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
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      fontWeight: 400,
                      lineHeight: 1.3,
                      margin: 0,
                      fontFamily: "Lato, sans-serif",
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
                      fontFamily: "Lato, sans-serif",
                    }}
                  >
                    {col.body}
                  </p>
                )}
                <CollectionCTA text={col.ctaText} href={col.ctaHref} />
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
