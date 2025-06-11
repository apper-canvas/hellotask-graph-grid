// Helper function to create delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const userPreferencesService = {
  async getPreferences() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // All fields for display purposes
      const tableFields = [
        'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
        'theme'
      ];

      const params = {
        fields: tableFields,
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords('user_preference', params);

      if (!response.success) {
        console.error(response.message);
        // Return default preferences if no record exists
        return { name: '', theme: 'light' };
      }

      const preferences = response.data && response.data.length > 0 ? response.data[0] : null;
      
      if (!preferences) {
        // Create default preferences record
        return await this.createDefaultPreferences();
      }

      return {
        id: preferences.Id,
        name: preferences.Name || '',
        theme: preferences.theme || 'light'
      };
    } catch (error) {
      console.error("Error fetching preferences:", error);
      // Return default preferences on error
      return { name: '', theme: 'light' };
    }
  },

  async createDefaultPreferences() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: '',
          theme: 'light'
        }]
      };

      const response = await apperClient.createRecord('user_preference', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${failedRecords}`);
          throw new Error(failedRecords[0].message || 'Failed to create preferences');
        }

        const newPreferences = successfulRecords[0].data;
        return {
          id: newPreferences.Id,
          name: newPreferences.Name || '',
          theme: newPreferences.theme || 'light'
        };
      }
    } catch (error) {
      console.error("Error creating default preferences:", error);
      throw error;
    }
  },

  async updateName(name) {
    try {
      const preferences = await this.getPreferences();

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Id: preferences.id,
          Name: name.trim()
        }]
      };

      const response = await apperClient.updateRecord('user_preference', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${failedUpdates}`);
          throw new Error(failedUpdates[0].message || 'Failed to update name');
        }

        const updatedPreferences = successfulUpdates[0].data;
        return {
          id: updatedPreferences.Id,
          name: updatedPreferences.Name || '',
          theme: updatedPreferences.theme || 'light'
        };
      }
    } catch (error) {
      console.error("Error updating name:", error);
      throw error;
    }
  },

  async updateTheme(theme) {
    try {
      const preferences = await this.getPreferences();

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Id: preferences.id,
          theme: theme
        }]
      };

      const response = await apperClient.updateRecord('user_preference', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${failedUpdates}`);
          throw new Error(failedUpdates[0].message || 'Failed to update theme');
        }

        const updatedPreferences = successfulUpdates[0].data;
        return {
          id: updatedPreferences.Id,
          name: updatedPreferences.Name || '',
          theme: updatedPreferences.theme || 'light'
        };
      }
    } catch (error) {
      console.error("Error updating theme:", error);
      throw error;
    }
  },

  async resetPreferences() {
    try {
      const preferences = await this.getPreferences();

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields with default values
      const params = {
        records: [{
          Id: preferences.id,
          Name: '',
          theme: 'light'
        }]
      };

      const response = await apperClient.updateRecord('user_preference', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${failedUpdates}`);
          throw new Error(failedUpdates[0].message || 'Failed to reset preferences');
        }

        const resetPreferences = successfulUpdates[0].data;
        return {
          id: resetPreferences.Id,
          name: resetPreferences.Name || '',
          theme: resetPreferences.theme || 'light'
        };
      }
    } catch (error) {
      console.error("Error resetting preferences:", error);
      throw error;
    }
  }
};

export default userPreferencesService;