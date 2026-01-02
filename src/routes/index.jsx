import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProfilePage from '../pages/ProfilePage';
import WorkoutPlans from '../pages/WorkoutPlans';
import Exercises from '../pages/Exercises';
import AdminPanel from '../pages/AdminPanel';
import Stats from '../pages/Stats';
import WorkoutHistory from '../pages/WorkoutHistory';
import NotFound from '../pages/NotFound';
import { ROUTES } from '../constants/routes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path={ROUTES.WORKOUT_PLANS} element={<WorkoutPlans />} />
                <Route path={ROUTES.EXERCISES} element={<Exercises />} />
                <Route path={ROUTES.STATS} element={<Stats />} />
                <Route path={ROUTES.WORKOUT_HISTORY} element={<WorkoutHistory />} />
                <Route path={ROUTES.ADMIN} element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
