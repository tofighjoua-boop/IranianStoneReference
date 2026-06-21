"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { type Language, translations } from "@/lib/translations";

interface FilterOption {
  value: string;
  label: string;
}

interface ProductFilterProps {
  locale: Language;
  colors: FilterOption[];
  finishes: FilterOption[];
}

export function ProductFilter({ locale, colors, finishes }: ProductFilterProps) {
  const t = translations[locale].gallery;
  const isRTL = locale === "fa";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeColor = searchParams.get("color") ?? "all";
  const activeFinish = searchParams.get("finish") ?? "all";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div
      className={[
        "flex flex-wrap items-center gap-4 py-4 border-b border-[#e5e0d8]",
        isPending ? "opacity-60" : "",
      ].join(" ")}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-semibold flex-shrink-0">
        {t.filterLabel}:
      </span>

      {/* Color filter */}
      {colors.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-[#1d2330]/40 uppercase tracking-[0.1em]">{t.filterColor}:</span>
          {[{ value: "all", label: t.filterAll }, ...colors].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("color", opt.value)}
              className={[
                "text-[10px] uppercase tracking-[0.15em] px-3 py-1 border transition-colors",
                activeColor === opt.value
                  ? "bg-[#0c1626] text-[#f4f1ea] border-[#0c1626]"
                  : "bg-transparent text-[#1d2330]/60 border-[#e5e0d8] hover:border-[#c6a25f] hover:text-[#c6a25f]",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Finish filter */}
      {finishes.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-[#1d2330]/40 uppercase tracking-[0.1em]">{t.filterFinish}:</span>
          {[{ value: "all", label: t.filterAll }, ...finishes].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("finish", opt.value)}
              className={[
                "text-[10px] uppercase tracking-[0.15em] px-3 py-1 border transition-colors",
                activeFinish === opt.value
                  ? "bg-[#0c1626] text-[#f4f1ea] border-[#0c1626]"
                  : "bg-transparent text-[#1d2330]/60 border-[#e5e0d8] hover:border-[#c6a25f] hover:text-[#c6a25f]",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
