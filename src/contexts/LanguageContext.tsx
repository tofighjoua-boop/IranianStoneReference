"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const applyLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    if (lang === "fa") {
      document.documentElement.classList.add("fa");
    } else {
      document.documentElement.classList.remove("fa");
    }
    try {
      localStorage.setItem("isr-lang", lang);
    } catch {
      // ignore storage errors
    }
  }, []);

  const setLanguage = useCallback(
    (lang: Language) => {
      applyLanguage(lang);
    },
    [applyLanguage]
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("isr-lang") as Language | null;
      if (saved === "en" || saved === "fa") {
        applyLanguage(saved);
      }
    } catch {
      // ignore
    }
  }, [applyLanguage]);

  const t = translations[language];
  const isRTL = language === "fa";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}
