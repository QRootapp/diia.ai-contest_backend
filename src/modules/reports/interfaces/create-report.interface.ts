import { EReportStatus } from '../enums';

export interface ICreateReport {
    status: EReportStatus;
    first_photo_at: string;
    vehicle_license_plate: string;
    latitude: number;
    longitude: number;
}
