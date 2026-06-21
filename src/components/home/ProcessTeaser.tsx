import { type Language, translations } from "@/lib/translations";

interface ProcessTeaserProps {
  locale: Language;
}

const steps = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-10 h-10">
        <path d="M24 4 L44 36 L4 36 Z" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="36" x2="24" y2="44" strokeLinecap="round" />
      </svg>
    ),
    keyEn: "step1_title" as const,
    bodyKeyEn: "step1_body" as const,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-10 h-10">
        <rect x="4" y="12" width="40" height="26" rx="0" strokeLinecap="round" />
        <line x1="4" y1="22" x2="44" y2="22" />
        <line x1="16" y1="12" x2="16" y2="38" />
      </svg>
    ),
    keyEn: "step2_title" as const,
    bodyKeyEn: "step2_body" as const,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-10 h-10">
        <circle cx="24" cy="24" r="18" />
        <path d="M16 24 L21 29 L32 18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    keyEn: "step3_title" as const,
    bodyKeyEn: "step3_body" as const,
  },
];

export function ProcessTeaser({ locale }: ProcessTeaserProps) {
  const t = translations[locale];
  const p = t.processTeaser;
  const isRTL = locale === "fa";

  return (
    <section className="bg-[#fbfaf6] py-20 lg:py-28" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
            {isRTL ? "فرآیند تولید" : "Production"}
          </p>
          <h2
            className={[
              "text-3xl sm:text-4xl font-bold text-[#1d2330] mb-4",
              isRTL ? "" : "font-display",
            ].join(" ")}
          >
            {p.heading}
          </h2>
          <p className="text-[#1d2330]/60 text-base max-w-xl mx-auto leading-relaxed">
            {p.subheading}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-14">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              {/* Icon */}
              <div className="text-[#c6a25f] mb-5 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Step number */}
              <p className="text-[#c6a25f]/40 text-xs uppercase tracking-[0.3em] font-bold mb-3">
                {isRTL ? `گام ${["۱", "۲", "۳"][i]}` : `Step 0${i + 1}`}
              </p>

              <h3 className="text-[#1d2330] font-bold text-lg mb-3">
                {p[step.keyEn]}
              </h3>
              <p className="text-[#1d2330]/60 text-sm leading-relaxed max-w-xs">
                {p[step.bodyKeyEn]}
              </p>

              {/* Connector (not on last) */}
              {i < 2 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 text-[#1d2330] text-xs uppercase tracking-[0.2em] font-bold border-b border-[#c6a25f] pb-0.5 hover:text-[#c6a25f] transition-colors"
          >
            {p.cta}
            <span>{isRTL ? "←" : "→"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
