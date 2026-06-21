"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  t: Translations;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  /** Pass the locale detected from the URL path in the locale layout */
  initialLang?: Language;
  /** Optional: callback to navigate to the other locale's equivalent URL */
  onToggle?: () => void;
}

export function LanguageProvider({
  children,
  initialLang = "en",
  onToggle,
}: LanguageProviderProps) {
  const language: Language = initialLang;
  const isRTL = language === "fa";
  const t = translations[language];

  const setLanguage = useCallback((_lang: Language) => {
    // In URL-based routing, language is controlled by the URL.
    // Clients should navigate to the other locale URL instead.
    if (onToggle) onToggle();
  }, [onToggle]);

  const toggleLanguage = useCallback(() => {
    if (onToggle) onToggle();
  }, [onToggle]);

  return (
    <LanguageContext.Provider value={{ language, t, isRTL, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}
