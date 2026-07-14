'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plane,
  PieChart,
  Calendar,
  Download,
  Filter,
} from 'lucide-react'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30')
  const [isLoading, setIsLoading] = useState(false)

  // Mock data
  const stats = {
    totalSpent: 15000000,
    avgDaily: 500000,
    topCategory: 'Transportasi',
    tripsCount: 5,
    monthlyData: [
      { month: 'Jan', amount: 2500000 },
      { month: 'Feb', amount: 3000000 },
      { month: 'Mar', amount: 2000000 },
      { month: 'Apr', amount: 3500000 },
      { month: 'Mei', amount: 4000000 },
      { month: 'Jun', amount: 1500000 },
    ],
    categoryBreakdown: [
      { name: 'Transportasi', amount: 4500000, percentage: 30, color: 'bg-blue-500' },
      { name: 'Akomodasi', amount: 3750000, percentage: 25, color: 'bg-purple-500' },
      { name: 'Makanan', amount: 3000000, percentage: 20, color: 'bg-orange-500' },
      { name: 'Aktivitas', amount: 2250000, percentage: 15, color: 'bg-green-500' },
      { name: 'Lainnya', amount: 1500000, percentage: 10, color: 'bg-gray-500' },
    ],
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
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
          <h1 className="text-3xl font-bold tracking-tight">Analitik</h1>
          <p className="text-muted-foreground">
            Lihat statistik dan tren pengeluaran perjalanan Anda
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Hari Terakhir</SelectItem>
              <SelectItem value="30">30 Hari Terakhir</SelectItem>
              <SelectItem value="90">90 Hari Terakhir</SelectItem>
              <SelectItem value="365">1 Tahun Terakhir</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12%</span> dari periode sebelumnya
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Harian</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.avgDaily)}</div>
            <p className="text-xs text-muted-foreground">
              Per hari
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategori Terbesar</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topCategory}</div>
            <p className="text-xs text-muted-foreground">
              30% dari total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Perjalanan</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tripsCount}</div>
            <p className="text-xs text-muted-foreground">
              Perjalanan tahun ini
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Bulanan</CardTitle>
            <CardDescription>Pengeluaran per bulan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {stats.monthlyData.map((data, index) => {
                const maxAmount = Math.max(...stats.monthlyData.map(d => d.amount))
                const height = (data.amount / maxAmount) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-t-md relative group">
                      <div
                        className="w-full bg-primary rounded-t-md transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatCurrency(data.amount)}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Pengeluaran</CardTitle>
            <CardDescription>Distribusi pengeluaran per kategori</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.categoryBreakdown.map((cat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(cat.amount)} ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
          <CardDescription>Daftar transaksi terakhir Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { desc: 'Tiket Pesawat Jakarta - Bali', amount: 2500000, date: '15 Jan 2024', category: 'Transportasi' },
              { desc: 'Hotel Kuta Beach', amount: 1800000, date: '14 Jan 2024', category: 'Akomodasi' },
              { desc: 'Makan Siang di Local Restaurant', amount: 150000, date: '14 Jan 2024', category: 'Makanan' },
              { desc: 'Tiket Masuk Museum', amount: 50000, date: '13 Jan 2024', category: 'Aktivitas' },
              { desc: 'Oleh-oleh', amount: 300000, date: '13 Jan 2024', category: 'Lainnya' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.desc}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.date} • {item.category}
                  </p>
                </div>
                <p className="font-semibold text-destructive">
                  -{formatCurrency(item.amount)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
