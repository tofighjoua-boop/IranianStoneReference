"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MenuIcon, SearchIcon, CloseIcon } from "@/components/icons";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navigation() {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.brand, href: "/en/" },
    { label: t.nav.hauteNature, href: "/en/haute-nature" },
    { label: t.nav.history, href: "/en/history" },
    { label: t.nav.collections, href: "/en/c3/exclusive-collection" },
    { label: t.nav.geofamily, href: "/en/natural-stones" },
    { label: t.nav.innovation, href: "/en/innovation" },
    { label: t.nav.ladyA, href: "/en/lady-a" },
    { label: t.nav.stoneroom, href: "/en/milanoduomo" },
  ];

  const topNavItems = [
    { label: t.nav.storeLocator, href: "/en/store-locator" },
    { label: t.nav.fairsEvents, href: "/en/fairs-and-events" },
    { label: t.nav.contactUs, href: "/en/contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 720);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px clamp(16px, 3vw, 40px)",
    backgroundColor: isScrolled ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0.3)",
    transition: "background-color 0.3s ease",
  };

  const logoSrc = isScrolled
    ? "/images/isr-logo-dark.svg"
    : "/images/isr-logo-white.svg";
  const logoAlt = "Iranian Stone Reference Logo";

  return (
    <>
      <header style={headerStyle}>
        {/* Logo */}
        <a href="/en/" style={{ display: "block", lineHeight: 0 }}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={58}
            height={68}
            style={{ objectFit: "contain", height: "68px", width: "auto" }}
            priority
          />
        </a>

        {/* Right side nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Desktop nav items */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "24px" }}
          >
            {topNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "11px",
                  color: "#A18F7A",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: isRTL
                    ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
                    : "Lato, sans-serif",
                }}
              >
                {item.label}
              </a>
            ))}
            <span style={{ color: "#A18F7A", fontSize: "11px" }}>|</span>

            {/* Language switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "fa" : "en")}
              style={{
                fontSize: "11px",
                color: "#A18F7A",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "Lato, sans-serif",
                fontWeight: 600,
              }}
              aria-label="Switch language"
            >
              {t.nav.langLabel}
            </button>

            <a
              href="/en/search"
              style={{ color: "#A18F7A", lineHeight: 0, display: "block" }}
              aria-label="Search"
            >
              <SearchIcon />
            </a>
          </nav>

          {/* MENU button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#A18F7A",
              fontSize: "18px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: isRTL
                ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
                : "Lato, sans-serif",
              fontWeight: 400,
            }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
            <span className="hidden sm:inline">{t.nav.menu}</span>
          </button>
        </div>
      </header>

      {/* Full-page menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          backgroundColor: "rgba(255,255,255,0.97)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 140px",
          direction: isRTL ? "rtl" : "ltr",
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden={!isMenuOpen}
      >
        {/* Close button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "absolute",
            top: "30px",
            right: "40px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#A18F7A",
            padding: "8px",
          }}
          aria-label="Close navigation menu"
        >
          <CloseIcon />
        </button>

        {/* Logo inside panel */}
        <a
          href="/en/"
          style={{ display: "block", lineHeight: 0, marginBottom: "40px" }}
        >
          <Image
            src="/images/isr-logo-dark.svg"
            alt={logoAlt}
            width={52}
            height={61}
            style={{ objectFit: "contain", height: "61px", width: "auto" }}
          />
        </a>

        {/* Main nav links */}
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#A18F7A",
                letterSpacing: isRTL ? "1px" : "2px",
                textTransform: isRTL ? "none" : "uppercase",
                textDecoration: "none",
                lineHeight: "2.5",
                fontFamily: isRTL
                  ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
                  : "Lato, sans-serif",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom util links */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {topNavItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              style={{
                fontSize: "13px",
                color: "#A18F7A",
                letterSpacing: isRTL ? "0px" : "1px",
                textTransform: isRTL ? "none" : "uppercase",
                textDecoration: "none",
                fontFamily: isRTL
                  ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
                  : "Lato, sans-serif",
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Language toggle in menu */}
          <button
            onClick={() => setLanguage(language === "en" ? "fa" : "en")}
            style={{
              fontSize: "13px",
              color: "#A18F7A",
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: "pointer",
              background: "none",
              border: "1px solid #A18F7A",
              padding: "2px 10px",
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
            }}
          >
            {t.nav.langLabel}
          </button>
        </div>
      </div>
    </>
  );
}
