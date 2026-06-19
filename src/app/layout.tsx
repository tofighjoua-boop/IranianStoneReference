import type { Metadata } from "next";
import { Lato, Vazirmatn } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iranian Stone Reference | Natural Stone",
  description:
    "Explore excellence in natural stone for unique and exclusive interiors and exteriors.",
  openGraph: {
    title: "Iranian Stone Reference | Natural Stone",
    description:
      "Explore excellence in natural stone for unique and exclusive interiors and exteriors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${lato.variable} ${vazirmatn.variable}`}>
      <body
        className="min-h-full antialiased"
        style={{ fontFamily: "var(--font-lato), Lato, sans-serif" }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
