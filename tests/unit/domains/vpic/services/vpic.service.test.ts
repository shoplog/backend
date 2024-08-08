import { IVinRepository, VehicleElements } from 'src/data/vpic/repositories/vin.repository';
import { IYearRepository } from 'src/data/vpic/repositories/year.repository';
import { SearchByVinResultDto, VPICService } from 'src/domains/vpic/services/vpic.service';

describe('VPICService', () => {
	describe('searchByVin()', () => {
		it('should return a vehicle search result', async () => {
			// arrange
			const vin = '5TEWN72N82Z891171';
			const expectedResult: SearchByVinResultDto = {
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
				vinDecode: searchByVin,
			};

			const yearRepositoryMock: IYearRepository = {
				getAllYears: jest.fn(),
			};

			const service = new VPICService(searchRepositoryMock, yearRepositoryMock);

			// act
			const result = await service.searchByVin(vin);

			// assert
			expect(result).toMatchObject(expectedResult);
		});
	});

	describe('getAllSupportedYears()', () => {
		it('should return a list of vehicle years', async () => {
			// arrange
			const expectedYears = [2000, 2001, 2002];

			const getAllYears = jest.fn(() => Promise.resolve(expectedYears));

			const searchRepositoryMock: IVinRepository = {
				vinDecode: jest.fn(),
			};

			const yearRepositoryMock: IYearRepository = {
				getAllYears,
			};

			const service = new VPICService(searchRepositoryMock, yearRepositoryMock);

			// act
			const result = await service.getAllSupportedYears();

			// assert
			expect(result).toEqual(expectedYears);
		});
	});
});
