'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/types/database'
import { formatCurrency, formatDateRange, getDaysBetween } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Plane,
  Plus,
  Calendar,
  Wallet,
  TrendingUp,
  MapPin,
  ArrowRight,
  Clock,
} from 'lucide-react'

type Trip = Tables<'trips'>
type Profile = Tables<'profiles'>

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

export default function DashboardPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profileData)

        // Fetch trips
        const { data: tripsData } = await supabase
          .from('trips')
          .select('*')
          .or(`created_by.eq.${user.id},trip_members.user_id.eq.${user.id}`)
          .order('start_date', { ascending: true })
        setTrips(tripsData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.start_date) >= new Date() && trip.status !== 'cancelled'
  )
  const ongoingTrips = trips.filter((trip) => trip.status === 'ongoing')
  const completedTrips = trips.filter((trip) => trip.status === 'completed')

  const totalBudget = trips.reduce((sum, trip) => sum + (trip.budget || 0), 0)
  const totalTrips = trips.length

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Selamat datang, {profile?.full_name?.split(' ')[0] || 'Traveler'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Berikut ringkasan perjalanan Anda
          </p>
        </div>
        <Button asChild>
          <Link href="/trips/new">
            <Plus className="mr-2 h-4 w-4" />
            Buat Perjalanan
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Perjalanan</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrips}</div>
            <p className="text-xs text-muted-foreground">
              {completedTrips.length} perjalanan selesai
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggaran</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalBudget, profile?.preferred_currency || 'IDR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Dari {totalTrips} perjalanan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Akan Datang</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingTrips.length}</div>
            <p className="text-xs text-muted-foreground">
              Perjalanan yang akan datang
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sedang Berlangsung</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ongoingTrips.length}</div>
            <p className="text-xs text-muted-foreground">
              Nikmati perjalanan Anda!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Trips */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Perjalanan Mendatang</CardTitle>
                <CardDescription>Perjalanan yang akan datang</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/trips">
                  Lihat semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingTrips.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Plane className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Belum ada perjalanan mendatang
                </p>
                <Button asChild size="sm">
                  <Link href="/trips/new">Buat perjalanan pertama</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingTrips.slice(0, 3).map((trip) => (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.id}`}
                    className="flex items-center gap-4 rounded-lg border p-3 hover:bg-accent transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{trip.name}</p>
                        <Badge variant={statusColors[trip.status]}>
                          {statusLabels[trip.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {trip.destination_name || 'Destinasi belum ditentukan'}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDateRange(trip.start_date, trip.end_date)}
                        <span className="mx-1">•</span>
                        {getDaysBetween(trip.start_date, trip.end_date)} hari
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Fitur yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/trips/new"
                className="flex flex-col items-center justify-center rounded-lg border p-6 hover:bg-accent transition-colors"
              >
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Buat Perjalanan</p>
              </Link>

              <Link
                href="/expenses/new"
                className="flex flex-col items-center justify-center rounded-lg border p-6 hover:bg-accent transition-colors"
              >
                <div className="rounded-full bg-green-500/10 p-3 mb-3">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium">Catat Pengeluaran</p>
              </Link>

              <Link
                href="/destinations"
                className="flex flex-col items-center justify-center rounded-lg border p-6 hover:bg-accent transition-colors"
              >
                <div className="rounded-full bg-blue-500/10 p-3 mb-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Jelajahi Destinasi</p>
              </Link>

              <Link
                href="/analytics"
                className="flex flex-col items-center justify-center rounded-lg border p-6 hover:bg-accent transition-colors"
              >
                <div className="rounded-full bg-purple-500/10 p-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium">Lihat Statistik</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Perjalanan Tersimpan</CardTitle>
          <CardDescription>Semua perjalanan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Plane className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Belum Ada Perjalanan</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Mulai rencanakan perjalanan pertama Anda dan mulai lacak anggaran dengan mudah!
              </p>
              <Button asChild>
                <Link href="/trips/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Perjalanan Baru
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trips.slice(0, 6).map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="group rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Plane className="h-12 w-12 text-primary/50 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold truncate">{trip.name}</h3>
                      <Badge variant={statusColors[trip.status]} className="text-xs">
                        {statusLabels[trip.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {trip.destination_name || 'Destinasi belum ditentukan'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateRange(trip.start_date, trip.end_date)}
                      </span>
                      {trip.budget && (
                        <span className="flex items-center gap-1">
                          <Wallet className="h-3 w-3" />
                          {formatCurrency(trip.budget, trip.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
