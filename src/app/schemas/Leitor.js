const mongoose = require('mongoose')

const LeitorSchema = new mongoose.Schema({
    id_login:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Login'      
    },
    uuid: {type: Number, unique:true, required: true, },
    tag:{type:String,required: true, }
})




module.exports = mongoose.model('Leitor', LeitorSchema)