/*
 * @Author: 卢天宇
 * @Date: 2024-04-29 17:38:55
 * @Description: eslint配置文件
 */
import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  prettierConfig,
  {
    name: 'customer',
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      'prettier/prettier': 'error',
      'no-case-declarations': 'off',
      'no-constant-condition': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn'
    },
    plugins: {
      prettier
    }
  }
];
