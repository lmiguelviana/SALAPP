# Proposta de UX/UI para o Aplicativo Móvel "Sala do Mestres"

Este documento detalha a proposta de experiência do usuário (UX) e interface do usuário (UI) para o aplicativo móvel "Sala do Mestres", que terá funcionalidades de rede social inspiradas no Instagram, além de acesso a conteúdos exclusivos (GTs e Encontros da Sala).

## 1. Estética Geral (A "Vibe" Premium e Moderna)

Manteremos a estética "preto com dourado" já definida, mas com uma abordagem mais moderna e focada em mobile:

*   **Cores:**
    *   **Principal:** Preto (`#000000` ou um cinza muito escuro) para fundos e elementos principais.
    *   **Destaque:** Dourado (`#FFD700` ou um tom de ouro mais rico) para acentos, ícones, botões de ação, bordas e elementos interativos.
    *   **Texto:** Branco ou um cinza muito claro para garantir legibilidade em fundos escuros.
    *   **Cores Secundárias:** Tons sutis de cinza para separadores, bordas de cards e elementos menos proeminentes.
*   **Tipografia:** Fontes sans-serif modernas e limpas para todo o aplicativo (ex: `Roboto`, `Inter`, `Open Sans`). Priorizar legibilidade e consistência.
*   **Elementos Visuais:**
    *   Design minimalista com foco no conteúdo.
    *   Bordas arredondadas para cards, botões e imagens de perfil.
    *   Ícones dourados e bem definidos.
    *   Animações suaves e transições fluidas para uma experiência de usuário agradável.

## 2. Telas Principais do Aplicativo (MVP)

### 2.1. Tela de Login

*   **Propósito:** Autenticação do usuário.
*   **Elementos:**
    *   **Logo:** Centralizado no topo da tela.
    *   **Campos de Entrada:** Usuário e Senha, com estilo premium (fundo escuro, texto branco, borda dourada ao focar).
    *   **Botão "Entrar":** Dourado, com texto em preto ou branco, e feedback visual ao toque.
    *   **Mensagens de Feedback:** Erro/Sucesso em texto branco/dourado.
    *   **Fundo:** Preto sólido ou com textura sutil.

### 2.2. Tela Principal (Home - Conteúdo Oficial)

*   **Propósito:** Exibir o conteúdo oficial da "Sala do Mestres", como GTs e Encontros da Sala.
*   **Elementos:**
    *   **Cabeçalho:**
        *   Logo da "Sala do Mestres" à esquerda.
        *   Ícones de navegação à direita (ex: Notificações, Perfil).
    *   **Feed de Conteúdo Oficial:** Cards de GTs e Encontros da Sala, exibidos em ordem cronológica ou por relevância.
        *   **GT Card (na Home - Banners de Destaque):**
            *   **Formato:** 3 banners em destaque no topo do feed.
            *   **Conteúdo:** Imagem/Banner do GT, Título do GT, Nome do Apresentador, Dia da Semana.
            *   **Ação:** Botão/Link "Participar via Zoom" (dourado) que abre o aplicativo Zoom ou o link da reunião.
        *   **Encontro da Sala Card:**
            *   Título do Evento.
            *   Data e Local.
            *   Imagem do evento.
            *   Breve descrição.
            *   Botão "Ver Detalhes" (dourado).

### 2.3. Tela Social (Feed de Usuários)

*   **Propósito:** Exibir posts de usuários com fotos e texto, permitindo interação.
*   **Elementos:**
    *   **Cabeçalho:**
        *   Título "Social" ou "Feed de Membros".
        *   Ícones de navegação à direita (ex: Notificações, Mensagens Diretas - se implementado futuramente).
    *   **Feed de Posts de Usuários:** Posts exibidos em ordem cronológica inversa.
        *   **Post de Usuário (Card):**
            *   **Cabeçalho do Post:**
                *   Foto de Perfil do Usuário (circular, pequena).
                *   Nome do Usuário.
                *   Timestamp (há quanto tempo o post foi feito).
            *   **Conteúdo do Post:**
                *   Imagem/Foto (se houver).
                *   Texto do Post.
            *   **Rodapé do Post (Interações):**
                *   Ícones de "Curtir" (coração), "Comentar" (balão de fala), "Compartilhar" (seta).
                *   Contador de curtidas e comentários.
                *   Campo para adicionar um comentário rápido.
    *   **Botão Flutuante de Ação (FAB):** Um botão "+" (dourado) no canto inferior direito para criar um novo post.

