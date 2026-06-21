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
    nameFa: "مرمر",
    descriptionEn:
      "The timeless classic. Iranian marble offers unmatched veining and colour depth — from pure crystalline whites to dramatic deep greens.",
    descriptionFa:
      "کلاسیک ابدی. مرمر ایرانی رگه‌بندی و عمق رنگ بی‌نظیری دارد — از سفیدهای کریستالی خالص تا سبزهای عمیق درام‌تیک.",
    image: "/images/banner-1.jpg",
    thumbnailImage: "/images/banner-1.jpg",
    productCount: 0,
  },
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
    image: "/images/banner-3.jpg",
    thumbnailImage: "/images/banner-3.jpg",
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
    image: "/images/banner-4.jpg",
    thumbnailImage: "/images/banner-4.jpg",
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
    image: "/images/banner-5.jpg",
    thumbnailImage: "/images/banner-5.jpg",
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
