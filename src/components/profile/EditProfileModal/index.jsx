import React, { useState } from 'react';
import axiosInstance from '../../../services/api/axios.config';

const EditProfileModal = ({ onClose, user, onSuccess }) => {
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        gender: user?.gender || 'Male',
        date_of_birth: user?.date_of_birth || '',
        fitness_goal: user?.fitness_goal || '',
        activity_level: user?.activity_level || '',
    });
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();

            // Add avatar if selected
            if (avatar) {
                formDataToSend.append('avatar', avatar);
            }

            // Add other fields
            formDataToSend.append('full_name', formData.full_name);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('date_of_birth', formData.date_of_birth);
            formDataToSend.append('fitness_goal', formData.fitness_goal);
            formDataToSend.append('activity_level', formData.activity_level);

            // Call API using axiosInstance (token is auto-attached by interceptor)
            const response = await axiosInstance.put('/api/v1/users/profile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Profile updated successfully:', response.data);

            if (onSuccess) {
                onSuccess(response.data);
            }

            onClose();
        } catch (err) {
            console.error('Update profile error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-moss-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-moss-muted/10">
                {/* Header */}
                <div className="sticky top-0 bg-moss-card border-b border-moss-muted/10 p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-moss-text">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-moss-muted hover:text-moss-text transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Avatar Upload */}
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Avatar
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                                {avatar ? (
                                    <img
                                        src={URL.createObjectURL(avatar)}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : user?.avatar_url ? (
                                    <img
                                        src={user.avatar_url}
                                        alt={user.full_name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="material-symbols-outlined text-3xl text-primary">
                                        account_circle
                                    </span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="text-sm text-moss-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white placeholder-moss-muted/60 focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors [color-scheme:dark]"
                        />
                    </div>

                    {/* Fitness Goal */}
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Fitness Goal
                        </label>
                        <input
                            type="text"
                            name="fitness_goal"
                            value={formData.fitness_goal}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white placeholder-moss-muted/60 focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors"
                            placeholder="e.g., Muscle Gain, Weight Loss"
                        />
                    </div>

                    {/* Activity Level */}
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Activity Level
                        </label>
                        <input
                            type="text"
                            name="activity_level"
                            value={formData.activity_level}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white placeholder-moss-muted/60 focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors"
                            placeholder="e.g., Moderate, High"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-moss-darker hover:bg-moss-surface text-moss-text rounded-lg transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-primary hover:bg-[#b8c755] text-moss-deep rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
