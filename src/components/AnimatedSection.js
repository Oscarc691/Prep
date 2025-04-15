"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "../hooks/useInView"

export function AnimatedSection({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, isInView] = useInView()
  const [hasAnimated, setHasAnimated] = useState(false)
  const [style, setStyle] = useState({
    opacity: 0,
    transform: getInitialTransform(direction),
    transition: `opacity 0.6s ease, transform 0.6s ease`,
  })

  function getInitialTransform(dir) {
    switch (dir) {
      case "up":
        return "translateY(20px)"
      case "down":
        return "translateY(-20px)"
      case "left":
        return "translateX(20px)"
      case "right":
        return "translateX(-20px)"
      default:
        return "translateY(20px)"
    }
  }

  useEffect(() => {
    let timeoutId = null

    if (isInView && !hasAnimated) {
      timeoutId = setTimeout(() => {
        setStyle({
          opacity: 1,
          transform: "translate(0, 0)",
          transition: `opacity 0.6s ease, transform 0.6s ease`,
        })
        setHasAnimated(true)
      }, delay * 1000)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isInView, hasAnimated, delay])

  const elementRef = useRef(null)

  // Combine the refs
  const setRefs = (element) => {
    ref.current = element
    elementRef.current = element
  }

  return (
    <div ref={setRefs} style={style} className={className}>
      {children}
    </div>
  )
}
