"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

interface AnimatedTextProps {
  strings: string[]
  className?: string
}

export function AnimatedText({ strings, className }: AnimatedTextProps) {
  const el = useRef<HTMLSpanElement>(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: "|",
      })
    }

    return () => {
      typed.current?.destroy()
    }
  }, [strings])

  return <span ref={el} className={className} />
}