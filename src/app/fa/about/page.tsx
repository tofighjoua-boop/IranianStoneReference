import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";

export const metadata: Metadata = {
  title: "درباره ما — داستان ما از سال ۱۳۸۹",
  description:
    "مرجع سنگ ایرانیان از سال ۱۳۸۹ به‌عنوان تأمین‌کنندهٔ پریمیوم سنگ طبیعی تأسیس شد. صادرات به امارات، قطر، روسیه، آلمان و آمریکا.",
};

const timeline = [
  { year: "۱۳۸۹", fa: "تأسیس در تهران با تمرکز بر صادرات مرمر و تراورتن." },
  { year: "۱۳۹۲", fa: "اولین قراردادهای صادراتی با امارات و قطر." },
  { year: "۱۳۹۵", fa: "گسترش به اونیکس و گرانیت. افتتاح شوروم پریمیوم." },
  { year: "۱۳۹۸", fa: "راه‌اندازی خط تولید روشویی CNC." },
  { year: "۱۴۰۱", fa: "ورود به بازارهای اروپایی — روسیه، آلمان." },
  { year: "۱۴۰۳", fa: "بیش از ۵۰۰ پروژهٔ تکمیل‌شده در ۵ قاره." },
];

const values = [
  "کیفیت عالی سنگ‌های طبیعی",
  "مشاوره و پشتیبانی تخصصی",
  "قیمت رقابتی و لجستیک قابل‌اعتماد",
  "پردازش سفارشی و فینیش CNC",
  "تیم دوزبانه — فارسی / انگلیسی / عربی",
  "بیش از ۱۵ سال تجربهٔ صادراتی",
];

const exportMarkets = [
  { code: "AE", label: "امارات / دبی" },
  { code: "QA", label: "قطر / دوحه" },
  { code: "RU", label: "روسیه / مسکو" },
  { code: "DE", label: "آلمان / مونیخ" },
  { code: "US", label: "ایالات‌متحده" },
];

export default function AboutFA() {
  return (
    <>
      <Header locale="fa" />
      <main dir="rtl">
        {/* Hero */}
        <section className="bg-[#0c1626] pt-36 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">داستان ما</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f4f1ea] mb-4">
              درباره ما
            </h1>
            <p className="text-[#f4f1ea]/60 text-lg max-w-2xl mx-auto leading-relaxed">
              یک شرکت خانوادگی سنگ که در سال ۱۳۸۹ تأسیس شد و بر پایه دقت، هنرمندی و جاه‌طلبی جهانی بنا شده است.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-[#fbfaf6] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">از سال ۱۳۸۹</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1d2330] mb-6 leading-tight">
                  مرجع سنگ ایرانیان
                </h2>
                <p className="text-[#1d2330]/70 leading-relaxed mb-5">
                  مرجع سنگ ایرانیان از سال ۱۳۸۹ به‌عنوان تأمین‌کنندهٔ پیشرو سنگ طبیعی پریمیوم فعالیت می‌کند. ما در تأمین بهترین سنگ‌های طبیعی ایران و جهان برای معماران، طراحان داخلی و پیمانکاران تخصص داریم.
                </p>
                <p className="text-[#1d2330]/70 leading-relaxed mb-5">
                  متعهد به ارائهٔ کیفیت استثنایی، قابلیت اطمینان و خدمات به مشتریانمان در سراسر جهان هستیم. با شوروم و تأسیسات پردازش پیشرفته در تهران، اطمینان می‌دهیم هر پروژه‌ای با بالاترین معیارها اجرا شود.
                </p>
                <p className="text-[#1d2330]/70 leading-relaxed">
                  محصولات ما به امارات، قطر، روسیه، آلمان و آمریکا صادر می‌شود. به دسترسی بین‌المللی و تعهدمان به رضایت مشتری افتخار می‌کنیم.
                </p>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/collection-exclusive.jpg"
                    alt="شوروم مرجع سنگ ایرانیان — تهران"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-3/4 h-3/4 border border-[#c6a25f]/20 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[#0c1626] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-14">
              <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">نقاط عطف</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f1ea]">مسیر ما</h2>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute right-6 top-0 bottom-0 w-px bg-[#c6a25f]/20" />
              <div className="space-y-8">
                {timeline.map((t) => (
                  <div key={t.year} className="flex gap-6 items-start flex-row-reverse">
                    <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#c6a25f] rounded-full" />
                    </div>
                    <div className="pb-2 text-right">
                      <p className="text-[#c6a25f] text-xs font-bold mb-1">{t.year}</p>
                      <p className="text-[#f4f1ea]/70 text-sm leading-relaxed">{t.fa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#fbfaf6] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">تعهد</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1d2330] mb-8 leading-tight">
                  چرا مرجع سنگ ایرانیان را انتخاب کنید؟
                </h2>
                <ul className="space-y-4">
                  {values.map((v) => (
                    <li key={v} className="flex items-start gap-3 flex-row-reverse text-right">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-[#c6a25f] rounded-full flex-shrink-0" />
                      <span className="text-[#1d2330]/70">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0c1626] p-8">
                <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-right">
                  بازارهای صادراتی
                </p>
                <div className="space-y-3">
                  {exportMarkets.map((m) => (
                    <div key={m.code} className="flex items-center gap-3 flex-row-reverse justify-end">
                      <span className="text-[#f4f1ea]/70 text-sm">{m.label}</span>
                      <span className="w-6 h-6 flex items-center justify-center text-[#c6a25f] text-xs font-bold border border-[#c6a25f]/30">
                        {m.code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#c6a25f] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <h2 className="text-3xl font-bold text-[#0c1626] mb-4">بیایید با هم کار کنیم</h2>
            <p className="text-[#0c1626]/70 mb-8">
              برای استعلام سنگ سفارشی، نمونه‌ها و مشاورهٔ صادراتی با تیم ما تماس بگیرید.
            </p>
            <Link
              href="/fa/contact"
              className="inline-flex items-center px-8 py-4 bg-[#0c1626] text-[#f4f1ea] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#16263f] transition-colors"
            >
              تماس با ما
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="fa" />
      <CTAFloat locale="fa" />
    </>
  );
}
