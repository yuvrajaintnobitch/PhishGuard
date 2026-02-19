"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/effects/PageTransition"
import { useAuthStore } from "@/store"
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Trash2, 
  Save,
  Camera,
  Mail,
  Smartphone
} from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    threatAlerts: true,
    weeklyReport: false,
    autoScan: true,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    toast.success("Settings saved successfully!")
  }

  const settingsGroups = [
    {
      title: "Profile Information",
      icon: User,
      description: "Update your account details",
      delay: 0.1,
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Configure how you receive alerts",
      delay: 0.2,
    },
    {
      title: "Security",
      icon: Shield,
      description: "Manage your security settings",
      delay: 0.3,
    },
  ]

  return (
    <PageTransition>
      <div className="space-y-8">
        <DashboardHeader
          title="Settings"
          description="Manage your account and preferences"
        />

        <div className="grid gap-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card border-white/10 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-pink-500/20" />
              <CardContent className="relative pt-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-background">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <button 
                      className="absolute -bottom-2 -right-2 p-2 rounded-full bg-background border border-border hover:border-brand-500 transition-colors"
                      onClick={() => toast.info("Profile photo upload coming soon!")}
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-center sm:text-left pb-2">
                    <h3 className="text-xl font-bold">{user?.name || "User"}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                    <Badge variant="outline" className="mt-2 bg-gradient-to-r from-brand-500/10 to-purple-500/10 text-brand-500 border-brand-500/30">
                      Free Plan
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Display Name
                    </label>
                    <Input 
                      defaultValue={user?.name} 
                      className="h-11 bg-white/5 border-white/10 rounded-xl focus:border-brand-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </label>
                    <Input 
                      defaultValue={user?.email} 
                      disabled
                      className="h-11 bg-white/5 border-white/10 rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "emailNotifications", label: "Email Notifications", description: "Receive scan results via email", icon: Mail },
                  { key: "threatAlerts", label: "Threat Alerts", description: "Get notified when threats are detected", icon: Shield },
                  { key: "weeklyReport", label: "Weekly Security Report", description: "Receive a weekly summary of your security posture", icon: Bell },
                ].map((item, index) => (
                  <motion.div 
                    key={item.key} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
                    />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Auto-scan URLs</p>
                      <p className="text-sm text-muted-foreground">Automatically scan URLs when pasted</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.autoScan}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoScan: checked })}
                  />
                </div>

                <Separator />

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button 
                    variant="outline" 
                    className="h-12 justify-start gap-3 rounded-xl border-white/10 hover:bg-white/5 hover:border-brand-500/50"
                    onClick={() => toast.info("Password change coming soon!")}
                  >
                    <Key className="h-4 w-4" />
                    Change Password
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 justify-start gap-3 rounded-xl border-white/10 hover:bg-white/5 hover:border-brand-500/50"
                    onClick={() => toast.info("2FA setup coming soon!")}
                  >
                    <Smartphone className="h-4 w-4" />
                    Setup 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-500">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </div>
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-xl"
                  onClick={() => toast.error("Account deletion is disabled in demo mode")}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              onClick={handleSave}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-600 hover:to-cyan-600 font-semibold gap-2 shadow-lg shadow-brand-500/30"
              disabled={isSaving}
            >
              {isSaving ? (
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ⏳
                </motion.span>
              ) : (
                <Save className="h-5 w-5" />
              )}
              {isSaving ? "Saving Changes..." : "Save All Changes"}
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}