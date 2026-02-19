"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ThreatTypes } from "@/components/features/education/ThreatTypes"
import { PhishingExamples } from "@/components/features/education/PhishingExamples"
import { SecurityTips } from "@/components/features/education/SecurityTips"
import { Quiz } from "@/components/features/education/Quiz"
import { PageTransition } from "@/components/effects/PageTransition"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, AlertTriangle, Shield, HelpCircle, GraduationCap } from "lucide-react"

export default function EducationPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <DashboardHeader
          title="Security Education"
          description="Learn how to identify and protect yourself from phishing attacks"
        />

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-pink-500/10 border border-brand-500/20"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="relative flex items-center gap-6">
            <div className="hidden sm:flex p-4 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Become Phishing-Proof</h2>
              <p className="text-muted-foreground max-w-xl">
                Knowledge is your best defense. Learn to identify phishing attempts, understand 
                different attack vectors, and test your skills with interactive quizzes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="threats" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-14 p-1.5 bg-muted/50 rounded-2xl gap-1">
              <TabsTrigger 
                value="threats" 
                className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg h-full gap-2 transition-all"
              >
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Threat Types</span>
                <span className="sm:hidden">Threats</span>
              </TabsTrigger>
              <TabsTrigger 
                value="examples" 
                className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg h-full gap-2 transition-all"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Examples</span>
                <span className="sm:hidden">Learn</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tips" 
                className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg h-full gap-2 transition-all"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security Tips</span>
                <span className="sm:hidden">Tips</span>
              </TabsTrigger>
              <TabsTrigger 
                value="quiz" 
                className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg h-full gap-2 transition-all"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Quiz</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="threats" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThreatTypes />
                </motion.div>
              </TabsContent>

              <TabsContent value="examples" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PhishingExamples />
                </motion.div>
              </TabsContent>

              <TabsContent value="tips" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SecurityTips />
                </motion.div>
              </TabsContent>

              <TabsContent value="quiz" className="m-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Quiz />
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </PageTransition>
  )
}