import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default defineConfig(
  {
    ignores: [
      '.git/',
      '.husky/',
      '.next/',
      'public/',
      '.github/',
      '.github/**/*.yml',
      'next-env.d.ts',
      '**/node_modules/',
      '*.config.mjs',
      '*.config.ts'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {},
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  }
);
