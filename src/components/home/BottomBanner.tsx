"use client";

import Image from "next/image";
import { type Language } from "@/lib/translations";
import { useBanner } from "./BannerProvider";

export function BottomBanner({ locale }: { locale: Language }) {
  const { active, slides } = useBanner();
  const isRTL = locale === "fa";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
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
                padding: "0 24px",
                maxWidth: "835px",
              }}
            >
              <div
                style={{
                  fontSize: isRTL ? "24px" : "32px",
                  letterSpacing: isRTL ? "1px" : "4.8px",
                  textTransform: "uppercase",
                  fontWeight: 300,
                  color: "white",
                  fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                }}
              >
                {slide.title[locale]}
              </div>

              <div
                style={{
                  fontSize: "18px",
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 300,
                  fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                }}
              >
                {slide.sub[locale]}
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
