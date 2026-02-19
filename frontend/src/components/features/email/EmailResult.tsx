"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  ShieldAlert, 
  AlertTriangle, 
  Flag, 
  Brain,
  Mail,
  User,
  FileText,
  Link2,
  CheckCircle,
  XCircle,
  Info,
  Copy,
  Eye
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreatScoreMeter } from "@/components/shared/ThreatScoreMeter"
import { RiskBadge } from "@/components/shared/RiskBadge"
import type { EmailAnalysisResult } from "@/types"
import { toast } from "sonner"

interface EmailResultProps {
  result: EmailAnalysisResult
}

export function EmailResultDisplay({ result }: EmailResultProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const highSeverityFlags = result.redFlags.filter(f => f.severity === "high" || f.severity === "critical")
  const mediumSeverityFlags = result.redFlags.filter(f => f.severity === "medium")
  const lowSeverityFlags = result.redFlags.filter(f => f.severity === "low" || f.severity === "safe")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Result Card */}
      <Card className={`glass-card overflow-hidden ${
        result.isPhishing ? "border-red-500/30" : "border-green-500/30"
      }`}>
        {/* Header Banner */}
        <div className={`p-6 ${
          result.isPhishing 
            ? "bg-gradient-to-r from-red-500/10 to-orange-500/10" 
            : "bg-gradient-to-r from-green-500/10 to-emerald-500/10"
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Score Circle */}
            <div className="flex justify-center lg:justify-start">
              <ThreatScoreMeter score={result.score} size="lg" />
            </div>

            {/* Verdict */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                {result.isPhishing ? (
                  <ShieldAlert className="h-8 w-8 text-red-500 shrink-0" />
                ) : (
                  <Shield className="h-8 w-8 text-green-500 shrink-0" />
                )}
                <div>
                  <h2 className={`text-2xl font-bold ${
                    result.isPhishing ? "text-red-500" : "text-green-500"
                  }`}>
                    {result.isPhishing ? "Phishing Email Detected!" : "Email Appears Legitimate"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.isPhishing 
                      ? `${result.redFlags.length} red flag(s) detected in this email`
                      : "No significant phishing indicators found"
                    }
                  </p>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AI Confidence</span>
                  <span className="text-sm text-muted-foreground">{result.confidence}%</span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex lg:flex-col gap-4 lg:gap-2 justify-center lg:text-right">
              <div>
                <p className="text-2xl font-bold text-red-500">{highSeverityFlags.length}</p>
                <p className="text-xs text-muted-foreground">High Risk</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-500">{mediumSeverityFlags.length}</p>
                <p className="text-xs text-muted-foreground">Medium</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-500">{lowSeverityFlags.length}</p>
                <p className="text-xs text-muted-foreground">Low</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        {result.redFlags.length > 0 && (
          <div className="px-6 py-4 border-t border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Risk Distribution</span>
              <span className="text-sm text-muted-foreground">
                {result.redFlags.length} issue(s) found
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full flex">
                <div 
                  className="bg-red-500 transition-all duration-500"
                  style={{ width: `${(highSeverityFlags.length / result.redFlags.length) * 100}%` }}
                />
                <div 
                  className="bg-amber-500 transition-all duration-500"
                  style={{ width: `${(mediumSeverityFlags.length / result.redFlags.length) * 100}%` }}
                />
                <div 
                  className="bg-yellow-500 transition-all duration-500"
                  style={{ width: `${(lowSeverityFlags.length / result.redFlags.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-12 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-background">
            Overview
          </TabsTrigger>
          <TabsTrigger value="redflags" className="rounded-lg data-[state=active]:bg-background">
            Red Flags
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg data-[state=active]:bg-background">
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="tips" className="rounded-lg data-[state=active]:bg-background">
            Protection
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-brand-500" />
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 text-center">
                    <p className={`text-2xl font-bold ${result.isPhishing ? "text-red-500" : "text-green-500"}`}>
                      {result.score}
                    </p>
                    <p className="text-xs text-muted-foreground">Threat Score</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 text-center">
                    <p className="text-2xl font-bold text-brand-500">{result.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <span className="text-sm">Verdict</span>
                  <Badge variant={result.isPhishing ? "destructive" : "default"} className={!result.isPhishing ? "bg-green-500" : ""}>
                    {result.isPhishing ? "Phishing" : "Legitimate"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <span className="text-sm">Risk Level</span>
                  <RiskBadge level={result.riskLevel} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <span className="text-sm">Red Flags</span>
                  <span className="font-semibold">{result.redFlags.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-5 w-5 text-brand-500" />
                  Quick Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Suspicious Links", detected: result.redFlags.some(f => f.type.toLowerCase().includes("link")), icon: Link2 },
                  { label: "Urgency Tactics", detected: result.redFlags.some(f => f.type.toLowerCase().includes("urgency")), icon: AlertTriangle },
                  { label: "Sender Issues", detected: result.redFlags.some(f => f.type.toLowerCase().includes("sender")), icon: User },
                  { label: "Grammar Issues", detected: result.redFlags.some(f => f.type.toLowerCase().includes("grammar")), icon: FileText },
                ].map((item) => (
                  <div 
                    key={item.label}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      item.detected ? "bg-red-500/5 border border-red-500/20" : "bg-green-500/5 border border-green-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 ${item.detected ? "text-red-500" : "text-green-500"}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.detected ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Red Flags Tab */}
        <TabsContent value="redflags" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-amber-500" />
                Detected Red Flags ({result.redFlags.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.redFlags.length > 0 ? (
                <div className="space-y-4">
                  {result.redFlags.map((flag, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border ${
                        flag.severity === "critical" || flag.severity === "high"
                          ? "bg-red-500/5 border-red-500/20"
                          : flag.severity === "medium"
                          ? "bg-amber-500/5 border-amber-500/20"
                          : "bg-yellow-500/5 border-yellow-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          flag.severity === "critical" || flag.severity === "high"
                            ? "bg-red-500/10"
                            : flag.severity === "medium"
                            ? "bg-amber-500/10"
                            : "bg-yellow-500/10"
                        }`}>
                          <AlertTriangle className={`h-5 w-5 ${
                            flag.severity === "critical" || flag.severity === "high"
                              ? "text-red-500"
                              : flag.severity === "medium"
                              ? "text-amber-500"
                              : "text-yellow-500"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="font-semibold">{flag.type}</h4>
                            <RiskBadge level={flag.severity} />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {flag.description}
                          </p>
                          {flag.location && (
                            <div className="flex items-center gap-2">
                              <Eye className="h-3 w-3 text-muted-foreground" />
                              <code className="text-xs bg-muted/50 px-2 py-1 rounded">
                                Found in: {flag.location}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">No Red Flags Found</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Our AI analysis did not detect any phishing indicators in this email.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Analysis Tab */}
        <TabsContent value="ai" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-brand-500" />
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-brand-500/5 to-purple-500/5 border border-brand-500/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">AI Explanation</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-xl bg-muted/30 text-center">
                  <div className="text-3xl font-bold gradient-text-static mb-1">
                    {result.confidence}%
                  </div>
                  <p className="text-xs text-muted-foreground">Detection Confidence</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 text-center">
                  <div className="text-3xl font-bold text-brand-500 mb-1">
                    {result.redFlags.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Patterns Detected</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 text-center">
                  <div className={`text-3xl font-bold mb-1 ${result.isPhishing ? "text-red-500" : "text-green-500"}`}>
                    {result.score}
                  </div>
                  <p className="text-xs text-muted-foreground">Threat Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Protection Tips Tab */}
        <TabsContent value="tips" className="mt-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-500" />
                How to Stay Protected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Never click suspicious links",
                  description: "Hover over links to see the real URL before clicking. Phishing emails often use misleading link text.",
                },
                {
                  title: "Verify the sender",
                  description: "Check the sender's email address carefully. Phishers often use addresses that look similar to legitimate ones.",
                },
                {
                  title: "Don't share sensitive information",
                  description: "Legitimate organizations never ask for passwords, SSN, or financial details via email.",
                },
                {
                  title: "Look for urgency tactics",
                  description: "Be suspicious of emails that pressure you to act immediately or threaten consequences.",
                },
                {
                  title: "Report phishing attempts",
                  description: "Forward suspicious emails to your IT department or the organization being impersonated.",
                },
              ].map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30"
                >
                  <div className="p-2 rounded-lg bg-brand-500/10">
                    <CheckCircle className="h-4 w-4 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}