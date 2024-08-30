"use client";

import { motion } from 'framer-motion';
import { FaCloud, FaRobot, FaShieldAlt, FaUserFriends,FaRegUser} from 'react-icons/fa';
import { MdOutlineSupportAgent, MdArchitecture } from "react-icons/md";
import { FcCollaboration } from "react-icons/fc";
import { BiSolidCustomize } from "react-icons/bi";
import { LuDatabaseBackup } from "react-icons/lu";
import { FaMobileScreen } from "react-icons/fa6";
import { GrPerformance } from "react-icons/gr";
const features = [
  {
    icon: FaUserFriends,
    title: 'User-Friendly Interface',
    description: 'Intuitive design: Our solutions are designed with the user in mind, ensuring an easy-to-navigate interface that requires minimal training.'
  },
  {
    icon: FcCollaboration,
    title: 'Real-Time Collaboration',
    description: 'Teamwork made simple: Facilitate seamless collaboration with tools that allow your team to work together in real time, regardless of location.'
  },
  {
    icon: MdArchitecture,
    title: 'Scalable Architecture',
    description: 'Grow with confidence: Our solutions are built to scale, allowing your business to expand without limitations or disruptions.'
  },
  {
    icon: BiSolidCustomize,
    title: 'Customizable Solutions',
    description: 'Tailored to your needs: We offer customizable features that can be adapted to meet the specific requirements of your industry and business model.'
  },
  {
    icon: MdOutlineSupportAgent,
    title: '24/7 Support',
    description: 'Always there for you: Our dedicated support team is available around the clock to assist with any issues or questions you may have.'
  },
  {
    icon: LuDatabaseBackup,
    title: 'Data Backup and Recovery',
    description: 'Peace of mind: Ensure the safety of your data with automatic backups and a reliable recovery system to prevent data loss.'
  },
  {
    icon: FaCloud,
    title: 'Cloud Integration',
    description: 'Seamless cloud solutions: Integrate effortlessly with cloud platforms to enhance functionality and scalability.'
  },
  {
    icon: FaRobot,
    title: 'AI-Powered Analytics',
    description: 'Data-driven insights: Utilize AI to analyze data and drive informed business decisions with advanced analytics.'
  },
  {
    icon: FaShieldAlt,
    title: 'Secure Infrastructure',
    description: 'Robust security: Protect your infrastructure with top-notch security measures to ensure data safety and integrity.'
  },
  {
    icon: FaMobileScreen ,
    title: 'Mobile Accessibility',
    description: 'Seamless Mobile Experience: Access your software solutions anytime, anywhere with full mobile compatibility.'
  },
  {
    icon: FaRegUser,
    title: 'Personalized User Experience',
    description: 'Customized Interactions: Offer personalized settings and features based on user preferences to enhance usability and satisfaction.'
  },
  {
    icon: GrPerformance,
    title: 'Optimized Search Performance',
    description: 'Fast and Reliable Search: Quickly find what you need with our high-performance search, designed to handle large amounts of data and heavy usage smoothly.'
  },
 
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Our Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg shadow-md bg-dark dark:bg-gray-800"
            >
              <feature.icon className="text-4xl text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2  text-primary">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
