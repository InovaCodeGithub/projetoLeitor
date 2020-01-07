const { Router } = require('express')

const authMiddleware = require('./app/middlewares/auth')
const LoginController = require('./app/controllers/LoginController')
const SessionController = require('./app/controllers/SessionController')
const PessoaController = require('./app/controllers/PessoaController')
const RegistroController = require('./app/controllers/RegistroController')
const LeitorController = require('./app/controllers/LeitorController')

const routes = new Router();

// REGISTRAR/LOGIN
routes.post(`/registrar`, LoginController.store)
routes.post(`/login`, SessionController.store)

// Requisicoes abaixo so funcionarao com o token de autorizacao
routes.use(authMiddleware)


routes.put(`/usuario` , LoginController.update) // EDITAR LOGIN
routes.post(`/usuario/check` , LoginController.index) // LISTAS LOGIN

//PESSOA
routes.get('/pessoa', PessoaController.index) // LISTAR
routes.post(`/pessoa`, PessoaController.store) // POSTAR
routes.put(`/pessoa/:pessoaId`,PessoaController.update) // EDITAR

//LEITOR
routes.get(`/leitor`, LeitorController.index) // LISTAR
routes.post('/leitor', LeitorController.store) // POSTAR
routes.put('/leitor/:leitorId', LeitorController.update) // EDITAR


//REGISTRO
routes.get(`/registro`, RegistroController.index) // LISTAR
routes.post('/registro', RegistroController.store) // POSTAR
routes.put('/registro/:registroId', RegistroController.update) // EDITAR



module.exports = routes



