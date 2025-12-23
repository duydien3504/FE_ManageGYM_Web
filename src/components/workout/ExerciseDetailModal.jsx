import React from 'react';
import Modal from '../common/Modal';

const ExerciseDetailModal = ({ isOpen, onClose, exercise, onAddToPlan }) => {
   if (!exercise) return null;

   return (
      <Modal isOpen={isOpen} onClose={onClose} title={exercise.name}>
         <div className="space-y-4">
            {/* Media Gallery */}
            {exercise.media && exercise.media.length > 0 && (
               <div className="space-y-2">
                  {exercise.media.map((media, index) => (
                     <div key={index} className="rounded-lg overflow-hidden bg-moss-deep">
                        {media.media_type === 'VIDEO' ? (
                           <div className="aspect-video">
                              <iframe
                                 src={media.url}
                                 title={`${exercise.name} video ${index + 1}`}
                                 className="w-full h-full"
                                 allowFullScreen
                              />
                           </div>
                        ) : (
                           <img
                              src={media.url}
                              alt={`${exercise.name} ${index + 1}`}
                              className="w-full h-auto"
                           />
                        )}
                     </div>
                  ))}
               </div>
            )}

            {/* Description */}
            {exercise.description && (
               <div>
                  <h4 className="text-sm font-semibold text-moss-text mb-2">Mô tả</h4>
                  <p className="text-sm text-moss-muted whitespace-pre-line">
                     {exercise.description}
                  </p>
               </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
               {/* Muscle Group */}
               {exercise.muscle_group_name && (
                  <div className="p-3 rounded-lg bg-moss-surface border border-moss-border">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary !text-base">
                           category
                        </span>
                        <p className="text-xs text-moss-muted">Nhóm cơ</p>
                     </div>
                     <p className="text-sm font-medium text-moss-text">
                        {exercise.muscle_group_name}
                     </p>
                  </div>
               )}

               {/* Difficulty */}
               {exercise.difficulty_level && (
                  <div className="p-3 rounded-lg bg-moss-surface border border-moss-border">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary !text-base">
                           speed
                        </span>
                        <p className="text-xs text-moss-muted">Độ khó</p>
                     </div>
                     <p className="text-sm font-medium text-moss-text">
                        {exercise.difficulty_level}
                     </p>
                  </div>
               )}

               {/* Calories */}
               {exercise.calories_burn_estimate && (
                  <div className="p-3 rounded-lg bg-moss-surface border border-moss-border">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary !text-base">
                           local_fire_department
                        </span>
                        <p className="text-xs text-moss-muted">Calories</p>
                     </div>
                     <p className="text-sm font-medium text-moss-text">
                        ~{exercise.calories_burn_estimate} kcal
                     </p>
                  </div>
               )}
            </div>

            {/* Add to Plan Button */}
            {onAddToPlan && (
               <button
                  onClick={() => onAddToPlan(exercise)}
                  className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(201,216,98,0.2)]"
               >
                  Thêm vào lịch tập
               </button>
            )}
         </div>
      </Modal>
   );
};

export default ExerciseDetailModal;
