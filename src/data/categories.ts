export interface StoneCategory {
  slug: string;
  nameEn: string;
  nameFa: string;
  descriptionEn: string;
  descriptionFa: string;
  image: string;
  thumbnailImage: string;
  productCount: number;
  parentSlug?: string;
}

export const categories: StoneCategory[] = [
  // ── Top-level parent ──────────────────────────────────────────────────
  {
    slug: "marble",
    nameEn: "Marble",
    nameFa: "مرمر",
    descriptionEn:
      "Iranian marble in all its forms — from classic veined stone to rare high-crystallinity varieties prized worldwide.",
    descriptionFa:
      "مرمر ایرانی در تمام اشکال آن — از سنگ رگه‌دار کلاسیک تا انواع کریستالی نادر که در سراسر جهان ارزشمند هستند.",
    image: "/images/gallery/marble/PIETRA-GREY-ISR018-1024x684.jpg",
    thumbnailImage: "/images/gallery/marble/PIETRA-GREY-ISR018-1024x684.jpg",
    productCount: 30,
  },

  // ── Marble subcategories ──────────────────────────────────────────────
  {
    slug: "sang-marmar",
    nameEn: "Marble",
    nameFa: "سنگ مرمر",
    descriptionEn:
      "The timeless classic. Iranian marble offers unmatched veining and colour depth — from warm creams and rich greys to dramatic golds and deep blacks.",
    descriptionFa:
      "کلاسیک ابدی. مرمر ایرانی رگه‌بندی و عمق رنگ بی‌نظیری دارد — از کرم‌های گرم و خاکستری‌های غنی تا طلایی‌های درام‌تیک و سیاه‌های عمیق.",
    image: "/images/gallery/marble/PIETRA-GREY-ISR018-1024x684.jpg",
    thumbnailImage: "/images/gallery/marble/PIETRA-GREY-ISR018-1024x684.jpg",
    productCount: 15,
    parentSlug: "marble",
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
    parentSlug: "marble",
  },

  // ── Other top-level categories ────────────────────────────────────────
  {
    slug: "travertine",
    nameEn: "Travertine",
    nameFa: "تراورتن",
    descriptionEn:
      "Warm, textured, and full of character. Iranian travertine is prized worldwide for its natural porosity and rich earth tones.",
    descriptionFa:
      "گرم، بافت‌دار و پر از شخصیت. تراورتن ایرانی به خاطر تخلخل طبیعی و تُن‌های غنی خاکی در سراسر جهان مورد توجه است.",
    image: "/images/banner-2.jpg",
    thumbnailImage: "/images/banner-2.jpg",
    productCount: 0,
  },
  {
    slug: "onyx",
    nameEn: "Onyx",
    nameFa: "اونیکس",
    descriptionEn:
      "The stone of light. Translucent onyx creates breathtaking backlit feature walls, countertops, and luxury installations.",
    descriptionFa:
      "سنگ نور. اونیکس شفاف دیوارهای ویژهٔ با نور پشت، پیشخوان‌ها و نصب‌های لوکس شگفت‌انگیزی ایجاد می‌کند.",
    image: "/images/collection-exclusive.jpg",
    thumbnailImage: "/images/collection-exclusive.jpg",
    productCount: 0,
  },
  {
    slug: "granite",
    nameEn: "Granite",
    nameFa: "گرانیت",
    descriptionEn:
      "Strength and beauty combined. Granite offers superior hardness for high-traffic flooring, facades, and outdoor applications.",
    descriptionFa:
      "ترکیب قدرت و زیبایی. گرانیت سختی برتری برای کف‌های پرتردد، نماها و کاربردهای فضای باز ارائه می‌دهد.",
    image: "/images/collection-tableware.jpg",
    thumbnailImage: "/images/collection-tableware.jpg",
    productCount: 0,
  },
  {
    slug: "washbasins",
    nameEn: "Washbasins",
    nameFa: "روشویی‌ها",
    descriptionEn:
      "CNC-crafted stone washbasins — round, oval, rectangular, and vessel styles. Custom dimensions and stone selection available.",
    descriptionFa:
      "روشویی‌های سنگی CNC — گرد، بیضی، مستطیل و سینک. ابعاد سفارشی و انتخاب سنگ موجود است.",
    image: "/images/collection-tech.jpg",
    thumbnailImage: "/images/collection-tech.jpg",
    productCount: 0,
  },
  {
    slug: "accessories",
    nameEn: "Stone Accessories",
    nameFa: "اکسسوری سنگی",
    descriptionEn:
      "Decorative and functional stone objects — tableware, vases, candle holders, and artisan décor pieces crafted from signature Iranian stones.",
    descriptionFa:
      "اشیاء سنگی تزئینی و کاربردی — ظروف، گلدان، شمعدان و قطعات دکور هنری از سنگ‌های شاخص ایرانی.",
    image: "/images/banner-6.jpg",
    thumbnailImage: "/images/banner-6.jpg",
    productCount: 0,
  },
];

export function getCategoryBySlug(slug: string): StoneCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategories(parentSlug: string): StoneCategory[] {
  return categories.filter((c) => c.parentSlug === parentSlug);
}

export function getParentCategory(childSlug: string): StoneCategory | undefined {
  const child = getCategoryBySlug(childSlug);
  if (!child?.parentSlug) return undefined;
  return getCategoryBySlug(child.parentSlug);
}

export function getTopLevelCategories(): StoneCategory[] {
  return categories.filter((c) => !c.parentSlug);
}
