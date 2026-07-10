const express = require('express');
const router = express.Router();

const favoritosController = require('../controllers/favoritosController');

router.get('/',  auth, favoritosController.obterFavoritos);
router.post('/', auth, favoritosController.adicionarFavorito);
router.patch('/:googleBookId', auth, favoritosController.atualizarFavorito);
router.delete('/:googleBookId', auth, favoritosController.removerFavorito);

module.exports = router;