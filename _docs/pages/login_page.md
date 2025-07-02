# Documentação da Página de Login (`index.php`)

Esta página é o ponto de entrada do sistema "Sala do Mestres", onde os usuários (clientes) farão o login para acessar o conteúdo exclusivo.

## 1. Visão Geral e Estética

*   **Propósito:** Autenticar usuários.
*   **Estética:** Segue a proposta de UX/UI de "preto com dourado", transmitindo uma sensação premium, profissional e exclusiva.
*   **Fundo:** Preto sólido (`#000000`) ou um cinza muito escuro. Pode haver uma textura sutil ou o `bg_linklist.png` esmaecido para profundidade.

## 2. Elementos da Página

### 2.1. Logo
*   **Localização:** Centralizado no topo da página.
*   **Conteúdo:** Imagem do logotipo "Logotipo Sala dos Mestres 2023.png" (ou o principal definido).
*   **Função:** Identificação visual da marca.

### 2.2. Formulário de Login
*   **Estrutura:** Um contêiner centralizado na tela, com um fundo escuro (quase preto) e talvez uma borda fina em dourado para destacá-lo.
*   **Campos de Entrada:**
    *   **Campo `Usuário` (username):**
        *   **Tipo:** `text`
        *   **Placeholder:** "Seu nome de usuário"
        *   **Estilo:** Fundo escuro, texto digitado em branco, borda fina em dourado ao focar.
        *   **Função:** Coletar o nome de usuário do cliente.
    *   **Campo `Senha` (password):**
        *   **Tipo:** `password`
        *   **Placeholder:** "Sua senha"
        *   **Estilo:** Fundo escuro, texto digitado em branco (mas oculto), borda fina em dourado ao focar.
        *   **Função:** Coletar a senha do cliente.
*   **Botão `Entrar`:**
    *   **Tipo:** `submit`
    *   **Texto:** "Entrar"
    *   **Estilo:** Botão sólido em dourado (`#FFD700`), texto em preto ou branco. Efeito de brilho ou mudança de tom ao passar o mouse (`hover`) e ao ser clicado (`active`).
    *   **Função:** Enviar as credenciais para validação no servidor.

### 2.3. Mensagens de Feedback
*   **Localização:** Acima ou abaixo do formulário de login.
*   **Conteúdo:** Mensagens de erro (ex: "Usuário ou senha inválidos") ou sucesso (ex: "Login realizado com sucesso!").
*   **Estilo:** Texto em branco ou dourado, com um fundo sutil (talvez um preto translúcido) para destacá-las. Ícones pequenos (ex: `X` vermelho para erro, `✓` verde para sucesso) podem ser adicionados.
*   **Função:** Informar o usuário sobre o status da tentativa de login.

## 3. Lógica de Funcionamento (PHP)

1.  **Inclusão:** A página `index.php` incluirá o arquivo `db_connect.php` para estabelecer a conexão com o banco de dados.
2.  **Processamento do Formulário:**
    *   Quando o formulário é submetido (método `POST`):
        *   Os valores dos campos `username` e `password` são coletados.
        *   **Validação Básica:** Verifica se os campos não estão vazios.
        *   **Consulta ao Banco de Dados:** Uma consulta SQL será executada na tabela `users` para verificar se o `username` existe.
        *   **Verificação de Senha:** Se o `username` for encontrado, a senha fornecida será comparada com o hash da senha armazenada no banco de dados (usando `password_verify()` para segurança).
        *   **Redirecionamento:**
            *   Se as credenciais forem válidas, o usuário será redirecionado para `home.php` (a página principal).
            *   Se as credenciais forem inválidas, uma mensagem de erro será exibida na própria `index.php`.
3.  **Gerenciamento de Sessão:** Após um login bem-sucedido, uma sessão PHP será iniciada e o `username` (ou `id` do usuário) será armazenado na sessão para manter o usuário logado e permitir acesso a páginas restritas.

## 4. Considerações de Segurança
*   **Senhas Hashadas:** As senhas no banco de dados devem ser armazenadas como hashes (ex: usando `password_hash()` do PHP) e verificadas com `password_verify()`.
*   **Prevenção de SQL Injection:** Usar prepared statements (ex: `mysqli_prepare()` e `mysqli_stmt_bind_param()`) para todas as consultas ao banco de dados que envolvem entrada do usuário.
*   **Sessões Seguras:** Configurar sessões PHP para usar cookies seguros (HTTPS) e HttpOnly para prevenir ataques XSS.
