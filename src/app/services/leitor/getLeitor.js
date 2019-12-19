const Leitor = require('../../schemas/Leitor')
module.exports = async (req) => {
    const {_id} = await Leitor.findOne({id_login: req.userId, uuid: req.body.leitor_uuid})
    return _id
}