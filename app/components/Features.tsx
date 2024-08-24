
"use client"

import { motion } from 'framer-motion'
import { FaCloud, FaRobot, FaShieldAlt } from 'react-icons/fa'

const features = [
  { icon: FaCloud, title: 'Cloud Integration', description: 'Seamless cloud solutions for your business' },
  { icon: FaRobot, title: 'AI-Powered Analytics', description: 'Harness the power of AI for data-driven decisions' },
  { icon: FaShieldAlt, title: 'Secure Infrastructure', description: 'Top-notch security for your peace of mind' },
]

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Our Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className=" p-6 rounded-lg shadow-md"
            >
              <feature.icon className="text-4xl text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features