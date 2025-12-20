export const APP_CONFIG = {
    APP_NAME: 'React + Tailwind App',
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    ENV: process.env.REACT_APP_ENV || 'development',
    VERSION: '1.0.0',
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    USERS: {
        GET_ALL: '/users',
        GET_BY_ID: (id) => `/users/${id}`,
        UPDATE: (id) => `/users/${id}`,
        DELETE: (id) => `/users/${id}`,
    },
};
