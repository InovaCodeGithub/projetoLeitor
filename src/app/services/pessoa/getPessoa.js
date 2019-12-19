const Pessoa = require('../../schemas/Pessoa')
module.exports = async (req) => {
    const {_id} = await Pessoa.findOne({id_login: req.userId, tag: req.body.pessoa_tag})
    return _id
}