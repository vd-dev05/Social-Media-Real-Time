

import dotenv from 'dotenv'

dotenv.config()
export default  {
  client: 'pg',
  connection: process.env.PG_URI,
pool: {
  min: 0,
  max: 5,
  acquireTimeoutMillis: 10000
},
   migrations: {
      directory: "./src/config/migrations"
    },
}