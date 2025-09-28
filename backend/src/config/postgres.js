// // /config/postgres.js

import config from '@/config/knexfile.js'
import knex from 'knex'

const dbPostgres =  knex(config);


dbPostgres.raw('SELECT 1')
  .then(() => console.log('✅ Connected PostgreSQL successfully'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err))

export default dbPostgres
