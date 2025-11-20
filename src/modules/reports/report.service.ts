import dayjs from 'dayjs';
import { AiClientService } from '../ai-client/ai-client.service';
import { ICarsResponse } from '../ai-client/interfaces';
import { ReportsPhotosService } from '../reports-photos/reports-photos.service';
import { CreateReportDto } from './dto';
import { EReportStatus } from './enums';
import { ICreateReport, IUpdateReport } from './interfaces';
import { ReportRepository } from './report.repository';
import { UpdateReportDto } from './dto/update-report.dto';
import { EPhotoType } from '../reports-photos/enums';
import { AppError, ValidationError } from '../../errors';

export class ReportService {
    constructor(
        private readonly reportsPhotosService: ReportsPhotosService,
        private readonly reportRepository: ReportRepository,
        private readonly aiClientService: AiClientService
    ) {}

    public async createNewReport(createReportDto: CreateReportDto, file: Express.Multer.File) {
        const photoMeta = await this.aiClientService.getPhotoMetaData(file);

        const createReportData = this.prepareCreateReportData(createReportDto);

        const recognizedData = this.getRecognizedData(photoMeta);

        const { createPhotoData, fileName } = this.reportsPhotosService.preparePhotoData(createReportDto, file, {
            ...recognizedData,
            photoType: EPhotoType.Initial,
        });

        await this.reportsPhotosService.savePhotoInStorage(file, fileName);

        const reportId = await this.reportRepository.createReportWithPhoto(createReportData, createPhotoData);

        return await this.reportRepository.getReportById(reportId);
    }

    public async updateReport(id: number, updateReportDto: UpdateReportDto, file: Express.Multer.File) {
        await this.checkReportStatus(id);

        const photoMeta = await this.aiClientService.getPhotoMetaData(file);

        const updateReportData = this.prepareUpdateReportData(updateReportDto);

        const recognizedData = this.getRecognizedData(photoMeta);

        const { createPhotoData, fileName } = this.reportsPhotosService.preparePhotoData(updateReportDto, file, {
            ...recognizedData,
            photoType: EPhotoType.Confirmation,
        });

        await this.reportsPhotosService.savePhotoInStorage(file, fileName);

        await this.reportRepository.updateReportWithPhoto(id, updateReportData, createPhotoData);

        return await this.reportRepository.getReportById(id);
    }

    public async getReportById(id: number) {
        const report = await this.reportRepository.getReportById(id);
        if (!report) throw new AppError('Report Not Found', 404);
        return report;
    }

    private prepareUpdateReportData(dto: UpdateReportDto): IUpdateReport {
        return {
            status: EReportStatus.Submitted,
            confirmation_photo_at: this.formatDate(dto.createdAt),
            submitted_at: this.formatDate(new Date()),
            duration_minutes: dto.durationMinutes,
        };
    }

    private async checkReportStatus(id: number) {
        const report = await this.reportRepository.getReportById(id);
        if (!report) throw new AppError('Report not found', 404);
        if (report.status !== EReportStatus.Draft) throw new ValidationError(['The report status does not match the operation']);
        return;
    }

    private prepareCreateReportData(dto: CreateReportDto): ICreateReport {
        return {
            status: EReportStatus.Draft,
            first_photo_at: this.formatDate(dto.createdAt),
            vehicle_license_plate: dto.vehicleLicensePlate,
            latitude: Number(dto.latitude),
            longitude: Number(dto.longitude),
            first_name: dto.firstName,
            last_name: dto.lastName,
            middle_name: dto.middleName,
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
