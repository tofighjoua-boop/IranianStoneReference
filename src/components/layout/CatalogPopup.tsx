"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type Language } from "@/lib/translations";

const HALF_CYCLE_MS = 5_000;

export function CatalogPopup({ locale }: { locale: Language }) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const toggleTimer = setInterval(() => setVisible((v) => !v), HALF_CYCLE_MS);
    return () => clearInterval(toggleTimer);
  }, []);

  return (
    <button
      type="button"
      onClick={() => router.push(`/${locale}/catalogs`)}
      aria-label={locale === "fa" ? "مشاهده کاتالوگ‌ها" : "View catalogs"}
      style={{
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: visible
          ? "translate(-50%, 0)"
          : "translate(-50%, 24px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 60,
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="flex items-center gap-3 rounded-full bg-[#0c1626] px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[#c6a25f]/40 hover:border-[#c6a25f] transition-colors cursor-pointer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c6a25f" strokeWidth="1.8">
        <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M15 2v5h5" />
        <path d="M8 13h8M8 17h5" />
      </svg>
      <span
        className="text-[#f4f1ea] text-sm font-bold"
        style={{ fontFamily: locale === "fa" ? "Vazirmatn, Tahoma, sans-serif" : undefined }}
      >
        {locale === "fa" ? "مشاهده کاتالوگ‌ها" : "View Catalogs"}
      </span>
    </button>
  );
}
