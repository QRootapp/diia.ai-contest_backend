import { Router } from 'express';
import { ReportController } from './report.controller';
import { upload } from '../../middlewares/multer.middleware';
import { validateUpdateReport, validateCreateReport, validateGetReportById } from './validators';

export const ReportRouter = (controller: ReportController) => {
    const router = Router();

    router.post('/', upload.single('file'), validateCreateReport, controller.createNewReport.bind(controller));

    router.patch('/:id', upload.single('file'), validateUpdateReport, controller.updateReport.bind(controller));

    router.get('/:id', validateGetReportById, controller.getReportById.bind(controller));

    router.get('/', controller.getReports.bind(controller));

    router.post('/check-plate', upload.single('file'), controller.getPlate.bind(controller));

    return router;
};
