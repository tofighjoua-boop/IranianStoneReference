"use client";

import { useState } from "react";
import { type Language, translations } from "@/lib/translations";

interface ContactFormProps {
  locale: Language;
  prefillStone?: string;
}

const COUNTRIES: { en: string; fa: string }[] = [
  { en: "Iran", fa: "ایران" },
  { en: "United Arab Emirates", fa: "امارات متحده عربی" },
  { en: "Saudi Arabia", fa: "عربستان سعودی" },
  { en: "Qatar", fa: "قطر" },
  { en: "Kuwait", fa: "کویت" },
  { en: "Bahrain", fa: "بحرین" },
  { en: "Oman", fa: "عمان" },
  { en: "Iraq", fa: "عراق" },
  { en: "Turkey", fa: "ترکیه" },
  { en: "Russia", fa: "روسیه" },
  { en: "Germany", fa: "آلمان" },
  { en: "France", fa: "فرانسه" },
  { en: "Italy", fa: "ایتالیا" },
  { en: "Spain", fa: "اسپانیا" },
  { en: "United Kingdom", fa: "انگلستان" },
  { en: "Netherlands", fa: "هلند" },
  { en: "Belgium", fa: "بلژیک" },
  { en: "Switzerland", fa: "سوئیس" },
  { en: "Austria", fa: "اتریش" },
  { en: "Sweden", fa: "سوئد" },
  { en: "Norway", fa: "نروژ" },
  { en: "Denmark", fa: "دانمارک" },
  { en: "Finland", fa: "فنلاند" },
  { en: "Poland", fa: "لهستان" },
  { en: "Czech Republic", fa: "جمهوری چک" },
  { en: "Greece", fa: "یونان" },
  { en: "Ukraine", fa: "اوکراین" },
  { en: "United States", fa: "ایالات متحده آمریکا" },
  { en: "Canada", fa: "کانادا" },
  { en: "Australia", fa: "استرالیا" },
  { en: "New Zealand", fa: "نیوزیلند" },
  { en: "China", fa: "چین" },
  { en: "Japan", fa: "ژاپن" },
  { en: "South Korea", fa: "کره جنوبی" },
  { en: "India", fa: "هند" },
  { en: "Pakistan", fa: "پاکستان" },
  { en: "Afghanistan", fa: "افغانستان" },
  { en: "Azerbaijan", fa: "آذربایجان" },
  { en: "Armenia", fa: "ارمنستان" },
  { en: "Georgia", fa: "گرجستان" },
  { en: "Kazakhstan", fa: "قزاقستان" },
  { en: "Turkmenistan", fa: "ترکمنستان" },
  { en: "Uzbekistan", fa: "ازبکستان" },
  { en: "Tajikistan", fa: "تاجیکستان" },
  { en: "Egypt", fa: "مصر" },
  { en: "Jordan", fa: "اردن" },
  { en: "Lebanon", fa: "لبنان" },
  { en: "Syria", fa: "سوریه" },
  { en: "Algeria", fa: "الجزایر" },
  { en: "Morocco", fa: "مراکش" },
  { en: "Nigeria", fa: "نیجریه" },
  { en: "South Africa", fa: "آفریقای جنوبی" },
  { en: "Brazil", fa: "برزیل" },
  { en: "Argentina", fa: "آرژانتین" },
  { en: "Mexico", fa: "مکزیک" },
  { en: "Malaysia", fa: "مالزی" },
  { en: "Singapore", fa: "سنگاپور" },
  { en: "Thailand", fa: "تایلند" },
  { en: "Indonesia", fa: "اندونزی" },
  { en: "Vietnam", fa: "ویتنام" },
  { en: "Other", fa: "سایر" },
];

export function ContactForm({ locale, prefillStone }: ContactFormProps) {
  const t = translations[locale].contact;
  const isRTL = locale === "fa";

  const [fields, setFields] = useState({
    name: "",
    company: "",
    country: "",
    phone: "",
    email: "",
    stone: prefillStone ?? "",
    projectType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, locale }),
      });
      if (!res.ok) throw new Error("Server error");
      setSuccess(true);
    } catch {
      setError(isRTL ? "خطایی رخ داد. لطفاً دوباره تلاش کنید." : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="py-12 text-center">
        <div className="w-12 h-12 bg-[#c6a25f] flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[#1d2330] font-semibold text-lg mb-2">{t.success}</p>
        <p className="text-[#1d2330]/50 text-sm">
          {isRTL ? "ظرف ۲۴ ساعت با شما تماس می‌گیریم." : "We will contact you within 24 hours."}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-[#e5e0d8] bg-white text-[#1d2330] text-sm placeholder:text-[#1d2330]/30 focus:outline-none focus:border-[#c6a25f] transition-colors";

  return (
    <form onSubmit={handleSubmit} dir={isRTL ? "rtl" : "ltr"} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
            {t.fieldName} *
          </label>
          <input
            type="text"
            required
            value={fields.name}
            onChange={set("name")}
            placeholder={isRTL ? "نام شما" : "Your full name"}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
            {t.fieldCompany}
          </label>
          <input
            type="text"
            value={fields.company}
            onChange={set("company")}
            placeholder={isRTL ? "نام شرکت / استودیو" : "Company or Studio name"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
            {t.fieldCountry} *
          </label>
          <select required value={fields.country} onChange={set("country")} className={inputClass}>
            <option value="">{isRTL ? "کشور خود را انتخاب کنید..." : "Select your country..."}</option>
            {[...COUNTRIES]
              .sort((a, b) => isRTL
                ? a.fa.localeCompare(b.fa, "fa")
                : a.en.localeCompare(b.en, "en")
              )
              .map((c) => (
                <option key={c.en} value={isRTL ? c.fa : c.en}>
                  {isRTL ? c.fa : c.en}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
            {t.fieldPhone} *
          </label>
          <input
            type="tel"
            required
            value={fields.phone}
            onChange={set("phone")}
            placeholder={isRTL ? "مثال: +989121234567" : "e.g. +989121234567"}
            className={inputClass}
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
            {t.fieldEmail}
          </label>
          <input
            type="email"
            value={fields.email}
            onChange={set("email")}
            placeholder={isRTL ? "ایمیل شما" : "Your email address"}
            className={inputClass}
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
            {t.fieldStone}
          </label>
          <select value={fields.stone} onChange={set("stone")} className={inputClass}>
            <option value="">{isRTL ? "انتخاب کنید..." : "Select..."}</option>
            {t.stoneOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
          {t.fieldProjectType}
        </label>
        <select value={fields.projectType} onChange={set("projectType")} className={inputClass}>
          <option value="">{isRTL ? "انتخاب کنید..." : "Select..."}</option>
          {t.projectOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1d2330]/50 font-bold mb-1.5">
          {t.fieldMessage} *
        </label>
        <textarea
          required
          rows={5}
          value={fields.message}
          onChange={set("message")}
          placeholder={t.fieldMessagePlaceholder}
          className={inputClass + " resize-none"}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-[#0c1626] text-[#f4f1ea] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#c6a25f] hover:text-[#0c1626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting
          ? isRTL ? "در حال ارسال..." : "Sending..."
          : t.submit}
      </button>
    </form>
  );
}
