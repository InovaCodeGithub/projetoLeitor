const bcrypt = require('bcryptjs')
const Yup = require('yup')
const Login = require('../schemas/Login')

class LoginController {
    async index(req,res){

        const {usuario, senha} = req.body
        const login = await Login.findOne({usuario}).select(['-__v'])

        if(!login){
            return res.status(404).json({error: 'Usuário não encontrado.'})
        }

        if(!(bcrypt.compare(senha, login.senha))){
            return res.status(400).json({error: 'Login ou senha inválidos.'})
        }

        res.send()
    }

    async store(req,res){
        const {email} = req.body

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            nome: Yup.string().required(),
            usuario: Yup.string().required(),
            senha: Yup.string().required()
        })
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou.' });
        }

        req.body.senha = bcrypt.hashSync(req.body.senha, 10)

        try{
            if (await Login.findOne({email}))
            return res.status(400).send({error: `E-mail ja registrado`})
    
            const user = await Login.create(req.body)
            user.senha = undefined
    
            return res.send({user})
        } catch (err){
            console.log(err)
            return res.status(400).send({error: `Falha no registro`})
        }
    }

    async update(req,res){
        

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            usuario: Yup.string().required(),
            senha: Yup.string().required()
        })
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou.' });
        }

        const{nome,usuario,senha} = req.body
        
        const user = await Login.findByIdAndUpdate(req.userId,{nome,usuario,senha : bcrypt.hashSync(senha, 10)}, {new: true}).select(['-__v'])

        const { id, email } = user

        return res.json({user: {id, nome, usuario, email }})
    }

    async delete (req,res){

    }
}
module.exports = new LoginController()