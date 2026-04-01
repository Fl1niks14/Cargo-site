import { motion } from 'framer-motion'
import React from 'react'

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.5, ease: 'circOut' }}
		>
			{children}
		</motion.div>
	)
}

export default PageWrapper
