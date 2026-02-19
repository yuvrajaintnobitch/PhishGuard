"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-12 rounded-3xl text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent" />
          
          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-full bg-brand-500/10 text-brand-500 mb-6">
              <Shield className="h-8 w-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Protect Yourself</span>?
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PhishGuard to keep them safe from phishing attacks.
              Start scanning for free — no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/dashboard">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}