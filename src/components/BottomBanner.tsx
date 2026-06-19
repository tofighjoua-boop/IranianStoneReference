"use client";

import { useState, useEffect } from "react";

interface BottomSlide {
  id: string;
  backgroundImage: string;
}

const bottomSlides: BottomSlide[] = [
  { id: "bb-1", backgroundImage: "/images/bottom-banner-1.jpg" },
  { id: "bb-2", backgroundImage: "/images/bottom-banner-2.jpg" },
  { id: "bb-3", backgroundImage: "/images/bottom-banner-3.jpg" },
];

export function BottomBanner() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bottomSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {bottomSlides.map((slide, i) => (
        <div
          key={slide.id}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 2s ease-out",
          }}
        />
      ))}
    </div>
  );
}
