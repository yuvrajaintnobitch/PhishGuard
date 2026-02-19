"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThreatScoreMeter } from "@/components/shared/ThreatScoreMeter"
import { useScanStore } from "@/store"

export function ThreatScoreCard() {
  const scans = useScanStore((state) => state.scans)

  // Calculate average threat score
  const averageScore = scans.length > 0
    ? Math.round(scans.reduce((sum, scan) => sum + scan.score, 0) / scans.length)
    : 0

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Overall Threat Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <ThreatScoreMeter score={averageScore} size="lg" />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Based on {scans.length} recent scan{scans.length !== 1 ? 's' : ''}
        </p>
      </CardContent>
    </Card>
  )
}