// components/Contact.tsx
"use client"
import { motion } from 'framer-motion'
import React from 'react'

const Contact = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Get in Touch</h3>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-text mb-2">Name</label>
            <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-text mb-2">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-text mb-2">Message</label>
            <textarea id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-text px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact