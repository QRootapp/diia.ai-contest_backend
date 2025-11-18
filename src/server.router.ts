import { Router } from 'express';
import { ReportRouter } from './modules/reports/report.router';

const AppRouter = Router();

AppRouter.use('/reports', ReportRouter);

export { AppRouter };
