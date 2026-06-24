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
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a25f] font-bold mb-1">Address</p>
                    <p className="text-[#1d2330]/70 text-sm leading-relaxed">
                      Iran, Tehran, Shamsabad Industrial Town,<br />
                      Boustan Blvd, Golbon 14 St., No. 9
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a25f] font-bold mb-1">Phone</p>
                    <a href="tel:+989044640033" className="block text-[#1d2330]/70 text-sm hover:text-[#c6a25f] transition-colors">+98 912 638 8525</a>
                    <a href="tel:+989126384150" className="block text-[#1d2330]/70 text-sm hover:text-[#c6a25f] transition-colors">+98 912 638 4150</a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a25f] font-bold mb-1">WhatsApp</p>
                    <a href="https://wa.me/989126388525" target="_blank" rel="noopener noreferrer" className="text-[#1d2330]/70 text-sm hover:text-[#c6a25f] transition-colors">+98 912 638 8525</a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a25f] font-bold mb-1">Email</p>
                    <a href="mailto:info@iranianstonereference.com" className="text-[#1d2330]/70 text-sm hover:text-[#c6a25f] transition-colors">info@iranianstonereference.com</a>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a25f] font-bold mb-3">
                    Follow Us
                  </p>
                  <div className="flex flex-col gap-1">
                    <a href="https://www.instagram.com/iranian.stone.reference" target="_blank" rel="noopener noreferrer" className="text-sm text-[#1d2330]/50 hover:text-[#c6a25f] transition-colors">Instagram</a>
                    <a href="https://www.instagram.com/iranian.stone.reference" target="_blank" rel="noopener noreferrer" className="text-xs text-[#c6a25f]/70 hover:text-[#c6a25f] transition-colors">@iranian.stone.reference</a>
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
