import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '*.config.js', '*.config.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Tắt báo lỗi unused variables
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      // Tắt báo lỗi unused imports (nếu có)
      '@typescript-eslint/no-unused-expressions': 'off',

      // Cho phép any type (tùy chọn, có thể bật lại nếu cần strict)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Cho phép empty functions
      '@typescript-eslint/no-empty-function': 'off',

      // React Refresh - chỉ export components
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Các rule hữu ích khác
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
])
