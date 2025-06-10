import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      className={`transition-all ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;