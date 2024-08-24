// components/TextAnimation.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TextAnimation = () => {
  const text = "Innovate. Transform. Succeed.";

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8 text-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          We bring your ideas to life with cutting-edge technology.
        </motion.p>
      </div>
    </div>
  );
};

export default TextAnimation;