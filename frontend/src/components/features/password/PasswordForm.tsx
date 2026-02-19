"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Search, Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { passwordSchema, type PasswordFormData } from '@/lib/validations'
import { checkPassword } from '@/lib/api'
import { useScanStore } from '@/store'
import type { PasswordCheckResult } from '@/types'
import { toast } from 'sonner'

interface PasswordFormProps {
  onResult: (result: PasswordCheckResult) => void
}

export function PasswordForm({ onResult }: PasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const addScan = useScanStore((state) => state.addScan)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true)
    try {
      const result = await checkPassword(data.password)
      onResult(result)

      // Convert risk level to score
      const riskScores = {
        safe: 10,
        low: 30,
        medium: 50,
        high: 75,
        critical: 95,
      }

      // Add to scan history (without storing actual password)
      addScan({
        id: crypto.randomUUID(),
        type: 'breach', // Reuse breach type
        input: '****** (password hidden)',
        riskLevel: result.riskLevel,
        score: riskScores[result.riskLevel as keyof typeof riskScores] || 50,
        timestamp: new Date(),
        details: { ...result, password: undefined }, // Don't store password
      })

      if (result.isPwned) {
        toast.error(`Password found in ${result.occurrenceCount} breaches!`)
      } else {
        toast.success('Password is safe!')
      }

      // Clear password field
      reset()
    } catch (error) {
      toast.error('Failed to check password. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-brand-500" />
          Check Password Security
        </CardTitle>
        <CardDescription>
          Check if your password has been exposed in data breaches.
          <span className="block mt-2 text-xs text-green-500">
            ✅ 100% Free • No API key required • Your password never leaves your device
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password to check"
                className="pl-10 pr-10"
                disabled={isLoading}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isLoading ? 'Checking...' : 'Check Password'}
          </Button>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>🔒 Your password is never sent to our servers.</p>
            <p>🔒 Uses k-anonymity — only a hash prefix is checked.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}