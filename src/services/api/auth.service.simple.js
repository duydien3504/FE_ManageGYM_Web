import axiosInstance from './axios.config';

// Simple auth service that DOES NOT use localStorage
// Token is managed entirely by AuthContext state
export const authService = {
    /**
     * Login user - returns response, does NOT store anything
     */
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/login', credentials);
            console.log('authService.login() - Response:', response);
            return response; // Return raw response, let AuthContext handle storage
        } catch (error) {
            throw error;
        }
    },

    /**
     * Register user - returns response, does NOT store anything
     */
    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/register', userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Forgot password
     */
    forgotPassword: async (data) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/forgot-password', data);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reset password with OTP
     */
    resetPassword: async (data) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/reset-password', data);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logout - does nothing, AuthContext handles state
     */
    logout: () => {
        console.log('authService.logout() - Clearing auth state');
    },

    /**
     * Get current user - NOT USED, AuthContext manages this
     */
    getCurrentUser: () => {
        return null;
    },

    /**
     * Get token - NOT USED, AuthContext manages this
     */
    getToken: () => {
        return null;
    },

    /**
     * Check if authenticated - NOT USED, AuthContext manages this
     */
    isAuthenticated: () => {
        return false;
    },
};
