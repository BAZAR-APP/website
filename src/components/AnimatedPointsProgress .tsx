import { Progress } from '@radix-ui/themes'
import React, { useState, useEffect } from 'react'

export const AnimatedPointsProgress = ({
  earnedPoints = 255,
  maxPoints = 400,
  animationDuration = 2000,
}) => {
  const [animatedPoints, setAnimatedPoints] = useState(0)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  const progressPercentage = (earnedPoints / maxPoints) * 100

  useEffect(() => {
    // Animate the points counter
    const pointsInterval = setInterval(() => {
      setAnimatedPoints((prev) => {
        const increment = earnedPoints / (animationDuration / 50)
        const nextValue = prev + increment

        if (nextValue >= earnedPoints) {
          clearInterval(pointsInterval)
          return earnedPoints
        }
        return nextValue
      })
    }, 50)

    // Animate the progress ring
    const progressInterval = setInterval(() => {
      setAnimatedProgress((prev) => {
        const increment = progressPercentage / (animationDuration / 50)
        const nextValue = prev + increment

        if (nextValue >= progressPercentage) {
          clearInterval(progressInterval)
          return progressPercentage
        }
        return nextValue
      })
    }, 50)

    return () => {
      clearInterval(pointsInterval)
      clearInterval(progressInterval)
    }
  }, [earnedPoints, progressPercentage, animationDuration])

  // Calculate stroke dash array and offset for the circular progress
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[160px] h-[160px] flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="rgb(229, 231, 235)"
            strokeWidth="15"
            fill="transparent"
            className="opacity-30"
          />
        </svg>

        {/* Progress Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#29397e"
            strokeWidth="15"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[#475467] text-[12px] font-medium mb-1.5">Earned Points</p>
          <p className="text-2xl font-semibold !text-[#101828]">{Math.round(animatedPoints)}</p>
        </div>
      </div>

      {/* Radix UI Themes Progress Bar Alternative (Hidden by default) */}
      <div className="hidden">
        <Progress value={animatedProgress} className='w-[160px]' />
      </div>
    </div>
  )
}
