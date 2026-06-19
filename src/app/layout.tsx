import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antolini® | Natural stone processing",
  description: "Explore Italian excellence in natural stone processing, for unique and exclusive interiors and exteriors.",
  openGraph: {
    title: "Antolini® | Natural stone processing",
    description: "Explore Italian excellence in natural stone processing, for unique and exclusive interiors and exteriors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className="min-h-full antialiased" style={{ fontFamily: "var(--font-lato), Lato, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
