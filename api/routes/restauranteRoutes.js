const express = require('express');
const restauranteModel = require('../models/restauranteModel');

const router = express.Router();

// Rota para criar um novo Restaurante
router.post('/restaurantes', async (req, res) => {
    const { encontro_id, name, cuisine_type, address, map_link } = req.body;

    if (!encontro_id || !name) {
        return res.status(400).json({ message: 'Os campos encontro_id e nome são obrigatórios.' });
    }

    try {
        const newRestaurante = await restauranteModel.create(encontro_id, name, cuisine_type, address, map_link);
        res.status(201).json(newRestaurante);
    } catch (error) {
        console.error('Erro ao criar Restaurante:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter todos os Restaurantes de um Encontro
router.get('/encontros/:encontro_id/restaurantes', async (req, res) => {
    const { encontro_id } = req.params;
    try {
        const restaurantes = await restauranteModel.getByEncontroId(encontro_id);
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error('Erro ao obter Restaurantes por Encontro ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter um Restaurante por ID
router.get('/restaurantes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await restauranteModel.findById(id);
        if (!restaurante) {
            return res.status(404).json({ message: 'Restaurante não encontrado.' });
        }
        res.status(200).json(restaurante);
    } catch (error) {
        console.error('Erro ao obter Restaurante por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um Restaurante
router.put('/restaurantes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, cuisine_type, address, map_link } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'O campo nome é obrigatório.' });
    }

    try {
        const affectedRows = await restauranteModel.update(id, name, cuisine_type, address, map_link);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Restaurante não encontrado ou nenhum dado foi alterado.' });
        }
        res.status(200).json({ message: 'Restaurante atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar Restaurante:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um Restaurante
router.delete('/restaurantes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await restauranteModel.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Restaurante não encontrado.' });
        }
        res.status(200).json({ message: 'Restaurante deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar Restaurante:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;