import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, MessageSquare, Menu, X, ShieldCheck, Shield } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdmin, settings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Ballina", href: "#hero" },
    { name: "Produktet", href: "#produktet" },
    { name: "Rreth Nesh", href: "#rreth-nesh" },
    { name: "Porosit Online", href: "#porosit" },
    { name: "Kontakti", href: "#kontakti" }
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 text-center font-medium border-b border-emerald-900/50 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Higjienë e Garantuar
        </span>
        <span className="hidden sm:inline">
          {settings?.notice_banner || "Pula të freskëta për mish, të pastruara me kujdes dhe të paketuara në qese – Dërgesa në Kosovë!"}
        </span>
        <span className="text-emerald-300 font-semibold underline sm:no-underline ml-1">
          Tel: {settings?.phone || "+383 44 123 456"}
        </span>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-stone-200/80'
            : 'bg-white py-4 border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center text-white font-black text-xl tracking-wider shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-emerald-950 font-heading">
                LORIS
              </span>
              <span className="text-[10px] tracking-widest text-emerald-700 font-bold uppercase -mt-1">
                Pula & Freski
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-semibold text-stone-700 hover:text-emerald-800 transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-700 hover:after:w-full after:transition-all"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Order button */}
            <a
              href={`https://api.whatsapp.com/send?phone=${(settings?.whatsapp || '38344123456').replace(/\D/g, '')}&text=${encodeURIComponent('Përshëndetje LORIS, dëshiroj të pyes për furnizim me pula.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              WhatsApp
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors text-xs font-bold"
              aria-label="Shporta e porosive"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline">Shporta</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[11px] font-black animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Porosit CTA button */}
            <button
              onClick={() => handleNavClick("#porosit")}
              className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              Porosit Tani
            </button>

            {/* Admin Panel Link */}
            <button
              onClick={onOpenAdmin}
              title="Paneli Administrativ"
              className="p-2 text-stone-400 hover:text-emerald-800 rounded-full hover:bg-stone-100 transition-colors"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-emerald-900 rounded-lg hover:bg-stone-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-5 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <a
                href={`tel:${settings?.phone || "+38344123456"}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-stone-100 text-stone-800 text-xs font-bold"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                Telefono: {settings?.phone || "+383 44 123 456"}
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${(settings?.whatsapp || '38344123456').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                Kontakto në WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
