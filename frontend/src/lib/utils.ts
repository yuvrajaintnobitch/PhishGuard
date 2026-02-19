import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes with proper precedence
 * Used throughout components for conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}