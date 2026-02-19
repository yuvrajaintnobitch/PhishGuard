"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link2, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { urlSchema, type URLFormData } from '@/lib/validations'
import { scanURL } from '@/lib/api'
import { useScanStore } from '@/store'
import type { URLScanResult } from '@/types'
import { toast } from 'sonner'

interface URLFormProps {
  onResult: (result: URLScanResult) => void
}

export function URLForm({ onResult }: URLFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addScan = useScanStore((state) => state.addScan)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<URLFormData>({
    resolver: zodResolver(urlSchema),
  })

  const onSubmit = async (data: URLFormData) => {
    setIsLoading(true)
    try {
      const result = await scanURL(data.url)
      onResult(result)

      addScan({
        id: crypto.randomUUID(),
        type: 'url',
        input: data.url,
        riskLevel: result.riskLevel,
        score: result.score,
        timestamp: new Date(),
        details: result,
      })

      if (result.safe) {
        toast.success('URL appears to be safe!')
      } else {
        toast.warning('Potential threats detected!')
      }
    } catch (error) {
      toast.error('Failed to scan URL. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-brand-500" />
          Scan Suspicious URL
        </CardTitle>
        <CardDescription>
          Paste any suspicious link to check it against VirusTotal and Google Safe Browsing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                {...register('url')}
                type="text"
                placeholder="https://suspicious-link.com/path"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isLoading ? 'Scanning...' : 'Scan URL'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}