'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Settings,
  Bell,
  Lock,
  Moon,
  Globe,
  Shield,
  Key,
  Smartphone,
  Mail,
  Save,
  Loader2,
  AlertTriangle,
} from 'lucide-react'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    tripReminders: true,
    budgetAlerts: true,
    weeklyDigest: false,
    marketingEmails: false,
    darkMode: false,
    autoSave: true,
    twoFactor: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] })
    toast.success('Pengaturan berhasil disimpan!')
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success('Semua pengaturan berhasil disimpan!')
  }

  const handleChangePassword = () => {
    toast.info('Fitur ubah password akan segera hadir!')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola preferensi dan pengaturan akun Anda
        </p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifikasi
          </CardTitle>
          <CardDescription>
            Atur bagaimana Anda menerima notifikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Notifikasi Email</p>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi via email
                </p>
              </div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi di browser
                </p>
              </div>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Pengingat Perjalanan</p>
                <p className="text-sm text-muted-foreground">
                  Notifikasi sebelum perjalanan dimulai
                </p>
              </div>
            </div>
            <Switch
              checked={settings.tripReminders}
              onCheckedChange={() => handleToggle('tripReminders')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Peringatan Anggaran</p>
                <p className="text-sm text-muted-foreground">
                  Notifikasi saat hampir melebihi budget
                </p>
              </div>
            </div>
            <Switch
              checked={settings.budgetAlerts}
              onCheckedChange={() => handleToggle('budgetAlerts')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Tampilan
          </CardTitle>
          <CardDescription>
            Atur tampilan aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Moon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Mode Gelap</p>
                <p className="text-sm text-muted-foreground">
                  Aktifkan tema gelap
                </p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Simpan Otomatis</p>
                <p className="text-sm text-muted-foreground">
                  Simpan perubahan secara otomatis
                </p>
              </div>
            </div>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={() => handleToggle('autoSave')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Keamanan
          </CardTitle>
          <CardDescription>
            Kelola pengaturan keamanan akun
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Ubah Password</p>
                <p className="text-sm text-muted-foreground">
                  Perbarui password akun Anda
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleChangePassword}>
              Ubah
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Key className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Tambahkan lapisan keamanan ekstra
                </p>
              </div>
            </div>
            <Switch
              checked={settings.twoFactor}
              onCheckedChange={() => handleToggle('twoFactor')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Zona Berbahaya
          </CardTitle>
          <CardDescription>
            Tindakan di bawah ini tidak dapat dibatalkan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hapus Semua Data</p>
              <p className="text-sm text-muted-foreground">
                Hapus semua data dan akun Anda secara permanen
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Hapus Akun
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  )
}
