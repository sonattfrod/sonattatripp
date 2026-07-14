import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(1, { message: 'Password wajib diisi' })
    .min(6, { message: 'Password minimal 6 karakter' }),
})

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Nama minimal 2 karakter' })
    .max(100, { message: 'Nama maksimal 100 karakter' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(1, { message: 'Password wajib diisi' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .regex(/[A-Z]/, { message: 'Password harus mengandung huruf besar' })
    .regex(/[a-z]/, { message: 'Password harus mengandung huruf kecil' })
    .regex(/[0-9]/, { message: 'Password harus mengandung angka' }),
  confirmPassword: z.string().min(1, { message: 'Konfirmasi password wajib diisi' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password wajib diisi' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .regex(/[A-Z]/, { message: 'Password harus mengandung huruf besar' })
    .regex(/[a-z]/, { message: 'Password harus mengandung huruf kecil' })
    .regex(/[0-9]/, { message: 'Password harus mengandung angka' }),
  confirmPassword: z.string().min(1, { message: 'Konfirmasi password wajib diisi' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
