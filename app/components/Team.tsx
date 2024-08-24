// components/Team.tsx
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  { name: 'Alice Johnson', role: 'CEO & Founder', image: '/team1.jpg' },
  { name: 'Bob Smith', role: 'CTO', image: '/team2.jpg' },
  { name: 'Carol Williams', role: 'Lead Developer', image: '/team3.jpg' },
  { name: 'David Brown', role: 'UX Designer', image: '/team4.jpg' },
]

const Team = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team