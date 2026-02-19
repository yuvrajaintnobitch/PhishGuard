"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Flag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const examples = [
  {
    id: 1,
    type: "Phishing",
    subject: "Urgent: Your Account Has Been Compromised!",
    from: "security@amaz0n-support.com",
    body: `Dear Valued Customer,

We have detected suspicious activity on your account. Your account will be SUSPENDED within 24 hours unless you verify your information immediately.

Click here to verify: http://amaz0n-secure.tk/verify

Failure to act will result in permanent account closure.

Amazon Security Team`,
    redFlags: [
      { text: "Misspelled domain (amaz0n instead of amazon)", location: "From address" },
      { text: "Creates urgency with threats", location: "Subject & Body" },
      { text: "Suspicious TLD (.tk)", location: "Link" },
      { text: "Generic greeting 'Dear Valued Customer'", location: "Body" },
      { text: "Threatening language", location: "Body" },
    ],
  },
  {
    id: 2,
    type: "Legitimate",
    subject: "Your Amazon order #112-3456789 has shipped",
    from: "shipment-tracking@amazon.com",
    body: `Hello John,

Your package is on its way! 

Order #112-3456789
Estimated delivery: Tuesday, March 15

Track your package: https://amazon.com/track/112-3456789

Thanks for shopping with us,
Amazon.com`,
    redFlags: [],
    safeIndicators: [
      "Correct domain (amazon.com)",
      "Personalized greeting",
      "Specific order number",
      "Legitimate tracking link",
      "No urgent threats",
    ],
  },
  {
    id: 3,
    type: "Phishing",
    subject: "You've Won $1,000,000!!!",
    from: "winner-notification@lottery-intl.org",
    body: `CONGRATULATIONS!!!

You have been selected as the WINNER of our International Lottery!

Prize: $1,000,000 USD

To claim your prize, send us:
- Full Name
- Address
- Bank Account Number
- Social Security Number

Reply within 48 hours or forfeit your winnings!

International Lottery Commission`,
    redFlags: [
      { text: "Too good to be true offer", location: "Subject & Body" },
      { text: "Asking for sensitive personal info", location: "Body" },
      { text: "You didn't enter any lottery", location: "Context" },
      { text: "Urgency tactics (48 hours)", location: "Body" },
      { text: "Excessive punctuation (!!!)", location: "Subject" },
    ],
  },
  {
    id: 4,
    type: "Phishing",
    subject: "IT Department: Password Reset Required",
    from: "it-support@company-helpdesk.net",
    body: `Hi,

As part of our security upgrade, all employees must reset their passwords.

Click below to reset your password:
http://company-portal.net/reset-password

Username: your.email@company.com
Current Password: [Enter Here]

This must be completed today.

IT Support`,
    redFlags: [
      { text: "External domain for internal IT", location: "From & Link" },
      { text: "Asking for current password", location: "Body" },
      { text: "Generic greeting", location: "Body" },
      { text: "Urgency without specific reason", location: "Body" },
      { text: "IT never asks for passwords via email", location: "Context" },
    ],
  },
]

export function PhishingExamples() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const currentExample = examples[currentIndex]

  const nextExample = () => {
    setShowAnalysis(false)
    setCurrentIndex((prev) => (prev + 1) % examples.length)
  }

  const prevExample = () => {
    setShowAnalysis(false)
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interactive Phishing Examples</h2>
        <p className="text-muted-foreground">
          Can you spot the phishing email? Review each example and check the analysis.
        </p>
      </div>

      {/* Email Display */}
      <Card className="glass">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Email {currentIndex + 1} of {examples.length}</CardTitle>
            <Badge 
              variant="outline" 
              className={currentExample.type === "Phishing" 
                ? "bg-red-500/10 text-red-500 border-red-500/20" 
                : "bg-green-500/10 text-green-500 border-green-500/20"
              }
            >
              {showAnalysis ? currentExample.type : "???"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Email Header */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">From: </span>
                <span className="font-mono">{currentExample.from}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Subject: </span>
                <span className="font-semibold">{currentExample.subject}</span>
              </p>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-4">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {currentExample.body}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prevExample} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button onClick={() => setShowAnalysis(!showAnalysis)}>
          {showAnalysis ? "Hide Analysis" : "Show Analysis"}
        </Button>

        <Button variant="outline" onClick={nextExample} className="gap-2">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Analysis */}
      <AnimatePresence>
        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className={`glass ${
              currentExample.type === "Phishing" 
                ? "border-red-500/50" 
                : "border-green-500/50"
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${
                  currentExample.type === "Phishing" ? "text-red-500" : "text-green-500"
                }`}>
                  {currentExample.type === "Phishing" ? (
                    <>
                      <AlertTriangle className="h-5 w-5" />
                      This is a Phishing Email!
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      This is a Legitimate Email
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentExample.type === "Phishing" ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Red flags that indicate this is a phishing attempt:
                    </p>
                    {currentExample.redFlags.map((flag, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5"
                      >
                        <Flag className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{flag.text}</p>
                          <p className="text-xs text-muted-foreground">Found in: {flag.location}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Signs that indicate this is legitimate:
                    </p>
                    {currentExample.safeIndicators?.map((indicator, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <p className="text-sm">{indicator}</p>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}