import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { adminService } from '../../services/api/admin.service';
import { exercisesService } from '../../services/api/exercises.service';

const ExerciseForm = ({ isOpen, onClose, exercise, onSuccess }) => {
   const [formData, setFormData] = useState({
      muscle_group_id: '',
      name: '',
      difficulty_level: 'MEDIUM',
      calories_burn_estimate: 0,
      description: '',
   });
   const [muscleGroups, setMuscleGroups] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      loadMuscleGroups();
   }, []);

   useEffect(() => {
      if (exercise) {
         setFormData({
            muscle_group_id: exercise.muscle_group_id || '',
            name: exercise.name || '',
            difficulty_level: exercise.difficulty_level || 'MEDIUM',
            calories_burn_estimate: exercise.calories_burn_estimate || 0,
            description: exercise.description || '',
         });
      } else {
         setFormData({
            muscle_group_id: '',
            name: '',
            difficulty_level: 'MEDIUM',
            calories_burn_estimate: 0,
            description: '',
         });
      }
   }, [exercise, isOpen]);

   const loadMuscleGroups = async () => {
      try {
         const response = await exercisesService.getMuscleGroups();
         setMuscleGroups(response || []);
      } catch (err) {
         console.error('Failed to load muscle groups:', err);
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      let processedValue = value;

      // Convert muscle_group_id to integer
      if (name === 'muscle_group_id') {
         processedValue = value ? parseInt(value) : '';
      }
      // Convert calories to integer
      else if (name === 'calories_burn_estimate') {
         processedValue = value ? parseInt(value) : 0;
      }

      setFormData({
         ...formData,
         [name]: processedValue,
      });
      setError('');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
         if (exercise) {
            await adminService.updateExercise(exercise.exercise_id, formData);
         } else {
            await adminService.createExercise(formData);
         }

         if (onSuccess) onSuccess();
         onClose();
      } catch (err) {
         setError(err.message || 'Failed to save exercise');
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         title={exercise ? 'Chỉnh sửa bài tập' : 'Tạo bài tập mới'}
      >
         <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
               <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
               </div>
            )}

            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Tên bài tập <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Bench Press, Squat..."
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Nhóm cơ <span className="text-red-500">*</span>
               </label>
               <select
                  name="muscle_group_id"
                  value={formData.muscle_group_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary"
               >
                  <option value="">Chọn nhóm cơ</option>
                  {muscleGroups.map((group) => (
                     <option key={group.group_id} value={group.group_id}>
                        {group.group_name}
                     </option>
                  ))}
               </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-moss-text mb-2">
                     Độ khó <span className="text-red-500">*</span>
                  </label>
                  <select
                     name="difficulty_level"
                     value={formData.difficulty_level}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                     <option value="EASY">Easy</option>
                     <option value="MEDIUM">Medium</option>
                     <option value="HARD">Hard</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium text-moss-text mb-2">
                     Calories (kcal)
                  </label>
                  <input
                     type="number"
                     name="calories_burn_estimate"
                     value={formData.calories_burn_estimate}
                     onChange={handleChange}
                     min="0"
                     placeholder="100"
                     className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Mô tả
               </label>
               <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Hướng dẫn thực hiện bài tập..."
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
               />
            </div>

            <button
               type="submit"
               disabled={loading}
               className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {loading ? 'Đang lưu...' : exercise ? 'Cập nhật' : 'Tạo mới'}
            </button>
         </form>
      </Modal>
   );
};

export default ExerciseForm;
