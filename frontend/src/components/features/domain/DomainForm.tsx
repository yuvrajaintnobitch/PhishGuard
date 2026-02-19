"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Globe, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { domainSchema, type DomainFormData } from '@/lib/validations'
import { checkDomain } from '@/lib/api'
import { useScanStore } from '@/store'
import type { DomainCheckResult } from '@/types'
import { toast } from 'sonner'

interface DomainFormProps {
  onResult: (result: DomainCheckResult) => void
}

export function DomainForm({ onResult }: DomainFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addScan = useScanStore((state) => state.addScan)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DomainFormData>({
    resolver: zodResolver(domainSchema),
  })

  const onSubmit = async (data: DomainFormData) => {
    setIsLoading(true)
    try {
      const result = await checkDomain(data.domain)
      onResult(result)

      addScan({
        id: crypto.randomUUID(),
        type: 'domain',
        input: data.domain,
        riskLevel: result.riskLevel,
        score: result.score,
        timestamp: new Date(),
        details: result,
      })

      if (result.score <= 40) {
        toast.success('Domain has good security configuration!')
      } else {
        toast.warning('Domain has security issues.')
      }
    } catch (error) {
      toast.error('Failed to check domain. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-brand-500" />
          Check Domain Security
        </CardTitle>
        <CardDescription>
          Verify SPF, DKIM, and DMARC records to check if a domain can be spoofed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                {...register('domain')}
                type="text"
                placeholder="example.com"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            {errors.domain && (
              <p className="text-sm text-red-500">{errors.domain.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isLoading ? 'Checking...' : 'Check Domain'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}