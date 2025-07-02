const express = require('express');
const postModel = require('../models/postModel');

const router = express.Router();

// Rota para criar um novo Post
router.post('/posts', async (req, res) => {
    const { user_id, content, image_url } = req.body;

    if (!user_id || (!content && !image_url)) {
        return res.status(400).json({ message: 'user_id e pelo menos um (content ou image_url) são obrigatórios.' });
    }

    try {
        const postId = await postModel.create(user_id, content, image_url);
        res.status(201).json({ message: 'Post criado com sucesso!', postId });
    } catch (error) {
        console.error('Erro ao criar Post:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter todos os Posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await postModel.getAll();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao obter Posts:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter Posts de um usuário específico
router.get('/users/:user_id/posts', async (req, res) => {
    const { user_id } = req.params;
    try {
        const posts = await postModel.getByUserId(user_id);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao obter Posts do usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter um Post por ID
router.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Erro ao obter Post por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um Post
router.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { content, image_url } = req.body;

    if (!content && !image_url) {
        return res.status(400).json({ message: 'Pelo menos um (content ou image_url) é obrigatório para atualização.' });
    }

    try {
        const affectedRows = await postModel.update(id, content, image_url);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Post não encontrado ou nenhum dado foi alterado.' });
        }
        res.status(200).json({ message: 'Post atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar Post:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um Post
router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await postModel.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }
        res.status(200).json({ message: 'Post deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar Post:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;