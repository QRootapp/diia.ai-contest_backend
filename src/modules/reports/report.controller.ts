import { NextFunction, Request, Response } from 'express';
import { CreateReportDto } from './dto';
import { ReportService } from './report.service';
import { ValidationError } from '../../errors';

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
}
