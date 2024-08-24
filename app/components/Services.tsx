// components/Services.tsx
"use client"

import { motion } from 'framer-motion'

const services = [
  { title: 'Custom Software Development', description: 'Tailored solutions to meet your specific needs' },
  { title: 'Cloud Migration', description: 'Seamless transition to cloud-based infrastructure' },
  { title: 'AI & Machine Learning', description: 'Intelligent solutions for data-driven decision making' },
  { title: 'Cybersecurity', description: 'Robust protection for your digital assets' },
]

const Services = () => {
  return (
    <section className="py-20 mx-auto bg-primary ">
      <div className="container  px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className=" text-primary p-6 rounded-lg shadow-md"
            >
              <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services