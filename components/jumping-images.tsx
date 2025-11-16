"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const randomImages = [
  "/business-team-meeting.png",
  "/modern-office-workspace.png",
  "/career-success.jpg",
  "/professional-development.jpg",
  "/job-interview-scene.png",
  "/team-collaboration.png",
]

export default function JumpingImages() {
  const [currentImages, setCurrentImages] = useState<string[]>([])

  useEffect(() => {
    // Initialize with 3 random images
    const getRandomImages = () => {
      const shuffled = [...randomImages].sort(() => Math.random() - 0.5)
      return shuffled.slice(0, 3)
    }
    setCurrentImages(getRandomImages())

    // Change images every 5 seconds
    const interval = setInterval(() => {
      setCurrentImages(getRandomImages())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {currentImages.map((image, index) => (
        <motion.div
          key={`${image}-${index}`}
          className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { duration: 0.5 },
            y: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: index * 0.2,
            },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Jumping image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}
