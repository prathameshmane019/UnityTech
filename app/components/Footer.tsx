// components/Footer.tsx
"use client"

import { motion } from 'framer-motion'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-2xl font-bold mb-2">Unity Tech</h4>
            <p className="text-gray-400">Innovative Software Solutions</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4 mt-4 md:mt-0"
          >
            <a href="#" className="text-2xl hover:text-primary transition-colors"><FaTwitter /></a>
            <a href="#" className="text-2xl hover:text-primary transition-colors"><FaLinkedin /></a>
            <a href="#" className="text-2xl hover:text-primary transition-colors"><FaGithub /></a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          © 2024 Unity Tech. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer