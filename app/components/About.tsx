// components/About.tsx
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <Image
              src="/about-image.jpg"
              alt="About Unity Tech"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 md:pl-12"
          >
            <h3 className="text-3xl font-bold mb-4">About Unity Tech</h3>
            <p className="text-gray-600 mb-4">
              Unity Tech is a leading software solutions provider, dedicated to empowering businesses
              with innovative technology. Our team of experts is committed to delivering cutting-edge
              solutions tailored to your unique needs.
            </p>
            <p className="text-gray-600 mb-4">
              With years of experience and a passion for excellence, we strive to be at the forefront
              of technological advancements, ensuring our clients stay ahead in today's competitive landscape.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About