import axiosInstance from './axios.config';

export const adminService = {
   // ==================== MUSCLE GROUPS ====================

   /**
    * Create new muscle group
    * @param {Object} data - { group_name, description, thumbnail_url }
    * @returns {Promise} Response with group_id
    */
   createMuscleGroup: async (data) => {
      try {
         const response = await axiosInstance.post('/api/v1/admin/muscle-groups', data);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Update muscle group
    * @param {number} id - Muscle group ID
    * @param {Object} data - { group_name, description, thumbnail_url }
    * @returns {Promise} Response
    */
   updateMuscleGroup: async (id, data) => {
      try {
         const response = await axiosInstance.put(`/api/v1/admin/muscle-groups/${id}`, data);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Delete muscle group
    * @param {number} id - Muscle group ID
    * @returns {Promise} Response
    */
   deleteMuscleGroup: async (id) => {
      try {
         const response = await axiosInstance.delete(`/api/v1/admin/muscle-groups/${id}`);
         return response;
      } catch (error) {
         throw error;
      }
   },

   // ==================== EXERCISES ====================

   /**
    * Create new exercise
    * @param {Object} data - { muscle_group_id, name, difficulty_level, calories_burn_estimate, description }
    * @returns {Promise} Response with exercise_id
    */
   createExercise: async (data) => {
      try {
         const response = await axiosInstance.post('/api/v1/admin/exercises', data);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Update exercise
    * @param {number} id - Exercise ID
    * @param {Object} data - { name, difficulty_level, calories_burn_estimate, description }
    * @returns {Promise} Response
    */
   updateExercise: async (id, data) => {
      try {
         const response = await axiosInstance.put(`/api/v1/admin/exercises/${id}`, data);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Delete exercise (soft delete)
    * @param {number} id - Exercise ID
    * @returns {Promise} Response
    */
   deleteExercise: async (id) => {
      try {
         const response = await axiosInstance.delete(`/api/v1/admin/exercises/${id}`);
         return response;
      } catch (error) {
         throw error;
      }
   },

   // ==================== MEDIA ====================

   /**
    * Add media to exercise
    * @param {number} exerciseId - Exercise ID
    * @param {File[]} files - Array of image/video files
    * @returns {Promise} Response with media_id
    */
   addExerciseMedia: async (exerciseId, files) => {
      try {
         const formData = new FormData();

         // Append all files to FormData
         files.forEach((file) => {
            formData.append('files', file);
         });

         const response = await axiosInstance.post(
            `/api/v1/admin/exercises/${exerciseId}/media`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            }
         );
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Delete exercise media
    * @param {number} mediaId - Media ID
    * @returns {Promise} Response
    */
   deleteExerciseMedia: async (mediaId) => {
      try {
         const response = await axiosInstance.delete(`/api/v1/admin/exercises/media/${mediaId}`);
         return response;
      } catch (error) {
         throw error;
      }
   },
};
