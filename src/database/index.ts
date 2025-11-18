import config from '../knexfile';
import knex from 'knex';

const dbInstanse = knex(config);

export default dbInstanse;
