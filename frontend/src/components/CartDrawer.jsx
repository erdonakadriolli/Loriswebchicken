import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 className="text-lg font-bold text-stone-900">Shporta e Porosisë</h2>
              <span className="text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                {cart.length} {cart.length === 1 ? 'produkt' : 'produkte'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-base">Shporta juaj është e zbrazët</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Zgjidhni pulë të freskët ose pjesë pule nga katalogu ynë për të filluar porosinë tuaj.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-18 h-18 rounded-lg object-cover bg-stone-200 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900">{item.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          title="Hiq nga shporta"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.price.toFixed(2)} € / {item.unit}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-stone-600 hover:text-stone-900 font-bold px-1 text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-stone-800 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-stone-600 hover:text-stone-900 font-bold px-1 text-xs"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-black text-emerald-900 font-heading">
                        {(item.quantity * item.price).toFixed(2)} €
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Nëntotali:</span>
                  <span className="font-semibold text-stone-800">{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Dorëzimi:</span>
                  <span className="text-emerald-700 font-semibold">Sipas marrëveshjes / qytetit</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Totali i përafërt:</span>
                  <span className="text-emerald-900 text-xl font-heading">{total.toFixed(2)} €</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-white p-2.5 rounded-lg border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Pula të pastruara me higjienë të lartë & paketim në qese ushqimore.</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Vazhdo te Formulari i Porosisë</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
