// components/ProjectsShowcase.tsx
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FocusCards } from './ui/focus-card'
import { StickyScroll } from './ui/sticky-scroll-reveal'

const projects = [
  {
    title: 'SwasthyaSamriddhi', 
    url: 'https://swasthya-samriddhi.vercel.app/',  // Add the URL here
    content: (
      <a href="https://swasthya-samriddhi.vercel.app/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/swas.png"
          width={800}
          height={300}
          className="h-full w-full object-cover"
          alt="SwasthyaSamriddhi"
        />
      </a>
    ), 
    description: "SwasthyaSamriddhi is a secure health management system designed to manage patient reports and doctor information efficiently. It provides a comprehensive platform for healthcare providers to securely store and access patient data, ensuring better care coordination and improved patient outcomes."
  },
  {
    title: 'Attendance Pro', 
    url: 'https://attendance-pro.vercel.app/',  // Add the URL here
    content: (
      <a href="https://attendance-pro.vercel.app/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/attendance.png"
          width={800}
          height={300}
          className="h-full w-full object-cover"
          alt="Attendance Pro"
        />
      </a>
    ), 
    description: "Attendance Pro is an advanced attendance management system designed to efficiently track and manage student attendance. It automates the attendance process, making it more convenient for teachers and students. Key features include automated attendance tracking, detailed reports, and easy integration with existing college management systems. An app version is also available for seamless access."
  },
  {
    title: 'Admission Pro', 
    url: 'https://admission-pro.vercel.app/',  // Add the URL here
    content: (
      <a href="https://admission-pro.vercel.app/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/admission.png"
          width={800}
          height={300}
          className="h-full w-full object-cover"
          alt="Admission Pro"
        />
      </a>
    ), 
    description: "Admission Pro is designed specifically for engineering colleges to make the admission process more efficient. By reducing the reliance on Excel, it allows for a more collaborative and streamlined approach to managing admissions. Key features include automated application processing, real-time status tracking, and seamless integration with existing college management systems, ensuring a hassle-free admission experience."
  },
  {
    title: 'Student Assure', 
    url: 'https://studentassure.vercel.app/',  // Add the URL here
    content: (
      <a href="https://studentassure.vercel.app/" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/studentassure.png"
          width={800}
          height={300}
          className="h-full w-full object-cover"
          alt="Student Assure"
        />
      </a>
    ), 
    description: "Student Assure is a feedback system where students can provide feedback on various aspects of their college experience. The platform connects students with educators, fostering a collaborative environment that enhances the learning experience by promoting open communication and constructive feedback."
  },
]

const ProjectsShowcase = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Our Projects</h3>
        <StickyScroll content={projects}></StickyScroll>
      </div>
    </section>
  )
}

export default ProjectsShowcase
