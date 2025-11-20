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

    public async getReportsWithPhotos(page: number = 1, limit: number = 10) {
        const offset = (page - 1) * limit;

        const countResult = await this.repository('reports').count('id as count');
        const total = countResult[0] && countResult[0].count ? Number(countResult[0].count) : 0;

        const reports = await this.repository('reports')
            .select(
                'reports.*',
                this.repository.raw(
                    'COALESCE(JSON_ARRAYAGG(JSON_OBJECT(' +
                        '"id", report_photos.id,' +
                        '"photo_url", report_photos.photo_url,' +
                        '"photo_type", report_photos.photo_type,' +
                        '"latitude", report_photos.latitude,' +
                        '"longitude", report_photos.longitude,' +
                        '"taken_at", report_photos.taken_at,' +
                        '"ocr_confidence", report_photos.ocr_confidence,' +
                        '"recognized_plate", report_photos.recognized_plate' +
                        ')), JSON_ARRAY()) as photos'
                )
            )
            .leftJoin('report_photos', 'report_photos.report_id', 'reports.id')
            .groupBy('reports.id')
            .orderBy('reports.created_at', 'desc')
            .limit(limit)
            .offset(offset);

        return {
            data: reports,
            total,
            page,
            limit,
        };
    }
}
