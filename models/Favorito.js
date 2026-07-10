const mongoose = require('mongoose');

const favoritoSchema = new mongoose.Schema({
    googleBookId: {
        type: String,
        required: true
    },
    title: String,
    authors: [String],
    publischedDate: String,
    thumbnail: String,
    anotacao: {type: String, default: ''},
    musicaLink: {type: String, default: ''},
    status: {type: String, default: 'Não iniciado'},
    genero: {type: String, default: ''},
    dataInicio: {type: Date, default: null},
    dataTermino: {type: Date, default: null},
    fonteEscolhida: {type: String, default: 'Google Books'}
});
    
module.exports = mongoose.model('Favorito', favoritoSchema);