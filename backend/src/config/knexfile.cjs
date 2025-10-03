// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, './../../.env') });

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.PG_URI,
        migrations: {
            tableName: 'knex_migrations',
            directory: path.resolve(__dirname, './migrations'),
        },
    },

    staging: {
        client: 'pg',
        connection: process.env.PG_URI,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.PG_URI,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
