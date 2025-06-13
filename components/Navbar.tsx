'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  FaHome, 
  FaUser, 
  FaProjectDiagram, 
  FaGraduationCap, 
  FaBriefcase, 
  FaFileAlt, 
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'Education', path: '/education', icon: FaGraduationCap },
  { name: 'Experience', path: '/experience', icon: FaBriefcase },
  { name: 'Projects', path: '/projects', icon: FaProjectDiagram },
  { name: 'Skills', path: '/skills', icon: FaUser },
  { name: 'Resume', path: '/resume', icon: FaFileAlt },
  { name: 'Contact', path: '/contact', icon: FaEnvelope },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`text-3xl font-extrabold text-transparent bg-clip-text px-4 py-2 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-emerald-300 to-teal-500' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-700'
                }`}
              >
                SW
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-6 mx-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 text-lg font-bold transition-colors duration-200 px-3 py-2 rounded-lg ${
                  pathname === item.path
                    ? 'text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5'
                    : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold transition-colors ${
                    pathname === item.path
                      ? 'bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
