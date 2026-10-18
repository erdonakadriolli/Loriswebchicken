import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Phone, MapPin, User, Package, AlertCircle, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../api';

const KOSOVO_CITIES = [
  "Prishtinë",
  "Ferizaj",
  "Prizren",
  "Pejë",
  "Gjilan",
  "Mitrovicë",
  "Gjakovë",
  "Fushë Kosovë",
  "Lipjan",
  "Podujevë",
  "Vushtrri",
  "Suharekë",
  "Kaçanik",
  "Drenas",
  "Malishevë",
  "Tjetër (shkruaj në adresë)"
];

export default function OrderForm({ products, cart, onClearCart, prefilledProduct, settings }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    city: 'Prishtinë',
    address: '',
    preferred_contact: 'whatsapp',
    notes: '',
    selected_product_id: '',
    quantity: 1
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Sync prefilled product if supplied
  useEffect(() => {
    if (prefilledProduct) {
      setFormData(prev => ({
        ...prev,
        selected_product_id: prefilledProduct.id,
        quantity: prefilledProduct.quantity || 1
      }));
    } else if (products.length > 0 && !formData.selected_product_id) {
      setFormData(prev => ({
        ...prev,
        selected_product_id: products[0].id
      }));
    }
  }, [prefilledProduct, products]);

  // Determine items: If cart has items, use cart items; otherwise use selected single product
  const getOrderItems = () => {
    if (cart && cart.length > 0) {
      return cart.map(item => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price
      }));
    }
    const singleProduct = products.find(p => p.id === Number(formData.selected_product_id)) || products[0];
    if (!singleProduct) return [];
    return [{
      product_id: singleProduct.id,
      name: singleProduct.name,
      quantity: Number(formData.quantity) || 1,
      unit: singleProduct.unit,
      price: singleProduct.price
    }];
  };

  const calculatedItems = getOrderItems();
  const subtotal = calculatedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.customer_name.trim() || formData.customer_name.trim().length < 3) {
      setErrorMsg('Ju lutem shënoni emrin dhe mbiemrin tuaj të plotë.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      setErrorMsg('Ju lutem shënoni numrin tuaj të telefonit.');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Ju lutem shënoni adresën e dorëzimit (rruga, numri ose lagjja).');
      return;
    }
    if (calculatedItems.length === 0) {
      setErrorMsg('Ju lutem përzgjidhni të paktën një produkt.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer_name: formData.customer_name.trim(),
        phone: formData.phone.trim(),
        city: formData.city,
        address: formData.address.trim(),
        preferred_contact: formData.preferred_contact,
        notes: formData.notes.trim(),
        items: calculatedItems
      };

      const response = await api.createOrder(orderPayload);

      if (response && response.success) {
        setOrderSuccess(response);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
        if (onClearCart) onClearCart();
      } else {
        setErrorMsg('Porosia nuk mund të procedohej. Ju lutem provoni përsëri.');
      }
    } catch (err) {
      setErrorMsg('Ndodhi një gabim gjatë regjistrimit të porosisë. Ju lutem na kontaktoni drejtpërdrejt.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setOrderSuccess(null);
    setFormData({
      customer_name: '',
      phone: '',
      city: 'Prishtinë',
      address: '',
      preferred_contact: 'whatsapp',
      notes: '',
      selected_product_id: products[0]?.id || '',
      quantity: 1
    });
  };

  return (
    <section id="porosit" className="py-20 sm:py-28 bg-stone-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold tracking-wide">
            <Package className="w-4 h-4 text-emerald-700" />
            <span>Porositje e Shpejtë dhe e Sigurt</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Porosit Pula të Pastruara LORIS Online
          </h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto">
            Plotësoni të dhënat e thjeshta më poshtë. Porosia regjistrohet menjëherë në sistem dhe mund ta dërgoni me 1 klikim në WhatsApp tek stafi ynë.
          </p>
        </div>

        {/* Success Modal / Card State */}
        {orderSuccess ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-200 text-center space-y-6 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Porosia u Regjistrua me Sukses
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Faleminderit, {formData.customer_name}!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Numri juaj i porosisë është <strong className="text-stone-900">#{orderSuccess.order_id}</strong>. Totali: <strong className="text-emerald-900">{orderSuccess.total_price.toFixed(2)} €</strong>.
              </p>
            </div>

            {/* Order details summary box */}
            <div className="bg-stone-50 rounded-2xl p-5 text-left border border-stone-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">
                Përmbledhja e Porosisë:
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Klienti:</span>
                <span className="font-semibold text-stone-900">{formData.customer_name} ({formData.phone})</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Vendi i dorëzimit:</span>
                <span className="font-semibold text-stone-900">{formData.city}, {formData.address}</span>
              </div>
              <div className="pt-2 border-t border-stone-200">
                <span className="font-semibold text-stone-700">Artikujt:</span>
                <ul className="mt-1 space-y-1">
                  {calculatedItems.map((it, idx) => (
                    <li key={idx} className="flex justify-between text-stone-600">
                      <span>• {it.name} ({it.quantity} {it.unit})</span>
                      <span className="font-semibold">{(it.quantity * it.price).toFixed(2)} €</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <div className="space-y-3 pt-2">
              <p className="text-xs text-stone-500 font-medium">
                Për konfirmim dhe koordinim të shpejtë të orarit, klikoni butonin më poshtë për të dërguar porosinë në WhatsApp:
              </p>

              <a
                href={orderSuccess.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-700/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>Dërgo Porosinë në WhatsApp</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div>
              <button
                onClick={resetForm}
                className="text-xs font-bold text-stone-500 hover:text-stone-800 underline cursor-pointer"
              >
                Krijo një porosi të re
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200/80 space-y-6"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Items display: Cart Items OR Single Product Selection */}
            {cart && cart.length > 0 ? (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Artikujt nga Shporta ({cart.length})
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Totali: <strong className="text-emerald-900 font-bold">{subtotal.toFixed(2)} €</strong>
                  </span>
                </div>
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 bg-white p-2.5 rounded-lg border border-emerald-100">
                      <span>{item.name} × {item.quantity} {item.unit}</span>
                      <span className="text-emerald-900">{(item.quantity * item.price).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Single product chooser */
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Produkti i Dëshiruar *
                  </label>
                  <select
                    value={formData.selected_product_id}
                    onChange={(e) => setFormData({ ...formData, selected_product_id: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-stone-900 text-sm font-medium bg-white"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.price.toFixed(2)} € / {p.unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Sasia (kg / copë) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 1 })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-stone-900 text-sm font-medium bg-white"
                  />
                </div>
              </div>
            )}

            {/* Customer Information Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Emri dhe Mbiemri *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="p.sh. Agron Krasniqi"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-stone-900 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Numri i Telefonit *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="p.sh. +383 44 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-stone-900 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Location & Delivery */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              <div className="sm:col-span-5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Qyteti i Dorëzimit *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-stone-900 text-sm bg-white"
                  >
                    {KOSOVO_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-7">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Adresa e Saktë e Dorëzimit *
                </label>
                <input
                  type="text"
                  placeholder="Rruga, lagjja, numri i shtëpisë ose banesës"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-stone-900 text-sm"
                />
              </div>
            </div>

            {/* Preferred contact channel */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Mënyra e Preferuar e Kontaktit *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.preferred_contact === 'whatsapp'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 text-stone-600'
                }`}>
                  <input
                    type="radio"
                    name="contact_pref"
                    value="whatsapp"
                    checked={formData.preferred_contact === 'whatsapp'}
                    onChange={() => setFormData({ ...formData, preferred_contact: 'whatsapp' })}
                    className="text-emerald-700 focus:ring-emerald-700"
                  />
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs sm:text-sm">WhatsApp (rekomandohet)</span>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.preferred_contact === 'telefon'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 text-stone-600'
                }`}>
                  <input
                    type="radio"
                    name="contact_pref"
                    value="telefon"
                    checked={formData.preferred_contact === 'telefon'}
                    onChange={() => setFormData({ ...formData, preferred_contact: 'telefon' })}
                    className="text-emerald-700 focus:ring-emerald-700"
                  />
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs sm:text-sm">Thirrje Telefonike</span>
                </label>
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Shënime Shtesë (opsionale)
              </label>
              <textarea
                rows="2"
                placeholder="P.sh. Pesha e dëshiruar për secilën pulë, koha më e përshtatshme e pranimit, udhëzime për vendndodhjen..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-stone-900 text-sm"
              />
            </div>

            {/* Total calculation strip */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="text-xs font-semibold text-stone-600">
                Llogaritja e përafërt e porosisë:
              </span>
              <span className="text-2xl font-black text-emerald-900 font-heading">
                {subtotal.toFixed(2)} €
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-base shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Po regjistrohet porosia...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Përfundo Porosinë dhe Merr Konfirmimin</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-stone-500">
              🔒 Të dhënat tuaja përdoren ekskluzivisht për dorëzimin e porosisë nga biznesi LORIS.
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
