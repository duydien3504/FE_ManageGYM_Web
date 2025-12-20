import axios from 'axios';
import { APP_CONFIG } from '../../constants/config';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7979',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - automatically attach token from localStorage
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Axios interceptor - Full response:', response);
        console.log('Axios interceptor - response.data:', response.data);
        return response.data;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear all tokens and redirect to home
                localStorage.removeItem('accessToken');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
            }

            return Promise.reject(data);
        } else if (error.request) {
            // Request made but no response
            return Promise.reject({ message: 'Không thể kết nối đến server' });
        } else {
            // Something else happened
            return Promise.reject({ message: error.message });
        }
    }
);

export default axiosInstance;
