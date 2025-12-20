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
};
