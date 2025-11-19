import { S3UploaderService } from '../s3-uploader/s3-uploader.service';
import { ReportsPhotosRepository } from './reports-photos.repository';

export class ReportsPhotosService {
    constructor(private readonly s3UploaderService: S3UploaderService, private readonly reportsPhotosRepository: ReportsPhotosRepository) {}
}
