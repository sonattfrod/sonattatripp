'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/types/database'
import { formatCurrency, formatDateRange, getDaysBetween } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Wallet,
  Users,
  Settings,
  FileText,
  Plus,
  Edit,
  Trash2,
  Plane,
  Clock,
  CheckCircle2,
  Circle,
} from 'lucide-react'

type Trip = Tables<'trips'>

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'> = {
  draft: 'secondary',
  planning: 'default',
  confirmed: 'success',
  ongoing: 'warning',
  completed: 'outline',
  cancelled: 'destructive',
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  planning: 'Perencanaan',
  confirmed: 'Dikonfirmasi',
  ongoing: 'Berlangsung',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

export default function TripDetailPage() {
  const params = useParams()
  const router = useRouter()
  const tripId = params.tripId as string
  const [trip, setTrip] = useState<Trip | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .eq('id', tripId)
          .single()

        if (error) throw error
        setTrip(data)
      } catch (error) {
        console.error('Error fetching trip:', error)
        router.push('/trips')
      } finally {
        setIsLoading(false)
      }
    }

    if (tripId) {
      fetchTrip()
    }
  }, [tripId, supabase, router])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
        <Skeleton className="h-96" />
      </div>
    )
  }

  if (!trip) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/trips">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{trip.name}</h1>
              <Badge variant={statusColors[trip.status]}>
                {statusLabels[trip.status]}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {trip.destination_name || 'Destinasi belum ditentukan'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Detail
          </Button>
        </div>
      </div>

      {/* Trip Info Card */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tanggal</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">
              {formatDateRange(trip.start_date, trip.end_date)}
            </p>
            <p className="text-xs text-muted-foreground">
              {getDaysBetween(trip.start_date, trip.end_date)} hari
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anggaran</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">
              {trip.budget ? formatCurrency(trip.budget, trip.currency) : '-'}
            </p>
            <p className="text-xs text-muted-foreground">
              {trip.currency}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anggota</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">-</p>
            <p className="text-xs text-muted-foreground">
              Belum ada anggota
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium capitalize">
              {statusLabels[trip.status]}
            </p>
            <p className="text-xs text-muted-foreground">
              Dibuat {new Date(trip.created_at).toLocaleDateString('id-ID')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="expenses">Pengeluaran</TabsTrigger>
          <TabsTrigger value="packing">Packing</TabsTrigger>
          <TabsTrigger value="map">Peta</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detail Perjalanan</CardTitle>
              <CardDescription>
                Informasi lengkap tentang perjalanan ini
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trip.description && (
                <div>
                  <h4 className="font-medium mb-1">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">{trip.description}</p>
                </div>
              )}
              {trip.notes && (
                <div>
                  <h4 className="font-medium mb-1">Catatan</h4>
                  <p className="text-sm text-muted-foreground">{trip.notes}</p>
                </div>
              )}
              {!trip.description && !trip.notes && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Belum ada detail perjalanan
                  </p>
                  <Button className="mt-4" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Detail
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href={`/trips/${tripId}/itinerary`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Itinerary
                  </Button>
                </Link>
                <Link href={`/trips/${tripId}/expenses`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Wallet className="h-4 w-4 mr-2" />
                    Pengeluaran
                  </Button>
                </Link>
                <Link href={`/trips/${tripId}/packing`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Circle className="h-4 w-4 mr-2" />
                    Packing
                  </Button>
                </Link>
                <Link href={`/trips/${tripId}/map`}>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Peta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itinerary">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Itinerary</CardTitle>
                <CardDescription>
                  Rencanakan jadwal perjalanan Anda
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kegiatan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <Plane className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Belum ada itinerary
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Itinerary
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pengeluaran</CardTitle>
                <CardDescription>
                  Lacak semua pengeluaran perjalanan
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pengeluaran
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Belum ada pengeluaran
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Catat Pengeluaran
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packing">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Packing List</CardTitle>
                <CardDescription>
                  Daftar barang yang perlu dibawa
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Belum ada item packing
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Packing List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Peta Perjalanan</CardTitle>
              <CardDescription>
                Lihat lokasi perjalanan di peta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 bg-muted/50 rounded-lg">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Peta akan ditampilkan di sini
                </p>
                <p className="text-sm text-muted-foreground">
                  Koordinat: {trip.destination_lat}, {trip.destination_lng}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
