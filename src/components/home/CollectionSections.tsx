import Link from "next/link";
import { type Language } from "@/lib/translations";

interface Section {
  bg: string;
  label: { en: string; fa: string };
  title: { en: string; fa: string };
  body: { en: string; fa: string };
  cta: { en: string; fa: string };
  href: string;
  disabled?: boolean;
}

const SECTIONS: Section[] = [
  {
    bg: "/images/collection-exclusive.jpg",
    label: { en: "ISR®", fa: "مرجع سنگ ایرانیان®" },
    title: { en: "EXCLUSIVE MARBLE", fa: "مرمر ویژه" },
    body: {
      en: "Exclusivity through tradition and expertise. ISR is curator to Iran's most desired and recognisable natural stone masterpieces.",
      fa: "انحصار از طریق سنت و تخصص. مرجع سنگ ایرانیان، گردآورنده‌ی شاهکارهای سنگ طبیعی ایران است.",
    },
    cta: { en: "DISCOVER THIS MATERIAL", fa: "کشف این ماده" },
    href: "/gallery/marble",
  },
  {
    bg: "/images/banner-2.jpg",
    label: { en: "ISR®", fa: "مرجع سنگ ایرانیان®" },
    title: { en: "TRAVERTINE", fa: "تراورتن" },
    body: {
      en: "Classic and exclusive travertine from Iran's most prestigious quarries — for timeless interiors and facades.",
      fa: "تراورتن کلاسیک و اکسکلوسیو از معتبرترین معادن ایران — برای فضاهای داخلی و نماهای ماندگار.",
    },
    cta: { en: "DISCOVER", fa: "کشف کنید" },
    href: "/gallery/travertine",
  },
  {
    bg: "/images/collection-tableware.jpg",
    label: { en: "ISR®", fa: "مرجع سنگ ایرانیان®" },
    title: { en: "ONYX & GRANITE", fa: "اونیکس و گرانیت" },
    body: {
      en: "Rare and precious onyx for extraordinary spaces. Premium granites for high-performance facades and surfaces.",
      fa: "اونیکس نادر و قیمتی برای فضاهای استثنایی. گرانیت پریمیوم برای نماها و سطوح با عملکرد بالا.",
    },
    cta: { en: "DISCOVER", fa: "کشف کنید" },
    href: "/gallery/onyx",
  },
  {
    bg: "/images/collection-tech.jpg",
    label: { en: "ISR® INNOVATION", fa: "نوآوری مرجع سنگ" },
    title: { en: "AI STONE ADVISOR", fa: "مشاور سنگ هوشمند" },
    body: {
      en: "Describe your project and our AI will recommend the perfect stone. Intelligent matching for architects and designers — coming soon.",
      fa: "پروژه‌ی خود را توصیف کنید و هوش مصنوعی ما بهترین سنگ را پیشنهاد می‌دهد. تطبیق هوشمند برای معماران و طراحان — به‌زودی.",
    },
    cta: { en: "COMING SOON", fa: "به‌زودی" },
    href: "#",
    disabled: true,
  },
];

export function CollectionSections({ locale }: { locale: Language }) {
  const isRTL = locale === "fa";

  return (
    <div>
      {SECTIONS.map((section, i) => (
        <div
          key={i}
          style={{ position: "relative", width: "100%", height: "600px", overflow: "hidden" }}
        >
          {/* Slow-zoom background */}
          <div
            className="collection-banner-img"
            style={{
              position: "absolute",
              inset: "-30px",
              backgroundImage: `url(${section.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
          />

          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)" }} />

          {/* Content */}
          <div
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#A18F7A",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 400,
                margin: 0,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {section.label[locale]}
            </p>

            <h2
              style={{
                fontSize: isRTL ? "24px" : "28px",
                color: "#A18F7A",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 400,
                margin: 0,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {section.title[locale]}
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "rgba(161,143,122,0.85)",
                maxWidth: "520px",
                lineHeight: 1.7,
                margin: 0,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
              }}
            >
              {section.body[locale]}
            </p>

            {section.disabled ? (
              <span className="collection-cta-btn collection-cta-disabled">
                {section.cta[locale]}
              </span>
            ) : (
              <Link href={`/${locale}${section.href}`} className="collection-cta-btn">
                {section.cta[locale]}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
