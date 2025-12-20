import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden dark">
            <Header />
            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
