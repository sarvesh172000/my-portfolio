'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PageLayout from '@/components/PageLayout';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  attachment: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || !files[0]) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, 'File size should be less than 5MB')
    .refine((files) => {
      if (!files || !files[0]) return true;
      return ACCEPTED_FILE_TYPES.includes(files[0].type);
    }, 'Only .pdf, .jpeg, .jpg and .png files are accepted'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Add this CSS class for input and textarea focus animation
const inputFocusClasses = `
  input-field relative block w-full px-4 py-3 border-2 rounded-lg 
  bg-white dark:bg-gray-900/50 
  border-gray-200 dark:border-gray-700/50 
  text-gray-900 dark:text-gray-100
  placeholder:text-gray-400 dark:placeholder:text-gray-500
  focus:border-primary dark:focus:border-primary-light
  focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20
  focus:outline-none
  transition-all duration-200 ease-in-out
  hover:border-gray-300 dark:hover:border-gray-600
`;

// File input styling
const fileInputClasses = `
  file:mr-4 file:py-2 file:px-4
  file:rounded-lg file:border-0
  file:text-sm file:font-semibold
  file:bg-primary/10 file:text-primary
  dark:file:bg-primary-light/10 dark:file:text-primary-light
  file:hover:bg-primary/20 dark:file:hover:bg-primary-light/20
  file:cursor-pointer
  cursor-pointer
`;

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('Sending...');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    
    if (data.attachment && data.attachment[0]) {
      formData.append('attachment', data.attachment[0]);
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        reset();
      } else {
        const data = await res.json();
        setStatus(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };

  const socialLinks = [
    {
      href: "mailto:sarvesh.waghmare101@gmail.com",
      icon: FaEnvelope,
      label: "Email",
    },
    {
      href: "https://www.linkedin.com/in/sarvesh-waghmare-8a631a16b/",
      icon: FaLinkedin,
      label: "LinkedIn",
      isExternal: true
    },
    {
      href: "https://github.com/sarvesh172000",
      icon: FaGithub,
      label: "GitHub",
      isExternal: true
    }
  ];

  return (
    <PageLayout 
      title="Contact" 
      description="Get in touch with me"
    >
      <div className="max-w-4xl mx-auto">
        {/* Social Media Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-8 mb-12"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="p-4 rounded-full border-2 border-gray-200 dark:border-gray-700/50 hover:border-primary dark:hover:border-primary-light group transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-primary-light/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              title={link.label}
            >
              <link.icon className="w-6 h-6 text-primary dark:text-primary-light transition-transform duration-300 ease-in-out group-hover:scale-110" />
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-2 border-gray-200 dark:border-gray-700/50 rounded-lg bg-white/50 dark:bg-gray-900/50 p-8 backdrop-blur-sm shadow-xl dark:shadow-primary-light/5"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Name
              </label>
              <input
                {...register('name')}
                placeholder="Your name"
                className={inputFocusClasses}
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.name.message?.toString()}
                </motion.p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="your.email@example.com"
                className={inputFocusClasses}
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.email.message?.toString()}
                </motion.p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Message
              </label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Your message here..."
                className={inputFocusClasses}
              />
              {errors.message && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.message.message?.toString()}
                </motion.p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Attachment (Optional)
              </label>
              <input
                type="file"
                {...register('attachment')}
                accept=".pdf,.jpg,.jpeg,.png"
                className={`${inputFocusClasses} ${fileInputClasses}`}
              />
              {errors.attachment && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.attachment.message?.toString()}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <motion.button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 dark:bg-primary-light dark:hover:bg-primary-light/90 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
              {status && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm ${
                    status.includes('success') 
                      ? 'text-green-500 dark:text-green-400' 
                      : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </PageLayout>
  );
}
