'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Experience {
  company: string;
  role: string;
  location: string;
  startDateText: string;
  endDateText: string;
  description: string;
  logo: string;
}

interface ExperienceListProps {
  experienceList: Experience[];
}

export default function ExperienceList({ experienceList }: ExperienceListProps) {
  return (
    <PageLayout 
      title="Experience" 
      description="My professional journey and work experience"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical Timeline Line - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute left-[180px] lg:left-[200px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 md:space-y-12"
          >
            {experienceList.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col md:flex-row"
              >
                {/* Role Title - Mobile: Above card, Desktop: Left side */}
                <div className="md:w-[180px] lg:w-[200px] md:pr-8 md:pt-6 mb-4 md:mb-0 md:flex md:justify-end">
                  <h2 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-800 dark:text-gray-100 md:text-right md:whitespace-nowrap hover:text-primary dark:hover:text-primary-light transition-colors">
                    {job.role}
                  </h2>
                </div>

                {/* Timeline Dot - Hidden on mobile */}
                <div className="hidden md:block absolute left-[178px] lg:left-[198px] top-6 w-3 h-3 rounded-full bg-primary dark:bg-primary-light z-10 border-2 border-gray-50 dark:border-gray-900" />

                {/* Card Content */}
                <div className="flex-1 md:pl-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="card hover-lift border border-gray-300 dark:border-gray-700/50 group p-4 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        {job.logo && (
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded flex-shrink-0"
                          />
                        )}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                          {job.company}
                        </h3>
                      </div>
                      
                      {/* Date and Location - Mobile: Below company, Desktop: Right side */}
                      <div className="flex flex-col sm:items-end gap-1 w-full sm:w-auto">
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {job.startDateText} – {job.endDateText}
                        </span>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <FaMapMarkerAlt className="w-3 h-3 flex-shrink-0" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        {job.description.split('\n').map((line, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors leading-relaxed"
                          >
                            {line.trim()}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
} 