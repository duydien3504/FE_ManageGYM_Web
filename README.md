# React + Tailwind CSS Project

Dự án Frontend website được xây dựng với **React.js** và **Tailwind CSS**, có cấu trúc thư mục chuẩn với phân lớp rõ ràng.

## 📋 Yêu cầu hệ thống

- Node.js >= 14.0.0
- npm >= 6.0.0

## 🚀 Cài đặt và chạy dự án

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm start
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

### 3. Build production

```bash
npm run build
```

### 4. Chạy tests

```bash
npm test
```

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── common/         # Components chung (Button, Card, Input...)
│   └── layout/         # Components layout (Header, Footer...)
├── pages/              # Các trang của ứng dụng
│   ├── Home/          # Trang chủ
│   ├── About/         # Trang giới thiệu
│   └── NotFound/      # Trang 404
├── layouts/            # Layout wrappers
│   └── MainLayout.jsx # Layout chính
├── services/           # API calls và external services
│   └── api/           # API configuration
│       └── axios.config.js
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js
│   └── useFetch.js
├── utils/              # Utility functions
│   ├── helpers.js     # Helper functions
│   └── validators.js  # Validation functions
├── constants/          # Constants và configurations
│   ├── routes.js      # Route constants
│   └── config.js      # App configuration
├── contexts/           # React Context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── routes/             # Routing configuration
│   └── index.jsx
├── assets/             # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
└── styles/             # Global styles
    └── index.css      # Tailwind directives
```

## 🎨 Công nghệ sử dụng

- **React 18** - Thư viện JavaScript để xây dựng UI
- **Tailwind CSS 3** - Framework CSS utility-first
- **React Router 6** - Routing cho React applications
- **Axios** - HTTP client để gọi API
- **Context API** - Quản lý state toàn cục

## 📝 Scripts có sẵn

- `npm start` - Chạy development server
- `npm run build` - Build production
- `npm test` - Chạy tests
- `npm run eject` - Eject từ Create React App (không thể hoàn tác)

## 🏗️ Nguyên tắc phát triển

### Component-based Architecture
Chia nhỏ UI thành các components tái sử dụng, mỗi component có một trách nhiệm rõ ràng.

### Separation of Concerns
- **Components**: Chỉ chứa UI logic
- **Pages**: Kết hợp components và business logic
- **Services**: Xử lý API calls
- **Utils**: Helper functions và utilities
- **Hooks**: Custom React hooks cho logic tái sử dụng

### Naming Conventions
- **Components**: PascalCase (VD: `Button.jsx`, `UserCard.jsx`)
- **Utilities**: camelCase (VD: `formatDate.js`, `validators.js`)
- **Constants**: UPPER_SNAKE_CASE (VD: `API_URL`, `MAX_LENGTH`)

## 🎯 Tính năng chính

- ✅ Responsive design (mobile-first)
- ✅ Dark mode support (ThemeContext)
- ✅ Authentication flow (AuthContext)
- ✅ API integration với Axios
- ✅ Custom hooks (useLocalStorage, useFetch)
- ✅ Routing với React Router
- ✅ Tailwind CSS utilities và custom components

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cấu hình các biến môi trường:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Tailwind Configuration

Xem file `tailwind.config.js` để tùy chỉnh:
- Colors
- Fonts
- Spacing
- Breakpoints
- Plugins

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)

## 👥 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo pull request hoặc issue.

## 📄 License

MIT License
