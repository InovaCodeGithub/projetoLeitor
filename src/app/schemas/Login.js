const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema(
    {
        nome:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            unique: true,

        },
        usuario:{
            type: String,
            required: true, 
            unique: true,
        },
        senha:{
            type: String,
            unique: true,
            required: true, 
            select: false,
        },
        dt_registro:{
            type: Date,
            default: Date.now,
        },
        dt_acesso:{
            type: Date,
            default: Date.now,
        },
        hr_acesso:{
            type: Date,
            default: Date.now,
        },
    }
)

module.exports = mongoose.model('Login', LoginSchema)