### 2.4. Tela de Detalhes do GT (Live)

*   **Propósito:** Visualizar os detalhes do GT e acessar a reunião via Zoom.
*   **Elementos:**
    *   **Informações do GT:** Título, descrição, data, horário, palestrantes (se houver).
    *   **Botão "Participar via Zoom":** Um botão de destaque (dourado) que, ao ser clicado, abre o aplicativo Zoom ou o link da reunião no navegador.
    *   **Área de Comentários:** Campo para digitar comentário e lista de comentários existentes (com nome do usuário e data).

### 2.4. Tela de Detalhes do Encontro da Sala

*   **Propósito:** Exibir informações completas sobre o evento presencial.
*   **Elementos:**
    *   **Imagem/Banner do Evento:** Em destaque.
    *   **Informações do Evento:** Título, data, local, descrição detalhada, agenda.
    *   **Botão de Ação:** "Confirmar Presença" ou "Ver Local no Mapa" (dourado).
    *   **Botão "Restaurantes Próximos":** Um botão (dourado) que, ao ser clicado, abre um modal com uma lista de restaurantes próximos ao local do evento.
    *   **Modal "Restaurantes Próximos":**
        *   **Título:** "Restaurantes Próximos"
        *   **Conteúdo:** Lista de restaurantes com nome, tipo de culinária, endereço e, opcionalmente, link para mapa/site.
        *   **Estilo:** Fundo escuro, texto branco/dourado, com opção de fechar o modal.

### 2.5. Tela de Perfil do Usuário

*   **Propósito:** Exibir informações do usuário logado e seus posts.
*   **Elementos:**
    *   **Foto de Perfil:** Circular, com borda dourada.
    *   **Nome do Usuário.**
    *   **Informações Básicas:** (Ex: Membro desde, Grupos que participa, número de posts).
    *   **Grid/Lista de Posts:** Exibição dos posts do usuário (miniaturas ou cards completos).
    *   **Botão "Sair" (Logout):** Em dourado.

### 2.6. Tela de Criação de Post

*   **Propósito:** Permitir que o usuário crie e publique um novo post com foto e texto.
*   **Elementos:**
    *   **Cabeçalho:** Título "Novo Post" e ícone de "Fechar" ou "Voltar".
    *   **Campo de Texto:** Uma `textarea` para o usuário digitar o texto do post.
        *   **Placeholder:** "Escreva algo..."
        *   **Estilo:** Fundo escuro, texto branco, borda dourada ao focar.
    *   **Botão "Adicionar Foto":** Um botão (dourado) que abre a galeria de imagens do dispositivo ou a câmera.
    *   **Pré-visualização da Foto:** Após selecionar a foto, uma miniatura será exibida.
    *   **Botão "Publicar":** Um botão de destaque (dourado) para enviar o post.
    *   **Considerações:** Validação de campos, indicadores de progresso de upload.

### 2.7. Barra de Navegação Inferior (Bottom Navigation Bar)

*   **Propósito:** Permitir a navegação rápida entre as principais seções do aplicativo.
*   **Elementos:**
    *   Ícones para as principais seções: Home (Conteúdo Oficial), Social (Feed de Usuários), GTs (lista de todos os GTs), Encontros (lista de todos os Encontros), Perfil.
*   **Estilo:**
    *   **Fundo:** Preto sólido ou muito escuro.
    *   **Ícones:** Dourados e bem definidos.
    *   **Seleção:** O ícone da tela ativa terá um destaque dourado mais pronunciado ou um brilho sutil para indicar a seleção.
    *   **Minimalista:** Design limpo, sem excesso de elementos, focando na usabilidade e na elegância.

## 3. Fluxo de Navegação (Exemplo)

Login -> Home (Feed) -> Detalhes do GT/Encontro -> Comentários

## 4. Considerações de UX/UI

*   **Responsividade:** O layout deve se adaptar a diferentes tamanhos de tela de dispositivos móveis.
*   **Acessibilidade:** Garantir contraste adequado, tamanhos de fonte legíveis e navegação intuitiva.
*   **Feedback Visual:** Animações e estados de carregamento claros para melhorar a percepção de desempenho.
*   **Consistência:** Manter padrões de design e interação em todo o aplicativo.

---

**Próximo Passo:** Com esta proposta inicial, podemos discutir cada tela em detalhes, refinar os elementos e o fluxo, e começar a esboçar wireframes ou mockups.