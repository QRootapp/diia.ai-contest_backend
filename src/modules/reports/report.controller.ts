import { NextFunction, Request, Response } from 'express';
import { CreateReportDto } from './dto';
import { ReportService } from './report.service';

export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    public test(req: Request, res: Response) {
        res.status(200).send({ message: 'Hello world' });
    }

    public async createNewReport(req: Request, res: Response, next: NextFunction) {
        try {
            const image = req.image;
            const body: CreateReportDto = req.body;
            const result = await this.reportService.createNewReport(body, image);
            res.status(201).send(result);
        } catch (err) {
            next(err);
        }
    }
}
