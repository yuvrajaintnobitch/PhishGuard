export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px]" />
      
      {children}
    </div>
  )
}