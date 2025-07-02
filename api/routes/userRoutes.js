const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModels'); // Importa o modelo de usuário

const router = express.Router();

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota de Registro de Usuário
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verificar se o usuário já existe
        const existingUser = await userModel.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'Nome de usuário já existe.' });
        }

        // Criar novo usuário
        const userId = await userModel.create(username, email, password);
        res.status(201).json({ message: 'Usuário registrado com sucesso!', userId });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota de Login de Usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Encontrar usuário pelo email
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Comparar senha
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Login bem-sucedido (em um sistema real, você geraria um token JWT aqui)
        res.status(200).json({ message: 'Login bem-sucedido!', user: { id: user.id, username: user.username, email: user.email } });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar o perfil do usuário
router.patch('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { fullName, profilePictureUrl } = req.body;

    if (!fullName && !profilePictureUrl) {
        return res.status(400).json({ message: 'Pelo menos um campo (fullName ou profilePictureUrl) é obrigatório para atualização.' });
    }

    try {
        const affectedRows = await userModel.updateProfile(id, fullName, profilePictureUrl);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou nenhum dado foi alterado.' });
        }

        res.status(200).json({ message: 'Perfil do usuário atualizado com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar perfil do usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para obter detalhes de um usuário por ID
router.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Não retornar a senha hash
        const { password_hash, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);

    } catch (error) {
        console.error('Erro ao obter detalhes do usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um usuário (username e email)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'Username e email são obrigatórios para atualização.' });
    }

    try {
        const affectedRows = await userModel.update(id, username, email);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou nenhum dado foi alterado.' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const affectedRows = await userModel.delete(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso!' });

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;