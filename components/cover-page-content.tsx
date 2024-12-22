'use client'

import { motion } from 'framer-motion'
import { AnimatedButton } from './animated-button'
import { useRouter } from 'next/navigation'

export function CoverPageContent() {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/auth')
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold text-center mb-6"
      >
        Welcome to SmartSphere
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl md:text-2xl text-center mb-4"
      >
        Where innovation meets urban living!
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg md:text-xl text-center max-w-2xl mb-8"
      >
        Discover a city designed for sustainability, connectivity, and convenience. 
        Explore smart solutions that empower communities and enhance lifestyles.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <AnimatedButton onClick={handleLoginClick}>Login / Sign Up</AnimatedButton>
      </motion.div>
    </div>
  )
}

