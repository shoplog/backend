const config = {
	transform: {
		'^.+\\.ts$': '@swc/jest',
	},
	runtime: '@side/jest-runtime',
};

export default config;
