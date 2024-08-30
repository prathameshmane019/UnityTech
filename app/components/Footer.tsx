"use client";
import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

const Footer = () => {
  const links = [
    {
      title: "Twitter",
      icon: (
        <IconBrandX
          className="h-full w-full text-blue-500 dark:text-blue-300" // Twitter blue
        />
      ),
      href: "https://x.com/UnitytechS",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram
          className="h-full w-full text-pink-500 dark:text-pink-300" // Instagram pink
        />
      ),
      href: "https://www.instagram.com/unitytechsolutions1/",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin
          className="h-full w-full text-blue-700 dark:text-blue-500" // LinkedIn blue
        />
      ),
      href: "https://www.linkedin.com/company/unitytechsolutions24/",
    },
    {
      title: "Mail",
      icon: (
        <IconMail
          className="h-full w-full text-red-500 dark:text-red-400" // Red color for Mail
        />
      ),
      href: "mailto:unitytechsolutions24@gmail.com",
    },
  ];

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Company info section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="mt-4 md:mt-0 text-center md:text-left">
              <h4 className="text-2xl font-bold">UnityTech Solutions</h4>
              <p className="text-gray-400">Innovate. Transform. Succeed.</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-left mx-10">
              <p className="text-gray-400">Contact us at: <a href="tel:+918788761515" className="text-gray-300 hover:underline">878-876-1515</a></p>
            </div>
          </div>
          {/* Icons section */}
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <FloatingDock
              mobileClassName="translate-y-20" // only for demo, remove for production
              items={links}
            />
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © 2024 UnityTech Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
