const mongoose = require('mongoose')

const RegistroSchema = new mongoose.Schema({
    id_pessoa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true      
    },
    id_leitor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leitor',
        required: true  
    },
    dt_registro:{
        type: Date,
        default: Date.now,
    },
    hr_registro:{
        type: Date,
        default: Date.now,
    },
    corrente:{
        type:Number,
        required: true 
    }
})

module.exports = mongoose.model('Registro', RegistroSchema)
//autoIncrement.initialize(mongoose.connection)
//RegistroSchema.plugin(autoIncrement.plugin, {model: `Registro`, field:`id_pessoa`, startAt:1,incrementBy:1})



