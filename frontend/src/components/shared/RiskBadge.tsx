import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { RiskLevel } from "@/store/scanStore"

interface RiskBadgeProps {
  level: RiskLevel
  className?: string
}

const riskConfig = {
  safe: {
    label: 'Safe',
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  low: {
    label: 'Low Risk',
    className: 'bg-lime-500/10 text-lime-500 border-lime-500/20',
  },
  medium: {
    label: 'Medium Risk',
    className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  high: {
    label: 'High Risk',
    className: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  critical: {
    label: 'Critical',
    className: 'bg-red-700/10 text-red-700 border-red-700/20',
  },
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const config = riskConfig[level]

  return (
    <Badge
      variant="outline"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  )
}