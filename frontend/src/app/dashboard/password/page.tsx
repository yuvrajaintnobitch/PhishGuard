"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { PasswordForm } from "@/components/features/password/PasswordForm"
import { PasswordResultDisplay } from "@/components/features/password/PasswordResult"
import { PageTransition } from "@/components/effects/PageTransition"
import { KeyRound, Shield, Lock, Eye } from "lucide-react"
import type { PasswordCheckResult } from "@/types"

export default function PasswordCheckerPage() {
  const [result, setResult] = useState<PasswordCheckResult | null>(null)

  return (
    <PageTransition>
      <div className="space-y-8">
        <DashboardHeader
          title="Password Security Checker"
          description="Check if your password has been exposed in data breaches"
        />

        {/* Privacy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-green-500/20">
              <Lock className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                100% Private & Secure
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-xs font-medium text-green-500">
                  k-anonymity
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Your password <strong>never leaves your device</strong>. We use a technique called k-anonymity — 
                only the first 5 characters of your password's hash are sent to check against breach databases. 
                The actual password cannot be reconstructed from this.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { 
              icon: KeyRound, 
              title: "Enter Password", 
              description: "Type the password you want to check",
              gradient: "from-brand-500 to-cyan-500"
            },
            { 
              icon: Shield, 
              title: "Secure Check", 
              description: "Hash is checked against 600M+ breached passwords",
              gradient: "from-purple-500 to-pink-500"
            },
            { 
              icon: Eye, 
              title: "Get Results", 
              description: "See if your password has been compromised",
              gradient: "from-amber-500 to-orange-500"
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group p-5 rounded-2xl glass-card border border-white/10 hover:border-brand-500/30 transition-all"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${step.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <step.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PasswordForm onResult={setResult} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {result ? (
              <PasswordResultDisplay result={result} />
            ) : (
              <div className="h-full flex items-center justify-center p-8 rounded-2xl glass-card border border-white/10 border-dashed">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-muted/50 inline-block mb-4">
                    <KeyRound className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Check Password Security</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Enter any password to check if it has appeared in known data breaches. 
                    Your privacy is guaranteed.
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