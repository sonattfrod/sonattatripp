'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/types/database'
import { formatCurrency, formatDateRange, getDaysBetween } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Plane,
  Plus,
  Search,
  Calendar,
  MapPin,
  Wallet,
  Filter,
  Grid,
  List,
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

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const supabase = createClient()

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .order('start_date', { ascending: false })

        if (error) throw error
        setTrips(data || [])
      } catch (error) {
        console.error('Error fetching trips:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrips()
  }, [supabase])

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 flex-1 max-w-sm" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perjalanan</h1>
          <p className="text-muted-foreground">
            Kelola semua perjalanan Anda di satu tempat
          </p>
        </div>
        <Button asChild>
          <Link href="/trips/new">
            <Plus className="mr-2 h-4 w-4" />
            Buat Perjalanan
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari perjalanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="planning">Perencanaan</SelectItem>
              <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
              <SelectItem value="ongoing">Berlangsung</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="cancelled">Dibatalkan</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Trips Grid/List */}
      {filteredTrips.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Plane className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery || statusFilter !== 'all'
                ? 'Tidak Ada Hasil'
                : 'Belum Ada Perjalanan'}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
              {searchQuery || statusFilter !== 'all'
                ? 'Coba ubah kata kunci pencarian atau filter'
                : 'Mulai buat perjalanan pertama Anda dan mulai lacak anggaran dengan mudah!'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button asChild>
                <Link href="/trips/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Perjalanan Baru
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="group"
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                  <Plane className="h-12 w-12 text-primary/50 group-hover:text-primary transition-colors" />
                  <Badge
                    variant={statusColors[trip.status]}
                    className="absolute top-3 right-3"
                  >
                    {statusLabels[trip.status]}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="truncate group-hover:text-primary transition-colors">
                    {trip.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {trip.destination_name || 'Destinasi belum ditentukan'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDateRange(trip.start_date, trip.end_date)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {getDaysBetween(trip.start_date, trip.end_date)} hari
                    </span>
                    {trip.budget && (
                      <span className="flex items-center gap-1 font-medium">
                        <Wallet className="h-3 w-3" />
                        {formatCurrency(trip.budget, trip.currency)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="block"
            >
              <Card className="transition-all hover:shadow-md hover:border-primary/50">
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Plane className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{trip.name}</h3>
                      <Badge variant={statusColors[trip.status]}>
                        {statusLabels[trip.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3" />
                      {trip.destination_name || 'Destinasi belum ditentukan'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateRange(trip.start_date, trip.end_date)}
                      </span>
                      <span>{getDaysBetween(trip.start_date, trip.end_date)} hari</span>
                    </div>
                  </div>
                  {trip.budget && (
                    <div className="text-right shrink-0">
                      <p className="text-sm text-muted-foreground">Anggaran</p>
                      <p className="font-semibold">
                        {formatCurrency(trip.budget, trip.currency)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
