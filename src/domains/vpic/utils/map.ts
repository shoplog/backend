import { SelectableLookup } from 'src/data/vpic/types/common';
import { LookupDto } from 'src/domains/vpic/services/vpic.service';

export const toLookupDto = <T extends SelectableLookup>(lookup: T): LookupDto => {
	return {
		id: Number(lookup.Id),
		name: lookup.Name,
	};
};
