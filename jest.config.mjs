const config = {
	transform: {
		'^.+\\.ts$': '@swc/jest',
	},
	runtime: '@side/jest-runtime',
	setupFilesAfterEnv: ['./tests/setup.ts', 'jest-extended/all'],
};

export default config;
