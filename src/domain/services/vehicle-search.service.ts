export type VehicleSearchByVinResultDto = {
	vin?: string;
	suggestedVin?: string;
	makeId?: number;
	make?: string;
	modelId?: number;
	model?: string;
	year?: number;
	attributes?: {
		[key: string]: string | number;
	};
};

export interface IVehicleSearchService {
	searchByVin(vin: string): Promise<VehicleSearchByVinResultDto | undefined>;
}
