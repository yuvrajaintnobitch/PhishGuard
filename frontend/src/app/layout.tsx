import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { ScrollProgress } from "@/components/effects/ScrollProgress"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PhishGuard – AI-Powered Phishing Detection",
  description: "Detect phishing emails, scan suspicious URLs, check data breaches, and verify domain security – all in one place.",
  keywords: ["phishing", "cybersecurity", "email security", "url scanner", "breach checker"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}