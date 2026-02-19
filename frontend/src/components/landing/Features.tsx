"use client"

import { motion } from "framer-motion"
import {
  Shield,
  Link as LinkIcon,
  Mail,
  Globe,
  BarChart3,
  BookOpen,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Mail,
    title: "Email Breach Checker",
    description: "Instantly check if your email has been exposed in data breaches. Get detailed reports and actionable recommendations.",
    href: "/dashboard/breach",
    gradient: "from-red-500 to-orange-500",
    delay: 0.1,
  },
  {
    icon: LinkIcon,
    title: "URL Scanner",
    description: "Scan any suspicious link against multiple threat databases including VirusTotal and Google Safe Browsing.",
    href: "/dashboard/url-scanner",
    gradient: "from-orange-500 to-yellow-500",
    delay: 0.2,
  },
  {
    icon: Mail,
    title: "Email Analyzer",
    description: "AI-powered phishing detection. Paste any email and get instant analysis with red flags highlighted.",
    href: "/dashboard/email",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.3,
  },
  {
    icon: Globe,
    title: "Domain Checker",
    description: "Verify SPF, DKIM, and DMARC records. See if a domain can be spoofed by attackers.",
    href: "/dashboard/domain",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.4,
  },
  {
    icon: BarChart3,
    title: "Threat Dashboard",
    description: "Visual overview of all your scans. Track your security posture and see trends over time.",
    href: "/dashboard",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.5,
  },
  {
    icon: BookOpen,
    title: "Security Education",
    description: "Learn how phishing works. Interactive examples, quizzes, and best practices to stay safe.",
    href: "/dashboard/education",
    gradient: "from-pink-500 to-rose-500",
    delay: 0.6,
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/20 mb-6">
            <Shield className="h-4 w-4 text-brand-400" />
            <span className="text-sm font-medium text-brand-400">
              Complete Security Suite
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Everything You Need to
            <br />
            <span className="gradient-text">Stay Protected</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six powerful tools working together to keep you safe from phishing attacks and cyber threats.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <Link href={feature.href}>
                <div className="group relative h-full p-8 rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Link Arrow */}
                  <div className="flex items-center text-sm font-medium text-brand-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}