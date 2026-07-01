"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { type Language } from "@/lib/translations";

const HALF_CYCLE_MS = 5_000;

export function CatalogPopup({ locale }: { locale: Language }) {
  const [visible, setVisible] = useState(true);
  const hoveredRef = useRef(false);
  const router = useRouter();
  const isRTL = locale === "fa";

  useEffect(() => {
    const toggleTimer = setInterval(() => {
      setVisible((v) => (hoveredRef.current ? true : !v));
    }, HALF_CYCLE_MS);
    return () => clearInterval(toggleTimer);
  }, []);

  return (
    <button
      type="button"
      onClick={() => router.push(`/${locale}/catalogs`)}
      onMouseEnter={() => {
        hoveredRef.current = true;
        setVisible(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      aria-label={locale === "fa" ? "مشاهده کاتالوگ‌ها" : "View catalogs"}
      style={{
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: visible
          ? "translate(-50%, 0) scale(1)"
          : "translate(-50%, 24px) scale(0.94)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 60,
        transition: "opacity 0.5s ease, transform 0.5s ease",
        background: "linear-gradient(135deg, #0c1626 0%, #1a2740 100%)",
      }}
      className="group relative flex items-center gap-3 rounded-full pl-3 pr-6 py-2.5 border border-[#c6a25f]/50 hover:border-[#c6a25f] hover:-translate-y-1 transition-[border-color,transform] duration-300 cursor-pointer catalog-popup"
    >
      <span className="catalog-popup-shine" />

      <span className="relative flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-[#d9b76f] to-[#a3803f] shadow-[0_2px_10px_rgba(198,162,95,0.5)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c1626" strokeWidth="1.8">
          <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
          <path d="M15 2v5h5" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      </span>

      <span className="relative flex flex-col items-start" style={{ fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : undefined }}>
        <span className="text-[#f4f1ea] text-sm font-bold leading-tight">
          {isRTL ? "مشاهده کاتالوگ‌ها" : "View Catalogs"}
        </span>
        <span className="text-[#c6a25f] text-[11px] leading-tight">
          {isRTL ? "دانلود و مشاهده PDF" : "Browse & view PDFs"}
        </span>
      </span>

      <span
        className={[
          "relative text-[#c6a25f] text-base transition-transform duration-300",
          isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
        ].join(" ")}
      >
        {isRTL ? "←" : "→"}
      </span>
    </button>
  );
}
