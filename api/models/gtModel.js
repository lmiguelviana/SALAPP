const pool = require('../db');

const gtModel = {
    // Criar um novo GT
    create: async (title, description, zoom_link, presenter_name, gt_date, gt_time, category, banner_url) => {
        const [result] = await pool.query(
            'INSERT INTO gts (title, description, zoom_link, presenter_name, gt_date, gt_time, category, banner_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, zoom_link, presenter_name, gt_date, gt_time, category, banner_url]
        );
        return result.insertId;
    },

    // Obter todos os GTs
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM gts');
        return rows;
    },

    // Obter um GT por ID
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM gts WHERE id = ?', [id]);
        return rows[0];
    },

    // Atualizar um GT
    update: async (id, title, description, zoom_link, presenter_name, gt_date, gt_time, category, banner_url) => {
        const [result] = await pool.query(
            'UPDATE gts SET title = ?, description = ?, zoom_link = ?, presenter_name = ?, gt_date = ?, gt_time = ?, category = ?, banner_url = ? WHERE id = ?',
            [title, description, zoom_link, presenter_name, gt_date, gt_time, category, banner_url, id]
        );
        return result.affectedRows;
    },

    // Deletar um GT
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM gts WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = gtModel;