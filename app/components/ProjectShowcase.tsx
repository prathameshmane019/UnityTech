// components/ProjectsShowcase.tsx
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FocusCards } from './ui/focus-card'
import { StickyScroll } from './ui/sticky-scroll-reveal'

const projects = [
  {
    title: 'College Attendance Management System', content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/attendance.svg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ), description: "Attendance System is designed to efficiently track and manage student attendance with ease. It automates the attendance process, making it more convenient for teachers and students.Key features include automated attendance tracking, detailed attendance reports, and easy integration with existing College management systems." },
  {
      title: 'College Feeback Management System', content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/feedback.svg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ), description: "At Student Assure, we believe in the power of student feedback to drive improvement in education. Our platform connects college students with educators, fostering a collaborative environment that enhances the learning experience for everyone involved.By providing a space for open communication and constructive feedback, we aim to create a more responsive and effective educational system that truly meets the needs of students and faculty alike."    },
  {
    title: 'Addmission Management System', content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/addmision.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>)
      ,
    description: "Efficiently process student applications, analyze data based on subjects, interests, and qualifications and automate the assignment of applicants to faculty members for admission related process."  },

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