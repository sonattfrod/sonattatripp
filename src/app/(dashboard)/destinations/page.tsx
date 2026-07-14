'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Plus,
  Search,
  Star,
  ExternalLink,
  Filter,
  Globe,
  MapPinned,
} from 'lucide-react'

const popularDestinations = [
  { id: 1, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', rating: 4.9, trips: 234 },
  { id: 2, name: 'Tokyo', country: 'Jepang', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', rating: 4.8, trips: 189 },
  { id: 3, name: 'Paris', country: 'Prancis', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', rating: 4.7, trips: 156 },
  { id: 4, name: 'Yogyakarta', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', rating: 4.8, trips: 178 },
  { id: 5, name: 'Singapore', country: 'Singapura', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', rating: 4.6, trips: 145 },
  { id: 6, name: 'Labuan Bajo', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1598887142487-3c854d51eabb?w=800', rating: 4.9, trips: 98 },
]

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const filteredDestinations = popularDestinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Destinasi</h1>
          <p className="text-muted-foreground">
            Jelajahi destinasi menarik untuk perjalanan Anda
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari destinasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm">
          <Globe className="mr-2 h-4 w-4" />
          Semua
        </Button>
        <Button variant="outline" size="sm">
          Indonesia
        </Button>
        <Button variant="outline" size="sm">
          Asia
        </Button>
        <Button variant="outline" size="sm">
          Eropa
        </Button>
        <Button variant="outline" size="sm">
          Amerika
        </Button>
        <Button variant="outline" size="sm">
          Australia
        </Button>
      </div>

      {/* Popular Destinations */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Destinasi Populer</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((dest) => (
            <Card key={dest.id} className="overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8"
                  onClick={() => toggleFavorite(dest.id)}
                >
                  <Star
                    className={`h-4 w-4 ${favorites.includes(dest.id) ? 'fill-yellow-500 text-yellow-500' : ''}`}
                  />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{dest.name}</h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {dest.country}
                  </p>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      ⭐ {dest.rating}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {dest.trips} perjalanan
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/trips/new?destination=${dest.name}`}>
                      <Plus className="mr-2 h-4 w-4" />
                      Buat Trip
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MapPinned className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredDestinations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Destinasi Tidak Ditemukan</h3>
            <p className="text-sm text-muted-foreground text-center">
              Coba kata kunci pencarian yang berbeda.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
