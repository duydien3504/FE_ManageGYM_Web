import axiosInstance from './axios.config';

const API_PREFIX = '/api/v1/workouts';

/**
 * Log a workout session
 * @param {Object} data - Workout data
 * @param {number|null} data.plan_schedule_id - Schedule ID (null for free workout)
 * @param {string} data.performed_at - ISO datetime string
 * @param {number} data.duration_minutes - Duration in minutes
 * @param {string} data.notes - Optional notes
 * @param {Array} data.details - Array of exercise details
 * @returns {Promise} Response with history_id
 */
export const logWorkout = async (data) => {
    try {
        const response = await axiosInstance.post(API_PREFIX, data);
        return response;
    } catch (error) {
        console.error('Error logging workout:', error);
        throw error;
    }
};

/**
 * Get workout history
 * @param {number} month - Month (1-12)
 * @param {number} year - Year
 * @returns {Promise} List of workout history
 */
export const getWorkoutHistory = async (month, year) => {
    try {
        const params = {};
        if (month) params.month = month;
        if (year) params.year = year;

        const response = await axiosInstance.get(`${API_PREFIX}/history`, { params });
        return response;
    } catch (error) {
        console.error('Error fetching workout history:', error);
        throw error;
    }
};

/**
 * Get workout detail
 * @param {number} id - History ID
 * @returns {Promise} Workout detail with exercises
 */
export const getWorkoutDetail = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_PREFIX}/history/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching workout detail:', error);
        throw error;
    }
};

/**
 * Delete workout history
 * @param {number} id - History ID
 * @returns {Promise} Response
 */
export const deleteWorkout = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_PREFIX}/history/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting workout:', error);
        throw error;
    }
};

const workoutsService = {
    logWorkout,
    getWorkoutHistory,
    getWorkoutDetail,
    deleteWorkout,
};

export default workoutsService;
