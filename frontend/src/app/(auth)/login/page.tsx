"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Shield, Mail, Lock, ArrowRight, Loader2, Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card3D } from "@/components/effects/Card3D"
import { useAuthStore } from "@/store"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    
    const success = await login(data.email, data.password)
    
    if (success) {
      toast.success("Welcome back!")
      router.push("/dashboard")
    } else {
      toast.error("Invalid credentials. Please try again.")
    }
    
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md px-4 relative z-10"
    >
      <Card3D>
        <div className="p-8 rounded-3xl glass-card border border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/30">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text-static">PhishGuard</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              variant="outline" 
              className="h-12 rounded-xl glass-card border-white/10 hover:border-brand-500/50 hover:bg-brand-500/5"
              onClick={() => toast.info("Google login coming soon!")}
            >
              <Chrome className="h-5 w-5 mr-2" />
              Google
            </Button>
            <Button 
              variant="outline" 
              className="h-12 rounded-xl glass-card border-white/10 hover:border-brand-500/50 hover:bg-brand-500/5"
              onClick={() => toast.info("GitHub login coming soon!")}
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 pl-11 rounded-xl bg-white/5 border-white/10 focus:border-brand-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <button 
                  type="button"
                  className="text-sm text-brand-500 hover:text-brand-400"
                  onClick={() => toast.info("Password reset coming soon!")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="h-12 pl-11 rounded-xl bg-white/5 border-white/10 focus:border-brand-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-brand-500/30 transition-all group"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-brand-500 hover:text-brand-400 font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </Card3D>
    </motion.div>
  )
}