// src/config/common_postgres.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const knex = require('knex');
const config = require('./knexfile.cjs'); // knexfile CJS
const db = knex(config[process.env.NODE_ENV || 'development']);
module.exports = {db};
