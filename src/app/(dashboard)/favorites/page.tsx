'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Star,
  MapPin,
  Calendar,
  Trash2,
  ExternalLink,
  Plane,
} from 'lucide-react'

const mockFavorites = [
  {
    id: 1,
    name: 'Pura Tanah Lot',
    location: 'Bali, Indonesia',
    type: 'Wisata',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    addedAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Candi Borobudur',
    location: 'Yogyakarta, Indonesia',
    type: 'Sejarah',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    addedAt: '2024-01-10',
  },
  {
    id: 3,
    name: 'Mount Bromo',
    location: 'Jawa Timur, Indonesia',
    type: 'Alam',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800',
    addedAt: '2024-01-05',
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = (id: number) => {
    if (confirm('Hapus dari favorit?')) {
      setFavorites(favorites.filter(f => f.id !== id))
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Favorit</h1>
        <p className="text-muted-foreground">
          Tempat dan destinasi favorit Anda
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="text-sm">
          <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
          {favorites.length} Favorit
        </Badge>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Star className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Belum Ada Favorit</h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
              Tambahkan destinasi favorit Anda dengan mengklik icon bintang.
            </p>
            <Button asChild>
              <Link href="/destinations">
                <MapPin className="mr-2 h-4 w-4" />
                Jelajahi Destinasi
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative aspect-video">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8"
                  onClick={() => handleRemove(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <Badge className="absolute bottom-3 left-3">
                  {item.type}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Ditambahkan {new Date(item.addedAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/trips/new?destination=${encodeURIComponent(item.name)}`}>
                      <Plane className="mr-2 h-4 w-4" />
                      Buat Trip
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
