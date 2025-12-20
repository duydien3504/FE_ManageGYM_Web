import React from 'react';
import Card from '../../components/common/Card';

const About = () => {
    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-secondary-900 mb-6">
                        Giới thiệu về dự án
                    </h1>

                    <Card className="mb-8">
                        <h2 className="text-2xl font-heading font-semibold text-secondary-900 mb-4">
                            Cấu trúc thư mục
                        </h2>
                        <div className="bg-secondary-900 text-secondary-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                            <pre>{`src/
├── components/          # Các component tái sử dụng
│   ├── common/         # Components chung (Button, Card, Input...)
│   └── layout/         # Components layout (Header, Footer...)
├── pages/              # Các trang của ứng dụng
├── layouts/            # Layout wrappers
├── services/           # API calls và external services
│   └── api/           # API configuration
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # Constants và configurations
├── contexts/           # React Context providers
├── routes/             # Routing configuration
├── assets/             # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
└── styles/             # Global styles và Tailwind config`}</pre>
                        </div>
                    </Card>

                    <Card className="mb-8">
                        <h2 className="text-2xl font-heading font-semibold text-secondary-900 mb-4">
                            Công nghệ sử dụng
                        </h2>
                        <ul className="space-y-3 text-secondary-700">
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">✓</span>
                                <span><strong>React 18:</strong> Thư viện JavaScript để xây dựng giao diện người dùng</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">✓</span>
                                <span><strong>Tailwind CSS:</strong> Framework CSS utility-first cho styling nhanh chóng</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">✓</span>
                                <span><strong>React Router:</strong> Thư viện routing cho React applications</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">✓</span>
                                <span><strong>Context API:</strong> Quản lý state toàn cục</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">✓</span>
                                <span><strong>Axios:</strong> HTTP client để gọi API</span>
                            </li>
                        </ul>
                    </Card>

                    <Card>
                        <h2 className="text-2xl font-heading font-semibold text-secondary-900 mb-4">
                            Nguyên tắc phát triển
                        </h2>
                        <ul className="space-y-3 text-secondary-700">
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>Component-based:</strong> Chia nhỏ UI thành các components tái sử dụng</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>Separation of Concerns:</strong> Phân tách rõ ràng giữa các lớp (presentation, logic, services)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>DRY (Don't Repeat Yourself):</strong> Tránh lặp code bằng cách tạo utilities và hooks</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>Responsive Design:</strong> Giao diện tương thích với mọi kích thước màn hình</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default About;
