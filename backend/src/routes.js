const express = require('express');

//importar o controller para a aplicação
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//usado para criptografar informações, mas neste caso,
//usaremos para gerar uma chave "id" com textos aleatórios
const crypto = require('crypto');

//usado para criação das rotas
const routes = express.Router();

//criando "login" e verificação se a ONG existe ou não para autenticação
routes.post('/sessions', SessionController.create);

//criar uma rota para listar todas as ONGs já cadastradas
routes.get('/ongs', OngController.index);
//cadastro das ONGs usando neste caso o controller "OngController"
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

//criar uma rota para listar todas os Casos cadastrados
routes.get('/incidents', IncidentController.index);
//cadastro dos Casos (incidents) usando neste caso o controller "IncidentController"
routes.post('/incidents', IncidentController.create);
//para deletar Casos que a ONG queira
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;