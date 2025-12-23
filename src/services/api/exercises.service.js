import axiosInstance from './axios.config';

export const exercisesService = {
   /**
    * Get list of exercises with filtering and pagination
    * @param {Object} params - { muscle_group_id, difficulty, page }
    * @returns {Promise} Response with data and pagination
    */
   getExercises: async (params = {}) => {
      try {
         const response = await axiosInstance.get('/api/v1/exercises', { params });
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Get exercise details with media
    * @param {number} id - Exercise ID
    * @returns {Promise} Exercise details with media array
    */
   getExerciseDetails: async (id) => {
      try {
         const response = await axiosInstance.get(`/api/v1/exercises/${id}`);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Get all muscle groups for filtering
    * @returns {Promise} List of muscle groups
    */
   getMuscleGroups: async () => {
      try {
         const response = await axiosInstance.get('/api/v1/muscle-groups');
         return response;
      } catch (error) {
         throw error;
      }
   },
};
