import { EReportStatus } from '../enums';

export interface ICreateReport {
    status: EReportStatus;
    first_photo_at: string;
    vehicle_license_plate: string;
    latitude: number;
    longitude: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    report_number: string;
}
