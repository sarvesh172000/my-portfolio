'use client';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/sarvesh172000', icon: FaGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sarvesh-waghmare-8a631a16b/', icon: FaLinkedin },
  { name: 'Email', url: 'mailto:sarvesh.waghmare101@gmail.com', icon: FaEnvelope },
];

export default function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
            © {new Date().getFullYear()} Sarvesh Waghmare. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
