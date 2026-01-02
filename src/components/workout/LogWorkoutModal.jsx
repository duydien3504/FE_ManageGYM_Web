import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { logWorkout } from '../../services/api/workouts.service';
import toast from 'react-hot-toast';

const LogWorkoutModal = ({ isOpen, onClose, schedule, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        duration_minutes: 60,
        notes: '',
        performed_at: new Date().toISOString().slice(0, 16), // Format for datetime-local input
    });
    const [exerciseData, setExerciseData] = useState([]);

    useEffect(() => {
        if (schedule && schedule.exercises) {
            // Initialize exercise data with target values
            const initialData = schedule.exercises.map(ex => ({
                exercise_id: ex.exercise_id,
                exercise_name: ex.name || ex.exercise_name,
                muscle_group: ex.muscle_group_name,
                target_sets: ex.target_sets,
                target_reps: ex.target_reps,
                actual_sets: ex.target_sets || 3,
                actual_reps: ex.target_reps || 10,
                weight_lifted: 0,
                completed: false,
            }));
            setExerciseData(initialData);
        }
    }, [schedule]);

    const handleExerciseChange = (index, field, value) => {
        const updated = [...exerciseData];
        updated[index][field] = field === 'completed' ? value : Number(value);
        setExerciseData(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate: at least one exercise must have data
        const hasData = exerciseData.some(ex =>
            ex.completed || ex.actual_sets > 0 || ex.actual_reps > 0 || ex.weight_lifted > 0
        );

        if (!hasData) {
            toast.error('Vui lòng nhập dữ liệu cho ít nhất một bài tập');
            return;
        }

        // Filter only exercises with data
        const details = exerciseData
            .filter(ex => ex.completed || ex.actual_sets > 0 || ex.actual_reps > 0)
            .map(ex => ({
                exercise_id: ex.exercise_id,
                actual_sets: ex.actual_sets,
                actual_reps: ex.actual_reps,
                weight_lifted: ex.weight_lifted,
            }));

        const workoutData = {
            plan_schedule_id: schedule?.schedule_id || null,
            performed_at: new Date(formData.performed_at).toISOString(),
            duration_minutes: formData.duration_minutes,
            notes: formData.notes,
            details: details,
        };

        setLoading(true);
        try {
            await logWorkout(workoutData);
            toast.success('Đã lưu buổi tập thành công!');
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error('Error logging workout:', error);
            toast.error(error.message || 'Không thể lưu buổi tập. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const toggleAll = (completed) => {
        setExerciseData(exerciseData.map(ex => ({ ...ex, completed })));
    };

    const completedCount = exerciseData.filter(ex => ex.completed).length;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ghi nhận buổi tập">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Workout Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Thời gian tập
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.performed_at}
                            onChange={(e) => setFormData({ ...formData, performed_at: e.target.value })}
                            className="w-full px-4 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-moss-text mb-2">
                            Thời lượng (phút)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.duration_minutes}
                            onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                </div>

                {/* Exercise List */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-moss-text">
                            Bài tập ({completedCount}/{exerciseData.length})
                        </h3>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => toggleAll(true)}
                                className="text-xs px-3 py-1 rounded-full bg-moss-surface border border-moss-border text-moss-muted hover:text-primary hover:border-primary/50 transition-colors"
                            >
                                Chọn tất cả
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleAll(false)}
                                className="text-xs px-3 py-1 rounded-full bg-moss-surface border border-moss-border text-moss-muted hover:text-red-400 hover:border-red-400/50 transition-colors"
                            >
                                Bỏ chọn
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {exerciseData.map((exercise, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg border-2 transition-all ${exercise.completed
                                        ? 'bg-primary/10 border-primary/50'
                                        : 'bg-moss-surface border-moss-border'
                                    }`}
                            >
                                {/* Exercise Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={exercise.completed}
                                            onChange={(e) => handleExerciseChange(index, 'completed', e.target.checked)}
                                            className="mt-1 size-5 rounded border-moss-border text-primary focus:ring-primary focus:ring-offset-moss-deep"
                                        />
                                        <div>
                                            <h4 className="font-medium text-moss-text">
                                                {exercise.exercise_name}
                                            </h4>
                                            {exercise.muscle_group && (
                                                <p className="text-xs text-moss-muted">{exercise.muscle_group}</p>
                                            )}
                                            <p className="text-xs text-moss-muted mt-1">
                                                Mục tiêu: {exercise.target_sets} sets × {exercise.target_reps} reps
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Exercise Inputs */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs text-moss-muted mb-1">Sets</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={exercise.actual_sets}
                                            onChange={(e) => handleExerciseChange(index, 'actual_sets', e.target.value)}
                                            className="w-full px-3 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-moss-muted mb-1">Reps</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={exercise.actual_reps}
                                            onChange={(e) => handleExerciseChange(index, 'actual_reps', e.target.value)}
                                            className="w-full px-3 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-moss-muted mb-1">Tạ (kg)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.5"
                                            value={exercise.weight_lifted}
                                            onChange={(e) => handleExerciseChange(index, 'weight_lifted', e.target.value)}
                                            className="w-full px-3 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-moss-text mb-2">
                        Ghi chú
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows="3"
                        placeholder="Cảm giác, năng lượng, hoặc bất kỳ ghi chú nào..."
                        className="w-full px-4 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-moss-border">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-12 px-6 rounded-full border border-moss-border text-moss-text hover:bg-moss-surface transition-colors disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="size-5 border-2 border-moss-deep border-t-transparent rounded-full animate-spin"></div>
                                <span>Đang lưu...</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">check_circle</span>
                                <span>Lưu buổi tập</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default LogWorkoutModal;
