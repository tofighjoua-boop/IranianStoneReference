"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MenuIcon, SearchIcon, CloseIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ANTOLINI®", href: "/en/" },
  { label: "HAUTE NATURE®", href: "/en/haute-nature" },
  { label: "HISTORY", href: "/en/history" },
  { label: "COLLECTIONS", href: "/en/c3/exclusive-collection" },
  { label: "GEOFAMILY", href: "/en/natural-stones" },
  { label: "INNOVATION", href: "/en/innovation" },
  { label: "LADY A", href: "/en/lady-a" },
  { label: "STONEROOM®", href: "/en/milanoduomo" },
];

const topNavItems = [
  { label: "STORE LOCATOR", href: "/en/store-locator" },
  { label: "FAIRS & EVENTS", href: "/en/fairs-and-events" },
  { label: "CONTACT US", href: "/en/contacts" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    padding: "20px clamp(16px, 3vw, 40px)",
    backgroundColor: isScrolled ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0.3)",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <header style={headerStyle}>
        {/* Logo */}
        <a href="/en/" style={{ display: "block", lineHeight: 0 }}>
          {isScrolled ? (
            <Image
              src="/images/logo.png"
              alt="Antolini® Logo"
              width={175}
              height={48}
              style={{ objectFit: "contain", height: "auto" }}
              priority
            />
          ) : (
            <Image
              src="/images/logo_white.png"
              alt="Antolini® Logo"
              width={175}
              height={48}
              style={{ objectFit: "contain", height: "auto" }}
              priority
            />
          )}
        </a>

        {/* Top-right nav + MENU — on the right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Nav items — hidden on small screens */}
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
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {item.label}
              </a>
            ))}
            <span style={{ color: "#A18F7A", fontSize: "11px" }}>|</span>
            <span
              style={{
                fontSize: "11px",
                color: "#A18F7A",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              EN ▾
            </span>
            <a
              href="/en/search"
              style={{ color: "#A18F7A", lineHeight: 0, display: "block" }}
              aria-label="Search"
            >
              <SearchIcon />
            </a>
          </nav>

          {/* MENU button — far right */}
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
              fontFamily: "Lato, sans-serif",
              fontWeight: 400,
            }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
            <span className="hidden sm:inline">MENU</span>
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
        <a href="/en/" style={{ display: "block", lineHeight: 0, marginBottom: "40px" }}>
          <Image
            src="/images/logo.png"
            alt="Antolini® Logo"
            width={150}
            height={41}
            style={{ objectFit: "contain", height: "auto" }}
          />
        </a>

        {/* Main nav links */}
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#A18F7A",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                lineHeight: "2.5",
                fontFamily: "Lato, sans-serif",
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
          {topNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontSize: "13px",
                color: "#A18F7A",
                letterSpacing: "1px",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
