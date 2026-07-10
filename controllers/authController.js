const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

exports.cadastrar = async (req, res) => {
    try {
        const { nome, idade, email, senha } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hash = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({ nome, idade, email, senha: hash });
        await usuario.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
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