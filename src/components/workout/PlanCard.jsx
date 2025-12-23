import React from 'react';

const PlanCard = ({ plan, onView, onDelete }) => {
   const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
         case 'active':
            return 'bg-green-500/10 text-green-400 border-green-500/30';
         case 'completed':
            return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
         case 'inactive':
            return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
         default:
            return 'bg-primary/10 text-primary border-primary/30';
      }
   };

   return (
      <div className="group relative p-6 rounded-2xl bg-moss-card border border-moss-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
         {/* Status Badge */}
         {plan.status && (
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
               {plan.status}
            </div>
         )}

         {/* Plan Info */}
         <div className="mb-4">
            <h3 className="text-xl font-bold text-moss-text mb-2 pr-20">
               {plan.plan_name}
            </h3>
            {plan.description && (
               <p className="text-moss-muted text-sm line-clamp-2">
                  {plan.description}
               </p>
            )}
         </div>

         {/* Date Range */}
         {(plan.start_date || plan.end_date) && (
            <div className="flex items-center gap-2 text-sm text-moss-muted mb-4">
               <span className="material-symbols-outlined !text-base">calendar_today</span>
               <span>
                  {plan.start_date && new Date(plan.start_date).toLocaleDateString('vi-VN')}
                  {plan.start_date && plan.end_date && ' - '}
                  {plan.end_date && new Date(plan.end_date).toLocaleDateString('vi-VN')}
               </span>
            </div>
         )}

         {/* Stats */}
         <div className="flex items-center gap-4 mb-4 text-sm">
            {plan.schedule_count !== undefined && (
               <div className="flex items-center gap-1 text-moss-muted">
                  <span className="material-symbols-outlined !text-base">event_note</span>
                  <span>{plan.schedule_count} lịch trình</span>
               </div>
            )}
            {plan.exercise_count !== undefined && (
               <div className="flex items-center gap-1 text-moss-muted">
                  <span className="material-symbols-outlined !text-base">fitness_center</span>
                  <span>{plan.exercise_count} bài tập</span>
               </div>
            )}
         </div>

         {/* Actions */}
         <div className="flex gap-2">
            <button
               onClick={() => onView(plan)}
               className="flex-1 h-10 px-4 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-medium transition-all hover:scale-[1.02]"
            >
               Xem chi tiết
            </button>
            {onDelete && (
               <button
                  onClick={() => onDelete(plan)}
                  className="h-10 w-10 rounded-full bg-moss-surface border border-moss-border hover:border-red-500/50 hover:bg-red-500/10 text-moss-muted hover:text-red-400 transition-all flex items-center justify-center"
               >
                  <span className="material-symbols-outlined !text-xl">delete</span>
               </button>
            )}
         </div>
      </div>
   );
};

export default PlanCard;
