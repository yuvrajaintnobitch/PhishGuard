import axios from 'axios'
import type {
  BreachResult,
  URLScanResult,
  EmailAnalysisResult,
  DomainCheckResult,
  PasswordCheckResult,
} from '@/types'

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ===== BREACH CHECKER =====
export async function checkBreach(email: string): Promise<BreachResult> {
  const response = await api.post('/api/v1/breach/check', { email })
  return response.data
}

// ===== URL SCANNER =====
export async function scanURL(url: string): Promise<URLScanResult> {
  const response = await api.post('/api/v1/url/scan', { url })
  return response.data
}

// ===== EMAIL ANALYZER =====
export async function analyzeEmail(content: string): Promise<EmailAnalysisResult> {
  const response = await api.post('/api/v1/email/analyze', { content })
  return response.data
}

// ===== DOMAIN CHECKER =====
export async function checkDomain(domain: string): Promise<DomainCheckResult> {
  const response = await api.post('/api/v1/domain/check', { domain })
  return response.data
}

// ===== PASSWORD CHECKER =====
export async function checkPassword(password: string): Promise<PasswordCheckResult> {
  const response = await api.post('/api/v1/password/check', { password })
  return response.data
}

export default api