const pool = require('../db');

const encontroModel = {
    // Criar um novo Encontro
    create: async (title, description, event_date, location, additional_info) => {
        const [result] = await pool.query(
            'INSERT INTO encontros (title, description, event_date, location, additional_info) VALUES (?, ?, ?, ?, ?)',
            [title, description, event_date, location, additional_info]
        );
        return result.insertId;
    },

    // Obter todos os Encontros
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM encontros');
        return rows;
    },

    // Obter um Encontro por ID
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM encontros WHERE id = ?', [id]);
        return rows[0];
    },

    // Atualizar um Encontro
    update: async (id, title, description, event_date, location, additional_info) => {
        const [result] = await pool.query(
            'UPDATE encontros SET title = ?, description = ?, event_date = ?, location = ?, additional_info = ? WHERE id = ?',
            [title, description, event_date, location, additional_info, id]
        );
        return result.affectedRows;
    },

    // Deletar um Encontro
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM encontros WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = encontroModel;