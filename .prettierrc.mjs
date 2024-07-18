/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	trailingComma: 'es5',
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	useTabs: true,
	printWidth: 120,
	importOrder: ['^@src/api/(.*)$', '^@src/domain/(.*)$', '^@src/data/(.*)$', '^@src/common/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: ['@trivago/prettier-plugin-sort-imports'],
};

export default config;
