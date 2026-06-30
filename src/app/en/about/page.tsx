import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";

export const metadata: Metadata = {
  title: "About Us — Our Story Since 2010",
  description:
    "Iranian Stone Reference was founded in 2010 as a premium natural stone B2B supplier. We export to UAE, Qatar, Russia, Germany, and the United States.",
};

const timeline = [
  { year: "2010", en: "Founded in Tehran with a focus on marble and travertine export." },
  { year: "2013", en: "First export contracts with UAE and Qatar." },
  { year: "2016", en: "Expanded to onyx and granite. Opened premium showroom." },
  { year: "2019", en: "Launched CNC washbasin production line." },
  { year: "2022", en: "Entered European markets — Russia, Germany." },
  { year: "2024", en: "500+ completed projects across 5 continents." },
];

const values = [
  { en: "Premium quality natural stones" },
  { en: "Expert consultation and support" },
  { en: "Competitive pricing & reliable logistics" },
  { en: "Custom processing and CNC finishing" },
  { en: "Bilingual team — FA / EN / AR" },
  { en: "15+ years of export experience" },
];

const exportMarkets = [
  { code: "AE", label: "UAE / Dubai" },
  { code: "QA", label: "Qatar / Doha" },
  { code: "RU", label: "Russia / Moscow" },
  { code: "DE", label: "Germany / Munich" },
  { code: "US", label: "United States" },
];

export default function AboutEN() {
  return (
    <>
      <Header locale="en" />
      <main>
        {/* Hero */}
        <section className="bg-[#0c1626] pt-36 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "#A18F7A" }}>Our Story</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              A family-owned stone company founded in 2010, built on precision, craftsmanship, and global ambition.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-[#fbfaf6] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "#A18F7A" }}>Since 2010</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1d2330] mb-6 leading-tight">
                Iranian Stone Reference
              </h2>
              <p className="text-[#1d2330]/70 leading-relaxed mb-5 text-justify">
                Iranian Stone Reference was founded by the Vassigh Family in 2010, soon becoming one of the main players in the Iranian natural stone market.
              </p>
              <p className="text-[#1d2330]/70 leading-relaxed mb-5 text-justify">
                Our entrepreneurial vision and constant investment in modern equipment, marketing, research and development at every step of the process have contributed to building a role-model company that never stops challenging and reinventing itself.
              </p>
              <p className="text-[#1d2330]/70 leading-relaxed mb-5 text-justify">
                Despite its significant market share in Iran, the company also supplies its high-quality exotic stones to international markets — fulfilling its mission of bringing the diversity and unique beauty of Iranian natural stones to the world, to elevate spaces with practicality and enduring character.
              </p>
              <p className="text-[#1d2330]/70 leading-relaxed mb-5 text-justify">
                Guided by our clients, we go all the way — delivering on our mission and supporting their dreams. Always present for each one of them, with their own special needs and tastes.
              </p>
              <p className="text-[#1d2330]/70 leading-relaxed font-medium text-justify">
                Unique as their nature. Unique as our stones.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[#0c1626] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-14">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "#A18F7A" }}>Milestones</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Our Journey</h2>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "rgba(161,143,122,0.2)" }} />
              <div className="space-y-8">
                {timeline.map((t) => (
                  <div key={t.year} className="flex gap-6 items-start">
                    <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full" style={{ background: "#A18F7A" }} />
                    </div>
                    <div className="pb-2">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "#A18F7A" }}>{t.year}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{t.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#fbfaf6] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "#A18F7A" }}>Commitment</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1d2330] mb-8 leading-tight">
                  Why Choose Iranian Stone Reference?
                </h2>
                <ul className="space-y-4">
                  {values.map((v) => (
                    <li key={v.en} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#A18F7A" }} />
                      <span className="text-[#1d2330]/70">{v.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0c1626] p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6" style={{ color: "#A18F7A" }}>Export Markets</p>
                <div className="space-y-3">
                  {exportMarkets.map((m) => (
                    <div key={m.code} className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-bold border" style={{ color: "#A18F7A", borderColor: "rgba(161,143,122,0.3)" }}>
                        {m.code}
                      </span>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0c1626] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Contact our team for custom stone quotes, samples, and export consultations.
            </p>
            <Link href="/en/contact" className="collection-cta-btn">
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
