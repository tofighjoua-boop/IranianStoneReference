"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function NewsletterSection() {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const fontFamily = isRTL
    ? "var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif"
    : "Lato, sans-serif";

  return (
    <section
      style={{
        backgroundColor: "#F0F0F0",
        padding: "80px 40px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#777373",
            letterSpacing: isRTL ? "1px" : "3px",
            textTransform: isRTL ? "none" : "uppercase",
            margin: 0,
            fontFamily,
          }}
        >
          {t.newsletter.heading}
        </p>
        <h2
          style={{
            fontSize: "22px",
            color: "#A18F7A",
            letterSpacing: isRTL ? "1px" : "4px",
            textTransform: isRTL ? "none" : "uppercase",
            fontWeight: 300,
            margin: 0,
            fontFamily,
          }}
        >
          {t.newsletter.title}
        </h2>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.emailPlaceholder}
              required
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid #A18F7A",
                padding: "12px 0",
                fontSize: "14px",
                color: "#A18F7A",
                background: "transparent",
                outline: "none",
                letterSpacing: isRTL ? "0px" : "2px",
                textTransform: isRTL ? "none" : "uppercase",
                fontFamily,
                textAlign: isRTL ? "right" : "left",
              }}
            />
            <p
              style={{
                fontSize: "11px",
                color: "#777373",
                lineHeight: "1.6",
                margin: 0,
                fontFamily,
              }}
            >
              {t.newsletter.privacyText}
            </p>
            <button
              type="submit"
              style={{
                backgroundColor: "#A18F7A",
                color: "white",
                border: "none",
                padding: "14px 40px",
                fontSize: "13px",
                letterSpacing: isRTL ? "0px" : "3px",
                textTransform: isRTL ? "none" : "uppercase",
                cursor: "pointer",
                fontFamily,
                fontWeight: 400,
              }}
            >
              {t.newsletter.subscribe}
            </button>
          </form>
        ) : (
          <p
            style={{
              fontSize: "16px",
              color: "#A18F7A",
              fontFamily,
            }}
          >
            {t.newsletter.thankYou}
          </p>
        )}
      </div>
    </section>
  );
}
