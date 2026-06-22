import Link from "next/link";
import Image from "next/image";
import { type Language } from "@/lib/translations";

const NAV_LINKS = {
  en: [
    { label: "GALLERY",  href: "/en/gallery" },
    { label: "ABOUT",    href: "/en/about" },
    { label: "CONTACT",  href: "/en/contact" },
    { label: "PRIVACY",  href: "/en/contact" },
    { label: "COOKIES",  href: "/en/contact" },
  ],
  fa: [
    { label: "گالری",       href: "/fa/gallery" },
    { label: "درباره ما",   href: "/fa/about" },
    { label: "تماس",        href: "/fa/contact" },
    { label: "حریم خصوصی", href: "/fa/contact" },
    { label: "کوکی‌ها",    href: "/fa/contact" },
  ],
} as const;

const INSTAGRAM_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";

const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

export function Footer({ locale }: { locale: Language }) {
  const isRTL = locale === "fa";
  const links = NAV_LINKS[locale];

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backgroundColor: "#090808",
        color: "#A18F7A",
        width: "100%",
        padding: "60px 0 40px",
        fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1640px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 140px)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* Logo + address */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "180px" }}>
            <Link href={`/${locale}`}>
              <Image
                src="/images/isr-logo-full.png"
                alt="Iranian Stone Reference"
                width={178}
                height={50}
                style={{
                  height: "38px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </Link>
            <p style={{ fontSize: "13px", color: "#A18F7A", lineHeight: 1.6, margin: 0 }}>
              {isRTL ? "مرجع سنگ ایرانیان" : "Iranian Stone Reference"}<br />
              {isRTL ? "تهران، ایران" : "Tehran, Iran"}
            </p>
            <a
              href="mailto:info@iranianstone.ir"
              style={{ fontSize: "13px", color: "#A18F7A", textDecoration: "none" }}
            >
              info@iranianstone.ir
            </a>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "13px",
                  color: "#A18F7A",
                  textDecoration: "none",
                  letterSpacing: isRTL ? "0" : "1px",
                  textTransform: isRTL ? "none" : "uppercase",
                  display: "block",
                  lineHeight: 2,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social + language */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
              {isRTL ? "دنبال کنید" : "FOLLOW US"}
            </p>

            <div style={{ display: "flex", gap: "16px" }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#A18F7A" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d={INSTAGRAM_PATH} />
                </svg>
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" style={{ color: "#A18F7A" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d={WHATSAPP_PATH} />
                </svg>
              </a>
            </div>

            <Link
              href={locale === "fa" ? "/en" : "/fa"}
              style={{ fontSize: "11px", color: "#A18F7A", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none" }}
            >
              {locale === "fa" ? "English" : "فارسی"}
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid rgba(161,143,122,0.25)",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "11px", color: "#A18F7A", margin: 0 }}>
            {isRTL
              ? "مرجع سنگ ایرانیان — تمامی حقوق محفوظ است."
              : "Iranian Stone Reference — All rights reserved."}
          </p>
          <p style={{ fontSize: "11px", color: "#A18F7A", margin: 0 }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
