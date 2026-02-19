import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  gradient?: string
  className?: string
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  gradient = "from-brand-500 to-cyan-500",
  className 
}: StatCardProps) {
  return (
    <div className={cn(
      "group relative p-6 rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02]",
      className
    )}>
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
        gradient
      )} />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">{value}</p>
            {trend && (
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                trend.isPositive 
                  ? "bg-green-500/10 text-green-500" 
                  : "bg-red-500/10 text-red-500"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110",
          gradient
        )}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  )
}