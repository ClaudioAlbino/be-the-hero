
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        //campos que serão criados no banco de dados
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //relacionamento com outras tabelas
        table.string('ong_id').notNullable();

        //chave estrangeira = lincando uma tabela a outra
        table.foreign('ong_id').references('id').inTable('ongs');

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
