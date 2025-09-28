import dotenv from 'dotenv'
dotenv.config()

import { pgNodejs } from '@/config/postgres.js'

export async function createUserTable() {
  try {
    const exists = await pgNodejs.schema.hasTable('users')
    if (!exists) {
      await pgNodejs.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name', 100)
        table.string('email', 255).unique()
        table.string('password_hash', 255)
        table.text('avatar_url')
        table.string('role', 20).defaultTo('user')
        table.boolean('is_verified').defaultTo(false)
        table.timestamp('created_at').defaultTo(pgNodejs.fn.now())
        table.timestamp('updated_at').defaultTo(pgNodejs.fn.now())
      })
      console.log('✅ Created table: users')
    } else {
      console.log('⚡ Table users already exists')
    }
  } catch (err) {
    console.error('❌ Error creating table:', err.message)
  } finally {
    await pgNodejs.destroy()
  }
}

createUserTable()
