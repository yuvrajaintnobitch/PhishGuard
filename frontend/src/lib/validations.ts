import { z } from 'zod'

// Email validation
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

// URL validation
export const urlSchema = z.object({
  url: z
    .string()
    .min(1, 'URL is required')
    .refine(
      (val) => {
        try {
          new URL(val.startsWith('http') ? val : `https://${val}`)
          return true
        } catch {
          return false
        }
      },
      { message: 'Please enter a valid URL' }
    ),
})

// Email content validation
export const emailContentSchema = z.object({
  content: z
    .string()
    .min(10, 'Email content must be at least 10 characters')
    .max(50000, 'Email content is too long'),
})

// Domain validation
export const domainSchema = z.object({
  domain: z
    .string()
    .min(1, 'Domain is required')
    .refine(
      (val) => {
        const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
        return domainRegex.test(val)
      },
      { message: 'Please enter a valid domain (e.g., example.com)' }
    ),
})

// Password validation
export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .max(256, 'Password is too long'),
})

// Type exports
export type EmailFormData = z.infer<typeof emailSchema>
export type URLFormData = z.infer<typeof urlSchema>
export type EmailContentFormData = z.infer<typeof emailContentSchema>
export type DomainFormData = z.infer<typeof domainSchema>   
export type PasswordFormData = z.infer<typeof passwordSchema>