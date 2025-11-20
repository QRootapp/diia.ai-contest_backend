import { EReportStatus } from '../enums';

export interface IUpdateReport {
    status: EReportStatus;
    confirmation_photo_at: string;
    submitted_at: string;
    duration_minutes: number;
}
