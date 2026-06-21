import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: {
    template: "%s | Iranian Stone Reference",
    default: "Iranian Stone Reference | Premium Natural Stone",
  },
  description:
    "Premium natural stone supplier — marble, travertine, onyx, granite, washbasins and stone accessories. Exporting to UAE, Qatar, Russia, Germany and USA.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider initialLang="en">
      <div lang="en" dir="ltr" className="min-h-screen">
        {children}
      </div>
    </LanguageProvider>
  );
}
