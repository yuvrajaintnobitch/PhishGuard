"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useAuthStore } from "@/store"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    // Small delay for smoother transition
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [checkAuth])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-brand-500/30 blur-xl animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 relative z-10">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-72 border-r-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}