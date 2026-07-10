const mongoose = require ('mongoose');

const usuariosSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
        trim: true,
    },
     idade:{
        type: Number,
        required: true,
        min: 0,
     },
     email:{
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
        lowercase: true,
        trim: true,
     },
     senha:{
        type: String,
        required: true,
        minlength: 6,
     }
    },{timestamps: true});

module.exports = mongoose.model('Usuario', usuariosSchema);