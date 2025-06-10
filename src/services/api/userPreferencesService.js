import userPreferencesData from '../mockData/userPreferences.json';

// Helper function to create delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get data from localStorage or use default
const getStoredPreferences = () => {
  try {
    const stored = localStorage.getItem('hellotask_preferences');
    return stored ? JSON.parse(stored) : { ...userPreferencesData };
  } catch (error) {
    console.error('Error loading preferences from localStorage:', error);
    return { ...userPreferencesData };
  }
};

// Save data to localStorage
const savePreferencesToStorage = (preferences) => {
  try {
    localStorage.setItem('hellotask_preferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences to localStorage:', error);
  }
};

const userPreferencesService = {
  async getPreferences() {
    await delay(200);
    const preferences = getStoredPreferences();
    return { ...preferences };
  },

  async updateName(name) {
    await delay(300);
    const preferences = getStoredPreferences();
    
    const updatedPreferences = {
      ...preferences,
      name: name.trim()
    };

    savePreferencesToStorage(updatedPreferences);
    return { ...updatedPreferences };
  },

  async updateTheme(theme) {
    await delay(250);
    const preferences = getStoredPreferences();
    
    const updatedPreferences = {
      ...preferences,
      theme: theme
    };

    savePreferencesToStorage(updatedPreferences);
    return { ...updatedPreferences };
  },

  async resetPreferences() {
    await delay(200);
    const defaultPreferences = { ...userPreferencesData };
    savePreferencesToStorage(defaultPreferences);
    return { ...defaultPreferences };
  }
};

export default userPreferencesService;