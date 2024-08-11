import { sql } from 'kysely';
import { VPICDatabase } from 'src/data/vpic/database';
import { DecodingOutput } from 'src/data/vpic/vpic-db';

export type VehicleElements = {
	ABS?: string | null;
	ABSId?: number | null;
	ActiveSafetySysNote?: string | null;
	AdaptiveCruiseControl?: string | null;
	AdaptiveCruiseControlId?: number | null;
	AdaptiveDrivingBeam?: string | null;
	AdaptiveDrivingBeamId?: number | null;
	AdaptiveHeadlights?: string | null;
	AdaptiveHeadlightsId?: number | null;
	AdditionalErrorText?: string | null;
	AirBagLocCurtain?: string | null;
	AirBagLocCurtainId?: number | null;
	AirBagLocFront?: string | null;
	AirBagLocFrontId?: number | null;
	AirBagLocKnee?: string | null;
	AirBagLocKneeId?: number | null;
	AirBagLocSeatCushion?: string | null;
	AirBagLocSeatCushionId?: number | null;
	AirBagLocSide?: string | null;
	AirBagLocSideId?: number | null;
	AutomaticPedestrianAlertingSound?: string | null;
	AutomaticPedestrianAlertingSoundId?: number | null;
	AutoReverseSystem?: string | null;
	AutoReverseSystemId?: number | null;
	AxleConfiguration?: string | null;
	AxleConfigurationId?: number | null;
	Axles?: number | null;
	BasePrice?: number | null;
	BatteryA?: number | null;
	BatteryA_to?: number | null;
	BatteryCells?: number | null;
	BatteryInfo?: string | null;
	BatteryKWh?: number | null;
	BatteryKWh_to?: number | null;
	BatteryModules?: number | null;
	BatteryPacks?: number | null;
	BatteryType?: string | null;
	BatteryTypeId?: number | null;
	BatteryV?: number | null;
	BatteryV_to?: number | null;
	BedLengthIN?: number | null;
	BedType?: string | null;
	BedTypeId?: number | null;
	BlindSpotIntervention?: string | null;
	BlindSpotInterventionId?: number | null;
	BlindSpotMon?: string | null;
	BlindSpotMonId?: number | null;
	BodyCabType?: string | null;
	BodyCabTypeId?: number | null;
	BodyClass?: string | null;
	BodyClassId?: number | null;
	BrakeSystemDesc?: string | null;
	BrakeSystemType?: string | null;
	BrakeSystemTypeId?: number | null;
	BusFloorConfigType?: string | null;
	BusFloorConfigTypeId?: number | null;
	BusLength?: number | null;
	BusType?: string | null;
	BusTypeId?: number | null;
	CAFEBodyType?: string | null;
	CAFEBodyTypeId?: number | null;
	CAFEMake?: string | null;
	CAFEMakeId?: number | null;
	CAFEModel?: string | null;
	CAFEModelId?: number | null;
	CAN_AACN?: string | null;
	CAN_AACNId?: number | null;
	CashForClunkers?: string | null;
	ChargerLevel?: string | null;
	ChargerLevelId?: number | null;
	ChargerPowerKW?: number | null;
	CIB?: string | null;
	CIBId?: number | null;
	CoolingType?: string | null;
	CoolingTypeId?: number | null;
	Country?: string | null;
	CountryId?: number | null;
	CurbWeightLB?: number | null;
	CustomMotorcycleType?: string | null;
	CustomMotorcycleTypeId?: number | null;
	DaytimeRunningLight?: string | null;
	DaytimeRunningLightId?: number | null;
	DestinationMarket?: string | null;
	DestinationMarketId?: number | null;
	DisplacementCC?: number | null;
	DisplacementCI?: number | null;
	DisplacementL?: number | null;
	Doors?: number | null;
	DriverAssist?: string | null;
	DriverAssistId?: number | null;
	DriveType?: string | null;
	DriveTypeId?: number | null;
	DynamicBrakeSupport?: string | null;
	DynamicBrakeSupportId?: number | null;
	EDR?: string | null;
	EDRId?: number | null;
	ElectrificationLevel?: string | null;
	ElectrificationLevelId?: number | null;
	EngineConfiguration?: string | null;
	EngineConfigurationId?: number | null;
	EngineCycles?: number | null;
	EngineCylinders?: number | null;
	EngineHP?: number | null;
	EngineHP_to?: number | null;
	EngineKW?: number | null;
	EngineManufacturer?: string | null;
	EngineModel?: string | null;
	EntertainmentSystem?: string | null;
	EntertainmentSystemId?: number | null;
	EquipmentType?: string | null;
	EquipmentTypeId?: number | null;
	ErrorCode?: string | null;
	ErrorCodeId?: number | null;
	ErrorText?: string | null;
	ESC?: string | null;
	ESCId?: number | null;
	EVDriveUnit?: string | null;
	EVDriveUnitId?: number | null;
	ForwardCollisionWarning?: string | null;
	ForwardCollisionWarningId?: number | null;
	FuelInjectionType?: string | null;
	FuelInjectionTypeId?: number | null;
	FuelTypePrimary?: string | null;
	FuelTypePrimaryId?: number | null;
	FuelTypeSecondary?: string | null;
	FuelTypeSecondaryId?: number | null;
	GCWR?: string | null;
	GCWRId?: number | null;
	GCWR_to?: string | null;
	GCWR_toId?: number | null;
	GVWR?: string | null;
	GVWRId?: number | null;
	GVWR_to?: string | null;
	GVWR_toId?: number | null;
	KeylessIgnition?: string | null;
	KeylessIgnitionId?: number | null;
	LaneCenteringAssistance?: string | null;
	LaneCenteringAssistanceId?: number | null;
	LaneDepartureWarning?: string | null;
	LaneDepartureWarningId?: number | null;
	LaneKeepSystem?: string | null;
	LaneKeepSystemId?: number | null;
	LowerBeamHeadlampLightSource?: string | null;
	LowerBeamHeadlampLightSourceId?: number | null;
	Make?: string | null;
	MakeId?: number | null;
	Manufacturer?: string | null;
	ManufacturerId?: number | null;
	ManufacturerType?: string | null;
	ManufacturerTypeId?: number | null;
	Model?: string | null;
	ModelId?: number | null;
	ModelYear?: number | null;
	MotorcycleChassisType?: string | null;
	MotorcycleChassisTypeId?: number | null;
	MotorcycleSuspensionType?: string | null;
	MotorcycleSuspensionTypeId?: number | null;
	NCAPBodyType?: string | null;
	NCAPMake?: string | null;
	NCAPModel?: string | null;
	NCICCode?: string | null;
	NCICCodeId?: number | null;
	NCSABodyType?: string | null;
	NCSABodyTypeId?: number | null;
	NCSAMake?: string | null;
	NCSAMakeId?: number | null;
	NCSAMapExcApprovedBy?: string | null;
	NCSAMapExcApprovedOn?: string | null;
	NCSAMappingException?: string | null;
	NCSAMappingExceptionId?: number | null;
	NCSAModel?: string | null;
	NCSAModelId?: number | null;
	NCSANote?: string | null;
	NonLandUse?: string | null;
	NonLandUseId?: number | null;
	Note?: string | null;
	OtherBusInfo?: string | null;
	OtherEngineInfo?: string | null;
	OtherMotorcycleInfo?: string | null;
	OtherRestraintSystemInfo?: string | null;
	OtherTrailerInfo?: string | null;
	ParkAssist?: string | null;
	ParkAssistId?: number | null;
	PedestrianAutomaticEmergencyBraking?: string | null;
	PedestrianAutomaticEmergencyBrakingId?: number | null;
	PlantCity?: string | null;
	PlantCompanyName?: string | null;
	PlantCountry?: string | null;
	PlantCountryId?: number | null;
	PlantState?: string | null;
	PossibleValues?: string | null;
	Pretensioner?: string | null;
	PretensionerId?: number | null;
	RearAutomaticEmergencyBraking?: string | null;
	RearAutomaticEmergencyBrakingId?: number | null;
	RearCrossTrafficAlert?: string | null;
	RearCrossTrafficAlertId?: number | null;
	RearVisibilitySystem?: string | null;
	RearVisibilitySystemId?: number | null;
	SAEAutomationLevel?: number | null;
	SAEAutomationLevel_to?: number | null;
	SeatBeltsAll?: string | null;
	SeatBeltsAllId?: number | null;
	SeatRows?: number | null;
	Seats?: number | null;
	SemiautomaticHeadlampBeamSwitching?: string | null;
	SemiautomaticHeadlampBeamSwitchingId?: number | null;
	Series?: string | null;
	Series2?: string | null;
	SteeringLocation?: string | null;
	SteeringLocationId?: number | null;
	SuggestedVIN?: string | null;
	TopSpeedMPH?: number | null;
	TPMS?: string | null;
	TPMSId?: number | null;
	TrackWidth?: number | null;
	TractionControl?: string | null;
	TractionControlId?: number | null;
	TrailerBodyType?: string | null;
	TrailerBodyTypeId?: number | null;
	TrailerLength?: number | null;
	TrailerType?: string | null;
	TrailerTypeId?: number | null;
	TransmissionSpeeds?: number | null;
	TransmissionStyle?: string | null;
	TransmissionStyleId?: number | null;
	Trim?: string | null;
	Trim2?: string | null;
	Turbo?: string | null;
	TurboId?: number | null;
	ValveTrainDesign?: string | null;
	ValveTrainDesignId?: number | null;
	VehicleDescriptor?: string | null;
	VehicleType?: string | null;
	VehicleTypeId?: number | null;
	WheelBaseLong?: number | null;
	WheelBaseShort?: number | null;
	WheelBaseType?: string | null;
	WheelBaseTypeId?: number | null;
	Wheels?: number | null;
	WheelSizeFront?: number | null;
	WheelSizeRear?: number | null;
	Windows?: number | null;
};

export interface IVinRepository {
	vinDecode(vin: string): Promise<VehicleElements>;
}

export class VinRepository implements IVinRepository {
	constructor(readonly db: VPICDatabase) {}

	async vinDecode(vin: string): Promise<VehicleElements> {
		const { rows: data } = await sql<DecodingOutput>`EXEC spVinDecode ${vin}`.execute(this.db);
		const result: VehicleElements = data.reduce(
			(acc: { [code: string]: string | number | null }, cur: DecodingOutput) => {
				const key = cur.Code as keyof VehicleElements;
				if (cur.DataType == 'string') {
					acc[key] = cur.Value;
				} else if (cur.DataType == 'int' || cur.DataType == 'decimal') {
					acc[key] = cur.Value ? Number(cur.Value) : null;
				} else {
					const keyId = `${cur.Code}Id` as keyof VehicleElements;
					acc[key] = cur.Value;
					acc[keyId] = cur.AttributeId ? Number(cur.AttributeId) : null;
				}

				return acc;
			},
			{}
		);

		return result;
	}
}
