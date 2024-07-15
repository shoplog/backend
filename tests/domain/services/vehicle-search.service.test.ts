import { VehicleSearchResult, VehicleSearchService } from 'src/domain/services/vehicle-search.service';
import { VehicleSearchRepository } from 'src/data/vpic/repositories/vehicle-search.repository';
import { mock } from 'jest-mock-extended';

describe(VehicleSearchService.name, () => {
	let service: VehicleSearchService;
	const repository = mock<VehicleSearchRepository>();

	beforeAll(() => {
		service = new VehicleSearchService(repository);
	});

	describe(VehicleSearchService.prototype.searchByVin.name, () => {
		beforeEach(() => {
			repository.searchByVin.mockClear();
		});

		// it('should return vehicle search result', async () => {
		// 	// arrange
		// 	repository.searchByVin.mockReturnValue(
		// 		Promise.resolve({
		// 			SuggestedVin: null,
		// 			ErrorCode: '0',
		// 			ErrorText: '0 - VIN decoded clean. Check Digit (9th position) is correct',
		// 		})
		// 	);

		// 	const expectedResult: VehicleSearchResult = {
		// 		SuggestedVin: null,
		// 		ErrorCode: null,
		// 		ErrorText: null,
		// 	};

		// 	// act
		// 	const result = await service.searchByVin('vin');

		// 	// assert
		// 	expect(result).toMatchObject(expectedResult);
		// });

		// it('should return error when vin decode returns error', async () => {
		// 	// arrange
		// 	repository.searchByVin.mockReturnValue(
		// 		Promise.resolve({
		// 			SuggestedVin: null,
		// 			ErrorCode: '1',
		// 			ErrorText: '1 - Check Digit (9th position) does not calculate properly',
		// 		})
		// 	);

		// 	const expectedResult: VehicleSearchResult = {
		// 		SuggestedVin: null,
		// 		ErrorCode: '1',
		// 		ErrorText: 'Check Digit (9th position) does not calculate properly',
		// 	};

		// 	// act
		// 	const result = await service.searchByVin('vin');

		// 	// assert
		// 	expect(result).toMatchObject(expectedResult);
		// });
	});
});
