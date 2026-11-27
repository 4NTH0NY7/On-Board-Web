"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Mail, Phone, Clock, ArrowRight, Check, Facebook, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const INPUT_BASE = "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-brand-cream placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-blue-500/60 focus:bg-white/[0.04] focus:ring-2 focus:ring-blue-500/20";
const LABEL_BASE = "mb-2 block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-gray-500";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone") || "No especificado";
    const company = formData.get("company") || "No especificada";
    const service = formData.get("service");
    const message = formData.get("message");

    console.log("Datos del formulario:", { name, email, phone, company, service, message });

    const waMessage = `Hola On Board, mi nombre es *${name}*.\n\n*Email:* ${email}\n*Teléfono:* ${phone}\n*Empresa:* ${company}\n*Servicio de interés:* ${service}\n\n*Mensaje:*\n${message}`;
    
    const phoneNumber = "16156094031"; 
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
    
    const newWindow = window.open(waUrl, "_blank");
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      window.location.href = waUrl;
    }

    setSent(true);
  }

  return (
    <section id="contacto" className="relative scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-5">
              
              <div className="relative flex flex-col justify-between gap-10 border-b border-white/[0.07] p-7 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-12">
                <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.26em] text-blue-500 sm:text-[0.7rem]">
                    <span className="h-px w-8 bg-blue-500/60" />
                    {t.contact.label}
                  </span>
                  {/* SOLO CAMBIADO text-white AQUÍ 👇 */}
                  <h2 className="mt-5 text-balance font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-brand-cream">
                    {t.contact.title1} <br /> {t.contact.title2}
                  </h2>
                  <p className="mt-4 max-w-sm text-pretty text-[0.9rem] leading-relaxed text-gray-400">
                    {t.contact.subtitle}
                  </p>
                </div>

                <div className="relative">
                  <ul className="space-y-4">
                    <li>
                      <a href="tel:+16156094031" className="group flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-brand-cream">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-blue-500 transition-colors group-hover:border-blue-500/40">
                          <Phone className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        {t.contact.phone}
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@onboardteam.com" className="group flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-brand-cream">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-blue-500 transition-colors group-hover:border-blue-500/40">
                          <Mail className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        {t.contact.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-blue-500">
                        <Clock className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      {t.contact.schedule}<br />{t.contact.hours}
                    </li>
                  </ul>

                  <div className="mt-8 border-t border-white/[0.07] pt-8">
                    <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-gray-500">{t.contact.follow}</p>
                    <div className="flex items-center gap-3">
                      <a href="https://www.facebook.com/onboardteam" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-400 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500"><Facebook className="h-4 w-4" strokeWidth={1.75} /></a>
                      <a href="https://www.instagram.com/onboardteam/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-400 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500"><Instagram className="h-4 w-4" strokeWidth={1.75} /></a>
                      <a href="https://www.youtube.com/channel/UC4Ee_yXXRGcdppqDW29g4Pw/videos" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-400 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500"><Youtube className="h-4 w-4" strokeWidth={1.75} /></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-10 lg:col-span-3 lg:p-12">
                {sent ? (
                  <div className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-500">
                      <Check className="h-6 w-6" strokeWidth={2} />
                    </span>
                    {/* SOLO CAMBIADO text-white AQUÍ 👇 */}
                    <h3 className="mt-6 font-display text-xl font-semibold text-brand-cream">{t.contact.form.sending}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">{t.contact.form.sendingDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={LABEL_BASE}>{t.contact.form.name}</label>
                        <input id="name" name="name" type="text" required placeholder={t.contact.form.namePlace} className={INPUT_BASE} />
                      </div>
                      <div>
                        <label htmlFor="email" className={LABEL_BASE}>{t.contact.form.email}</label>
                        <input id="email" name="email" type="email" required placeholder={t.contact.form.emailPlace} className={INPUT_BASE} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className={LABEL_BASE}>{t.contact.form.phone}</label>
                        <input id="phone" name="phone" type="tel" placeholder={t.contact.form.phonePlace} className={INPUT_BASE} />
                      </div>
                      <div>
                        <label htmlFor="company" className={LABEL_BASE}>{t.contact.form.company} <span className="text-gray-700">{t.contact.form.companyOptional}</span></label>
                        <input id="company" name="company" type="text" placeholder={t.contact.form.companyPlace} className={INPUT_BASE} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className={LABEL_BASE}>{t.contact.form.service}</label>
                      <select id="service" name="service" className={`${INPUT_BASE} appearance-none`}>
                        {t.services.list.map((s: any) => (
                          <option key={s.title} className="bg-neutral-900">{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className={LABEL_BASE}>{t.contact.form.message}</label>
                      <textarea id="message" name="message" required rows={4} placeholder={t.contact.form.messagePlace} className={`${INPUT_BASE} resize-none`} />
                    </div>

                    {/* SOLO CAMBIADO text-white AQUÍ 👇 */}
                    <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-brand-cream shadow-[0_0_45px_-14px_rgba(59,130,246,0.9)] transition-all duration-300 hover:bg-blue-500 sm:w-auto">
                      {t.contact.form.send}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}