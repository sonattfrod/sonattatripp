import * as React from 'react'
import { z } from 'zod'

export const tripSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama perjalanan minimal 2 karakter' })
    .max(100, { message: 'Nama perjalanan maksimal 100 karakter' }),
  destination_name: z
    .string()
    .min(2, { message: 'Destinasi minimal 2 karakter' }),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  budget: z
    .number()
    .min(0, { message: 'Anggaran tidak boleh negatif' })
    .optional(),
  currency: z.string().default('IDR'),
  notes: z.string().optional(),
  status: z.enum(['draft', 'planning', 'confirmed', 'ongoing', 'completed', 'cancelled']).optional(),
})

export type TripFormData = z.infer<typeof tripSchema>
