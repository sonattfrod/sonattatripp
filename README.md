# Sonattatrip 🗺️

> Plan Smarter. Travel Better.

Aplikasi SaaS untuk perencanaan perjalanan dengan fitur pelacakan anggaran, itinerary planner, dan kolaborasi tim.

![Sonattatrip Preview](https://via.placeholder.com/1200x600?text=Sonattatrip+Preview)

## ✨ Fitur Utama

- **🔐 Autentikasi** - Login dengan email/password dan Google OAuth
- **📋 Manajemen Perjalanan** - Buat, edit, dan kelola perjalanan dengan mudah
- **💰 Pelacak Anggaran** - Lacak pengeluaran per kategori dengan visualisasi
- **📅 Itinerary Planner** - Rencanakan jadwal harian dengan drag-and-drop
- **🎒 Packing Checklist** - Daftar barang dengan status pengecekan
- **🗺️ Destinasi & Peta** - Eksplorasi lokasi dengan peta interaktif
- **❤️ Favorit** - Simpan destinasi favorit untuk referensi
- **🔔 Notifikasi** - Pengingat dan notifikasi penting
- **📊 Analitik** - Statistik dan tren perjalanan
- **📄 Export PDF** - Ekspor itinerary ke format PDF

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Charts**: Recharts
- **Maps**: Leaflet + OpenStreetMap
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **State**: Zustand

## 📁 Struktur Proyek

```
budgettrip/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Dashboard pages
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── forms/          # Form components
│   │   └── layout/         # Layout components
│   ├── lib/
│   │   ├── supabase/       # Supabase client
│   │   ├── validations/    # Zod schemas
│   │   └── utils/          # Utility functions
│   ├── stores/             # Zustand stores
│   ├── services/           # API services
│   └── types/              # TypeScript types
├── supabase/               # Database migrations
└── public/                 # Static files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn
- Akun Supabase

### Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/budgettrip.git
cd budgettrip
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` dengan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key
```

5. Setup database:
```bash
# Login ke Supabase CLI
npx supabase login

# Link project
npx supabase link --project-ref your_project_id

# Push migrations
npx supabase db push

# Seed data (optional)
npx supabase db seed
```

6. Run development server:
```bash
npm run dev
```

7. Buka [http://localhost:3000](http://localhost:3000)

## 📖 Dokumentasi

- [Setup Supabase](docs/supabase-setup.md)
- [Database Schema](docs/database-schema.md)
- [API Reference](docs/api-reference.md)
- [Deployment](docs/deployment.md)

## 🎨 Desain Sistem

### Warna

| Nama | Hex | Usage |
|------|-----|-------|
| Primary | #3B82F6 | Tombol utama, link |
| Secondary | #64748B | Teks sekunder |
| Accent | #10B981 | Success, highlight |
| Destructive | #EF4444 | Error, delete |

### Tipografi

- **Font**: Inter (Google Fonts)
- **Heading**: Bold, tracking-tight
- **Body**: Regular, 16px base

## 🔒 Keamanan

- Row Level Security (RLS) untuk semua tabel
- UUID untuk semua primary key
- Validasi input dengan Zod
- CSRF protection
- Rate limiting pada API routes

## 🤝 Kontribusi

1. Fork repository
2. Buat branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

MIT License - lihat [LICENSE](LICENSE) untuk detail.

## 🙏 Terima Kasih

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Dibuat dengan ❤️ untuk traveler Indonesia 🇮🇩

**Sonattatrip - Plan Smarter. Travel Better.**
