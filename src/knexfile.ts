import { Knex } from 'knex';
import { TNodeEnv } from './types';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const dbConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'pass',
            database: process.env.DB_NAME || 'db_name',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
    },

    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'pass',
            database: process.env.DB_NAME || 'db_name',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
    },
};

const env = process.env.NODE_ENV as TNodeEnv;

const config = dbConfig[env]!;

export default config;
