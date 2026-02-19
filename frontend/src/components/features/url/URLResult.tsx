"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Globe,
  Server,
  Clock,
  FileText,
  Link2,
  ChevronRight,
  Copy,
  ExternalLink,
  Info,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreatScoreMeter } from "@/components/shared/ThreatScoreMeter"
import { RiskBadge } from "@/components/shared/RiskBadge"
import type { URLScanResult } from "@/types"
import { toast } from "sonner"

interface URLResultProps {
  result: URLScanResult
}

const scannerIcons = {
  clean: <CheckCircle className="h-4 w-4 text-green-500" />,
  malicious: <XCircle className="h-4 w-4 text-red-500" />,
  suspicious: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  unknown: <HelpCircle className="h-4 w-4 text-muted-foreground" />,
}

const scannerColors = {
  clean: "bg-green-500/10 border-green-500/20 text-green-500",
  malicious: "bg-red-500/10 border-red-500/20 text-red-500",
  suspicious: "bg-amber-500/10 border-amber-500/20 text-amber-500",
  unknown: "bg-muted/50 border-border text-muted-foreground",
}

export function URLResultDisplay({ result }: URLResultProps) {
  const [activeTab, setActiveTab] = useState("detection")
  
  const cleanCount = result.scanners.filter(s => s.result === "clean").length
  const maliciousCount = result.scanners.filter(s => s.result === "malicious").length
  const suspiciousCount = result.scanners.filter(s => s.result === "suspicious").length
  const totalScanners = result.scanners.length

  const detectionRatio = maliciousCount + suspiciousCount
  const detectionPercentage = totalScanners > 0 ? (detectionRatio / totalScanners) * 100 : 0

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Score Card */}
      <Card className={`glass-card overflow-hidden ${
        result.safe ? "border-green-500/30" : "border-red-500/30"
      }`}>
        {/* Header Banner */}
        <div className={`p-6 ${
          result.safe 
            ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10" 
            : "bg-gradient-to-r from-red-500/10 to-orange-500/10"
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Score Circle */}
            <div className="flex justify-center lg:justify-start">
              <ThreatScoreMeter score={result.score} size="lg" />
            </div>

            {/* URL Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                {result.safe ? (
                  <Shield className="h-8 w-8 text-green-500 shrink-0" />
                ) : (
                  <ShieldAlert className="h-8 w-8 text-red-500 shrink-0" />
                )}
                <div className="min-w-0">
                  <h2 className={`text-2xl font-bold ${
                    result.safe ? "text-green-500" : "text-red-500"
                  }`}>
                    {result.safe ? "No Threats Detected" : "Threats Detected!"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.safe 
                      ? "This URL appears to be safe based on our analysis"
                      : `${detectionRatio} security vendor(s) flagged this URL`
                    }
                  </p>
                </div>
              </div>

              {/* URL Display */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-background/50 backdrop-blur">
                <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                <code className="text-sm font-mono flex-1 truncate">{result.url}</code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 shrink-0"
                  onClick={() => copyToClipboard(result.url)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 shrink-0"
                  onClick={() => window.open(result.url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex lg:flex-col gap-4 lg:gap-2 justify-center lg:text-right">
              <div>
                <p className="text-2xl font-bold">{cleanCount}/{totalScanners}</p>
                <p className="text-xs text-muted-foreground">Clean</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-500">{maliciousCount}</p>
                <p className="text-xs text-muted-foreground">Malicious</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-500">{suspiciousCount}</p>
                <p className="text-xs text-muted-foreground">Suspicious</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Progress */}
        <div className="px-6 py-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Detection Ratio</span>
            <span className="text-sm text-muted-foreground">
              {detectionRatio} / {totalScanners} vendors
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full flex">
              <div 
                className="bg-green-500 transition-all duration-500"
                style={{ width: `${(cleanCount / totalScanners) * 100}%` }}
              />
              <div 
                className="bg-amber-500 transition-all duration-500"
                style={{ width: `${(suspiciousCount / totalScanners) * 100}%` }}
              />
              <div 
                className="bg-red-500 transition-all duration-500"
                style={{ width: `${(maliciousCount / totalScanners) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Clean ({cleanCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">Suspicious ({suspiciousCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-xs text-muted-foreground">Malicious ({maliciousCount})</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-12 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="detection" className="rounded-lg data-[state=active]:bg-background">
            Detection
          </TabsTrigger>
          <TabsTrigger value="details" className="rounded-lg data-[state=active]:bg-background">
            Details
          </TabsTrigger>
          <TabsTrigger value="threats" className="rounded-lg data-[state=active]:bg-background">
            Threats
          </TabsTrigger>
          <TabsTrigger value="info" className="rounded-lg data-[state=active]:bg-background">
            URL Info
          </TabsTrigger>
        </TabsList>

        {/* Detection Tab */}
        <TabsContent value="detection" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-500" />
                Security Vendor Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.scanners.map((scanner, index) => (
                  <motion.div
                    key={scanner.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className={`flex items-center justify-between p-3 rounded-xl border ${scannerColors[scanner.result]}`}
                  >
                    <div className="flex items-center gap-3">
                      {scannerIcons[scanner.result]}
                      <span className="text-sm font-medium">{scanner.name}</span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${scannerColors[scanner.result]}`}>
                      {scanner.result}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {result.scanners.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No scanner results available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-500" />
                Scan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="h-4 w-4 text-brand-500" />
                    URL Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domain</span>
                      <span className="font-mono">{getDomain(result.url)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protocol</span>
                      <span>{result.url.startsWith("https") ? "HTTPS (Secure)" : "HTTP"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Level</span>
                      <RiskBadge level={result.riskLevel} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Server className="h-4 w-4 text-brand-500" />
                    Scan Statistics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Scanners</span>
                      <span>{totalScanners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clean</span>
                      <span className="text-green-500">{cleanCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Flagged</span>
                      <span className="text-red-500">{maliciousCount + suspiciousCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4 rounded-xl bg-muted/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-500" />
                  Analysis Summary
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.safe ? (
                    `This URL has been analyzed by ${totalScanners} security vendors. 
                    ${cleanCount} vendors found no issues with this URL. 
                    Based on our comprehensive analysis, this URL appears to be safe for browsing. 
                    However, always exercise caution when clicking links from unknown sources.`
                  ) : (
                    `This URL has been flagged by ${maliciousCount + suspiciousCount} out of ${totalScanners} security vendors. 
                    The URL shows signs of potential malicious activity and should be avoided. 
                    ${maliciousCount > 0 ? `${maliciousCount} vendor(s) classified it as malicious. ` : ""}
                    ${suspiciousCount > 0 ? `${suspiciousCount} vendor(s) marked it as suspicious. ` : ""}
                    We strongly recommend not visiting this URL.`
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threats Tab */}
        <TabsContent value="threats" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Detected Threats ({result.threats.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.threats.length > 0 ? (
                <div className="space-y-4">
                  {result.threats.map((threat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border ${
                        threat.severity === "critical" || threat.severity === "high"
                          ? "bg-red-500/5 border-red-500/20"
                          : threat.severity === "medium"
                          ? "bg-amber-500/5 border-amber-500/20"
                          : "bg-yellow-500/5 border-yellow-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          threat.severity === "critical" || threat.severity === "high"
                            ? "bg-red-500/10"
                            : threat.severity === "medium"
                            ? "bg-amber-500/10"
                            : "bg-yellow-500/10"
                        }`}>
                          <AlertCircle className={`h-5 w-5 ${
                            threat.severity === "critical" || threat.severity === "high"
                              ? "text-red-500"
                              : threat.severity === "medium"
                              ? "text-amber-500"
                              : "text-yellow-500"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{threat.type}</h4>
                            <RiskBadge level={threat.severity} />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {threat.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">No Threats Found</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Our analysis did not detect any specific threats associated with this URL.
                    The URL appears to be safe for browsing.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* URL Info Tab */}
        <TabsContent value="info" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-brand-500" />
                URL Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                try {
                  const url = new URL(result.url)
                  return (
                    <div className="space-y-3">
                      {[
                        { label: "Full URL", value: result.url },
                        { label: "Protocol", value: url.protocol.replace(":", "") },
                        { label: "Hostname", value: url.hostname },
                        { label: "Port", value: url.port || "Default" },
                        { label: "Path", value: url.pathname || "/" },
                        { label: "Query String", value: url.search || "None" },
                        { label: "Fragment", value: url.hash || "None" },
                      ].map((item) => (
                        <div 
                          key={item.label}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-muted/30 gap-2"
                        >
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <code className="text-sm font-mono bg-background/50 px-2 py-1 rounded break-all">
                            {item.value}
                          </code>
                        </div>
                      ))}
                    </div>
                  )
                } catch {
                  return (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Unable to parse URL structure</p>
                    </div>
                  )
                }
              })()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card className={`glass-card ${result.safe ? "border-green-500/20" : "border-amber-500/20"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className={`h-5 w-5 ${result.safe ? "text-green-500" : "text-amber-500"}`} />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result.safe ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-green-500">This URL appears safe</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our analysis shows no significant threats. You can proceed with caution.
                  </p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 pl-4">
                <li>• Always verify the website before entering sensitive information</li>
                <li>• Check for HTTPS and valid SSL certificates</li>
                <li>• Be cautious of requests for personal data</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-500">Warning: Potential threat detected</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We strongly recommend avoiding this URL.
                  </p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 pl-4">
                <li>• Do not enter any personal or financial information</li>
                <li>• Do not download any files from this URL</li>
                <li>• If you've already visited, run an antivirus scan</li>
                <li>• Report this URL to relevant authorities</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}