import React from 'react';
import { motion } from 'framer-motion';

const ProgressRing = ({ percentage }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="relative">
      <motion.svg
        width="80"
        height="80"
        className="transform -rotate-90"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#f3f4f6"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#4ECDC4" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl font-bold gradient-text"
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  );
};

export default ProgressRing;