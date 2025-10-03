// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


dotenv.config({ path: path.resolve('./../../.env') })


export default  {

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
