"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { BreachForm } from "@/components/features/breach/BreachForm"
import { BreachResultDisplay } from "@/components/features/breach/BreachResult"
import { PageTransition } from "@/components/effects/PageTransition"
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"
import type { BreachResult } from "@/types"

export default function BreachCheckerPage() {
  const [result, setResult] = useState<BreachResult | null>(null)

  return (
    <PageTransition>
      <div className="space-y-8">
        <DashboardHeader
          title="Email Breach Checker"
          description="Check if your email has been compromised in known data breaches"
        />

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-brand-500/20">
              <Info className="h-5 w-5 text-brand-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">How it works</h3>
              <p className="text-sm text-muted-foreground">
                We check your email against databases of known data breaches to see if your credentials have been exposed. 
                Your email is never stored and all checks are performed securely.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: Shield, label: "Breaches Monitored", value: "500+", color: "text-brand-500", bg: "bg-brand-500/10" },
            { icon: AlertTriangle, label: "Records Exposed", value: "12B+", color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: CheckCircle, label: "Checks Today", value: "1M+", color: "text-green-500", bg: "bg-green-500/10" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 rounded-xl glass-card border border-white/10 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <BreachForm onResult={setResult} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {result ? (
              <BreachResultDisplay result={result} />
            ) : (
              <div className="h-full flex items-center justify-center p-8 rounded-2xl glass-card border border-white/10 border-dashed">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-muted/50 inline-block mb-4">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">No Results Yet</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Enter your email address to check if it has been involved in any known data breaches.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}