import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRouter } from './report.router';
import { Knex } from 'knex';
import { ReportsPhotosRepository } from '../reports-photos/reports-photos.repository';
import { ReportsPhotosService } from '../reports-photos/reports-photos.service';
import { S3UploaderService } from '../s3-uploader/s3-uploader.service';
import { AiClientService } from '../ai-client/ai-client.service';

export function buildReportModule(db: Knex) {
    const reportsRepository = new ReportRepository(db);
    const reportsPhotosRepository = new ReportsPhotosRepository(db);

    const s3UploaderService = new S3UploaderService();

    const aiClientService = new AiClientService();
    const reportsPhotosService = new ReportsPhotosService(s3UploaderService, reportsPhotosRepository);
    const reportsService = new ReportService(reportsPhotosService, reportsRepository, aiClientService);

    const controller = new ReportController(reportsService);
    const router = ReportRouter(controller);

    return {
        router,
    };
}
