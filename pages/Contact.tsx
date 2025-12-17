import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Contact = () => {
  const { siteConfig } = useStore();

  const contactMethods = [
    {
      name: 'Instagram',
      icon: <Instagram size={40} />,
      label: siteConfig.instagramHandle,
      action: 'Follow & DM',
      link: `https://instagram.com/${siteConfig.instagramHandle.replace('@', '')}`,
      color: 'hover:border-pink-500 hover:text-pink-500',
      bg: 'hover:bg-pink-500/5'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={40} />,
      label: siteConfig.whatsappNumber,
      action: 'Chat on WhatsApp',
      link: `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`,
      color: 'hover:border-green-500 hover:text-green-500',
      bg: 'hover:bg-green-500/5'
    },
    {
      name: 'Email',
      icon: <Mail size={40} />,
      label: siteConfig.contactEmail,
      action: 'Send an Email',
      link: `mailto:${siteConfig.contactEmail}`,
      color: 'hover:border-indigo-500 hover:text-indigo-500',
      bg: 'hover:bg-indigo-500/5'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Create Together</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Ready to elevate your brand? Reach out through any of the platforms below. We typically respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, idx) => (
            <motion.a
              key={method.name}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group flex flex-col items-center p-10 bg-zinc-900 border border-zinc-800 rounded-2xl transition-all duration-300 ${method.color} ${method.bg}`}
            >
              <div className="mb-6 p-4 bg-zinc-950 rounded-full border border-zinc-800 group-hover:scale-110 transition-transform duration-300 text-zinc-300 group-hover:text-inherit">
                {method.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{method.name}</h3>
              <p className="text-zinc-400 mb-6 font-medium">{method.label}</p>
              <span className="text-sm font-semibold tracking-wide uppercase border-b border-transparent group-hover:border-current transition-all">
                {method.action}
              </span>
            </motion.a>
          ))}
        </div>
        
        <div className="mt-20 text-center">
             <div className="inline-block p-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="bg-zinc-950 rounded-full px-8 py-4">
                    <p className="text-zinc-300 font-medium">Currently accepting new projects for <span className="text-white font-bold">Q4 2024</span></p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;