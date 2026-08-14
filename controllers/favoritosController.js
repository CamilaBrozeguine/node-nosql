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
  try {
    const jaExiste = await Favorito.findOne({ googleBookId: req.body.googleBookId });
    if (jaExiste) return res.status(400).json({ message: 'Livro já está nos favoritos' });
    const favorito = new Favorito(req.body);
    await favorito.save();
    res.status(201).json(favorito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removerFavorito = async (req, res) => {
  try {
    const favorito = await Favorito.findByIdAndDelete(req.params.id);
    if (!favorito) return res.status(404).json({ message: 'Favorito não encontrado' });
    res.json({ message: 'Removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.atualizarFavorito = async (req, res) => {
  try {
    const favorito = await Favorito.findByIdAndUpdate(
      req.params.id,
      { anotacao: req.body.anotacao, musicaLink: req.body.musicaLink, fonteEscolhida: req.body.fonteEscolhida, status: req.body.status, rating: req.body.rating, genero: req.body.genero, dataInicio: req.body.dataInicio, dataTermino: req.body.dataTermino },
      { new: true }
    );
    if (!favorito) return res.status(404).json({ message: 'Favorito não encontrado' });
    res.json(favorito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};