import { Router } from 'express';
import { SCOPES } from 'src/api/constants/scopes';
import { IMaintenanceLogsController } from 'src/api/controllers/maintenance-logs.controller';
import { checkJwt, checkScopes, contextWrapMiddleware } from 'src/api/middlewares';

export const createMaintenanceLogsRoutes = async (maintenanceLogsController: IMaintenanceLogsController) => {
	const router = Router();
	router.use(checkJwt);
	router.use(checkScopes(SCOPES.VPIC_READ));
	router.get(
		'/maintenance-logs/:vehicleId',
		contextWrapMiddleware(maintenanceLogsController.getMaintenanceLogsByVehicleId.bind(maintenanceLogsController))
	);
	router.post(
		'/maintenance-logs/:vehicleId',
		contextWrapMiddleware(maintenanceLogsController.createMaintenanceLog.bind(maintenanceLogsController))
	);

	return router;
};
