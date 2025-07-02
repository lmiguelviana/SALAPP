const pool = require('../db');

const postModel = {
    // Criar um novo Post
    create: async (user_id, content, image_url) => {
        const [result] = await pool.query(
            'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
            [user_id, content, image_url]
        );
        return result.insertId;
    },

    // Obter todos os Posts
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        return rows;
    },

    // Obter Posts de um usuário específico
    getByUserId: async (user_id) => {
        const [rows] = await pool.query('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [user_id]);
        return rows;
    },

    // Obter um Post por ID
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
        return rows[0];
    },

    // Atualizar um Post
    update: async (id, content, image_url) => {
        const [result] = await pool.query(
            'UPDATE posts SET content = ?, image_url = ? WHERE id = ?',
            [content, image_url, id]
        );
        return result.affectedRows;
    },

    // Deletar um Post
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = postModel;