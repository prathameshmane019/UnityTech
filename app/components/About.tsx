// components/About.tsx
"use client"

import { motion } from 'framer-motion'

const About = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h3 className="text-3xl font-bold mb-4">About UnityTech Solutions</h3>
            <p className="text-gray-600 mb-4">
              Founded in 2024 by two dedicated engineers, UnityTech Solutions is a leading software solutions provider committed to making technology accessible to every community. Our mission is to address societal challenges by offering affordable, state-of-the-art software solutions to small cities and villages across India. With a passion for innovation and excellence, we empower businesses, educational institutions, and healthcare providers with technology that makes a meaningful impact.
            </p>
            <h4 className="text-2xl font-semibold mb-2">What We Do:</h4>
            <p className="text-gray-600 mb-4">
              We specialize in delivering advanced software solutions tailored to your unique needs. Our expert team is focused on providing cutting-edge technology that helps our clients stay ahead in today’s competitive landscape. With years of experience, we ensure our solutions are both effective and affordable, driving success and efficiency.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <h4 className="text-2xl font-semibold mb-2">Meet Our Founders:</h4>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Prathamesh Mane: Co-founder and Software Engineer.</li>
              <li>Aishwarya Deshmukh: Co-founder and Software Engineer. </li>
            </ul>
            <h4 className="text-2xl font-semibold mb-2">Our Values:</h4>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li><strong>Accessibility:</strong> Making technology affordable and available for all.</li>
              <li><strong>Innovation:</strong> Continuously improving and adapting our solutions to meet evolving community needs.</li>
              <li><strong>Impact:</strong> Focusing on creating solutions that drive real, positive change in society.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
