import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProgressRing from '@/components/molecules/ProgressRing';

const ProgressSummary = ({ totalTasks, completedTasks, completionPercentage }) => {
  if (totalTasks === 0) return null;

  const getMotivationalMessage = () => {
    if (completionPercentage === 100) {
      return "🎉 Amazing! You've completed all your tasks!";
    } else if (completionPercentage >= 75) {
      return "🔥 You're on fire! Almost there!";
    } else if (completionPercentage >= 50) {
      return "💪 Great progress! Keep it up!";
    } else if (completionPercentage >= 25) {
      return "🌟 Nice start! You've got this!";
    } else {
      return "🚀 Every journey begins with a single step!";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Progress Today
          </h3>
          <p className="text-sm text-gray-600">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        
        <ProgressRing percentage={completionPercentage} />
      </div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <p className="text-sm font-medium text-gray-700">
          {getMotivationalMessage()}
        </p>
      </motion.div>

      {/* Achievement Badge */}
      {completionPercentage === 100 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-secondary rounded-full"
        >
          <ApperIcon name="Trophy" size={16} className="text-white" />
          <span className="text-white font-medium text-sm">
            Day Completed!
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProgressSummary;