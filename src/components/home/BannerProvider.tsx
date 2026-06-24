"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const BANNER_SLIDES = [
  {
    bg: "/images/banner-new-1.jpg",
    category: "marble",
    title: { en: "MARBLE COLLECTION", fa: "مجموعهٔ مرمریت" },
    sub: { en: "Iran's most treasured veined stone — timeless elegance for every space", fa: "ارزشمندترین سنگ رگه‌دار ایران — ظرافت ماندگار برای هر فضا" },
    cta: { en: "Explore Gallery", fa: "مشاهده گالری" },
    href: "/gallery/marble",
  },
  {
    bg: "/images/7W4A9926.jpg",
    category: "travertine",
    title: { en: "TRAVERTINE", fa: "تراورتن" },
    sub: { en: "Classic and exclusive from Iran's most prestigious quarries", fa: "کلاسیک و اکسکلوسیو از معتبرترین معادن ایران" },
    cta: { en: "View Collection", fa: "مشاهده مجموعه" },
    href: "/gallery/travertine",
  },
  {
    bg: "/images/banner-new-3.jpg",
    category: "onyx",
    title: { en: "ONYX & LUXURY STONE", fa: "مرمر و سنگ لوکس" },
    sub: { en: "Rare and precious stone for extraordinary spaces", fa: "سنگ نادر و قیمتی برای فضاهای استثنایی" },
    cta: { en: "View Collection", fa: "مشاهده مجموعه" },
    href: "/gallery/onyx",
  },
  {
    bg: "/images/banner-stone-dark.jpg",
    category: "granite",
    title: { en: "CUSTOM PROCESSING", fa: "فرآوری سفارشی" },
    sub: { en: "CNC Cutting · Polished · Honed · Leather Finish", fa: "برش CNC · پولیش · مات · فینیش چرم" },
    cta: { en: "Production Process", fa: "فرآیند تولید" },
    href: "/production",
  },
  {
    bg: "/images/banner-new-2.jpg",
    category: "washbasins",
    title: { en: "STONE WASHBASINS", fa: "روشویی‌های سنگی" },
    sub: { en: "Handcrafted from rare natural stone — unique in every piece", fa: "دست‌ساز از سنگ طبیعی نادر — منحصربه‌فرد در هر قطعه" },
    cta: { en: "View Washbasins", fa: "مشاهده روشویی‌ها" },
    href: "/gallery/washbasins",
  },
  {
    bg: "/images/banner-new-4.jpg",
    category: "accessories",
    title: { en: "UAE · QATAR · GERMANY", fa: "امارات · قطر · آلمان" },
    sub: { en: "Premium Iranian Stone — Exported to 20+ Countries", fa: "سنگ پریمیوم ایران — صادر‌شده به بیش از ۲۰ کشور" },
    cta: { en: "Contact Export Team", fa: "تیم صادرات" },
    href: "/contact",
  },
] as const;

export type BannerSlide = (typeof BANNER_SLIDES)[number];

interface BannerCtx {
  active: number;
  slides: typeof BANNER_SLIDES;
}

const BannerContext = createContext<BannerCtx>({ active: 0, slides: BANNER_SLIDES });

export function useBanner() {
  return useContext(BannerContext);
}

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % BANNER_SLIDES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <BannerContext.Provider value={{ active, slides: BANNER_SLIDES }}>
      {children}
    </BannerContext.Provider>
  );
}
