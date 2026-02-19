"use client"

import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { ThreatScoreCard } from "@/components/dashboard/ThreatScoreCard"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentScans } from "@/components/dashboard/RecentScans"
import { Shield, Mail, Link2, AlertTriangle, TrendingUp, Activity } from "lucide-react"
import { useScanStore, useAuthStore } from "@/store"
import { PageTransition } from "@/components/effects/PageTransition"
import { StaggerContainer, StaggerItem } from "@/components/effects/StaggerContainer"

export default function DashboardPage() {
  const scans = useScanStore((state) => state.scans)
  const { user } = useAuthStore()

  const stats = {
    totalScans: scans.length,
    threatsDetected: scans.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length,
    urlsScanned: scans.filter(s => s.type === 'url').length,
    emailsChecked: scans.filter(s => s.type === 'breach' || s.type === 'email').length,
  }

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-transparent border border-brand-500/20 p-8">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {greeting()}, {user?.name?.split(' ')[0] || 'there'}! 👋
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Your security dashboard is ready. Start scanning to protect yourself from phishing threats.
              </p>
            </motion.div>

            {/* Quick Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 mt-6"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{stats.totalScans}</p>
                  <p className="text-xs text-muted-foreground">Total Scans</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{stats.threatsDetected}</p>
                  <p className="text-xs text-muted-foreground">Threats Found</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-brand-500/10">
                  <Activity className="h-4 w-4 text-brand-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-500">Protected</p>
                  <p className="text-xs text-muted-foreground">Status</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem>
            <StatCard
              title="Total Scans"
              value={stats.totalScans}
              icon={Shield}
              gradient="from-brand-500 to-cyan-500"
              trend={stats.totalScans > 0 ? { value: 12, isPositive: true } : undefined}
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              title="Threats Detected"
              value={stats.threatsDetected}
              icon={AlertTriangle}
              gradient="from-red-500 to-orange-500"
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              title="URLs Scanned"
              value={stats.urlsScanned}
              icon={Link2}
              gradient="from-purple-500 to-pink-500"
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              title="Emails Checked"
              value={stats.emailsChecked}
              icon={Mail}
              gradient="from-green-500 to-emerald-500"
            />
          </StaggerItem>
        </StaggerContainer>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <QuickActions />
            <RecentScans />
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <ThreatScoreCard />
            
            {/* Security Tips Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold">Security Tip</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Always verify the sender's email address before clicking any links. 
                Phishers often use addresses that look similar to legitimate ones.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}