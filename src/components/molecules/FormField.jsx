import React from 'react';
import { motion } from 'framer-motion';

const FormField = ({ label, children, className = '', delay = 0.4 }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className={className}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {children}
    </motion.div>
  );
};

export default FormField;