import Image from "next/image";
import Link from "next/link";
import { type Language, translations } from "@/lib/translations";
import { getFeaturedProject } from "@/data/projects";

interface FeaturedProjectProps {
  locale: Language;
}

export function FeaturedProject({ locale }: FeaturedProjectProps) {
  const t = translations[locale];
  const project = getFeaturedProject();
  const isRTL = locale === "fa";

  if (!project) return null;

  return (
    <section className="bg-[#0c1626]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-2 min-h-[520px]">
        {/* Image */}
        <div className="relative min-h-[320px] lg:min-h-0">
          <Image
            src={project.image}
            alt={locale === "fa" ? project.titleFa : project.titleEn}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#0c1626]/20" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
          <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
            {t.featuredProject.label}
          </p>
          <h2
            className={[
              "text-3xl sm:text-4xl font-bold text-[#f4f1ea] mb-4 leading-tight",
              isRTL ? "" : "font-display",
            ].join(" ")}
          >
            {locale === "fa" ? project.titleFa : project.titleEn}
          </h2>
          <p className="text-[#f4f1ea]/60 text-sm mb-2">
            {locale === "fa" ? project.locationFa : project.location}
          </p>
          <p className="text-[#f4f1ea]/60 text-sm mb-8">
            {locale === "fa" ? project.applicationFa : project.applicationEn}
          </p>

          {/* Stones used */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.stonesUsed.map((stone) => (
              <span
                key={stone}
                className="text-[10px] uppercase tracking-[0.15em] text-[#c6a25f] border border-[#c6a25f]/30 px-3 py-1"
              >
                {stone.replace(/-/g, " ")}
              </span>
            ))}
          </div>

          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 text-[#c6a25f] text-xs uppercase tracking-[0.2em] font-bold hover:text-[#d8bd86] transition-colors group"
          >
            {locale === "fa" ? "پروژهٔ مشابه می‌خواهید؟ تماس بگیرید" : "Similar Project? Get in Touch"}
            <span className="group-hover:translate-x-1 transition-transform">
              {isRTL ? "←" : "→"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
