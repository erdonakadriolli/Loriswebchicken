import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import AboutSection from './components/AboutSection';
import OrderForm from './components/OrderForm';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { api } from './api';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('loris_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('loris_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart]);

  // Load initial data
  const loadData = async () => {
    try {
      const [prods, sett] = await Promise.all([
        api.getProducts(),
        api.getSettings()
      ]);
      setProducts(prods || []);
      setSettings(sett || null);
    } catch (e) {
      console.error("Failed to load initial data", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image_url: product.image_url,
        quantity: quantity
      }];
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuickOrder = (product, quantity) => {
    setPrefilledProduct({ id: product.id, quantity });
    const orderSection = document.getElementById('porosit');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cleanWhatsapp = (settings?.whatsapp || "38344123456").replace(/\D/g, "");

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-stone-900 selection:bg-emerald-800 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        settings={settings}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreProducts={() => scrollToSection('produktet')}
          onOrderNow={() => scrollToSection('porosit')}
        />

        <Products
          products={products}
          onAddToCart={handleAddToCart}
          onQuickOrder={handleQuickOrder}
        />

        <AboutSection />

        <OrderForm
          products={products}
          cart={cart}
          onClearCart={handleClearCart}
          prefilledProduct={prefilledProduct}
          settings={settings}
        />

        <ContactSection settings={settings} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => scrollToSection('porosit')}
      />

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshData={loadData}
      />

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        settings={settings}
      />

      {/* Floating WhatsApp CTA Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
        <div className="hidden group-hover:block bg-stone-900 text-white text-[11px] font-bold py-1 px-3 rounded-lg shadow-lg pointer-events-none transition-all duration-200">
          Porosit direkt në WhatsApp!
        </div>
        <a
          href={`https://api.whatsapp.com/send?phone=${cleanWhatsapp}&text=${encodeURIComponent('Përshëndetje LORIS, dëshiroj të bëj një porosi për pula të pastruara.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-700/40 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Kontakto në WhatsApp"
        >
          <MessageSquare className="w-7 h-7 fill-white/20" />
        </a>
      </div>

    </div>
  );
}
