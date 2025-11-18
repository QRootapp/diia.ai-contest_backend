import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('report_photos', function (table) {
        table.increments('id').primary();
        table.integer('report_id').unsigned().notNullable();
        table.string('photo_url', 500).notNullable();
        table.enum('photo_type', ['initial', 'confirmation']).notNullable();
        table.decimal('latitude', 10, 8).nullable();
        table.decimal('longitude', 11, 8).nullable();
        table.timestamp('taken_at').notNullable();
        table.decimal('ocr_confidence', 5, 2).nullable();
        table.string('recognized_plate', 20).nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.foreign('report_id').references('reports.id').onDelete('CASCADE');
        table.index('report_id');
        table.index('photo_type');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('report_photos');
}
