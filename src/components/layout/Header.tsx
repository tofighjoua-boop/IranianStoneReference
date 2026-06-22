"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type Language } from "@/lib/translations";
import { categories } from "@/data/categories";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: Record<Language, NavItem[]> = {
  en: [
    { label: "GALLERY", href: "/en/gallery", hasDropdown: true },
    { label: "ABOUT", href: "/en/about" },
    { label: "CONTACT US", href: "/en/contact" },
  ],
  fa: [
    { label: "گالری", href: "/fa/gallery", hasDropdown: true },
    { label: "درباره ما", href: "/fa/about" },
    { label: "تماس با ما", href: "/fa/contact" },
  ],
};

export function Header({ locale }: { locale: Language }) {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const pathname   = usePathname();
  const router     = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === "fa";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setGalleryOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); setGalleryOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const switchLocale = useCallback(() => {
    const other: Language = locale === "fa" ? "en" : "fa";
    router.push(pathname.replace(`/${locale}`, `/${other}`));
  }, [locale, pathname, router]);

  const isTransparent = !scrolled && !menuOpen;
  const textColor = "#A18F7A";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isTransparent ? "transparent" : "#ffffff",
          transition: "background-color 0.3s ease",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 40px",
        }}
      >
        {/* Logo — left */}
        <Link href={`/${locale}`} aria-label="ISR — Home" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/images/isr-logo-full.png"
            alt="Iranian Stone Reference"
            width={178}
            height={50}
            style={{
              height: "44px",
              width: "auto",
              objectFit: "contain",
              transition: "filter 0.3s ease",
              filter: isTransparent ? "brightness(0) invert(1)" : "none",
            }}
            priority
          />
        </Link>

        {/* Desktop right side: nav links + language + MENU */}
        <div className="nomobile" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {/* Nav links */}
          {NAV_ITEMS[locale].map((item) =>
            item.hasDropdown ? (
              <div key={item.href} style={{ position: "relative" }}>
                <button
                  onClick={() => setGalleryOpen((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: textColor,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontFamily: "Lato, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {item.label}
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                    <path d="M1 1l3 3 3-3" stroke={textColor} strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>

                {galleryOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 16px)",
                      right: 0,
                      minWidth: "220px",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      padding: "20px 0",
                      zIndex: 100,
                    }}
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/${locale}/gallery/${cat.slug}`}
                        onClick={() => setGalleryOpen(false)}
                        style={{
                          display: "block",
                          padding: "9px 24px",
                          fontSize: "13px",
                          color: "#A18F7A",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          fontFamily: "Lato, sans-serif",
                        }}
                      >
                        {locale === "fa" ? cat.nameFa : cat.nameEn}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "13px",
                  color: textColor,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Divider */}
          <span style={{ color: textColor, opacity: 0.35, fontSize: "13px" }}>|</span>

          {/* Language toggle */}
          <button
            onClick={switchLocale}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              color: textColor,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "Lato, sans-serif",
            }}
          >
            {locale === "fa" ? "EN" : "FA"}
          </button>

          {/* Divider */}
          <span style={{ color: textColor, opacity: 0.35, fontSize: "13px" }}>|</span>

          {/* MENU button — far right */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: textColor,
              fontSize: "20px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 400,
              fontFamily: "Lato, sans-serif",
            }}
          >
            {menuOpen ? (
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke={textColor} strokeWidth="1.5">
                <line x1="2" y1="2" x2="15" y2="15" />
                <line x1="15" y1="2" x2="2" y2="15" />
              </svg>
            ) : (
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <rect y="0"    width="20" height="1.8" rx="0.9" fill={textColor} />
                <rect y="5.1"  width="20" height="1.8" rx="0.9" fill={textColor} />
                <rect y="10.2" width="20" height="1.8" rx="0.9" fill={textColor} />
              </svg>
            )}
            <span>MENU</span>
          </button>
        </div>

        {/* Mobile hamburger — right */}
        <button
          className="onlymobile"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", color: textColor, padding: "4px" }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={textColor} strokeWidth="1.5">
              <line x1="3" y1="3" x2="19" y2="19" />
              <line x1="19" y1="3" x2="3" y2="19" />
            </svg>
          ) : (
            <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
              <rect y="0"  width="22" height="1.8" rx="0.9" fill={textColor} />
              <rect y="6.5" width="22" height="1.8" rx="0.9" fill={textColor} />
              <rect y="13" width="22" height="1.8" rx="0.9" fill={textColor} />
            </svg>
          )}
        </button>
      </header>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            backgroundColor: "rgba(255,255,255,0.97)",
            display: "flex",
            flexDirection: "column",
            padding: "80px clamp(24px, 5vw, 140px) 40px",
            overflowY: "auto",
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Close button — top right */}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "40px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: textColor,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "Lato, sans-serif",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={textColor} strokeWidth="1.5">
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
            <span style={{ color: textColor }}>CLOSE</span>
          </button>

          {/* Logo in overlay */}
          <Link href={`/${locale}`} onClick={() => setMenuOpen(false)} style={{ marginBottom: "48px", display: "inline-block" }}>
            <Image
              src="/images/isr-logo-full.png"
              alt="Iranian Stone Reference"
              width={178}
              height={50}
              style={{ height: "40px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Main nav links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              { label: isRTL ? "مرجع سنگ ایرانیان®" : "IRANIAN STONE REFERENCE®", href: `/${locale}` },
              { label: isRTL ? "مجموعهٔ مرمر" : "MARBLE COLLECTION", href: `/${locale}/gallery/marble` },
              { label: isRTL ? "مجموعهٔ تراورتن" : "TRAVERTINE COLLECTION", href: `/${locale}/gallery/travertine` },
              { label: isRTL ? "مجموعهٔ اونیکس" : "ONYX COLLECTION", href: `/${locale}/gallery/onyx` },
              { label: isRTL ? "مجموعهٔ گرانیت" : "GRANITE COLLECTION", href: `/${locale}/gallery/granite` },
              { label: isRTL ? "گالری کامل" : "FULL GALLERY", href: `/${locale}/gallery` },
              { label: isRTL ? "درباره ما" : "ABOUT", href: `/${locale}/about` },
              { label: isRTL ? "مشاور سنگ هوشمند" : "AI STONE ADVISOR", href: "#", comingSoon: true },
              { label: isRTL ? "تماس با ما" : "CONTACT US", href: `/${locale}/contact` },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => !item.comingSoon && setMenuOpen(false)}
                style={{
                  fontSize: "22px",
                  fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                  fontWeight: 600,
                  color: "#A18F7A",
                  letterSpacing: "2px",
                  textTransform: isRTL ? "none" : "uppercase",
                  textDecoration: "none",
                  lineHeight: 2,
                  opacity: item.comingSoon ? 0.5 : 1,
                  cursor: item.comingSoon ? "default" : "pointer",
                }}
              >
                {item.label}
                {item.comingSoon && (
                  <span style={{ fontSize: "11px", marginLeft: "10px", letterSpacing: "1px", opacity: 0.7 }}>
                    {isRTL ? "به‌زودی" : "COMING SOON"}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Language toggle */}
          <div style={{ marginTop: "auto", paddingTop: "40px", borderTop: "1px solid rgba(161,143,122,0.2)", display: "flex", gap: "24px", alignItems: "center" }}>
            <button
              onClick={() => { switchLocale(); setMenuOpen(false); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                color: "#A18F7A",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "Lato, sans-serif",
              }}
            >
              {locale === "fa" ? "ENGLISH" : "فارسی"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
