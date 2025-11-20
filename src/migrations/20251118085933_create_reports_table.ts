import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reports', function (table) {
        table.increments('id').primary();
        table.string('vehicle_license_plate', 20).notNullable();
        table.decimal('latitude', 10, 8).notNullable();
        table.decimal('longitude', 11, 8).notNullable();
        table.enum('status', ['draft', 'submitted', 'under_review', 'resolved', 'rejected']).defaultTo('draft').notNullable();
        table.timestamp('first_photo_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('confirmation_photo_at').nullable();
        table.integer('duration_minutes').nullable();
        table.timestamp('submitted_at').nullable();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('middle_name', 255).notNullable();
        table.timestamps(true, true);

        table.index('status');
        table.index('vehicle_license_plate');
        table.index('created_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('reports');
}
