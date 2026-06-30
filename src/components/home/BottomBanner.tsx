"use client";

import Image from "next/image";
import { type Language } from "@/lib/translations";
import { useBanner } from "./BannerProvider";

export function BottomBanner({}: { locale: Language }) {
  const { active, slides, preloaded } = useBanner();

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
          {/* Only load image when slide has been/will be shown */}
          {preloaded.has(i) && (
            <Image
              src={slide.bg}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
            />
          )}

          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
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
