import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';

const TaskForm = ({ onAddTask }) => {
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
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What would you like to accomplish?"
            disabled={isSubmitting}
          />
          <ApperIcon 
            name="Plus" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
        </div>

        <AnimatePresence>
          {showDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some details (optional)"
                rows={3}
                disabled={isSubmitting}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDescription(!showDescription)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-primary bg-transparent shadow-none"
          >
            <ApperIcon name={showDescription ? "ChevronUp" : "FileText"} size={16} />
            {showDescription ? "Hide details" : "Add details"}
          </Button>

          <Button
            type="submit"
            whileHover={{ scale: 1.05, brightness: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!title.trim() || isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;