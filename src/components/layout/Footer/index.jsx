import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-moss-deep border-t border-moss-border">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="size-6 text-primary">
                            <span className="material-symbols-outlined">fitness_center</span>
                        </div>
                        <span className="text-moss-text font-bold text-lg">GymPlanner</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-8">
                        <a
                            className="text-moss-muted hover:text-primary text-sm font-medium transition-colors"
                            href="#"
                        >
                            Privacy Policy
                        </a>
                        <a
                            className="text-moss-muted hover:text-primary text-sm font-medium transition-colors"
                            href="#"
                        >
                            Terms of Service
                        </a>
                        <a
                            className="text-moss-muted hover:text-primary text-sm font-medium transition-colors"
                            href="#"
                        >
                            Contact Us
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        <a className="text-moss-text hover:text-primary transition-colors" href="#">
                            <span className="hidden">Instagram</span>
                            <div className="size-6 bg-moss-surface rounded-full flex items-center justify-center hover:bg-primary hover:text-moss-deep border border-moss-border hover:border-primary transition-all">
                                <span className="font-bold text-xs">IG</span>
                            </div>
                        </a>
                        <a className="text-moss-text hover:text-primary transition-colors" href="#">
                            <div className="size-6 bg-moss-surface rounded-full flex items-center justify-center hover:bg-primary hover:text-moss-deep border border-moss-border hover:border-primary transition-all">
                                <span className="font-bold text-xs">TW</span>
                            </div>
                        </a>
                        <a className="text-moss-text hover:text-primary transition-colors" href="#">
                            <div className="size-6 bg-moss-surface rounded-full flex items-center justify-center hover:bg-primary hover:text-moss-deep border border-moss-border hover:border-primary transition-all">
                                <span className="font-bold text-xs">FB</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center">
                    <p className="text-moss-muted text-sm">
                        © {currentYear} GymPlanner. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
