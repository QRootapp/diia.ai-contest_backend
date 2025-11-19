import { Knex } from 'knex';

export class ReportsPhotosRepository {
    constructor(private readonly repository: Knex) {}
}
