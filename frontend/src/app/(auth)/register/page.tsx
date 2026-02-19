"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Shield, Mail, Lock, User, ArrowRight, Loader2, Github, Chrome, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card3D } from "@/components/effects/Card3D"
import { useAuthStore } from "@/store"
import { toast } from "sonner"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type RegisterFormData = z.infer<typeof registerSchema>

const features = [
  "Unlimited URL scans",
  "Email breach checking",
  "AI-powered analysis",
  "Domain verification",
]

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register: registerUser } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    
    const success = await registerUser(data.name, data.email, data.password)
    
    if (success) {
      toast.success("Account created successfully!")
      router.push("/dashboard")
    } else {
      toast.error("Registration failed. Please try again.")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-5xl px-4 relative z-10 grid lg:grid-cols-2 gap-8 items-center">
      {/* Left Side - Benefits */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:block"
      >
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Start protecting yourself <span className="gradient-text">for free</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of users who trust PhishGuard to keep them safe from cyber threats.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="p-1.5 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold mb-1">Enterprise-grade security</p>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and never stored. We take privacy seriously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card3D>
          <div className="p-8 rounded-3xl glass-card border border-white/10">
            {/* Logo - Mobile Only */}
            <Link href="/" className="flex lg:hidden items-center justify-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/30">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text-static">PhishGuard</span>
            </Link>

            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-2xl font-bold mb-2">Create your account</h1>
              <p className="text-muted-foreground">Get started in less than 30 seconds</p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                variant="outline" 
                className="h-12 rounded-xl glass-card border-white/10 hover:border-brand-500/50 hover:bg-brand-500/5"
                onClick={() => toast.info("Google signup coming soon!")}
              >
                <Chrome className="h-5 w-5 mr-2" />
                Google
              </Button>
              <Button 
                variant="outline" 
                className="h-12 rounded-xl glass-card border-white/10 hover:border-brand-500/50 hover:bg-brand-500/5"
                onClick={() => toast.info("GitHub signup coming soon!")}
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
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="John Doe"
                    className="h-12 pl-11 rounded-xl bg-white/5 border-white/10 focus:border-brand-500 transition-colors"
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

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
                <label className="text-sm font-medium">Password</label>
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
                    Create Account
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our{" "}
                <button type="button" className="text-brand-500 hover:underline" onClick={() => toast.info("Terms page coming soon!")}>Terms</button>
                {" "}and{" "}
                <button type="button" className="text-brand-500 hover:underline" onClick={() => toast.info("Privacy page coming soon!")}>Privacy Policy</button>
              </p>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-500 hover:text-brand-400 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card3D>
      </motion.div>
    </div>
  )
}