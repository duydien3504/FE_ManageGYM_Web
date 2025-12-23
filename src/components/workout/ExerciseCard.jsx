import React from 'react';

const ExerciseCard = ({ exercise, onClick, compact = false }) => {
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

   if (compact) {
      return (
         <div
            onClick={onClick}
            className="flex items-center gap-3 p-3 rounded-lg bg-moss-surface border border-moss-border hover:border-primary/50 transition-all cursor-pointer"
         >
            {/* Thumbnail */}
            {exercise.thumbnail_url ? (
               <img
                  src={exercise.thumbnail_url}
                  alt={exercise.name}
                  className="size-12 rounded-lg object-cover bg-moss-card"
               />
            ) : (
               <div className="size-12 rounded-lg bg-moss-card flex items-center justify-center">
                  <span className="material-symbols-outlined text-moss-muted">fitness_center</span>
               </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
               <h4 className="font-medium text-moss-text text-sm truncate">{exercise.name}</h4>
               {exercise.muscle_group_name && (
                  <p className="text-xs text-moss-muted">{exercise.muscle_group_name}</p>
               )}
            </div>

            {/* Difficulty Badge */}
            {exercise.difficulty_level && (
               <div className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(exercise.difficulty_level)}`}>
                  {exercise.difficulty_level}
               </div>
            )}
         </div>
      );
   }

   return (
      <div
         onClick={onClick}
         className="group relative rounded-xl bg-moss-card border border-moss-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden"
      >
         {/* Image */}
         <div className="aspect-video w-full bg-moss-deep relative overflow-hidden">
            {exercise.thumbnail_url ? (
               <img
                  src={exercise.thumbnail_url}
                  alt={exercise.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
               />
            ) : (
               <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-moss-muted !text-5xl">
                     fitness_center
                  </span>
               </div>
            )}

            {/* Difficulty Badge */}
            {exercise.difficulty_level && (
               <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium border backdrop-blur-sm ${getDifficultyColor(exercise.difficulty_level)}`}>
                  {exercise.difficulty_level}
               </div>
            )}
         </div>

         {/* Content */}
         <div className="p-4">
            <h3 className="font-bold text-moss-text mb-2 line-clamp-1">
               {exercise.name}
            </h3>

            {/* Muscle Group */}
            {exercise.muscle_group_name && (
               <div className="flex items-center gap-1 text-sm text-moss-muted mb-2">
                  <span className="material-symbols-outlined !text-base">category</span>
                  <span>{exercise.muscle_group_name}</span>
               </div>
            )}

            {/* Calories */}
            {exercise.calories_burn_estimate && (
               <div className="flex items-center gap-1 text-sm text-moss-muted">
                  <span className="material-symbols-outlined !text-base">local_fire_department</span>
                  <span>~{exercise.calories_burn_estimate} kcal</span>
               </div>
            )}
         </div>
      </div>
   );
};

export default ExerciseCard;
