"use client"

import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Bell, Menu, Sparkles, Search } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface DashboardHeaderProps {
  title: string
  description?: string
  onMenuClick?: () => void
}

export function DashboardHeader({ title, description, onMenuClick }: DashboardHeaderProps) {
  const [notifications] = useState(3)

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8"
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 rounded-xl hover:bg-white/5"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {title}
            </h1>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3, type: "spring" }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-500/20"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span className="text-xs font-medium text-brand-500">AI Powered</span>
            </motion.div>
          </motion.div>
          {description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-muted-foreground mt-1"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2"
      >
        {/* Search Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl hover:bg-white/5 hidden sm:flex"
          onClick={() => toast.info("Search coming soon!")}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative rounded-xl hover:bg-white/5"
          onClick={() => toast.info("No new notifications")}
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            >
              {notifications}
            </motion.span>
          )}
        </Button>

        <div className="w-px h-6 bg-border mx-1" />
        
        <ThemeToggle />
      </motion.div>
    </motion.div>
  )
}