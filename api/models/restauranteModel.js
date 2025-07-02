const pool = require('../db');

const restauranteModel = {
    // Criar um novo Restaurante
    create: async (encontro_id, name, cuisine_type, address, map_link) => {
        const [result] = await pool.query(
            'INSERT INTO restaurantes (encontro_id, name, cuisine_type, address, map_link) VALUES (?, ?, ?, ?, ?)',
            [encontro_id, name, cuisine_type, address, map_link]
        );
        const [rows] = await pool.query('SELECT * FROM restaurantes WHERE id = ?', [result.insertId]);
        return rows[0];
    },

    // Obter todos os Restaurantes de um Encontro
    getByEncontroId: async (encontro_id) => {
        const [rows] = await pool.query('SELECT * FROM restaurantes WHERE encontro_id = ?', [encontro_id]);
        return rows;
    },

    // Obter um Restaurante por ID
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM restaurantes WHERE id = ?', [id]);
        return rows[0];
    },

    // Atualizar um Restaurante
    update: async (id, name, cuisine_type, address, map_link) => {
        const [result] = await pool.query(
            'UPDATE restaurantes SET name = ?, cuisine_type = ?, address = ?, map_link = ? WHERE id = ?',
            [name, cuisine_type, address, map_link, id]
        );
        return result.affectedRows;
    },

    // Deletar um Restaurante
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM restaurantes WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = restauranteModel;