import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFloat } from "@/components/layout/CTAFloat";
import { ContactForm } from "@/components/layout/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Request a Quote",
  description:
    "Contact Iranian Stone Reference for custom quotes, samples, and export consultations. Our team responds within 24 hours.",
};

export default function ContactEN() {
  return (
    <>
      <Header locale="en" />
      <main>
        {/* Hero */}
        <section className="bg-[#0c1626] pt-36 pb-16 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              Reach Out
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#f4f1ea] mb-4">
              Contact Us
            </h1>
            <p className="text-[#f4f1ea]/60 text-base max-w-xl mx-auto">
              Our team responds within 24 hours. For urgent enquiries, use WhatsApp.
            </p>
          </div>
        </section>

        {/* 2-column */}
        <section className="bg-[#fbfaf6] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Info */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-[#1d2330] mb-8">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  {[
                    { label: "Address", value: "Tehran, Iran" },
                    { label: "Phone", value: "+98 21 XXXX XXXX" },
                    { label: "WhatsApp", value: "+98 912 XXX XXXX" },
                    { label: "Email", value: "info@iranianstone.ir" },
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
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    {["Instagram", "LinkedIn", "YouTube"].map((s) => (
                      <a key={s} href="#" className="text-sm text-[#1d2330]/50 hover:text-[#c6a25f] transition-colors">
                        {s}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Export note */}
                <div className="mt-10 p-5 bg-[#0c1626]">
                  <p className="text-[#c6a25f] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                    International Export
                  </p>
                  <p className="text-[#f4f1ea]/60 text-xs leading-relaxed">
                    We export to UAE, Qatar, Russia, Germany and the USA. Mention your country and project scope in your message for a faster response.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <h2 className="font-display text-2xl font-bold text-[#1d2330] mb-8">
                  Request a Quote
                </h2>
                <ContactForm locale="en" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
      <CTAFloat locale="en" />
    </>
  );
}
