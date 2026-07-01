export interface Catalog {
  slug: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  pdfUrl: string;
}

export const catalogs: Catalog[] = [
  {
    slug: "iranian-stone-reference",
    titleFa: "کاتالوگ مرجع سنگ ایرانیان",
    titleEn: "Iranian Stone Reference Catalog",
    descriptionFa: "معرفی شرکت، انواع سنگ‌های ساختمانی و مجموعه‌ی کامل محصولات مرمریت.",
    descriptionEn: "Company profile, building stone types, and the full marble product range.",
    pdfUrl: "/catalogs/iranian-stone-reference.pdf",
  },
  {
    slug: "washbasin",
    titleFa: "کاتالوگ روشویی سنگی",
    titleEn: "Natural Stone Washbasins Catalog",
    descriptionFa: "مجموعه‌ی روشویی‌های سنگ طبیعی — از سنگ خام تا هنر کاربردی.",
    descriptionEn: "Natural stone washbasins — from raw stone to functional art.",
    pdfUrl: "/catalogs/washbasin.pdf",
  },
];

export function getCatalogBySlug(slug: string): Catalog | undefined {
  return catalogs.find((c) => c.slug === slug);
}
