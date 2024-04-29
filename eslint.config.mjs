import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
	{ languageOptions: { globals: { ...globals.node, ...globals.browser } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		name: 'customer',
		rules: {
			'prettier/prettier': 'error',
			'no-case-declarations': 'off',
			'no-constant-condition': 'off',
			'@typescript-eslint/ban-ts-comment': 'off'
		},
		plugins: {
			prettier
		}
	}
];
