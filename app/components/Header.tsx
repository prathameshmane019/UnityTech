"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header className=" shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">UnityTech Solutions</h1>
        <nav>
          <ul className="flex space-x-6">
            {['Home', 'About Us', 'Solutions', 'Contact'].map((item) => (
              <li key={item}>
                <Link href="#" passHref>
                  <motion.span
                    className="text-text  hover:text-secondary transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <motion.button
          className=" bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>
    </header>
  )
}

export default Header