"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { emailContentSchema, type EmailContentFormData } from '@/lib/validations'
import { analyzeEmail } from '@/lib/api'
import { useScanStore } from '@/store'
import type { EmailAnalysisResult } from '@/types'
import { toast } from 'sonner'

interface EmailFormProps {
  onResult: (result: EmailAnalysisResult) => void
}

export function EmailForm({ onResult }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addScan = useScanStore((state) => state.addScan)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailContentFormData>({
    resolver: zodResolver(emailContentSchema),
  })

  const onSubmit = async (data: EmailContentFormData) => {
    setIsLoading(true)
    try {
      const result = await analyzeEmail(data.content)
      onResult(result)

      addScan({
        id: crypto.randomUUID(),
        type: 'email',
        input: data.content.substring(0, 50) + '...',
        riskLevel: result.riskLevel,
        score: result.score,
        timestamp: new Date(),
        details: result,
      })

      if (result.isPhishing) {
        toast.warning('Phishing indicators detected!')
      } else {
        toast.success('Email appears legitimate!')
      }
    } catch (error) {
      toast.error('Failed to analyze email. Please try again.')
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
          Analyze Email Content
        </CardTitle>
        <CardDescription>
          Paste the full email content including headers for AI-powered phishing detection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              {...register('content')}
              placeholder="Paste the suspicious email content here...

Example:
From: support@bank-secure.com
Subject: Urgent: Verify Your Account

Dear Customer,
We have detected suspicious activity..."
              className="min-h-[200px] font-mono text-sm"
              disabled={isLoading}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isLoading ? 'Analyzing...' : 'Analyze Email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}