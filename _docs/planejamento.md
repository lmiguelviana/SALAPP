# Planejamento do Sistema "Sala do Mestres"

## 1. Objetivo Principal
Criar um ecossistema digital completo para os clientes da "Sala do Mestres", composto por:
*   **Aplicativo Móvel (iOS e Android):** Uma rede social privada com funcionalidades inspiradas no Instagram, permitindo acesso a conteúdos exclusivos, interação entre membros e visualização de GTs (Grupos de Trabalho) e Encontros da Sala.
*   **Sistema Web (Painel de Gerenciamento):** Uma plataforma para a equipe da "Sala do Mestres" gerenciar e adicionar informações sobre os GTs (lives semanais de Gestão e Estratégia, Pessoas, Marketing e Vendas, Produtos e Compliance) e os Encontros da Sala (eventos trimestrais).

## 2. Tecnologias Escolhidas
*   **Aplicativo Móvel:** Flutter (Dart)
*   **Sistema Web (Frontend):** React (JavaScript/TypeScript)
*   **Sistema Web (Backend/API):** Node.js (JavaScript/TypeScript)
*   **Banco de Dados:** MySQL

## 3. Estrutura de Arquivos Inicial (Proposta)
*   `docs/`: Documentação do projeto.
    *   `planejamento.md`: Este arquivo de planejamento.
    *   `fases/`: Pasta contendo a documentação detalhada de cada fase.
    *   `app/`: Código-fonte do aplicativo Flutter.
    *   `web/`: Código-fonte do frontend React do sistema web.
    *   `api/`: Código-source do backend Node.js (API).
    *   `database/`: Scripts SQL para o banco de dados (ex: `database_setup.sql`).
*   `README.md`: Informações gerais do projeto e instruções de setup.

## 4. Documentação de Design
*   [Proposta de UX/UI](ux_ui_proposal.md) (Será revisada para o novo escopo)
*   [Proposta de UX/UI para o App Móvel](docs/ux_ui_app_proposal.md) (Novo arquivo)

## 5. Funcionalidades Essenciais (MVP - Produto Mínimo Viável)

### 5.1. Autenticação de Usuários
*   **Login:** Clientes acessam com usuário e senha (via App e Sistema Web).
*   **Banco de Dados de Usuários:** Tabela `users` no MySQL para armazenar credenciais (senhas hashadas) e informações de perfil.

### 5.2. Gerenciamento de Conteúdo (Via Sistema Web)
*   **Gerenciamento de Usuários:**
    *   Cadastro de novos usuários (nome, email, etc.).
    *   Geração e envio automático de login e senha para o usuário (via email ou outro método).
*   **GTs (Grupos de Trabalho):**
    *   Cadastro de GTs com título, descrição, link da reunião Zoom, nome do apresentador, data e horário.
    *   Categorias de GTs: Gestão e Estratégia, Pessoas, Marketing e Vendas, Produtos e Compliance.
    *   Associação de GTs a dias da semana (Terça, Quarta, Quinta).
*   **Encontros da Sala:**
    *   Cadastro de eventos trimestrais com título, descrição, data, local e informações adicionais.
    *   Gerenciamento de restaurantes próximos ao local do evento (nome, tipo de culinária, endereço, link para mapa/site).

### 5.3. Funcionalidades do Aplicativo Móvel
*   **Feed de Conteúdo:** Exibição dos GTs e Encontros da Sala em um feed cronológico ou por relevância.
*   **Acesso aos GTs:** Acesso direto às reuniões dos GTs via link do Zoom.
*   **Perfis de Usuário:** Visualização de perfis básicos.
*   **Interação Básica:** (MVP) Visualização de comentários. (Funcionalidades "tipo Instagram" mais avançadas como postagens e curtidas serão avaliadas para fases futuras).

## 6. Fases do Projeto

Para detalhes de cada fase, consulte os arquivos na pasta `docs/fases/` (serão atualizados conforme o progresso):

*   **Fase 1: Configuração Inicial e Banco de Dados**
    *   Revisão e atualização da estrutura do banco de dados MySQL para o novo escopo (usuários, GTs, Encontros, posts, restaurantes).
    *   Configuração dos ambientes de desenvolvimento para Node.js, React e Flutter.
    *   Criação da estrutura de pastas do projeto (`app/`, `web/`, `api/`, `database/`).

*   **Fase 2: Desenvolvimento da API (Node.js)**
    *   Implementação dos endpoints RESTful para:
        *   Autenticação e gerenciamento de usuários (login, registro, perfil).
        *   Gerenciamento de GTs (CRUD).
        *   Gerenciamento de Encontros da Sala (CRUD).
        *   Gerenciamento de restaurantes associados a Encontros.
        *   Gerenciamento de posts de usuários (CRUD).
        *   Gerenciamento de comentários (CRUD).
    *   Implementação da lógica de segurança (autenticação JWT, validação de dados, etc.).

*   **Fase 3: Desenvolvimento do Painel Web (React)**
    *   Criação da interface de usuário para o Painel de Administração.
    *   Implementação das telas de gerenciamento de Usuários, GTs, Encontros da Sala (incluindo restaurantes).
    *   Integração com a API Node.js para todas as operações de CRUD.

*   **Fase 4: Desenvolvimento do Aplicativo Móvel (Flutter)**
    *   Criação da interface de usuário para todas as telas do aplicativo (Login, Home, Social, Detalhes GT, Detalhes Encontro, Perfil, Listas, Criar Post).
    *   Implementação da navegação entre as telas.
    *   Integração com a API Node.js para buscar e enviar dados (feed, posts, comentários, etc.).
    *   Implementação da funcionalidade de upload de fotos para posts.
    *   Integração com o Zoom para acesso aos GTs.

*   **Fase 5: Testes, Refinamentos e Implantação**
    *   **Testes:** Realização de testes de unidade, integração e ponta a ponta para todas as partes do sistema (API, Web, Mobile).
    *   **Segurança:** Testes de segurança e aplicação de melhores práticas.
    *   **Performance:** Otimização de performance para API, Web e Mobile.
    *   **UI/UX:** Refinamentos finais na interface e experiência do usuário com base em testes e feedback.
    *   **Implantação:** Preparação e deploy da API, Painel Web e Aplicativo Móvel nos respectivos ambientes (servidores, lojas de aplicativos).

---

**Próximo Passo:** Com as fases do projeto atualizadas, podemos começar a detalhar a Fase 1, focando na estrutura do banco de dados e na configuração dos ambientes de desenvolvimento.