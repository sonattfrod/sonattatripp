'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Camera,
  Save,
  Loader2,
} from 'lucide-react'

interface ProfileFormData {
  full_name: string
  phone: string
  timezone: string
  language: string
  preferred_currency: string
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  // Mock user data
  const mockUser = {
    email: 'user@example.com',
    profile: {
      full_name: 'John Doe',
      phone: '+6281234567890',
      avatar_url: null,
      timezone: 'Asia/Jakarta',
      language: 'id',
      preferred_currency: 'IDR',
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      full_name: mockUser.profile.full_name,
      phone: mockUser.profile.phone,
      timezone: mockUser.profile.timezone,
      language: mockUser.profile.language,
      preferred_currency: mockUser.profile.preferred_currency,
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Profil berhasil diperbarui!')
    } catch (error) {
      toast.error('Gagal memperbarui profil')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = () => {
    toast.info('Fitur upload avatar akan segera hadir!')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
        <p className="text-muted-foreground">
          Kelola informasi profil Anda
        </p>
      </div>

      {/* Avatar Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-2xl">
                  {mockUser.profile.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={handleAvatarChange}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{mockUser.profile.full_name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {mockUser.email}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Bergabung sejak January 2024
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informasi Pribadi
          </CardTitle>
          <CardDescription>
            Perbarui informasi pribadi Anda di sini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="full_name"
                    className="pl-9"
                    {...register('full_name')}
                  />
                </div>
                {errors.full_name && (
                  <p className="text-xs text-destructive">{errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-9"
                    placeholder="+6281234567890"
                    {...register('phone')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Waktu</Label>
                <Select
                  defaultValue={watch('timezone')}
                  onValueChange={(value) => setValue('timezone', value)}
                >
                  <SelectTrigger>
                    <Globe className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Pilih zona waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">Jakarta (GMT+7)</SelectItem>
                    <SelectItem value="Asia/Makassar">Makassar (GMT+8)</SelectItem>
                    <SelectItem value="Asia/Jayapura">Jayapura (GMT+9)</SelectItem>
                    <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <Select
                  defaultValue={watch('language')}
                  onValueChange={(value) => setValue('language', value)}
                >
                  <SelectTrigger>
                    <Globe className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferred_currency">Mata Uang Pilihan</Label>
              <Select
                defaultValue={watch('preferred_currency')}
                onValueChange={(value) => setValue('preferred_currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mata uang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IDR">IDR - Rupiah Indonesia</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
