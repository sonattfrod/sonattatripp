import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Plane,
  Wallet,
  MapPin,
  Users,
  Calendar,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const features = [
  {
    icon: Wallet,
    title: 'Pelacak Anggaran',
    description: 'Kelola anggaran perjalanan dengan kategori terperinci dan notifikasi saat mendekati batas.',
  },
  {
    icon: Calendar,
    title: 'Itinerary Planner',
    description: 'Rencanakan jadwal perjalanan hari per hari dengan drag-and-drop yang mudah.',
  },
  {
    icon: Users,
    title: 'Kolaborasi Tim',
    description: 'Undang teman atau keluarga untuk bergabung dan kelola perjalanan bersama.',
  },
  {
    icon: MapPin,
    title: 'Destinasi & Peta',
    description: 'Jelajahi destinasi dengan peta interaktif dan informasi cuaca实时.',
  },
  {
    icon: BarChart3,
    title: 'Analitik Cerdas',
    description: 'Lihat statistik pengeluaran dan tren perjalanan dengan visualisasi yang menarik.',
  },
  {
    icon: CheckCircle2,
    title: 'Packing Checklist',
    description: 'Pastikan tidak ada yang tertinggal dengan daftar barang otomatis.',
  },
]

const steps = [
  {
    step: 1,
    title: 'Buat Perjalanan',
    description: 'Masukkan destinasi, tanggal, dan anggaran untuk perjalanan Anda.',
  },
  {
    step: 2,
    title: 'Rencanakan & Bagikan',
    description: 'Tambahkan itinerary, packing list, dan undang teman untuk kolaborasi.',
  },
  {
    step: 3,
    title: 'Lacak Pengeluaran',
    description: 'Catat setiap transaksi dan lihat sisa anggaran secara realtime.',
  },
  {
    step: 4,
    title: 'Nikmati Perjalanan',
    description: 'Ekspor itinerary ke PDF dan nikmati perjalanan tanpa khawatir.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Sonattatrip</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Fitur
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              Cara Kerja
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Harga
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Daftar Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Sekarang dengan AI Assistant</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Plan Smarter.
              <br />
              <span className="text-primary">Travel Better.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Rencanakan perjalanan impian Anda dengan fitur pelacakan anggaran, itinerary planner,
              dan kolaborasi tim yang membuat traveling lebih mudah dan menyenangkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Mulai Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Lihat Demo
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Tidak perlu kartu kredit • Gratis selamanya untuk individu
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Semua yang Anda butuhkan untuk perjalanan sempurna
            </h2>
            <p className="text-muted-foreground text-lg">
              Fitur lengkap untuk merencanakan, melacak, dan menikmati perjalanan Anda tanpa stres.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mulai dalam 4 langkah mudah
            </h2>
            <p className="text-muted-foreground text-lg">
              Dari ide menjadi kenyataan dalam hitungan menit.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Siap memulai perjalanan Anda?
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Bergabung dengan ribuan traveler yang sudah merasakan kemudahan merencanakan
                perjalanan dengan Sonattatrip.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Sonattatrip</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plan Smarter. Travel Better.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground">Fitur</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Harga</Link></li>
                <li><Link href="/destinations" className="hover:text-foreground">Destinasi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">Tentang</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Karir</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground">Pusat Bantuan</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground">Privasi</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Syarat</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Sonattatrip. Hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
