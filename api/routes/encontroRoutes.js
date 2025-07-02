const express = require('express');
const encontroModel = require('../models/encontroModel');

const router = express.Router();

// Rota para criar um novo Encontro
router.post('/encontros', async (req, res) => {
    const { title, description, event_date, location, additional_info } = req.body;

    if (!title || !event_date || !location) {
        return res.status(400).json({ message: 'Os campos título, data do evento e local são obrigatórios.' });
    }

    try {
        const encontroId = await encontroModel.create(title, description, event_date, location, additional_info);
        res.status(201).json({ message: 'Encontro criado com sucesso!', encontroId });
    } catch (error) {
        console.error('Erro ao criar Encontro:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter todos os Encontros
router.get('/encontros', async (req, res) => {
    try {
        const encontros = await encontroModel.getAll();
        res.status(200).json(encontros);
    } catch (error) {
        console.error('Erro ao obter Encontros:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter um Encontro por ID
router.get('/encontros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const encontro = await encontroModel.findById(id);
        if (!encontro) {
            return res.status(404).json({ message: 'Encontro não encontrado.' });
        }
        res.status(200).json(encontro);
    } catch (error) {
        console.error('Erro ao obter Encontro por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um Encontro
router.put('/encontros/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, event_date, location, additional_info } = req.body;

    if (!title || !event_date || !location) {
        return res.status(400).json({ message: 'Os campos título, data do evento e local são obrigatórios.' });
    }

    try {
        const affectedRows = await encontroModel.update(id, title, description, event_date, location, additional_info);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Encontro não encontrado ou nenhum dado foi alterado.' });
        }
        res.status(200).json({ message: 'Encontro atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar Encontro:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um Encontro
router.delete('/encontros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await encontroModel.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Encontro não encontrado.' });
        }
        res.status(200).json({ message: 'Encontro deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar Encontro:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;