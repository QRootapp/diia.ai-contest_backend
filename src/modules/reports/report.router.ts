import { Router } from 'express';
import { ReportController } from './report.controller';
import { upload } from '../../middlewares/multer.middleware';
import { validateUpdateReport, validateCreateReport } from './validators';

export const ReportRouter = (controller: ReportController) => {
    const router = Router();

    router.post('/', upload.single('file'), validateCreateReport, controller.createNewReport.bind(controller));

    router.patch('/:id', upload.single('file'), validateUpdateReport, controller.updateReport.bind(controller));

    return router;
};
