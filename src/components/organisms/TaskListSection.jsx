import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/components/molecules/TaskItem';
import ApperIcon from '@/components/ApperIcon';
import FilterTabs from '@/components/molecules/FilterTabs';

const TaskListSection = ({ tasks, onToggleTask, onDeleteTask }) => {
  const [filter, setFilter] = useState('all'); // all, active, completed

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return incompleteTasks;
      case 'completed':
        return completedTasks;
      default:
        return [...incompleteTasks, ...completedTasks];
    }
  };

  const filteredTasks = getFilteredTasks();

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mb-6"
        >
          <ApperIcon name="CheckCircle2" className="w-20 h-20 text-gray-300 mx-auto" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 mb-6">
          Start by adding your first task above! ✨
        </p>
        
        <div className="text-sm text-gray-400">
          <p>💡 Tip: Keep your tasks specific and actionable</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Filter Tabs */}
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <FilterTabs 
          tabs={[
            { key: 'all', label: 'All', count: tasks.length },
            { key: 'active', label: 'Active', count: incompleteTasks.length },
            { key: 'completed', label: 'Completed', count: completedTasks.length }
          ]}
          currentFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Task List */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-gray-500"
            >
              {filter === 'active' && 'No active tasks! 🎉'}
              {filter === 'completed' && 'No completed tasks yet'}
            </motion.div>
          ) : (
            filteredTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskListSection;