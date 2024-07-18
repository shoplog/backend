import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	importX.configs.typescript,
	{ plugins: { 'import-x': importX } },
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn', // or "error"
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'sort-imports': [
				'error',
				{
					ignoreCase: false,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
					allowSeparatedGroups: true,
				},
			],
		},
	},
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.commonjs,
				...globals.node,
				...globals.jest,
			},
		},
	},
	{
		files: ['**/*.ts', '**/*.js'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
];
