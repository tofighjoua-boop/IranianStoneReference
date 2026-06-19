"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export function TechnologySection() {
  const { t, isRTL } = useLanguage();

  const fontFamily = isRTL
    ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
    : "Lato, sans-serif";

  const techItems = [
    {
      id: "azerocare",
      logoSrc: "/images/logo-azerocare-plus.svg",
      logoAlt: "Azerocare Plus®",
      logoWidth: 269,
      logoHeight: 48,
      description: t.technology.azerocare,
      href: "/en/azerocare-plus",
    },
    {
      id: "avp",
      logoSrc: "/images/logo-avp.png",
      logoAlt: "AVP",
      logoWidth: 308,
      logoHeight: 53,
      description: t.technology.avp,
      href: "/en/avp",
    },
    {
      id: "azerobact",
      logoSrc: "/images/logo-azerobact-plus.png",
      logoAlt: "Azerobact Plus",
      logoWidth: 253,
      logoHeight: 53,
      description: t.technology.azerobact,
      href: "/en/azerobact-plus",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#090808",
        width: "100%",
        padding: "80px 0",
      }}
    >
      <div
        className="antolini-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: "60px",
          flexWrap: "wrap",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {techItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
              flex: 1,
              textDecoration: "none",
            }}
          >
            <Image
              src={item.logoSrc}
              alt={item.logoAlt}
              width={item.logoWidth}
              height={item.logoHeight}
              style={{ objectFit: "contain", height: "50px", width: "auto" }}
            />
            <p
              style={{
                fontSize: "14px",
                color: "#A18F7A",
                lineHeight: "1.6",
                maxWidth: "280px",
                margin: 0,
                fontFamily,
                fontWeight: 300,
              }}
            >
              {item.description}
            </p>
            <span
              style={{
                fontSize: "13px",
                color: "#A18F7A",
                letterSpacing: isRTL ? "0px" : "2px",
                textTransform: isRTL ? "none" : "uppercase",
                borderBottom: "1px solid #A18F7A",
                paddingBottom: "2px",
                fontFamily,
              }}
            >
              {t.technology.discoverMore}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
