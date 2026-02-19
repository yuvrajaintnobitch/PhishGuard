"use client"

import { motion } from "framer-motion"
import { Upload, Scan, Shield, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "1. Submit Your Data",
    description: "Enter an email, URL, domain, or paste email content.",
  },
  {
    icon: Scan,
    title: "2. AI Analysis",
    description: "Our AI scans using VirusTotal, Safe Browsing, and ML models.",
  },
  {
    icon: Shield,
    title: "3. Get Threat Score",
    description: "Receive an instant risk rating from Safe to Critical.",
  },
  {
    icon: CheckCircle,
    title: "4. Take Action",
    description: "Follow our recommendations to protect yourself.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">PhishGuard</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to comprehensive security analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-brand-500 to-transparent -translate-x-1/2" />
              )}
              
              <div className="glass p-6 rounded-2xl text-center relative z-10">
                <div className="inline-flex p-4 rounded-full bg-brand-500/10 text-brand-500 mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}