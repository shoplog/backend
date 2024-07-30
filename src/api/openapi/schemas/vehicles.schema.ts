import { Type } from '@sinclair/typebox';
import { FixedInteger } from 'src/api/openapi/schemas/common.schema';

export const VinSchema = Type.String({ format: 'vin', minLength: 17, maxLength: 17 });
export const VehiclesSearchByVinResponseBodySchema = Type.Object({
	VIN: VinSchema,
	suggestedVIN: Type.Optional(VinSchema),
	makeId: FixedInteger(),
	make: Type.String(),
	modelId: FixedInteger(),
	model: Type.String(),
	year: FixedInteger(),
	attributes: Type.Optional(
		Type.Record(Type.String(), Type.Union([Type.String(), Type.Number(), FixedInteger(), Type.Boolean()]))
	),
});
