const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require(`bcryptjs`)
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
require('dotenv/config')
const app = express()
moment.locale('pt-br')
const authMiddleware = require('./middlewares/auth')

app.use(cors())
app.use(bodyParser.json())



mongoose.connect('mongodb://localhost:27017/mongodb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
mongoose.set('useCreateIndex', true);


const Pessoa = mongoose.model('Pessoa',{
    id_login:{
        type: Number,
    },
    nome: String,
    tag:String,
  })

const Leitor = mongoose.model('Leitor',{
    id_login:{
        type: Number,
        unique: true,
    },
    uuid: Number,
    tag:String
})

const Registro = mongoose.model('Registro',{
    id_login:{
        type: Number,
    },
    id_pessoa: {
        type: Number,
    },
    id_leitor:{
        type: Number,
    },
    uuid_leitor:{
        type: Number,
    },
    nm_pessoa:String,
    nm_leitor:String,
    dt_registro:{
        type: Date,
        default: Date.now,
    },
    hr_registro:{
        type: Date,
        default: Date.now,
    },
    corrente:String
})



const Login = mongoose.model(`Login`,{
    nome:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        lowercase: true,
        unique: true,

    },
    usuario:{
        type: String,
        unique: true,
    },
    senha:{
        type: String,
        unique: true,
        select: false,
    },
    dt_registro:{
        type: Date,
        default: Date.now,
    },
    dt_acesso:{
        type: Date,
        default: Date.now,
    },
    hr_acesso:{
        type: Date,
        default: Date.now,
    },
})


app.post(`/registrar`, async (req,res) => {
    const {email} = req.body
    req.body.senha = bcrypt.hashSync(req.body.senha, 10)
    try{
        if (await Login.findOne({email}))
        return res.status(400).send({error: `Usuario ja existe`})

        const user = await Login.create(req.body)
        user.senha = undefined

        return res.send({user})
    } catch (err){
        console.log(err)
        return res.status(400).send({error: `Falha no registro`})
    }
})

// autenticar gera token

app.post(`/autenticar`, async (req,res) => {
    const { usuario, senha } = req.body

    const user = await Login.findOne({ usuario }).select(`+senha`)

    if (!user)
    return res.status(400).send({error: 'Usuario nao encontrado'})
    
    if(!await bcrypt.compare(senha, user.senha))
    return res.status(400).send({error: 'Senha invalida'})

    const { id, email } = user
    res.send(
        { user: {
            id,
             usuario,
              token: jwt.sign({id, usuario, email}, process.env.APP_SECRET)
            }
        }
    )

})

app.get('/bipeLogin/:nome/:email/:usuario/:senha',function(req, res){

    req.params.senha = bcrypt.hashSync(req.params.senha, 10)

    var reg = [];
        reg.push({"nome": req.params.nome, "email": req.params.email, "usuario": req.params.usuario, "senha": req.params.senha})

        console.log(reg)
    try{
        if (Login.findOne(req.params.email))
        return res.status(400).send({error: 'Usuario ja existe'})

        const user = Login.create(body)
        user.senha = undefined

        return res.send({user})
    } catch (err){
        console.log(err)
        return res.status(400).send({error: `Falha no registro`})
    }

})

// Requisicoes abaixo so funcionarao com o token de autorizacao

app.use(authMiddleware)

app.put(`/att_registro` , async (req,res) =>{

    const{nome,usuario,senha} = req.body
     
    const user = await Login.findByIdAndUpdate(req.userId,{nome,usuario,senha : bcrypt.hashSync(senha, 10)}, {new: true})
    const { id, email } = user
    res.json({user: {id, nome, usuario, email }})





})





app.listen(8080)

