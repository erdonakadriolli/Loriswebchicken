import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "loris.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Products table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        unit TEXT NOT NULL DEFAULT 'kg',
        image_url TEXT NOT NULL,
        badge TEXT,
        is_available INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL
    )
    """)

    # Orders table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        preferred_contact TEXT NOT NULL DEFAULT 'whatsapp',
        notes TEXT,
        items_json TEXT NOT NULL,
        total_price REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'E Re',
        created_at TEXT NOT NULL
    )
    """)

    # Settings table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
    )
    """)

    # Seed products if empty
    cursor.execute("SELECT COUNT(*) as count FROM products")
    if cursor.fetchone()["count"] == 0:
        initial_products = [
            (
                "Pulë e Plotë e Pastruar",
                "Pulë e freskët e pastruar deri në detaje, e larë me higjienë maksimale dhe e paketuar hermetikisht në qese ushqimore të posaçme. E gatshme direkt për furrë ose tenxhere.",
                "Pula të Plota",
                3.80,
                "kg",
                "/images/pule-e-plote.jpg",
                "Më e shitura",
                1,
                datetime.now().isoformat()
            ),
            (
                "Fileto Gjoksi Pule",
                "Mish i bardhë i butë dhe 100% pa eshtra, i prerë me kujdes dhe i vakumuar në paketim higjienik. Zgjedhje ideale për ushqim të shëndetshëm dhe të shpejtë.",
                "Pjesë Pule",
                5.50,
                "kg",
                "/images/fileto-gjoksi.jpg",
                "Cilësi Premium",
                1,
                datetime.now().isoformat()
            ),
            (
                "Kofshë & Nënkofshë Pule",
                "Pjesë pule me lëng dhe shije të plotë, të pastruara nga çdo papastërti dhe të paketuara për të ruajtur freskinë natyrale.",
                "Pjesë Pule",
                3.90,
                "kg",
                "/images/kofshe-pule.jpg",
                "Freski Ditore",
                1,
                datetime.now().isoformat()
            ),
            (
                "Pako Familjare Ekonomike (Kombinim)",
                "Paketë speciale me kursim: 2 pula të plota të pastruara në qese + 1 pako kofshë të lara e të paketuara. Ideale për furnizimin e tryezës familjare.",
                "Pako Familjare",
                18.50,
                "pako",
                "/images/pako-familjare.jpg",
                "Ofertë Speciale",
                1,
                datetime.now().isoformat()
            )
        ]
        cursor.executemany("""
        INSERT INTO products (name, description, category, price, unit, image_url, badge, is_available, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, initial_products)

    # Seed default settings if empty
    default_settings = {
        "business_name": "LORIS",
        "tagline": "Cilësi dhe freski për tryezën tuaj",
        "phone": "+383 44 123 456",
        "whatsapp": "+38344123456",
        "email": "info@loris-ks.com",
        "address": "Magjistralja Prishtinë - Ferizaj, Kosovë",
        "working_hours": "E Hënë - E Shtunë: 08:00 - 18:00 (E Diel: 09:00 - 14:00)",
        "delivery_cities": "Prishtinë, Ferizaj, Fushë Kosovë, Gjilan, Prizren, Pejë, Lipjan",
        "notice_banner": "Dërgesa të shpejta me automjete me ftohje në të gjithë Kosovën!",
        "admin_pin": "loris2025"
    }

    for k, v in default_settings.items():
        cursor.execute("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)", (k, v))

    # Seed sample orders if empty for demo
    cursor.execute("SELECT COUNT(*) as count FROM orders")
    if cursor.fetchone()["count"] == 0:
        sample_items_1 = json.dumps([{"name": "Pulë e Plotë e Pastruar", "quantity": 3, "unit": "kg", "price": 3.80}])
        sample_items_2 = json.dumps([{"name": "Fileto Gjoksi Pule", "quantity": 2, "unit": "kg", "price": 5.50}, {"name": "Kofshë & Nënkofshë Pule", "quantity": 2, "unit": "kg", "price": 3.90}])
        
        cursor.execute("""
        INSERT INTO orders (customer_name, phone, city, address, preferred_contact, notes, items_json, total_price, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, ("Valon Berisha", "+383 49 111 222", "Prishtinë", "Rruga B, Hyrja 3, Banesa 12", "whatsapp", "Të jenë pulat me peshë mesatare rreth 1.5kg secila", sample_items_1, 11.40, "E Re", datetime.now().isoformat()))

        cursor.execute("""
        INSERT INTO orders (customer_name, phone, city, address, preferred_contact, notes, items_json, total_price, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, ("Arta Gashi", "+383 45 333 444", "Ferizaj", "Lagjja e Re, afër Qendrës Sportive", "telefon", "Ju lutem na njoftoni 30 minuta para arritjes", sample_items_2, 18.80, "Në Proces", datetime.now().isoformat()))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at", DB_PATH)
