export interface StoneCategory {
  slug: string;
  nameEn: string;
  nameFa: string;
  descriptionEn: string;
  descriptionFa: string;
  image: string;
  thumbnailImage: string;
  productCount: number;
}

export const categories: StoneCategory[] = [
  {
    slug: "marble",
    nameEn: "Marble",
    nameFa: "سنگ مرمر",
    descriptionEn:
      "The timeless classic. Iranian marble offers unmatched veining and colour depth — from warm creams and rich greys to dramatic golds and deep blacks.",
    descriptionFa:
      "کلاسیک ابدی. مرمر ایرانی رگه‌بندی و عمق رنگ بی‌نظیری دارد — از کرم‌های گرم و خاکستری‌های غنی تا طلایی‌های درام‌تیک و سیاه‌های عمیق.",
    image: "/images/gallery/marble/PIETRA-GREY-ISR018-1024x684.jpg",
    thumbnailImage: "/images/gallery/marble/PIETRA-GREY-ISR018-1024x684.jpg",
    productCount: 15,
  },
  {
    slug: "crystalline-marble",
    nameEn: "Crystalline Marble",
    nameFa: "سنگ مرمر کریستالی",
    descriptionEn:
      "The purest form of Iranian marble — high-crystallinity stone with exceptional translucency, white brilliance, and fine grain structure. Quarried from Iran's most prized deposits.",
    descriptionFa:
      "خالص‌ترین شکل مرمر ایرانی — سنگی با کریستالینیتی بالا، شفافیت استثنایی، درخشندگی سفید و ساختار دانه‌بندی ظریف. استخراج‌شده از ارزشمندترین معادن ایران.",
    image: "/images/gallery/crystalline-marble/TIARA-MARBLE-ISR001-1024x783.jpg",
    thumbnailImage: "/images/gallery/crystalline-marble/TIARA-MARBLE-ISR001-1024x783.jpg",
    productCount: 15,
  },
];

export function getCategoryBySlug(slug: string): StoneCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
