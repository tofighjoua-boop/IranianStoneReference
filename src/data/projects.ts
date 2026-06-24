export interface Project {
  slug: string;
  titleEn: string;
  titleFa: string;
  descriptionEn: string;
  descriptionFa: string;
  location: string;
  locationFa: string;
  applicationEn: string;
  applicationFa: string;
  stonesUsed: string[];
  image: string;
  images: string[];
  year: string;
  isFeatured?: boolean;
}

/** [PLACEHOLDER] — replace with real project case studies */
export const projects: Project[] = [
  {
    slug: "grand-lobby-dubai",
    titleEn: "Grand Hotel Lobby — Dubai",
    titleFa: "لابی هتل گرند — دبی",
    descriptionEn:
      "[PLACEHOLDER] 2,000 m² of White Crystal Marble and Honey Onyx installed across the lobby, reception, and corridor of a 5-star hotel in Downtown Dubai.",
    descriptionFa:
      "[PLACEHOLDER] ۲٬۰۰۰ متر مربع مرمریت کریستال سفید و اونیکس عسلی در لابی، پذیرش و راهرو یک هتل ۵ ستاره در داون‌تاون دبی نصب شد.",
    location: "Dubai, UAE",
    locationFa: "دبی، امارات",
    applicationEn: "Hospitality — Lobby & Reception",
    applicationFa: "هتل‌داری — لابی و پذیرش",
    stonesUsed: ["white-crystal-marble", "honey-onyx"],
    image: "/images/collection-exclusive.jpg",
    images: ["/images/collection-exclusive.jpg", "/images/banner-1.jpg"],
    year: "2023",
    isFeatured: true,
  },
  {
    slug: "villa-facade-qatar",
    titleEn: "Private Villa Facade — Doha",
    titleFa: "نمای ویلای خصوصی — دوحه",
    descriptionEn:
      "[PLACEHOLDER] External facade cladding in Classic Beige Travertine for a luxury private residence in the Pearl, Doha. 800 m² of honed tiles.",
    descriptionFa:
      "[PLACEHOLDER] روکش نمای خارجی با تراورتن بژ کلاسیک برای یک اقامتگاه خصوصی لوکس در Pearl، دوحه. ۸۰۰ متر مربع کاشی مات.",
    location: "Doha, Qatar",
    locationFa: "دوحه، قطر",
    applicationEn: "Residential — Exterior Facade",
    applicationFa: "مسکونی — نمای خارجی",
    stonesUsed: ["classic-beige-travertine"],
    image: "/images/bottom-banner-1.jpg",
    images: ["/images/bottom-banner-1.jpg", "/images/banner-2.jpg"],
    year: "2023",
  },
  {
    slug: "restaurant-moscow",
    titleEn: "Fine Dining Restaurant — Moscow",
    titleFa: "رستوران گران‌قیمت — مسکو",
    descriptionEn:
      "[PLACEHOLDER] Bar counter and feature walls in Green Onyx with backlit panels creating an otherworldly dining atmosphere. 120 m².",
    descriptionFa:
      "[PLACEHOLDER] پیشخوان بار و دیوارهای ویژه در اونیکس سبز با پانل‌های نورپشتی که فضایی دیگرگونه برای صرف غذا ایجاد می‌کند. ۱۲۰ متر مربع.",
    location: "Moscow, Russia",
    locationFa: "مسکو، روسیه",
    applicationEn: "Hospitality — Restaurant",
    applicationFa: "هتل‌داری — رستوران",
    stonesUsed: ["green-onyx"],
    image: "/images/banner-1.jpg",
    images: ["/images/banner-1.jpg", "/images/collection-exclusive.jpg"],
    year: "2022",
  },
  {
    slug: "spa-germany",
    titleEn: "Luxury Spa — Munich",
    titleFa: "اسپای لوکس — مونیخ",
    descriptionEn:
      "[PLACEHOLDER] Oval travertine basins, polished marble floors, and stone accessories throughout a private luxury spa in Munich.",
    descriptionFa:
      "[PLACEHOLDER] روشویی‌های بیضی تراورتن، کف‌های مرمریت پولیش و اکسسوری سنگی در سراسر یک اسپای خصوصی لوکس در مونیخ.",
    location: "Munich, Germany",
    locationFa: "مونیخ، آلمان",
    applicationEn: "Wellness — Spa & Pool",
    applicationFa: "سلامت — اسپا و استخر",
    stonesUsed: ["oval-travertine-basin", "white-crystal-marble"],
    image: "/images/banner-2.jpg",
    images: ["/images/banner-2.jpg", "/images/collection-tech.jpg"],
    year: "2022",
  },
];

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.isFeatured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
