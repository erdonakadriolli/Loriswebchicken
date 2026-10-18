import React from 'react';
import { ShieldCheck, Phone, MessageSquare, MapPin, Clock, ArrowUp, Lock } from 'lucide-react';

export default function Footer({ onOpenAdmin, settings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phone = settings?.phone || "+383 44 123 456";
  const whatsapp = settings?.whatsapp || "+38344123456";
  const cleanWhatsapp = whatsapp.replace(/\D/g, "");
  const address = settings?.address || "Magjistralja Prishtinë - Ferizaj, Kosovë";
  const hours = settings?.working_hours || "E Hënë - E Shtunë: 08:00 - 18:00 (E Diel: 09:00 - 14:00)";

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl">
                L
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-heading">
                LORIS
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Biznesi LORIS merret me shitjen e pulave të freskëta për mish, të pastruara deri në detaj dhe të paketuara në qese ushqimore, të gatshme për çdo kuzhinë familjare dhe gastronomi.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Higjienë e plotë, paketim hermetik dhe freski maksimale.</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigimi</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Ballina</a></li>
              <li><a href="#produktet" className="hover:text-white transition-colors">Produktet & Çmimet</a></li>
              <li><a href="#rreth-nesh" className="hover:text-white transition-colors">Rreth LORIS</a></li>
              <li><a href="#porosit" className="hover:text-white transition-colors">Porosit Online</a></li>
              <li><a href="#kontakti" className="hover:text-white transition-colors">Kontakti</a></li>
            </ul>
          </div>

          {/* Contact Col (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Kontakti & Lokacioni</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white">{phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href={`https://api.whatsapp.com/send?phone=${cleanWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: {whatsapp}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} <strong>LORIS</strong>. Të gjitha të drejtat e rezervuara. Pula të pastruara & paketuara në Kosovë.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Paneli Administrativ</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
              title="Kthehu në krye"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
