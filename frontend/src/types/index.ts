// Risk levels used throughout the app
export type RiskLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical'

// Scan types
export type ScanType = 'breach' | 'url' | 'email' | 'domain'

// ===== BREACH CHECKER =====
export interface BreachResult {
  email: string
  breached: boolean
  breachCount: number
  breaches: Breach[]
  isDemo: boolean
}

export interface Breach {
  name: string
  domain: string
  breachDate: string
  dataClasses: string[]
  description: string
}

// ===== URL SCANNER =====
export interface URLScanResult {
  url: string
  safe: boolean
  score: number
  riskLevel: RiskLevel
  threats: URLThreat[]
  scanners: ScannerResult[]
}

export interface URLThreat {
  type: string
  description: string
  severity: RiskLevel
}

export interface ScannerResult {
  name: string
  result: 'clean' | 'malicious' | 'suspicious' | 'unknown'
}

// ===== EMAIL ANALYZER =====
export interface EmailAnalysisResult {
  isPhishing: boolean
  confidence: number
  score: number
  riskLevel: RiskLevel
  redFlags: RedFlag[]
  explanation: string
}

export interface RedFlag {
  type: string
  description: string
  severity: RiskLevel
  location?: string
}

// ===== DOMAIN CHECKER =====
export interface DomainCheckResult {
  domain: string
  score: number
  riskLevel: RiskLevel
  spf: DNSRecord
  dkim: DNSRecord
  dmarc: DNSRecord
  summary: string
}

export interface DNSRecord {
  exists: boolean
  valid: boolean
  record?: string
  issues: string[]
}

// ===== PASSWORD CHECKER =====
export interface PasswordCheckResult {
  isPwned: boolean
  occurrenceCount: number
  riskLevel: RiskLevel
  message: string
}