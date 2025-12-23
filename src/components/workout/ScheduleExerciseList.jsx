import React, { useState } from 'react';
import { schedulesService } from '../../services/api/schedules.service';

const ScheduleExerciseList = ({ exercises = [], scheduleId, onUpdate, onAddExercise }) => {
   const [editingId, setEditingId] = useState(null);
   const [editForm, setEditForm] = useState({});
   const [loading, setLoading] = useState(false);

   const handleEdit = (exercise) => {
      setEditingId(exercise.plan_exercise_id);
      setEditForm({
         target_sets: exercise.target_sets,
         target_reps: exercise.target_reps,
         target_rest_time: exercise.target_rest_time,
      });
   };

   const handleSave = async (planExerciseId) => {
      setLoading(true);
      try {
         await schedulesService.updatePlanExercise(planExerciseId, editForm);
         setEditingId(null);
         if (onUpdate) onUpdate();
      } catch (error) {
         console.error('Failed to update exercise:', error);
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async (planExerciseId) => {
      if (!window.confirm('Bạn có chắc muốn xóa bài tập này?')) return;

      setLoading(true);
      try {
         await schedulesService.deletePlanExercise(planExerciseId);
         if (onUpdate) onUpdate();
      } catch (error) {
         console.error('Failed to delete exercise:', error);
      } finally {
         setLoading(false);
      }
   };

   if (!exercises || exercises.length === 0) {
      return (
         <div className="text-center py-8">
            <span className="material-symbols-outlined text-moss-muted !text-5xl mb-3">
               fitness_center
            </span>
            <p className="text-moss-muted mb-4">Chưa có bài tập nào</p>
            {onAddExercise && (
               <button
                  onClick={onAddExercise}
                  className="h-10 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-medium transition-all hover:scale-[1.02]"
               >
                  Thêm bài tập
               </button>
            )}
         </div>
      );
   }

   return (
      <div className="space-y-3">
         {exercises.map((exercise, index) => {
            const isEditing = editingId === exercise.plan_exercise_id;

            return (
               <div
                  key={exercise.plan_exercise_id}
                  className="p-4 rounded-lg bg-moss-surface border border-moss-border"
               >
                  {/* Exercise Header */}
                  <div className="flex items-start justify-between mb-3">
                     <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-moss-card flex items-center justify-center text-moss-muted text-sm font-bold">
                           {index + 1}
                        </div>
                        <div>
                           <h4 className="font-medium text-moss-text">
                              {exercise.name || exercise.exercise_name}
                           </h4>
                           {exercise.muscle_group_name && (
                              <p className="text-xs text-moss-muted">
                                 {exercise.muscle_group_name}
                              </p>
                           )}
                        </div>
                     </div>

                     {/* Actions */}
                     <div className="flex gap-1">
                        {!isEditing ? (
                           <>
                              <button
                                 onClick={() => handleEdit(exercise)}
                                 className="size-8 rounded-full hover:bg-moss-card text-moss-muted hover:text-primary transition-all flex items-center justify-center"
                              >
                                 <span className="material-symbols-outlined !text-lg">edit</span>
                              </button>
                              <button
                                 onClick={() => handleDelete(exercise.plan_exercise_id)}
                                 disabled={loading}
                                 className="size-8 rounded-full hover:bg-moss-card text-moss-muted hover:text-red-400 transition-all flex items-center justify-center disabled:opacity-50"
                              >
                                 <span className="material-symbols-outlined !text-lg">delete</span>
                              </button>
                           </>
                        ) : (
                           <>
                              <button
                                 onClick={() => handleSave(exercise.plan_exercise_id)}
                                 disabled={loading}
                                 className="size-8 rounded-full hover:bg-moss-card text-moss-muted hover:text-green-400 transition-all flex items-center justify-center disabled:opacity-50"
                              >
                                 <span className="material-symbols-outlined !text-lg">check</span>
                              </button>
                              <button
                                 onClick={() => setEditingId(null)}
                                 disabled={loading}
                                 className="size-8 rounded-full hover:bg-moss-card text-moss-muted hover:text-red-400 transition-all flex items-center justify-center disabled:opacity-50"
                              >
                                 <span className="material-symbols-outlined !text-lg">close</span>
                              </button>
                           </>
                        )}
                     </div>
                  </div>

                  {/* Exercise Details */}
                  {isEditing ? (
                     <div className="grid grid-cols-3 gap-3">
                        <div>
                           <label className="block text-xs text-moss-muted mb-1">Sets</label>
                           <input
                              type="number"
                              value={editForm.target_sets}
                              onChange={(e) => setEditForm({ ...editForm, target_sets: parseInt(e.target.value) })}
                              className="w-full px-3 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                        </div>
                        <div>
                           <label className="block text-xs text-moss-muted mb-1">Reps</label>
                           <input
                              type="number"
                              value={editForm.target_reps}
                              onChange={(e) => setEditForm({ ...editForm, target_reps: parseInt(e.target.value) })}
                              className="w-full px-3 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                        </div>
                        <div>
                           <label className="block text-xs text-moss-muted mb-1">Rest (s)</label>
                           <input
                              type="number"
                              value={editForm.target_rest_time}
                              onChange={(e) => setEditForm({ ...editForm, target_rest_time: parseInt(e.target.value) })}
                              className="w-full px-3 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                        </div>
                     </div>
                  ) : (
                     <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1 text-moss-muted">
                           <span className="font-medium text-moss-text">{exercise.target_sets}</span>
                           <span>sets</span>
                        </div>
                        <div className="flex items-center gap-1 text-moss-muted">
                           <span className="font-medium text-moss-text">{exercise.target_reps}</span>
                           <span>reps</span>
                        </div>
                        <div className="flex items-center gap-1 text-moss-muted">
                           <span className="font-medium text-moss-text">{exercise.target_rest_time}s</span>
                           <span>rest</span>
                        </div>
                     </div>
                  )}
               </div>
            );
         })}

         {/* Add Exercise Button */}
         {onAddExercise && (
            <button
               onClick={onAddExercise}
               className="w-full h-12 px-4 rounded-lg border-2 border-dashed border-moss-border hover:border-primary/50 text-moss-muted hover:text-primary transition-all flex items-center justify-center gap-2"
            >
               <span className="material-symbols-outlined">add_circle</span>
               <span className="font-medium">Thêm bài tập</span>
            </button>
         )}
      </div>
   );
};

export default ScheduleExerciseList;
