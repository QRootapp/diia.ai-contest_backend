import dayjs from 'dayjs';
import { AiClientService } from '../ai-client/ai-client.service';
import { ICarsResponse } from '../ai-client/interfaces';
import { ReportsPhotosService } from '../reports-photos/reports-photos.service';
import { CreateReportDto } from './dto';
import { EReportStatus } from './enums';
import { ICreateReport } from './interfaces';
import { ReportRepository } from './report.repository';

export class ReportService {
    constructor(
        private readonly reportsPhotosService: ReportsPhotosService,
        private readonly reportRepository: ReportRepository,
        private readonly aiClientService: AiClientService
    ) {}

    public async createNewReport(createReportDto: CreateReportDto, file: Express.Multer.File) {
        const photoMeta = await this.aiClientService.getPhotoMetaData(file);

        const createReportData = this.prepareReportData(createReportDto, photoMeta);

        const recognizedData = this.getRecognizedData(photoMeta);

        const { createPhotoData, fileName } = this.reportsPhotosService.preparePhotoData(createReportDto, file, recognizedData);

        await this.reportsPhotosService.savePhotoInStorage(file, fileName);

        const reportId = await this.reportRepository.createReportWithPhoto(createReportData, createPhotoData);
        return this.reportRepository.getReportById(reportId);
    }

    private prepareReportData(dto: CreateReportDto, photoMeta: ICarsResponse): ICreateReport {
        const plate = photoMeta.cars[0]?.plate ?? '';

        return {
            status: EReportStatus.Draft,
            first_photo_at: this.formatDate(dto.createdAt),
            vehicle_license_plate: plate,
            latitude: Number(dto.latitude),
            longitude: Number(dto.longitude),
        };
    }

    private formatDate(date: Date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }

    private getRecognizedData(photoMeta: ICarsResponse) {
        return {
            recognizedPlate: photoMeta.cars[0]?.plate || '',
            ocrConfidence: photoMeta.cars[0]?.confidence || 0,
        };
    }
}
