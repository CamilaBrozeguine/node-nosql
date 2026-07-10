const Favorito = require('../models/Favorito');

exports.obterFavoritos = async (req, res) => {
    try {
        const favoritos = await Favorito.find();
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.adicionarFavorito = async (req, res) => {
    try{
        const favorito = new Favorito(req.body);
        await favorito.save();
        res.status(201).json(favorito);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.atualizarFavorito = async (req, res) => {
  try {
    const googleBookId = req.params.googleBookId.replace(/^\//, '');
    const favorito = await Favorito.findOneAndUpdate(
      { googleBookId: { $in: [googleBookId, '/' + googleBookId] } }, // ← acha dos dois jeitos
      { anotacao: req.body.anotacao, musicaLink: req.body.musicaLink, fonteEscolhida: req.body.fonteEscolhida, status: req.body.status, rating: req.body.rating,genero: req.body.genero,  dataInicio: req.body.dataInicio, dataConclusao: req.body.dataConclusao },
      { new: true }
    );
    if (!favorito) return res.status(404).json({ message: 'Favorito não encontrado' });
    res.json(favorito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports .removerFavorito = async (req, res) => {
    try {
        const favorito = await Favorito.findByIdAndDelete({googleBookId: req.params.id});
        if(!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }
        res.json({ message: 'Favorito removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 