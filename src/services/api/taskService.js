// Helper function to create delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // All fields for display purposes
      const tableFields = [
        'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
        'title', 'description', 'completed', 'created_at'
      ];

      const params = {
        fields: tableFields,
        orderBy: [
          {
            fieldName: "completed",
            SortType: "ASC"
          },
          {
            fieldName: "created_at", 
            SortType: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const tableFields = [
        'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
        'title', 'description', 'completed', 'created_at'
      ];

      const params = {
        fields: tableFields
      };

      const response = await apperClient.getRecordById('task', id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          title: taskData.title,
          description: taskData.description || '',
          completed: false,
          created_at: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${failedRecords}`);
          throw new Error(failedRecords[0].message || 'Failed to create task');
        }

        return successfulRecords[0].data;
      }
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields that are being updated
      const updateRecord = { Id: id };
      
      if (updateData.title !== undefined) {
        updateRecord.title = updateData.title;
      }
      if (updateData.description !== undefined) {
        updateRecord.description = updateData.description;
      }
      if (updateData.completed !== undefined) {
        updateRecord.completed = updateData.completed;
      }

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${failedUpdates}`);
          throw new Error(failedUpdates[0].message || 'Failed to update task');
        }

        return successfulUpdates[0].data;
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${failedDeletions}`);
          throw new Error(failedDeletions[0].message || 'Failed to delete task');
        }

        return true;
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};

export default taskService;