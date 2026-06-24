"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  productName: string;
  locale: "en" | "fa";
}

export function WashbasinViewer({ images, productName, locale }: Props) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div>
      {/* Main image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
        <Image
          src={selected}
          alt={productName}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Variant thumbnails */}
      {images.length > 1 && (
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/40 font-bold mb-3">
            {locale === "fa" ? "رنگ‌بندی موجود" : "Available Variants"}
          </p>
          <div className="flex gap-3 flex-wrap">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(img)}
                aria-label={`${locale === "fa" ? "نمونه" : "Variant"} ${i + 1}`}
                style={{
                  width: 72,
                  height: 48,
                  padding: 0,
                  border: selected === img
                    ? "2px solid #c6a25f"
                    : "2px solid transparent",
                  cursor: "pointer",
                  background: "none",
                  position: "relative",
                  overflow: "hidden",
                  outline: "none",
                  transition: "border-color 0.2s",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={img}
                  alt={`${productName} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
