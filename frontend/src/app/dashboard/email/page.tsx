"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { EmailForm } from "@/components/features/email/EmailForm"
import { EmailResultDisplay } from "@/components/features/email/EmailResult"
import { PageTransition } from "@/components/effects/PageTransition"
import { Mail, Brain, Shield, Sparkles } from "lucide-react"
import type { EmailAnalysisResult } from "@/types"

export default function EmailAnalyzerPage() {
  const [result, setResult] = useState<EmailAnalysisResult | null>(null)

  return (
    <PageTransition>
      <div className="space-y-8">
        <DashboardHeader
          title="Email Content Analyzer"
          description="AI-powered phishing detection for email content"
        />

        {/* AI Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-pink-500/10 border border-brand-500/20"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
          
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">AI-Powered Analysis</h3>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-500/20 to-purple-500/20 text-xs font-medium text-brand-400 border border-brand-500/30">
                  <Sparkles className="h-3 w-3 inline mr-1" />
                  Advanced
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Our AI analyzes email patterns, language, links, and headers to detect sophisticated phishing attempts.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { step: "1", label: "Paste Email", description: "Copy the suspicious email content" },
            { step: "2", label: "AI Analysis", description: "Our AI scans for red flags" },
            { step: "3", label: "Get Results", description: "Receive detailed breakdown" },
            { step: "4", label: "Stay Safe", description: "Follow our recommendations" },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative p-4 rounded-xl glass-card border border-white/10"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                {item.step}
              </div>
              <div className="pt-2">
                <h4 className="font-semibold mb-1">{item.label}</h4>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <EmailForm onResult={setResult} />
          
          {result ? (
            <EmailResultDisplay result={result} />
          ) : (
            <div className="p-12 rounded-2xl glass-card border border-white/10 border-dashed text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-brand-500/10 to-purple-500/10 inline-block mb-4">
                <Mail className="h-8 w-8 text-brand-500" />
              </div>
              <h3 className="font-semibold mb-2">Analyze Any Email</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Paste the full email content including headers for the most accurate analysis. 
                Our AI will identify phishing indicators and explain each red flag.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  )
}