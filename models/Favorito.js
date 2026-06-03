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
    fonteEscolhida: {type: String, default: 'Google Books'}
});
    
module.exports = mongoose.model('Favorito', favoritoSchema);