# Fase 2: Desenvolvimento da API (Node.js) - Finalizada

Esta fase foi concluída com sucesso, implementando as seguintes funcionalidades na API:

*   **Usuários:**
    *   Registro (`POST /api/users/register`)
    *   Login (`POST /api/users/login`)
    *   Atualização de Perfil (`PATCH /api/users/:id`)
    *   Obtenção de Detalhes por ID (`GET /api/users/:id`)

*   **GTs (Grupos de Trabalho):**
    *   Criação (`POST /api/gts`)
    *   Listagem de Todos (`GET /api/gts`)
    *   Obtenção por ID (`GET /api/gts/:id`)
    *   Atualização (`PUT /api/gts/:id`)
    *   Exclusão (`DELETE /api/gts/:id`)

*   **Encontros da Sala:**
    *   Criação (`POST /api/encontros`)
    *   Listagem de Todos (`GET /api/encontros`)
    *   Obtenção por ID (`GET /api/encontros/:id`)
    *   Atualização (`PUT /api/encontros/:id`)
    *   Exclusão (`DELETE /api/encontros/:id`)

*   **Restaurantes (associados a Encontros):**
    *   Criação (`POST /api/restaurantes`)
    *   Listagem por Encontro ID (`GET /api/encontros/:encontro_id/restaurantes`)
    *   Obtenção por ID (`GET /api/restaurantes/:id`)
    *   Atualização (`PUT /api/restaurantes/:id`)
    *   Exclusão (`DELETE /api/restaurantes/:id`)

*   **Posts:**
    *   Criação (`POST /api/posts`)
    *   Listagem de Todos (`GET /api/posts`)
    *   Listagem por Usuário ID (`GET /api/users/:user_id/posts`)
    *   Obtenção por ID (`GET /api/posts/:id`)
    *   Atualização (`PUT /api/posts/:id`)
    *   Exclusão (`DELETE /api/posts/:id`)

*   **Comentários:**
    *   Criação (`POST /api/comments`)
    *   Listagem por Post ID (`GET /api/posts/:post_id/comments`)
    *   Listagem por GT ID (`GET /api/gts/:gt_id/comments`)
    *   Obtenção por ID (`GET /api/comments/:id`)
    *   Atualização (`PUT /api/comments/:id`)
    *   Exclusão (`DELETE /api/comments/:id`)

Todos os modelos e rotas foram criados e integrados ao `server.js` da API.
