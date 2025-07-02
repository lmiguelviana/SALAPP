const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Importa a conexão com o banco de dados

const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário
const gtRoutes = require('./routes/gtRoutes'); // Importa as rotas de GTs
const encontroRoutes = require('./routes/encontroRoutes'); // Importa as rotas de Encontros
const restauranteRoutes = require('./routes/restauranteRoutes'); // Importa as rotas de Restaurantes
const postRoutes = require('./routes/postRoutes'); // Importa as rotas de Posts
const commentRoutes = require('./routes/commentRoutes'); // Importa as rotas de Comentários

const app = express();
const PORT = process.env.PORT || 3000; // Porta para a API

// Middleware
app.use(cors()); // Permite requisições de diferentes origens (para o frontend React)
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir arquivos estáticos da pasta 'uploads' // Permite que o Express leia JSON no corpo das requisições

// Rota de teste
app.get('/', (req, res) => {
res.send('API da Sala do Mestres está funcionando!');
});

// Rota de teste de conexão com o banco de dados
app.get('/test-db', async (req, res) => {
try {
const [rows] = await pool.query('SELECT 1 + 1 AS solution');
      res.json({ message: 'Conexão com o banco de dados bem-sucedida!', solution: rows[0].
solution });
   } catch (err) {
       console.error('Erro ao conectar ao banco de dados:', err);
       res.status(500).json({ error: 'Erro ao conectar ao banco de dados.' });
    }
});

app.use('/api/users', userRoutes);
app.use('/api', gtRoutes);
app.use('/api', encontroRoutes);
app.use('/api', restauranteRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});