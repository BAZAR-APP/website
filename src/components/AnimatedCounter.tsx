'use client'
import React, { useEffect, useState } from 'react'

const AnimatedCounter = ({ target = 10000, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16) // ~60fps
    const animate = () => {
      start += increment
      if (start < target) {
        setCount(Math.floor(start))
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    animate()
  }, [target, duration])

  interface AnimatedCounterProps {
    target?: number
    duration?: number
  }

  const formatFinal = (num: number): string => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}k+`
    }
    return `${num}+`
  }

  return <span>{count < target ? count : formatFinal(target)}</span>
}

export default AnimatedCounter
