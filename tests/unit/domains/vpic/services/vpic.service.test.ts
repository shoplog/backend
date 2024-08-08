import { IMakeRepository } from 'src/data/vpic/repositories/make.repository';
import { IVinRepository, VehicleElements } from 'src/data/vpic/repositories/vin.repository';
import { IYearRepository } from 'src/data/vpic/repositories/year.repository';
import { SelectableLookup } from 'src/data/vpic/types/common';
import { LookupDto, SearchByVinResultDto, VPICService } from 'src/domains/vpic/services/vpic.service';

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

			const vinRepositoryMock: IVinRepository = {
				vinDecode: searchByVin,
			};

			const yearRepositoryMock: IYearRepository = {
				getAllYears: jest.fn(),
			};

			const makeRepositoryMock: IMakeRepository = {
				getMakesByYear: jest.fn(),
			};

			const service = new VPICService(vinRepositoryMock, yearRepositoryMock, makeRepositoryMock);

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

			const vinRepositoryMock: IVinRepository = {
				vinDecode: jest.fn(),
			};

			const yearRepositoryMock: IYearRepository = {
				getAllYears,
			};

			const makeRepositoryMock: IMakeRepository = {
				getMakesByYear: jest.fn(),
			};

			const service = new VPICService(vinRepositoryMock, yearRepositoryMock, makeRepositoryMock);

			// act
			const result = await service.getAllSupportedYears();

			// assert
			expect(result).toEqual(expectedYears);
		});
	});

	describe('getMakesByYear()', () => {
		it('should return makes by year', async () => {
			// arrange
			const expectedMakes: LookupDto[] = [
				{
					id: 1,
					name: 'Toyota',
				},
				{
					id: 2,
					name: 'Lexus',
				},
			];

			const getMakesByYear = jest.fn(() =>
				Promise.resolve<SelectableLookup[]>([
					{
						Id: 1,
						Name: 'Toyota',
					},
					{
						Id: 2,
						Name: 'Lexus',
					},
				])
			);
			const vinRepositoryMock: IVinRepository = {
				vinDecode: jest.fn(),
			};

			const yearRepositoryMock: IYearRepository = {
				getAllYears: jest.fn(),
			};

			const makeRepositoryMock: IMakeRepository = { getMakesByYear };
			const service = new VPICService(vinRepositoryMock, yearRepositoryMock, makeRepositoryMock);

			// act
			const result = await service.getMakesByYear(2002);

			// assert
			expect(result).toMatchObject(expectedMakes);
		});
	});
});
