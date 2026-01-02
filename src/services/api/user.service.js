import axiosInstance from './axios.config';

/**
 * User service for user-related API calls
 */
export const userService = {
    /**
     * Get current user profile with metrics
     * @returns {Promise} User profile data
     */
    getProfile: async () => {
        try {
            const response = await axiosInstance.get('/api/v1/users/profile');
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Create/record new body metrics
     * @param {Object} data - Body metrics data
     * @param {number} data.weight - Weight in kg
     * @param {number} data.height - Height in cm
     * @param {number} [data.body_fat_percentage] - Body fat percentage (optional)
     * @returns {Promise} Response with metric_id and message
     */
    createBodyMetrics: async (data) => {
        try {
            const response = await axiosInstance.post('/api/v1/users/body-metrics', data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
