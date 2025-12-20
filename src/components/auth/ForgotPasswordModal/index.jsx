import React, { useState } from 'react';
import { authService } from '../../../services/api/auth.service';

const ForgotPasswordModal = ({ onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.forgotPassword({ email });

            // Call success callback with email
            if (onSuccess) {
                onSuccess(email);
            }
        } catch (err) {
            // Extract detailed error message from API response
            const errorMessage = err?.error || err?.message || 'Failed to send OTP. Please try again.';
            console.error('Forgot password error:', err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Info Message */}
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-moss-text text-sm">
                Enter your email address and we'll send you an OTP to reset your password.
            </div>

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
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                    }}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(201,216,98,0.2)]"
            >
                {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            {/* Back to Sign In */}
            <div className="text-center text-sm text-moss-muted">
                Remember your password?{' '}
                <button
                    type="button"
                    onClick={onClose}
                    className="text-primary hover:underline font-medium"
                >
                    Back to Sign In
                </button>
            </div>
        </form>
    );
};

export default ForgotPasswordModal;
