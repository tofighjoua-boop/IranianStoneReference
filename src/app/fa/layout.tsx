import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: {
    template: "%s | مرجع سنگ ایرانیان",
    default: "مرجع سنگ ایرانیان | سنگ طبیعی پریمیوم",
  },
  description:
    "تأمین‌کنندهٔ سنگ طبیعی پریمیوم — مرمریت، تراورتن، اونیکس، گرانیت، روشویی و اکسسوری سنگی. صادرات به امارات، قطر، روسیه، آلمان و آمریکا.",
};

export default function FaLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider initialLang="fa">
      <div lang="fa" dir="rtl" className="min-h-screen">
        {children}
      </div>
    </LanguageProvider>
  );
}
