const express = require('express');
const commentModel = require('../models/commentModel');

const router = express.Router();

// Rota para criar um novo Comentário
router.post('/comments', async (req, res) => {
    const { post_id, gt_id, user_id, comment_text } = req.body;

    if (!user_id || !comment_text || (!post_id && !gt_id)) {
        return res.status(400).json({ message: 'user_id, comment_text e pelo menos um (post_id ou gt_id) são obrigatórios.' });
    }

    try {
        const commentId = await commentModel.create(post_id, gt_id, user_id, comment_text);
        res.status(201).json({ message: 'Comentário criado com sucesso!', commentId });
    } catch (error) {
        console.error('Erro ao criar Comentário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter Comentários de um Post
router.get('/posts/:post_id/comments', async (req, res) => {
    const { post_id } = req.params;
    try {
        const comments = await commentModel.getByPostId(post_id);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Erro ao obter Comentários do Post:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter Comentários de um GT
router.get('/gts/:gt_id/comments', async (req, res) => {
    const { gt_id } = req.params;
    try {
        const comments = await commentModel.getByGtId(gt_id);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Erro ao obter Comentários do GT:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter um Comentário por ID
router.get('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await commentModel.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado.' });
        }
        res.status(200).json(comment);
    } catch (error) {
        console.error('Erro ao obter Comentário por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um Comentário
router.put('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const { comment_text } = req.body;

    if (!comment_text) {
        return res.status(400).json({ message: 'O campo comment_text é obrigatório para atualização.' });
    }

    try {
        const affectedRows = await commentModel.update(id, comment_text);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Comentário não encontrado ou nenhum dado foi alterado.' });
        }
        res.status(200).json({ message: 'Comentário atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar Comentário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um Comentário
router.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await commentModel.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Comentário não encontrado.' });
        }
        res.status(200).json({ message: 'Comentário deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar Comentário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;