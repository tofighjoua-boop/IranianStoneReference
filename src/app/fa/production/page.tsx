import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { productionSteps } from "@/data/production";
import { WorkshopGallery } from "@/components/production/WorkshopGallery";

export const metadata: Metadata = {
  title: "مراحل تولید — از معدن تا صادرات",
  description: "بیاموزید چگونه مرجع سنگ ایرانیان بلوک‌های سنگ خام از معادن برتر ایران را به محصولات سنگ طبیعی با پرداخت دقیق برای صادرات جهانی تبدیل می‌کند.",
};

export default function ProductionFA() {
  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Hero */}
        <section style={{ position: "relative", backgroundColor: "#0c1626", paddingTop: "140px", paddingBottom: "80px", overflow: "hidden" }}>
          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px,5vw,80px)", textAlign: "center" }}>
            <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "2px", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "16px" }}>
              ISR — فرآیند
            </p>
            <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, color: "#fff", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "20px" }}>
              مراحل تولید
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto", fontFamily: "Vazirmatn, Tahoma, sans-serif", lineHeight: 2 }}>
              هشت مرحله دقیق — از اکتشاف زمین‌شناختی در معادن کوهستانی ایران تا صادرات بین‌المللی — تضمین می‌کند که هر سنگ ISR بالاترین استانداردهای جهانی را برآورده کند.
            </p>
          </div>
        </section>

        {/* Steps */}
        {productionSteps.map((step, i) => {
          const isDark = i % 2 === 1;
          const imageLeft = i % 2 === 1;
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
                    src={step.imageFa}
                    alt={step.titleFa}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "contain" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
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
                  <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "2px", fontFamily: "Lato, sans-serif", marginBottom: "12px" }}>
                    مرحله {step.step}
                  </p>
                  <h2 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 400, color: isDark ? "#fff" : "#1d2330", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "20px", lineHeight: 1.4 }}>
                    {step.titleFa}
                  </h2>
                  <p style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,0.6)" : "rgba(29,35,48,0.65)", lineHeight: 2, fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "28px" }}>
                    {step.descriptionFa}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {step.detailsFa.map((d) => (
                      <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#A18F7A", flexShrink: 0, marginTop: "8px" }} />
                        <span style={{ fontSize: "13px", color: isDark ? "rgba(255,255,255,0.55)" : "rgba(29,35,48,0.6)", fontFamily: "Vazirmatn, Tahoma, sans-serif" }}>{d}</span>
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
            <WorkshopGallery locale="fa" />
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#0c1626", padding: "80px 0", textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "2px", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "16px" }}>
            شروع پروژه
          </p>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 300, color: "#fff", fontFamily: "Vazirmatn, Tahoma, sans-serif", marginBottom: "20px" }}>
            آماده همکاری با ISR هستید؟
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 36px", fontFamily: "Vazirmatn, Tahoma, sans-serif", lineHeight: 2 }}>
            با تیم ما برای مشخصات سنگ سفارشی، نمونه‌ها و برنامه تولید تماس بگیرید.
          </p>
          <Link href="/fa/contact" className="collection-cta-btn">
            تماس با ما
          </Link>
        </section>
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
