import React, { useState, useEffect } from 'react';
import {
  X, Lock, LogOut, Package, ShoppingCart, Settings, Plus, Edit2,
  Trash2, CheckCircle2, Clock, Phone, AlertCircle, Save, RefreshCw, Eye
} from 'lucide-react';
import { api } from '../api';

export default function AdminPanel({ isOpen, onClose, onRefreshData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'settings'

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Editing product modal / form state
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: 'Pjesë Pule',
    price: 3.50,
    unit: 'kg',
    image_url: '/images/pule-e-plote.jpg',
    badge: ''
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({});

  useEffect(() => {
    // Check if token exists in session
    const token = sessionStorage.getItem('loris_admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.adminLogin(pinInput.trim());
      if (res.success) {
        sessionStorage.setItem('loris_admin_token', res.token);
        setIsAuthenticated(true);
        setPinInput('');
        fetchAdminData();
      }
    } catch (err) {
      setLoginError(err.message || 'PIN-i i pasaktë');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loris_admin_token');
    setIsAuthenticated(false);
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [o, p, s] = await Promise.all([
        api.getOrders(),
        api.getProducts(),
        api.getSettings()
      ]);
      setOrders(o || []);
      setProducts(p || []);
      setSettings(s || {});
      setSettingsForm(s || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- ORDER ACTIONS ---
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      showToast(`Statusi u ndryshua në "${newStatus}"`);
      if (onRefreshData) onRefreshData();
    } catch {
      showToast("Gabim gjatë ndryshimit të statusit", true);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`A jeni të sigurt që dëshironi të fshini porosinë #${orderId}?`)) return;
    try {
      await api.deleteOrder(orderId);
      setOrders(orders.filter(o => o.id !== orderId));
      showToast("Porosia u fshi");
      if (onRefreshData) onRefreshData();
    } catch {
      showToast("Gabim gjatë fshirjes", true);
    }
  };

  // --- PRODUCT ACTIONS ---
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      category: 'Pjesë Pule',
      price: 3.50,
      unit: 'kg',
      image_url: '/images/pule-e-plote.jpg',
      badge: ''
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      description: prod.description,
      category: prod.category,
      price: prod.price,
      unit: prod.unit,
      image_url: prod.image_url,
      badge: prod.badge || ''
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, productForm);
        showToast("Produkti u përditësua me sukses");
      } else {
        await api.createProduct(productForm);
        showToast("Produkti i ri u shtua me sukses");
      }
      setShowProductModal(false);
      fetchAdminData();
      if (onRefreshData) onRefreshData();
    } catch {
      showToast("Gabim gjatë ruajtjes së produktit", true);
    }
  };

  const handleDeleteProduct = async (productId, name) => {
    if (!window.confirm(`A jeni të sigurt që dëshironi të fshini "${name}"?`)) return;
    try {
      await api.deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
      showToast("Produkti u fshi");
      if (onRefreshData) onRefreshData();
    } catch {
      showToast("Gabim gjatë fshirjes së produktit", true);
    }
  };

  // --- SETTINGS ACTIONS ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settingsForm);
      showToast("Cilësimet e biznesit u ruajtën me sukses");
      if (onRefreshData) onRefreshData();
    } catch {
      showToast("Gabim gjatë ruajtjes së cilësimeve", true);
    }
  };

  const showToast = (msg, isErr = false) => {
    setStatusMsg({ text: msg, isErr });
    setTimeout(() => setStatusMsg(''), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-stone-200">
        
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold">
              L
            </div>
            <div>
              <h2 className="text-base font-extrabold">Paneli Administrativ LORIS</h2>
              <p className="text-[11px] text-stone-400">Menaxhimi i Produkteve, Porosive dhe Informacioneve</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Dil
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {statusMsg && (
          <div className={`py-2 px-4 text-xs font-bold text-center ${
            statusMsg.isErr ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            {statusMsg.text}
          </div>
        )}

        {/* Content Body */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-stone-900">Hyrja e Administratorit</h3>
              <p className="text-xs text-stone-500 mt-1">
                Ju lutem shënoni fjalëkalimin (PIN) për të menaxhuar biznesin LORIS.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Fjalëkalimi (p.sh. loris2025)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-center text-lg tracking-widest font-mono focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Kyçu në Panel
              </button>
            </form>

            <div className="p-3 rounded-xl bg-stone-100 text-[11px] text-stone-600">
              💡 Fjalëkalimi i parazgjedhur demonstrativ: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono font-bold text-stone-800">loris2025</code>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Header */}
            <div className="flex items-center justify-between border-b border-stone-200 px-6 bg-stone-50">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
                    activeTab === 'orders'
                      ? 'border-emerald-800 text-emerald-900 bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Porositë</span>
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
                    activeTab === 'products'
                      ? 'border-emerald-800 text-emerald-900 bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Produktet & Çmimet</span>
                  <span className="bg-stone-200 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                    {products.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
                    activeTab === 'settings'
                      ? 'border-emerald-800 text-emerald-900 bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Të Dhënat e Biznesit</span>
                </button>
              </div>

              <button
                onClick={fetchAdminData}
                disabled={loading}
                className="text-stone-500 hover:text-stone-800 p-2"
                title="Rifresko të dhënat"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Tab 1: Orders */}
            {activeTab === 'orders' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-stone-500 text-xs">
                    Nuk ka asnjë porosi të regjistruar deri tani.
                  </div>
                ) : (
                  orders.map((ord) => {
                    const statusColor = {
                      'E Re': 'bg-amber-100 text-amber-900 border-amber-300',
                      'Në Proces': 'bg-blue-100 text-blue-900 border-blue-300',
                      'E Përfunduar': 'bg-emerald-100 text-emerald-900 border-emerald-300',
                      'E Anuluar': 'bg-rose-100 text-rose-900 border-rose-300'
                    }[ord.status] || 'bg-stone-100 text-stone-800';

                    return (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl border border-stone-200 bg-white shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-black text-sm text-stone-900">
                              Porosia #{ord.id}
                            </span>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                              {ord.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Change status buttons */}
                            {['E Re', 'Në Proces', 'E Përfunduar', 'E Anuluar'].map(st => (
                              <button
                                key={st}
                                onClick={() => handleUpdateStatus(ord.id, st)}
                                className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors ${
                                  ord.status === st
                                    ? 'bg-stone-900 text-white'
                                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                }`}
                              >
                                {st}
                              </button>
                            ))}

                            <button
                              onClick={() => handleDeleteOrder(ord.id)}
                              className="text-stone-400 hover:text-rose-600 p-1"
                              title="Fshi porosinë"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Customer & Address Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-stone-400 font-medium">Klienti:</span>
                            <div className="font-bold text-stone-900 text-sm mt-0.5">{ord.customer_name}</div>
                            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mt-1">
                              <Phone className="w-3.5 h-3.5" />
                              <a href={`tel:${ord.phone}`} className="hover:underline">{ord.phone}</a>
                            </div>
                          </div>

                          <div>
                            <span className="text-stone-400 font-medium">Adresa e Dorëzimit:</span>
                            <div className="font-bold text-stone-900 mt-0.5">{ord.city}</div>
                            <div className="text-stone-600">{ord.address}</div>
                          </div>

                          <div>
                            <span className="text-stone-400 font-medium">Totali & Kontakti:</span>
                            <div className="text-base font-black text-emerald-900 font-heading">
                              {Number(ord.total_price).toFixed(2)} €
                            </div>
                            <div className="text-stone-500 text-[11px]">
                              Kontakti: {ord.preferred_contact} • {new Date(ord.created_at).toLocaleDateString('sq-AL')}
                            </div>
                          </div>
                        </div>

                        {/* Items ordered */}
                        {ord.items && ord.items.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
                            <span className="font-bold text-stone-700">Artikujt:</span>
                            <ul className="space-y-0.5">
                              {ord.items.map((it, idx) => (
                                <li key={idx} className="flex justify-between text-stone-600">
                                  <span>• {it.name} ({it.quantity} {it.unit})</span>
                                  <span className="font-semibold text-stone-800">{(it.quantity * it.price).toFixed(2)} €</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {ord.notes && (
                          <div className="text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded-lg border border-amber-200">
                            <strong>Shënime nga klienti:</strong> {ord.notes}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Tab 2: Products & Prices */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Katalogu i Produkteve</h3>
                    <p className="text-xs text-stone-500">Ndryshoni çmimet për kg/copë, shtoni produkte ose përditësoni përshkrimet.</p>
                  </div>
                  <button
                    onClick={handleOpenAddProduct}
                    className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Shto Produkt të Ri
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-white flex gap-4 items-center shadow-xs"
                    >
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-20 h-20 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-sm text-stone-900 truncate">{p.name}</h4>
                          <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded font-medium text-stone-600">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 truncate mt-0.5">{p.description}</p>
                        
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                          <span className="text-base font-black text-emerald-900 font-heading">
                            {Number(p.price).toFixed(2)} € <span className="text-xs text-stone-500 font-normal">/ {p.unit}</span>
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-stone-500 hover:text-emerald-800 hover:bg-stone-100 rounded-lg"
                              title="Ndrysho"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-lg"
                              title="Fshi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Business Settings */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl">
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <h3 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
                    Informacionet e Biznesit LORIS
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Numri i Telefonit
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Numri i WhatsApp-it (për dërgimin e porosive)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Adresa e Biznesit
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Orari i Punës
                    </label>
                    <input
                      type="text"
                      value={settingsForm.working_hours || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, working_hours: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Teksti i Shiritit Njoftues (Banner në krye të faqes)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.notice_banner || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, notice_banner: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Ruaj Ndryshimet
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Product Add/Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-stone-200">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h4 className="font-extrabold text-base text-stone-900">
                {editingProduct ? 'Ndrysho Produktin' : 'Shto Produkt të Ri'}
              </h4>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Emri i Produktit *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Përshkrimi</label>
                <textarea
                  rows="2"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Kategoria</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white"
                  >
                    <option value="Pula të Plota">Pula të Plota</option>
                    <option value="Pjesë Pule">Pjesë Pule</option>
                    <option value="Pako Familjare">Pako Familjare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Njësia</label>
                  <select
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="copë">copë</option>
                    <option value="pako">pako</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Çmimi (€) *</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Badge (Opsional)</label>
                  <input
                    type="text"
                    placeholder="p.sh. Më e shitura"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">URL e Fotografisë</label>
                <input
                  type="text"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  placeholder="/images/pule-e-plote.jpg ose URL"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm"
                >
                  Ruaj Produktin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
