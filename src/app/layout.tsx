import type { Metadata } from "next";
import { Lato, Playfair_Display, Vazirmatn } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Iranian Stone Reference",
    default: "Iranian Stone Reference | Premium Natural Stone",
  },
  description:
    "Premium natural stone supplier — marble, travertine, onyx, granite, washbasins and stone accessories. Exporting to UAE, Qatar, Russia, Germany and USA.",
  keywords: ["natural stone", "marble", "travertine", "onyx", "granite", "Iran stone", "سنگ طبیعی", "مرمر"],
  openGraph: {
    siteName: "Iranian Stone Reference",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${lato.variable} ${playfair.variable} ${vazirmatn.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
