"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Mail, Globe, AlertTriangle, CheckCircle } from "lucide-react"

const floatingItems = [
  { icon: Shield, x: "10%", y: "20%", delay: 0, duration: 6 },
  { icon: Lock, x: "85%", y: "15%", delay: 1, duration: 7 },
  { icon: Mail, x: "75%", y: "70%", delay: 2, duration: 5 },
  { icon: Globe, x: "15%", y: "75%", delay: 0.5, duration: 8 },
  { icon: AlertTriangle, x: "90%", y: "45%", delay: 1.5, duration: 6 },
  { icon: CheckCircle, x: "5%", y: "50%", delay: 2.5, duration: 7 },
]

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-4 rounded-2xl glass-card border border-white/10">
            <item.icon className="h-6 w-6 text-brand-500/50" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}