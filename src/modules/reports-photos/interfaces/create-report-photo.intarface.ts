import { EPhotoType } from '../enums';

export interface ICreateReportPhoto {
    latitude: number;
    longitude: number;
    taken_at: string;
    photo_type: EPhotoType;
    photo_url: string;
    recognized_plate: string;
    ocr_confidence: number;
}
