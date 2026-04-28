'use client'

import { motion } from 'framer-motion'
import Preloader from '@/components/ui/Preloader'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: 'easeInOut', type: 'tween' }}>
        {children}
      </motion.div>
    </>
  )
}