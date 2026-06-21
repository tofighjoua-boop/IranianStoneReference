"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type Language } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { categories } from "@/data/categories";

interface HeaderProps {
  locale: Language;
}

export function Header({ locale }: HeaderProps) {
  const t = translations[locale];
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === "fa";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close gallery menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (galleryRef.current && !galleryRef.current.contains(e.target as Node)) {
        setGalleryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setGalleryOpen(false);
  }, [pathname]);

  // ESC closes menus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGalleryOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const switchLocale = useCallback(() => {
    const otherLocale: Language = locale === "fa" ? "en" : "fa";
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }, [locale, pathname, router]);

  const navItems = [
    { label: t.nav.gallery, href: `/${locale}/gallery`, hasMenu: true },
    { label: t.nav.about, href: `/${locale}/about` },
    { label: t.nav.contact, href: `/${locale}/contact` },
  ];

  const isTransparent = !scrolled && !mobileOpen && !galleryOpen;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "bg-[#0c1626]/95 backdrop-blur-md shadow-lg shadow-black/20",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            className={[
              "flex items-center justify-between h-20",
              isRTL ? "flex-row-reverse" : "",
            ].join(" ")}
          >
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex-shrink-0 flex items-center gap-3 group"
              aria-label="Iranian Stone Reference — Home"
            >
              <Image
                src="/images/isr-logo-white.svg"
                alt="ISR Logo"
                width={36}
                height={36}
                className="opacity-90 group-hover:opacity-100 transition-opacity"
                priority
              />
              <span className="hidden sm:block text-[#f4f1ea] text-xs uppercase tracking-[0.25em] font-semibold group-hover:text-[#c6a25f] transition-colors">
                {isRTL ? "مرجع سنگ ایرانیان" : "Iranian Stone Reference"}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className={[
                "hidden md:flex items-center gap-8",
                isRTL ? "flex-row-reverse" : "",
              ].join(" ")}
              aria-label="Main navigation"
            >
              {navItems.map((item) =>
                item.hasMenu ? (
                  <div key={item.href} ref={galleryRef} className="relative">
                    <button
                      onClick={() => setGalleryOpen((v) => !v)}
                      className={[
                        "text-xs uppercase tracking-[0.15em] font-semibold transition-colors duration-200 flex items-center gap-1.5",
                        galleryOpen ? "text-[#c6a25f]" : "text-[#f4f1ea] hover:text-[#c6a25f]",
                      ].join(" ")}
                      aria-expanded={galleryOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg
                        className={[
                          "w-3 h-3 transition-transform duration-200",
                          galleryOpen ? "rotate-180" : "",
                        ].join(" ")}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Mega Menu */}
                    {galleryOpen && (
                      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[680px] bg-[#0c1626] border border-[#c6a25f]/20 shadow-2xl shadow-black/50 p-6">
                        <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.25em] font-bold mb-5 pb-3 border-b border-[#c6a25f]/20">
                          {t.galleryMenu.title}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${locale}/gallery/${cat.slug}`}
                              onClick={() => setGalleryOpen(false)}
                              className="group flex items-center gap-3 p-2 hover:bg-white/5 transition-colors"
                            >
                              <div className="relative w-14 h-10 flex-shrink-0 overflow-hidden">
                                <Image
                                  src={cat.thumbnailImage}
                                  alt={locale === "fa" ? cat.nameFa : cat.nameEn}
                                  fill
                                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                  sizes="56px"
                                />
                              </div>
                              <span className="text-[#f4f1ea] text-xs uppercase tracking-[0.1em] group-hover:text-[#c6a25f] transition-colors">
                                {locale === "fa" ? cat.nameFa : cat.nameEn}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-5 pt-3 border-t border-[#c6a25f]/20">
                          <Link
                            href={`/${locale}/gallery`}
                            onClick={() => setGalleryOpen(false)}
                            className="text-[#c6a25f] text-[10px] uppercase tracking-[0.2em] hover:text-[#d8bd86] transition-colors"
                          >
                            {locale === "fa" ? "مشاهدهٔ همهٔ مجموعه‌ها →" : "View All Collections →"}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xs uppercase tracking-[0.15em] font-semibold text-[#f4f1ea] hover:text-[#c6a25f] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right Controls */}
            <div
              className={[
                "flex items-center gap-4",
                isRTL ? "flex-row-reverse" : "",
              ].join(" ")}
            >
              {/* Language Toggle */}
              <button
                onClick={switchLocale}
                className="hidden md:flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-bold text-[#f4f1ea] hover:text-[#c6a25f] transition-colors border-b border-transparent hover:border-[#c6a25f] pb-0.5"
                aria-label="Switch language"
              >
                {t.nav.langSwitch}
              </button>

              {/* Contact CTA */}
              <Link
                href={`/${locale}/contact`}
                className="hidden lg:inline-flex items-center px-5 py-2 bg-[#c6a25f] text-[#0c1626] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors"
              >
                {t.nav.contact}
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden text-[#f4f1ea] hover:text-[#c6a25f] transition-colors p-1"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Gold accent line at bottom */}
        <div className={["h-px bg-[#c6a25f]/30 transition-opacity duration-300", isTransparent ? "opacity-0" : "opacity-100"].join(" ")} />
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c1626] flex flex-col pt-20" dir={isRTL ? "rtl" : "ltr"}>
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
            {/* Gallery with categories */}
            <div>
              <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.25em] mb-4">
                {t.galleryMenu.title}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${locale}/gallery/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-[#f4f1ea] text-sm hover:text-[#c6a25f] transition-colors py-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#c6a25f]" />
                    {locale === "fa" ? cat.nameFa : cat.nameEn}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#c6a25f]/20" />

            {[
              { label: t.nav.about, href: `/${locale}/about` },
              { label: t.nav.contact, href: `/${locale}/contact` },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#f4f1ea] text-lg uppercase tracking-[0.15em] font-semibold hover:text-[#c6a25f] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-6 border-t border-[#c6a25f]/20 flex items-center justify-between">
            <button
              onClick={() => { switchLocale(); setMobileOpen(false); }}
              className="text-[#c6a25f] text-sm uppercase tracking-[0.2em] font-bold"
            >
              {t.nav.langSwitch}
            </button>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 bg-[#c6a25f] text-[#0c1626] text-[10px] uppercase tracking-[0.2em] font-bold"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
