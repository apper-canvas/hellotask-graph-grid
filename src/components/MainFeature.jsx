import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import ProgressFooter from './ProgressFooter';
import taskService from '../services/api/taskService';
import { toast } from 'react-toastify';

const MainFeature = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await taskService.getAll();
        setTasks(result);
      } catch (err) {
        setError(err.message || 'Failed to load tasks');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task added successfully! 📝');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await taskService.update(taskId, { 
        completed: !task.completed 
      });
      
      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ));
      
      if (updatedTask.completed) {
        toast.success('Great job! Task completed! ✅');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <TaskInput onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
      <ProgressFooter
        totalTasks={tasks.length}
        completedTasks={completedTasks.length}
        completionPercentage={completionPercentage}
      />
    </div>
  );
};

export default MainFeature;