import { NextFunction, Request, Response } from 'express';
import { CreateReportDto } from './dto';
import { ReportService } from './report.service';
import { ValidationError } from '../../errors';
import { UpdateReportDto } from './dto/update-report.dto';

export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    public async createNewReport(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                throw new ValidationError(['Image required']);
            }

            const body: CreateReportDto = req.body;
            const result = await this.reportService.createNewReport(body, req.file);

            res.status(201).send(result);
        } catch (err) {
            next(err);
        }
    }

    public async updateReport(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            console.log('req.file :>> ', req.file);
            if (!req.file) {
                throw new ValidationError(['Image required']);
            }

            if (!id) {
                throw new ValidationError(['ID required']);
            }

            const body: UpdateReportDto = req.body;
            const result = await this.reportService.updateReport(+id, body, req.file);

            res.status(201).send(result);
        } catch (err) {
            next(err);
        }
    }
}
