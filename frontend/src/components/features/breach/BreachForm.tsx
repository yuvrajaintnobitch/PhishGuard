"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { emailSchema, type EmailFormData } from '@/lib/validations'
import { checkBreach } from '@/lib/api'
import { useScanStore } from '@/store'
import type { BreachResult } from '@/types'
import { toast } from 'sonner'

interface BreachFormProps {
  onResult: (result: BreachResult) => void
}

export function BreachForm({ onResult }: BreachFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addScan = useScanStore((state) => state.addScan)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true)
    try {
      const result = await checkBreach(data.email)
      onResult(result)

      // Add to scan history
      addScan({
        id: crypto.randomUUID(),
        type: 'breach',
        input: data.email,
        riskLevel: result.breached ? 'high' : 'safe',
        score: result.breached ? 80 : 10,
        timestamp: new Date(),
        details: result,
      })

      if (result.breached) {
        toast.warning(`Found in ${result.breachCount} breach(es)!`)
      } else {
        toast.success('No breaches found!')
      }
    } catch (error) {
      toast.error('Failed to check breach. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-brand-500" />
          Check Email Breach
        </CardTitle>
        <CardDescription>
          Enter your email to check if it has been exposed in any known data breaches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isLoading ? 'Checking...' : 'Check Breaches'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}