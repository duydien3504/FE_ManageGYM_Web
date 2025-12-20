import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import ProfilePage from '../pages/ProfilePage';
import NotFound from '../pages/NotFound';
import { ROUTES } from '../constants/routes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
