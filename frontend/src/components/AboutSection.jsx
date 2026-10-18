import React from 'react';
import { ShieldCheck, HeartHandshake, PackageCheck, ThermometerSnowflake, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const commitments = [
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-700" />,
      title: "Përzgjedhje e Kujdesshme",
      description: "Pulat tona përzgjidhen me kujdes të veçantë për të siguruar mish të freskët, me peshë të përshtatshme dhe strukturë natyrale të shëndetshme."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
      title: "Higjienë e Rreptë gjatë Përpunimit",
      description: "Çdo pulë pastrohet imtësisht, largohen puplat dhe lahet me ujë të pastër në kushte kontrolluara higjienike para paketimit."
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-emerald-700" />,
      title: "Paketim në Qese Ushqimore",
      description: "Produktet paketohen hermetikisht në qese të certifikuara për ushqim, duke ruajtur lëngjet natyrale dhe duke parandaluar çdo kontakt me ajrin e jashtëm."
    },
    {
      icon: <ThermometerSnowflake className="w-6 h-6 text-emerald-700" />,
      title: "Freski dhe Shërbim i Përkushtuar",
      description: "Synojmë t'u ofrojmë konsumatorëve në Kosovë produkte që shkojnë nga përpunimi direkt në tryezën e tyre, të gatshme për përgatitje pa humbur kohë."
    }
  ];

  return (
    <section id="rreth-nesh" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wide border border-emerald-200">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              <span>Përkushtimi ynë</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Rreth Biznesit <span className="text-emerald-800">LORIS</span>
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>LORIS</strong> është një biznes i fokusuar në furnizimin e familjeve dhe bizneseve me mish pule të pastër, të freskët dhe cilësor. Qëllimi ynë parësor është që çdo klient të marrë një produkt të sigurt dhe të lehtë për gatim.
              </p>
              <p>
                E dimë sa e rëndësishme është pastërtia e mishit të pulës për çdo amvise dhe kuzhinier. Prandaj, tek ne procesi i pastrimit realizohet me përpikëri maksimale, në mënyrë që ju të mos keni nevojë për pastrime shtesë në shtëpi.
              </p>
              <p>
                Pulat tona dorëzohen të paketuara individualisht në qese ushqimore, duke garantuar higjienë të plotë gjatë transportit deri në adresën tuaj të dorëzimit.
              </p>
            </div>

            {/* Checklist */}
            <div className="pt-2 space-y-2.5">
              {[
                "Pula të lara dhe të pastruara deri në detajin e fundit",
                "Paketim i sigurt në qese për të ruajtur aromën dhe freskinë",
                "Mundësi porosie e lehtë përmes web-it ose WhatsApp-it",
                "Përkushtim dhe korrektësi maksimale me çdo klient"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-stone-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#porosit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Porosit për Familjen Tuaj
              </a>
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {commitments.map((c, i) => (
              <div
                key={i}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-stone-200 flex items-center justify-center mb-4">
                  {c.icon}
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {c.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
