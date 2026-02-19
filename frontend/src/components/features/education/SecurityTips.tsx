"use client"

import { motion } from "framer-motion"
import {
  Shield,
  Key,
  Smartphone,
  Eye,
  Link2,
  Mail,
  Download,
  Wifi,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tips = [
  {
    icon: Key,
    title: "Use Strong, Unique Passwords",
    description: "Create passwords with 12+ characters including uppercase, lowercase, numbers, and symbols. Never reuse passwords across sites.",
    priority: "critical",
  },
  {
    icon: Smartphone,
    title: "Enable Two-Factor Authentication",
    description: "Add an extra layer of security with 2FA. Use an authenticator app instead of SMS when possible.",
    priority: "critical",
  },
  {
    icon: Eye,
    title: "Verify Sender Identity",
    description: "Always check the sender's email address carefully. Hover over links before clicking to see the real URL.",
    priority: "high",
  },
  {
    icon: Link2,
    title: "Don't Click Suspicious Links",
    description: "If an email creates urgency or seems too good to be true, don't click links. Go directly to the website instead.",
    priority: "high",
  },
  {
    icon: Mail,
    title: "Be Wary of Attachments",
    description: "Never open attachments from unknown senders. Even familiar contacts can be compromised.",
    priority: "high",
  },
  {
    icon: Download,
    title: "Keep Software Updated",
    description: "Install security updates promptly. Outdated software has known vulnerabilities attackers can exploit.",
    priority: "medium",
  },
  {
    icon: Wifi,
    title: "Use Secure Networks",
    description: "Avoid sensitive activities on public WiFi. Use a VPN when connecting to untrusted networks.",
    priority: "medium",
  },
  {
    icon: RefreshCw,
    title: "Backup Your Data",
    description: "Regular backups protect against ransomware. Use the 3-2-1 rule: 3 copies, 2 media types, 1 offsite.",
    priority: "medium",
  },
  {
    icon: Shield,
    title: "Use Security Tools",
    description: "Install reputable antivirus software. Use browser extensions that block malicious sites.",
    priority: "medium",
  },
  {
    icon: AlertTriangle,
    title: "Report Phishing Attempts",
    description: "Report phishing to your IT department and forward to reportphishing@apwg.org. This helps protect others.",
    priority: "low",
  },
]

const priorityColors = {
  critical: "border-red-500/50 bg-red-500/5",
  high: "border-orange-500/50 bg-orange-500/5",
  medium: "border-yellow-500/50 bg-yellow-500/5",
  low: "border-green-500/50 bg-green-500/5",
}

const priorityBadges = {
  critical: "bg-red-500/10 text-red-500",
  high: "bg-orange-500/10 text-orange-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  low: "bg-green-500/10 text-green-500",
}

export function SecurityTips() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Security Best Practices</h2>
        <p className="text-muted-foreground">
          Follow these tips to protect yourself from phishing and other cyber threats.
        </p>
      </div>

      {/* Priority Legend */}
      <div className="flex flex-wrap gap-3">
        <span className="text-sm text-muted-foreground">Priority:</span>
        {Object.entries(priorityBadges).map(([priority, className]) => (
          <span key={priority} className={`px-2 py-1 rounded text-xs font-medium ${className}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`glass h-full ${priorityColors[tip.priority as keyof typeof priorityColors]}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className="p-2 rounded-lg bg-background/50 text-brand-500">
                    <tip.icon className="h-4 w-4" />
                  </div>
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}