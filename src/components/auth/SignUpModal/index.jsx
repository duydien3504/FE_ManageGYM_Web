import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../../../services/api/auth.service';

const SignUpModal = ({ onClose, onSuccess, onSwitchToSignIn }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
            const response = await authService.register(formData);

            // Show success toast
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.', {
                duration: 3000,
            });

            // Call success callback
            if (onSuccess) {
                onSuccess(response);
            }

            // Switch to login modal after a short delay
            setTimeout(() => {
                onSwitchToSignIn();
            }, 500);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
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

            {/* Full Name Field */}
            <div>
                <label className="block text-sm font-medium text-moss-text mb-2">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(201,216,98,0.2)]"
            >
                {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Switch to Sign In */}
            <div className="text-center text-sm text-moss-muted">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToSignIn}
                    className="text-primary hover:underline font-medium"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default SignUpModal;
