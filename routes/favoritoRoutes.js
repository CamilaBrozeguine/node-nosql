const express = require('express');
const router = express.Router();

const favoritosController = require('../controllers/favoritosController');

router.get('/', favoritosController.obterFavoritos);
router.post('/', favoritosController.adicionarFavorito);
router.patch('/:googleBookId', favoritosController.atualizarFavorito);
router.delete('/:googleBookId', favoritosController.removerFavorito);

module.exports = router;