import React from 'react';

const Home = () => {
    const features = [
        {
            icon: 'edit_calendar',
            title: 'Custom Plans',
            description: 'Create personalized workout schedules that fit your specific goals and lifestyle perfectly.',
        },
        {
            icon: 'monitoring',
            title: 'Track Progress',
            description: 'Visualize your gains with detailed charts, history logs, and PR tracking over time.',
        },
        {
            icon: 'restaurant',
            title: 'Nutrition Logs',
            description: 'Keep track of your macros and calorie intake seamlessly integrated with your workouts.',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-moss-deep text-moss-text overflow-hidden py-16 md:py-24 lg:py-32">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#2C3E2D]/20 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#2C3E2D]/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

                <div className="relative max-w-[1280px] mx-auto px-4 sm:px-10 flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col gap-6 lg:w-1/2 text-left z-10">
                        {/* Badge */}
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-moss-border bg-moss-surface/50 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md">
                            <span className="material-symbols-outlined !text-lg">bolt</span>
                            <span>Level up your fitness</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                            Build Your <span className="text-primary">Perfect Body</span> With Smart Planning
                        </h1>

                        {/* Description */}
                        <p className="text-moss-muted text-lg md:text-xl font-light leading-relaxed max-w-[540px]">
                            The ultimate tool to manage your gym schedules, track sets, and visualize your fitness journey effectively. Stop guessing, start growing.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <button className="flex items-center justify-center h-12 px-8 rounded-full bg-primary text-moss-deep text-base font-bold hover:bg-[#b8c755] transition-transform hover:scale-105 shadow-[0_0_20px_rgba(201,216,98,0.2)]">
                                Start Your Plan Now
                            </button>
                            <button className="flex items-center justify-center h-12 px-8 rounded-full bg-moss-surface text-moss-text border border-moss-border text-base font-bold hover:bg-moss-card transition-colors backdrop-blur-sm">
                                View Demo
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-4 mt-6 text-sm text-moss-muted">
                            <div className="flex -space-x-2">
                                <div className="size-8 rounded-full border-2 border-moss-deep bg-gray-600"></div>
                                <div className="size-8 rounded-full border-2 border-moss-deep bg-gray-500"></div>
                                <div className="size-8 rounded-full border-2 border-moss-deep bg-gray-700"></div>
                            </div>
                            <p>
                                Trusted by <span className="text-moss-text font-bold">10,000+</span> athletes
                            </p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 w-full z-10 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-[#2C3E2D]/40 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#0a0f0b]">
                            {/* Placeholder Image */}
                            <div className="w-full h-full bg-gradient-to-br from-moss-card to-moss-deep flex items-center justify-center">
                                <span className="material-symbols-outlined text-moss-muted" style={{ fontSize: '120px' }}>
                                    fitness_center
                                </span>
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-moss-deep/80 via-transparent to-transparent pointer-events-none"></div>

                            {/* Session Card */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-moss-card/90 backdrop-blur-md rounded-xl border border-moss-border flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-moss-muted uppercase tracking-wider">Current Session</p>
                                    <p className="text-moss-text font-bold text-lg">Chest & Triceps</p>
                                </div>
                                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-moss-deep">
                                    <span className="material-symbols-outlined">play_arrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-moss-surface">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-16">
                        <div className="max-w-[600px]">
                            <h2 className="text-moss-text text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
                                Why Choose GymPlanner?
                            </h2>
                            <p className="text-moss-muted text-lg">
                                Stop guessing. Start planning. Our platform helps you organize your workouts efficiently with tools designed for serious growth.
                            </p>
                        </div>
                        <button className="flex items-center justify-center h-12 px-6 rounded-full border-2 border-moss-border text-moss-text font-bold hover:bg-moss-card transition-colors hover:border-primary/50">
                            Explore All Features
                        </button>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl bg-moss-card border border-moss-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="size-12 rounded-full bg-moss-deep flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-moss-deep transition-colors border border-moss-border group-hover:border-primary">
                                    <span className="material-symbols-outlined">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-moss-text mb-2">{feature.title}</h3>
                                <p className="text-moss-muted">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
