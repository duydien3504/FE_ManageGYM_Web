import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../../components/profile/EditProfileModal';
import { userService } from '../../services/api/user.service';

const ProfilePage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEditSuccess = async (updatedData) => {
        // Refetch profile data to get the latest from server
        try {
            const response = await userService.getProfile();
            console.log('Refetch profile response:', response);

            // Handle multiple response formats (same as AuthContext login)
            const userData = response.user || response.data?.user || response;
            console.log('Extracted user data:', userData);

            if (userData && userData.email) {
                setProfileData(userData);
                updateUser(userData);
            } else {
                console.error('Invalid user data in refetch:', userData);
            }
        } catch (err) {
            console.error('Failed to refetch profile:', err);
        }
    };

    // Fetch profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await userService.getProfile();
                console.log('Profile data fetched:', response);
                console.log('response.user:', response.user);
                console.log('response.data:', response.data);

                // Handle multiple response formats (same as AuthContext login)
                // Try: response.user, response.data?.user, or response itself
                const userData = response.user || response.data?.user || response;
                // Validate userData has required fields
                if (userData && userData.email) {
                    setProfileData(userData);
                    updateUser(userData);
                } else {
                    console.error('Invalid response format. Response:', response);
                    setError('Invalid response format from server');
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, []); // Only run on mount

    if (!user) {
        navigate('/');
        return null;
    }

    // Use profileData if available, fallback to user from AuthContext
    const displayUser = profileData || user;

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-moss-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-moss-muted">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-moss-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary hover:bg-[#b8c755] text-moss-deep rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-moss-dark">
            {/* Profile Header */}
            <div className="bg-moss-darker border-b border-moss-muted/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                            {displayUser.avatar_url ? (
                                <img
                                    src={displayUser.avatar_url}
                                    alt={displayUser.full_name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span className="material-symbols-outlined text-5xl text-primary">
                                    account_circle
                                </span>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-moss-text mb-2">
                                {displayUser.full_name || 'User'}
                            </h1>
                            <p className="text-moss-muted">{displayUser.email}</p>
                            <div className="flex gap-4 mt-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">0</div>
                                    <div className="text-sm text-moss-muted">Workouts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">0</div>
                                    <div className="text-sm text-moss-muted">Plans</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">0</div>
                                    <div className="text-sm text-moss-muted">Days Active</div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="px-6 py-2 bg-moss-card hover:bg-moss-card-hover text-moss-text rounded-lg transition-colors"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Personal Information */}
                    <div className="lg:col-span-2 bg-moss-card rounded-xl p-6 border border-moss-muted/10">
                        <h2 className="text-xl font-bold text-moss-text mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            Personal Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-moss-muted">Full Name</label>
                                <div className="mt-1 text-moss-text font-medium">{displayUser.full_name || 'Not set'}</div>
                            </div>

                            <div>
                                <label className="text-sm text-moss-muted">Email</label>
                                <div className="mt-1 text-moss-text font-medium">{displayUser.email}</div>
                            </div>

                            <div>
                                <label className="text-sm text-moss-muted">Gender</label>
                                <div className="mt-1 text-moss-text font-medium">{displayUser.gender || 'Not set'}</div>
                            </div>

                            <div>
                                <label className="text-sm text-moss-muted">Date of Birth</label>
                                <div className="mt-1 text-moss-text font-medium">{displayUser.date_of_birth || 'Not set'}</div>
                            </div>

                            <div>
                                <label className="text-sm text-moss-muted">Fitness Goal</label>
                                <div className="mt-1 text-moss-text font-medium">{displayUser.metrics?.fitness_goal || displayUser.fitness_goal || 'Not set'}</div>
                            </div>

                            <div>
                                <label className="text-sm text-moss-muted">Activity Level</label>
                                <div className="mt-1 text-moss-text font-medium">{displayUser.metrics?.activity_level || displayUser.activity_level || 'Not set'}</div>
                            </div>

                            <div>
                                <label className="text-sm text-moss-muted">User ID</label>
                                <div className="mt-1 text-moss-text font-medium">#{displayUser.user_id}</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-moss-card rounded-xl p-6 border border-moss-muted/10">
                        <h2 className="text-xl font-bold text-moss-text mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">bar_chart</span>
                            Quick Stats
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-moss-muted">Total Workouts</span>
                                <span className="text-moss-text font-bold">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-moss-muted">Active Plans</span>
                                <span className="text-moss-text font-bold">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-moss-muted">Streak Days</span>
                                <span className="text-moss-text font-bold">0</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-3 bg-moss-card rounded-xl p-6 border border-moss-muted/10">
                        <h2 className="text-xl font-bold text-moss-text mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span>
                            Recent Activity
                        </h2>

                        <div className="text-center py-12 text-moss-muted">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">fitness_center</span>
                            <p>No recent activity yet. Start your fitness journey today!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <EditProfileModal
                    onClose={() => setIsEditModalOpen(false)}
                    user={displayUser}
                    onSuccess={handleEditSuccess}
                />
            )}
        </div>
    );
};

export default ProfilePage;
