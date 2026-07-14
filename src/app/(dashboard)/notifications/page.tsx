'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Plane,
  Wallet,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
} from 'lucide-react'

const mockNotifications = [
  {
    id: 1,
    type: 'trip',
    title: 'Perjalanan ke Bali akan segera dimulai!',
    message: 'Perjalanan Anda ke Bali dijadwalkan dalam 3 hari. Pastikan semuanya sudah siap.',
    time: '2 jam lalu',
    isRead: false,
    icon: Plane,
    color: 'text-blue-500 bg-blue-100',
  },
  {
    id: 2,
    type: 'expense',
    title: 'Pengeluaran mendekati batas anggaran',
    message: 'Anda telah menggunakan 85% dari anggaran perjalanan ke Yogyakarta.',
    time: '5 jam lalu',
    isRead: false,
    icon: Wallet,
    color: 'text-orange-500 bg-orange-100',
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Reminder: Bayar Booking Hotel',
    message: 'Tagihan hotel untuk perjalanan ke Jakarta harus dibayar dalam 2 hari.',
    time: '1 hari lalu',
    isRead: true,
    icon: Calendar,
    color: 'text-purple-500 bg-purple-100',
  },
  {
    id: 4,
    type: 'system',
    title: 'Profil berhasil diperbarui',
    message: 'Informasi profil Anda telah berhasil diperbarui.',
    time: '3 hari lalu',
    isRead: true,
    icon: CheckCircle,
    color: 'text-green-500 bg-green-100',
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => !n.isRead).length

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const clearAll = () => {
    if (confirm('Hapus semua notifikasi?')) {
      setNotifications([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifikasi</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `Anda memiliki ${unreadCount} notifikasi belum dibaca`
              : 'Semua notifikasi sudah dibaca'}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Tandai Semua Dibaca
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" onClick={clearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Semua
            </Button>
          )}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Semua
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Belum Dibaca
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Bell className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {filter === 'unread' ? 'Tidak Ada Notifikasi Belum Dibaca' : 'Belum Ada Notifikasi'}
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              {filter === 'unread'
                ? 'Semua notifikasi sudah dibaca.'
                : 'Notifikasi akan muncul di sini.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon
            return (
              <Card
                key={notification.id}
                className={notification.isRead ? 'opacity-75' : ''}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${notification.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className={`font-semibold ${notification.isRead ? '' : 'text-primary'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                              title="Tandai sudah dibaca"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => deleteNotification(notification.id)}
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {!notification.isRead && (
                        <Badge variant="default" className="mt-2 text-xs">
                          Baru
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
