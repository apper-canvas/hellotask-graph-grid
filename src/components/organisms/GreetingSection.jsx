import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const GreetingSection = ({ userName, onEditName }) => {
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning');
        setTimeOfDay('morning');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good afternoon');
        setTimeOfDay('afternoon');
      } else {
        setGreeting('Good evening');
        setTimeOfDay('evening');
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getGreetingIcon = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'Sun';
      case 'afternoon':
        return 'CloudSun';
      case 'evening':
        return 'Moon';
      default:
        return 'Sun';
    }
  };

  const getMotivationalMessage = () => {
    const messages = {
      morning: "Ready to tackle today's goals?",
      afternoon: "Keep up the great momentum!",
      evening: "Let's wrap up the day strong!"
    };
    return messages[timeOfDay] || "Let's get things done!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-8"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="mb-4"
      >
        <ApperIcon 
          name={getGreetingIcon()} 
          className="w-16 h-16 text-accent mx-auto drop-shadow-lg" 
        />
      </motion.div>
      
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-4xl md:text-5xl font-heading gradient-text mb-2"
      >
        {greeting}, {userName}!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-lg mb-4"
      >
        {getMotivationalMessage()}
      </motion.p>

      <Button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEditName}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-primary transition-colors bg-transparent shadow-none"
      >
        <ApperIcon name="Edit2" size={16} />
        Change name
      </Button>
    </motion.div>
  );
};

export default GreetingSection;