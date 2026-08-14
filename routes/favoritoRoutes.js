// ← adiciona essa opção no express
const express = require('express');
const router = express.Router({ strict: false });
const favoritosController = require('../controllers/favoritosController');
const auth = require('../middleware/auth');

router.get('/', auth, favoritosController.obterFavoritos);
router.post('/', auth, favoritosController.adicionarFavorito);
router.delete('/:id', auth, favoritosController.removerFavorito);
router.patch('/:id', auth, favoritosController.atualizarFavorito);

module.exports = router;