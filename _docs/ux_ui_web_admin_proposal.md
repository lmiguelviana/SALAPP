# Proposta de UX/UI para o Painel de Administração Web "Sala do Mestres"

Este documento detalha a proposta de experiência do usuário (UX) e interface do usuário (UI) para o Painel de Administração Web da "Sala do Mestres", que será utilizado pela equipe para gerenciar usuários, GTs, Encontros da Sala e restaurantes.

## 1. Estética Geral (A "Vibe" Premium e Profissional)

Seguindo a linha do aplicativo móvel, o painel de administração manterá a estética "preto com dourado", mas com uma abordagem mais funcional e profissional, otimizada para desktop/tablet.

*   **Cores:**
    *   **Principal:** Preto (`#000000` ou um cinza muito escuro) para fundos, cabeçalhos e barras laterais.
    *   **Destaque:** Dourado (`#FFD700` ou um tom de ouro mais rico) para acentos, ícones de navegação ativos, botões de ação e elementos interativos.
    *   **Texto:** Branco ou um cinza muito claro para garantir legibilidade em fundos escuros.
    *   **Cores Secundárias:** Tons sutis de cinza para separadores, bordas de cards e elementos de dados.
*   **Tipografia:** Fontes sans-serif modernas e limpas (ex: `Roboto`, `Inter`, `Open Sans`) para todo o painel. Priorizar legibilidade e hierarquia visual.
*   **Elementos Visuais:**
    *   Design limpo e organizado, com bom espaçamento.
    *   Bordas arredondadas sutis para cards e campos de entrada.
    *   Ícones dourados e bem definidos para navegação e ações.
    *   Tabelas de dados claras e fáceis de ler, com linhas de destaque em dourado ao passar o mouse.

## 2. Estrutura Geral e Layout

O painel de administração terá um layout padrão com uma barra lateral de navegação e uma área de conteúdo principal.

*   **Cabeçalho Fixo (Top Bar):**
    *   **Localização:** No topo da tela, fixo.
    *   **Elementos:**
        *   Logo da "Sala do Mestres" (versão menor) à esquerda.
        *   Título da página atual (ex: "Gerenciar Usuários") no centro.
        *   Informações do usuário logado (nome, foto de perfil) e botão de logout à direita.
        *   Pode incluir um ícone de notificações ou atalhos rápidos.
*   **Barra Lateral de Navegação (Sidebar):**
    *   **Localização:** À esquerda da tela, fixa.
    *   **Elementos:**
        *   Lista de links para as principais seções de gerenciamento:
            *   Dashboard (Visão Geral)
            *   Gerenciar Usuários
            *   Gerenciar GTs
            *   Gerenciar Encontros da Sala
            *   Configurações (se necessário)
    *   **Estilo:** Fundo preto, links em branco que ficam dourados ao passar o mouse e quando a seção está ativa.
    *   **Colapsável (Opcional):** Pode ter a opção de ser colapsada para maximizar a área de conteúdo.
*   **Área de Conteúdo Principal:**
    *   **Localização:** À direita da barra lateral, ocupando o restante da tela.
    *   **Conteúdo:** Exibirá as interfaces de gerenciamento de cada seção selecionada na barra lateral.
    *   **Estilo:** Fundo preto ou cinza muito escuro, com cards e formulários bem definidos.

## 3. Navegação e Interação

*   **Navegação Intuitiva:** A estrutura da barra lateral deve ser clara e fácil de entender, permitindo que o usuário encontre rapidamente a seção desejada.
*   **Feedback Visual:** Ao clicar em um item de menu, ele deve mudar de cor para dourado, indicando a seção ativa.
*   **Ações Comuns:** Botões de "Adicionar Novo", "Editar", "Excluir" serão consistentes em todas as telas de gerenciamento, utilizando o estilo dourado para ações primárias.
*   **Formulários:** Campos de entrada claros, com rótulos visíveis e feedback de validação.
*   **Tabelas de Dados:** Paginação, filtros e busca para facilitar a localização de informações.

## 4. Telas de Gerenciamento (Visão Geral)

Cada seção de gerenciamento (Usuários, GTs, Encontros) terá uma tela dedicada com:

*   Uma tabela listando os itens existentes.
*   Botões para "Adicionar Novo" item.
*   Ações de "Editar" e "Excluir" para cada item da tabela.
*   Formulários para adicionar/editar detalhes dos itens.

### 4.1. Tela de Gerenciamento de Usuários

*   **Propósito:** Permitir que a equipe da "Sala do Mestres" gerencie os usuários do sistema (adicionar, editar, excluir, visualizar).
*   **Elementos:**
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

### 4.2. Tela de Gerenciamento de GTs

*   **Propósito:** Permitir que a equipe da "Sala do Mestres" gerencie os Grupos de Trabalho (GTs), incluindo cadastro, edição e exclusão.
*   **Elementos:**
    *   **Título da Página:** "Gerenciar GTs".
    *   **Botão "Adicionar Novo GT":** Um botão de destaque (dourado) no topo da área de conteúdo para abrir o formulário de cadastro.
    *   **Barra de Busca/Filtro:** Campo de texto para buscar GTs por título, apresentador, categoria, etc.
    *   **Tabela de GTs:**
        *   **Colunas:** Título, Apresentador, Data, Horário, Categoria, Link Zoom, Ações.
        *   **Ações por Linha:** Ícones/Botões para "Editar" e "Excluir" o GT.
        *   **Paginação:** Para navegar entre grandes volumes de GTs.
    *   **Formulário de Cadastro/Edição de GT (Modal ou Nova Página):**
        *   **Campos:**
            *   Título do GT
            *   Descrição
            *   Link da Reunião Zoom
            *   Nome do Apresentador
            *   Data (seletor de data)
            *   Horário (seletor de horário)
            *   Categoria (dropdown com opções: Gestão e Estratégia, Pessoas, Marketing e Vendas, Produtos e Compliance)
        *   **Botões:** "Salvar" (dourado) e "Cancelar".

### 4.3. Tela de Gerenciamento de Encontros da Sala

*   **Propósito:** Permitir que a equipe da "Sala do Mestres" gerencie os Encontros da Sala, incluindo cadastro, edição, exclusão e a associação de restaurantes próximos.
*   **Elementos:**
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

---

**Próximo Passo:** Agora que detalhamos a tela de Gerenciamento de Usuários, qual você gostaria de abordar em seguida: Gerenciar GTs ou Gerenciar Encontros da Sala (que incluirá os restaurantes)?