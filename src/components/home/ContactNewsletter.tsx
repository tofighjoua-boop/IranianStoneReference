"use client";

import { useState } from "react";
import Link from "next/link";
import { type Language, translations } from "@/lib/translations";

interface ContactNewsletterProps {
  locale: Language;
}

export function ContactNewsletter({ locale }: ContactNewsletterProps) {
  const t = translations[locale];
  const n = t.newsletter;
  const c = t.ctaBar;
  const isRTL = locale === "fa";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section style={{ backgroundColor: "#0c1626", padding: "80px 0" }} dir={isRTL ? "rtl" : "ltr"}>
      <div style={{ maxWidth: "1640px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 140px)" }}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* CTA */}
          <div className="flex flex-col justify-center">
            <p style={{ color: "#A18F7A", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, marginBottom: "16px" }}>
              {isRTL ? "ارتباط" : "Get in Touch"}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "16px",
                lineHeight: 1.2,
                fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "'Playfair Display', Georgia, serif",
              }}
            >
              {c.heading}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
              {c.body}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="collection-cta-btn"
              style={{ alignSelf: "flex-start", fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif" }}
            >
              {c.cta}
            </Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-center">
            <div style={{ height: "1px", background: "rgba(161,143,122,0.2)", marginBottom: "32px" }} className="lg:hidden" />
            <p style={{ color: "#A18F7A", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, marginBottom: "16px" }}>
              {n.heading}
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
              {n.body}
            </p>

            {submitted ? (
              <p style={{ color: "#A18F7A", fontSize: "14px", fontWeight: 600 }}>{n.success}</p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={n.placeholder}
                  required
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(161,143,122,0.3)",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    minWidth: 0,
                    fontFamily: isRTL ? "Vazirmatn, Tahoma, sans-serif" : "Lato, sans-serif",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    background: "#A18F7A",
                    color: "#ffffff",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  {n.cta}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
