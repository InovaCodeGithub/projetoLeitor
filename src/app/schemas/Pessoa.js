const mongoose = require('mongoose')

var PessoaSchema = new mongoose.Schema(
   {
        id_login:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Login',
            required: true,    
        },
        nome:{type: String, required: true, },
        tag:{
            type: String,
            required: true,
        }
    }
);



module.exports = mongoose.model('Pessoa', PessoaSchema)