import { Knex } from 'knex';
import { ICreateReport, IUpdateReport } from './interfaces';
import { ICreateReportPhoto } from '../reports-photos/interfaces/create-report-photo.intarface';

export class ReportRepository {
    private readonly repository: Knex;

    constructor(dbRepository: Knex) {
        this.repository = dbRepository;
    }

    public async getReportById(id: number) {
        return await this.repository('reports as r')
            .select(
                'r.*',
                this.repository.raw(`
                    (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', rp.id,
                                'photo_url', rp.photo_url,
                                'photo_type', rp.photo_type,
                                'latitude', rp.latitude,
                                'longitude', rp.longitude,
                                'taken_at', rp.taken_at,
                                'ocr_confidence', rp.ocr_confidence,
                                'recognized_plate', rp.recognized_plate,
                                'created_at', rp.created_at
                            )
                        )
                        FROM report_photos rp
                        WHERE rp.report_id = r.id
                    ) AS photos
            `)
            )
            .where('r.id', id)
            .first();
    }

    public async createReportWithPhoto(createReportData: ICreateReport, createPhotoData: ICreateReportPhoto) {
        return await this.repository.transaction(async (trx) => {
            const [reportId] = await trx('reports').insert(createReportData);
            await trx('report_photos').insert({ ...createPhotoData, report_id: reportId });
            return reportId!;
        });
    }

    public async updateReportWithPhoto(id: number, updateReportData: IUpdateReport, createPhotoData: ICreateReportPhoto) {
        return await this.repository.transaction(async (trx) => {
            await trx('reports').update(updateReportData).where({ id });
            await trx('report_photos').insert({ ...createPhotoData, report_id: id });
            return id;
        });
    }
}
