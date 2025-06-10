import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TaskItem = ({ task, index, onToggle, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000); // Auto-hide after 3 seconds
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ delay: index * 0.05 }}
      layout
      className={`group border-b border-gray-100 last:border-b-0 transition-all ${
        task.completed ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50/50'
      }`}
    >
      <div className="flex items-start gap-4 p-6">
        {/* Checkbox */}
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggle}
          className="flex-shrink-0 mt-1 p-0 bg-transparent hover:bg-transparent shadow-none"
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-gradient-to-r from-primary to-secondary border-transparent'
              : 'border-gray-300 hover:border-primary'
          }`}>
            {task.completed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <ApperIcon name="Check" size={14} className="text-white" />
              </motion.div>
            )}
          </div>
        </Button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <motion.h3
            layout
            className={`font-medium text-gray-800 transition-all ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </motion.h3>
          
          {task.description && (
            <motion.p
              layout
              className={`mt-1 text-sm transition-all ${
                task.completed ? 'text-gray-400 line-through' : 'text-gray-600'
              }`}
            >
              {task.description}
            </motion.p>
          )}
          
          <motion.div
            layout
            className="mt-2 text-xs text-gray-400"
          >
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </motion.div>
        </div>

        {/* Delete Button */}
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className={`flex-shrink-0 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 bg-transparent shadow-none
            ${showDeleteConfirm
              ? 'bg-red-100 text-red-600'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
        >
          <ApperIcon 
            name={showDeleteConfirm ? "AlertCircle" : "Trash2"} 
            size={16} 
          />
        </Button>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 pb-4 bg-red-50 border-t border-red-100"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-700">
              Click delete again to confirm
            </span>
            <Button
              onClick={() => setShowDeleteConfirm(false)}
              className="text-red-500 hover:text-red-700 p-0 bg-transparent hover:bg-transparent shadow-none"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskItem;