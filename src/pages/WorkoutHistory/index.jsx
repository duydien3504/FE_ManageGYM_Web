import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getWorkoutHistory, getWorkoutDetail, deleteWorkout } from '../../services/api/workouts.service';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

const WorkoutHistory = () => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [detailModal, setDetailModal] = useState({ isOpen: false, data: null });
    const [loadingDetail, setLoadingDetail] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadHistory();
        }
    }, [isAuthenticated, selectedMonth, selectedYear]);

    const loadHistory = async () => {
        try {
            setLoading(true);
            const data = await getWorkoutHistory(selectedMonth, selectedYear);
            setHistory(data || []);
        } catch (error) {
            console.error('Error loading workout history:', error);
            toast.error('Không thể tải lịch sử tập luyện');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = async (historyId) => {
        try {
            setLoadingDetail(true);
            setDetailModal({ isOpen: true, data: null });
            const data = await getWorkoutDetail(historyId);
            setDetailModal({ isOpen: true, data });
        } catch (error) {
            console.error('Error loading workout detail:', error);
            toast.error('Không thể tải chi tiết buổi tập');
            setDetailModal({ isOpen: false, data: null });
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleDelete = async (historyId) => {
        if (!window.confirm('Bạn có chắc muốn xóa buổi tập này?')) return;

        try {
            await deleteWorkout(historyId);
            toast.success('Đã xóa buổi tập');
            loadHistory();
        } catch (error) {
            console.error('Error deleting workout:', error);
            toast.error('Không thể xóa buổi tập');
        }
    };

    const months = [
        { value: 1, label: 'Tháng 1' },
        { value: 2, label: 'Tháng 2' },
        { value: 3, label: 'Tháng 3' },
        { value: 4, label: 'Tháng 4' },
        { value: 5, label: 'Tháng 5' },
        { value: 6, label: 'Tháng 6' },
        { value: 7, label: 'Tháng 7' },
        { value: 8, label: 'Tháng 8' },
        { value: 9, label: 'Tháng 9' },
        { value: 10, label: 'Tháng 10' },
        { value: 11, label: 'Tháng 11' },
        { value: 12, label: 'Tháng 12' },
    ];

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-moss-surface flex items-center justify-center">
                <div className="text-center p-8 bg-moss-card rounded-2xl border border-moss-border max-w-md">
                    <span className="material-symbols-outlined text-moss-muted" style={{ fontSize: '64px' }}>
                        lock
                    </span>
                    <h2 className="text-2xl font-bold text-moss-text mt-4 mb-2">Yêu cầu đăng nhập</h2>
                    <p className="text-moss-muted">Vui lòng đăng nhập để xem lịch sử tập luyện.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-moss-surface">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>
                            history
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black text-moss-text">
                            Lịch sử tập luyện
                        </h1>
                    </div>
                    <p className="text-moss-muted text-lg">
                        Xem lại các buổi tập đã hoàn thành
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-moss-muted mb-2">Tháng</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="px-4 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {months.map(month => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-moss-muted mb-2">Năm</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="px-4 py-2 bg-moss-card border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* History List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-moss-border border-t-primary mx-auto"></div>
                        <p className="text-moss-muted mt-4">Đang tải...</p>
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-center py-12 bg-moss-card rounded-2xl border border-moss-border">
                        <span className="material-symbols-outlined text-moss-muted" style={{ fontSize: '64px' }}>
                            event_busy
                        </span>
                        <h3 className="text-xl font-bold text-moss-text mt-4 mb-2">
                            Chưa có buổi tập nào
                        </h3>
                        <p className="text-moss-muted">
                            Hãy bắt đầu tập luyện và ghi nhận tiến độ của bạn!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item) => (
                            <div
                                key={item.history_id}
                                className="p-6 rounded-2xl bg-moss-card border border-moss-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Date and Time */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-primary !text-lg">
                                                calendar_today
                                            </span>
                                            <span className="text-moss-text font-bold">
                                                {new Date(item.performed_at).toLocaleDateString('vi-VN', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <span className="text-moss-muted">
                                                {new Date(item.performed_at).toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>

                                        {/* Plan Name */}
                                        {item.plan_name && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="material-symbols-outlined text-moss-muted !text-sm">
                                                    event_note
                                                </span>
                                                <span className="text-moss-muted text-sm">{item.plan_name}</span>
                                            </div>
                                        )}

                                        {/* Stats */}
                                        <div className="flex gap-4 mt-3">
                                            <div className="flex items-center gap-1 text-sm text-moss-muted">
                                                <span className="material-symbols-outlined !text-base">schedule</span>
                                                <span>{item.duration_minutes || 0} phút</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-moss-muted">
                                                <span className="material-symbols-outlined !text-base">fitness_center</span>
                                                <span>{item.exercise_count || 0} bài tập</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewDetail(item.history_id)}
                                            className="size-10 rounded-full hover:bg-moss-surface text-moss-muted hover:text-primary transition-all flex items-center justify-center"
                                            title="Xem chi tiết"
                                        >
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.history_id)}
                                            className="size-10 rounded-full hover:bg-moss-surface text-moss-muted hover:text-red-400 transition-all flex items-center justify-center"
                                            title="Xóa"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={detailModal.isOpen}
                onClose={() => setDetailModal({ isOpen: false, data: null })}
                title="Chi tiết buổi tập"
            >
                {loadingDetail ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-moss-border border-t-primary mx-auto"></div>
                        <p className="text-moss-muted mt-4">Đang tải...</p>
                    </div>
                ) : detailModal.data ? (
                    <div className="space-y-6">
                        {/* Workout Info */}
                        <div className="p-4 rounded-lg bg-moss-surface border border-moss-border">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-moss-muted">Thời gian:</span>
                                    <p className="text-moss-text font-medium">
                                        {new Date(detailModal.data.performed_at).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-moss-muted">Thời lượng:</span>
                                    <p className="text-moss-text font-medium">
                                        {detailModal.data.duration_minutes} phút
                                    </p>
                                </div>
                            </div>
                            {detailModal.data.notes && (
                                <div className="mt-4">
                                    <span className="text-moss-muted text-sm">Ghi chú:</span>
                                    <p className="text-moss-text mt-1">{detailModal.data.notes}</p>
                                </div>
                            )}
                        </div>

                        {/* Exercises */}
                        <div>
                            <h3 className="text-lg font-bold text-moss-text mb-3">
                                Bài tập đã thực hiện ({detailModal.data.exercises?.length || 0})
                            </h3>
                            <div className="space-y-3">
                                {detailModal.data.exercises?.map((exercise, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg bg-moss-surface border border-moss-border"
                                    >
                                        <h4 className="font-medium text-moss-text mb-2">{exercise.name}</h4>
                                        <div className="flex gap-4 text-sm">
                                            <div className="flex items-center gap-1 text-moss-muted">
                                                <span className="font-medium text-moss-text">{exercise.actual_sets}</span>
                                                <span>sets</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-moss-muted">
                                                <span className="font-medium text-moss-text">{exercise.actual_reps}</span>
                                                <span>reps</span>
                                            </div>
                                            {exercise.weight_lifted > 0 && (
                                                <div className="flex items-center gap-1 text-moss-muted">
                                                    <span className="font-medium text-moss-text">{exercise.weight_lifted}</span>
                                                    <span>kg</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-moss-muted text-center py-8">Không có dữ liệu</p>
                )}
            </Modal>
        </div>
    );
};

export default WorkoutHistory;
