"use client";

import Image from "next/image";
import { type Language } from "@/lib/translations";
import { useBanner } from "./BannerProvider";

export function HeroSection({ locale }: { locale: Language }) {
  const { active, slides } = useBanner();
  const isRTL = locale === "fa";

  return (
    <div
      className="home_banner_container"
      style={{
        position: "relative",
        width: "100%",
        height: "720px",
        maxHeight: "800px",
        minHeight: "520px",
        overflow: "hidden",
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 2s ease-out",
          }}
        >
          {/* Next.js optimized image — AVIF/WebP, quality 90 */}
          <Image
            src={slide.bg}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />

          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              dir={isRTL ? "rtl" : "ltr"}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                textAlign: "center",
                maxWidth: "835px",
                padding: "0 20px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  color: "white",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  fontWeight: 300,
                  fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                }}
              >
                {isRTL ? "مرجع سنگ ایرانیان®" : "IRANIAN STONE REFERENCE®"}
              </span>

              <div
                className={isRTL ? "" : "text-[22px] sm:text-[28px] lg:text-[36px]"}
                style={{
                  fontSize: isRTL ? "34px" : undefined,
                  lineHeight: "1.35",
                  letterSpacing: isRTL ? "2px" : "3px",
                  color: "white",
                  textTransform: "uppercase",
                  fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                  fontWeight: isRTL ? 300 : 700,
                  whiteSpace: isRTL ? "nowrap" : "normal",
                  textAlign: "center",
                }}
              >
                {isRTL ? (
                  "از دل کوه تا قلب معماری"
                ) : (
                  <>
                    FROM THE HEART OF THE MOUNTAIN
                    <br className="sm:hidden" />
                    {" "}TO THE HEART OF ARCHITECTURE
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Slide dots */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 2,
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === active ? "24px" : "6px",
              height: "6px",
              background: i === active ? "#c6a25f" : "rgba(255,255,255,0.4)",
              transition: "all 0.4s ease",
              borderRadius: "3px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
