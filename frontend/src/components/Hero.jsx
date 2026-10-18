import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function Hero({ onExploreProducts, onOrderNow }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-stone-100/80 via-white to-stone-50 pt-8 pb-16 lg:py-24">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-50/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, description, actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Zgjedhja e Parë për Pulë të Freskët në Kosovë</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
              LORIS – <span className="text-emerald-800 underline decoration-emerald-500/40 decoration-wavy decoration-2">Cilësi dhe freski</span> për tryezën tuaj.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              “Pula të përzgjedhura, të përpunuara me kujdes dhe të paketuara në mënyrë higjienike, për t'ju sjellë cilësi dhe shije në çdo tryezë.”
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Porosit tani</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-base border border-stone-300 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
                <span>Shiko produktet</span>
              </button>
            </div>

            {/* Trust highlights bullets */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                </div>
                <div className="text-xs font-semibold text-stone-700">
                  Të therura & pastruara me higjienë
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                </div>
                <div className="text-xs font-semibold text-stone-700">
                  Të paketuara në qese ushqimore
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-emerald-800" />
                </div>
                <div className="text-xs font-semibold text-stone-700">
                  Gati menjëherë për gatim
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image of packaged chicken */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl p-3 bg-white shadow-2xl shadow-stone-400/30 border border-stone-200/70 overflow-hidden group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100">
                  <img
                    src="/images/pule-e-plote.jpg"
                    alt="Pulë e freskët e pastruar dhe e paketuar LORIS"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* On-image badge */}
                  <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-md text-white text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    100% E Freskët & E Pastruar
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center justify-between">
                    <span>Paketim hermetik në qese ushqimore</span>
                    <span className="text-emerald-400 font-bold">LORIS Standard</span>
                  </div>
                </div>
              </div>

              {/* Floating review/counter pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-4 shadow-xl border border-stone-200 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-black text-lg">
                  🍗
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-medium">Cilësia e Garantuar</div>
                  <div className="text-sm font-extrabold text-stone-900">Gati për Gatim Direkt</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
