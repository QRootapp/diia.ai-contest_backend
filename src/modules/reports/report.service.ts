import { ReportsPhotosService } from '../reports-photos/reports-photos.service';
import { CreateReportDto } from './dto';
import { ReportRepository } from './report.repository';

export class ReportService {
    constructor(private readonly reportsPhotosService: ReportsPhotosService, private readonly reportRepository: ReportRepository) {}

    public async createNewReport(createReportDto: CreateReportDto, image?: Express.Multer.File) {}
}
