const usuario = require('../models/Usuario');
const Usuario = require('../models/Usuario');

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obter todos os usuários
exports.obterUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//atualizar um usuário
exports.atualizarUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Excluir um usuário
exports.excluirUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};