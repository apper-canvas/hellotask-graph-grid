import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const NameSetup = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    await onSubmit(name.trim());
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-center mb-6"
        >
          <ApperIcon name="Heart" className="w-16 h-16 text-primary mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-heading gradient-text text-center mb-2"
        >
          Welcome to HelloTask!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-center mb-8"
        >
          Let's personalize your experience. What should we call you?
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 placeholder-gray-400"
              disabled={isSubmitting}
              autoFocus
            />
          </motion.div>

          <motion.button
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, brightness: 1.1 }}
            whileTap={{ scale: 0.98 }}
            disabled={!name.trim() || isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Setting up...
              </div>
            ) : (
              "Let's Get Started! 🚀"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default NameSetup;