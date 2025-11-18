import { Router } from 'express';
import { buildReportModule } from './modules/reports';
import dbInstanse from './database';

const AppRouter = Router();

const reportModule = buildReportModule(dbInstanse);

AppRouter.use('/reports', reportModule.router);

export { AppRouter };
