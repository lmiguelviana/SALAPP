const pool = require('../db');

const commentModel = {
    // Criar um novo Comentário
    create: async (post_id, gt_id, user_id, comment_text) => {
        const [result] = await pool.query(
            'INSERT INTO comments (post_id, gt_id, user_id, comment_text) VALUES (?, ?, ?, ?)',
            [post_id, gt_id, user_id, comment_text]
        );
        return result.insertId;
    },

    // Obter Comentários de um Post
    getByPostId: async (post_id) => {
        const [rows] = await pool.query('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC', [post_id]);
        return rows;
    },

    // Obter Comentários de um GT
    getByGtId: async (gt_id) => {
        const [rows] = await pool.query('SELECT * FROM comments WHERE gt_id = ? ORDER BY created_at ASC', [gt_id]);
        return rows;
    },

    // Obter um Comentário por ID
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
        return rows[0];
    },

    // Atualizar um Comentário
    update: async (id, comment_text) => {
        const [result] = await pool.query(
            'UPDATE comments SET comment_text = ? WHERE id = ?',
            [comment_text, id]
        );
        return result.affectedRows;
    },

    // Deletar um Comentário
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = commentModel;