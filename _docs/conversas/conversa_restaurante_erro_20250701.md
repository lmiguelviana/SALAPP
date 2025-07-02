## Resumo da Conversa - Debug de Adição de Restaurantes (Painel Web)

**Data:** 01 de julho de 2025

**Problema Identificado:**
*   Ao tentar adicionar um restaurante a um Encontro, a API retorna o erro "Os campos `encontro_id` e `nome` são obrigatórios."
*   Isso indica que os dados esperados pela API não estão sendo enviados corretamente pelo front-end, ou há um problema na validação.

**Ações Tomadas para Debug:**
1.  **Revisão do Fluxo:** Confirmado que a funcionalidade de gerenciamento de restaurantes é aninhada dentro dos formulários de Encontro (`AddEncontroForm.tsx` e `EditEncontroForm.tsx`).
2.  **Adição de Logs:**
    *   No `AddEncontroForm.tsx`: Adicionados `console.log` para verificar o `encontroId` obtido da API e os dados do `restaurante` antes de enviá-los.
    *   No `AddRestauranteForm.tsx`: Adicionados `console.log` para verificar o `name` e o `encontro_id` que estão sendo passados para a API.

**Próximos Passos (Debug):**
*   Analisar os logs no console do navegador para identificar se o `encontro_id` está sendo passado corretamente e se o `name` do restaurante está presente no momento do envio para a API.

**Status:** Problema em investigação. Logs adicionados para auxiliar na depuração.
