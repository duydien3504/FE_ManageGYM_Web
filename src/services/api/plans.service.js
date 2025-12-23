import axiosInstance from './axios.config';

export const plansService = {
   /**
    * Get user's workout plans
    * @returns {Promise} List of user's plans (non-deleted only)
    */
   getUserPlans: async () => {
      try {
         const response = await axiosInstance.get('/api/v1/plans');
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Get plan details with schedules and exercises
    * @param {number} id - Plan ID
    * @returns {Promise} Plan with nested schedules and exercises
    */
   getPlanDetails: async (id) => {
      try {
         const response = await axiosInstance.get(`/api/v1/plans/${id}`);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Create new workout plan
    * @param {Object} data - { plan_name, start_date, end_date, description }
    * @returns {Promise} Response with plan_id
    */
   createPlan: async (data) => {
      try {
         const response = await axiosInstance.post('/api/v1/plans', data);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Update workout plan
    * @param {number} id - Plan ID
    * @param {Object} data - { plan_name, start_date, end_date, description }
    * @returns {Promise} Response
    */
   updatePlan: async (id, data) => {
      try {
         const response = await axiosInstance.put(`/api/v1/plans/${id}`, data);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Delete workout plan (soft delete)
    * @param {number} id - Plan ID
    * @returns {Promise} Response
    */
   deletePlan: async (id) => {
      try {
         const response = await axiosInstance.delete(`/api/v1/plans/${id}`);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Clone workout plan
    * @param {number} id - Plan ID to clone
    * @returns {Promise} Response with new_plan_id
    */
   clonePlan: async (id) => {
      try {
         const response = await axiosInstance.post(`/api/v1/plans/${id}/clone`);
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Add schedule to plan
    * @param {number} planId - Plan ID
    * @param {Object} data - { day_of_week, title }
    * @returns {Promise} Response with schedule_id
    */
   addSchedule: async (planId, data) => {
      try {
         const response = await axiosInstance.post(`/api/v1/plans/${planId}/schedules`, data);
         return response;
      } catch (error) {
         throw error;
      }
   },
};
