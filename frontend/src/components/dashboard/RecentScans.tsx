"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskBadge } from "@/components/shared/RiskBadge"
import { useScanStore } from "@/store"
import { formatDistanceToNow } from "date-fns"
import { Mail, Link2, Globe, FileText } from "lucide-react"

const scanTypeIcons = {
  breach: Mail,
  url: Link2,
  email: FileText,
  domain: Globe,
}

export function RecentScans() {
  const scans = useScanStore((state) => state.scans).slice(0, 5)

  if (scans.length === 0) {
    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No scans yet. Start by checking an email or URL above.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scans.map((scan) => {
          const Icon = scanTypeIcons[scan.type]
          return (
            <div
              key={scan.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{scan.input}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(scan.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <RiskBadge level={scan.riskLevel} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}