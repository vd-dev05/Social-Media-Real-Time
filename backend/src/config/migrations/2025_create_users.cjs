exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('users');
  if (!exists) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 100);
      table.string('email', 255).unique();
      table.string('password_hash', 255);
      table.text('avatar_url');
      table.string('role', 20).defaultTo('user');
      table.boolean('is_verified').defaultTo(false);
      table.timestamps(true, true);
    });
  }
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users');
};
