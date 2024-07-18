import { StringOptions, Type } from '@sinclair/typebox';

export const StringAsNumber = (options?: StringOptions) =>
	Type.Transform(Type.String(options))
		.Decode((value) => Number(value))
		.Encode((value) => value.toString());

export const StringAsBoolean = (options?: StringOptions) =>
	Type.Transform(Type.String(options))
		.Decode((value) => value?.toLowerCase() === 'true')
		.Encode((value) => value.toString());
