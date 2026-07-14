'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, Plane, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { createClient } from '@/lib/supabase/client'

const passwordRequirements = [
  { id: 'length', label: 'Minimal 8 karakter', test: (p: string) => p.length >= 8 },
  { id: 'upper', label: 'Huruf besar (A-Z)', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lower', label: 'Huruf kecil (a-z)', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'Angka (0-9)', test: (p: string) => /\d/.test(p) },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password', '')

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Akun berhasil dibuat! Silakan login.')
      router.push('/login')
    } catch (error) {
      toast.error('Terjadi kesalahan saat membuat akun')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Sonattatrip</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Buat Akun</CardTitle>
            <CardDescription className="text-center">
              Daftar gratis dan mulai rencanakan perjalanan Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  {...register('fullName')}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className="pr-10"
                    aria-invalid={!!errors.password}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              {password && (
                <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Password harus mengandung:
                  </p>
                  <div className="space-y-1">
                    {passwordRequirements.map((req) => (
                      <div
                        key={req.id}
                        className={`flex items-center gap-2 text-xs ${
                          req.test(password) ? 'text-green-600' : 'text-muted-foreground'
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 ${
                            req.test(password) ? 'opacity-100' : 'opacity-30'
                          }`}
                        />
                        {req.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Daftar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Masuk
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
