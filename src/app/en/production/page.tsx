import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { productionSteps } from "@/data/production";
import { WorkshopGallery } from "@/components/production/WorkshopGallery";

export const metadata: Metadata = {
  title: "Production Process — From Quarry to Export",
  description: "Discover how Iranian Stone Reference transforms raw stone blocks from Iran's finest quarries into precision-finished natural stone products for global export.",
};

export default function ProductionEN() {
  return (
    <>
      <Header locale="en" />
      <main>
        {/* Hero */}
        <section style={{ position: "relative", backgroundColor: "#0c1626", paddingTop: "140px", paddingBottom: "80px", overflow: "hidden" }}>
          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px,5vw,80px)", textAlign: "center" }}>
            <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "16px" }}>
              ISR — Process
            </p>
            <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 300, color: "#fff", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "20px" }}>
              Production Process
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto", fontFamily: "Lato, sans-serif", lineHeight: 1.8 }}>
              Eight precision steps — from geological exploration in Iran&apos;s mountain quarries to international export — ensuring every ISR stone meets the highest global standards.
            </p>
          </div>
        </section>

        {/* Steps */}
        {productionSteps.map((step, i) => {
          const isDark = i % 2 === 1;
          const imageLeft = i % 2 === 0;
          return (
            <section
              key={step.step}
              style={{ backgroundColor: isDark ? "#0c1626" : "#fbfaf6", padding: "0" }}
            >
              <div
                style={{
                  maxWidth: "1280px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  minHeight: "520px",
                }}
                className="production-grid"
              >
                {/* Image */}
                <div style={{ order: imageLeft ? 0 : 1, position: "relative", minHeight: "400px" }}>
                  <Image
                    src={step.image}
                    alt={step.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    width: "52px",
                    height: "52px",
                    border: "1px solid rgba(161,143,122,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontFamily: "Lato, sans-serif",
                    letterSpacing: "1px",
                    color: "#A18F7A",
                    background: "rgba(0,0,0,0.4)",
                  }}>
                    {String(step.step).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    order: imageLeft ? 1 : 0,
                    padding: "clamp(40px,6vw,80px) clamp(28px,5vw,72px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "12px" }}>
                    Step {String(step.step).padStart(2, "0")}
                  </p>
                  <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 300, color: isDark ? "#fff" : "#1d2330", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "20px", lineHeight: 1.3 }}>
                    {step.titleEn}
                  </h2>
                  <p style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,0.6)" : "rgba(29,35,48,0.65)", lineHeight: 1.85, fontFamily: "Lato, sans-serif", marginBottom: "28px" }}>
                    {step.descriptionEn}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {step.detailsEn.map((d) => (
                      <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#A18F7A", flexShrink: 0, marginTop: "6px" }} />
                        <span style={{ fontSize: "13px", color: isDark ? "rgba(255,255,255,0.55)" : "rgba(29,35,48,0.6)", fontFamily: "Lato, sans-serif" }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}

        {/* Workshop Gallery */}
        <section style={{ backgroundColor: "#fbfaf6", padding: "96px 0 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px,5vw,80px)" }}>
            <WorkshopGallery locale="en" />
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#0c1626", padding: "80px 0", textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "16px" }}>
            Start a Project
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 300, color: "#fff", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "20px" }}>
            Ready to Work with ISR?
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 36px", fontFamily: "Lato, sans-serif", lineHeight: 1.7 }}>
            Contact our team for custom stone specifications, samples, and production schedules.
          </p>
          <Link href="/en/contact" className="collection-cta-btn">
            Contact Us
          </Link>
        </section>
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
