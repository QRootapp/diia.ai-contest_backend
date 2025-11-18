import { CreateReportDto } from './dto';
import { ReportRepository } from './report.repository';

export class ReportService {
    constructor(private readonly reportRepository: ReportRepository) {}

    public async createNewReport(createReportDto: CreateReportDto, image?: Express.Multer.File) {}
}
