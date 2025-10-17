'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { FaDownload } from 'react-icons/fa';

export default function ResumePage() {
  // Google Drive file ID from your link
  const fileId = "1cgk0xkGASWkOxEk5fzRcMx9adU7MBgYa";
  
  // Construct the direct download and embed URLs
  const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const embedLink = `https://drive.google.com/file/d/${fileId}/preview`;

  const downloadButton = (
    <motion.a
      href={downloadLink}
      download
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 dark:bg-primary-light dark:hover:bg-primary-light/90 text-white transition-colors"
    >
      <FaDownload className="w-4 h-4" />
      <span>Download PDF</span>
    </motion.a>
  );

  return (
    <PageLayout 
      title="Resume" 
      description="View and download my complete resume"
      actions={downloadButton}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Embedded PDF Viewer */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="border border-gray-300 dark:border-gray-700/50 rounded-lg overflow-hidden bg-white dark:bg-gray-800/50"
          >
            <iframe 
              src={embedLink} 
              className="w-full h-[800px]" 
              title="Resume PDF"
            />
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
  
