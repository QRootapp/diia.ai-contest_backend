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
            const id = req.params.id!;
            if (!req.file) {
                throw new ValidationError(['Image required']);
            }

            const body: UpdateReportDto = req.body;
            const result = await this.reportService.updateReport(+id, body, req.file);

            res.status(201).send(result);
        } catch (err) {
            next(err);
        }
    }

    public async getReportById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id!;

            const result = await this.reportService.getReportById(+id);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }

    public async getReports(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = '1', limit = '10' } = req.query;
            const result = await this.reportService.getReports(+page, +limit);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }

    public async getPlate(req: Request, res: Response, next: NextFunction) {
        try {
            const file = req.file;
            if (!file) throw new ValidationError(['Image required']);
            const result = await this.reportService.getPlate(file);
            res.status(201).send(result);
        } catch (err) {
            next(err);
        }
    }
}
