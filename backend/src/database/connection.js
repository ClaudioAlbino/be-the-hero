const knex = require('knex');

//o "configuration" está dentro do arquivo "knexfile.js"
const configuration = require('../../knexfile');

//para configurar a conexão dentro do nosso ambiente
//de desenvolvimento (development)
const connection = knex(configuration.development);

//para exportar a conexão
module.exports = connection;