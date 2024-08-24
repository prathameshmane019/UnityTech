// components/ProjectsShowcase.tsx
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FocusCards } from './ui/focus-card'

const projects = [
  { title: 'College Attendance Management System', src: '/attendance.svg', category: 'Education' },
  { title: 'College Feeback Management System', src: '/feedback.svg', category: 'IT' },
  { title: 'Addmission Management System', src: '/addmision.jpg', category: 'IT' },
 ]

const ProjectsShowcase = () => {
  return (
    <section className="py-20 mx-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Our Projects</h3>
        <FocusCards cards={projects}/>
      </div>
    </section> 
  )
}

export default ProjectsShowcase