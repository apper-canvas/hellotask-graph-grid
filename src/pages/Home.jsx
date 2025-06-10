import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import GreetingHeader from '../components/GreetingHeader';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import ProgressFooter from '../components/ProgressFooter';
import NameSetup from '../components/NameSetup';
import taskService from '../services/api/taskService';
import userPreferencesService from '../services/api/userPreferencesService';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNameSetup, setShowNameSetup] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [tasksData, prefsData] = await Promise.all([
          taskService.getAll(),
          userPreferencesService.getPreferences()
        ]);
        
        setTasks(tasksData);
        setUserPreferences(prefsData);
        
        if (!prefsData?.name) {
          setShowNameSetup(true);
        }
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNameSubmit = async (name) => {
    try {
      const updatedPrefs = await userPreferencesService.updateName(name);
      setUserPreferences(updatedPrefs);
      setShowNameSetup(false);
      toast.success(`Welcome, ${name}! 🎉`);
    } catch (error) {
      toast.error('Failed to save name');
    }
  };

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
      } else {
        toast.info('Task marked as incomplete');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </motion.div>
      </div>
    );
  }

  if (showNameSetup) {
    return <NameSetup onSubmit={handleNameSubmit} />;
  }

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Greeting Header */}
          <GreetingHeader 
            userName={userPreferences?.name || 'Friend'} 
            onEditName={() => setShowNameSetup(true)}
          />

          {/* Task Input */}
          <TaskInput onAddTask={handleAddTask} />

          {/* Main Task List */}
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />

          {/* Progress Footer */}
          <ProgressFooter
            totalTasks={tasks.length}
            completedTasks={completedTasks.length}
            completionPercentage={completionPercentage}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;