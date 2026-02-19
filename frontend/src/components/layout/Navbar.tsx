"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { MagneticButton } from "@/components/effects/MagneticButton"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#stats", label: "Stats" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-3 backdrop-blur-xl bg-background/80 border-b border-white/10"
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/25"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold gradient-text-static">
                PhishGuard
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-white/5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                className="text-sm font-medium rounded-xl hover:bg-white/5"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <MagneticButton>
                <Link href="/register">
                  <motion.div 
                    className="h-10 px-5 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-shadow group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </motion.div>
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 rounded-xl"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 pt-24 px-6"
            >
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block px-4 py-4 text-xl font-medium text-foreground hover:bg-white/5 rounded-2xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.div 
                className="mt-8 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full h-14 text-lg rounded-2xl border-white/10 hover:bg-white/5"
                  asChild
                >
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button 
                  className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-500"
                  asChild
                >
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started Free
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}