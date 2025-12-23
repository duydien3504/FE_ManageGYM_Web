import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import ExerciseCard from './ExerciseCard';
import { exercisesService } from '../../services/api/exercises.service';
import { schedulesService } from '../../services/api/schedules.service';
import { toast } from 'react-hot-toast';

const AddExerciseModal = ({ isOpen, onClose, scheduleId, onSuccess }) => {
   const [exercises, setExercises] = useState([]);
   const [muscleGroups, setMuscleGroups] = useState([]);
   const [selectedExercise, setSelectedExercise] = useState(null);
   const [formData, setFormData] = useState({
      target_sets: 3,
      target_reps: 12,
      target_rest_time: 60,
   });
   const [filters, setFilters] = useState({
      muscle_group_id: '',
      difficulty: '',
      search: '',
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      if (isOpen) {
         loadMuscleGroups();
         loadExercises();
      }
   }, [isOpen, filters]);

   const loadMuscleGroups = async () => {
      try {
         const response = await exercisesService.getMuscleGroups();
         setMuscleGroups(response || []);
      } catch (err) {
         console.error('Failed to load muscle groups:', err);
      }
   };

   const loadExercises = async () => {
      try {
         const params = {};
         if (filters.muscle_group_id) params.muscle_group_id = filters.muscle_group_id;
         if (filters.difficulty) params.difficulty = filters.difficulty;

         const response = await exercisesService.getExercises(params);
         setExercises(response.data || response || []);
      } catch (err) {
         console.error('Failed to load exercises:', err);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedExercise) {
         setError('Vui lòng chọn bài tập');
         return;
      }

      setLoading(true);
      setError('');

      try {
         await schedulesService.addExerciseToSchedule(scheduleId, {
            exercise_id: selectedExercise.exercise_id || selectedExercise.id,
            ...formData,
         });

         toast.success('Đã thêm bài tập vào lịch thành công!');

         if (onSuccess) onSuccess();

         // Reset and close
         setSelectedExercise(null);
         setFormData({ target_sets: 3, target_reps: 12, target_rest_time: 60 });
         onClose();
      } catch (err) {
         const errorMessage = err.message || 'Failed to add exercise. Please try again.';
         setError(errorMessage);
         toast.error(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   const filteredExercises = exercises.filter(ex => {
      if (filters.search) {
         return ex.name?.toLowerCase().includes(filters.search.toLowerCase());
      }
      return true;
   });

   return (
      <Modal isOpen={isOpen} onClose={onClose} title="Thêm bài tập vào lịch">
         <div className="space-y-4">
            {/* Error Message */}
            {error && (
               <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
               </div>
            )}

            {/* Filters */}
            <div className="space-y-3">
               {/* Search */}
               <input
                  type="text"
                  placeholder="Tìm kiếm bài tập..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full px-4 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm"
               />

               {/* Muscle Group & Difficulty */}
               <div className="grid grid-cols-2 gap-2">
                  <select
                     value={filters.muscle_group_id}
                     onChange={(e) => setFilters({ ...filters, muscle_group_id: e.target.value })}
                     className="px-3 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                     className="px-3 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                     <option value="">Tất cả độ khó</option>
                     <option value="Easy">Easy</option>
                     <option value="Medium">Medium</option>
                     <option value="Hard">Hard</option>
                  </select>
               </div>
            </div>

            {/* Exercise List */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
               {filteredExercises.map((exercise) => (
                  <div
                     key={exercise.exercise_id || exercise.id}
                     onClick={() => setSelectedExercise(exercise)}
                     className={`cursor-pointer ${selectedExercise?.exercise_id === exercise.exercise_id ||
                        selectedExercise?.id === exercise.id
                        ? 'ring-2 ring-primary rounded-lg'
                        : ''
                        }`}
                  >
                     <ExerciseCard exercise={exercise} compact />
                  </div>
               ))}
            </div>

            {/* Selected Exercise Form */}
            {selectedExercise && (
               <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-moss-border">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                     <p className="text-sm text-moss-text font-medium">
                        Đã chọn: {selectedExercise.name}
                     </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                     <div>
                        <label className="block text-xs text-moss-muted mb-1">
                           Sets <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="number"
                           min="1"
                           value={formData.target_sets}
                           onChange={(e) => setFormData({ ...formData, target_sets: parseInt(e.target.value) })}
                           required
                           className="w-full px-3 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                     </div>
                     <div>
                        <label className="block text-xs text-moss-muted mb-1">
                           Reps <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="number"
                           min="1"
                           value={formData.target_reps}
                           onChange={(e) => setFormData({ ...formData, target_reps: parseInt(e.target.value) })}
                           required
                           className="w-full px-3 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                     </div>
                     <div>
                        <label className="block text-xs text-moss-muted mb-1">
                           Rest (s) <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="number"
                           min="0"
                           value={formData.target_rest_time}
                           onChange={(e) => setFormData({ ...formData, target_rest_time: parseInt(e.target.value) })}
                           required
                           className="w-full px-3 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                     </div>
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full h-10 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                     {loading ? 'Đang thêm...' : 'Thêm vào lịch'}
                  </button>
               </form>
            )}
         </div>
      </Modal>
   );
};

export default AddExerciseModal;
