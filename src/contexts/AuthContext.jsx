import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api/auth.service.simple';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider with localStorage persistence
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // Start with true while loading from localStorage
    const [version, setVersion] = useState(0); // Force re-render counter

    // Load user and token from localStorage on mount
    useEffect(() => {
        console.log('AuthProvider - Loading from localStorage...');
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log('AuthProvider - Restored user from localStorage:', parsedUser);
                setUser(parsedUser);
                setToken(storedToken);
            } catch (error) {
                console.error('AuthProvider - Failed to parse stored user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    console.log('AuthProvider - Render #', version, '- State:', { user: !!user, token: !!token, loading });

    const login = async (credentials) => {
        try {
            setLoading(true);
            console.log('AuthContext.login - START, credentials:', credentials);

            const response = await authService.login(credentials);

            console.log('AuthContext.login - RAW API Response:', response);
            console.log('AuthContext.login - response.user:', response.user);
            console.log('AuthContext.login - response.role:', response.role);
            console.log('AuthContext.login - response.accessToken:', response.accessToken);
            console.log('AuthContext.login - response.access_token:', response.access_token);
            console.log('AuthContext.login - response.token:', response.token);
            console.log('AuthContext.login - response.data:', response.data);

            // Extract user and token from response
            // API returns snake_case: access_token, not camelCase: accessToken
            let userData = response.user || response.data?.user;
            const authToken = response.access_token || response.accessToken || response.token || response.data?.access_token || response.data?.accessToken;

            // IMPORTANT: Backend returns role separately, merge it into user object
            if (userData && response.role) {
                userData = { ...userData, role: response.role };
                console.log('AuthContext.login - Merged role into userData:', userData);
            }

            console.log('AuthContext.login - Extracted userData:', userData);
            console.log('AuthContext.login - Extracted authToken:', authToken);

            if (userData) {
                console.log('AuthContext.login - Setting user to:', userData);
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                console.log('AuthContext.login - User saved to localStorage');
            } else {
                console.warn('AuthContext.login - NO USER DATA FOUND IN RESPONSE!');
            }

            if (authToken) {
                console.log('AuthContext.login - Setting token to:', authToken);
                setToken(authToken);
                localStorage.setItem('token', authToken);
                console.log('AuthContext.login - Token saved to localStorage');
            } else {
                console.warn('AuthContext.login - NO TOKEN FOUND IN RESPONSE!');
            }

            // Force re-render
            setVersion(v => v + 1);
            console.log('AuthContext.login - Forcing re-render, new version:', version + 1);

            setLoading(false);
            console.log('AuthContext.login - COMPLETE');
            return response;
        } catch (error) {
            console.error('AuthContext.login - ERROR:', error);
            setLoading(false);
            throw error;
        }
    };

    const logout = () => {
        console.log('AuthContext.logout - Clearing state and localStorage');
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setVersion(v => v + 1);
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await authService.register(userData);

            let user = response.user || response.data?.user;
            const authToken = response.access_token || response.accessToken || response.token || response.data?.access_token || response.data?.accessToken;

            // Merge role if it's returned separately
            if (user && response.role) {
                user = { ...user, role: response.role };
            }

            if (user) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            }
            if (authToken) {
                setToken(authToken);
                localStorage.setItem('token', authToken);
            }
            setVersion(v => v + 1);

            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const updateUser = (updatedUserData) => {
        console.log('AuthContext.updateUser - Updating user data:', updatedUserData);
        setUser(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        setVersion(v => v + 1);
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        register,
        updateUser,
        isAuthenticated: !!user && !!token,
        version, // Include version in context value to force consumers to re-render
    };

    console.log('AuthProvider - Providing value:', {
        hasUser: !!user,
        hasToken: !!token,
        isAuthenticated: !!user && !!token,
        version
    });

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
