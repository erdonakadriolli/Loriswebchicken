import React, { useState } from 'react';
import { ShoppingBag, Plus, Check, Sparkles, Tag, ArrowUpRight } from 'lucide-react';

export default function Products({ products, onAddToCart, onQuickOrder }) {
  const [activeCategory, setActiveCategory] = useState("Të Gjitha");
  const [quantities, setQuantities] = useState({});
  const [addedNotice, setAddedNotice] = useState(null);

  const categories = ["Të Gjitha", "Pula të Plota", "Pjesë Pule", "Pako Familjare"];

  const filteredProducts = activeCategory === "Të Gjitha"
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleQtyChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAdd = (product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  return (
    <section id="produktet" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-bold tracking-wide">
            <Tag className="w-3.5 h-3.5 text-emerald-700" />
            <span>Katalogu i Produkteve LORIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Pula të Freskëta dhe Pjesë të Përzgjedhura
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Të therura me kujdes, të pastruara nga puplat dhe papastërtitë, dhe të paketuara në qese ushqimore të sigurta. Çmimet demonstrative mund të ndryshohen lirisht nga paneli.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-900 text-white shadow-md shadow-emerald-950/20 scale-105'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const currentQty = quantities[product.id] || 1;
            const isJustAdded = addedNotice === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-emerald-900 text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-stone-200">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {product.badge}
                    </div>
                  )}

                  {/* Category Tag */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-stone-200 text-[10px] font-medium px-2 py-0.5 rounded-md">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
                    
                    {/* Price and Unit */}
                    <div className="flex items-baseline justify-between">
                      <div className="text-xs text-stone-500 font-medium">Çmimi:</div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-900 font-heading">
                          {product.price.toFixed(2)} €
                        </span>
                        <span className="text-xs text-stone-500 font-medium ml-1">
                          / {product.unit}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between bg-stone-50 p-1.5 rounded-xl border border-stone-200">
                      <span className="text-xs font-semibold text-stone-600 px-2">Sasia ({product.unit}):</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white border border-stone-300 text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center text-sm cursor-pointer disabled:opacity-40"
                          disabled={currentQty <= 1}
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-800">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-stone-300 text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleAdd(product)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            U shtua!
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-stone-600" />
                            Në shportë
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onQuickOrder(product, currentQty)}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Porosit</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner for custom orders */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-extrabold text-stone-900">
              Keni nevojë për sasi më të mëdha apo porosi të rregullt për restorante & dasma?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              Biznesi LORIS ofron kushte speciale për blerje me shumicë dhe furnizim të vazhdueshëm në të gjithë Kosovën.
            </p>
          </div>
          <a
            href="#porosit"
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
          >
            Kërko Ofertë me Shumicë
          </a>
        </div>

      </div>
    </section>
  );
}
