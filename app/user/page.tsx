"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Module {
  name: string;
  path: string;
  description: string;
  imageSrc: string;
}

const modules: Module[] = [
  { 
    name: 'Admission Pro', 
    path: 'https://admission-pro.vercel.app', 
    description: 'Streamline student admissions and enrollment processes', 
    imageSrc: '/admission.png'
  },
  { 
    name: 'Attendance Pro', 
    path: 'https://attendance-pro.vercel.app', 
    description: 'Efficiently track and manage student attendance', 
    imageSrc: '/attendance.png'
  },
  { 
    name: 'Student Assure', 
    path: 'https://studentassure.vercel.app', 
    description: 'Collect and analyze valuable student feedback', 
    imageSrc: '/studentassure.png'
  },
];

const Dashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const moduleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-12 bg-slate-200 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">UnityTech ERP Modules</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {modules.map((module, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              variants={moduleVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="relative h-56 bg-gray-100">
                <Image 
                  src={module.imageSrc} 
                  alt={module.name} 
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{module.name}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                </div>
                <a 
                  href={module.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-500 text-white py-3 px-4 rounded-md text-center hover:bg-blue-600 transition-colors duration-300 font-medium"
                >
                  Go to {module.name}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;