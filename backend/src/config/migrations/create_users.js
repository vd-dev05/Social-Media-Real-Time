// export async function up(knex) {
//   await knex.schema.createTable('users', (table) => {
//     table.increments('id').primary()
//     table.string('name', 100).notNullable()
//     table.string('email', 255).notNullable().unique()
//     table.string('password_hash', 255).notNullable()
//     table.text('avatar_url')
//     table.string('role', 20).defaultTo('user')
//     table.boolean('is_verified').defaultTo(false)
//     table.timestamps(true, true)
//   })
// }

// export async function down(knex) {
//   await knex.schema.dropTableIfExists('users')
// }


exports.up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.text('avatar_url');
    table.string('role', 20).defaultTo('user');
    table.boolean('is_verified').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users');
};