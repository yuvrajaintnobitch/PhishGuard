"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DomainForm } from "@/components/features/domain/DomainForm"
import { DomainResultDisplay } from "@/components/features/domain/DomainResult"
import { PageTransition } from "@/components/effects/PageTransition"
import { Globe, Shield, CheckCircle, XCircle } from "lucide-react"
import type { DomainCheckResult } from "@/types"

export default function DomainCheckerPage() {
  const [result, setResult] = useState<DomainCheckResult | null>(null)

  return (
    <PageTransition>
      <div className="space-y-8">
        <DashboardHeader
          title="Domain Health Checker"
          description="Verify SPF, DKIM, and DMARC records to check email authentication"
        />

        {/* Records Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { 
              name: "SPF", 
              fullName: "Sender Policy Framework",
              description: "Specifies which servers can send email for this domain",
              icon: Shield,
              gradient: "from-blue-500 to-cyan-500"
            },
            { 
              name: "DKIM", 
              fullName: "DomainKeys Identified Mail",
              description: "Adds a digital signature to verify email authenticity",
              icon: CheckCircle,
              gradient: "from-green-500 to-emerald-500"
            },
            { 
              name: "DMARC", 
              fullName: "Domain-based Message Authentication",
              description: "Policy for handling emails that fail authentication",
              icon: Shield,
              gradient: "from-purple-500 to-pink-500"
            },
          ].map((record, index) => (
            <motion.div
              key={record.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="group p-5 rounded-2xl glass-card border border-white/10 hover:border-brand-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${record.gradient} group-hover:scale-110 transition-transform`}>
                  <record.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">{record.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{record.fullName}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{record.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why It Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
        >
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-500" />
            Why Domain Security Matters
          </h3>
          <p className="text-sm text-muted-foreground">
            Without proper email authentication records, attackers can easily spoof emails from a domain, 
            making phishing attacks appear legitimate. Checking these records helps you verify if an email 
            sender can be trusted.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <DomainForm onResult={setResult} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {result ? (
              <DomainResultDisplay result={result} />
            ) : (
              <div className="h-full flex items-center justify-center p-8 rounded-2xl glass-card border border-white/10 border-dashed">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-muted/50 inline-block mb-4">
                    <Globe className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Check Any Domain</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Enter a domain name to verify its email authentication records and security configuration.
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