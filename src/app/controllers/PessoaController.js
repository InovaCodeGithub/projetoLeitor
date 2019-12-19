const Pessoa = require('../schemas/Pessoa')
const Yup = require('yup')

class PessoaController {

    async index(req,res){

    const pessoas = await Pessoa.find({id_login: req.userId}).select(['-__v'])
    res.json(pessoas)

    }

    async store(req,res){

        
        const checkPessoa = await Pessoa.findOne({
            id_login: req.userId,
            tag: req.body.tag
        })

        if(checkPessoa){
            return res.status(400).json({error: 'Tag já cadastrada.'})
        }

        const pessoa = await Pessoa.create({    
            id_login: req.userId,
            nome:req.body.nome,
            tag:req.body.tag
        })
    
        const { id_login, nome, tag} = pessoa
        return res.json({pessoa: {id_login, nome, tag}})
    }

    async update(req,res){
        const{nome,tag} = req.body
        const {pessoaId} = req.params


        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            tag: Yup.string().required()
        })
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validação falhou.' });
        }
         
        const pessoa = await Pessoa.findByIdAndUpdate(pessoaId,{nome,tag}, {new: true}).select(['-__v'])
        return res.json(pessoa)
    }

    async delete (req,res){

    }
}
module.exports = new PessoaController()