// Fix for exclusiveMinimum and exclusiveMaximum not being boolean
// https://github.com/tiangolo/fastapi/issues/240
import { Kind, SchemaOptions, TSchema } from '@sinclair/typebox';

export interface FixedIntegerOptions extends SchemaOptions {
	maximum?: number;
	minimum?: number;
	multipleOf?: number;
}

export interface TFixedInteger extends TSchema, FixedIntegerOptions {
	[Kind]: 'Integer';
	static: number;
	type: 'integer';
}

export function FixedInteger(options: FixedIntegerOptions = {}): TFixedInteger {
	return {
		...options,
		[Kind]: 'Integer',
		type: 'integer',
	} as never;
}
