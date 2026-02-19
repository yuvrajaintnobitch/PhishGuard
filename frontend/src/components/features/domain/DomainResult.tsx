"use client"

import { motion } from 'framer-motion'
import { Shield, ShieldAlert, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ThreatScoreMeter } from '@/components/shared/ThreatScoreMeter'
import { RiskBadge } from '@/components/shared/RiskBadge'
import type { DomainCheckResult, DNSRecord } from '@/types'

interface DomainResultProps {
  result: DomainCheckResult
}

function DNSRecordCard({ name, record }: { name: string; record: DNSRecord }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${
        record.exists && record.valid
          ? 'bg-green-500/5 border-green-500/20'
          : !record.exists
          ? 'bg-red-500/5 border-red-500/20'
          : 'bg-amber-500/5 border-amber-500/20'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{name}</span>
        {record.exists && record.valid ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : !record.exists ? (
          <XCircle className="h-5 w-5 text-red-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        )}
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          Status:{' '}
          <span
            className={
              record.exists && record.valid
                ? 'text-green-500'
                : !record.exists
                ? 'text-red-500'
                : 'text-amber-500'
            }
          >
            {record.exists ? (record.valid ? 'Valid' : 'Invalid') : 'Not Found'}
          </span>
        </p>

        {record.record && (
          <p className="font-mono text-xs bg-muted/50 p-2 rounded mt-2 break-all">
            {record.record}
          </p>
        )}

        {record.issues.length > 0 && (
          <div className="mt-2 space-y-1">
            {record.issues.map((issue, i) => (
              <p key={i} className="text-amber-500 text-xs">
                ⚠ {issue}
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function DomainResultDisplay({ result }: DomainResultProps) {
  const allValid = result.spf.valid && result.dkim.valid && result.dmarc.valid

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Main Result Card */}
      <Card className={`glass ${allValid ? 'border-green-500/50' : 'border-amber-500/50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {allValid ? (
              <>
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-green-500">Domain Well Protected</span>
              </>
            ) : (
              <>
                <ShieldAlert className="h-5 w-5 text-amber-500" />
                <span className="text-amber-500">Security Issues Found</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Domain Display */}
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Domain</p>
            <p className="font-mono text-lg">{result.domain}</p>
          </div>

          {/* Score and Risk */}
          <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
            <ThreatScoreMeter score={result.score} size="lg" />
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Risk Level:</span>
                <RiskBadge level={result.riskLevel} />
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                {result.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DNS Records */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Email Authentication Records</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DNSRecordCard name="SPF" record={result.spf} />
          <DNSRecordCard name="DKIM" record={result.dkim} />
          <DNSRecordCard name="DMARC" record={result.dmarc} />
        </CardContent>
      </Card>

      {/* What These Mean */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>What These Records Mean</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">SPF</span>
            <span> — Specifies which servers can send email for this domain.</span>
          </div>
          <Separator />
          <div>
            <span className="font-semibold text-foreground">DKIM</span>
            <span> — Adds a digital signature to verify email authenticity.</span>
          </div>
          <Separator />
          <div>
            <span className="font-semibold text-foreground">DMARC</span>
            <span> — Policy for handling emails that fail SPF/DKIM checks.</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}