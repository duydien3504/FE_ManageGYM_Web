import axiosInstance from './axios.config';

export const schedulesService = {
   /**
    * Add exercise to schedule
    * @param {number} scheduleId - Schedule ID
    * @param {Object} data - { exercise_id, target_sets, target_reps, target_rest_time }
    * @returns {Promise} Response with plan_exercise_id
    */
   addExerciseToSchedule: async (scheduleId, data) => {
      try {
         const response = await axiosInstance.post(
            `/api/v1/plans/schedules/${scheduleId}/exercises`,
            data
         );
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Update plan exercise details
    * @param {number} planExerciseId - Plan Exercise ID
    * @param {Object} data - { target_sets, target_reps, target_rest_time }
    * @returns {Promise} Response
    */
   updatePlanExercise: async (planExerciseId, data) => {
      try {
         const response = await axiosInstance.put(
            `/api/v1/plans/exercises/${planExerciseId}`,
            data
         );
         return response;
      } catch (error) {
         throw error;
      }
   },

   /**
    * Delete exercise from plan
    * @param {number} planExerciseId - Plan Exercise ID
    * @returns {Promise} Response
    */
   deletePlanExercise: async (planExerciseId) => {
      try {
         const response = await axiosInstance.delete(
            `/api/v1/plans/exercises/${planExerciseId}`
         );
         return response;
      } catch (error) {
         throw error;
      }
   },
};
