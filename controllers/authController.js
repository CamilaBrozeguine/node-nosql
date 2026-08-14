const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

const { getAuth } = require('../config/firebase');

// no loginComGoogle


exports.loginComGoogle = async (req, res) => {
  try {
    const { tokenFirebase } = req.body;

    // valida o token do Firebase
    const decoded = await getAuth().verifyIdToken(tokenFirebase);

    // busca ou cria o usuário no banco
    let usuario = await Usuario.findOne({ email: decoded.email });
    if (!usuario) {
      const senhaAleatoria = crypto.randomBytes(32).toString('hex');
      const hash = await bcrypt.hash(senhaAleatoria, 10);

      usuario = new Usuario({
        nome: decoded.name,
        email: decoded.email,
        senha: hash
      });
      await usuario.save();
    }

    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome, email: usuario.email },
      SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });
  } catch (error) {
    res.status(401).json({ message: 'Token do Google inválido' });
  }
};

exports.cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        
        if (!email.includes('@')) {
          return res.status(400).json({ message: 'Email inválido' });
        }
        if (senha.length < 6) {
          return res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres' });
        }
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe, tente outro nome' });
        }

        const hash = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({ nome, email, senha: hash });
        await usuario.save();

        res.status(201).json({ message: 'Parabéns você foi cadastrado no MyBooks com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try{
        const{ email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({ message: 'Email ou senha incorretos' });
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if(!isMatch){
            return res.status(400).json({ message: 'Email ou senha incorretos' });
        }

        const token = jwt.sign(
          { id: usuario._id, nome: usuario.nome, email: usuario.email }, 
          SECRET, 
          { expiresIn: '1h' }
        );
        
        res.json({ token, usuario:{ id: usuario._id, nome: usuario.nome, email: usuario.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};