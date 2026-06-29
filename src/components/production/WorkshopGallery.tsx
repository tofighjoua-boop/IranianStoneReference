"use client";

import { useState } from "react";
import Image from "next/image";
import { workshopGallery } from "@/data/workshop-gallery";
import { type Language } from "@/lib/translations";

export function WorkshopGallery({ locale }: { locale: Language }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isRTL = locale === "fa";
  const font = isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif";

  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + workshopGallery.length) % workshopGallery.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % workshopGallery.length));

  return (
    <>
      {/* Section header */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 300, color: "#1d2330", letterSpacing: "2px", textTransform: isRTL ? "none" : "uppercase", fontFamily: font }}>
          {isRTL ? "گالری عکس کارگاهی" : "Production Gallery"}
        </h2>
      </div>

      {/* Grid */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2px",
        }}
      >
        {workshopGallery.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setLightbox(idx)}
            className="workshop-card"
            style={{
              position: "relative",
              aspectRatio: "4/3",
              border: "none",
              padding: 0,
              cursor: "zoom-in",
              overflow: "hidden",
              background: "#0c1626",
              display: "block",
              width: "100%",
            }}
            aria-label={isRTL ? item.captionFa : item.captionEn}
          >
            <Image
              src={item.image}
              alt={isRTL ? item.captionFa : item.captionEn}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover", transition: "transform 0.5s ease, opacity 0.3s ease" }}
              className="workshop-img"
            />

            {/* Hover overlay */}
            <div className="workshop-overlay" style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(12,22,38,0.92) 0%, rgba(12,22,38,0.3) 55%, transparent 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "20px",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}>
              {item.tagEn && (
                <span style={{
                  fontSize: "9px",
                  color: "#A18F7A",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontFamily: "Lato, sans-serif",
                  marginBottom: "6px",
                  textAlign: isRTL ? "right" : "left",
                }}>
                  {isRTL ? item.tagFa : item.tagEn}
                </span>
              )}
              <p style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.55,
                fontFamily: font,
                margin: 0,
                textAlign: isRTL ? "right" : "left",
              }}>
                {isRTL ? item.captionFa : item.captionEn}
              </p>
            </div>

            {/* Zoom icon */}
            <div className="workshop-zoom" style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "30px",
              height: "30px",
              background: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.4">
                <circle cx="5.5" cy="5.5" r="4" />
                <line x1="8.5" y1="8.5" x2="12" y2="12" />
                <line x1="3.5" y1="5.5" x2="7.5" y2="5.5" />
                <line x1="5.5" y1="3.5" x2="5.5" y2="7.5" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(0,0,0,0.93)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "2px", fontFamily: "Lato, sans-serif", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
            </svg>
            CLOSE
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "48px", height: "48px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5" /></svg>
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "min(1100px, 90vw)", maxHeight: "80vh", width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div style={{ position: "relative", width: "100%", maxHeight: "72vh", aspectRatio: "16/10", overflow: "hidden" }}>
              <Image
                src={workshopGallery[lightbox].image}
                alt={isRTL ? workshopGallery[lightbox].captionFa : workshopGallery[lightbox].captionEn}
                fill
                unoptimized
                sizes="90vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <div dir={isRTL ? "rtl" : "ltr"} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
              <div>
                {workshopGallery[lightbox].tagEn && (
                  <span style={{ fontSize: "9px", color: "#A18F7A", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", display: "block", marginBottom: "4px" }}>
                    {isRTL ? workshopGallery[lightbox].tagFa : workshopGallery[lightbox].tagEn}
                  </span>
                )}
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, fontFamily: font, margin: 0 }}>
                  {isRTL ? workshopGallery[lightbox].captionFa : workshopGallery[lightbox].captionEn}
                </p>
              </div>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "Lato, sans-serif", whiteSpace: "nowrap" }}>
                {lightbox + 1} / {workshopGallery.length}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "48px", height: "48px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3l5 5-5 5" /></svg>
          </button>

          {/* Counter bottom */}
          <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
            {workshopGallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                style={{ width: i === lightbox ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === lightbox ? "#A18F7A" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
