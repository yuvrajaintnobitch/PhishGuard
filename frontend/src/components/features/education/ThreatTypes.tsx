"use client"

import { motion } from "framer-motion"
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Globe, 
  Wifi, 
  FileWarning,
  Users,
  Building
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const threats = [
  {
    icon: Mail,
    title: "Email Phishing",
    description: "Fake emails that impersonate legitimate companies to steal credentials or install malware.",
    example: "An email claiming to be from your bank asking you to verify your account.",
    color: "text-red-500",
  },
  {
    icon: MessageSquare,
    title: "SMS Phishing (Smishing)",
    description: "Phishing attacks delivered via text messages with malicious links.",
    example: "A text claiming your package delivery failed with a suspicious link.",
    color: "text-orange-500",
  },
  {
    icon: Phone,
    title: "Voice Phishing (Vishing)",
    description: "Phone calls from attackers pretending to be tech support, banks, or government agencies.",
    example: "A call claiming to be the IRS threatening legal action unless you pay immediately.",
    color: "text-yellow-500",
  },
  {
    icon: Globe,
    title: "Clone Websites",
    description: "Fake websites that look identical to legitimate sites to capture login credentials.",
    example: "A fake PayPal login page with a slightly different URL like 'paypa1.com'.",
    color: "text-green-500",
  },
  {
    icon: Users,
    title: "Spear Phishing",
    description: "Targeted attacks using personal information gathered about specific individuals.",
    example: "An email mentioning your recent purchase or your boss's name to seem legitimate.",
    color: "text-blue-500",
  },
  {
    icon: Building,
    title: "Business Email Compromise",
    description: "Attackers impersonate executives to trick employees into transferring money.",
    example: "An email from 'the CEO' urgently requesting a wire transfer to a new vendor.",
    color: "text-purple-500",
  },
  {
    icon: Wifi,
    title: "Evil Twin Attacks",
    description: "Fake WiFi networks that intercept your data when you connect.",
    example: "A WiFi network named 'Starbucks_Free' set up by an attacker in a coffee shop.",
    color: "text-pink-500",
  },
  {
    icon: FileWarning,
    title: "Malware Attachments",
    description: "Email attachments containing viruses, ransomware, or trojans.",
    example: "An 'invoice.pdf.exe' file that installs ransomware when opened.",
    color: "text-cyan-500",
  },
]

export function ThreatTypes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Types of Phishing Attacks</h2>
        <p className="text-muted-foreground">
          Understanding different attack types helps you recognize and avoid them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass h-full hover:border-brand-500/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className={`p-2 rounded-lg bg-background/50 ${threat.color}`}>
                    <threat.icon className="h-5 w-5" />
                  </div>
                  {threat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {threat.description}
                </p>
                <div className="p-3 rounded-lg bg-muted/50 text-xs">
                  <span className="font-semibold text-foreground">Example: </span>
                  <span className="text-muted-foreground">{threat.example}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}