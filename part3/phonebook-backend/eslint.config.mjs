import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['dist/**'],
  },
  eslint.configs.recommended,
  // { files: ['**/*.mjs'], languageOptions: { sourceType: 'module' } },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    rules: {
      // Style / maintainability
      'no-console': 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // Prefer modern JavaScript
      'prefer-const': 'error',
      'no-var': 'error',

      // Common mistakes
      eqeqeq: ['error', 'always'],
      'no-throw-literal': 'error',
    },
  },
  prettier,
]);
