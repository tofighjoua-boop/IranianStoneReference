"use client";

import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t, isRTL } = useLanguage();

  const fontFamily = isRTL
    ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
    : "Lato, sans-serif";

  const footerLinks = [
    { label: t.footer.storeLocator, href: "/en/store-locator" },
    { label: t.footer.contacts, href: "/en/contacts" },
    { label: t.footer.terms, href: "/en/terms" },
    { label: t.footer.legalNotes, href: "/en/legal-notes" },
    { label: t.footer.cookies, href: "/en/cookies" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#090808",
        color: "#A18F7A",
        width: "100%",
        padding: "60px 0 40px",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div
        className="antolini-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: logo + address */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a href="/en/" style={{ display: "block", lineHeight: 0 }}>
              <Image
                src="/images/isr-logo-white.svg"
                alt="Iranian Stone Reference"
                width={52}
                height={61}
                style={{ objectFit: "contain", height: "61px", width: "auto" }}
              />
            </a>
            <p
              style={{
                fontSize: "13px",
                color: "#A18F7A",
                lineHeight: "1.8",
                margin: 0,
                fontFamily,
              }}
            >
              {t.footer.companyName}
              <br />
              {t.footer.address}
            </p>
          </div>

          {/* Middle: nav links */}
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "13px",
                  color: "#A18F7A",
                  textDecoration: "none",
                  letterSpacing: isRTL ? "0px" : "1px",
                  textTransform: isRTL ? "none" : "uppercase",
                  lineHeight: "2.2",
                  fontFamily,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: social icons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <a
              href="https://www.facebook.com/iranianstone"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#A18F7A", lineHeight: 0 }}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/iranianstone"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#A18F7A", lineHeight: 0 }}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid rgba(161,143,122,0.3)",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: "#A18F7A",
            flexWrap: "wrap",
            gap: "12px",
            fontFamily,
          }}
        >
          <span>{t.footer.vatNumber}</span>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a
              href={`mailto:${t.footer.emailInfo}`}
              style={{ color: "#A18F7A", textDecoration: "none" }}
            >
              {t.footer.emailInfo}
            </a>
            <a
              href={`mailto:${t.footer.emailPrivacy}`}
              style={{ color: "#A18F7A", textDecoration: "none" }}
            >
              {t.footer.emailPrivacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
