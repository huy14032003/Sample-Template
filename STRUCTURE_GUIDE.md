# Project Structure Guide

## 📁 Cấu trúc thư mục

```
src/
├── features/           # Feature modules (business logic)
│   ├── auth/           # Auth feature
│   │   ├── components/ # UI riêng của auth
│   │   ├── hooks/      # Hooks riêng của auth
│   │   ├── services/   # API riêng của auth
│   │   ├── types/      # Types riêng của auth
│   │   └── index.ts    # Barrel export
│   └── dashboard/      # Dashboard feature
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
│
├── pages/              # Route entry points
│   ├── auth/
│   ├── home/
│   └── dashboard/
│
├── components/         # Shared UI components (Button, Modal...)
├── stores/             # Redux store + slices
├── services/           # Base API config
├── hooks/              # Shared hooks (useDebounce...)
├── types/              # Shared types (ApiResponse...)
├── utils/              # Shared utilities
├── constants/          # App constants
└── configs/            # Configurations
```

---

## 🎯 Quy tắc đặt code

| Code thuộc về... | Đặt ở đâu |
|------------------|-----------|
| Chỉ 1 feature dùng | `features/[feature-name]/` |
| Nhiều features dùng | Root folders (`hooks/`, `types/`, `utils/`...) |
| Route entry point | `pages/` |

---

## 📦 Barrel Export (`index.ts`)

### Mục đích
- Cho phép import ngắn gọn từ folder
- Che giấu cấu trúc bên trong

### Ví dụ
```typescript
// Không có index.ts
import DashboardFeature from "@/features/dashboard/DashboardFeature"

// Có index.ts
import { DashboardFeature } from "@/features/dashboard"
```

### Quy tắc import
- **Bên trong feature**: Import trực tiếp từ file (tránh circular dependency)
- **Bên ngoài feature**: Import qua `index.ts`

---

## 🔄 Flow tạo Feature mới

### 1. Tạo folder structure
```
features/[feature-name]/
├── components/     # UI components
├── hooks/          # Custom hooks
├── services/       # API endpoints
├── types/          # TypeScript types
├── [Feature].tsx   # Main component
└── index.ts        # Barrel export
```

### 2. Tạo types
```typescript
// features/user/types/user.types.ts
export interface User {
  id: string;
  name: string;
}
```

### 3. Tạo API service
```typescript
// features/user/services/user.api.ts
import { authApiService } from '@/stores/api/baseApi'

export const userApi = authApiService.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => '/users' }),
  }),
})

export const { useGetUsersQuery } = userApi
```

### 4. Tạo hook
```typescript
// features/user/hooks/useUser.ts
import { useGetUsersQuery } from '../services/user.api'

export const useUser = () => {
  const { data, isLoading } = useGetUsersQuery()
  return { users: data, isLoading }
}
```

### 5. Tạo feature component
```typescript
// features/user/UserFeature.tsx
import { useUser } from './hooks/useUser'

const UserFeature = () => {
  const { users, isLoading } = useUser()
  return <div>...</div>
}

export default UserFeature
```

### 6. Tạo barrel export
```typescript
// features/user/index.ts
export * from './types/user.types'
export * from './services/user.api'
export { useUser } from './hooks/useUser'
export { default as UserFeature } from './UserFeature'
```

### 7. Tạo page
```typescript
// pages/user/UserPage.tsx
import { UserFeature } from '@/features/user'

const UserPage = () => {
  return <UserFeature />
}

export default UserPage
```

### 8. Thêm route
```typescript
// route.tsx
import UserPage from '@pages/user/UserPage'

const user = {
  path: '/user',
  children: [{ index: true, element: createElement(UserPage) }]
}
```

---

## ❓ FAQ

### Pages vs Features?
- **Pages**: Route entry points, chỉ chứa layout
- **Features**: Business logic, hooks, API, components riêng

### Khi nào tạo feature mới?
- Khi có business logic riêng
- Có API endpoints riêng
- Có state riêng
- Có components riêng (không dùng chung)

### index.ts có bắt buộc?
- Có, nếu muốn import ngắn gọn từ folder
- `index.ts` là convention của JavaScript để auto-resolve khi import folder
