const express = require('express');
const gtModel = require('../models/gtModel');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
    }
});
const upload = multer({ storage: storage });

// Rota para criar um novo GT
router.post('/gts', upload.single('banner'), async (req, res) => {
    const { title, description, zoom_link, presenter_name, gt_date, gt_time, category } = req.body;
    const banner_url = req.file ? `/uploads/${req.file.filename}` : null; // Caminho do arquivo salvo

    if (!title || !gt_date || !gt_time || !category) {
        return res.status(400).json({ message: 'Os campos título, data, hora e categoria são obrigatórios.' });
    }

    try {
        const gtId = await gtModel.create(title, description, zoom_link, presenter_name, gt_date, gt_time, category, banner_url);
        res.status(201).json({ message: 'GT criado com sucesso!', gtId, banner_url });
    } catch (error) {
        console.error('Erro ao criar GT:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter todos os GTs
router.get('/gts', async (req, res) => {
    try {
        const gts = await gtModel.getAll();
        res.status(200).json(gts);
    } catch (error) {
        console.error('Erro ao obter GTs:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter um GT por ID
router.get('/gts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const gt = await gtModel.findById(id);
        if (!gt) {
            return res.status(404).json({ message: 'GT não encontrado.' });
        }
        res.status(200).json(gt);
    } catch (error) {
        console.error('Erro ao obter GT por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um GT
router.put('/gts/:id', upload.single('banner'), async (req, res) => {
    const { id } = req.params;
    const { title, description, zoom_link, presenter_name, gt_date, gt_time, category } = req.body;
    let banner_url = req.body.banner_url_existing; // Se não houver novo upload, mantém o existente

    if (req.file) {
        banner_url = `/uploads/${req.file.filename}`;
    }

    if (!title || !gt_date || !gt_time || !category) {
        return res.status(400).json({ message: 'Os campos título, data, hora e categoria são obrigatórios.' });
    }

    try {
        const affectedRows = await gtModel.update(id, title, description, zoom_link, presenter_name, gt_date, gt_time, category, banner_url);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'GT não encontrado ou nenhum dado foi alterado.' });
        }
        res.status(200).json({ message: 'GT atualizado com sucesso!', banner_url });
    } catch (error) {
        console.error('Erro ao atualizar GT:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um GT
router.delete('/gts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await gtModel.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'GT não encontrado.' });
        }
        res.status(200).json({ message: 'GT deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar GT:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;