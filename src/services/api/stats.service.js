import axiosInstance from './axios.config';

const API_PREFIX = '/api/v1/stats';

/**
 * Get dashboard statistics
 * @returns {Promise} Dashboard stats (total_workouts, total_minutes, current_streak)
 */
export const getDashboardStats = async () => {
    try {
        const response = await axiosInstance.get(`${API_PREFIX}/dashboard`);
        return response;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

/**
 * Get weight chart data
 * @param {string} range - Date range (1month, 3months, 6months, 1year, all)
 * @returns {Promise} Weight chart data
 */
export const getWeightChart = async (range = '3months') => {
    try {
        const response = await axiosInstance.get(`${API_PREFIX}/weight-chart`, {
            params: { range }
        });
        return response;
    } catch (error) {
        console.error('Error fetching weight chart:', error);
        throw error;
    }
};

const statsService = {
    getDashboardStats,
    getWeightChart,
};

export default statsService;
