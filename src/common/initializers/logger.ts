import pino, { Logger, LoggerOptions } from 'pino';
import { CONFIG } from 'src/common/config/env';

const createLogger = (options: LoggerOptions): Logger => {
	if (!options.level) {
		options.level = 'info';
	}

	return pino(options);
};

const { level, printPretty } = CONFIG.logging;
const loggerOptions: LoggerOptions = {
	level,
};

if (printPretty) {
	loggerOptions.transport = {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	};
}

export const logger = createLogger(loggerOptions);
