import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Link2, Globe, FileText, ArrowRight, Sparkles } from "lucide-react"

const actions = [
  {
    title: "Check Email Breach",
    description: "See if your email was exposed",
    href: "/dashboard/breach",
    icon: Mail,
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Scan URL",
    description: "Check if a link is safe",
    href: "/dashboard/url-scanner",
    icon: Link2,
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    title: "Analyze Email",
    description: "Detect phishing emails",
    href: "/dashboard/email",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Check Domain",
    description: "Verify sender authenticity",
    href: "/dashboard/domain",
    icon: Globe,
    gradient: "from-green-500 to-emerald-500",
  },
]

export function QuickActions() {
  return (
    <Card className="glass-card border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="group relative p-5 rounded-xl glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] h-full">
              {/* Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <div className="relative flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm group-hover:text-brand-500 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}