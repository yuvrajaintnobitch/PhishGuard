"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThreatScoreMeterProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

function getScoreColor(score: number): string {
  if (score <= 20) return "text-green-500"
  if (score <= 40) return "text-lime-500"
  if (score <= 60) return "text-amber-500"
  if (score <= 80) return "text-orange-500"
  return "text-red-500"
}

function getScoreGradient(score: number): string {
  if (score <= 20) return "from-green-500 to-emerald-500"
  if (score <= 40) return "from-lime-500 to-green-500"
  if (score <= 60) return "from-amber-500 to-yellow-500"
  if (score <= 80) return "from-orange-500 to-amber-500"
  return "from-red-500 to-orange-500"
}

function getRiskLevel(score: number): string {
  if (score <= 20) return "Safe"
  if (score <= 40) return "Low Risk"
  if (score <= 60) return "Medium Risk"
  if (score <= 80) return "High Risk"
  return "Critical"
}

const sizeConfig = {
  sm: { size: 100, stroke: 8, fontSize: "text-xl", labelSize: "text-xs" },
  md: { size: 140, stroke: 10, fontSize: "text-3xl", labelSize: "text-sm" },
  lg: { size: 180, stroke: 12, fontSize: "text-4xl", labelSize: "text-base" },
}

export function ThreatScoreMeter({ score, size = "md", showLabel = true }: ThreatScoreMeterProps) {
  const config = sizeConfig[size]
  const radius = (config.size - config.stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color = getScoreColor(score)
  const gradient = getScoreGradient(score)
  const riskLevel = getRiskLevel(score)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: config.size, height: config.size }}>
        {/* Glow Effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-30",
            `bg-gradient-to-br ${gradient}`
          )}
          style={{ transform: "scale(0.8)" }}
        />
        
        {/* Background circle */}
        <svg className="transform -rotate-90 relative z-10" width={config.size} height={config.size}>
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="none"
            className="text-muted/20"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={color.replace("text-", "stop-")} stopColor="currentColor" />
              <stop offset="100%" className={color.replace("text-", "stop-")} stopColor="currentColor" />
            </linearGradient>
          </defs>
          
          {/* Progress circle */}
          <motion.circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="none"
            strokeLinecap="round"
            className={color}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={cn("font-bold", config.fontSize, color)}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground -mt-1">/ 100</span>
        </div>
      </div>

      {showLabel && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <div className={cn(
            "inline-flex px-3 py-1 rounded-full text-xs font-semibold",
            `bg-gradient-to-r ${gradient} bg-opacity-10`,
            color
          )}
          style={{
            background: `linear-gradient(135deg, ${color.includes("green") ? "rgba(34, 197, 94, 0.1)" : color.includes("amber") ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)"} 0%, transparent 100%)`
          }}
          >
            {riskLevel}
          </div>
        </motion.div>
      )}
    </div>
  )
}