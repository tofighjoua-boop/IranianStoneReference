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
    <section className="bg-[#0c1626] py-20 lg:py-28" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* CTA */}
          <div className="flex flex-col justify-center">
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              {isRTL ? "ارتباط" : "Get in Touch"}
            </p>
            <h2
              className={[
                "text-3xl sm:text-4xl font-bold text-[#f4f1ea] mb-4 leading-tight",
                isRTL ? "" : "font-display",
              ].join(" ")}
            >
              {c.heading}
            </h2>
            <p className="text-[#f4f1ea]/60 text-base leading-relaxed mb-8">
              {c.body}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#c6a25f] text-[#0c1626] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors self-start"
            >
              {c.cta}
            </Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-center">
            <div className="h-px bg-[#c6a25f]/20 mb-8 lg:hidden" />
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              {n.heading}
            </p>
            <p className="text-[#f4f1ea]/60 text-sm mb-6 leading-relaxed">
              {n.body}
            </p>

            {submitted ? (
              <p className="text-[#c6a25f] text-sm font-semibold">{n.success}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={n.placeholder}
                  required
                  dir={isRTL ? "rtl" : "ltr"}
                  className="flex-1 px-4 py-3 bg-white/5 border border-[#c6a25f]/30 text-[#f4f1ea] text-sm placeholder:text-[#f4f1ea]/30 focus:outline-none focus:border-[#c6a25f] transition-colors min-w-0"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#c6a25f] text-[#0c1626] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#d8bd86] transition-colors flex-shrink-0"
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
