'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Education {
  institution: string;
  degree: string;
  location: string;
  startDateText: string;
  endDateText: string;
  grade: string;
  coursework: string[];
  logo: string;
}

interface EducationListProps {
  educationList: Education[];
}

export default function EducationList({ educationList }: EducationListProps) {
  return (
    <PageLayout 
      title="Education" 
      description="My academic journey and qualifications"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {educationList.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card hover-lift border border-gray-300 dark:border-gray-700/50 p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex gap-3 sm:gap-4 items-start sm:items-center flex-1">
                  {edu.logo && (
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                      {edu.degree}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-tight">
                      {edu.institution}
                    </p>
                  </div>
                </div>
                
                {/* Date and Location - Mobile: Below content, Desktop: Right side */}
                <div className="flex flex-col sm:items-end gap-1 w-full sm:w-auto">
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {edu.startDateText} – {edu.endDateText}
                  </span>
                  {edu.location && (
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <FaMapMarkerAlt className="w-3 h-3 flex-shrink-0" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                {edu.grade && (
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                    Grade: {edu.grade}
                  </p>
                )}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-3 sm:mt-4">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
                      Relevant Coursework:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full font-medium hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
} 