import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    
    const taskData = {
      title: title.trim(),
      description: description.trim() || '',
      completed: false
    };

    try {
      await onAddTask(taskData);
      setTitle('');
      setDescription('');
      setShowDescription(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What would you like to accomplish?"
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 placeholder-gray-400"
            disabled={isSubmitting}
          />
          <ApperIcon 
            name="Plus" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
        </div>

        {showDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details (optional)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 placeholder-gray-400 resize-none"
              rows={3}
              disabled={isSubmitting}
            />
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDescription(!showDescription)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ApperIcon name={showDescription ? "ChevronUp" : "FileText"} size={16} />
            {showDescription ? "Hide details" : "Add details"}
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, brightness: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!title.trim() || isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" size={16} />
                Add Task
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskInput;