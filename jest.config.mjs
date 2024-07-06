const config = {
	transform: {
		'^.+\\.ts$': '@swc/jest',
	},
	runtime: '@side/jest-runtime',
	setupFilesAfterEnv: ['jest-extended/all'],
};

export default config;
