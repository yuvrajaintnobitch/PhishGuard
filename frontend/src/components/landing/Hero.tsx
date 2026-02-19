"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight, Shield, Zap, Lock, Play, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ParticleBackground } from "@/components/effects/ParticleBackground"
import { AnimatedText } from "@/components/effects/AnimatedText"
import { MagneticButton } from "@/components/effects/MagneticButton"

const stats = [
  { value: "3.4B", label: "Phishing Emails Daily", icon: "📧" },
  { value: "91%", label: "Attacks Start with Phishing", icon: "🎯" },
  { value: "100%", label: "Free to Use", icon: "✨" },
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      {mounted && <ParticleBackground />}

      {/* Gradient Orbs - Repositioned to not block content */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient" />

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center space-y-8">
          
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card border border-brand-500/30 backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered Cybersecurity Platform
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-500/20 to-purple-500/20 text-xs font-semibold text-brand-400 border border-brand-500/30">
                FREE
              </span>
            </div>
          </motion.div>

          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Detect
              </motion.span>
              <motion.span 
                className="block gradient-text"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <AnimatedText 
                  strings={["Phishing", "Malware", "Breaches", "Threats"]}
                />
              </motion.span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Before It Strikes
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            The ultimate security toolkit. Scan URLs, analyze emails, check breaches, 
            and verify domains — all powered by AI, all completely free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <MagneticButton>
              <Link href="/register">
                <motion.div 
                  className="h-14 px-8 inline-flex items-center justify-center gap-2 text-base font-semibold rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-shadow group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Scanning Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a href="#features">
                <motion.div 
                  className="h-14 px-8 inline-flex items-center justify-center gap-2 text-base font-semibold rounded-2xl glass-card border border-white/20 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="h-5 w-5 text-brand-500" />
                  See How It Works
                </motion.div>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6"
          >
            {[
              { icon: Shield, text: "No Credit Card" },
              { icon: Lock, text: "100% Private" },
              { icon: Zap, text: "Instant Results" },
            ].map((item, index) => (
              <motion.div 
                key={item.text} 
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <div className="p-1.5 rounded-lg bg-brand-500/10">
                  <item.icon className="h-3.5 w-3.5 text-brand-500" />
                </div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl glass-card border border-white/10 hover:border-brand-500/30 transition-all text-center cursor-default"
              >
                <span className="text-3xl mb-3 block">{stat.icon}</span>
                <div className="text-3xl sm:text-4xl font-bold gradient-text-static mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#features"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.a>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
    </section>
  )
}