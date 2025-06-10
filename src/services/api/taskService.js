import taskData from '../mockData/tasks.json';

// Helper function to create delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get data from localStorage or use default
const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem('hellotask_tasks');
    return stored ? JSON.parse(stored) : [...taskData];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [...taskData];
  }
};

// Save data to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem('hellotask_tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

const taskService = {
  async getAll() {
    await delay(300);
    const tasks = getStoredTasks();
    // Sort tasks: incomplete first, then completed
    return tasks.sort((a, b) => {
      if (a.completed === b.completed) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.completed ? 1 : -1;
    });
  },

  async getById(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const tasks = getStoredTasks();
    
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    const updatedTasks = [...tasks, newTask];
    saveTasksToStorage(updatedTasks);
    
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(300);
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updateData,
      id: tasks[taskIndex].id, // Ensure ID cannot be changed
      createdAt: tasks[taskIndex].createdAt // Ensure createdAt cannot be changed
    };

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    saveTasksToStorage(updatedTasks);
    
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    if (filteredTasks.length === tasks.length) {
      throw new Error('Task not found');
    }

    saveTasksToStorage(filteredTasks);
    return true;
  }
};

export default taskService;