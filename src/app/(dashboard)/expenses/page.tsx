'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/types/database'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Wallet,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Plane,
  Utensils,
  Home,
  ShoppingBag,
  Ticket,
  Phone,
  MoreHorizontal,
  CreditCard,
} from 'lucide-react'

type Expense = Tables<'expenses'>
type Trip = Tables<'trips'>

const categoryIcons: Record<string, any> = {
  transportation: Plane,
  accommodation: Home,
  food: Utensils,
  shopping: ShoppingBag,
  activities: Ticket,
  communication: Phone,
  other: CreditCard,
}

const categoryLabels: Record<string, string> = {
  transportation: 'Transportasi',
  accommodation: 'Akomodasi',
  food: 'Makanan',
  shopping: 'Belanja',
  activities: 'Aktivitas',
  communication: 'Komunikasi',
  other: 'Lainnya',
}

const categoryColors: Record<string, string> = {
  transportation: 'bg-blue-100 text-blue-700',
  accommodation: 'bg-purple-100 text-purple-700',
  food: 'bg-orange-100 text-orange-700',
  shopping: 'bg-pink-100 text-pink-700',
  activities: 'bg-green-100 text-green-700',
  communication: 'bg-cyan-100 text-cyan-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [tripFilter, setTripFilter] = useState<string>('all')
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Fetch trips
        const { data: tripsData } = await supabase
          .from('trips')
          .select('*')
          .eq('created_by', user.id)
        setTrips(tripsData || [])

        // Fetch expenses
        const { data: expensesData } = await supabase
          .from('expenses')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
        setExpenses(expensesData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.merchant_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter
    const matchesTrip = tripFilter === 'all' || expense.trip_id === tripFilter
    return matchesSearch && matchesCategory && matchesTrip
  })

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pengeluaran ini?')) return

    try {
      await supabase.from('expenses').delete().eq('id', id)
      setExpenses(expenses.filter(e => e.id !== id))
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-32" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengeluaran</h1>
          <p className="text-muted-foreground">
            Kelola semua pengeluaran perjalanan Anda
          </p>
        </div>
        <Button asChild>
          <Link href="/expenses/new">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengeluaran
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalExpenses, 'IDR')}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredExpenses.length} transaksi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata per Transaksi</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0,
                'IDR'
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Per transaksi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perjalanan Aktif</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trips.length}</div>
            <p className="text-xs text-muted-foreground">
              Perjalanan dengan pengeluaran
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter & Pencarian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pengeluaran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="transportation">Transportasi</SelectItem>
                <SelectItem value="accommodation">Akomodasi</SelectItem>
                <SelectItem value="food">Makanan</SelectItem>
                <SelectItem value="shopping">Belanja</SelectItem>
                <SelectItem value="activities">Aktivitas</SelectItem>
                <SelectItem value="communication">Komunikasi</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tripFilter} onValueChange={setTripFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Perjalanan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Perjalanan</SelectItem>
                {trips.map((trip) => (
                  <SelectItem key={trip.id} value={trip.id}>
                    {trip.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Pengeluaran</CardTitle>
              <CardDescription>
                {filteredExpenses.length} pengeluaran ditemukan
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Wallet className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Belum Ada Pengeluaran</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Tambahkan pengeluaran pertama Anda untuk mulai melacak budget perjalanan.
              </p>
              <Button asChild>
                <Link href="/expenses/new">Tambah Pengeluaran</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Perjalanan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                    <TableHead className="w-[70px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => {
                    const Icon = categoryIcons[expense.category] || CreditCard
                    const trip = trips.find(t => t.id === expense.trip_id)
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${categoryColors[expense.category]}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-medium">
                              {categoryLabels[expense.category]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            {expense.merchant_name && (
                              <p className="text-xs text-muted-foreground">
                                {expense.merchant_name}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {trip?.name || '-'}
                        </TableCell>
                        <TableCell>
                          {new Date(expense.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(expense.amount, expense.currency)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(expense.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
