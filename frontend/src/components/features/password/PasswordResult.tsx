"use client"

import { motion } from 'framer-motion'
import { Shield, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { RiskBadge } from '@/components/shared/RiskBadge'
import type { PasswordCheckResult } from '@/types'

interface PasswordResultProps {
  result: PasswordCheckResult
}

export function PasswordResultDisplay({ result }: PasswordResultProps) {
  // Calculate danger percentage (inverse of safety)
  const dangerPercentage = result.isPwned 
    ? Math.min((result.occurrenceCount / 1000) * 100, 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glass ${result.isPwned ? 'border-red-500/50' : 'border-green-500/50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {result.isPwned ? (
              <>
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <span className="text-red-500">Password Compromised!</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-green-500">Password is Safe</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Level */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <div className="mt-2">
                <RiskBadge level={result.riskLevel as any} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Times Seen</p>
              <p className={`text-3xl font-bold ${result.isPwned ? 'text-red-500' : 'text-green-500'}`}>
                {result.isPwned ? result.occurrenceCount.toLocaleString() : '0'}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className={`p-4 rounded-lg border ${
            result.isPwned 
              ? 'bg-red-500/10 border-red-500/20' 
              : 'bg-green-500/10 border-green-500/20'
          }`}>
            <p className={`text-sm ${result.isPwned ? 'text-red-500' : 'text-green-500'}`}>
              {result.message}
            </p>
          </div>

          {/* Occurrence Visualization */}
          {result.isPwned && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Danger Level</span>
                  <span className="font-medium">{Math.round(dangerPercentage)}%</span>
                </div>
                <Progress value={dangerPercentage} className="h-2" />
              </div>

              {/* Recommendations */}
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                  What You Should Do
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Change this password immediately on all accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Use a unique password for each account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Use a password manager to generate strong passwords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Enable two-factor authentication (2FA) everywhere</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* Safe message extras */}
          {!result.isPwned && (
            <>
              <Separator />
              <div className="text-sm text-muted-foreground space-y-2">
                <p>✅ This password has not appeared in any known data breaches.</p>
                <p>💡 Still, make sure to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Use different passwords for different accounts</li>
                  <li>Enable 2FA wherever possible</li>
                  <li>Consider using a password manager</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}