import dayjs from 'dayjs';
import { CreateReportDto } from '../reports/dto';
import { S3UploaderService } from '../s3-uploader/s3-uploader.service';
import { EPhotoType } from './enums';
import { ICreateReportPhoto } from './interfaces/create-report-photo.intarface';
import { ReportsPhotosRepository } from './reports-photos.repository';
import { v4 as uuidv4 } from 'uuid';
import { IRecognizedData } from './interfaces';
import { UpdateReportDto } from '../reports/dto/update-report.dto';

export class ReportsPhotosService {
    private readonly region: string;
    private readonly bucket: string;

    constructor(private readonly s3UploaderService: S3UploaderService, private readonly reportsPhotosRepository: ReportsPhotosRepository) {
        this.region = process.env.AWS_REGION!;
        this.bucket = process.env.AWS_BUCKET!;
    }

    public async savePhotoInStorage(file: Express.Multer.File, fileName: string) {
        await this.s3UploaderService.uploadFile(file, fileName);
    }

    public preparePhotoData(
        dto: CreateReportDto | UpdateReportDto,
        file: Express.Multer.File,
        params: IRecognizedData
    ): { createPhotoData: ICreateReportPhoto; fileName: string } {
        const { recognizedPlate, ocrConfidence, photoType } = params;
        const fileFormat = this.getFileFormat(file);
        const fileName = this.generateFileName(fileFormat);
        const photoUrl = this.buildPhotoUrl(fileName);

        const takenAt = dayjs(dto.createdAt).format('YYYY-MM-DD HH:mm:ss');

        return {
            createPhotoData: {
                latitude: Number(dto.latitude),
                longitude: Number(dto.longitude),
                taken_at: takenAt,
                photo_type: photoType,
                photo_url: photoUrl,
                recognized_plate: recognizedPlate,
                ocr_confidence: ocrConfidence,
            },
            fileName,
        };
    }

    private getFileFormat(file: Express.Multer.File) {
        return file.mimetype.split('/')[1]!;
    }

    private generateFileName(ext: string) {
        return `${uuidv4()}.${ext}`;
    }

    private buildPhotoUrl(fileName: string) {
        return `https://s3.${this.region}.amazonaws.com/${this.bucket}/${fileName}`;
    }
}
