import { Router } from 'express';
import { ReportController } from './report.controler';

const reportController = new ReportController();

const ReportRouter = Router();

ReportRouter.get('/', reportController.test.bind(reportController));

export { ReportRouter };
