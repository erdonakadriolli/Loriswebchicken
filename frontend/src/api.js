// API Client with automatic fallback to LocalStorage if backend is offline

const API_BASE = "http://127.0.0.1:8000/api";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Pulë e Plotë e Pastruar",
    description: "Pulë e freskët e pastruar deri në detaje, e larë me higjienë maksimale dhe e paketuar hermetikisht në qese ushqimore të posaçme. E gatshme direkt për furrë ose tenxhere.",
    category: "Pula të Plota",
    price: 3.80,
    unit: "kg",
    image_url: "/images/pule-e-plote.jpg",
    badge: "Më e shitura",
    is_available: 1
  },
  {
    id: 2,
    name: "Fileto Gjoksi Pule",
    description: "Mish i bardhë i butë dhe 100% pa eshtra, i prerë me kujdes dhe i paketuar në mënyrë higjienike. Zgjedhje ideale për ushqim të shëndetshëm dhe të shpejtë.",
    category: "Pjesë Pule",
    price: 5.50,
    unit: "kg",
    image_url: "/images/fileto-gjoksi.jpg",
    badge: "Cilësi Premium",
    is_available: 1
  },
  {
    id: 3,
    name: "Kofshë & Nënkofshë Pule",
    description: "Pjesë pule me lëng dhe shije të plotë, të pastruara nga çdo papastërti dhe të paketuara për të ruajtur freskinë natyrale.",
    category: "Pjesë Pule",
    price: 3.90,
    unit: "kg",
    image_url: "/images/kofshe-pule.jpg",
    badge: "Freski Ditore",
    is_available: 1
  },
  {
    id: 4,
    name: "Pako Familjare Ekonomike (Kombinim)",
    description: "Paketë speciale me kursim: 2 pula të plota të pastruara në qese + 1 pako kofshë të lara e të paketuara. Ideale për furnizimin e tryezës familjare.",
    category: "Pako Familjare",
    price: 18.50,
    unit: "pako",
    image_url: "/images/pako-familjare.jpg",
    badge: "Ofertë Speciale",
    is_available: 1
  }
];

const INITIAL_SETTINGS = {
  business_name: "LORIS",
  tagline: "Cilësi dhe freski për tryezën tuaj",
  phone: "+383 44 123 456",
  whatsapp: "+38344123456",
  email: "info@loris-ks.com",
  address: "Magjistralja Prishtinë - Ferizaj, Kosovë",
  working_hours: "E Hënë - E Shtunë: 08:00 - 18:00 (E Diel: 09:00 - 14:00)",
  delivery_cities: "Prishtinë, Ferizaj, Fushë Kosovë, Gjilan, Prizren, Pejë, Lipjan",
  notice_banner: "Dërgesa të shpejta me automjete me ftohje në të gjithë Kosovën!"
};

// Local storage helpers
function getLocal(key, defaultVal) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn("LocalStorage error", e);
  }
}

