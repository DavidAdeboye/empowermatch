import type React from "react"
// Define types for component props
export interface BlurCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export interface BlurInputProps {
  id: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
  as?: "input" | "textarea"
  rows?: number
}

// Define types for section IDs
export interface SectionIds {
  [key: string]: string
}
