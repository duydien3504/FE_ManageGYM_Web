import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../common/Modal';
import SignInModal from '../../auth/SignInModal';
import SignUpModal from '../../auth/SignUpModal';
import ForgotPasswordModal from '../../auth/ForgotPasswordModal';
import OTPVerificationModal from '../../auth/OTPVerificationModal';
import { useAuth } from '../../../contexts/AuthContext';
import { isAdmin } from '../../../utils/authHelpers';

const Header = () => {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [isOTPVerificationOpen, setIsOTPVerificationOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const { user, logout, isAuthenticated, loading, token } = useAuth();

    // Debug: Log auth state on every render
    console.log('Header - Render with auth state:', { user, token, isAuthenticated, loading });

    // Debug: Track auth state changes
    useEffect(() => {
        console.log('Header - useEffect: Auth state changed!', { user, token, isAuthenticated });
    }, [user, token, isAuthenticated]);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Lịch tập', href: '/workout-plans' },
        { name: 'Bài tập', href: '/exercises' },
        { name: 'About', href: '/about' },
    ];

    const handleSignInSuccess = (response) => {
        console.log('Sign in successful:', response);
    };

    const handleSignUpSuccess = (response) => {
        console.log('Sign up successful:', response);
    };

    const handleForgotPasswordSuccess = (email) => {
        setResetEmail(email);
        setIsForgotPasswordOpen(false);
        setIsOTPVerificationOpen(true);
    };

    const handleOTPVerificationSuccess = () => {
        // Show success message and redirect to sign in
        alert('Password reset successful! Please sign in with your new password.');
        setIsOTPVerificationOpen(false);
        setIsSignInOpen(true);
    };

    const switchToSignUp = () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(true);
    };

    const switchToSignIn = () => {
        setIsSignUpOpen(false);
        setIsForgotPasswordOpen(false);
        setIsSignInOpen(true);
    };

    const switchToForgotPassword = () => {
        setIsSignInOpen(false);
        setIsForgotPasswordOpen(true);
    };

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-moss-deep/95 backdrop-blur-sm border-b border-moss-border">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-4 text-moss-text">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined !text-[32px]">fitness_center</span>
                        </div>
                        <h2 className="text-moss-text text-xl font-bold leading-tight tracking-[-0.015em]">
                            GymPlanner
                        </h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navigation.map((item, index) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`text-sm font-medium transition-colors ${index === 0
                                    ? 'text-moss-text hover:text-primary'
                                    : 'text-moss-muted hover:text-primary'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {/* Admin Link - Only show for admin users */}
                        {isAuthenticated && isAdmin(user) && (
                            <Link
                                to="/admin"
                                className="text-sm font-medium text-primary hover:text-[#b8c755] transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined !text-lg">admin_panel_settings</span>
                                Admin
                            </Link>
                        )}
                    </nav>

                    {/* Auth Buttons / User Menu */}
                    <div className="flex items-center gap-3">
                        {loading ? (
                            // Show loading state
                            <div className="text-moss-muted text-sm">Loading...</div>
                        ) : isAuthenticated ? (
                            <>
                                {/* User Info - Clickable to Profile */}
                                <Link
                                    to="/profile"
                                    className="hidden sm:flex items-center gap-2 text-moss-text hover:text-primary transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-primary">account_circle</span>
                                    <span className="text-sm font-medium">{user?.full_name || user?.email || 'User'}</span>
                                </Link>
                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 border border-moss-border bg-transparent text-moss-text hover:bg-moss-surface hover:border-red-500/30 hover:text-red-400 transition-colors text-sm font-bold"
                                >
                                    <span className="truncate">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsSignInOpen(true)}
                                    className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 border border-moss-border bg-transparent text-moss-text hover:bg-moss-surface hover:border-primary/30 transition-colors text-sm font-bold"
                                >
                                    <span className="truncate">Sign In</span>
                                </button>
                                <button
                                    onClick={() => setIsSignUpOpen(true)}
                                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-[#b8c755] text-moss-deep transition-colors text-sm font-bold shadow-sm"
                                >
                                    <span className="truncate">Sign Up</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Sign In Modal */}
            <Modal
                isOpen={isSignInOpen}
                onClose={() => setIsSignInOpen(false)}
                title="Sign In"
            >
                <SignInModal
                    onClose={() => setIsSignInOpen(false)}
                    onSuccess={handleSignInSuccess}
                    onSwitchToSignUp={switchToSignUp}
                    onSwitchToForgotPassword={switchToForgotPassword}
                />
            </Modal>

            {/* Sign Up Modal */}
            <Modal
                isOpen={isSignUpOpen}
                onClose={() => setIsSignUpOpen(false)}
                title="Create Account"
            >
                <SignUpModal
                    onClose={() => setIsSignUpOpen(false)}
                    onSuccess={handleSignUpSuccess}
                    onSwitchToSignIn={switchToSignIn}
                />
            </Modal>

            {/* Forgot Password Modal */}
            <Modal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
                title="Forgot Password"
            >
                <ForgotPasswordModal
                    onClose={() => setIsForgotPasswordOpen(false)}
                    onSuccess={handleForgotPasswordSuccess}
                />
            </Modal>

            {/* OTP Verification Modal */}
            <Modal
                isOpen={isOTPVerificationOpen}
                onClose={() => setIsOTPVerificationOpen(false)}
                title="Verify OTP"
            >
                <OTPVerificationModal
                    email={resetEmail}
                    onClose={() => setIsOTPVerificationOpen(false)}
                    onSuccess={handleOTPVerificationSuccess}
                />
            </Modal>
        </>
    );
};

export default Header;
