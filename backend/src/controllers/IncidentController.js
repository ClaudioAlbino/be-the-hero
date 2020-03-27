const connection = require('../database/connection');

//controller para cadastro dos Casos das ONGs
// o "id" será gerado automático, neste caso, será incremental
module.exports = {
    //listagem de todos os Casos (incidents)
    async index(request, response) {
        const { page = 1 } = request.query;

        //os colchetes em volta do "count" são para retornar somente
        //um número e não o array completo
        const [count] = await connection('incidents').count();
       
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);
        
        //X-Total-Count é um nome aleatório de uma variável dado ao retorno do "count"
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        //para acessar o cabeçalho das requisições, para verificar 
        //quem fez o login e está cadastrando o Caso
        //a autenticação fica dentro do "headers"

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
       
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //verificar se o "caso" que está para ser deletado
        //realmente é da ONG que o está deletando
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permited.' }); //401 é um status de "não autorizado"
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};