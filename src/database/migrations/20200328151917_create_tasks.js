

exports.up = function (knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users')   
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('tasks')
};