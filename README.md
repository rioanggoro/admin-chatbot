# 🧪 Frontend Developer Pretest – Admin & Chatbot AI

Hasil pengerjaan pretest yang terdiri dari dua tugas:

1. **Sistem Admin Pembelian**
2. **Chatbot AI (Gemini)**

---

## 📁 Struktur Project

ADMIN-CHATBOT-APP/
├── .env # API Key Gemini + DB URL Neon
├── prisma/ # Prisma schema dan migration
├── src/
│ ├── app/
│ │ ├── admin/ # Halaman Admin Pembelian
│ │ ├── api/
│ │ │ └── chat/ # API Route Gemini Chatbot
│ │ ├── chatbot/ # Halaman Chatbot
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── globals.css
│ ├── components/ # UI Components (shadcn/ui based)
│ └── lib/ # Util/helper
├── public/
├── package.json
└── README.md

markdown
Copy
Edit

---

## ✅ Tugas 1: Admin Pembelian (Form & Riwayat)

### 🎯 Fitur

- CRUD Pembelian (Tambah, Lihat, Batalkan)
- Terkoneksi ke:
  - Produk (otomatis menampilkan daftar produk)
  - Stok Produk
  - Pembelian

### 🔧 Teknologi

- **Next.js App Router (client component)**
- **Neon PostgreSQL** (via `DATABASE_URL`)
- **Prisma ORM**
- **Tailwind + Shadcn UI**

### 🚀 Cara Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/username/admin-chatbot-app.git
cd admin-chatbot-app

# 2. Install dependencies
npm install

# 3. Setup DB (Neon)
npx prisma generate
npx prisma migrate dev --name init

# 4. Jalankan server
npm run dev
🌐 Akses http://localhost:3000
📄 Admin page: /admin, /admin/pembelian, /admin/produk

✅ Tugas 2: Chatbot Gemini AI
🎯 Fitur
UI Chat sederhana

Interaktif dengan Google Gemini (models/gemini-1.5-pro-latest)

Input dan output real-time

🔧 Teknologi
Next.js API Route

@google/generative-ai

Tailwind UI + Sidebar

🚀 Cara Menjalankan
Tambahkan ke .env:

env
Copy
Edit
GEMINI_API_KEY=your_gemini_api_key
Lalu akses:

bash
Copy
Edit
http://localhost:3000/chatbot
✉️ Pesan dikirim ke API route POST /api/chat dan diproses oleh Gemini.

📦 File Penting
src/app/api/chat/route.ts → logika panggil Gemini

src/app/chatbot/page.tsx → halaman chatbot

prisma/schema.prisma → database model pembelian, stok, produk

📎 Link Repository
🔗 https://github.com/username/admin-chatbot-app

📝 Catatan Tambahan
Semua UI menggunakan Tailwind CSS dan shadcn/ui

Chatbot mendukung input text dan loading animation

API Gemini membutuhkan koneksi internet & kuota Google Cloud aktif

Database menggunakan Neon PostgreSQL (gratis)

perl
Copy
Edit

Ganti bagian `https://github.com/username/...` dengan link asli repo-mu.
Kalau kamu butuh `schema.prisma`, `migration`, atau dummy data `seed.ts`, tinggal bilang ya — aku bantuin juga! ✅
```
