const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Yup = require('yup')
const Login = require('../schemas/Login')

class SessionController {
    async store(req,res){
        const { email, senha } = req.body

        const user = await Login.findOne({ email }).select(`+senha`)

        if (!user)
        return res.status(400).send({error: 'E-mail incorreto'})
        
        if(!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({error: 'Senha incorreta'})

        const { id, usuario } = user
        return res.send(
            { user: {
                id,
                usuario,
                token: jwt.sign({id, usuario, email}, process.env.APP_SECRET)
                }
            }
        )
    }
}
module.exports = new SessionController()