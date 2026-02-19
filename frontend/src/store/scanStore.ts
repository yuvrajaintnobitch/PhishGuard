import { create } from 'zustand'

export type RiskLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical'

export type ScanType = 'breach' | 'url' | 'email' | 'domain'

export interface Scan {
  id: string
  type: ScanType
  input: string
  riskLevel: RiskLevel
  score: number
  timestamp: Date
  details?: any
}

interface ScanState {
  scans: Scan[]
  isLoading: boolean
  error: string | null
  
  // Actions
  addScan: (scan: Scan) => void
  clearScans: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useScanStore = create<ScanState>((set) => ({
  scans: [],
  isLoading: false,
  error: null,

  addScan: (scan) =>
    set((state) => ({
      scans: [scan, ...state.scans].slice(0, 50), // Keep last 50 scans
    })),

  clearScans: () => set({ scans: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),
}))