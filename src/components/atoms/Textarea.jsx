import React from 'react';
import { motion } from 'framer-motion';

const Textarea = ({ className = '', ...props }) => {
  return (
    <motion.textarea
      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 placeholder-gray-400 resize-none ${className}`}
      {...props}
    />
  );
};

export default Textarea;