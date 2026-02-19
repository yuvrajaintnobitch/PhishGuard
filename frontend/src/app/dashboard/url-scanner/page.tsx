"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { URLForm } from "@/components/features/url/URLForm"
import { URLResultDisplay } from "@/components/features/url/URLResult"
import { PageTransition } from "@/components/effects/PageTransition"
import { Link2, Shield, Globe, Zap } from "lucide-react"
import type { URLScanResult } from "@/types"

export default function URLScannerPage() {
  const [result, setResult] = useState<URLScanResult | null>(null)

  return (
    <PageTransition>
      <div className="space-y-8">
        <DashboardHeader
          title="URL Scanner"
          description="Scan suspicious links using VirusTotal and Google Safe Browsing"
        />

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { 
              icon: Globe, 
              title: "Multi-Engine Scan", 
              description: "Checked against 70+ security vendors",
              gradient: "from-blue-500 to-cyan-500"
            },
            { 
              icon: Zap, 
              title: "Real-Time Analysis", 
              description: "Get results in seconds",
              gradient: "from-amber-500 to-orange-500"
            },
            { 
              icon: Shield, 
              title: "Threat Detection", 
              description: "Malware, phishing, and more",
              gradient: "from-green-500 to-emerald-500"
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="group p-5 rounded-2xl glass-card border border-white/10 hover:border-brand-500/30 transition-all"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <URLForm onResult={setResult} />
          
          {result ? (
            <URLResultDisplay result={result} />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-12 rounded-2xl glass-card border border-white/10 border-dashed text-center"
            >
              <div className="p-4 rounded-full bg-muted/50 inline-block mb-4">
                <Link2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Ready to Scan</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Paste any URL above to check it against multiple security databases. 
                We'll analyze the link and provide a detailed threat assessment.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  )
}