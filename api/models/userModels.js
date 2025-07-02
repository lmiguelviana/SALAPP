const pool = require('../db');
const bcrypt = require('bcrypt');

const userModel = {
// Encontrar todos os usuários
findAll: async () => {
const [rows] = await pool.query('SELECT id, username, email, created_at FROM users'); // Não retornar a senha
 return rows;
},
// Encontrar usuário pelo username
findByUsername: async (username) => {
const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
 return rows[0];
},
// Encontrar usuário pelo email
findByEmail: async (email) => {
const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
 return rows[0];
},
// Encontrar usuário pelo ID
findById: async (id) => {
const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
return rows[0];
},

// Criar um novo usuário
create: async (username, email, password) => {
const passwordHash = await bcrypt.hash(password, 10); // Hash da senha
  const [result] = await pool.query(
         'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
 [username, email, passwordHash]
  );
return result.insertId;
},

// Atualizar perfil do usuário (username e email)
update: async (id, username, email) => {
const [result] = await pool.query(
'UPDATE users SET username = ?, email = ? WHERE id = ?',
 [username, email, id]
);
return result.affectedRows;
},

// Atualizar perfil do usuário (fullName e profilePictureUrl) - manter para compatibilidade
updateProfile: async (id, fullName, profilePictureUrl) => {
const [result] = await pool.query(
'UPDATE users SET full_name = ?, profile_picture_url = ? WHERE id = ?',
 [fullName, profilePictureUrl, id]
);
return result.affectedRows;
},

// Deletar um usuário
delete: async (id) => {
const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
return result.affectedRows;
}
};

 module.exports = userModel;