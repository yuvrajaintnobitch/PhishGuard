"use client"

import { motion } from 'framer-motion'
import { Shield, ShieldAlert, AlertTriangle, Calendar, Database, FlaskConical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { BreachResult } from '@/types'

interface BreachResultProps {
  result: BreachResult
}

export function BreachResultDisplay({ result }: BreachResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Demo Mode Disclaimer */}
      {result.isDemo && (
        <Alert className="mb-4 border-amber-500/50 bg-amber-500/10">
          <FlaskConical className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-500">
            <strong>Demo Mode:</strong> Using sample data for demonstration. 
            Real breach data requires a{' '}
            <a 
              href="https://haveibeenpwned.com/API/Key" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-amber-400"
            >
              Have I Been Pwned API key
            </a>.
          </AlertDescription>
        </Alert>
      )}

      <Card className={`glass ${result.breached ? 'border-red-500/50' : 'border-green-500/50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {result.breached ? (
              <>
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <span className="text-red-500">Breaches Found!</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-green-500">No Breaches Found</span>
              </>
            )}
            {result.isDemo && (
              <Badge variant="outline" className="ml-2 text-amber-500 border-amber-500">
                Demo
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium">{result.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Breaches</p>
              <p className={`text-2xl font-bold ${result.breached ? 'text-red-500' : 'text-green-500'}`}>
                {result.breachCount}
              </p>
            </div>
          </div>

          {/* Breach List */}
          {result.breached && result.breaches.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Breach Details
                </h3>
                
                {result.breaches.map((breach, index) => (
                  <motion.div
                    key={breach.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-muted/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{breach.name}</h4>
                      <Badge variant="outline" className="bg-red-500/10 text-red-500">
                        Breached
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {breach.breachDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Database className="h-4 w-4" />
                        {breach.domain}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {breach.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {breach.dataClasses.map((dataClass) => (
                        <Badge key={dataClass} variant="secondary" className="text-xs">
                          {dataClass}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recommendations */}
              <Separator />
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h3 className="font-semibold text-amber-500 mb-2">Recommended Actions</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Change your password immediately for affected accounts</li>
                  <li>• Enable two-factor authentication (2FA)</li>
                  <li>• Check if you reused this password elsewhere</li>
                  <li>• Consider using a password manager</li>
                </ul>
              </div>
            </>
          )}

          {/* Safe Message */}
          {!result.breached && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <h3 className="font-semibold text-green-500 mb-2">Good News!</h3>
              <p className="text-sm text-muted-foreground">
                Your email was not found in any known data breaches. Keep practicing good security habits!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}