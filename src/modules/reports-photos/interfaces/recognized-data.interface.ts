import { EPhotoType } from '../enums';

export interface IRecognizedData {
    recognizedPlate: string;
    ocrConfidence: number;
    photoType: EPhotoType;
}
