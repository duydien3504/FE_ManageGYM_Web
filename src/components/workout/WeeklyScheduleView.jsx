import React from 'react';

const DAYS_OF_WEEK = [
   { key: 'MONDAY', label: 'Thứ 2' },
   { key: 'TUESDAY', label: 'Thứ 3' },
   { key: 'WEDNESDAY', label: 'Thứ 4' },
   { key: 'THURSDAY', label: 'Thứ 5' },
   { key: 'FRIDAY', label: 'Thứ 6' },
   { key: 'SATURDAY', label: 'Thứ 7' },
   { key: 'SUNDAY', label: 'Chủ nhật' },
];

const WeeklyScheduleView = ({ schedules = [], onDayClick, onAddSchedule }) => {
   const getScheduleForDay = (dayKey) => {
      return schedules.find(s => s.day_of_week === dayKey);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
         {DAYS_OF_WEEK.map((day) => {
            const schedule = getScheduleForDay(day.key);
            const hasSchedule = !!schedule;

            return (
               <div
                  key={day.key}
                  onClick={() => hasSchedule ? onDayClick(schedule) : onAddSchedule(day.key)}
                  className={`
                            relative p-4 rounded-xl border-2 transition-all cursor-pointer
                            ${hasSchedule
                        ? 'bg-moss-card border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/10'
                        : 'bg-moss-surface border-moss-border hover:border-moss-border/50 border-dashed'
                     }
                        `}
               >
                  {/* Day Label */}
                  <div className="text-center mb-3">
                     <p className="text-xs font-medium text-moss-muted uppercase tracking-wider">
                        {day.label}
                     </p>
                  </div>

                  {hasSchedule ? (
                     <>
                        {/* Schedule Title */}
                        <div className="mb-2">
                           <h4 className="text-sm font-bold text-moss-text text-center line-clamp-2">
                              {schedule.title}
                           </h4>
                        </div>

                        {/* Exercise Count */}
                        {schedule.exercises && schedule.exercises.length > 0 && (
                           <div className="flex items-center justify-center gap-1 text-xs text-moss-muted">
                              <span className="material-symbols-outlined !text-sm">fitness_center</span>
                              <span>{schedule.exercises.length} bài tập</span>
                           </div>
                        )}

                        {/* Indicator */}
                        <div className="absolute top-2 right-2 size-2 rounded-full bg-primary"></div>
                     </>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-2">
                        <span className="material-symbols-outlined text-moss-muted !text-2xl mb-1">
                           add_circle
                        </span>
                        <p className="text-xs text-moss-muted">Thêm lịch</p>
                     </div>
                  )}
               </div>
            );
         })}
      </div>
   );
};

export default WeeklyScheduleView;
