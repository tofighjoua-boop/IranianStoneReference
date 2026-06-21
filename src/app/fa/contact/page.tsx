import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { ContactForm } from "@/components/layout/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما — درخواست قیمت",
  description:
    "با مرجع سنگ ایرانیان برای استعلام سفارشی، نمونه‌ها و مشاوره صادراتی تماس بگیرید. تیم ما ظرف ۲۴ ساعت پاسخ می‌دهد.",
};

export default function ContactFA() {
  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Hero */}
        <section className="bg-[#0c1626] pt-36 pb-16 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              ارتباط
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f4f1ea] mb-4">
              تماس با ما
            </h1>
            <p className="text-[#f4f1ea]/60 text-base max-w-xl mx-auto">
              تیم ما ظرف ۲۴ ساعت پاسخ می‌دهد. برای سؤالات فوری از واتس‌اپ استفاده کنید.
            </p>
          </div>
        </section>

        {/* 2-column */}
        <section className="bg-[#fbfaf6] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Info — right side in RTL */}
              <div className="lg:col-span-2 lg:order-2">
                <h2 className="text-2xl font-bold text-[#1d2330] mb-8">
                  در تماس باشید
                </h2>

                <div className="space-y-6">
                  {[
                    { label: "آدرس", value: "تهران، ایران" },
                    { label: "تلفن", value: "۰۲۱-XXXX-XXXX" },
                    { label: "واتس‌اپ", value: "+98 912 XXX XXXX" },
                    { label: "ایمیل", value: "info@iranianstone.ir" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a25f] font-bold mb-1">
                        {item.label}
                      </p>
                      <p className="text-[#1d2330]/70 text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a25f] font-bold mb-3">
                    دنبال کنید
                  </p>
                  <div className="flex gap-4">
                    {["Instagram", "LinkedIn", "YouTube"].map((s) => (
                      <a key={s} href="#" className="text-sm text-[#1d2330]/50 hover:text-[#c6a25f] transition-colors">
                        {s}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-10 p-5 bg-[#0c1626]">
                  <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                    صادرات بین‌الملل
                  </p>
                  <p className="text-[#f4f1ea]/60 text-xs leading-relaxed">
                    ما به امارات، قطر، روسیه، آلمان و آمریکا صادر می‌کنیم. کشور و محدوده پروژه‌تان را در پیام ذکر کنید تا سریع‌تر پاسخ بگیرید.
                  </p>
                </div>
              </div>

              {/* Form — left side in RTL */}
              <div className="lg:col-span-3 lg:order-1">
                <h2 className="text-2xl font-bold text-[#1d2330] mb-8">
                  درخواست قیمت
                </h2>
                <ContactForm locale="fa" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
