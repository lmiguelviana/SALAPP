# Documentação da Página Principal (`home.php`)

Esta é a página principal do sistema "Sala do Mestres", acessível apenas por usuários autenticados. Ela serve como o hub central para o conteúdo exclusivo e avisos importantes.

## 1. Visão Geral e Estética

*   **Propósito:** Apresentar o conteúdo dos GTs (lives), agenda e avisos de eventos presenciais.
*   **Estética:** Mantém a proposta de UX/UI de "preto com dourado", com um layout limpo, organizado e profissional.
*   **Fundo:** Preto sólido ou cinza muito escuro.

## 2. Elementos da Página

### 2.1. Cabeçalho (Header)
*   **Localização:** Fixo no topo da página.
*   **Estilo:** Fundo preto.
*   **Elementos:**
    *   **Logo:** À esquerda, uma versão menor do logotipo "Sala do Mestres" (ex: `logo_2023_w_vert_linklist.png` se for mais adequado para cabeçalho).
    *   **Nome do Usuário:** À direita, o nome do usuário logado (ex: "Olá, [Nome do Usuário]") em texto branco.
    *   **Imagem de Perfil:** Ao lado do nome do usuário, uma imagem de perfil (ex: `perfil_insta.png` ou `perfil_linklist.png`) em um círculo ou quadrado com borda dourada.
    *   **Botão/Link de Logout:** Um pequeno ícone ou link "Sair" em dourado, para permitir que o usuário encerre a sessão.

### 2.2. Seção de Lives (Grupo de Trabalho - GT)
*   **Título:** "Grupo de Trabalho (GT) - Live da Semana" em dourado.
*   **Player de Vídeo:**
    *   **Localização:** Área central de destaque.
    *   **Conteúdo:** Um `<iframe>` incorporando o player de vídeo da live atual (YouTube, Vimeo, etc.).
    *   **Estilo:** Pode ter uma borda dourada sutil ao redor do player.
    *   **Função:** Exibir a transmissão ao vivo ou a gravação da live mais recente.
*   **Agenda de Lives:**
    *   **Título:** "Próximas Lives" ou "Agenda Semanal" em dourado.
    *   **Formato:** Uma lista ou tabela simples abaixo do player de vídeo.
    *   **Conteúdo:**
        *   **Dia da Semana:** (Ex: Segunda-feira, Quarta-feira, Sexta-feira)
        *   **Tema:** (Ex: Gestão, Pessoas, Marketing)
        *   **Horário:** (Opcional)
    *   **Estilo:** Texto em branco, títulos dos temas em dourado.
*   **Área de Comentários:**
    *   **Localização:** Abaixo do player de vídeo e da agenda.
    *   **Campo de Texto:** Uma `textarea` para o usuário digitar seu comentário.
        *   **Placeholder:** "Deixe seu comentário..."
        *   **Estilo:** Fundo escuro, texto em branco, borda dourada ao focar.
    *   **Botão `Enviar Comentário`:**
        *   **Texto:** "Enviar"
        *   **Estilo:** Botão sólido em dourado, texto em preto ou branco.
        *   **Função:** Enviar o comentário para ser exibido na área de discussão.
    *   **Lista de Comentários:** Exibição dos comentários anteriores, com nome do usuário e data/hora.
        *   **Estilo:** Comentários em blocos discretos, fundo escuro, texto em branco, nome do autor em dourado.

### 2.3. Seção de Avisos de Eventos Presenciais
*   **Título:** "Sala do Mestres - Evento Presencial" em dourado, em destaque.
*   **Formato:** Um banner ou card visualmente impactante.
*   **Conteúdo:**
    *   **Data:** (Ex: "30 de Julho de 2025") em dourado e branco.
    *   **Local:** (Ex: "São Paulo - SP") em branco.
    *   **Chamada para Ação:** "Clique para mais detalhes" ou "Inscreva-se aqui" em dourado.
    *   **Link:** Um link para uma página externa ou modal com mais informações sobre o evento.
    *   **Ícone:** Um ícone de calendário ou evento em dourado (opcional).
*   **Estilo:** Fundo preto, com elementos em dourado e branco para máximo contraste e destaque.

## 3. Lógica de Funcionamento (PHP)

1.  **Verificação de Autenticação:** No início da `home.php`, será verificado se o usuário está logado (verificando a sessão PHP). Se não estiver, será redirecionado para `index.php`.
2.  **Exibição de Dados do Usuário:** O nome e a imagem de perfil do usuário logado serão recuperados da sessão ou do banco de dados para exibição no cabeçalho.
3.  **Conteúdo Dinâmico das Lives:**
    *   O URL do vídeo da live atual será carregado dinamicamente (pode vir de um banco de dados ou de um arquivo de configuração).
    *   A agenda das lives também pode ser carregada dinamicamente.
4.  **Sistema de Comentários:**
    *   Quando um comentário é enviado, ele será processado via PHP (método `POST`), validado e salvo em uma tabela de `comentarios` no banco de dados (associado ao `id` do usuário e da live/tópico).
    *   Os comentários existentes serão recuperados do banco de dados e exibidos em ordem cronológica inversa.
5.  **Avisos de Eventos:** As informações do evento presencial serão carregadas dinamicamente (de um banco de dados ou arquivo de configuração) para facilitar a atualização.

## 4. Considerações de Segurança
*   **Proteção de Sessão:** Garantir que a sessão seja validada em cada acesso à página.
*   **Prevenção de XSS:** Todas as saídas de dados geradas por usuários (ex: comentários) devem ser sanitizadas (`htmlspecialchars()`) para prevenir ataques de Cross-Site Scripting.
*   **Prevenção de CSRF:** Implementar tokens CSRF para formulários que modificam dados (ex: envio de comentários).
