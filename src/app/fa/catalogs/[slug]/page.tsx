import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { getCatalogBySlug, catalogs } from "@/data/catalogs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return catalogs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getCatalogBySlug(slug);
  if (!catalog) return {};
  return { title: `${catalog.titleFa} — مرجع سنگ ایرانیان` };
}

export default async function CatalogDetailFA({ params }: Props) {
  const { slug } = await params;
  const catalog = getCatalogBySlug(slug);
  if (!catalog) notFound();

  return (
    <>
      <Header locale="fa" />
      <main dir="rtl" className="pt-24 h-screen flex flex-col bg-[#0c1626]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 border-b border-white/10">
          <Link
            href="/fa/catalogs"
            className="text-[#f4f1ea] text-sm hover:text-[#c6a25f] transition-colors"
          >
            ← بازگشت به کاتالوگ‌ها
          </Link>
          <h1 className="text-[#f4f1ea] font-bold text-base">{catalog.titleFa}</h1>
        </div>
        <iframe
          src={catalog.pdfUrl}
          title={catalog.titleFa}
          className="flex-1 w-full"
          style={{ border: "none" }}
        />
      </main>
    </>
  );
}
