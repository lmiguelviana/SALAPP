# Tela de Gerenciamento de Encontros da Sala (Painel Web)

## Propósito
Permitir que a equipe da "Sala do Mestres" gerencie os Encontros da Sala, incluindo cadastro, edição, exclusão e a associação de restaurantes próximos.

## Elementos
*   **Título da Página:** "Gerenciar Encontros da Sala".
*   **Botão "Adicionar Novo Encontro":** Um botão de destaque (dourado) no topo da área de conteúdo para abrir o formulário de cadastro.
*   **Barra de Busca/Filtro:** Campo de texto para buscar Encontros por título, data, local, etc.
*   **Tabela de Encontros:**
    *   **Colunas:** Título, Data, Local, Ações.
    *   **Ações por Linha:** Ícones/Botões para "Editar" e "Excluir" o Encontro.
    *   **Paginação:** Para navegar entre grandes volumes de Encontros.
*   **Formulário de Cadastro/Edição de Encontro (Modal ou Nova Página):**
    *   **Campos Principais:**
        *   Título do Encontro
        *   Descrição Detalhada
        *   Data (seletor de data)
        *   Local
        *   Informações Adicionais
    *   **Seção de Gerenciamento de Restaurantes (dentro do formulário do Encontro):**
        *   **Título:** "Restaurantes Próximos"
        *   **Botão "Adicionar Restaurante":** Para adicionar um novo restaurante associado a este Encontro.
        *   **Tabela de Restaurantes Associados:**
            *   **Colunas:** Nome, Tipo de Culinária, Endereço, Link (para mapa/site), Ações.
            *   **Ações por Linha:** Ícones/Botões para "Editar" e "Remover" o restaurante da lista do Encontro.
        *   **Formulário de Cadastro/Edição de Restaurante (Modal):**
            *   **Campos:**
                *   Nome do Restaurante
                *   Tipo de Culinária
                *   Endereço Completo
                *   Link para Mapa/Site (opcional)
            *   **Botões:** "Salvar Restaurante" (dourado) e "Cancelar".
    *   **Botões do Formulário do Encontro:** "Salvar Encontro" (dourado) e "Cancelar".

## Estética
*   Consistência com o layout geral do painel de administração.
*   Tabelas claras e formulários intuitivos.
