'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import PageLayout from './PageLayout';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <PageLayout 
      title="Projects" 
      description="Here are some of the projects I've worked on"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card hover-lift relative overflow-hidden group"
          >
            {/* Project Image/Icon Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 dark:from-primary-light/5 dark:to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                {project.title}
              </h2>
              
              <ul className="mt-2 space-y-1">
                {project.description.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                    className="text-gray-600 dark:text-gray-300 flex items-start"
                  >
                    <span className="text-primary dark:text-primary-light mr-2">•</span>
                    {point}
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech: string, idx: number) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-100 dark:bg-gray-700 text-sm px-2 py-1 rounded-full text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <div className="mt-6 flex items-center gap-4">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-sm font-medium">Source Code</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
} 