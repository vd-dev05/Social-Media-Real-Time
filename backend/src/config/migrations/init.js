/**
 * INIT DATABASE - MANUAL MIGRATION
 * Tạo toàn bộ bảng core cho hệ thống SOCIAL
 * Chạy lệnh: node src/config/migrations/init.js
 */

const dotenv = require('dotenv');
const path = require('path');
const { db } = require('../common_postgres.js'); // nhớ file này export { db }

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function createUsersTable() {
  const exists = await db.schema.hasTable('users');
  if (!exists) {
    await db.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('username', 50).unique().notNullable();
      t.string('email', 255).unique().notNullable();
      t.string('password_hash', 255).notNullable();
      t.string('display_name', 100);
      t.text('avatar_url');
      t.string('role', 20).defaultTo('user');
      t.boolean('is_verified').defaultTo(false);
      t.boolean('is_active').defaultTo(true);
      t.timestamp('last_login_at');
      t.timestamp('created_at').defaultTo(db.fn.now());
      t.timestamp('updated_at').defaultTo(db.fn.now());
    });
    console.log('✅ Created table: users');
  } else {
    console.log('⚡ Table users already exists');
  }
}

async function createUserProfiles() {
  const exists = await db.schema.hasTable('user_profiles');
  if (!exists) {
    await db.schema.createTable('user_profiles', (t) => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      t.date('birthday');
      t.string('gender', 20);
      t.string('bio', 255);
      t.string('location', 100);
      t.jsonb('social_links');
    });
    console.log('✅ Created table: user_profiles');
  }
}

async function createAuthSessions() {
  const exists = await db.schema.hasTable('auth_sessions');
  if (!exists) {
    await db.schema.createTable('auth_sessions', (t) => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      t.string('refresh_token', 255).unique();
      t.string('ip_address', 100);
      t.string('user_agent', 255);
      t.timestamp('expires_at');
      t.boolean('revoked').defaultTo(false);
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
    console.log('✅ Created table: auth_sessions');
  }
}

async function createUserDevices() {
  const exists = await db.schema.hasTable('user_devices');
  if (!exists) {
    await db.schema.createTable('user_devices', (t) => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      t.string('device_id', 255);
      t.string('device_name', 100);
      t.string('os', 100);
      t.string('browser', 100);
      t.string('ip_address', 100);
      t.string('location', 100);
      t.boolean('is_trusted').defaultTo(false);
      t.timestamp('last_used_at').defaultTo(db.fn.now());
    });
    console.log('✅ Created table: user_devices');
  }
}

async function createUserBlocks() {
  const exists = await db.schema.hasTable('user_blocks');
  if (!exists) {
    await db.schema.createTable('user_blocks', (t) => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      t.integer('blocked_user_id').references('id').inTable('users').onDelete('CASCADE');
      t.string('reason', 255);
      t.timestamp('created_at').defaultTo(db.fn.now());
      t.unique(['user_id', 'blocked_user_id']);
    });
    console.log('✅ Created table: user_blocks');
  }
}

async function createSpamReports() {
  const exists = await db.schema.hasTable('spam_reports');
  if (!exists) {
    await db.schema.createTable('spam_reports', (t) => {
      t.increments('id').primary();
      t.integer('reporter_id').references('id').inTable('users').onDelete('CASCADE');
      t.integer('target_user_id').references('id').inTable('users').onDelete('CASCADE');
      t.string('type', 50);
      t.integer('target_id');
      t.string('reason', 255);
      t.boolean('resolved').defaultTo(false);
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
    console.log('✅ Created table: spam_reports');
  }
}

async function createUserServices() {
  const exists = await db.schema.hasTable('user_services');
  if (!exists) {
    await db.schema.createTable('user_services', (t) => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      t.string('service_name', 100);
      t.boolean('enabled').defaultTo(true);
      t.timestamp('activated_at').defaultTo(db.fn.now());
      t.timestamp('expired_at');
    });
    console.log('✅ Created table: user_services');
  }
}

async function createAuditLogs() {
  const exists = await db.schema.hasTable('audit_logs');
  if (!exists) {
    await db.schema.createTable('audit_logs', (t) => {
      t.increments('id').primary();
      t.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
      t.string('action', 100);
      t.jsonb('metadata');
      t.timestamp('created_at').defaultTo(db.fn.now());
    });
    console.log('✅ Created table: audit_logs');
  }
}

// === RUN ALL MIGRATIONS ===
(async () => {
  try {
    console.log('🚀 Starting init migration...');
    await createUsersTable();
    await createUserProfiles();
    await createAuthSessions();
    await createUserDevices();
    await createUserBlocks();
    await createSpamReports();
    await createUserServices();
    await createAuditLogs();

    console.log('✅ All tables created successfully!');
  } catch (err) {
    console.error('❌ Error during init migration:', err.message);
    console.error(err.stack);
  } finally {
    await db.destroy();
  }
})();
