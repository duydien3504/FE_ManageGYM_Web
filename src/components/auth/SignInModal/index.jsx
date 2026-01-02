import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { isAdmin } from '../../../utils/authHelpers';

const SignInModal = ({ onClose, onSuccess, onSwitchToSignUp, onSwitchToForgotPassword }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await login(formData);

            console.log('SignInModal - Login successful:', response);

            // Check if user is admin and redirect to admin panel
            const userData = response.user || response.data?.user;
            if (userData && isAdmin(userData)) {
                console.log('SignInModal - Admin user detected, redirecting to /admin');
                navigate('/admin');
            }

            // Call success callback
            if (onSuccess) {
                onSuccess(response);
            }

            // Close modal - AuthContext will update and Header will re-render
            onClose();
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Email Field */}
            <div>
                <label className="block text-sm font-medium text-moss-text mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
            </div>

            {/* Password Field */}
            <div>
                <label className="block text-sm font-medium text-moss-text mb-2">
                    Password <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(201,216,98,0.2)]"
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={onSwitchToForgotPassword}
                    className="text-sm text-moss-muted hover:text-primary transition-colors underline"
                >
                    Forgot your password?
                </button>
            </div>

            {/* Switch to Sign Up */}
            <div className="text-center text-sm text-moss-muted">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className="text-primary hover:underline font-medium"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default SignInModal;
