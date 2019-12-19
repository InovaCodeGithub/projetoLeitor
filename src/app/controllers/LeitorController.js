const Leitor = require(`../schemas/Leitor`)
const Yup = require('yup')

class LeitorController {
    async index(req,res){
        const leitores = await Leitor.find({id_login: req.userId}).select(['-__v'])
        return res.json(leitores)
    }

    async store(req,res){

        const schema = Yup.object().shape({
            tag: Yup.number().required(),
            uuid: Yup.number().required().positive().integer(),
        })
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou.' });
        }

        const leitor = await Leitor.create({    
            id_login: req.userId,
            uuid:req.body.uuid,
            tag:req.body.tag
        })
    
        const { id_login, uuid, tag} = leitor
        return res.json({leitor: {id_login, uuid, tag}})
    }

    async update(req,res){
        
        const{uuid,tag} = req.body
        const {leitorId } = req.params

        const schema = Yup.object().shape({
            tag: Yup.number().required(),
            uuid: Yup.number().required().positive().integer(),
        })
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou.' });
        }

        
         
        const leitor = await Leitor.findByIdAndUpdate(leitorId,{uuid,tag}, {new: true}).select(['-__v'])
        return res.json(leitor)
    }

    async delete (req,res){

    }
}
module.exports = new LeitorController()