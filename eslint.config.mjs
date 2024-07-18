import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
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
