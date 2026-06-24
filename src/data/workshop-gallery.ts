/**
 * WORKSHOP GALLERY
 * ──────────────────────────────────────────────────────────────
 * برای اضافه کردن عکس جدید، یک شی جدید به آرایه اضافه کنید:
 * To add a new photo, append a new object to the array below:
 *
 * {
 *   id: "unique-id",
 *   image: "/images/your-photo.jpg",   ← put the file in public/images/
 *   captionEn: "Short English description",
 *   captionFa: "توضیح فارسی کوتاه",
 *   tagEn: "Cutting",       ← optional category tag
 *   tagFa: "برش",
 * }
 * ──────────────────────────────────────────────────────────────
 */

export interface WorkshopItem {
  id: string;
  image: string;
  captionEn: string;
  captionFa: string;
  tagEn?: string;
  tagFa?: string;
}

export const workshopGallery: WorkshopItem[] = [
  {
    id: "wg-01",
    image: "/images/banner-new-2.png",
    captionEn: "Gang saw cutting line — multi-blade system processing marble blocks into precision slabs.",
    captionFa: "خط برش گنگ — سیستم چندتیغه در حال تبدیل بلوک‌های مرمر به دال‌های دقیق.",
    tagEn: "Cutting",
    tagFa: "برش",
  },
  {
    id: "wg-02",
    image: "/images/banner-new-1.png",
    captionEn: "Finished marble kitchen island and luxury onyx installation — showcasing ISR export-grade output.",
    captionFa: "جزیره آشپزخانه مرمر و نصب اونیکس لوکس — نمایش محصول صادراتی ISR.",
    tagEn: "Finished Product",
    tagFa: "محصول نهایی",
  },
  {
    id: "wg-03",
    image: "/images/collection-exclusive.jpg",
    captionEn: "Premium green marble slabs after polishing — ready for quality grading.",
    captionFa: "دال‌های مرمر سبز پریمیوم پس از پولیش — آماده درجه‌بندی کیفی.",
    tagEn: "Polishing",
    tagFa: "پولیش",
  },
  {
    id: "wg-04",
    image: "/images/banner-new-3.png",
    captionEn: "Quarry extraction site — diamond wire saw operation in the mountains of central Iran.",
    captionFa: "محل استخراج معدن — عملیات اره سیم الماسی در کوه‌های مرکز ایران.",
    tagEn: "Quarrying",
    tagFa: "استخراج",
  },
  {
    id: "wg-05",
    image: "/images/collection-tech.jpg",
    captionEn: "CNC precision routing — custom washbasin carving from a single block of travertine.",
    captionFa: "روتر دقیق CNC — تراشکاری روشویی سفارشی از یک بلوک تراورتن.",
    tagEn: "CNC Processing",
    tagFa: "فرآوری CNC",
  },
  {
    id: "wg-06",
    image: "/images/bottom-banner-1.jpg",
    captionEn: "ISR showroom corridor — finished travertine floor and wall cladding on display.",
    captionFa: "راهروی نمایشگاه ISR — کف و روکش دیوار تراورتن تمام‌شده در نمایش.",
    tagEn: "Showroom",
    tagFa: "نمایشگاه",
  },
  {
    id: "wg-07",
    image: "/images/collection-tableware.jpg",
    captionEn: "Hand-finished stone accessories and decorative objects from ISR's artisan workshop.",
    captionFa: "اکسسوری سنگی دست‌ساز و اشیاء تزئینی از کارگاه هنری ISR.",
    tagEn: "Accessories",
    tagFa: "اکسسوری",
  },
  {
    id: "wg-08",
    image: "/images/banner-1.jpg",
    captionEn: "Export-ready slabs stacked and documented before wooden crate packaging.",
    captionFa: "دال‌های آماده صادرات — چیده‌شده و مستندشده قبل از بسته‌بندی در صندوق چوبی.",
    tagEn: "Export",
    tagFa: "صادرات",
  },
];
