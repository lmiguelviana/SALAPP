# Tela de Gerenciamento de Usuários (Painel Web)

## Propósito
Permitir que a equipe da "Sala do Mestres" gerencie os usuários do sistema (adicionar, editar, excluir, visualizar).

## Elementos
*   **Título da Página:** "Gerenciar Usuários".
*   **Botão "Adicionar Novo Usuário":** Um botão de destaque (dourado) no topo da área de conteúdo para abrir o formulário de cadastro.
*   **Barra de Busca/Filtro:** Campo de texto para buscar usuários por nome, email, etc.
*   **Tabela de Usuários:**
    *   **Colunas:** Nome, Email, Status (Ativo/Inativo), Data de Cadastro, Ações.
    *   **Ações por Linha:** Ícones/Botões para "Editar" e "Excluir" o usuário.
    *   **Paginação:** Para navegar entre grandes volumes de usuários.
*   **Formulário de Cadastro/Edição de Usuário (Modal ou Nova Página):**
    *   **Campos:**
        *   Nome Completo
        *   Email (será o login)
        *   Telefone (opcional)
        *   Status (Ativo/Inativo)
    *   **Ação de Geração de Senha:** Ao cadastrar um novo usuário, o sistema gerará automaticamente uma senha forte.
    *   **Envio de Credenciais:** Após o cadastro, o sistema enviará automaticamente o login (email) e a senha gerada para o email do usuário.
    *   **Botões:** "Salvar" (dourado) e "Cancelar".

## Estética
*   Consistência com o layout geral do painel de administração.
*   Tabelas claras e formulários intuitivos.
