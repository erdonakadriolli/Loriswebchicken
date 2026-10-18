# LORIS – Platforma Profesionale e Pulave të Pastruara dhe të Paketuara

Web faqe moderne, elegante dhe plotësisht funksionale për biznesin **LORIS**, e ndërtuar posaçërisht për shitjen e pulave për mish, të therura, të pastruara deri në detaj dhe të paketuara në qese ushqimore të sigurta, të gatshme për gatim në çdo tryezë familjare dhe gastronomi në Kosovë.

---

## 🍗 Karakteristikat Kryesore

1. **Dizajn Modern & Estetikë Profesionale**:
   - Paletë ngjyrash e përzgjedhur: E bardhë e pastër, gjelbër smerald i thellë (`#0F4336`), dhe theks i ngrohtë pule/natyre.
   - Tipografi e sofistikuar me Google Fonts: *Outfit* dhe *Plus Jakarta Sans*.
   - Fotografi reale të produkteve të pastruara dhe të paketuara me qese dhe etiketa të brendit **LORIS** (jo shpendë të gjallë).
   - Efekte me xham (*glassmorphism*), animacione të buta dhe dizajn 100% responsive për telefona, tableta dhe kompjuterë.

2. **Katalogu Interaktiv i Produkteve**:
   - Pulë e Plotë e Pastruar dhe e Paketuar hermetikisht në qese.
   - Fileto Gjoksi Pule pa eshtra.
   - Kofshë & Nënkofshë Pule.
   - Pako Familjare Ekonomike (Kombinim me kursim).
   - Filtrim sipas kategorive, përzgjedhje sasie (kg ose copë/pako), çmime të qarta në Euro (€).

3. **Sistemi i Porosive Online & Integrimi me WhatsApp**:
   - Formular porosie me fusha të plota: Emri, Mbiemri, Telefoni, Qyteti i Kosovës (Prishtinë, Ferizaj, Prizren, Pejë, Gjilan, etj.), Adresa e saktë, Produkti, Sasia, Mënyra e kontaktit (WhatsApp / Telefon), dhe Shënime.
   - Shportë blerjeje (Slide-over Cart Drawer) me kalkulim automatik të nëntotalit.
   - Pas përfundimit, porosia ruhet në bazën e të dhënave dhe gjeneron mesazh të formatuar në WhatsApp gati për dërgim me 1 klikim tek stafi i LORIS.

4. **Paneli Administrativ Real (Admin Dashboard)**:
   - I mbrojtur me fjalëkalim/PIN (`loris2025`).
   - **Menaxhimi i Porosive**: Shfaqja e porosive në kohë reale, ndryshimi i statusit (*E Re*, *Në Proces*, *E Përfunduar*, *E Anuluar*), thirrje direkte e klientit me telefon ose WhatsApp, fshirje e porosive.
   - **Menaxhimi i Produkteve & Çmimeve**: Shto produkte të reja, ndrysho çmimet për kg/copë, ngarko ose ndrysho fotografi, modifiko përshkrimet.
   - **Cilësimet e Biznesit**: Përditëso numrin e telefonit, numrin e WhatsApp-it, orarin e punës, adresën fizike dhe shiritin njoftues.

5. **Arkitekturë Duale & Rezistencë ndaj Shkëputjeve**:
   - Lidhet drejtpërdrejt me backend-in FastAPI dhe bazën e të dhënave SQLite.
   - Nëse backend-i është i fikur ose faqja hapet si faqe statike, sistemi bën *seamless fallback* në LocalStorage, duke siguruar që asnjë funksionalitet të mos bllokohet kurrë!

---

## 📁 Struktura e Projektit

