import React, { useState, useEffect } from 'react';
import { getDashboardStats, getWeightChart } from '../../services/api/stats.service';
import { getWorkoutHistory } from '../../services/api/workouts.service';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Stats = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [weightData, setWeightData] = useState(null);
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    const [selectedRange, setSelectedRange] = useState('3months');
    const [error, setError] = useState(null);

    const rangeOptions = [
        { value: '1month', label: '1 Tháng' },
        { value: '3months', label: '3 Tháng' },
        { value: '6months', label: '6 Tháng' },
        { value: '1year', label: '1 Năm' },
        { value: 'all', label: 'Tất cả' },
    ];

    useEffect(() => {
        if (isAuthenticated) {
            fetchDashboardStats();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchWeightChart(selectedRange);
        }
    }, [selectedRange, isAuthenticated]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const data = await getDashboardStats();
            setDashboardStats(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard stats:', err);
            setError('Không thể tải thống kê. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeightChart = async (range) => {
        try {
            const data = await getWeightChart(range);
            setWeightData(data);
        } catch (err) {
            console.error('Error fetching weight chart:', err);
        }
    };

    // Prepare chart data
    const chartData = weightData?.data ? {
        labels: weightData.data.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' });
        }),
        datasets: [
            {
                label: 'Cân nặng (kg)',
                data: weightData.data.map(item => item.weight),
                borderColor: '#C9D862',
                backgroundColor: 'rgba(201, 216, 98, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#C9D862',
                pointBorderColor: '#0F1410',
                pointBorderWidth: 2,
            }
        ]
    } : null;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1A2419',
                titleColor: '#C9D862',
                bodyColor: '#E8F5E9',
                borderColor: '#2C3E2D',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return `${context.parsed.y} kg`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#2C3E2D',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: '#2C3E2D',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 11
                    },
                    callback: function (value) {
                        return value + ' kg';
                    }
                }
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-moss-surface flex items-center justify-center">
                <div className="text-center p-8 bg-moss-card rounded-2xl border border-moss-border max-w-md">
                    <span className="material-symbols-outlined text-moss-muted" style={{ fontSize: '64px' }}>
                        lock
                    </span>
                    <h2 className="text-2xl font-bold text-moss-text mt-4 mb-2">Yêu cầu đăng nhập</h2>
                    <p className="text-moss-muted">Vui lòng đăng nhập để xem thống kê của bạn.</p>
                </div>
            </div>
        );
    }

    if (loading && !dashboardStats) {
        return (
            <div className="min-h-screen bg-moss-surface flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-moss-border border-t-primary mx-auto"></div>
                    <p className="text-moss-muted mt-4">Đang tải thống kê...</p>
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
                            monitoring
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black text-moss-text">
                            Thống kê tiến độ
                        </h1>
                    </div>
                    <p className="text-moss-muted text-lg">
                        Theo dõi quá trình tập luyện và cân nặng của bạn
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
                        <span className="material-symbols-outlined">error</span>
                        <span>{error}</span>
                    </div>
                )}

                {/* Dashboard Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Workouts */}
                    <div className="group relative p-6 rounded-2xl bg-moss-card border border-moss-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="size-12 rounded-full bg-moss-deep flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-moss-deep transition-colors border border-moss-border group-hover:border-primary">
                                <span className="material-symbols-outlined">fitness_center</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                <span className="text-primary text-xs font-bold">Tổng số</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-moss-text mb-1">
                            {dashboardStats?.total_workouts || 0}
                        </h3>
                        <p className="text-moss-muted text-sm">Buổi tập đã hoàn thành</p>
                    </div>

                    {/* Total Minutes */}
                    <div className="group relative p-6 rounded-2xl bg-moss-card border border-moss-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="size-12 rounded-full bg-moss-deep flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-moss-deep transition-colors border border-moss-border group-hover:border-primary">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                <span className="text-primary text-xs font-bold">Thời gian</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-moss-text mb-1">
                            {dashboardStats?.total_minutes || 0}
                        </h3>
                        <p className="text-moss-muted text-sm">Phút tập luyện</p>
                        <p className="text-primary text-xs mt-2 font-medium">
                            ≈ {Math.floor((dashboardStats?.total_minutes || 0) / 60)} giờ
                        </p>
                    </div>

                    {/* Current Streak */}
                    <div className="group relative p-6 rounded-2xl bg-moss-card border border-moss-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="size-12 rounded-full bg-moss-deep flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-moss-deep transition-colors border border-moss-border group-hover:border-primary">
                                <span className="material-symbols-outlined">local_fire_department</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                <span className="text-primary text-xs font-bold">Streak</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-moss-text mb-1">
                            {dashboardStats?.current_streak || 0}
                        </h3>
                        <p className="text-moss-muted text-sm">Ngày liên tiếp</p>
                        {(dashboardStats?.current_streak || 0) >= 7 && (
                            <p className="text-primary text-xs mt-2 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined !text-sm">celebration</span>
                                Tuyệt vời! Tiếp tục phát huy!
                            </p>
                        )}
                    </div>
                </div>

                {/* Weight Chart */}
                <div className="p-6 md:p-8 rounded-2xl bg-moss-card border border-moss-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-moss-text mb-1">
                                Biểu đồ cân nặng
                            </h2>
                            <p className="text-moss-muted text-sm">
                                Theo dõi sự thay đổi cân nặng theo thời gian
                            </p>
                        </div>

                        {/* Range Selector */}
                        <div className="flex gap-2 flex-wrap">
                            {rangeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setSelectedRange(option.value)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedRange === option.value
                                        ? 'bg-primary text-moss-deep shadow-[0_0_20px_rgba(201,216,98,0.2)]'
                                        : 'bg-moss-surface text-moss-muted border border-moss-border hover:border-primary/30 hover:text-moss-text'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="relative h-[400px] bg-moss-deep/30 rounded-xl p-4 border border-moss-border">
                        {chartData && chartData.labels.length > 0 ? (
                            <Line data={chartData} options={chartOptions} />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-moss-muted">
                                <span className="material-symbols-outlined mb-3" style={{ fontSize: '64px' }}>
                                    show_chart
                                </span>
                                <p className="text-lg font-medium">Chưa có dữ liệu cân nặng</p>
                                <p className="text-sm mt-1">Hãy thêm thông số cơ thể trong trang Hồ sơ</p>
                            </div>
                        )}
                    </div>

                    {/* Chart Legend */}
                    {chartData && chartData.labels.length > 0 && (
                        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-primary"></div>
                                <span className="text-moss-muted">Cân nặng</span>
                            </div>
                            {weightData?.data && weightData.data.length > 1 && (
                                <div className="flex items-center gap-2 text-moss-muted">
                                    <span className="material-symbols-outlined !text-sm">info</span>
                                    <span>
                                        Thay đổi: {' '}
                                        <span className={`font-bold ${weightData.data[weightData.data.length - 1].weight - weightData.data[0].weight > 0
                                            ? 'text-red-400'
                                            : 'text-green-400'
                                            }`}>
                                            {(weightData.data[weightData.data.length - 1].weight - weightData.data[0].weight).toFixed(1)} kg
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Motivational Section */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-moss-card border border-primary/20">
                    <div className="flex items-start gap-4">
                        <div className="size-12 rounded-full bg-primary flex items-center justify-center text-moss-deep flex-shrink-0">
                            <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-moss-text mb-2">Mẹo nhỏ</h3>
                            <p className="text-moss-muted leading-relaxed">
                                Theo dõi tiến độ thường xuyên giúp bạn duy trì động lực và điều chỉnh kế hoạch tập luyện phù hợp.
                                Hãy ghi nhận mọi buổi tập và cập nhật cân nặng định kỳ để có cái nhìn tổng quan về hành trình của bạn!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
