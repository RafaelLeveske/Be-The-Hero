
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments();//cria automaticamente um numero de id
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();//usa o id da tabela ongs
        
        table.foreign('ong_id').references('id').inTable('ongs');//chave estrangeira id da tabela ongs
      });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  
};
