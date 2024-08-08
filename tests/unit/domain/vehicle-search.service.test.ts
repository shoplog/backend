import { VehiclesSearchByVinResult } from 'src/api/types/vehicles';
import { IVinRepository, VehicleElements } from 'src/data/vpic/repositories/vin.repository';
import { VehicleSearchService } from 'src/domain/services/vehicle-search.service';

describe('VehicleSearchService', () => {
	describe('searchByVin()', () => {
		it('should return a vehicle search result', async () => {
			// arrange
			const vin = '5TEWN72N82Z891171';
			const expectedResult: VehiclesSearchByVinResult = {
				vin,
				makeId: 1,
				make: 'Toyota',
				modelId: 1,
				model: 'Tacoma',
				year: 2002,
				attributes: {
					engineModel: '5VZ-FE',
				},
			};

			const searchByVin = jest.fn(() =>
				Promise.resolve<VehicleElements>({
					SuggestedVIN: '',
					ErrorCode: '0',
					MakeId: expectedResult.makeId,
					Make: expectedResult.make,
					ModelId: expectedResult.modelId,
					Model: expectedResult.model,
					ModelYear: expectedResult.year,
					EngineModel: '5VZ-FE',
				})
			);

			const searchRepositoryMock: IVinRepository = {
				searchByVin,
			};

			const service = new VehicleSearchService(searchRepositoryMock);

			// act
			const result = await service.searchByVin(vin);

			// assert
			expect(result).toMatchObject(expectedResult);
		});
	});
});
