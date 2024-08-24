// components/Statistics.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FcStatistics } from 'react-icons/fc';

const stats = [
  { number: '500+', label: 'Clients Served' },
  { number: '1000+', label: 'Projects Completed' },
  { number: '50+', label: 'Countries Reached' },
  { number: '24/7', label: 'Support' },
];

const Statistics = () => {
  return (
    <section className="py-20  text-text">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FcStatistics className="text-6xl mr-4" />
          <h2 className="text-3xl font-bold">Our Impact</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="text-4xl font-bold mb-2 text-primary"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-xl text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;