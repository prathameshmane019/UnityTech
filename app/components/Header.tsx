"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header: React.FC = () => {
  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About Us', href: 'about' },
    { name: 'Solutions', href: 'solutions' },
    { name: 'Contact', href: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Adjust this value based on your header height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="shadow-md fixed top-0 left-0 right-0 bg-background z-10">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold text-text cursor-pointer"
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          UnityTech Solutions
        </motion.h1>
        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <motion.span
                  className="text-text hover:text-primary transition-colors cursor-pointer"
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.span>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/user">
        <motion.button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} 
        >
          Get Started
        </motion.button> </Link>
      </div>
    </header>
  );
};

export default Header;