export interface Product {
  slug: string;
  categorySlug: string;
  nameEn: string;
  nameFa: string;
  color: string;
  colorFa: string;
  descriptionEn: string;
  descriptionFa: string;
  finishes: string[];
  finishesFa: string[];
  dimensions?: string;
  images: string[];
  thumbnail: string;
  isExclusive?: boolean;
  isNew?: boolean;
  characteristics?: string[];
  characteristicsFa?: string[];
}

/** [PLACEHOLDER] — replace images and details with real content */
export const products: Product[] = [
  // ── Marble ──────────────────────────────────────────────────────────
  {
    slug: "white-crystal-marble",
    categorySlug: "marble",
    nameEn: "White Crystal",
    nameFa: "کریستال سفید",
    color: "White",
    colorFa: "سفید",
    descriptionEn:
      "[PLACEHOLDER] A luminous white marble with fine grey veining, quarried from central Iran. Ideal for floors, walls, and statement countertops.",
    descriptionFa:
      "[PLACEHOLDER] مرمری درخشان سفید با رگه‌های ظریف خاکستری، استخراج‌شده از مرکز ایران. ایده‌آل برای کف، دیوار و پیشخوان‌های شاخص.",
    finishes: ["Polished", "Honed", "Brushed"],
    finishesFa: ["پولیش", "مات", "براش"],
    dimensions: "Slabs: up to 300×180 cm. Tiles: 60×60, 60×120 cm",
    images: ["/images/banner-1.jpg", "/images/collection-exclusive.jpg"],
    thumbnail: "/images/banner-1.jpg",
    isExclusive: true,
    characteristics: ["High translucency", "Fine grain", "Very low absorption"],
    characteristicsFa: ["شفافیت بالا", "دانه‌بندی ظریف", "جذب بسیار پایین"],
  },
  {
    slug: "emperador-dark",
    categorySlug: "marble",
    nameEn: "Emperador Dark",
    nameFa: "امپرادور تیره",
    color: "Brown/Gold",
    colorFa: "قهوه‌ای / طلایی",
    descriptionEn:
      "[PLACEHOLDER] Rich brown marble with intricate gold and white veining. A signature luxury material for feature walls and premium bathrooms.",
    descriptionFa:
      "[PLACEHOLDER] مرمر قهوه‌ای غنی با رگه‌بندی پیچیدهٔ طلایی و سفید. ماده‌ای لوکس شاخص برای دیوارهای ویژه و حمام‌های پریمیوم.",
    finishes: ["Polished", "Honed"],
    finishesFa: ["پولیش", "مات"],
    dimensions: "Slabs: up to 280×160 cm",
    images: ["/images/banner-2.jpg"],
    thumbnail: "/images/banner-2.jpg",
    characteristics: ["Rich brown tone", "Golden veining", "Medium absorption"],
    characteristicsFa: ["تُن قهوه‌ای غنی", "رگه‌بندی طلایی", "جذب متوسط"],
  },
  {
    slug: "green-forest-marble",
    categorySlug: "marble",
    nameEn: "Green Forest",
    nameFa: "جنگل سبز",
    color: "Green",
    colorFa: "سبز",
    descriptionEn:
      "[PLACEHOLDER] Deep forest green marble with white veining — a dramatic statement stone for lobbies and statement staircases.",
    descriptionFa:
      "[PLACEHOLDER] مرمر سبز جنگلی عمیق با رگه‌بندی سفید — سنگی درام‌تیک برای لابی‌ها و راه‌پله‌های شاخص.",
    finishes: ["Polished", "Leather"],
    finishesFa: ["پولیش", "چرم"],
    dimensions: "Slabs: up to 260×150 cm",
    images: ["/images/banner-3.jpg"],
    thumbnail: "/images/banner-3.jpg",
    isExclusive: true,
  },

  // ── Travertine ───────────────────────────────────────────────────────
  {
    slug: "classic-beige-travertine",
    categorySlug: "travertine",
    nameEn: "Classic Beige",
    nameFa: "بژ کلاسیک",
    color: "Beige",
    colorFa: "بژ",
    descriptionEn:
      "[PLACEHOLDER] The most sought-after Iranian travertine — warm beige tones with natural voids filled for a smooth surface. Exceptional for facades and flooring.",
    descriptionFa:
      "[PLACEHOLDER] پرطرفدارترین تراورتن ایرانی — تُن‌های بژ گرم با حفرات طبیعی پرشده برای سطحی صاف. استثنایی برای نما و کف.",
    finishes: ["Polished", "Honed", "Tumbled"],
    finishesFa: ["پولیش", "مات", "تومبل"],
    dimensions: "Slabs: up to 340×180 cm. Tiles: various",
    images: ["/images/banner-2.jpg"],
    thumbnail: "/images/banner-2.jpg",
    isNew: true,
  },
  {
    slug: "silver-travertine",
    categorySlug: "travertine",
    nameEn: "Silver Travertine",
    nameFa: "تراورتن نقره‌ای",
    color: "Grey/Silver",
    colorFa: "خاکستری / نقره‌ای",
    descriptionEn:
      "[PLACEHOLDER] Cool-toned travertine with silvery grey veins. A modern alternative to classic beige, ideal for contemporary interiors.",
    descriptionFa:
      "[PLACEHOLDER] تراورتن با تُن خنک و رگه‌های خاکستری نقره‌ای. جایگزین مدرن بژ کلاسیک، ایده‌آل برای فضاهای داخلی معاصر.",
    finishes: ["Honed", "Polished"],
    finishesFa: ["مات", "پولیش"],
    images: ["/images/banner-1.jpg"],
    thumbnail: "/images/banner-1.jpg",
  },

  // ── Onyx ─────────────────────────────────────────────────────────────
  {
    slug: "honey-onyx",
    categorySlug: "onyx",
    nameEn: "Honey Onyx",
    nameFa: "اونیکس عسلی",
    color: "Amber/Gold",
    colorFa: "عنبری / طلایی",
    descriptionEn:
      "[PLACEHOLDER] Translucent amber onyx with flowing gold and cream banding. Spectacular backlit applications in bars, receptions, and spa environments.",
    descriptionFa:
      "[PLACEHOLDER] اونیکس عنبری شفاف با باندینگ طلایی و کرمی روان. برنامه‌های نورپشتی شگفت‌انگیز در بارها، پذیرش‌ها و محیط‌های اسپا.",
    finishes: ["Polished"],
    finishesFa: ["پولیش"],
    dimensions: "Slabs: up to 200×120 cm",
    images: ["/images/banner-3.jpg"],
    thumbnail: "/images/banner-3.jpg",
    isExclusive: true,
  },
  {
    slug: "green-onyx",
    categorySlug: "onyx",
    nameEn: "Green Onyx",
    nameFa: "اونیکس سبز",
    color: "Green",
    colorFa: "سبز",
    descriptionEn:
      "[PLACEHOLDER] Vivid emerald green onyx with translucent quality. Exclusively from Iranian quarries, ideal for luxury accent panels.",
    descriptionFa:
      "[PLACEHOLDER] اونیکس سبز زمرد زنده با کیفیت شفاف. به‌طور انحصاری از معادن ایران، ایده‌آل برای پانل‌های لهجهٔ لوکس.",
    finishes: ["Polished"],
    finishesFa: ["پولیش"],
    images: ["/images/banner-4.jpg"],
    thumbnail: "/images/banner-4.jpg",
    isExclusive: true,
  },

  // ── Granite ──────────────────────────────────────────────────────────
  {
    slug: "black-galaxy-granite",
    categorySlug: "granite",
    nameEn: "Black Galaxy",
    nameFa: "کهکشان مشکی",
    color: "Black/Gold",
    colorFa: "مشکی / طلایی",
    descriptionEn:
      "[PLACEHOLDER] Deep black granite with sparkling gold and silver mineral inclusions. The statement choice for executive desks, stairs, and exterior facades.",
    descriptionFa:
      "[PLACEHOLDER] گرانیت مشکی عمیق با مواد معدنی طلایی و نقره‌ای درخشان. انتخاب شاخص برای میزهای اجرایی، پله‌ها و نماهای خارجی.",
    finishes: ["Polished", "Flamed"],
    finishesFa: ["پولیش", "شعله‌ای"],
    dimensions: "Slabs: up to 300×180 cm",
    images: ["/images/banner-4.jpg"],
    thumbnail: "/images/banner-4.jpg",
  },
  {
    slug: "bianco-crystal-granite",
    categorySlug: "granite",
    nameEn: "Bianco Crystal",
    nameFa: "کریستال بیانکو",
    color: "White/Grey",
    colorFa: "سفید / خاکستری",
    descriptionEn:
      "[PLACEHOLDER] White granite with grey crystal inclusions. Superior hardness makes it ideal for kitchen countertops and high-traffic floors.",
    descriptionFa:
      "[PLACEHOLDER] گرانیت سفید با مواد معدنی کریستالی خاکستری. سختی برتر آن را ایده‌آل برای پیشخوان‌های آشپزخانه و کف‌های پرتردد می‌کند.",
    finishes: ["Polished", "Honed", "Flamed", "Bushhammered"],
    finishesFa: ["پولیش", "مات", "شعله‌ای", "بوشهمر"],
    images: ["/images/banner-5.jpg"],
    thumbnail: "/images/banner-5.jpg",
  },

  // ── Washbasins ───────────────────────────────────────────────────────
  {
    slug: "oval-travertine-basin",
    categorySlug: "washbasins",
    nameEn: "Oval Travertine Basin",
    nameFa: "روشویی بیضی تراورتن",
    color: "Beige",
    colorFa: "بژ",
    descriptionEn:
      "[PLACEHOLDER] CNC-carved oval vessel basin in Classic Beige Travertine. Custom dimensions available. Includes pre-drilled faucet hole.",
    descriptionFa:
      "[PLACEHOLDER] روشویی سینک بیضی CNC در تراورتن بژ کلاسیک. ابعاد سفارشی موجود. شامل سوراخ شیر از پیش حفاری‌شده.",
    finishes: ["Honed", "Polished"],
    finishesFa: ["مات", "پولیش"],
    dimensions: "Standard: 60×40×15 cm. Custom available.",
    images: ["/images/banner-5.jpg"],
    thumbnail: "/images/banner-5.jpg",
    isNew: true,
  },
  {
    slug: "rectangular-marble-basin",
    categorySlug: "washbasins",
    nameEn: "Rectangular Marble Basin",
    nameFa: "روشویی مستطیل مرمر",
    color: "White",
    colorFa: "سفید",
    descriptionEn:
      "[PLACEHOLDER] Sleek rectangular under-mount basin in White Crystal Marble. A minimalist statement for luxury bathrooms.",
    descriptionFa:
      "[PLACEHOLDER] روشویی مستطیل زیرسینک ظریف در مرمر کریستال سفید. یک بیانیهٔ مینیمالیستی برای حمام‌های لوکس.",
    finishes: ["Polished"],
    finishesFa: ["پولیش"],
    dimensions: "Standard: 80×45×12 cm. Custom available.",
    images: ["/images/banner-1.jpg"],
    thumbnail: "/images/banner-1.jpg",
    isExclusive: true,
  },

  // ── Accessories ──────────────────────────────────────────────────────
  {
    slug: "onyx-vase",
    categorySlug: "accessories",
    nameEn: "Onyx Vase",
    nameFa: "گلدان اونیکس",
    color: "Amber",
    colorFa: "عنبری",
    descriptionEn:
      "[PLACEHOLDER] Hand-turned honey onyx vase. Each piece is unique — natural banding ensures no two are alike. A conversation-starting décor object.",
    descriptionFa:
      "[PLACEHOLDER] گلدان اونیکس عسلی دست‌تراشیده. هر قطعه منحصربه‌فرد است — باندینگ طبیعی تضمین می‌کند دو قطعه مشابه وجود ندارد.",
    finishes: ["Polished"],
    finishesFa: ["پولیش"],
    dimensions: "H: 30 cm, Ø: 15 cm. Custom sizes available.",
    images: ["/images/banner-6.jpg"],
    thumbnail: "/images/banner-6.jpg",
    isExclusive: true,
  },
  {
    slug: "marble-tableware-set",
    categorySlug: "accessories",
    nameEn: "Marble Tableware Set",
    nameFa: "سرویس ظروف مرمر",
    color: "White/Grey",
    colorFa: "سفید / خاکستری",
    descriptionEn:
      "[PLACEHOLDER] Premium tableware collection in White Crystal Marble — serving board, coasters, and a matching mortar set. Perfect corporate gift.",
    descriptionFa:
      "[PLACEHOLDER] مجموعهٔ ظروف پریمیوم در مرمر کریستال سفید — تخته سرو، زیرلیوانی و هاون ست مچ. هدیهٔ شرکتی کامل.",
    finishes: ["Honed"],
    finishesFa: ["مات"],
    images: ["/images/bottom-banner-1.jpg"],
    thumbnail: "/images/bottom-banner-1.jpg",
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
}
