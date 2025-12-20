import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ROUTES } from '../../constants/routes';

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-9xl font-heading font-bold text-gradient mb-4">404</h1>
                <h2 className="text-3xl font-heading font-semibold text-secondary-900 mb-4">
                    Trang không tồn tại
                </h2>
                <p className="text-lg text-secondary-600 mb-8">
                    Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                </p>
                <Link to={ROUTES.HOME}>
                    <Button variant="primary" size="lg">
                        Về trang chủ
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
