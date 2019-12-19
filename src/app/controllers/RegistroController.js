const Yup = require('yup')
const Registro = require(`../schemas/Registro`)
const getLeitor = require('../services/leitor/getLeitor')
const getPessoa = require('../services/pessoa/getPessoa')
class RegistroController {
    async index(req,res){
        const registros = await Registro.find({id_login: req.userId}).select(['-__v'])
        return res.json(registros)
    }

    async store(req,res){

        const schema = Yup.object().shape({
            corrente: Yup.number().required(),
            leitor_uuid: Yup.number().required().positive().integer(),
            pessoa_tag: Yup.string().required()
        })
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou.' });
        }

        const registro = await Registro.create({    
            id_pessoa: await getPessoa(req),
            id_leitor: await getLeitor(req),
            corrente:req.body.corrente
        })
    
        return res.json(registro)
    }

    async update(req,res){

        const schema = Yup.object().shape({
            corrente: Yup.number(),
            leitor_uuid: Yup.number().positive().integer(),
            pessoa_tag: Yup.string()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou.' });
        }

        const{corrente} = req.body
        const id_pessoa = await getPessoa(req)
        const id_leitor = await getLeitor(req)
        const {registroId } = req.params
         
        const registro = await Registro.findByIdAndUpdate(registroId,{id_pessoa,id_leitor,corrente}, {new: true}).select(['-__v'])
        return res.json(registro)
    }

    async delete (req,res){

    }
}
module.exports = new RegistroController()