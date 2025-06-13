'use client';

import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function PageLayout({ children, title, description, actions }: PageLayoutProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-primary dark:text-primary-light">
              {title}
            </h1>
            {actions && (
              <div className="flex items-center gap-4">
                {actions}
              </div>
            )}
          </div>
          {description && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </motion.div>
        <div className="h-full">
          {children}
        </div>
      </div>
    </motion.main>
  );
} 