```
loris-web/
├── backend/
│   ├── main.py              # FastAPI server me CORS, Auth, Porositë & Produktet
│   ├── database.py          # SQLite schema, lidhja dhe të dhënat fillestare
│   ├── loris.db             # Baza e të dhënave SQLite e inicializuar
│   ├── requirements.txt     # Paketat e Python (fastapi, uvicorn, pydantic)
│   └── uploads/             # Dosja për ngarkimin e fotografive të reja
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg      # Logo dhe ikona e personalizuar e LORIS
│   │   └── images/          # Fotografitë profesionale të pulave të paketuara
│   │       ├── pule-e-plote.jpg
│   │       ├── fileto-gjoksi.jpg
│   │       ├── kofshe-pule.jpg
│   │       └── pako-familjare.jpg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Shiriti njoftues, logo, shporta, menuja
│   │   │   ├── Hero.jsx           # Ballina me pulën e paketuar, titujt dhe CTAs
│   │   │   ├── Products.jsx       # Kartat e produkteve, çmimet dhe filtrat
│   │   │   ├── AboutSection.jsx   # Rreth nesh, higjiena dhe paketimi
│   │   │   ├── OrderForm.jsx      # Formulari me qytetet e Kosovës & WhatsApp
│   │   │   ├── ContactSection.jsx # Telefoni, WhatsApp, orari dhe Google Maps
│   │   │   ├── CartDrawer.jsx     # Shporta rrëshqitëse me kalkulim
│   │   │   ├── AdminPanel.jsx     # Paneli administrativ i mbrojtur me PIN
│   │   │   └── Footer.jsx         # Informacionet e biznesit dhe lidhjet
│   │   ├── api.js                 # Klienti i integruar i API-së me fallback
│   │   ├── App.jsx                # Komponenti kryesor
│   │   ├── index.css              # Stilet bazë me Tailwind CSS
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Si ta nisni projektin lokalisht

### 1. Nisja e Backend-it (FastAPI):
Hapni një dritare terminali (PowerShell ose Command Prompt):
```bash
cd C:\Users\W11\.gemini\antigravity-ide\scratch\loris-web\backend
pip install -r requirements.txt
python main.py
```
> Serveri i API-së do të niset në: `http://127.0.0.1:8000` (Dokumentacioni Swagger: `http://127.0.0.1:8000/docs`).

### 2. Nisja e Frontend-it (React + Vite):
Hapni një terminal të dytë:
```bash
cd C:\Users\W11\.gemini\antigravity-ide\scratch\loris-web\frontend
npm install
npm run dev
```
> Web faqja do të hapet në: `http://localhost:5173/`

---

## 🔐 Hyrja në Panelin Administrativ

- Klikoni ikonën e mburojës/kyçit në këndin e djathtë lart të faqes (afër butonit "Porosit Tani") ose në fund të faqes (Footer).
- Shënoni PIN-in e administratorit: **`loris2025`**
- Klikoni **"Kyçu në Panel"**.
- Nga këtu mund të:
  - Shikoni të gjitha porositë e ardhura dhe t'u ndryshoni statusin me një klikim.
  - Ndryshoni çmimet për kg të secilit produkt.
  - Shtoni produkte të reja ose të fshini produkte ekzistuese.
  - Ndryshoni numrin e telefonit, WhatsApp-it dhe orarin e biznesit.

---

## 🌐 Udhëzime për Publikim Online (Deployment)

### Publikimi i Frontend-it në Vercel:
1. Krijoni një llogari falas në [Vercel](https://vercel.com).
2. Lidhni depon e projektit tuaj në GitHub ose ngarkoni dosjen `frontend`.
3. Tek konfigurimet e build-it vendosni:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Shtoni variablën e mjedisit (Environment Variable):
   - `VITE_API_URL`: URL-ja e backend-it tuaj të publikuar.

### Publikimi i Backend-it (FastAPI) në Render / Railway / Fly.io:
1. Zgjidhni [Render](https://render.com) ose [Railway](https://railway.app).
2. Krijoni një shërbim të ri me **Root Directory**: `backend`.
3. Vendosni:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Për PostgreSQL në vend të SQLite: mjafton të instaloni `psycopg2-binary` dhe të ndryshoni lidhjen në `database.py` me `DATABASE_URL`.
