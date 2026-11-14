import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginCypress from 'eslint-plugin-cypress';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'coverage/**',
      'public/**',
      'next-env.d.ts',
      'eslint.config.mjs',
      'next.config.js',
      'postcss.config.js',
      'tailwind.config.js',
      'prettier.config.js',
      'jest.config.js',
      'jest.setup.js',
      'next-i18next.config.js',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierRecommended,
  {
    rules: {
      // React 19's eslint-plugin-react-hooks introduced this rule. It flags the
      // pre-existing pattern of syncing state from the router inside an effect
      // (src/pages/commands.tsx). Surface it as a warning instead of failing CI.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    ...pluginCypress.configs.recommended,
    files: ['cypress/**/*.{ts,tsx}', 'cypress.config.ts'],
    rules: {
      ...pluginCypress.configs.recommended.rules,
      '@typescript-eslint/no-namespace': 'off',
    },
  },
];

export default config;
