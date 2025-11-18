import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRouter } from './report.router';
import { Knex } from 'knex';

export function buildReportModule(db: Knex) {
    const repo = new ReportRepository(db);
    const service = new ReportService(repo);
    const controller = new ReportController(service);
    const router = ReportRouter(controller);

    return {
        repo,
        service,
        controller,
        router,
    };
}
