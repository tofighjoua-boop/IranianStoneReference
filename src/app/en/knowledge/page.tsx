import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { KnowledgeClient } from "@/components/knowledge/KnowledgeClient";

export const metadata: Metadata = {
  title: "Stone Knowledge — Expert Guides & Articles",
  description: "Expert guides on natural stone — marble, travertine, onyx, granite, care & maintenance, and the Iranian stone industry.",
};

export default function KnowledgeEN() {
  return (
    <>
      <Header locale="en" />
      <main>
        <section className="bg-[#0c1626] pt-36 pb-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url('/images/banner-1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p style={{ fontSize: "10px", color: "#A18F7A", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "16px" }}>
              ISR Knowledge Base
            </p>
            <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 300, color: "#fff", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "Lato, sans-serif", marginBottom: "16px" }}>
              Stone Knowledge
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "560px", margin: "0 auto", fontFamily: "Lato, sans-serif", lineHeight: 1.7 }}>
              Expert guides on natural stone selection, care, finishes, and the Iranian stone industry — written for architects, designers, and discerning clients.
            </p>
          </div>
        </section>

        <KnowledgeClient locale="en" />
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
