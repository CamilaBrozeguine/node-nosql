const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/cadastrar', authController.cadastrar);
router.post('/google', authController.loginComGoogle);
router.post('/login', authController.login);

module.exports = router;



