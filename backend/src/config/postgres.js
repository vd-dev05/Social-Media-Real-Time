// // /config/postgres.js

import config from '@/config/knexfile.cjs'
import knex from 'knex'

// Initialize a PostgreSQL client to test the connection

const dbPostgres =  knex(config[process.env.NODE_ENV || 'development']);

dbPostgres.raw('SELECT 1')
  .then(() => console.log('✅ Connected PostgreSQL successfully'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err))

export default dbPostgres
