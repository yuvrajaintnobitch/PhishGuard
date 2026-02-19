"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Shield,
  Mail,
  Link2,
  Globe,
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  KeyRound,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store"
import { toast } from "sonner"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Breach Checker", href: "/dashboard/breach", icon: Mail },
  { name: "URL Scanner", href: "/dashboard/url-scanner", icon: Link2 },
  { name: "Email Analyzer", href: "/dashboard/email", icon: Mail },
  { name: "Domain Checker", href: "/dashboard/domain", icon: Globe },
  { name: "Password Checker", href: "/dashboard/password", icon: KeyRound },
  { name: "Education", href: "/dashboard/education", icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/")
  }

  return (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-r border-border/50">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold gradient-text-static block leading-none">
              PhishGuard
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Security Platform
            </span>
          </div>
        </Link>
      </div>

      <Separator className="opacity-50" />

      {/* User Info */}
      {user && (
        <>
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
          <Separator className="opacity-50" />
        </>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-gradient-to-r from-brand-500/10 to-purple-500/10 text-brand-500 border border-brand-500/20"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "h-4.5 w-4.5 transition-colors",
                  isActive ? "text-brand-500" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {item.name}
              </div>
              {isActive && (
                <ChevronRight className="h-4 w-4 text-brand-500" />
              )}
            </Link>
          )
        })}
      </nav>

      <Separator className="opacity-50" />

      {/* Pro Card */}
      <div className="p-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-semibold">Free Forever</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            All features included. No limits.
          </p>
          <Button 
            size="sm" 
            className="w-full btn-primary rounded-lg text-xs"
            onClick={() => {
              navigator.clipboard.writeText("https://phishguard.app")
              toast.success("Link copied! Share PhishGuard with others.")
            }}
          >
            Share PhishGuard
          </Button>
        </div>
      </div>

      <Separator className="opacity-50" />

      {/* Bottom actions */}
      <div className="p-4 space-y-1">
        <Link href="/dashboard/settings">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start gap-3 rounded-xl",
              pathname === "/dashboard/settings" 
                ? "bg-gradient-to-r from-brand-500/10 to-purple-500/10 text-brand-500" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-red-500 hover:bg-red-500/5 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}