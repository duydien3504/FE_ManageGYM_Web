import React, { useState, useEffect } from 'react';
import { exercisesService } from '../../services/api/exercises.service';
import { adminService } from '../../services/api/admin.service';
import ExerciseForm from './ExerciseForm';
import MediaManager from './MediaManager';

const ExercisesTab = () => {
   const [exercises, setExercises] = useState([]);
   const [muscleGroups, setMuscleGroups] = useState([]);
   const [selectedExercise, setSelectedExercise] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [showMediaManager, setShowMediaManager] = useState(false);
   const [filters, setFilters] = useState({
      muscle_group_id: '',
      difficulty: '',
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      loadMuscleGroups();
      loadExercises();
   }, [filters]);

   const loadMuscleGroups = async () => {
      try {
         const response = await exercisesService.getMuscleGroups();
         setMuscleGroups(response || []);
      } catch (error) {
         console.error('Failed to load muscle groups:', error);
      }
   };

   const loadExercises = async () => {
      try {
         setLoading(true);
         const params = {};
         if (filters.muscle_group_id) params.muscle_group_id = filters.muscle_group_id;
         if (filters.difficulty) params.difficulty = filters.difficulty;

         const response = await exercisesService.getExercises(params);
         setExercises(response.data || response || []);
      } catch (error) {
         console.error('Failed to load exercises:', error);
      } finally {
         setLoading(false);
      }
   };

   const handleEdit = (exercise) => {
      setSelectedExercise(exercise);
      setShowForm(true);
   };

   const handleCreate = () => {
      setSelectedExercise(null);
      setShowForm(true);
   };

   const handleDelete = async (exercise) => {
      if (!window.confirm(`Bạn có chắc muốn xóa bài tập "${exercise.name}"?`)) return;

      try {
         await adminService.deleteExercise(exercise.exercise_id);
         loadExercises();
      } catch (error) {
         alert('Failed to delete exercise: ' + error.message);
      }
   };

   const handleManageMedia = async (exercise) => {
      console.log('handleManageMedia - exercise:', exercise);
      console.log('handleManageMedia - exercise_id:', exercise.exercise_id);

      if (!exercise || !exercise.exercise_id) {
         alert('Không tìm thấy ID bài tập. Vui lòng thử lại.');
         return;
      }

      try {
         const details = await exercisesService.getExerciseDetails(exercise.exercise_id);
         console.log('handleManageMedia - details:', details);
         setSelectedExercise(details);
         setShowMediaManager(true);
      } catch (error) {
         console.error('Failed to load exercise details:', error);
         alert('Failed to load exercise details: ' + error.message);
      }
   };

   const handleFormSuccess = () => {
      loadExercises();
   };

   const handleMediaSuccess = async () => {
      // Reload exercise details
      if (selectedExercise) {
         const details = await exercisesService.getExerciseDetails(selectedExercise.exercise_id);
         setSelectedExercise(details);
      }
   };

   const getDifficultyColor = (difficulty) => {
      switch (difficulty?.toLowerCase()) {
         case 'easy':
            return 'bg-green-500/10 text-green-400 border-green-500/30';
         case 'medium':
            return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
         case 'hard':
            return 'bg-red-500/10 text-red-400 border-red-500/30';
         default:
            return 'bg-moss-muted/10 text-moss-muted border-moss-muted/30';
      }
   };

   return (
      <div className="space-y-4">
         {/* Header & Filters */}
         <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-moss-text">Quản lý bài tập</h2>
            <button
               onClick={handleCreate}
               className="h-10 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] flex items-center gap-2"
            >
               <span className="material-symbols-outlined !text-lg">add</span>
               <span>Tạo mới</span>
            </button>
         </div>

         {/* Filters */}
         <div className="flex gap-3">
            <select
               value={filters.muscle_group_id}
               onChange={(e) => setFilters({ ...filters, muscle_group_id: e.target.value })}
               className="px-4 py-2 bg-moss-card border border-moss-border rounded-full text-moss-text focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
               <option value="">Tất cả nhóm cơ</option>
               {muscleGroups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                     {group.group_name}
                  </option>
               ))}
            </select>

            <select
               value={filters.difficulty}
               onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
               className="px-4 py-2 bg-moss-card border border-moss-border rounded-full text-moss-text focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
               <option value="">Tất cả độ khó</option>
               <option value="Easy">Easy</option>
               <option value="Medium">Medium</option>
               <option value="Hard">Hard</option>
            </select>

            {(filters.muscle_group_id || filters.difficulty) && (
               <button
                  onClick={() => setFilters({ muscle_group_id: '', difficulty: '' })}
                  className="px-4 py-2 bg-moss-surface border border-moss-border rounded-full text-moss-muted hover:text-moss-text hover:border-primary/50 transition-all text-sm flex items-center gap-1"
               >
                  <span className="material-symbols-outlined !text-base">close</span>
                  <span>Xóa bộ lọc</span>
               </button>
            )}
         </div>

         {/* Table */}
         {loading ? (
            <div className="text-center py-12">
               <div className="inline-block size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
         ) : exercises.length === 0 ? (
            <div className="text-center py-12 bg-moss-card rounded-xl border border-moss-border">
               <span className="material-symbols-outlined text-moss-muted !text-6xl mb-4">
                  fitness_center
               </span>
               <p className="text-moss-muted">Không tìm thấy bài tập nào</p>
            </div>
         ) : (
            <div className="bg-moss-card rounded-xl border border-moss-border overflow-hidden">
               <table className="w-full">
                  <thead className="bg-moss-surface border-b border-moss-border">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Tên bài tập
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Nhóm cơ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Độ khó
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Calories
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Thao tác
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-moss-border">
                     {exercises.map((exercise) => (
                        <tr key={exercise.exercise_id} className="hover:bg-moss-surface transition-colors">
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-moss-muted">
                              {exercise.exercise_id}
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-sm font-medium text-moss-text">
                                 {exercise.name}
                              </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-moss-muted">
                                 {exercise.muscle_group_name || '-'}
                              </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(exercise.difficulty_level)}`}>
                                 {exercise.difficulty_level}
                              </span>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-moss-muted">
                              {exercise.calories_burn_estimate ? `~${exercise.calories_burn_estimate} kcal` : '-'}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex items-center justify-end gap-2">
                                 <button
                                    onClick={() => handleManageMedia(exercise)}
                                    className="size-8 rounded-full hover:bg-moss-deep text-moss-muted hover:text-blue-400 transition-all flex items-center justify-center"
                                    title="Quản lý media"
                                 >
                                    <span className="material-symbols-outlined !text-lg">perm_media</span>
                                 </button>
                                 <button
                                    onClick={() => handleEdit(exercise)}
                                    className="size-8 rounded-full hover:bg-moss-deep text-moss-muted hover:text-primary transition-all flex items-center justify-center"
                                    title="Chỉnh sửa"
                                 >
                                    <span className="material-symbols-outlined !text-lg">edit</span>
                                 </button>
                                 <button
                                    onClick={() => handleDelete(exercise)}
                                    className="size-8 rounded-full hover:bg-moss-deep text-moss-muted hover:text-red-400 transition-all flex items-center justify-center"
                                    title="Xóa"
                                 >
                                    <span className="material-symbols-outlined !text-lg">delete</span>
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}

         {/* Form Modal */}
         <ExerciseForm
            isOpen={showForm}
            onClose={() => {
               setShowForm(false);
               setSelectedExercise(null);
            }}
            exercise={selectedExercise}
            onSuccess={handleFormSuccess}
         />

         {/* Media Manager Modal */}
         <MediaManager
            isOpen={showMediaManager}
            onClose={() => {
               setShowMediaManager(false);
               setSelectedExercise(null);
            }}
            exercise={selectedExercise}
            onSuccess={handleMediaSuccess}
         />
      </div>
   );
};

export default ExercisesTab;
