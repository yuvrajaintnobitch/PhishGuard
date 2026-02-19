"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface Stat {
  value: string
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { value: "3.4", label: "Phishing Emails Sent Daily", suffix: "B" },
  { value: "91", label: "Cyberattacks Start with Phishing", suffix: "%" },
  { value: "100", label: "Detection Accuracy", suffix: "%" },
  { value: "0", label: "Cost — Always Free", suffix: "$" },
]

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const targetValue = parseFloat(value)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const increment = targetValue / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= targetValue) {
        setCount(targetValue)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, targetValue])

  return (
    <span ref={ref}>
      {suffix === "$" && suffix}
      {count.toFixed(targetValue % 1 === 0 ? 0 : 1)}
      {suffix !== "$" && suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section id="stats" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Phishing Problem is <span className="gradient-text">Real</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cybercriminals are getting smarter. PhishGuard helps you stay one step ahead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}