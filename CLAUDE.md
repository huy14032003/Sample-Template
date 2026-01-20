# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (default port 3000, configurable via VITE_PORT)
npm run build    # TypeScript check + Vite build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture Overview

This is a React 19 + TypeScript merchant admin application using Vite (rolldown-vite) with the following key patterns:

### Feature-Based Structure

Code is organized by feature modules in `src/features/`. Each feature contains:
- `components/` - Feature-specific UI components
- `hooks/` - Custom hooks
- `services/` - RTK Query API endpoints (inject into base APIs)
- `types/` - TypeScript interfaces
- `schemas/` - Zod validation schemas
- `index.ts` - Barrel exports

**Import rules:**
- Inside a feature: Import directly from files (avoid circular deps)
- Outside a feature: Import through `index.ts` barrel

### Pages vs Features

- **Pages** (`src/pages/`): Route entry points containing layout only
- **Features** (`src/features/`): Business logic, API calls, and feature-specific components

### State Management (RTK Query + Redux)

Multiple API services exist for different backends:
- `authApiService` - Authentication API (`VITE_API_LOGIN`)
- `apiFeeService` - Fee management API (`VITE_FEE_API_URL`)
- `merchantApiService` - Merchant API (`VITE_API_MERCHANR`)

To add API endpoints to a feature, inject into the appropriate service:
```typescript
import { authApiService } from '@/stores/api/baseApi'

export const featureApi = authApiService.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({ query: () => '/endpoint' }),
  }),
})
```

Redux slices: `authSlice`, `themeSlice`, `loadingSlice`

### Authentication Flow

- JWT tokens stored in cookies (`ACCESS_TOKEN`, `REFRESH_TOKEN`)
- Automatic token refresh on 401 via `fetchBaseQueryCustom` wrapper
- Force logout clears cookies and redirects to `/auth/login`

### Routing

Routes defined in `src/route.tsx` using `react-router-dom`. Route constants in `src/constants/route.constant.ts`.

Permission-based access controlled via `src/configs/permission.config.ts` mapping routes to required permissions.

### Path Aliases

```
@/          -> src/
@components -> src/components
@pages      -> src/pages
@features   -> src/features
@hooks      -> src/hooks
@utils      -> src/utils
@services   -> src/services
@types      -> src/types
@constants  -> src/constants
@assets     -> src/assets
```

### UI Components

- Shared components in `src/components/ui/` (shadcn/radix-based)
- Ant Design wrapped components in `src/components/ui/antd/`
- Form components with react-hook-form + Zod in `src/components/ui/antd/form/`

### Environment Variables

Required in `.env`:
- `VITE_API_LOGIN` - Auth service URL
- `VITE_FEE_API_URL` - Fee service URL
- `VITE_API_MERCHANR` - Merchant service URL
- `VITE_PORT` - Dev server port (optional, default 3000)