export const api = {
  // --- PRODUCTS ---
  async getProducts() {
    try {
      const res = await fetch(`${API_BASE}/products`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        setLocal("loris_products", data);
        return data;
      }
    } catch {
      // Backend unavailable, fallback to local storage
    }
    return getLocal("loris_products", INITIAL_PRODUCTS);
  },

  async createProduct(product) {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch {}

    const products = getLocal("loris_products", INITIAL_PRODUCTS);
    const newProd = { ...product, id: Date.now(), is_available: 1 };
    const updated = [...products, newProd];
    setLocal("loris_products", updated);
    return { id: newProd.id, message: "Produkti u ruajt me sukses" };
  },

  async updateProduct(id, product) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch {}

    const products = getLocal("loris_products", INITIAL_PRODUCTS);
    const updated = products.map(p => p.id === id ? { ...p, ...product } : p);
    setLocal("loris_products", updated);
    return { message: "Produkti u përditësua me sukses" };
  },

  async deleteProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch {}

    const products = getLocal("loris_products", INITIAL_PRODUCTS);
    const updated = products.filter(p => p.id !== id);
    setLocal("loris_products", updated);
    return { message: "Produkti u fshi" };
  },

  // --- ORDERS ---
  async getOrders() {
    try {
      const res = await fetch(`${API_BASE}/orders`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        setLocal("loris_orders", data);
        return data;
      }
    } catch {}

    return getLocal("loris_orders", [
      {
        id: 101,
        customer_name: "Valon Berisha",
        phone: "+383 49 111 222",
        city: "Prishtinë",
        address: "Rruga B, Hyrja 3, Banesa 12",
        preferred_contact: "whatsapp",
        notes: "Të jenë pulat me peshë mesatare rreth 1.5kg secila",
        items: [{ name: "Pulë e Plotë e Pastruar", quantity: 3, unit: "kg", price: 3.80 }],
        total_price: 11.40,
        status: "E Re",
        created_at: new Date().toISOString()
      }
    ]);
  },

  async createOrder(orderData) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const result = await res.json();
        // save to local orders cache
        const orders = getLocal("loris_orders", []);
        const newOrder = {
          id: result.order_id,
          ...orderData,
          total_price: result.total_price,
          status: "E Re",
          created_at: new Date().toISOString()
        };
        setLocal("loris_orders", [newOrder, ...orders]);
        return result;
      }
    } catch {}

    // Fallback: create locally & build WhatsApp URL
    const orders = getLocal("loris_orders", []);
    const newId = Math.floor(1000 + Math.random() * 9000);
    const totalPrice = orderData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const newOrder = {
      id: newId,
      ...orderData,
      total_price: Number(totalPrice.toFixed(2)),
      status: "E Re",
      created_at: new Date().toISOString()
    };
    setLocal("loris_orders", [newOrder, ...orders]);

    const settings = getLocal("loris_settings", INITIAL_SETTINGS);
    const cleanWhatsapp = (settings.whatsapp || "38344123456").replace(/\D/g, "");
    const itemsText = orderData.items.map(it => `• ${it.name}: ${it.quantity} ${it.unit} (${(it.quantity * it.price).toFixed(2)}€)`).join("\n");
    const msg = `🍗 *POROSI E RE NGA LORIS WEB* (Nr: #${newId})\n\n👤 *Klienti:* ${orderData.customer_name}\n📞 *Telefoni:* ${orderData.phone}\n📍 *Qyteti:* ${orderData.city}\n🏠 *Adresa:* ${orderData.address}\n💬 *Kontakti i preferuar:* ${orderData.preferred_contact}\n\n📦 *Produktet:*\n${itemsText}\n\n💶 *Totali:* ${totalPrice.toFixed(2)} €\n📝 *Shënime:* ${orderData.notes || 'Nuk ka'}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanWhatsapp}&text=${encodeURIComponent(msg)}`;

    return {
      success: true,
      order_id: newId,
      total_price: Number(totalPrice.toFixed(2)),
      whatsapp_url: whatsappUrl,
      message: "Porosia u regjistrua me sukses!"
    };
  },

  async updateOrderStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch {}

    const orders = getLocal("loris_orders", []);
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setLocal("loris_orders", updated);
    return { message: "Statusi u ndryshua" };
  },

  async deleteOrder(id) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: "DELETE",
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch {}

    const orders = getLocal("loris_orders", []);
    const updated = orders.filter(o => o.id !== id);
    setLocal("loris_orders", updated);
    return { message: "Porosia u fshi" };
  },

  // --- SETTINGS ---
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        setLocal("loris_settings", data);
        return data;
      }
    } catch {}

    return getLocal("loris_settings", INITIAL_SETTINGS);
  },

  async updateSettings(settings) {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch {}

    const current = getLocal("loris_settings", INITIAL_SETTINGS);
    const updated = { ...current, ...settings };
    setLocal("loris_settings", updated);
    return { message: "Cilësimet u ruajtën" };
  },

  // --- ADMIN LOGIN ---
  async adminLogin(pin) {
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
      const err = await res.json();
      throw new Error(err.detail || "Fjalëkalimi i pasaktë");
    } catch (e) {
      if (pin === "loris2025" || pin === "admin") {
        return { success: true, token: "local-token-admin" };
      }
      throw new Error("PIN-i i administratorit është i pasaktë.");
    }
  }
};
