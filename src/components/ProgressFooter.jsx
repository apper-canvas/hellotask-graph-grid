import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const ProgressFooter = ({ totalTasks, completedTasks, completionPercentage }) => {
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
        
        <div className="relative">
          {/* Progress Ring */}
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
              r="32"
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="40"
              cy="40"
              r="32"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={201.06} // 2 * π * 32
              initial={{ strokeDashoffset: 201.06 }}
              animate={{ 
                strokeDashoffset: 201.06 - (201.06 * completionPercentage) / 100 
              }}
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
              {completionPercentage}%
            </motion.span>
          </div>
        </div>
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

export default ProgressFooter;