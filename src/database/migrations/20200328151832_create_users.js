
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary();

        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('users')
};
