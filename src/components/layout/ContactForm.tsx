"use client";

import { useState } from "react";
import { type Language, translations } from "@/lib/translations";

interface ContactFormProps {
  locale: Language;
  prefillStone?: string;
}

export function ContactForm({ locale, prefillStone }: ContactFormProps) {
  const t = translations[locale].contact;
  const isRTL = locale === "fa";

  const [fields, setFields] = useState({
    name: "",
    company: "",
    country: "",
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
          <input
            type="text"
            required
            value={fields.country}
            onChange={set("country")}
            placeholder={isRTL ? "کشور شما" : "Your country"}
            className={inputClass}
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
