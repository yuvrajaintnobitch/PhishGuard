"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ 
  children, 
  className, 
  delay = 0,
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? { 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.2 }
      } : undefined}
      className={cn(
        "glass-card rounded-2xl transition-shadow duration-300",
        hover && "hover:shadow-glow cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  )
}