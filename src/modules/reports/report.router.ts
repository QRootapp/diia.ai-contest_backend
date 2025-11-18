import { Router } from 'express';
import { ReportController } from './report.controller';
import { validateCreateReport } from './validators/create-report.validator';

export const ReportRouter = (controller: ReportController) => {
    const router = Router();

    router.get('/', controller.test.bind(controller));
    router.post('/', validateCreateReport, controller.createNewReport.bind(controller));

    return router;
};
