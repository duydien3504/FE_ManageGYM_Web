import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { plansService } from '../../services/api/plans.service';
import CreatePlanModal from '../../components/workout/CreatePlanModal';
import PlanCard from '../../components/workout/PlanCard';
import WeeklyScheduleView from '../../components/workout/WeeklyScheduleView';
import AddScheduleModal from '../../components/workout/AddScheduleModal';
import ScheduleExerciseList from '../../components/workout/ScheduleExerciseList';
import AddExerciseModal from '../../components/workout/AddExerciseModal';

const WorkoutPlans = () => {
   const navigate = useNavigate();
   const [plans, setPlans] = useState([]);
   const [selectedPlan, setSelectedPlan] = useState(null);
   const [selectedSchedule, setSelectedSchedule] = useState(null);
   const [showCreateModal, setShowCreateModal] = useState(false);
   const [showScheduleModal, setShowScheduleModal] = useState(false);
   const [showExerciseModal, setShowExerciseModal] = useState(false);
   const [selectedDay, setSelectedDay] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      loadPlans();
   }, []);

   const loadPlans = async () => {
      try {
         setLoading(true);
         const response = await plansService.getUserPlans();
         setPlans(response || []);
      } catch (error) {
         console.error('Failed to load plans:', error);
      } finally {
         setLoading(false);
      }
   };

   const loadPlanDetails = async (planId) => {
      try {
         const response = await plansService.getPlanDetails(planId);
         setSelectedPlan(response);
      } catch (error) {
         console.error('Failed to load plan details:', error);
      }
   };

   const handleViewPlan = (plan) => {
      loadPlanDetails(plan.plan_id);
   };

   const handleCreateSuccess = () => {
      loadPlans();
   };

   const handleAddSchedule = (dayKey) => {
      setSelectedDay(dayKey);
      setShowScheduleModal(true);
   };

   const handleScheduleSuccess = () => {
      if (selectedPlan) {
         loadPlanDetails(selectedPlan.plan_id);
      }
   };

   const handleDayClick = (schedule) => {
      setSelectedSchedule(schedule);
   };

   const handleAddExercise = () => {
      setShowExerciseModal(true);
   };

   const handleExerciseSuccess = () => {
      if (selectedPlan) {
         loadPlanDetails(selectedPlan.plan_id);
      }
   };

   const handleDeletePlan = async (plan) => {
      if (!window.confirm(`Bạn có chắc muốn xóa kế hoạch "${plan.plan_name}"?`)) {
         return;
      }

      try {
         await plansService.deletePlan(plan.plan_id);
         loadPlans(); // Reload danh sách
      } catch (error) {
         console.error('Failed to delete plan:', error);
         alert('Không thể xóa kế hoạch. Vui lòng thử lại.');
      }
   };

   return (
      <div className="min-h-screen bg-moss-deep py-8">
         <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h1 className="text-3xl md:text-4xl font-black text-moss-text mb-2">
                     Quản lý kế hoạch tập luyện
                  </h1>
                  <p className="text-moss-muted">
                     Thiết lập lộ trình tập gym cá nhân của bạn
                  </p>
               </div>
               <button
                  onClick={() => setShowCreateModal(true)}
                  className="h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(201,216,98,0.2)] flex items-center gap-2"
               >
                  <span className="material-symbols-outlined">add</span>
                  <span className="hidden sm:inline">Tạo kế hoạch mới</span>
               </button>
            </div>

            {/* Plan Detail View */}
            {selectedPlan ? (
               <div className="space-y-6">
                  {/* Back Button */}
                  <button
                     onClick={() => {
                        setSelectedPlan(null);
                        setSelectedSchedule(null);
                     }}
                     className="flex items-center gap-2 text-moss-muted hover:text-moss-text transition-colors"
                  >
                     <span className="material-symbols-outlined">arrow_back</span>
                     <span>Quay lại danh sách</span>
                  </button>

                  {/* Plan Info */}
                  <div className="p-6 rounded-2xl bg-moss-card border border-moss-border">
                     <h2 className="text-2xl font-bold text-moss-text mb-2">
                        {selectedPlan.plan_name}
                     </h2>
                     {selectedPlan.description && (
                        <p className="text-moss-muted mb-4">{selectedPlan.description}</p>
                     )}
                     {(selectedPlan.start_date || selectedPlan.end_date) && (
                        <div className="flex items-center gap-2 text-sm text-moss-muted">
                           <span className="material-symbols-outlined !text-base">calendar_today</span>
                           <span>
                              {selectedPlan.start_date && new Date(selectedPlan.start_date).toLocaleDateString('vi-VN')}
                              {selectedPlan.start_date && selectedPlan.end_date && ' - '}
                              {selectedPlan.end_date && new Date(selectedPlan.end_date).toLocaleDateString('vi-VN')}
                           </span>
                        </div>
                     )}
                  </div>

                  {/* Weekly Schedule */}
                  <div>
                     <h3 className="text-xl font-bold text-moss-text mb-4">Lịch trình tuần</h3>
                     <WeeklyScheduleView
                        schedules={selectedPlan.schedules || []}
                        onDayClick={handleDayClick}
                        onAddSchedule={handleAddSchedule}
                     />
                  </div>

                  {/* Schedule Exercises */}
                  {selectedSchedule && (
                     <div className="p-6 rounded-2xl bg-moss-card border border-moss-border">
                        <h3 className="text-xl font-bold text-moss-text mb-4">
                           {selectedSchedule.title}
                        </h3>
                        <ScheduleExerciseList
                           exercises={selectedSchedule.exercises || []}
                           scheduleId={selectedSchedule.schedule_id}
                           onUpdate={handleScheduleSuccess}
                           onAddExercise={handleAddExercise}
                        />
                     </div>
                  )}
               </div>
            ) : (
               /* Plans List */
               <div>
                  {loading ? (
                     <div className="text-center py-12">
                        <div className="inline-block size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                     </div>
                  ) : plans.length === 0 ? (
                     <div className="text-center py-12">
                        <span className="material-symbols-outlined text-moss-muted !text-6xl mb-4">
                           event_note
                        </span>
                        <p className="text-moss-muted mb-6">Chưa có kế hoạch tập luyện nào</p>
                        <button
                           onClick={() => setShowCreateModal(true)}
                           className="h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02]"
                        >
                           Tạo kế hoạch đầu tiên
                        </button>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                           <PlanCard
                              key={plan.plan_id}
                              plan={plan}
                              onView={handleViewPlan}
                              onDelete={handleDeletePlan}
                           />
                        ))}
                     </div>
                  )}
               </div>
            )}
         </div>

         {/* Modals */}
         <CreatePlanModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSuccess={handleCreateSuccess}
         />
         <AddScheduleModal
            isOpen={showScheduleModal}
            onClose={() => {
               setShowScheduleModal(false);
               setSelectedDay(null);
            }}
            planId={selectedPlan?.plan_id}
            selectedDay={selectedDay}
            onSuccess={handleScheduleSuccess}
         />
         <AddExerciseModal
            isOpen={showExerciseModal}
            onClose={() => setShowExerciseModal(false)}
            scheduleId={selectedSchedule?.schedule_id}
            onSuccess={handleExerciseSuccess}
         />
      </div>
   );
};

export default WorkoutPlans;
