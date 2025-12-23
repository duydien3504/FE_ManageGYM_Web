import React, { useState, useEffect } from 'react';
import { exercisesService } from '../../services/api/exercises.service';
import ExerciseCard from '../../components/workout/ExerciseCard';
import ExerciseDetailModal from '../../components/workout/ExerciseDetailModal';

const Exercises = () => {
   const [exercises, setExercises] = useState([]);
   const [muscleGroups, setMuscleGroups] = useState([]);
   const [selectedExercise, setSelectedExercise] = useState(null);
   const [showDetailModal, setShowDetailModal] = useState(false);
   const [filters, setFilters] = useState({
      muscle_group_id: '',
      difficulty: '',
      search: '',
   });
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);

   useEffect(() => {
      loadMuscleGroups();
   }, []);

   useEffect(() => {
      loadExercises();
   }, [filters, page]);

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
         const params = { page };
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

   const handleExerciseClick = async (exercise) => {
      try {
         const details = await exercisesService.getExerciseDetails(exercise.exercise_id || exercise.id);
         setSelectedExercise(details);
         setShowDetailModal(true);
      } catch (error) {
         console.error('Failed to load exercise details:', error);
      }
   };

   const filteredExercises = exercises.filter(ex => {
      if (filters.search) {
         return ex.name?.toLowerCase().includes(filters.search.toLowerCase());
      }
      return true;
   });

   return (
      <div className="min-h-screen bg-moss-deep py-8">
         <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl md:text-4xl font-black text-moss-text mb-2">
                  Danh sách bài tập
               </h1>
               <p className="text-moss-muted">
                  Khám phá thư viện bài tập phong phú cho mọi nhóm cơ
               </p>
            </div>

            {/* Filters */}
            <div className="mb-6 space-y-4">
               {/* Search */}
               <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-moss-muted">
                     search
                  </span>
                  <input
                     type="text"
                     placeholder="Tìm kiếm bài tập..."
                     value={filters.search}
                     onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                     className="w-full pl-12 pr-4 py-3 bg-moss-card border border-moss-border rounded-xl text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
               </div>

               {/* Filter Pills */}
               <div className="flex flex-wrap gap-3">
                  {/* Muscle Group Filter */}
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

                  {/* Difficulty Filter */}
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

                  {/* Clear Filters */}
                  {(filters.muscle_group_id || filters.difficulty || filters.search) && (
                     <button
                        onClick={() => setFilters({ muscle_group_id: '', difficulty: '', search: '' })}
                        className="px-4 py-2 bg-moss-surface border border-moss-border rounded-full text-moss-muted hover:text-moss-text hover:border-primary/50 transition-all text-sm flex items-center gap-1"
                     >
                        <span className="material-symbols-outlined !text-base">close</span>
                        <span>Xóa bộ lọc</span>
                     </button>
                  )}
               </div>
            </div>

            {/* Exercise Grid */}
            {loading ? (
               <div className="text-center py-12">
                  <div className="inline-block size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : filteredExercises.length === 0 ? (
               <div className="text-center py-12">
                  <span className="material-symbols-outlined text-moss-muted !text-6xl mb-4">
                     fitness_center
                  </span>
                  <p className="text-moss-muted">Không tìm thấy bài tập nào</p>
               </div>
            ) : (
               <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {filteredExercises.map((exercise) => (
                        <ExerciseCard
                           key={exercise.exercise_id || exercise.id}
                           exercise={exercise}
                           onClick={() => handleExerciseClick(exercise)}
                        />
                     ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-2 mt-8">
                     <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="h-10 px-4 rounded-full bg-moss-card border border-moss-border text-moss-text hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                     >
                        <span className="material-symbols-outlined !text-base">chevron_left</span>
                        <span className="hidden sm:inline">Trước</span>
                     </button>
                     <div className="h-10 px-4 rounded-full bg-moss-card border border-primary/50 text-moss-text flex items-center">
                        Trang {page}
                     </div>
                     <button
                        onClick={() => setPage(page + 1)}
                        disabled={filteredExercises.length === 0}
                        className="h-10 px-4 rounded-full bg-moss-card border border-moss-border text-moss-text hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                     >
                        <span className="hidden sm:inline">Sau</span>
                        <span className="material-symbols-outlined !text-base">chevron_right</span>
                     </button>
                  </div>
               </>
            )}
         </div>

         {/* Exercise Detail Modal */}
         <ExerciseDetailModal
            isOpen={showDetailModal}
            onClose={() => {
               setShowDetailModal(false);
               setSelectedExercise(null);
            }}
            exercise={selectedExercise}
         />
      </div>
   );
};

export default Exercises;
