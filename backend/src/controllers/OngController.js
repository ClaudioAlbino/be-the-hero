//usado para criptografar informações, mas neste caso,
//usaremos para gerar uma chave "id" com textos aleatórios
const crypto = require('crypto');

//trazendo o arquivo "connection" para dentro do banco de dados
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        //irá gerar um número com 4 bytes de caracteres hexadecimal no "id"
        const id = crypto.randomBytes(4).toString('HEX');

        //para conectar com o banco de dados,
        //criou-se o arquivo "connection.js" dentro da pasta "database"

        //inserindo as informações dentro da tabela "ongs"
        //usando o comando "insert"
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};