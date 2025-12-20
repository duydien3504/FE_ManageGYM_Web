import axiosInstance from './axios.config';

export const authService = {
    /**
     * Login user
     * @param {Object} credentials - { email, password }
     * @returns {Promise} Response with user data and token
     */
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/login', credentials);

            console.log('authService.login() - API response:', response);

            // Test if localStorage is working
            try {
                localStorage.setItem('test', 'test');
                const testValue = localStorage.getItem('test');
                console.log('authService.login() - localStorage test:', testValue);
                localStorage.removeItem('test');
            } catch (e) {
                console.error('authService.login() - localStorage is BLOCKED:', e);
            }

            // After axios interceptor, response = response.data from API
            // So accessToken is at response.accessToken
            const token = response.accessToken || response.token;
            console.log('authService.login() - Extracted token:', token);

            if (token) {
                try {
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('token', token);
                    console.log('authService.login() - Token saved to localStorage');

                    // Verify it was saved
                    const savedToken = localStorage.getItem('accessToken');
                    console.log('authService.login() - Verify saved token:', savedToken);
                } catch (e) {
                    console.error('authService.login() - Error saving token:', e);
                }
            } else {
                console.warn('authService.login() - No token in response!');
            }

            // Store user data
            if (response.user) {
                try {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    console.log('authService.login() - User saved to localStorage');
                } catch (e) {
                    console.error('authService.login() - Error saving user:', e);
                }
            }

            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Register new user
     * @param {Object} userData - { email, password, full_name }
     * @returns {Promise} Response with user data and token
     */
    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/register', userData);

            // After axios interceptor, response = response.data from API
            const token = response.accessToken || response.token;
            if (token) {
                localStorage.setItem('accessToken', token);
                localStorage.setItem('token', token);
            }

            // Store user data
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
            }

            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Send OTP to email for password reset
     * @param {Object} data - { email }
     * @returns {Promise} Response
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
     * @param {Object} data - { email, otp_code, new_password }
     * @returns {Promise} Response
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
     * Logout user
     */
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    /**
     * Get current user from localStorage
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
   * Get auth token
   */
    getToken: () => {
        const accessToken = localStorage.getItem('accessToken');
        const token = localStorage.getItem('token');
        console.log('authService.getToken() - localStorage tokens:', { accessToken, token });
        return accessToken || token;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        return !!authService.getToken();
    },
};
