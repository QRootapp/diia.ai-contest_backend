import { Knex } from 'knex';

export class ReportRepository {
    private readonly repository: Knex;

    constructor(dbRepository: Knex) {
        this.repository = dbRepository;
    }
}
