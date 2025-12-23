import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../../utils/authHelpers';
import MuscleGroupsTab from '../../components/admin/MuscleGroupsTab';
import ExercisesTab from '../../components/admin/ExercisesTab';

const AdminPanel = () => {
   const { user, isAuthenticated } = useAuth();
   const [activeTab, setActiveTab] = useState('muscle-groups');

   // Check if user is admin using helper function
   const userIsAdmin = isAdmin(user);

   // Redirect if not authenticated or not admin
   if (!isAuthenticated || !userIsAdmin) {
      return <Navigate to="/" replace />;
   }

   const tabs = [
      { id: 'muscle-groups', label: 'Nhóm cơ', icon: 'category' },
      { id: 'exercises', label: 'Bài tập', icon: 'fitness_center' },
   ];

   return (
      <div className="min-h-screen bg-moss-deep py-8">
         <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl md:text-4xl font-black text-moss-text mb-2">
                  Admin Panel
               </h1>
               <p className="text-moss-muted">
                  Quản lý nhóm cơ và bài tập
               </p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
               <div className="flex gap-2 border-b border-moss-border">
                  {tabs.map((tab) => (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                                    flex items-center gap-2 px-6 py-3 font-medium transition-all
                                    ${activeTab === tab.id
                              ? 'text-primary border-b-2 border-primary'
                              : 'text-moss-muted hover:text-moss-text'
                           }
                                `}
                     >
                        <span className="material-symbols-outlined !text-lg">{tab.icon}</span>
                        <span>{tab.label}</span>
                     </button>
                  ))}
               </div>
            </div>

            {/* Tab Content */}
            <div className="bg-moss-card rounded-2xl border border-moss-border p-6">
               {activeTab === 'muscle-groups' && <MuscleGroupsTab />}
               {activeTab === 'exercises' && <ExercisesTab />}
            </div>
         </div>
      </div>
   );
};

export default AdminPanel;
