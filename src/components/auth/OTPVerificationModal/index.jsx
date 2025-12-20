import React, { useState } from 'react';
import { authService } from '../../../services/api/auth.service';

const OTPVerificationModal = ({ email, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        otp_code: '',
        new_password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate password match
        if (formData.new_password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate OTP length
        if (formData.otp_code.length !== 6) {
            setError('OTP must be 6 digits');
            setLoading(false);
            return;
        }

        try {
            await authService.resetPassword({
                email,
                otp_code: formData.otp_code,
                new_password: formData.new_password,
            });

            // Call success callback
            if (onSuccess) {
                onSuccess();
            }

            // Close modal
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to reset password. Please check your OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Info Message */}
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-moss-text text-sm">
                We've sent a 6-digit OTP to <strong>{email}</strong>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* OTP Field */}
            <div>
                <label className="block text-sm font-medium text-moss-text mb-2">
                    OTP Code <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="otp_code"
                    value={formData.otp_code}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center text-2xl tracking-widest font-bold"
                />
            </div>

            {/* New Password Field */}
            <div>
                <label className="block text-sm font-medium text-moss-text mb-2">
                    New Password <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
            </div>

            {/* Confirm Password Field */}
            <div>
                <label className="block text-sm font-medium text-moss-text mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
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
                {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
        </form>
    );
};

export default OTPVerificationModal;
