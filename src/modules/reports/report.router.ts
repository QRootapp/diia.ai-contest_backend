import { Router } from 'express';
import { ReportController } from './report.controller';
import { validateCreateReport } from './validators/create-report.validator';
import { upload } from '../../middlewares/multer.middleware';

export const ReportRouter = (controller: ReportController) => {
    const router = Router();

    router.post('/', upload.single('file'), validateCreateReport, controller.createNewReport.bind(controller));

    return router;
};
