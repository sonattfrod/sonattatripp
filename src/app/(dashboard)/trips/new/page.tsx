'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/client'
import { tripSchema, type TripFormData } from '@/lib/validations/trip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ArrowLeft, CalendarIcon, Loader2, MapPin, Plane } from 'lucide-react'

export default function NewTripPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: '',
      destination_name: '',
      currency: 'IDR',
      budget: 0,
      notes: '',
    },
  })

  const onSubmit = async (data: TripFormData) => {
    if (!startDate || !endDate) {
      toast.error('Silakan pilih tanggal perjalanan')
      return
    }

    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: trip, error } = await supabase
        .from('trips')
        .insert({
          name: data.name,
          destination_name: data.destination_name,
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          budget: data.budget,
          currency: data.currency,
          notes: data.notes,
          status: 'planning',
          created_by: user.id,
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Perjalanan berhasil dibuat!')
      router.push(`/trips/${trip.id}`)
    } catch (error) {
      console.error('Error creating trip:', error)
      toast.error('Gagal membuat perjalanan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/trips">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Buat Perjalanan Baru</h1>
          <p className="text-muted-foreground">
            Rencanakan perjalanan impian Anda
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Detail Perjalanan
          </CardTitle>
          <CardDescription>
            Isi informasi dasar untuk perjalanan Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Trip Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Perjalanan *</Label>
              <Input
                id="name"
                placeholder="Liburan ke Bali"
                {...register('name')}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination_name">Destinasi *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination_name"
                  placeholder="Bali, Indonesia"
                  className="pl-9"
                  {...register('destination_name')}
                  aria-invalid={!!errors.destination_name}
                />
              </div>
              {errors.destination_name && (
                <p className="text-xs text-destructive">{errors.destination_name.message}</p>
              )}
            </div>

            {/* Date Range */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tanggal Mulai *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, 'PPP', { locale: id })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date)
                        if (date && (!endDate || date > endDate)) {
                          setEndDate(date)
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Tanggal Selesai *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !endDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, 'PPP', { locale: id })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < (startDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Budget & Currency */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget">Anggaran</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000000"
                  {...register('budget', { valueAsNumber: true })}
                  aria-invalid={!!errors.budget}
                />
                {errors.budget && (
                  <p className="text-xs text-destructive">{errors.budget.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Mata Uang</Label>
                <Select
                  value={watch('currency')}
                  onValueChange={(value) => setValue('currency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata uang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDR">IDR - Rupiah Indonesia</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                    <SelectItem value="MYR">MYR - Malaysian Ringgit</SelectItem>
                    <SelectItem value="THB">THB - Thai Baht</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                placeholder="Catatan atau detail tambahan tentang perjalanan..."
                rows={4}
                {...register('notes')}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/trips">Batal</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Buat Perjalanan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
