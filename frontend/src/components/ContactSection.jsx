import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Mail, CheckCircle2, Send, AlertCircle } from 'lucide-react';

export default function ContactSection({ settings }) {
  const [msgSent, setMsgSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const phone = settings?.phone || "+383 44 123 456";
  const whatsapp = settings?.whatsapp || "+38344123456";
  const cleanWhatsapp = whatsapp.replace(/\D/g, "");
  const address = settings?.address || "Magjistralja Prishtinë - Ferizaj, Kosovë";
  const hours = settings?.working_hours || "E Hënë - E Shtunë: 08:00 - 18:00 (E Diel: 09:00 - 14:00)";
  const email = settings?.email || "info@loris-ks.com";

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;

    // Send via direct WhatsApp
    const msg = `Përshëndetje LORIS! Jam ${contactForm.name} (Tel: ${contactForm.phone}). Pyetja ime: ${contactForm.message || 'Dua më shumë informacion rreth furnizimit me pula.'}`;
    window.open(`https://api.whatsapp.com/send?phone=${cleanWhatsapp}&text=${encodeURIComponent(msg)}`, '_blank');
    setMsgSent(true);
  };

  return (
    <section id="kontakti" className="py-20 sm:py-28 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold tracking-wide">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Na Kontaktoni</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Jemi Këtu për Çdo Pyetje dhe Porosi
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Flisni drejtpërdrejt me stafin e LORIS përmes telefonit ose WhatsApp-it për porosi të shpejta ditore ose furnizime të vazhdueshme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info cards (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone card */}
              <a
                href={`tel:${phone}`}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Telefoni</div>
                  <div className="text-base font-extrabold text-stone-900 mt-0.5">{phone}</div>
                  <div className="text-xs text-emerald-700 font-semibold mt-1">Kliko për të thirrur</div>
                </div>
              </a>

              {/* WhatsApp card */}
              <a
                href={`https://api.whatsapp.com/send?phone=${cleanWhatsapp}&text=${encodeURIComponent('Përshëndetje LORIS, kam një pyetje.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <MessageSquare className="w-5 h-5 fill-white/20" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">WhatsApp</div>
                  <div className="text-base font-extrabold text-stone-900 mt-0.5">{whatsapp}</div>
                  <div className="text-xs text-emerald-700 font-semibold mt-1">Bisedo menjëherë</div>
                </div>
              </a>

              {/* Address card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4 sm:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-stone-200/80 text-stone-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Lokacioni i Biznesit</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">{address}</div>
                  <div className="text-xs text-stone-500 mt-1">Dërgesa në Prishtinë, Ferizaj dhe qytete tjera të Kosovës</div>
                </div>
              </div>

              {/* Hours card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4 sm:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-stone-200/80 text-stone-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Orari i Punës dhe Pranimit të Porosive</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">{hours}</div>
                  <div className="text-xs text-emerald-700 font-semibold mt-1">Porositë online pranohen 24/7</div>
                </div>
              </div>

            </div>

            {/* Embedded interactive map preview */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-[16/9] relative bg-stone-100">
              <iframe
                title="Lokacioni LORIS Kosovë"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93963.88722744837!2d21.09635791444122!3d42.60228807056024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee14a2a11b9%3A0xb35133d59648c66e!2sPrishtina!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Quick contact form (5 columns) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-stone-900">
                Keni pyetje specifike?
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Dërgoni mesazh dhe stafi ynë do t'ju përgjigjet brenda pak minutave.
              </p>

              {msgSent ? (
                <div className="my-6 p-4 rounded-2xl bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <p>Mesazhi juaj u përgatit për dërgim!</p>
                  <button
                    onClick={() => setMsgSent(false)}
                    className="text-xs underline text-emerald-950 font-bold block mx-auto"
                  >
                    Dërgo një pyetje tjetër
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Emri juaj *
                    </label>
                    <input
                      type="text"
                      placeholder="Emri dhe mbiemri"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Numri i telefonit *
                    </label>
                    <input
                      type="tel"
                      placeholder="+383 44 ..."
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Mesazhi ose Pyetja juaj
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Shkruani pyetjen tuaj këtu..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dërgo Mesazhin në WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6 text-[11px] text-stone-500 text-center">
              Biznesi LORIS – Cilësi, siguri dhe freski e përditshme.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
